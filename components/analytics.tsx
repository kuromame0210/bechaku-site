"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import * as gtag from "@/lib/gtag"

export function Analytics() {
  const pathname = usePathname()

  // ページ遷移追跡
  useEffect(() => {
    gtag.pageview(pathname)
  }, [pathname])

  // tel / mailto グローバル監視
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href") ?? ""

      if (href.startsWith("tel:")) {
        gtag.event("tel_click", {
          event_category: "contact",
          event_label: href.replace("tel:", ""),
        })
      }

      if (href.startsWith("mailto:")) {
        gtag.event("email_click", {
          event_category: "contact",
          event_label: href.replace("mailto:", ""),
        })
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null
}
