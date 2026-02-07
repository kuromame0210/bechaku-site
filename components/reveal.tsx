"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
}

const activeReveals = new Set<HTMLElement>()
let isListening = false
let rafId: number | null = null

const scheduleUpdate = () => {
  if (rafId !== null) return
  rafId = window.requestAnimationFrame(() => {
    rafId = null
    const viewportHeight = window.innerHeight || 0
    const start = viewportHeight * 0.95
    const end = viewportHeight * 0.55
    const range = Math.max(1, start - end)

    activeReveals.forEach((node) => {
      const rect = node.getBoundingClientRect()
      const progress = (start - rect.top) / range
      const clamped = Math.min(1, Math.max(0, progress))
      node.style.setProperty("--reveal-progress", clamped.toFixed(3))
      if (clamped >= 1 && !node.classList.contains("reveal--scroll")) {
        node.classList.add("reveal--in")
        activeReveals.delete(node)
      }
    })

    if (activeReveals.size === 0 && isListening) {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      isListening = false
    }
  })
}

const ensureListeners = () => {
  if (isListening) return
  isListening = true
  window.addEventListener("scroll", scheduleUpdate, { passive: true })
  window.addEventListener("resize", scheduleUpdate)
}

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.style.setProperty("--reveal-progress", "0")

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("reveal--in")
      node.style.setProperty("--reveal-progress", "1")
      return
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const options = isMobile
      ? { threshold: 0, rootMargin: "0px 0px 25% 0px" }
      : { threshold: 0, rootMargin: "0px 0px 20% 0px" }

    const scrollOptions = isMobile
      ? { threshold: 0, rootMargin: "0px 0px -5% 0px" }
      : { threshold: 0, rootMargin: "0px 0px -10% 0px" }

    const isScrollReveal = node.classList.contains("reveal--scroll")

    const observer = new IntersectionObserver(([entry]) => {
      if (isScrollReveal) {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(() => {
            node.classList.add("reveal--in")
          })
        } else {
          node.classList.remove("reveal--in")
        }
        return
      }

      if (entry.isIntersecting) {
        activeReveals.add(node)
        ensureListeners()
        scheduleUpdate()
        observer.unobserve(node)
      }
    }, isScrollReveal ? scrollOptions : options)

    observer.observe(node)
    return () => {
      activeReveals.delete(node)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  )
}
