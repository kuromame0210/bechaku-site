import type { Metadata } from "next"
import { Reveal } from "@/components/reveal"
import { CTASection } from "@/components/cta-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "よくあるご質問（FAQ） | 別役ロボット工業株式会社",
  description:
    "3Dスキャン・3Dプリントに関するよくあるご質問をまとめています。",
}

const faqItems = [
  {
    id: "faq-1",
    question: "図面やCADデータがなくても相談できますか？",
    answer:
      "はい、可能です。\n現物を3Dスキャンし、形状・寸法を取得することで、\n設計や検討に使用できる3Dデータを作成します。\n図面がない、または古くて信用できない場合でも対応しています。",
  },
  {
    id: "faq-2",
    question: "古くて破損している部品でも復元できますか？",
    answer:
      "元の形状が残っていれば大丈夫です。\n欠けや摩耗がある場合でも、用途を伺った上で再設計・補正を行います。",
  },
  {
    id: "faq-3",
    question: "どのくらいの大きさまで対応できますか？",
    answer:
      "おおよそ1000mm程度まで対応可能です。\nそれ以上のサイズについては、分割対応などを含めて個別にご相談ください。",
  },
  {
    id: "faq-4",
    question: "重さの制限はありますか？",
    answer: "目安として30kg程度までを想定しています。",
  },
  {
    id: "faq-5",
    question: "作成する3Dデータの形式は何ですか？",
    answer: "STL形式での提供となります。",
  },
  {
    id: "faq-6",
    question: "造形できる素材にはどのようなものがありますか？",
    answer: "樹脂やシリコンなどに対応しています。",
  },
  {
    id: "faq-7",
    question: "造形ではどのようなものが作れますか？",
    answer:
      "部品・試作品・検証用モデルなど、\n形状確認や機能検討を目的とした造形に対応しています。\n用途や条件によって対応可否が異なるため、\nまずは目的をお聞かせください。",
  },
  {
    id: "faq-8",
    question: "納期はどのくらいかかりますか？",
    answer:
      "対象物の大きさ・形状・内容によって異なります。\nお見積り時に、想定スケジュールをご案内します。",
  },
  {
    id: "faq-9",
    question: "費用はどのくらいかかりますか？",
    answer:
      "大きさ・形状・素材・作業内容によって異なります。\nご相談内容を確認した上で、都度お見積りいたします。",
  },
  {
    id: "faq-10",
    question: "他社製品や既存製品を元に相談しても大丈夫ですか？",
    answer:
      "構造把握や技術検討を目的としたご相談であれば可能です。\n最終的な扱いについては、用途や条件を踏まえて個別に判断します。",
  },
]

export default function FaqPage() {
  return (
    <main>
      {/* Page heading */}
      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h1 className="font-bold text-foreground">
              {"よくあるご質問（FAQ）"}
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {"ご相談時によくいただく質問をまとめています。"}
              <br />
              {"内容によっては個別判断となるため、詳細はお問い合わせください。"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <Accordion type="multiple" className="w-full">
              {faqItems.map((item) => (
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
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  )
}
