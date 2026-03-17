"use client"

import { useEffect } from "react"
import * as gtag from "@/lib/gtag"

export function ContactPageTracker() {
  useEffect(() => {
    gtag.event("contact_page_view", {
      event_category: "engagement",
      page_path: "/contact",
    })
  }, [])

  return null
}
