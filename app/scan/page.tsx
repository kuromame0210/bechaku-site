import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { NoticeBanner } from "@/components/notice-banner"
import { SectionHeading } from "@/components/section-heading"
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

export default function ScanPage() {
  return (
    <main>
      <NoticeBanner />

      {/* Page header */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <Image
          src="/images/re_bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <SectionHeading tag="h1">
                {"実物から3Dデータ化（3Dスキャン）"}
              </SectionHeading>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/vl-700-scanner.png"
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
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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

      {/* Cautions */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"注意点（仮）"}</SectionHeading>
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
                      className="object-contain"
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
          </Reveal>
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
