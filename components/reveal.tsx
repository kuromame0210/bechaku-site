"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const options = isMobile
      ? { threshold: 0.25, rootMargin: "0px 0px -5% 0px" }
      : { threshold: 0.35, rootMargin: "0px 0px -12% 0px" }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("reveal--in")
        observer.unobserve(node)
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  )
}
