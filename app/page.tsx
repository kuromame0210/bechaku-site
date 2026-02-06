import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NoticeBanner } from "@/components/notice-banner"
import { SectionHeading } from "@/components/section-heading"
import { CTASection } from "@/components/cta-section"

const capabilities = [
  {
    image: "/images/icon-scan.jpg",
    title: "実物 → 3Dデータ化",
    description:
      "現物をスキャンし、形状・構造を3Dデータとして取得します。図面がない状態からの検討が可能です。",
    href: "/scan",
    linkLabel: "3Dスキャン詳細",
  },
  {
    image: "/images/icon-print.jpg",
    title: "3Dデータ → 造形",
    description:
      "3Dデータをもとに試作品を造形。組付けや干渉確認、形状検討に活用できます。",
    href: "/print",
    linkLabel: "3Dプリント詳細",
  },
  {
    image: "/images/icon-restore.jpg",
    title: "旧パーツ・部品の復元",
    description:
      "生産中止部品や入手困難なパーツを、スキャン・データ化を経て復元します。",
    href: null,
    linkLabel: null,
  },
  {
    image: "/images/icon-prototype.jpg",
    title: "試作・量産（カスタム）",
    description:
      "試作から小ロット量産、カスタム対応まで。目的に応じた造形方法をご提案します。",
    href: null,
    linkLabel: null,
  },
]

const consultationPoints = [
  "現物がある、または準備できる",
  "目的がある程度明確（復元・試作・検討など）",
  "技術的な可否判断を含めて相談したい",
]

export default function HomePage() {
  return (
    <main>
      <NoticeBanner />

      {/* Hero */}
      <section className="bg-card py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-balance text-2xl font-bold leading-relaxed text-foreground md:text-3xl">
            {"実物から、解析・データ化・復元・試作まで。"}
            <br />
            {"3Dスキャン・3Dプリントによるリバースエンジニアリング"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {"図面がなくても、現物があれば技術的に成立するかを判断し、形にします。"}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/#contact">{"お問い合わせ"}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/scan">{"3Dスキャンとは"}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/print">{"3Dプリントとは"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-5xl px-6">
          <p className="max-w-3xl text-sm leading-loose text-muted-foreground md:text-base">
            {"図面が残っていない部品、生産中止のパーツ、構造の把握が必要な製品。こうした課題に対して、3Dスキャンによるデータ化から3Dプリントによる試作・復元まで、一貫した対応を行っています。"}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading>{"できること"}</SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => (
              <Card
                key={item.title}
                className="overflow-hidden border-border"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="flex flex-col gap-3 p-6">
                  <h3 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="mt-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {item.linkLabel}
                      {" →"}
                    </Link>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground/60">
                      {"※詳細ページは後日追加予定"}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation guidance */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading>
            {"ご相談にあたって（対応範囲の目安）"}
          </SectionHeading>
          <ul className="mt-6 flex flex-col gap-3">
            {consultationPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {"「とりあえず作ってほしい」「内容が全く未定」というよりも、技術検討を進めたい段階の方に向いています。"}
          </p>
        </div>
      </section>

      {/* Future sections note */}
      <section className="border-t border-border bg-secondary py-10">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm text-muted-foreground">
            {"事例紹介・FAQ・フロー解説は後日追加予定です。"}
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  )
}
