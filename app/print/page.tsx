import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { NoticeBanner } from "@/components/notice-banner"
import { SectionHeading } from "@/components/section-heading"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "3Dプリント（3Dデータ→造形・試作） | 別役ロボット工業",
  description:
    "3Dデータをもとに試作品を造形。組付け・干渉確認、形状検討など、設計検討を実物で進められます。",
}

const capabilities = [
  {
    image: "/images/icon-print.jpg",
    text: "試作品の造形",
  },
  {
    image: "/images/icon-assembly.jpg",
    text: "組付け・干渉確認モデル",
  },
  {
    image: "/images/icon-small-batch.jpg",
    text: "小ロットでの形状確認",
  },
]

const useCases = [
  "図面だけでは判断しにくい",
  "組付けや干渉を実物でチェックしたい",
  "関係者と実物を見ながら検討したい",
  "量産前にリスクを減らしたい",
]

const benefits = [
  "形状・サイズ感の確認",
  "組付け・干渉の事前チェック",
  "設計変更の影響確認",
]

export default function PrintPage() {
  return (
    <main>
      <NoticeBanner />

      {/* Page header */}
      <section className="bg-card py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h1">
              {"3Dデータから造形・試作（3Dプリント）"}
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading sub="3Dプリントで対応できる基本的な内容です。">
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
                      className="object-cover"
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

      {/* Benefits of prototyping */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"試作で得られること"}</SectionHeading>
          </Reveal>
          <Reveal>
            <ul className="mt-6 flex flex-col gap-3">
              {benefits.map((item) => (
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

      {/* Next steps */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"次のステップ"}</SectionHeading>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex flex-col gap-3">
              <p className="leading-loose text-muted-foreground">
                {"スキャン → 試作 → 検討 → 必要に応じて再設計・再試作。"}
              </p>
              <p className="leading-loose text-muted-foreground">
                {"目的に合わせて段階的に進められます。一度の試作で完成を求める必要はありません。"}
              </p>
            </div>
            <p className="mt-6 text-foreground">
              {"※量産対応・事例紹介は後日追加予定です"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="3Dプリントについてのご相談"
        description="試作・造形の検討段階でもお気軽にご相談ください。目的に合わせた方法をご提案します。"
      />
    </main>
  )
}
