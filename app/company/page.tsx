import type { Metadata } from "next"
import Script from "next/script"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ImageWithFallback } from "@/components/image-with-fallback"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { CTASection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "会社案内｜リバースエンジニアリング・精密機械組立｜別役ロボット工業",
  description:
    "埼玉県本庄市の別役ロボット工業。精密機械分野の組立・加工の実績をもとに、3Dスキャン・3Dプリントによるリバースエンジニアリング・部品復元に対応しています。",
  alternates: {
    canonical: "/company",
  },
}

const aboutText = [
  "2010年の設立以来、半導体製造装置や工作機械といった極めて高い精度が要求される分野において、組立・加工・配線のプロフェッショナルとして歩んできました。",
  "単なる作業の請負ではなく、現場ごとの課題に寄り添い、最適な形を実装するパートナーであることを目指しています。",
  "近年では、3Dスキャン・3Dプリントを活用したリバースエンジニアリングにも対応し、図面がない部品の復元や試作など、従来対応が困難だった課題にも取り組んでいます。",
]

const industryItems = [
  {
    title: "業界",
    description: "精密機械分野・工作機械分野",
    image: "/images/industry-precision-machines.jpg",
  },
  {
    title: "工程",
    description: "組立・加工・電気配線",
    image: "/images/process-electrical-wiring.jpg",
  },
  {
    title: "大きさ",
    description: "卓上サイズ～超大物まで",
    image: "/images/size-large-workpiece.webp",
  },
]

const strengths = [
  {
    title: "精密機械分野での実績",
    image: "/images/circuit-board-assembly-2.webp",
    description:
      "半導体製造装置をはじめとする精密機械分野において組立てを中心とした業務実績を積み重ねており安心して任せていただけます。",
  },
  {
    title: "総合的な対応力",
    image: "/images/wiring-work.webp",
    description:
      "精密機械および工作機械において、組立・加工・電気配線まで一貫して対応可能で発注や調整の負担を軽減できます。",
  },
  {
    title: "実務経験豊富な人材力",
    image: "/images/print-flow-icon.webp",
    description:
      "精密機械分野での実務経験を持つスタッフが在籍しており、現場理解のある体制で任せていただけます。",
  },
]

const COMPANY_ADDRESS = "埼玉県本庄市児玉町児玉1391-9"
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/6Y39VFYCLzLxiiJy6"

const companyInfo: Array<{ label: string; value: string; render?: "address" | "tel" | "email" }> = [
  { label: "会社名", value: "別役ロボット工業株式会社" },
  {
    label: "所在地",
    value: `〒367-0212 ${COMPANY_ADDRESS}`,
    render: "address",
  },
  {
    label: "連絡先",
    value: "TEL 0495-71-6824\nFAX 0495-71-6825",
    render: "tel",
  },
  { label: "代表者", value: "代表取締役社長　石垣 秀一" },
  { label: "e-mail", value: "h-betchaku@brinet.co.jp", render: "email" },
  {
    label: "事業内容",
    value:
      "精密機械及び工作機械の組立・加工\n精密機械及び工作機械の配線工事\n半導体製造装置の組立及び配線\n3Dスキャン・3Dプリントによるリバースエンジニアリング\n試作品製作、部品復元",
  },
]

export default function CompanyPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+81-495-71-6824",
        contactType: "customer service",
        areaServed: "JP",
        availableLanguage: ["ja"],
      },
    ],
  }

  return (
    <main>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(organizationSchema)}
      </Script>
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
                <ImageWithFallback
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
                  {item.image && (
                    <div className="relative aspect-[16/9] w-full">
                      <ImageWithFallback
                        src={item.image}
                        alt={`${item.title}のイメージ`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div
                    className={`flex h-full flex-col gap-3 p-6${item.image ? " border-t border-border/70" : ""}`}
                  >
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
                      <ImageWithFallback
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
                      {row.render === "address" ? (
                        <span className="flex flex-wrap items-center gap-3">
                          <span>{row.value}</span>
                          <a
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                          >
                            {"Googleマップで開く ↗"}
                          </a>
                        </span>
                      ) : row.render === "email" ? (
                        <a
                          href={`mailto:${row.value}`}
                          className="text-primary/80 underline underline-offset-2 hover:text-primary"
                        >
                          {row.value}
                        </a>
                      ) : row.render === "tel" ? (
                        <span>
                          <a
                            href="tel:0495-71-6824"
                            className="text-primary/80 underline underline-offset-2 hover:text-primary"
                          >
                            {"TEL 0495-71-6824"}
                          </a>
                          {"\n"}
                          {"FAX 0495-71-6825"}
                        </span>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Button asChild className="mt-6" size="lg">
              <Link
                href="/pdfs/会社案内.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {"会社案内PDFを見る"}
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* セクション6：アクセス */}
      <section className="border-t border-border bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-primary/80" />
              <SectionHeading>{"アクセス"}</SectionHeading>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 overflow-hidden border border-border/70">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.0!2d139.1432187!3d36.1885477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601ec3b864419ca7%3A0x8f1843bb543c805f!2z5Yil5b255Ot44Oc44OD44OI5bel5qWt5qCq5byP5Lya56S-!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="別役ロボット工業株式会社の所在地"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {"〒367-0212 埼玉県本庄市児玉町児玉 1391-9"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* セクション7：その他事業 */}
      <section className="border-t border-border bg-secondary/70 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 bg-primary/80" />
              <SectionHeading>{"その他事業"}</SectionHeading>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 border border-border/70 bg-white p-6 md:p-8">
              <h3 className="text-base font-semibold text-foreground">
                {"防犯カメラ事業"}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {"工場・製造現場向けの防犯カメラの販売・設置工事を行っています。粉塵や油煙など過酷な環境に対応した機種選定から、現場のヒアリングに基づいた最適な設置プランのご提案まで対応。2,000種類以上のカメラから用途に合わせたフルカスタマイズが可能です。"}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {["販売", "設置工事", "輸入・OEM", "フルカスタマイズ対応"].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="お問い合わせ"
        description="技術的なご相談やお見積りのご依頼など、お気軽にご連絡ください。"
        eventLabel="company_page_cta"
      />
    </main>
  )
}
