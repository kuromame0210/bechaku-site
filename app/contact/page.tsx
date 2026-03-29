 import type { Metadata } from "next"
 import { ContactForm } from "@/components/contact-form"
 import { ContactPageTracker } from "@/components/contact-page-tracker"
 import { Reveal } from "@/components/reveal"
 import { SectionHeading } from "@/components/section-heading"
 
export const metadata: Metadata = {
  title: "お問い合わせ | 別役ロボット工業株式会社",
  description:
    "リバースエンジニアリング・3Dスキャン・3Dプリントのご相談はこちら。図面がない部品の復元・試作など、技術的な可否判断からお気軽にどうぞ。",
  alternates: {
    canonical: "/contact",
  },
}
 
export default function ContactPage() {
  return (
    <main>
      <ContactPageTracker />
      <section className="bg-card py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h1" sub="Contact">
              {"お問い合わせ"}
            </SectionHeading>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {
                "ご相談内容を確認のうえ、担当者よりご連絡いたします。内容をご入力ください。"
              }
            </p>
            <div className="mt-6 flex flex-col gap-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                {"お問い合せはこちらから"}
              </p>
              <p>{"e-mail: h-betchaku@brinet.co.jp"}</p>
              <p>{"TEL: 0495-71-6824"}</p>
              <p>{"FAX: 0495-71-6825"}</p>
              <p>{"担当: 石垣"}</p>
            </div>
          </Reveal>
        </div>
      </section>
 
       <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
           <Reveal>
             <ContactForm />
           </Reveal>
         </div>
       </section>
     </main>
   )
 }
