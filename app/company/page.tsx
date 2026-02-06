import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { NoticeBanner } from "@/components/notice-banner"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "会社概要 | 別役ロボット工業",
  description:
    "別役ロボット工業の会社概要。精密機械分野での実績と、組立・加工・電気配線の一貫対応力をご紹介します。",
}

const aboutText = [
  "弊社は、精密機械・産業機械を中心に、組立・加工・電気配線までを一貫して対応できる技術会社です。",
  "半導体製造装置をはじめとする精密分野で培ってきた実務経験と、現場理解のあるスタッフ体制を強みとし、お客様の技術課題に対して、的確かつ柔軟にお応えしています。",
  "近年では、3Dスキャン・3Dプリントを活用したリバースエンジニアリングにも対応し、図面がない部品の復元や試作など、従来対応が困難だった課題にも取り組んでいます。",
]

const strengths = [
  {
    title: "専門性",
    items: [
      { label: "業界", text: "精密機械・産業機械・半導体関連" },
      { label: "工程", text: "組立・加工・配線・検査・調整" },
      { label: "大きさ", text: "小型精密部品から大型装置まで対応" },
    ],
  },
  {
    title: "精密機械分野での実績",
    items: [
      {
        label: null,
        text: "半導体製造装置を中心とした精密機械分野において、長年にわたる実務実績があります。",
      },
    ],
  },
  {
    title: "総合的な対応力",
    items: [
      {
        label: null,
        text: "組立・加工・電気配線を社内で一貫対応。工程間の調整ロスを抑え、品質と納期の両立を図ります。",
      },
    ],
  },
  {
    title: "実務経験豊富な人材力",
    items: [
      {
        label: null,
        text: "現場を熟知したスタッフが在籍しており、技術的な課題に対して的確な判断と柔軟な対応が可能です。",
      },
    ],
  },
]

const companyInfo = [
  { label: "会社名", value: "別役ロボット工業" },
  {
    label: "所在地",
    value: "事務所：（後日記載）\n工場：（後日記載）",
  },
  { label: "連絡先", value: "（後日記載）" },
  { label: "代表者", value: "（後日記載）" },
  { label: "設立", value: "（後日記載）" },
  {
    label: "事業内容",
    value:
      "精密機械・産業機械の組立、加工、電気配線\n3Dスキャン・3Dプリントによるリバースエンジニアリング\n試作品製作、部品復元",
  },
]

export default function CompanyPage() {
  return (
    <main>
      <NoticeBanner />

      {/* h1 */}
      <section className="bg-card py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h1">{"会社概要"}</SectionHeading>
          </Reveal>
        </div>
      </section>

      {/* セクション1：弊社について */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"弊社について"}</SectionHeading>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex flex-col gap-4">
              {aboutText.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-loose text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* セクション2：幅広い対応力で... */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>
              {"幅広い対応力で貴社の課題解決に貢献します"}
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      {/* セクション3：弊社の強み */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"弊社の強み"}</SectionHeading>
          </Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {strengths.map((block) => (
              <Reveal key={block.title}>
                <Card className="border-border">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <h3 className="font-semibold text-foreground">
                      {block.title}
                    </h3>
                    {block.items.map((item, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        {item.label && (
                          <span className="text-xs font-medium text-primary">
                            {item.label}
                          </span>
                        )}
                        <p className="leading-relaxed text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* セクション4：会社情報 */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"会社情報"}</SectionHeading>
          </Reveal>
          <Reveal>
            <Card className="mt-8 border-border">
              <CardContent className="p-0">
                <dl className="divide-y divide-border">
                  {companyInfo.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-8"
                    >
                      <dt className="w-28 shrink-0 text-sm font-medium text-foreground">
                        {row.label}
                      </dt>
                      <dd className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="お問い合わせ"
        description="技術的なご相談やお見積りのご依頼など、お気軽にご連絡ください。"
      />
    </main>
  )
}
