import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "3Dプリント（3Dデータ→造形・試作） | 別役ロボット工業株式会社",
  description:
    "3Dデータをもとに試作品を造形。組付け・干渉確認、形状検討など、設計検討を実物で進められます。",
}

const capabilities = [
  {
    image: "/images/prototype-print.jpg",
    text: "試作品の造形",
  },
  {
    image: "/images/3d-printer-setup.jpeg",
    text: "組み付け確認前の確認",
  },
  {
    image: "/images/icon-small-batch.webp",
    text: "小ロットでの形状確認",
  },
]

const useCases = [
  "図面だけでは判断しにくい",
  "組付けや干渉を実物でチェックしたい",
  "関係者と実物を見ながら検討したい",
  "量産前にリスクを減らしたい",
]

const printerSpecs = [
  "割れにくいアクリル樹脂/シリコンゴムで造形可能",
  "耐水性・透明性・靭性のある造形材料を使用可能",
  "造形材料は15-30μmの積層ピッチで造形",
  "1/100mmオーダーの高精度",
  "複雑な形状でも細部まで十分な精度で検証可能",
]


const flowSteps = [
  {
    number: 1,
    title: "お問合せ",
    description: "電話、FAX、お問い合わせフォームよりご相談ください",
  },
  {
    number: 2,
    title: "造形内容の確認",
    description: "用途・材質・サイズなどの条件を確認します",
  },
  {
    number: 3,
    title: "お見積り",
    description: "費用と納期のご案内をします",
  },
  {
    number: 4,
    title: "造形データの確認",
    description: "ご提供データの確認、必要に応じて修正をご相談します",
  },
  {
    number: 5,
    title: "3Dプリント（造形）",
    description: "ご希望の仕様で造形を進めます",
  },
  {
    number: 6,
    title: "納品",
    description: "造形物を納品します",
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

export default function PrintPage() {
  return (
    <main>
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
                  {"3Dデータから造形・試作（3Dプリント）"}
                </SectionHeading>
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
                  src="/images/3d-printer-aglista.webp"
                  alt="3Dプリンタの設備イメージ"
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

      {/* Specs */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"仕様・特徴"}</SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-8 md:gap-14 md:grid-cols-2 md:items-center">
            <Reveal>
              <ul className="flex flex-col gap-3">
                {printerSpecs.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <span className="list-dot" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6" size="lg">
                <Link
                  href="/pdfs/agilista-catalog.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"カタログPDFを見る"}
                </Link>
              </Button>
            </Reveal>
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/print-feature.webp"
                    alt="3Dプリントの仕様・特徴イメージ"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>
            </Reveal>
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
                    src="/images/3d-printer-setup.jpeg"
                    alt="3Dプリンタ設備のイメージ"
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
                    src="/images/output-restoration.png"
                    alt="部品の復元イメージ"
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
                className="mt-6 inline-flex text-sm font-medium text-foreground/70 transition-colors hover:text-foreground/90 hover:underline"
              >
                {"FAQを詳しく見る"}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"注意事項"}</SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-8 md:gap-14 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/part-standalone-photo.jpg"
                    alt="注意事項に関連する部品のイメージ"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal>
              <ul className="flex flex-col gap-3">
                {noticeSummary.map((item) => (
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
                href="/notice"
                className="mt-6 inline-flex text-sm font-medium text-foreground/70 transition-colors hover:text-foreground/90 hover:underline"
              >
                {"注意事項を詳しく見る"}
              </Link>
            </Reveal>
          </div>
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
