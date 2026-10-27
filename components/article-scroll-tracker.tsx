"use client"

import { useEffect } from "react"
import * as gtag from "@/lib/gtag"

const MILESTONES = [25, 50, 75, 90] as const

export function ArticleScrollTracker({ path }: { path: string }) {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("[data-scroll-article]")
    if (!article) return

    const reached = new Set<number>()
    let frame: number | null = null
    const measure = () => {
      frame = null
      if (document.visibilityState !== "visible" || !window.gtag) return
      const rect = article.getBoundingClientRect()
      if (rect.height <= 0) return

      // Depth is the article's extent reached by the bottom of the viewport.
      const percent = Math.min(100, Math.max(0, (window.innerHeight - rect.top) / rect.height * 100))
      for (const milestone of MILESTONES) {
        if (percent < milestone || reached.has(milestone)) continue
        reached.add(milestone)
        gtag.event(`article_scroll_${milestone}`, {
          page_path: path,
          percent_scrolled: milestone,
        })
      }
    }
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure)
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(article)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    document.addEventListener("visibilitychange", schedule)
    schedule()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      document.removeEventListener("visibilitychange", schedule)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [path])

  return null
}
