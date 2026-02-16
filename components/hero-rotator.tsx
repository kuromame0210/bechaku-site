"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const slides = [
  {
    src: "/images/hero-scanner-printer.webp",
    alt: "3Dプリンタ・3Dスキャナのイメージ",
  },
  {
    src: "/images/3d-printer-setup.webp",
    alt: "3Dプリンタ設備のイメージ",
  },
  {
    src: "/images/hero-scan-scene.webp",
    alt: "3Dスキャン作業のイメージ",
  },
]

type HeroRotatorProps = {
  intervalMs?: number
}

export function HeroRotator({ intervalMs = 5000 }: HeroRotatorProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) {
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs])

  return (
    <div className="absolute inset-0">
      {slides.map((slide, slideIndex) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={slideIndex === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === slideIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
    </div>
  )
}
