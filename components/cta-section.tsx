import Link from "next/link"
import { Button } from "@/components/ui/button"

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
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-xl font-semibold text-foreground md:text-2xl">
          {heading}
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <Button asChild size="lg">
          <Link href="/#contact">{"お問い合わせはこちら"}</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          {"※お問い合わせフォームは後日設置予定です"}
        </p>
      </div>
    </section>
  )
}
