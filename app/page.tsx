import type { Metadata } from "next"
import Script from "next/script"
import { ImageWithFallback } from "@/components/image-with-fallback"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { HeroRotator } from "@/components/hero-rotator"
import { CTALink } from "@/components/cta-link"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "リバースエンジニアリング｜図面なし部品の復元・試作相談｜別役ロボット工業",
  description:
    "図面がない部品も、現物から3Dスキャンでデータ化できるか確認。3Dプリントでの復元・試作、製造中止部品や旧パーツの再現可否など、まずご相談ください。",
  alternates: {
    canonical: "/",
  },
}

const capabilities = [
  {
    image: "/images/3d-scanner-vl-700.webp",
    title: "実物 → 3Dデータ化",
    description:
      "現物をスキャンし、形状・構造を3Dデータとして取得できるか確認します。図面がない状態からの検討が可能です。",
    href: "/scan",
    linkLabel: "3Dスキャン詳細",
  },
  {
    image: "/images/3d-printer-aglista.webp",
    title: "3Dデータ → 造形",
    description:
      "3Dデータをもとに試作品の造形を検討。組付けや干渉確認、形状検討に活用できる場合があります。",
    href: "/print",
    linkLabel: "3Dプリント詳細",
  },
  {
    image: "/images/icon-restore.webp",
    title: "旧パーツ・部品の復元",
    description:
      "生産中止部品や入手困難なパーツを、スキャン・データ化を経て復元できるか確認します。",
    href: "/faq",
    linkLabel: "FAQを見る",
  },
  {
    image: "/images/icon-prototype.webp",
    title: "試作・量産（カスタム）",
    description:
      "試作から小ロット量産、カスタム対応まで。目的に応じた造形方法を検討します。",
    href: "/faq",
    linkLabel: "FAQを見る",
  },
]

const consultationPoints = [
  "現物がある、または準備できる",
  "目的がある程度明確（復元・試作・検討など）",
  "技術的な可否判断を含めて相談したい",
]

const outputs = [
  {
    image: "/images/output-data.webp",
    title: "3Dデータ",
    description: "形状・寸法の整理、検討用のデータ化をご相談いただけます。",
  },
  {
    image: "/images/output-prototype.webp",
    title: "試作モデル",
    description: "形状確認・組付け確認など、評価用の造形を検討します。",
  },
  {
    image: "/images/output-restoration.webp",
    title: "復元パーツ",
    description: "生産終了品の再調達や復元検討に活用できる場合があります。",
  },
  {
    image: "/images/output-jig.webp",
    title: "治具・補助具",
    description: "現場導入に向けた治具や補助具の内製化を検討できます。",
  },
]

const worries = [
  {
    image: "/images/worries-design.webp",
    category: "設計",
    headline: "設計品質UP",
    before: "設計の精度に不安があり、最終試作で手戻りが出て困る。",
    after: "試作を早い段階から繰り返せるので、最終段階での手戻りを減らせます。",
  },
  {
    image: "/images/worries-prototype.webp",
    category: "試作",
    headline: "期間短縮",
    before: "外注試作に時間がかかり、検証のタイミングが遅れて困る。",
    after: "社内で機能検証まで進められる場合があり、検証のタイミングを前倒ししやすくなります。",
  },
  {
    image: "/images/worries-design-process.webp",
    category: "デザイン",
    headline: "意思決定をスムーズに",
    before: "アイデアが伝わりにくく、判断が先延ばしになって困る。",
    after: "アイデアを早い段階で形にすることで、判断・意思決定を進めやすくなります。",
  },
  {
    image: "/images/worries-sales.webp",
    category: "営業",
    headline: "提案力UP",
    before: "提案時の説得材料が弱く、相手の反応が薄くて困る。",
    after: "実物に近いモックアップを用意できる場合、商談時の説明材料になります。",
  },
  {
    image: "/images/worries-manufacturing.webp",
    category: "製造",
    headline: "コスト削減",
    before: "治具を外注しており、コストと納期がネックで困る。",
    after: "治具を内製化できる場合、コストや納期を調整しやすくなります。",
  },
]

const seoArticles = [
  {
    title: "図面がない部品は作れる？",
    description:
      "現物から3Dスキャンでデータ化し、部品を復元・製作できるか確認する流れを解説します。",
    href: "/blog/no-drawing-parts-manufacturing",
  },
  {
    title: "製造中止部品を復元する方法",
    description:
      "代替品探し・中古品・リバースエンジニアリング・設計変更を比較します。",
    href: "/blog/manufacturing-discontinued-parts",
  },
  {
    title: "壊れた部品を3Dプリントで復元できるか",
    description:
      "設備部品の復元で使える素材、精度、相談前の確認点を整理します。",
    href: "/blog/broken-parts-3d-print-restoration",
  },
]
export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "別役ロボット工業株式会社",
    url: SITE_URL,
    telephone: "+81-495-71-6824",
    email: "h-betchaku@brinet.co.jp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "児玉町児玉1391-9",
      addressLocality: "本庄市",
      addressRegion: "埼玉県",
      postalCode: "367-0212",
      addressCountry: "JP",
    },
    description:
      "3Dスキャン・3Dプリントによるリバースエンジニアリング。図面がない部品の復元・試作相談に対応。",
    areaServed: "JP",
    knowsLanguage: "ja",
  }

  return (
    <main>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(localBusinessSchema)}
      </Script>
      {/* Hero */}
      <section className="relative min-h-[420px] overflow-hidden py-16 md:min-h-[560px] md:py-24 lg:min-h-[640px]">
        <HeroRotator intervalMs={5000} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:max-w-[84rem]">
          <h1 className="text-balance font-bold leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {"実物から解析・データ化・復元・試作まで"}
            <br />
            {"3Dスキャン・3Dプリントによるリバースエンジニアリング"}
          </h1>
          <p className="mt-4 leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            {"図面がない部品でも、現物を確認したうえで技術的に成立するか判断します。"}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="min-w-[180px] px-6 text-[1.25rem] md:text-[1.5rem]"
            >
              <CTALink href="/contact" eventLabel="hero_cta">{"お問い合わせ"}</CTALink>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="reveal--scroll">
            <p className="leading-loose text-muted-foreground">
              {"図面がない部品の復元、現物からの3Dデータ化、試作や形状確認をご相談いただけます。"}
              <br />
              {"3Dスキャンによるデータ化から3Dプリントによる試作・復元まで、内容に応じて対応可否を確認します。"}
              </p>
          </Reveal>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 pt-12 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild variant="outline" size="lg" className="min-w-[260px]">
            <Link href="/scan">{"3Dスキャンについての詳細はこちら"}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[260px]">
            <Link href="/print">{"3Dプリントについての詳細はこちら"}</Link>
          </Button>
        </div>

      </section>

      {/* Capabilities */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading>{"できること"}</SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => {
              const href = item.href ?? "/contact"
              const linkLabel = item.linkLabel ?? "詳細はお問い合わせへ"
              return (
                <Link key={item.title} href={href} className="group block">
                  <Card className="hover-sheen overflow-hidden border-border transition-shadow group-hover:shadow-lg">
                    <Reveal className="reveal--scroll">
                      <div className="hover-sheen relative aspect-[16/9] w-full">
                        <ImageWithFallback
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className={
                            item.title === "実物 → 3Dデータ化" ||
                            item.title === "3Dデータ → 造形"
                              ? "object-contain"
                              : "object-cover"
                          }
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    </Reveal>
                    <CardContent className="flex flex-col gap-3 p-6">
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <span className="mt-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80 group-hover:underline">
                        {linkLabel}
                        {" →"}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Outputs */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="reveal--scroll">
            <SectionHeading>{"成果物・アウトプット"}</SectionHeading>
          </Reveal>
          <Reveal className="reveal--scroll">
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {"ご相談内容に応じて、最終的に手元に残る成果物のイメージです。"}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {outputs.map((item) => (
              <Card key={item.title} className="border-border">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <Reveal className="reveal--scroll">
                    <div className="hover-sheen relative aspect-[16/9] w-full overflow-hidden rounded-md">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  </Reveal>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO articles */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="reveal--scroll">
            <SectionHeading sub="図面なし・製造中止・壊れた部品で困っている方向けの解説です。">
              {"部品復元の相談前に読む記事"}
            </SectionHeading>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {seoArticles.map((article) => (
              <Reveal key={article.href} className="reveal--scroll">
                <Link href={article.href} className="group block h-full">
                  <Card className="h-full border-border transition-shadow group-hover:shadow-lg">
                    <CardContent className="flex h-full flex-col gap-3 p-6">
                      <h3 className="font-semibold leading-relaxed text-foreground group-hover:underline">
                        {article.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        {article.description}
                      </p>
                      <span className="mt-auto pt-2 text-sm font-medium text-primary">
                        {"記事を読む →"}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* Worries — 課題プッシュ型 */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="reveal--scroll">
            <SectionHeading>{"よくあるお悩みと解決"}</SectionHeading>
          </Reveal>
          <Reveal className="reveal--scroll">
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {"こんな課題はありませんか？"}
            </p>
          </Reveal>

          {/* タイムライン + リスト（PC/SP共通） */}
          <div className="mt-6 flex flex-col">
            {worries.map((item, i) => (
              <Reveal key={item.category} className="reveal--scroll">
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full bg-primary" />
                    {i < worries.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-base font-bold text-foreground">
                      {item.headline}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      <span className="mr-2 inline-block rounded border border-foreground/30 px-1.5 py-0.5 text-xs font-semibold text-foreground">{"課題"}</span>
                      {item.before}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      <span className="mr-2 inline-block rounded bg-primary/15 px-1.5 py-0.5 text-xs font-semibold text-primary">{"解決"}</span>
                      {item.after}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* Consultation guidance */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="reveal--scroll">
            <SectionHeading>
              {"ご相談にあたって（対応範囲の目安）"}
            </SectionHeading>
          </Reveal>
          <Reveal className="reveal--scroll">
            <ul className="mt-6 flex flex-col gap-3">
              {consultationPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                >
                  <span className="list-dot" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {"「とりあえず作ってほしい」「内容が全く未定」というよりも、技術検討を進めたい段階の方に向いています。"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pre-CTA links */}
      <section className="border-t border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-center">
          <Button asChild variant="outline" size="lg" className="min-w-[260px]">
            <Link href="/scan">{"3Dスキャンについての詳細はこちら"}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[260px]">
            <Link href="/print">{"3Dプリントについての詳細はこちら"}</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  )
}
