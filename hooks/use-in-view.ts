"use client"

import { useEffect, useState } from "react"

type InViewOptions = IntersectionObserverInit

export function useInView(
  ref: React.RefObject<HTMLElement>,
  options: InViewOptions = {}
) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let cleanup = () => {}
    const thresholdValue = Array.isArray(options.threshold)
      ? Math.max(...options.threshold)
      : options.threshold ?? 0
    const rootMarginParts = (options.rootMargin ?? "0px").split(" ")
    const bottomMarginRaw = rootMarginParts[2] ?? rootMarginParts[0] ?? "0px"

    const parseMargin = (value: string, viewport: number) => {
      const trimmed = value.trim()
      if (trimmed.endsWith("%")) {
        return (parseFloat(trimmed) / 100) * viewport
      }
      if (trimmed.endsWith("px")) {
        return parseFloat(trimmed)
      }
      const number = Number(trimmed)
      return Number.isFinite(number) ? number : 0
    }

    const checkInView = () => {
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight
      const bottomMargin = parseMargin(bottomMarginRaw, viewport)
      const effectiveBottom = viewport + bottomMargin
      const visiblePx = Math.min(rect.bottom, effectiveBottom) - Math.max(rect.top, 0)
      const ratio = rect.height > 0 ? visiblePx / rect.height : 0
      if (ratio >= thresholdValue) {
        setIsInView(true)
        cleanup()
      }
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          cleanup()
        }
      }, options)

      observer.observe(node)
      cleanup = () => observer.disconnect()
    }

    const onScroll = () => {
      if (!isInView) checkInView()
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    const frame = requestAnimationFrame(checkInView)

    const previousCleanup = cleanup
    cleanup = () => {
      previousCleanup()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }

    return () => cleanup()
  }, [ref, options, isInView])

  return isInView
}
