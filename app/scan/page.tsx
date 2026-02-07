import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { NoticeBanner } from "@/components/notice-banner"
import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "3Dスキャン（実物→3Dデータ化） | 別役ロボット工業",
  description:
    "現物を精密にスキャンし、形状・構造を3Dデータとして取得。図面がない状態からの技術検討が可能です。",
}

const capabilities = [
  {
    image: "/images/icon-scan.webp",
    text: "実物を精密にスキャン",
  },
  {
    image: "/images/icon-3d-data.webp",
    text: "形状・構造を3Dデータとして取得",
  },
  {
    image: "/images/icon-no-drawing.webp",
    text: "図面がない状態から検討可能",
  },
]

const useCases = [
  "図面が残っていない部品を再現したい",
  "古い設備で仕様や寸法が分からない",
  "海外製・他社製部品の形状を正確に把握したい",
  "まず技術的に可能か判断したい",
]

const cautions = [
  {
    image: "/images/icon-caution-surface.webp",
    title: "透明・鏡面・囲い形状",
    description:
      "透明素材や鏡面仕上げ、完全に囲われた内部構造はスキャンが難しい場合があります。",
  },
  {
    image: "/images/icon-caution-correction.webp",
    title: "補正・推定が入る場合",
    description:
      "形状によっては、スキャンデータに対して補正や推定処理が必要になる場合があります。",
  },
]

const flowSteps = [
  {
    number: 1,
    title: "お問合せ",
    description: "電話、FAX、お問い合わせフォームよりご相談ください",
  },
  {
    number: 2,
    title: "現物確認",
    description: "スキャン対象を確認し、対応可否を判断します",
  },
  {
    number: 3,
    title: "お見積り",
    description: "費用と納期のご案内をします",
  },
  {
    number: 4,
    title: "3Dデータ化",
    description: "3Dスキャナでデータ化（※データ提供も可能）",
  },
  {
    number: 5,
    title: "図面化（必要に応じて）",
    description: "ご希望があれば2D図面化します",
  },
  {
    number: 6,
    title: "納品",
    description: "データ／造形物を納品します",
  },
]

const faqHighlights = [
  "図面やCADデータがなくても相談できますか？",
  "古くて破損している部品でも復元できますか？",
  "どのくらいの大きさまで対応できますか？",
  "納期はどのくらいかかりますか？",
  "費用はどのくらいかかりますか？",
]

const noticeSummary = [
  "透明・鏡面・囲い形状はスキャンが難しい場合があります。",
  "機械精度や環境による誤差が生じる可能性があります。",
  "素材の収縮などにより実寸値からの差が出ることがあります。",
]

export default function ScanPage() {
  return (
    <main>
      <NoticeBanner />

      {/* Page header */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <Image
          src="/images/section-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col gap-6">
                <SectionHeading tag="h1">
                  {"実物から3Dデータ化 \n（3Dスキャン）"}
                </SectionHeading>
                <p className="max-w-2xl leading-relaxed text-foreground">
                  {"現物があれば、図面がなくても3Dデータ化が可能です。"}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/contact">{"お問い合わせ"}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#flow">{"取引の流れを見る"}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/3d-scanner-vl-700.webp"
                  alt="3Dスキャナの設備イメージ"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading sub="3Dスキャンで対応できる基本的な内容です。">
              {"できること"}
            </SectionHeading>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {capabilities.map((item) => (
              <Reveal key={item.text}>
                <Card className="overflow-hidden border-border">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.text}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="font-medium leading-relaxed text-foreground">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>
              {"こんな状況の方に向いています"}
            </SectionHeading>
          </Reveal>
          <Reveal>
            <ul className="mt-6 flex flex-col gap-3">
              {useCases.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                >
                  <span className="list-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Reverse engineering explanation */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>
              {"リバースエンジニアリングとは（補足）"}
            </SectionHeading>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex flex-col gap-3">
              <p className="leading-loose text-muted-foreground">
                {"既存製品や部品を解析し、構造や仕様を明らかにする技術的アプローチです。"}
              </p>
              <p className="leading-loose text-muted-foreground">
                {"実物 → 3Dスキャン → データ解析という流れで、設計・検討に使える情報を整理します。"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Notice */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"注意事項"}</SectionHeading>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {cautions.map((item) => (
              <Reveal key={item.title}>
                <Card className="overflow-hidden border-border">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <CardContent className="flex flex-col gap-2 p-6">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-foreground">
              {"※詳細は後日整理予定です"}
            </p>
            <Link
              href="/notice"
              className="mt-4 inline-flex text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              {"注意事項を詳しく見る"}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"取引の流れ"}</SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-8 md:gap-14 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/icon-3d-data.webp"
                    alt="3Dスキャンによるデータ化イメージ"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="flex flex-col">
                {flowSteps.map((step, index) => (
                  <div key={step.number} className="flex gap-6 md:gap-10">
                    <div className="flex flex-col items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground md:h-12 md:w-12 md:text-lg">
                        {step.number}
                      </div>
                      {index < flowSteps.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className={`pb-10 pt-1 ${index === flowSteps.length - 1 ? "pb-0" : ""}`}>
                      <h3 className="font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"よくあるご質問"}</SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-8 md:gap-14 md:grid-cols-2 md:items-center">
            <Reveal className="md:order-2">
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/part-standalone-photo.jpg"
                    alt="部品の写真イメージ"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal className="md:order-1">
              <ul className="flex flex-col gap-3">
                {faqHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <span className="list-dot" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/faq"
                className="mt-6 inline-flex text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                {"FAQを詳しく見る"}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>


      {/* CTA */}
      <CTASection
        heading="3Dスキャンについてのご相談"
        description="図面がない部品や形状把握が必要な場合、まずはお気軽にご相談ください。"
      />
    </main>
  )
}
