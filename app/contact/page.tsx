 import type { Metadata } from "next"
 import { ContactForm } from "@/components/contact-form"
 import { NoticeBanner } from "@/components/notice-banner"
 import { Reveal } from "@/components/reveal"
 import { SectionHeading } from "@/components/section-heading"
 
 export const metadata: Metadata = {
   title: "お問い合わせ | 別役ロボット工業",
   description:
     "3Dスキャン・3Dプリントに関するご相談やご依頼を受け付けています。",
 }
 
 export default function ContactPage() {
   return (
     <main>
       <NoticeBanner />
 
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
