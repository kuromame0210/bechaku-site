import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

export const runtime = "nodejs"

type ContactPayload = {
  companyName: string
  contactName: string
  postalCode: string
  address: string
  phone: string
  email: string
  inquiryType: string
  message: string
}

const requiredFields: Array<keyof ContactPayload> = [
  "companyName",
  "contactName",
  "postalCode",
  "address",
  "phone",
  "email",
  "inquiryType",
  "message",
]

const MAX_FILES = 3
const MAX_TOTAL_BYTES = 10 * 1024 * 1024
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const RATE_LIMIT_MAX = 5
const HONEYPOT_FIELD = "companyWebsite"

type RateLimitEntry = {
  count: number
  resetAt: number
}

const getRateLimitStore = () => {
  const globalStore = globalThis as typeof globalThis & {
    __contactRateLimit?: Map<string, RateLimitEntry>
  }
  if (!globalStore.__contactRateLimit) {
    globalStore.__contactRateLimit = new Map<string, RateLimitEntry>()
  }
  return globalStore.__contactRateLimit
}

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown"
  }
  return request.headers.get("x-real-ip") ?? "unknown"
}

const parseAllowList = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

const isAllowedOrigin = (request: Request) => {
  const allowedOrigins = parseAllowList(process.env.ALLOWED_ORIGINS)
  const allowedHosts = parseAllowList(process.env.ALLOWED_HOSTS)
  if (allowedOrigins.length === 0 && allowedHosts.length === 0) {
    return true
  }
  const origin = request.headers.get("origin")
  if (origin) {
    try {
      const originUrl = new URL(origin)
      if (
        allowedOrigins.includes(origin) ||
        allowedHosts.includes(originUrl.hostname)
      ) {
        return true
      }
    } catch {
      return false
    }
  }
  const hostHeader = request.headers.get("host") ?? ""
  const host = hostHeader.split(":")[0] || hostHeader
  return allowedHosts.includes(host)
}

const enforceRateLimit = (key: string) => {
  const store = getRateLimitStore()
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }
  entry.count += 1
  store.set(key, entry)
  return true
}

const getUpstashConfig = () => ({
  url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN,
})

const hasUpstashConfig = () => {
  const { url, token } = getUpstashConfig()
  return !!url && !!token
}

const getRedisClient = () => {
  const { url, token } = getUpstashConfig()
  if (!url || !token) {
    throw new Error("missing_upstash_config")
  }
  return new Redis({ url, token })
}

const enforceRateLimitWithUpstash = async (key: string) => {
  const redis = getRedisClient()
  const bucket = Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS)
  const redisKey = `contact-rate:${key}:${bucket}`
  const count = await redis.incr(redisKey)
  if (count === 1) {
    await redis.expire(redisKey, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000))
  }
  return count <= RATE_LIMIT_MAX
}

const verifyRecaptcha = async (token: string | null) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    return { ok: false, reason: "missing_secret" }
  }
  if (!token) {
    return { ok: false, reason: "missing_token" }
  }
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    },
  )
  if (!response.ok) {
    return { ok: false, reason: "verify_failed" }
  }
  const data = (await response.json()) as {
    success: boolean
    score?: number
    action?: string
  }
  const threshold = Number(process.env.RECAPTCHA_THRESHOLD ?? "0.5")
  if (!data.success) {
    return { ok: false, reason: "not_success" }
  }
  if (data.action !== "contact_submit") {
    return { ok: false, reason: "action_mismatch" }
  }
  if ((data.score ?? 0) < threshold) {
    return { ok: false, reason: "low_score" }
  }
  return { ok: true }
}

const normalizeList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

const buildBodyText = (payload: ContactPayload, fileNames: string[]) => {
  const lines = [
    "お問い合わせを受け付けました。",
    "",
    "【基本情報】",
    `会社名：${payload.companyName}`,
    `担当者名：${payload.contactName}`,
    `郵便番号：${payload.postalCode}`,
    `住所：${payload.address}`,
    `電話番号：${payload.phone}`,
    `メールアドレス：${payload.email}`,
    `お問い合わせ種別：${payload.inquiryType}`,
    "",
    "【内容】",
    payload.message,
  ]

  lines.push("")
  lines.push("【添付ファイル】")
  lines.push(fileNames.length > 0 ? fileNames.join("\n") : "なし")

  return lines.join("\n")
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  const to = process.env.RESEND_TO
  const replyTo = process.env.RESEND_REPLY_TO || "h-betchaku@brinet.co.jp"

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { error: "missing_env" },
      { status: 500 },
    )
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "origin_not_allowed" },
      { status: 403 },
    )
  }

  const clientIp = getClientIp(request)
  const rateOk = hasUpstashConfig()
    ? await enforceRateLimitWithUpstash(clientIp)
    : enforceRateLimit(clientIp)
  if (!rateOk) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429 },
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json(
      { error: "invalid_payload" },
      { status: 400 },
    )
  }

  const payload = {
    companyName: String(formData.get("companyName") || ""),
    contactName: String(formData.get("contactName") || ""),
    postalCode: String(formData.get("postalCode") || ""),
    address: String(formData.get("address") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    inquiryType: String(formData.get("inquiryType") || ""),
    message: String(formData.get("message") || ""),
  }

  const honeypotValue = String(formData.get(HONEYPOT_FIELD) || "")
  if (honeypotValue.trim() !== "") {
    return NextResponse.json(
      { error: "bot_detected" },
      { status: 400 },
    )
  }

  const recaptchaToken = String(formData.get("recaptchaToken") || "")
  const recaptchaResult = await verifyRecaptcha(recaptchaToken)
  if (!recaptchaResult.ok) {
    return NextResponse.json(
      { error: "recaptcha_failed", reason: recaptchaResult.reason },
      { status: 400 },
    )
  }

  const missing = requiredFields.filter(
    (field) => !payload[field] || String(payload[field]).trim() === "",
  )
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "missing_fields", fields: missing },
      { status: 400 },
    )
  }

  const files: Array<File> = []
  const fileNames: string[] = []
  let totalBytes = 0
  for (let index = 0; index < MAX_FILES; index += 1) {
    const entry = formData.get(`file${index}`)
    if (entry instanceof File) {
      totalBytes += entry.size
      files.push(entry)
      fileNames.push(entry.name)
    }
  }
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "total_file_too_large" },
      { status: 400 },
    )
  }

  const toList = normalizeList(to)
  const bodyText = buildBodyText(payload, fileNames)
  const attachments = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      return {
        filename: file.name,
        content: buffer.toString("base64"),
      }
    }),
  )

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: toList,
      reply_to: replyTo,
      subject: "お問い合わせを受け付けました",
      text: bodyText,
      attachments: attachments.length > 0 ? attachments : undefined,
    }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: "send_failed" },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
