"use client"

import { useEffect, useState } from "react"

type SummaryData = {
  users: number
  sessions: number
  pageviews: number
  engagementRate: number
  avgSessionDuration: number
}

type PageData = {
  path: string
  pageviews: number
  users: number
  avgEngagementTime: number
}

type TrafficSource = {
  channel: string
  sessions: number
  engagementRate: number
}

type EventData = {
  name: string
  count: number
  users: number
}

type DailyData = {
  date: string
  users: number
  sessions: number
}

type AnalyticsData = {
  summary: SummaryData
  pages: PageData[]
  traffic: TrafficSource[]
  events: EventData[]
  daily: DailyData[]
}

type Insight = {
  type: "warning" | "positive" | "info"
  text: string
}

function generateInsights(data: AnalyticsData): Insight[] {
  const insights: Insight[] = []
  const { summary, traffic, events, pages } = data

  // ユーザー数
  if (summary.users === 0) {
    insights.push({ type: "warning", text: "この期間のユーザー数がゼロ。データが取れていないか、流入がない。" })
  } else if (summary.users < 10) {
    insights.push({ type: "warning", text: `ユーザー数が${summary.users}人と非常に少ない。身内のアクセスが大半の可能性がある。` })
  } else if (summary.users >= 50) {
    insights.push({ type: "positive", text: `ユーザー数${summary.users}人。外部からの流入が出始めている。` })
  }

  // Organic検索
  const organic = traffic.find((t) => t.channel === "Organic Search")
  if (!organic || organic.sessions === 0) {
    insights.push({ type: "warning", text: "Organic Search（検索流入）がゼロ。SEO施策の効果がまだ出ていない。" })
  } else if (organic.sessions < 5) {
    insights.push({ type: "info", text: `検索流入が${organic.sessions}セッション。まだ少ないが、表示され始めている可能性がある。Search Consoleで確認すべき。` })
  } else {
    insights.push({ type: "positive", text: `検索流入が${organic.sessions}セッション。SEO施策が効き始めている。` })
  }

  // Direct比率
  const direct = traffic.find((t) => t.channel === "Direct")
  if (direct && summary.sessions > 0) {
    const directRatio = direct.sessions / summary.sessions
    if (directRatio > 0.7) {
      insights.push({ type: "warning", text: `Direct（URL直打ち）が${Math.round(directRatio * 100)}%。大半が自分たちのアクセスの可能性が高い。` })
    }
  }

  // コンバージョン
  const formSubmit = events.find((e) => e.name === "contact_form_submit")
  const contactView = events.find((e) => e.name === "contact_page_view")
  const ctaClick = events.find((e) => e.name === "cta_click")

  if (formSubmit && formSubmit.count > 0) {
    insights.push({ type: "positive", text: `問い合わせが${formSubmit.count}件発生。GA4でキーイベントに設定すべき。` })
  } else {
    insights.push({ type: "info", text: "問い合わせ（contact_form_submit）はまだゼロ。流入を増やすことが先決。" })
  }

  if (contactView && contactView.count > 0 && summary.users > 0) {
    const contactRate = Math.round((contactView.users / summary.users) * 100)
    if (contactRate < 10) {
      insights.push({ type: "warning", text: `問い合わせページ到達率${contactRate}%。CTAの配置・文言を改善すべき（Phase 2で対応予定）。` })
    } else {
      insights.push({ type: "positive", text: `問い合わせページ到達率${contactRate}%。導線は機能している。` })
    }
  }

  if (ctaClick && ctaClick.count > 0) {
    insights.push({ type: "info", text: `CTAクリック${ctaClick.count}回（${ctaClick.users}人）。` })
  }

  // 電話・メール
  const telClick = events.find((e) => e.name === "tel_click")
  const emailClick = events.find((e) => e.name === "email_click")
  if (telClick && telClick.count > 0) {
    insights.push({ type: "positive", text: `電話リンクが${telClick.count}回クリックされた。` })
  }
  if (emailClick && emailClick.count > 0) {
    insights.push({ type: "positive", text: `メールリンクが${emailClick.count}回クリックされた。` })
  }

  // ページ別
  const scanPage = pages.find((p) => p.path === "/scan")
  const printPage = pages.find((p) => p.path === "/print")
  if (scanPage && scanPage.avgEngagementTime > 60) {
    insights.push({ type: "positive", text: `/scan の平均滞在${formatDuration(scanPage.avgEngagementTime)}。コンテンツがしっかり読まれている。` })
  }
  if (printPage && printPage.avgEngagementTime < 30 && printPage.pageviews > 0) {
    insights.push({ type: "warning", text: `/print の平均滞在${formatDuration(printPage.avgEngagementTime)}。コンテンツの情報量が足りていない可能性。` })
  }

  // アクティビティがない日
  const zeroDays = data.daily.filter((d) => d.sessions === 0).length
  const totalDays = data.daily.length
  if (totalDays > 0 && zeroDays / totalDays > 0.3) {
    insights.push({ type: "info", text: `${totalDays}日中${zeroDays}日がアクセスゼロ。まだ安定した流入がない状態。` })
  }

  if (insights.length === 0) {
    insights.push({ type: "info", text: "特筆すべき点なし。次回の確認で変化を見る。" })
  }

  return insights
}

const PERIODS = [
  { label: "過去7日", start: "7daysAgo", end: "today" },
  { label: "過去28日", start: "28daysAgo", end: "today" },
  { label: "過去90日", start: "90daysAgo", end: "today" },
]

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}分${s}秒`
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`
}

export default function AdminPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [period, setPeriod] = useState(PERIODS[1])

  useEffect(() => {
    setLoading(true)
    setError("")
    fetch(`/api/analytics?start=${period.start}&end=${period.end}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error")
        return res.json()
      })
      .then(setData)
      .catch(() => setError("データの取得に失敗しました"))
      .finally(() => setLoading(false))
  }, [period])

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <div className="flex gap-2">
          {PERIODS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPeriod(p)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                period.label === p.label
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="mt-12 text-center text-muted-foreground">読み込み中...</div>
      )}

      {error && (
        <div className="mt-12 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {data && !loading && (
        <div className="mt-8 flex flex-col gap-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <SummaryCard label="ユーザー数" value={String(data.summary.users)} />
            <SummaryCard label="セッション" value={String(data.summary.sessions)} />
            <SummaryCard label="ページビュー" value={String(data.summary.pageviews)} />
            <SummaryCard label="エンゲージ率" value={formatPercent(data.summary.engagementRate)} />
            <SummaryCard label="平均滞在" value={formatDuration(data.summary.avgSessionDuration)} />
          </div>

          {/* Insights */}
          <Section title="この期間から分かること">
            <ul className="flex flex-col gap-3">
              {generateInsights(data).map((insight, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    insight.type === "warning" ? "bg-amber-100 text-amber-800" :
                    insight.type === "positive" ? "bg-emerald-100 text-emerald-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {insight.type === "warning" ? "注意" : insight.type === "positive" ? "良好" : "情報"}
                  </span>
                  <span className="text-foreground">{insight.text}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Daily Chart (simple text-based) */}
          <Section title="日別推移">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-2 pr-6">日付</th>
                    <th className="pb-2 pr-6">ユーザー</th>
                    <th className="pb-2 pr-6">セッション</th>
                    <th className="pb-2">グラフ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.daily.map((row) => {
                    const maxSessions = Math.max(...data.daily.map((d) => d.sessions), 1)
                    const barWidth = Math.round((row.sessions / maxSessions) * 100)
                    return (
                      <tr key={row.date} className="border-b border-border/50">
                        <td className="py-2 pr-6 font-mono text-xs">{row.date}</td>
                        <td className="py-2 pr-6">{row.users}</td>
                        <td className="py-2 pr-6">{row.sessions}</td>
                        <td className="py-2">
                          <div
                            className="h-4 rounded-sm bg-primary/60"
                            style={{ width: `${barWidth}%`, minWidth: row.sessions > 0 ? "4px" : "0" }}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Traffic Sources */}
          <Section title="流入元">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 pr-6">チャネル</th>
                  <th className="pb-2 pr-6">セッション</th>
                  <th className="pb-2">エンゲージ率</th>
                </tr>
              </thead>
              <tbody>
                {data.traffic.map((row) => (
                  <tr key={row.channel} className="border-b border-border/50">
                    <td className="py-2 pr-6 font-medium">{row.channel}</td>
                    <td className="py-2 pr-6">{row.sessions}</td>
                    <td className="py-2">{formatPercent(row.engagementRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Pages */}
          <Section title="ページ別">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 pr-6">パス</th>
                  <th className="pb-2 pr-6">PV</th>
                  <th className="pb-2 pr-6">ユーザー</th>
                  <th className="pb-2">平均滞在</th>
                </tr>
              </thead>
              <tbody>
                {data.pages.map((row) => (
                  <tr key={row.path} className="border-b border-border/50">
                    <td className="py-2 pr-6 font-mono text-xs">{row.path}</td>
                    <td className="py-2 pr-6">{row.pageviews}</td>
                    <td className="py-2 pr-6">{row.users}</td>
                    <td className="py-2">{formatDuration(row.avgEngagementTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Events */}
          <Section title="イベント">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 pr-6">イベント名</th>
                  <th className="pb-2 pr-6">発火数</th>
                  <th className="pb-2">ユーザー数</th>
                </tr>
              </thead>
              <tbody>
                {data.events.map((row) => (
                  <tr key={row.name} className="border-b border-border/50">
                    <td className="py-2 pr-6 font-mono text-xs">{row.name}</td>
                    <td className="py-2 pr-6">{row.count}</td>
                    <td className="py-2">{row.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>
      )}

      {/* Monthly Reports */}
      <ReportsSection />
    </main>
  )
}

function ReportsSection() {
  const [files, setFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [content, setContent] = useState("")
  const [loadingReport, setLoadingReport] = useState(false)

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setFiles(data.files ?? []))
      .catch(() => {})
  }, [])

  const openReport = (file: string) => {
    setLoadingReport(true)
    setSelectedFile(file)
    fetch(`/api/reports?file=${encodeURIComponent(file)}`)
      .then((res) => res.json())
      .then((data) => setContent(data.content ?? ""))
      .catch(() => setContent("読み込みに失敗しました"))
      .finally(() => setLoadingReport(false))
  }

  if (files.length === 0) return null

  return (
    <div className="mt-8">
      <Section title="月次レポート">
        <div className="flex flex-wrap gap-2">
          {files.map((file) => {
            const label = file.replace(".md", "")
            return (
              <button
                key={file}
                onClick={() => openReport(file)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  selectedFile === file
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
        {selectedFile && (
          <div className="mt-6">
            {loadingReport ? (
              <p className="text-muted-foreground">読み込み中...</p>
            ) : (
              <div className="prose prose-sm max-w-none rounded-md border border-border bg-white p-6 dark:prose-invert">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">{content}</pre>
              </div>
            )}
          </div>
        )}
      </Section>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  )
}
