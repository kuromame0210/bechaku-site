"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NoticeBanner } from "@/components/notice-banner"
import { CTASection } from "@/components/cta-section"
import { useInView } from "@/hooks/use-in-view"
import styles from "./page.module.css"

const capabilities = [
  {
    image: "/images/3d-scanner-vl-700.webp",
    title: "実物 → 3Dデータ化",
    description:
      "現物をスキャンし、形状・構造を3Dデータとして取得します。図面がない状態からの検討が可能です。",
    href: "/scan",
    linkLabel: "3Dスキャン詳細",
  },
  {
    image: "/images/3d-printer-aglista.webp",
    title: "3Dデータ → 造形",
    description:
      "3Dデータをもとに試作品を造形。組付けや干渉確認、形状検討に活用できます。",
    href: "/print",
    linkLabel: "3Dプリント詳細",
  },
  {
    image: "/images/icon-restore.webp",
    title: "旧パーツ・部品の復元",
    description:
      "生産中止部品や入手困難なパーツを、スキャン・データ化を経て復元します。",
  },
  {
    image: "/images/icon-prototype.webp",
    title: "試作・量産（カスタム）",
    description:
      "試作から小ロット量産、カスタム対応まで。目的に応じた造形方法をご提案します。",
  },
]

const solutionPoints = [
  "図面がない部品の形状把握・再現",
  "生産終了品の再調達・復元検討",
  "試作の形状検証・組付け確認",
  "既存部品の仕様・寸法整理",
]

const recommendationPoints = [
  "現物はあるが図面が残っていない",
  "技術的に可能か先に判断したい",
  "社内で検討するための試作品が必要",
  "小ロットで形状確認したい",
]

function AnimatedH2({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null)
  const isInView = useInView(ref, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" })

  return (
    <h2
      ref={ref}
      className={`text-balance text-xl font-semibold text-foreground md:text-2xl ${
        isInView ? `${styles.h2Reveal} ${styles.h2RevealIn}` : styles.h2Reveal
      }`}
    >
      {children}
    </h2>
  )
}

export default function TestTopAnimationPage() {
  const [heroIn, setHeroIn] = useState(false)

  useEffect(() => {
    // Audit: framer-motion is not installed; CSS + IntersectionObserver fallback.
    document.documentElement.dataset.motion = "force"
    const timer = window.setTimeout(() => setHeroIn(true), 80)
    return () => {
      window.clearTimeout(timer)
      delete document.documentElement.dataset.motion
    }
  }, [])

  return (
    <main>
      <NoticeBanner />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className={`absolute inset-0 ${heroIn ? `${styles.heroBg} ${styles.heroBgIn}` : styles.heroBg}`}
          aria-hidden="true"
        >
          <Image
            src="/images/homepage-hero.webp"
            alt="3Dスキャン・3Dプリントの設備イメージ"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0" aria-hidden="true">
          <svg
            className="h-full w-full opacity-10"
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <path
              className={styles.lineFlow}
              d="M-50 120 C 200 40, 400 200, 650 120 S 1100 200, 1250 120"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              className={styles.lineFlow}
              d="M-30 320 C 200 220, 420 420, 640 320 S 1100 420, 1250 320"
              stroke="white"
              strokeWidth="1.2"
            />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-white">
          <div
            className="space-y-4"
          >
            <h1
              className={`text-balance text-3xl font-bold leading-relaxed md:text-4xl ${
                heroIn ? `${styles.heroReveal} ${styles.heroRevealIn}` : styles.heroReveal
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {"実物から、解析・データ化・復元・試作まで。"}
              <br />
              {"3Dスキャン・3Dプリントによるリバースエンジニアリング"}
            </h1>
            <p
              className={`max-w-2xl leading-relaxed ${
                heroIn ? `${styles.heroReveal} ${styles.heroRevealIn}` : styles.heroReveal
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {"図面がなくても、現物があれば技術的に成立するかを判断し、形にします。"}
            </p>
            <div
              className={`flex flex-wrap gap-4 ${
                heroIn ? `${styles.heroReveal} ${styles.heroRevealIn}` : styles.heroReveal
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <Button
                asChild
                variant="outline"
                className="min-w-[180px] px-6 text-base md:text-lg transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Link href="/scan">{"3Dスキャンとは"}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-w-[180px] px-6 text-base md:text-lg transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Link href="/print">{"3Dプリントとは"}</Link>
              </Button>
              <Button
                asChild
                className="min-w-[180px] px-6 text-base md:text-lg transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Link href="/contact">{"お問い合わせ"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <p className="leading-loose text-muted-foreground">
            {"図面が残っていない部品、生産中止のパーツ、構造の把握が必要な製品。"}
            <br />
            {"こうした課題に対して、3Dスキャンによるデータ化から3Dプリントによる試作・復元まで、一貫した対応を行っています。"}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedH2>{"できること"}</AnimatedH2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => (
              <Card
                key={item.title}
                className="overflow-hidden border-border transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className={
                      item.title === "実物 → 3Dデータ化" ||
                      item.title === "3Dデータ → 造形"
                        ? "object-contain"
                        : "object-cover"
                    }
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="flex flex-col gap-3 p-6">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="mt-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {item.linkLabel}
                      {" →"}
                    </Link>
                  ) : (
                    <p className="mt-1 text-muted-foreground">
                      {"※概要は掲載済み。詳細は個別にご案内します。"}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick summary */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mt-2 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg">
              <AnimatedH2>{"解決できること"}</AnimatedH2>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
                {solutionPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg">
              <AnimatedH2>{"こんな人におすすめ"}</AnimatedH2>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
                {recommendationPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
