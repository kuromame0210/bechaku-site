import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NoticeBanner } from "@/components/notice-banner"

export const metadata: Metadata = {
  title: "取引の流れ | 別役ロボット工業（仮）",
  description:
    "3Dスキャン・3Dプリントのお取引の流れ。お問い合わせから納品までのステップをご案内します。",
}

const steps = [
  {
    number: 1,
    title: "お問合せ",
    description:
      "電話、FAX、お問い合わせフォームより\nお問い合わせお受けしています",
  },
  {
    number: 2,
    title: "現物確認",
    description:
      "3Dスキャンしたいものを確認し、\n可能かどうか判断します",
  },
  {
    number: 3,
    title: "お見積り",
    description: "お見積りと納期のご連絡します",
  },
  {
    number: 4,
    title: "3Dデータ化",
    description:
      "3Dスキャナで3Dデータ作成\n（※データのご提供可能）",
  },
  {
    number: 5,
    title: "図面化",
    description: "ご希望があれば2Dに図面化します",
  },
  {
    number: 6,
    title: "納品",
    description: "造形して納品",
  },
]

export default function FlowPage() {
  return (
    <main>
      <NoticeBanner />

      {/* Page heading */}
      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {"Flow"}
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-relaxed text-foreground md:text-3xl">
            {"お取引の流れ"}
          </h1>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-6 md:gap-10">
                {/* Left: number + connector line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground md:h-14 md:w-14 md:text-xl">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>

                {/* Right: content */}
                <div className={`pb-12 pt-2 ${index === steps.length - 1 ? "pb-0" : ""} md:pb-14`}>
                  <h2 className="text-lg font-semibold text-foreground md:text-xl">
                    {step.title}
                  </h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-loose text-muted-foreground md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-secondary py-16 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            {"お困りの方は是非ご相談ください"}
          </h2>
          <dl className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <dt className="font-medium text-foreground">{"電話番号:"}</dt>
              <dd>{"000-0000-0000（仮）"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-foreground">{"mail:"}</dt>
              <dd>{"info@example.com（仮）"}</dd>
            </div>
          </dl>
          <Button asChild size="lg">
            <Link href="/#contact">{"お問い合せフォーム"}</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
