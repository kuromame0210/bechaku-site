import { NextResponse } from "next/server"

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
  for (let index = 0; index < 3; index += 1) {
    const entry = formData.get(`file${index}`)
    if (entry instanceof File) {
      if (entry.size > 3 * 1024 * 1024) {
        return NextResponse.json(
          { error: "file_too_large" },
          { status: 400 },
        )
      }
      files.push(entry)
      fileNames.push(entry.name)
    }
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
