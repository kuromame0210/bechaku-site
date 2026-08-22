import type { Metadata } from "next"
import Script from "next/script"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { SITE_URL } from "@/lib/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "図面なし部品を現物から3Dデータ化｜3Dスキャン・図面化｜別役ロボット工業",
  description:
    "図面なし・CADデータなしの部品も、現物から3Dスキャンでデータ化できるか確認。製造中止部品や古い設備部品の形状把握、図面化、復元・試作前の可否判断をご相談いただけます。",
  alternates: {
    canonical: "/scan",
  },
}

const capabilities = [
  {
    image: "/images/scan-capability-precision.webp",
    text: "実物を3Dスキャンで確認",
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
  "図面なしの部品を作ってくれる業者を探している",
  "図面が残っていない部品を再現したい",
  "現物から図面化・CADデータ化を依頼したい",
  "古い設備で仕様や寸法が分からない",
  "製造中止部品や廃番部品の復元を検討したい",
  "海外製・他社製部品の形状を把握したい",
  "まず技術的に可能か判断したい",
]

const noDrawingPoints = [
  {
    title: "現物から形状を取得",
    description:
      "図面が残っていない部品でも、現物を3Dスキャンして形状・寸法をデータ化できるか確認します。",
  },
  {
    title: "復元・製作前の可否判断",
    description:
      "製造中止品や壊れた部品について、スキャン後に復元・試作へ進められるか確認します。",
  },
  {
    title: "写真段階の相談も可能",
    description:
      "まずは対象部品の写真・サイズ・用途を共有いただければ、相談の進め方をご案内します。",
  },
]

const scanSpecs = [
  "部品の3Dスキャン（裏側を含めた計測も個別に確認）",
  "対応サイズの目安: 40-580mm",
  "自動ノイズ処理",
  "フルカラー出力",
  "AIによる自動計測、測定結果のエクスポートに対応",
  "出力形式: DXF / STL / OBJ / STEP / 3MF",
]

const scanApplications = [
  "丸ごとスキャンしたデータをカラー出力し、活用方法を検討",
  "スペアパーツ作成の検討",
  "図面なし部品 / CADデータなし部品のCAD化",
  "デジタルアーカイブ（文化財などの現物を3Dデータとして保存）",
  "リバースエンジニアリング（解析・3Dプリンタ連携で復元・量産を検討）",
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

const scanFaqItems = [
  {
    id: "scan-faq-1",
    question: "図面やCADデータがなくても相談できますか？",
    answer:
      "現物の状態や用途を確認したうえで判断します。\n3Dスキャンで形状・寸法を取得し、\n設計や検討に使用できる3Dデータを作成できる場合があります。",
  },
  {
    id: "scan-faq-2",
    question: "古くて破損している部品でも復元できますか？",
    answer:
      "元の形状がどの程度残っているかを確認したうえで判断します。\n欠けや摩耗がある場合は、用途を伺ったうえで再設計・補正を検討します。",
  },
  {
    id: "scan-faq-3",
    question: "どのくらいの大きさまで対応できますか？",
    answer:
      "おおよそ1000mm程度までが目安です。\nただし、形状・重量・材質・必要精度によって異なるため、個別に確認します。",
  },
  {
    id: "scan-faq-4",
    question: "作成する3Dデータの形式は何ですか？",
    answer: "STL形式での提供となります。",
  },
  {
    id: "scan-faq-5",
    question: "納期はどのくらいかかりますか？",
    answer:
      "対象物の大きさ・形状・内容によって異なります。\nお見積り時に、想定スケジュールをご案内します。",
  },
]

const noticeSummary = [
  "透明・鏡面・囲い形状はスキャンが難しい場合があります。",
  "機械精度や環境による誤差が生じる可能性があります。",
  "素材の収縮などにより実寸値からの差が出ることがあります。",
]

export default function ScanPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "3Dスキャン（リバースエンジニアリング）",
    description:
      "図面なし・CADデータなしの部品も、現物から3Dデータ化できるか確認。製造中止品や旧型パーツの形状把握、CADデータ作成を検討。",
    provider: {
      "@type": "Organization",
      name: "別役ロボット工業株式会社",
      url: SITE_URL,
    },
    areaServed: "JP",
    serviceType: "リバースエンジニアリング",
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: scanFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <main>
      <Script id="scan-service-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <Script id="scan-faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      {/* Page header */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <ImageWithFallback
          src="/images/section-bg.webp"
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
                  {"図面なし部品を現物から3Dデータ化できるか確認"}
                </SectionHeading>
                <p className="max-w-2xl leading-relaxed text-foreground">
                  {"図面がない、CADデータがない、製造中止で入手できない。そうした部品でも、現物を確認したうえで3Dスキャンによる形状取得や復元・製作の検討につなげられるか判断します。"}
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
              <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-2xl md:block">
                <ImageWithFallback
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

      {/* No drawing support */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading sub="図面なし・現物のみの部品相談で、最初に確認するポイントです。">
              {"図面なし・現物からの部品製作相談"}
            </SectionHeading>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {noDrawingPoints.map((item) => (
              <Reveal key={item.title}>
                <Card className="h-full border-border">
                  <CardContent className="flex h-full flex-col gap-3 p-6">
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
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading sub="対象物の状態を確認したうえで、対応可否を判断する内容です。">
              {"相談できること"}
            </SectionHeading>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {capabilities.map((item) => (
              <Reveal key={item.text}>
                <Card className="overflow-hidden border-border">
                  <div className="relative aspect-[16/9] w-full">
                    <ImageWithFallback
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

      {/* Specs */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"仕様・特徴"}</SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-8 md:gap-14 md:grid-cols-2 md:items-center">
            <Reveal>
              <ul className="flex flex-col gap-3">
                {scanSpecs.map((item) => (
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
                  href="/pdfs/vl-800-catalog.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"カタログPDFを見る"}
                </Link>
              </Button>
            </Reveal>
            <Reveal>
              <div className="w-full overflow-hidden rounded-2xl md:mx-auto md:max-w-[480px]">
                <div className="relative aspect-[2331/2673] w-full">
                  <ImageWithFallback
                    src="/images/hero-scan-scene.webp"
                    alt="3Dスキャナの特徴イメージ"
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

      {/* Applications */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading>{"活用例"}</SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-8 md:gap-14 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="w-full overflow-hidden rounded-2xl md:mx-auto md:max-w-[480px]">
                <div className="relative aspect-[1553/2074] w-full">
                  <ImageWithFallback
                    src="/images/scan-usecase.webp"
                    alt="スキャン作業のイメージ"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal>
              <ul className="flex flex-col gap-3">
                {scanApplications.map((item) => (
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
                    <ImageWithFallback
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
              {
                "詳細な条件は対象物の形状・材質により異なります。事前にご相談ください。"
              }
            </p>
            <Link
              href="/notice"
              className="mt-4 inline-flex text-sm font-medium text-foreground/70 transition-colors hover:text-foreground/90 hover:underline"
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
                  <ImageWithFallback
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
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-[1.125rem] font-bold text-primary-foreground md:h-12 md:w-12 md:text-[1.25rem]">
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
          <Reveal>
            <Accordion type="multiple" className="mt-6 w-full">
              {scanFaqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-border"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold text-foreground hover:no-underline hover:text-primary">
                    <span>
                      {"Q. "}
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-0 text-base leading-loose text-muted-foreground">
                    {item.answer.split("\n").map((line, i) => (
                      <span key={`${item.id}-line-${i}`}>
                        {line}
                        {i < item.answer.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link
              href="/faq"
              className="mt-6 inline-flex text-sm font-medium text-foreground/70 transition-colors hover:text-foreground/90 hover:underline"
            >
              {"その他のFAQを見る"}
            </Link>
          </Reveal>
        </div>
      </section>


      {/* CTA */}
      <CTASection
        heading="図面なし・現物からの相談"
        description="写真だけ・現物だけの段階でも大丈夫です。まずは対応できるかどうかの確認からご相談ください。"
        eventLabel="scan_page_cta"
      />
    </main>
  )
}
