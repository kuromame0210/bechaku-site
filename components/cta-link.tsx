"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import * as gtag from "@/lib/gtag"

interface CTALinkProps extends ComponentProps<typeof Link> {
  eventLabel: string
}

export function CTALink({ eventLabel, onClick, ...props }: CTALinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        gtag.event("cta_click", {
          event_category: "engagement",
          event_label: eventLabel,
          page_path: typeof window !== "undefined" ? window.location.pathname : "",
        })
        onClick?.(e)
      }}
    />
  )
}
