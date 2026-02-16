import type { Metadata } from "next"
import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "会社案内 | 別役ロボット工業株式会社",
  description:
    "別役ロボット工業株式会社の会社案内。精密機械分野での実績と、組立・加工・電気配線の一貫対応力をご紹介します。",
}

const aboutText = [
  "2010年の設立以来、半導体製造装置や工作機械といった極めて高い精度が要求される分野において、組立・加工・配線のプロフェッショナルとして歩んできました。",
  "単なる作業の請負ではなく、現場ごとの課題に寄り添い、最適な形を実装するパートナーであることを目指しています。",
  "近年では、3Dスキャン・3Dプリントを活用したリバースエンジニアリングにも対応し、図面がない部品の復元や試作など、従来対応が困難だった課題にも取り組んでいます。",
]

const industryItems = [
  { title: "業界", description: "精密機械分野・工作機械分野" },
  { title: "工程", description: "組立・加工・電気配線" },
  { title: "大きさ", description: "卓上サイズ～超大物まで" },
]

const strengths = [
  {
    title: "精密機械分野での実績",
    image: "/images/factory-robot-arm.webp",
    description:
      "半導体製造装置を中心とした精密機械分野において、長年にわたる実務実績があります。",
  },
  {
    title: "総合的な対応力",
    image: "/images/wiring-work.jpg",
    description:
      "組立・加工・電気配線を社内で一貫対応。工程間の調整ロスを抑え、品質と納期の両立を図ります。",
  },
  {
    title: "実務経験豊富な人材力",
    image: "/images/circuit-board-assembly-2.jpg",
    description:
      "現場を熟知したスタッフが在籍しており、技術的な課題に対して的確な判断と柔軟な対応が可能です。",
  },
]

const companyInfo = [
  { label: "会社名", value: "別役ロボット工業株式会社" },
  {
    label: "所在地",
    value: "〒367-0212 埼玉県本庄市児玉町児玉 1732-1",
  },
  {
    label: "連絡先",
    value: "TEL 0495-71-6824\nFAX 0495-71-6825",
  },
  { label: "代表者", value: "代表取締役社長　石垣 秀一" },
  { label: "URL", value: "http://www.brinet.co.jp" },
  { label: "e-mail", value: "h-betchaku@brinet.co.jp" },
  {
    label: "事業内容",
    value:
      "精密機械及び工作機械の組立・加工\n精密機械及び工作機械の配線工事\n半導体製造装置の組立及び配線\n3Dスキャン・3Dプリントによるリバースエンジニアリング\n試作品製作、部品復元",
  },
]

export default function CompanyPage() {
  return (
    <main>
      {/* h1 */}
      <section className="bg-card py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold tracking-[0.2em] text-primary/70">
                {"COMPANY"}
              </p>
              <SectionHeading tag="h1">{"会社案内"}</SectionHeading>
              <div className="h-1 w-16 bg-primary/80" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* セクション1：弊社について */}
      <section className="border-t border-border bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-primary/80" />
              <SectionHeading>{"弊社について"}</SectionHeading>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-6 grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col gap-4">
                {aboutText.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base leading-loose text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-border/60">
                <Image
                  src="/images/factory-robot-arm.webp"
                  alt="工場内のロボットアーム作業イメージ"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* セクション2：幅広い対応力で... */}
      <section className="border-t border-border bg-secondary/70 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div>
              <SectionHeading>
                {"幅広い対応力で貴社の課題解決に貢献します"}
              </SectionHeading>
              <p className="mt-3 text-sm text-muted-foreground">
                {
                  "精密機械分野での実務経験を活かし、品質と納期の両立を大切にしています。"
                }
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* セクション3：対応可能領域 */}
      <section className="border-t border-border bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-primary/80" />
              <SectionHeading>{"対応可能領域"}</SectionHeading>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:auto-rows-fr">
            {industryItems.map((item) => (
              <Reveal key={item.title}>
                <div className="h-full overflow-hidden border border-border/70 bg-white">
                  <div className="flex h-full flex-col gap-3 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                      {item.title}
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* セクション4：弊社の強み */}
      <section className="border-t border-border bg-secondary/70 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-primary/80" />
              <SectionHeading>{"弊社の強み"}</SectionHeading>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:auto-rows-fr">
            {strengths.map((block) => (
              <Reveal key={block.title}>
                <div className="h-full overflow-hidden border border-border/70 bg-white">
                  {block.image && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={block.image}
                        alt={`${block.title}のイメージ`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex h-full flex-col gap-3 border-t border-border/70 p-6">
                    <h3 className="text-base font-semibold text-foreground">
                      {block.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {block.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* セクション5：会社情報 */}
      <section className="border-t border-border bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-primary/80" />
              <SectionHeading>{"会社情報"}</SectionHeading>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8">
              <dl className="border border-border/70 bg-white">
                {companyInfo.map((row, index) => (
                  <div
                    key={row.label}
                    className={`flex flex-col gap-2 px-6 py-4 sm:flex-row sm:gap-8${index === companyInfo.length - 1 ? "" : " border-b border-border/60"}`}
                  >
                    <dt className="w-28 shrink-0 text-sm font-semibold text-primary/80">
                      {row.label}
                    </dt>
                    <dd className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
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
