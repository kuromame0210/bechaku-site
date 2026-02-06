import type { Metadata } from "next"
import { NoticeBanner } from "@/components/notice-banner"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "このサイトの使い方 | 別役ロボット工業",
  description:
    "営業・社内説明のために、どのページをどの順で見せるかを整理したガイドです。",
}

const steps = [
  {
    number: 1,
    title: "導入の共有",
    description:
      "トップで全体像を軽く共有し、\n相手の関心や目的を確認します。",
  },
  {
    number: 2,
    title: "必要ページの選択",
    description:
      "3Dスキャン／3Dプリントなど、\n目的に合うページだけを提示します。",
  },
  {
    number: 3,
    title: "流れの確認",
    description:
      "取引の流れで進め方を整理し、\n認識のズレを減らします。",
  },
  {
    number: 4,
    title: "補足・次アクション",
    description:
      "必要に応じてFAQや注意事項を案内し、\n次の連絡手段を示します。",
  },
]

const audienceGuides = [
  {
    title: "初回の相談",
    description:
      "トップ → 該当ページ → 取引の流れの順で概要を共有する。",
  },
  {
    title: "社内検討中",
    description:
      "該当ページと取引の流れを中心に、判断材料だけを提示する。",
  },
  {
    title: "引き継ぎ説明",
    description:
      "このページをベースに、見る順番と説明のポイントを整理する。",
  },
]

const checkpoints = [
  "相手の目的や理解度を先に確認する",
  "不要なページは無理に見せない",
  "説明は短く区切り、都度反応を確認する",
  "必要な情報の不足があれば持ち帰る",
]

export default function UsagePage() {
  return (
    <main>
      <NoticeBanner />

      {/* Page header */}
      <section className="bg-card py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h1" sub="このサイトの使い方（営業・説明用）">
              {"Usage"}
            </SectionHeading>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {
                "このページは、営業・社内説明用の導線ガイドとして作成した仮ページです。"
              }
              <br />
              {
                "説明時は、相手の理解度や目的に応じて、見るページを取捨選択してください。"
              }
            </p>
          </Reveal>
        </div>
      </section>

      {/* Purpose */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <Reveal>
              <SectionHeading tag="h2" sub="営業・社内説明向けの手順整理">
                {"このページの目的"}
              </SectionHeading>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {
                  "営業で「どこを、どの順で見せるか」を明文化し、説明のばらつきを抑えるためのガイドです。"
                }
                <br />
                {
                  "サービス説明の代わりではなく、説明の順序と使い方を整理することを目的としています。"
                }
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h2" sub="必要に応じてページを取捨選択する">
              {"説明の進め方（ステップ）"}
            </SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <Reveal key={step.number}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {step.number}
                    </span>
                    <h3 className="font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audience guide */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h2" sub="相手に合わせた見せ方の目安">
              {"状況別の見せ方"}
            </SectionHeading>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {audienceGuides.map((guide) => (
              <Reveal key={guide.title}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">
                    {guide.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Checkpoints */}
      <section className="border-t border-border bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h2" sub="当日の説明・引き継ぎの確認用">
              {"チェックポイント"}
            </SectionHeading>
          </Reveal>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {checkpoints.map((item) => (
              <Reveal key={item}>
                <li className="rounded-lg border border-border bg-card px-4 py-3 text-base text-muted-foreground">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
