import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"

interface CTASectionProps {
  heading?: string
  description?: string
}

export function CTASection({
  heading = "お問い合わせ",
  description = "技術的な可否判断を含めたご相談を承ります。まずはお気軽にご連絡ください。",
}: CTASectionProps) {
  return (
    <section id="contact" className="border-t border-border bg-card py-16 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <Reveal className="flex flex-col items-center gap-3 md:gap-4">
          <h2 className="font-semibold text-foreground">
            {heading}
          </h2>
          <p className="max-w-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <Button asChild size="lg">
            <Link href="/contact">{"お問い合わせはこちら"}</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            {"※注意事項をご確認の上、フォームへお進みください。"}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
