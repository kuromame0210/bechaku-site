import type { Metadata } from "next"
import Script from "next/script"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { SITE_URL } from "@/lib/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "3Dプリントで部品復元・試作造形｜製造中止品の再現にも対応｜別役ロボット工業",
  description:
    "3Dスキャンデータから部品を復元・試作造形。組付け確認や形状検討にも対応。アクリル樹脂・耐熱樹脂・シリコーンゴム等の多素材対応。図面なしでもスキャンからワンストップで。",
  alternates: {
    canonical: "/print",
  },
}

const capabilities = [
  {
    image: "/images/prototype-print.webp",
    text: "試作品の造形",
  },
  {
    image: "/images/output-prototype.webp",
    text: "組み付け前の確認",
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

const materialLineup = [
  {
    code: "AR-M2",
    description: "アクリルベース(少量のウレタン入り)",
  },
  {
    code: "AR-H1",
    description: "耐熱アクリル樹脂(100～120度ほどの耐熱)",
  },
  {
    code: "AR-G1H",
    description: "高硬度シリコーンゴム(ショア硬度65℃)",
  },
  {
    code: "AR-G1L",
    description: "低硬度シリコーンゴム(ショア硬度35℃)",
  },
]

const materialPdfs = [
  {
    title: "低硬度シリコーンゴム素材のご案内PDF",
    href: "/pdfs/シリコーンゴム登場.pdf",
  },
  {
    title: "高硬度シリコーンゴム素材のご案内PDF",
    href: "/pdfs/高硬度シリコーンゴム登場.pdf",
  },
  {
    title: "耐熱アクリル樹脂素材のご案内PDF",
    href: "/pdfs/耐熱チラシ small.pdf",
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

const printFaqItems = [
  {
    id: "print-faq-1",
    question: "どのくらいの大きさまで対応できますか？",
    answer:
      "おおよそ1000mm程度まで対応可能です。\nそれ以上のサイズについては、分割対応などを含めて個別にご相談ください。",
  },
  {
    id: "print-faq-2",
    question: "造形できる素材にはどのようなものがありますか？",
    answer: "樹脂やシリコンなどに対応しています。",
  },
  {
    id: "print-faq-3",
    question: "造形ではどのようなものが作れますか？",
    answer:
      "部品・試作品・検証用モデルなど、\n形状確認や機能検討を目的とした造形に対応しています。\n用途や条件によって対応可否が異なるため、\nまずは目的をお聞かせください。",
  },
  {
    id: "print-faq-4",
    question: "納期はどのくらいかかりますか？",
    answer:
      "対象物の大きさ・形状・内容によって異なります。\nお見積り時に、想定スケジュールをご案内します。",
  },
  {
    id: "print-faq-5",
    question: "費用はどのくらいかかりますか？",
    answer:
      "大きさ・形状・素材・作業内容によって異なります。\nご相談内容を確認した上で、都度お見積りいたします。",
  },
]

const noticeSummary = [
  "透明・鏡面・囲い形状はスキャンが難しい場合があります。",
  "機械精度や環境による誤差が生じる可能性があります。",
  "素材の収縮などにより実寸値からの差が出ることがあります。",
]

export default function PrintPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "3Dプリント（部品復元・試作造形）",
    description:
      "3Dスキャンデータから部品を復元・試作造形。組付け確認や形状検討にも対応。アクリル樹脂・耐熱樹脂・シリコーンゴム等の多素材対応。",
    provider: {
      "@type": "Organization",
      name: "別役ロボット工業株式会社",
      url: SITE_URL,
    },
    areaServed: "JP",
    serviceType: "3Dプリント・試作造形",
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: printFaqItems.map((item) => ({
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
      <Script id="print-service-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <Script id="print-faq-schema" type="application/ld+json" strategy="afterInteractive">
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
                  {"3Dデータから造形・試作"}
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
              <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-2xl md:block">
                <ImageWithFallback
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
                    <ImageWithFallback
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
                  <ImageWithFallback
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

      {/* Materials */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading sub="3Dプリントで対応できる材質の一覧です。">
              {"対応可能な材質"}
            </SectionHeading>
          </Reveal>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2">
            {materialLineup.map((material) => (
              <Reveal key={material.code}>
                <div className="flex items-start gap-3">
                  <span className="list-dot mt-2" />
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground">
                      {material.code}
                    </dt>
                    <dd className="text-base font-medium text-foreground">
                      {material.description}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal>
            <div className="mt-8 rounded-2xl border border-border bg-secondary/50 px-6 py-6">
              <p className="text-sm font-semibold text-foreground">
                {"資料PDF"}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {materialPdfs.map((pdf) => (
                  <Button
                    asChild
                    key={pdf.href}
                    className="h-auto w-full justify-center whitespace-normal text-center leading-snug"
                  >
                    <Link
                      href={pdf.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pdf.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
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
                  <ImageWithFallback
                    src="/images/3d-printer-setup.webp"
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
              {printFaqItems.map((item) => (
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
                  <ImageWithFallback
                    src="/images/precision-assembly-scene.webp"
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
        eventLabel="print_page_cta"
      />
    </main>
  )
}
