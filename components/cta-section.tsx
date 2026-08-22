"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import * as gtag from "@/lib/gtag"

interface CTASectionProps {
  heading?: string
  description?: string
  eventLabel?: string
}

export function CTASection({
  heading = "まずは相談してみる",
  description = "写真だけ・現物だけの段階でも大丈夫です。対応できるかどうかの確認からご相談ください。",
  eventLabel = "bottom_cta",
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
            <Link href="/contact" onClick={() => gtag.event("cta_click", { event_category: "engagement", event_label: eventLabel, page_path: typeof window !== "undefined" ? window.location.pathname : "" })}>{"まず相談する"}</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            {"内容が固まっていなくても、分かる範囲でご相談ください。"}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
