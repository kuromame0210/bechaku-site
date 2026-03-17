import type { Metadata } from "next"
import { ImageWithFallback } from "@/components/image-with-fallback"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { HeroRotator } from "@/components/hero-rotator"

export const metadata: Metadata = {
  title: "3Dスキャン・3Dプリント | 別役ロボット工業株式会社",
  description:
    "3Dスキャン/3Dプリントによるリバースエンジニアリング、試作、部品復元まで対応します。",
  alternates: {
    canonical: "/",
  },
}

const capabilities = [
  {
    image: "/images/3d-scanner-vl-700.webp",
    title: "実物 → 3Dデータ化",
    description:
      "現物をスキャンし、形状・構造を3Dデータとして取得します。図面がない状態からの検討が可能です。",
    href: "/scan",
    linkLabel: "3Dスキャン詳細",
  },
  {
    image: "/images/3d-printer-aglista.webp",
    title: "3Dデータ → 造形",
    description:
      "3Dデータをもとに試作品を造形。組付けや干渉確認、形状検討に活用できます。",
    href: "/print",
    linkLabel: "3Dプリント詳細",
  },
  {
    image: "/images/icon-restore.webp",
    title: "旧パーツ・部品の復元",
    description:
      "生産中止部品や入手困難なパーツを、スキャン・データ化を経て復元します。",
    href: "/faq",
    linkLabel: "FAQを見る",
  },
  {
    image: "/images/icon-prototype.webp",
    title: "試作・量産（カスタム）",
    description:
      "試作から小ロット量産、カスタム対応まで。目的に応じた造形方法をご提案します。",
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
    description: "形状・寸法の整理、検討用のデータ化まで対応します。",
  },
  {
    image: "/images/output-prototype.webp",
    title: "試作モデル",
    description: "形状確認・組付け確認など、評価用の造形を行います。",
  },
  {
    image: "/images/output-restoration.webp",
    title: "復元パーツ",
    description: "生産終了品の再調達や復元検討に活用できます。",
  },
  {
    image: "/images/output-jig.webp",
    title: "治具・補助具",
    description: "現場導入に向けた治具や補助具の内製化に対応します。",
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
    after: "社内で機能検証まで対応できるので、検証のタイミングを前倒しできます。",
  },
  {
    image: "/images/worries-design-process.webp",
    category: "デザイン",
    headline: "意思決定をスムーズに",
    before: "アイデアが伝わりにくく、判断が先延ばしになって困る。",
    after: "アイデアをすぐ形にできるので、その場で判断・意思決定が進みます。",
  },
  {
    image: "/images/worries-sales.webp",
    category: "営業",
    headline: "提案力UP",
    before: "提案時の説得材料が弱く、相手の反応が薄くて困る。",
    after: "実物に近いモックアップで提案できるので、商談での説得力が高まります。",
  },
  {
    image: "/images/worries-manufacturing.webp",
    category: "製造",
    headline: "コスト削減",
    before: "治具を外注しており、コストと納期がネックで困る。",
    after: "治具を内製化できるので、コストも納期も自社でコントロールできます。",
  },
]
export default function HomePage() {
  return (
    <main>
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
            {"図面がなくても、現物があれば技術的に成立するかを判断し、形にします。"}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="min-w-[180px] px-6 text-[1.25rem] md:text-[1.5rem]"
            >
              <Link href="/contact">{"お問い合わせ"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="reveal--scroll">
            <p className="leading-loose text-muted-foreground">
              {"図面がない部品の復元、現物からの3Dデータ化、試作や形状確認のご相談に対応しています。"}
              <br />
              {"3Dスキャンによるデータ化から3Dプリントによる試作・復元まで、内容に応じて一貫して対応可能です。"}
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
