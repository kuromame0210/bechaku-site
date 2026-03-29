"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import * as gtag from "@/lib/gtag"

function getClickableElement(target: HTMLElement): HTMLAnchorElement | HTMLButtonElement | null {
  const anchor = target.closest("a")
  if (anchor) return anchor
  const button = target.closest("button")
  if (button) return button
  return null
}

function getLinkText(el: HTMLElement): string {
  const text = el.textContent?.trim() ?? ""
  return text.length > 50 ? text.slice(0, 50) + "…" : text
}

export function Analytics() {
  const pathname = usePathname()

  // ページ遷移追跡
  useEffect(() => {
    gtag.pageview(pathname)
  }, [pathname])

  // グローバルクリック監視
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const el = getClickableElement(e.target as HTMLElement)
      if (!el) return

      const isAnchor = el.tagName === "A"
      const href = isAnchor ? (el as HTMLAnchorElement).getAttribute("href") ?? "" : ""
      const text = getLinkText(el)

      // tel リンク
      if (href.startsWith("tel:")) {
        gtag.event("tel_click", {
          event_category: "contact",
          event_label: href.replace("tel:", ""),
          page_path: pathname,
        })
        return
      }

      // mailto リンク
      if (href.startsWith("mailto:")) {
        gtag.event("email_click", {
          event_category: "contact",
          event_label: href.replace("mailto:", ""),
          page_path: pathname,
        })
        return
      }

      // その他のリンク・ボタン
      gtag.event("link_click", {
        event_category: "engagement",
        link_url: href || "(button)",
        link_text: text,
        page_path: pathname,
      })
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [pathname])

  return null
}
