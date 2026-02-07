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

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(node)
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, options])

  return isInView
}
