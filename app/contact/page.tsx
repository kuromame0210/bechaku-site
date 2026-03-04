 import type { Metadata } from "next"
 import { ContactForm } from "@/components/contact-form"
 import { Reveal } from "@/components/reveal"
 import { SectionHeading } from "@/components/section-heading"
 
export const metadata: Metadata = {
  title: "お問い合わせ | 別役ロボット工業株式会社",
  description:
    "関東・埼玉で3Dスキャン/3Dプリントのご相談やご依頼を受け付けています。",
  alternates: {
    canonical: "/contact",
  },
}
 
export default function ContactPage() {
  return (
    <main>
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
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {"埼玉・関東エリアのご相談に対応しています。"}
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
