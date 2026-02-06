import type { Metadata } from "next"
import { NoticeBanner } from "@/components/notice-banner"
import { SectionHeading } from "@/components/section-heading"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "注意事項 | 別役ロボット工業",
  description:
    "本サービスをご検討・ご依頼いただく前に、あらかじめご確認いただきたい注意事項をまとめています。",
}

const notices = [
  {
    number: 1,
    text: "モデリングサービスは測定サービスとは異なります。\n測定値そのものの提出は行いません。\n徐変やMIN、MAXなで、くわしい測定値をお求めの場合は、測定サービスをご利用ください。\n（図面がない状態での測定もお受けしております）\nまた、「測定値を確認し、寸法をお客様の方で検討した後、モデリング開始」といったご希望おありでしたら、その際は別途ご相談ください。",
  },
  {
    number: 2,
    text: "透明、鏡面仕上げ、壁に囲まれた形状などはレーザーでのスキャニングは困難です。\nその際は、粉末の塗布や断面での測定を行うことがあります。\n製品の取り扱いに注意がいる場合（側面不可、塗布不可など）は、前もってご連絡ください。",
  },
  {
    number: 3,
    text: "可能であれば、サンプルの送付は2個以上でお願い致します。",
  },
  {
    number: 4,
    text: "スキャニングや測定には、機械精度や環境などによる誤差が生じます。\nそういった誤差により、実寸値からのモデリングに整合性が取れなくなる場合は弊社にて任意で、一部の値を微調整させていただくことがあります。",
  },
  {
    number: 5,
    text: "寸法は実寸からの算出のため、素材の収縮などは考慮できず、製造時の値からはずれます。",
  },
  {
    number: 6,
    text: "同一形状に関しては、指示がない限り、平均、もしくは推測される数値などで一律化します。",
  },
  {
    number: 7,
    text: "確認が困難な形状（変形部の抜き勾配、著しく距離の短い円弧など）は再現性が低下、もしくは再現できないことがあります。",
  },
  {
    number: 8,
    text: "変形、反り、形状不良（ミスマッチなど）は通常再現できません。\nまたEピン跡、ゲート、P.L、刻印などはご指示がない限り再現しません。",
  },
  {
    number: 9,
    text: "ネジ、ギアなどは弊社では測定ができません。\nお客様から情報をいただける際は、JIS規格に基づいた省略記述となります。\nまた、お客様の方でも不明な場合は、省略するか、仮のΦでの再現になります。",
  },
  {
    number: 10,
    text: "2D図面への寸法の入れ方は基本的に弊社側の任意となります。\nもしご希望とする形があれば、前もって見本となる図面をご送付ください。",
  },
  {
    number: 11,
    text: "弊社の方では著作権などの権利関係についてはお客様の方でクリアされた上でご依頼されているものとしてお受けしております。\nもし、弊社でのリバースサービス後、それらについて何らかの問題が発生したとしても弊社では責任を負いかねます。\nあらかじめご了承ください。",
  },
]

export default function NoticePage() {
  return (
    <main>
      <NoticeBanner />

      {/* Page header */}
      <section className="bg-card py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h1" sub="注意事項">
              {"Notice"}
            </SectionHeading>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {"本サービスをご検討・ご依頼いただく前に、あらかじめご確認ください。"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Notice items */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6">
            {notices.map((item) => (
              <Reveal key={item.number}>
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {item.number}
                    </span>
                  </div>
                  <p className="whitespace-pre-line leading-loose text-foreground">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  )
}
