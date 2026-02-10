import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { HeroRotator } from "@/components/hero-rotator"

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

const solutionPoints = [
  "図面がない部品の形状把握・再現",
  "生産終了品の再調達・復元検討",
  "試作の形状検証・組付け確認",
  "既存部品の仕様・寸法整理",
]

const recommendationPoints = [
  "現物はあるが図面が残っていない",
  "技術的に可能か先に判断したい",
  "社内で検討するための試作品が必要",
  "小ロットで形状確認したい",
]
export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[420px] overflow-hidden py-16 md:min-h-[560px] md:py-24 lg:min-h-[640px]">
        <HeroRotator intervalMs={5000} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <h1 className="text-balance font-bold leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {"実物から、解析・データ化・復元・試作まで。"}
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
              className="min-w-[180px] px-6 text-base md:text-lg"
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
              {"図面が残っていない部品、生産中止のパーツ、構造の把握が必要な製品。"}
              <br/>
              {"こうした課題に対して、3Dスキャンによるデータ化から3Dプリントによる試作・復元まで、一貫した対応が可能です。"}
              </p>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="reveal--scroll">
            <SectionHeading>{"できること"}</SectionHeading>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => {
              const href = item.href ?? "/contact"
              const linkLabel = item.linkLabel ?? "詳細はお問い合わせへ"
              return (
                <Link key={item.title} href={href} className="group block">
                  <Card className="hover-sheen overflow-hidden border-border transition-[box-shadow,border-color,transform] group-hover:scale-[1.02] group-hover:shadow-lg group-hover:border-primary/70">
                    <Reveal className="reveal--scroll">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
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
                      <Reveal className="reveal--scroll">
                        <h3 className="font-semibold text-foreground">
                          {item.title}
                        </h3>
                      </Reveal>
                      <Reveal className="reveal--scroll">
                        <p className="leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </Reveal>
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

      {/* Quick summary */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mt-2 grid gap-4 md:grid-cols-2">
            <Reveal className="reveal--scroll">
              <div className="rounded-xl p-6">
                <h2 className="font-semibold text-foreground">
                  {"解決できること"}
                </h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
                  {solutionPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="list-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal className="reveal--scroll">
              <div className="rounded-xl p-6">
                <h2 className="font-semibold text-foreground">
                  {"こんな人におすすめ"}
                </h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
                  {recommendationPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="list-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
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

      {/* CTA */}
      <CTASection />
    </main>
  )
}
