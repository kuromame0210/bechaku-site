"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NoticeBanner } from "@/components/notice-banner"
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

export default function TestTopAnimationPage() {
  const [heroIn, setHeroIn] = useState(false)
  const [introPhase, setIntroPhase] = useState<"show" | "hide" | "done">("show")
  const mainRef = useRef<HTMLElement | null>(null)
  const ctaRef = useRef<HTMLElement | null>(null)
  const ctaInView = useInView(ctaRef, { threshold: 0.3, rootMargin: "0px 0px -10% 0px" })

  useEffect(() => {
    document.documentElement.dataset.motion = "force"
    const hideTimer = window.setTimeout(() => setIntroPhase("hide"), 900)
    const doneTimer = window.setTimeout(() => {
      setIntroPhase("done")
      setHeroIn(true)
    }, 1400)
    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(doneTimer)
      delete document.documentElement.dataset.motion
    }
  }, [])

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const rect = main.getBoundingClientRect()
        const viewport = window.innerHeight
        const progress = Math.min(Math.max((viewport - rect.top) / (viewport + rect.height), 0), 1)
        main.style.setProperty("--page-scroll", progress.toFixed(3))
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <main ref={mainRef} className={styles.pageRoot}>
      <div className={styles.pageParallax} aria-hidden="true" />
      {introPhase !== "done" && (
        <div
          className={`${styles.introOverlay} ${introPhase === "hide" ? styles.introOverlayOut : ""}`}
          aria-hidden="true"
        >
          <div className={styles.introPanel}>
            <div className={styles.introGlow} />
            <div className={styles.introGrid} />
            <div className={styles.introTitle}>
              {"別着ロボット工業".split("").map((char, index) => (
                <span
                  key={`intro-char-${index}`}
                  className={styles.introChar}
                  style={{ "--i": index } as CSSProperties}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={styles.pageContent}>
        <NoticeBanner />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          className={`absolute inset-0 ${heroIn ? `${styles.heroBg} ${styles.heroBgIn}` : styles.heroBg} ${
            styles.heroParallax
          }`}
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
          <div className={styles.heroColorShift} />
        </div>
        <div
          className={`absolute inset-0 ${styles.heroEffects} ${heroIn ? styles.heroEffectsIn : ""}`}
          aria-hidden="true"
        >
          <div className={styles.heroDiagonalLayer} />
          <div className={styles.heroDiagonalLayer} />
          <div className={styles.heroDiagonalLayer} />
          <div className={styles.heroWipe} />
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
          <div className="space-y-4">
            <h1
              className={`text-balance text-3xl font-bold leading-relaxed md:text-4xl ${
                heroIn ? `${styles.heroReveal} ${styles.heroRevealIn}` : styles.heroReveal
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {renderStaggeredText("実物から、解析・データ化・復元・試作まで。", "hero-title")}
              <br />
              {renderStaggeredText(
                "3Dスキャン・3Dプリントによるリバースエンジニアリング",
                "hero-title-2",
              )}
            </h1>
            <AnimatedText
              className={`max-w-2xl leading-relaxed ${
                heroIn ? `${styles.heroReveal} ${styles.heroRevealIn}` : styles.heroReveal
              }`}
              style={{ transitionDelay: "200ms" }}
              text={"図面がなくても、現物があれば技術的に成立するかを判断し、形にします。"}
            />
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
          <AnimatedText
            className="leading-loose text-muted-foreground"
            text={[
              "図面が残っていない部品、生産中止のパーツ、構造の把握が必要な製品。",
              "こうした課題に対して、3Dスキャンによるデータ化から3Dプリントによる試作・復元まで、一貫した対応を行っています。",
            ]}
          />
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border bg-secondary py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedH2>{"できること"}</AnimatedH2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => (
              <AnimatedBlock key={item.title}>
                <Card className="overflow-hidden border-border transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg">
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
                    <AnimatedH3>{item.title}</AnimatedH3>
                    <AnimatedText className="leading-relaxed text-muted-foreground" text={item.description} />
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="mt-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        {item.linkLabel}
                        {" →"}
                      </Link>
                    ) : (
                        <AnimatedText className="mt-1 text-muted-foreground" text="※概要は掲載済み。詳細は個別にご案内します。" />
                    )}
                  </CardContent>
                </Card>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Quick summary */}
      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mt-2 grid gap-4 md:grid-cols-2">
            <AnimatedBlock>
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg">
                <AnimatedH2>{"解決できること"}</AnimatedH2>
                <AnimatedList items={solutionPoints} />
              </div>
            </AnimatedBlock>
            <AnimatedBlock>
              <div className="rounded-xl border border-border bg-card p-6 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg">
                <AnimatedH2>{"こんな人におすすめ"}</AnimatedH2>
                <AnimatedList items={recommendationPoints} />
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </section>

      <section
        ref={ctaRef}
        className={`border-t border-border bg-card py-16 md:py-20 ${styles.ctaSection} ${
          ctaInView ? styles.ctaSectionIn : ""
        }`}
      >
        <div className={styles.ctaEffects} aria-hidden="true">
          <div className={styles.ctaSweepLine} />
          <div className={styles.ctaSweepTrail} />
        </div>
        <div
          className={`mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center ${
            ctaInView ? `${styles.blockReveal} ${styles.blockRevealIn}` : styles.blockReveal
          }`}
        >
          <h2 className="font-semibold text-foreground">{"お問い合わせ"}</h2>
          <AnimatedText
            className="max-w-lg leading-relaxed text-muted-foreground"
            text="技術的な可否判断を含めたご相談を承ります。まずはお気軽にご連絡ください。"
          />
          <Button asChild size="lg">
            <Link href="/contact">{"お問い合わせはこちら"}</Link>
          </Button>
          <AnimatedText className="text-sm text-muted-foreground" text="※注意事項をご確認の上、フォームへお進みください。" />
        </div>
      </section>
      </div>
    </main>
  )
}

function AnimatedH2({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null)
  const isInView = useInView(ref, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" })

  return (
    <div className={`${styles.headingWrap} ${isInView ? styles.headingWrapIn : ""}`}>
      <span className={styles.headingDiagonal} aria-hidden="true" />
      <h2
        ref={ref}
        className={`text-balance text-xl font-semibold text-foreground md:text-2xl ${
          isInView ? `${styles.textMask} ${styles.textMaskIn}` : styles.textMask
        }`}
      >
        {renderMaskedText(children, "h2")}
      </h2>
    </div>
  )
}

function AnimatedH3({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null)
  const isInView = useInView(ref, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" })

  return (
    <h3
      ref={ref}
      className={`font-semibold text-foreground ${
        isInView ? `${styles.textMask} ${styles.textMaskIn}` : styles.textMask
      }`}
    >
      {renderMaskedText(children, "h3")}
    </h3>
  )
}

function AnimatedBlock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { threshold: 0.25, rootMargin: "0px 0px -10% 0px" })
  return (
    <div ref={ref} className={isInView ? `${styles.blockReveal} ${styles.blockRevealIn}` : styles.blockReveal}>
      {children}
    </div>
  )
}

function AnimatedList({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement | null>(null)
  const isInView = useInView(ref, { threshold: 0.3, rootMargin: "0px 0px -10% 0px" })

  return (
    <ul
      ref={ref}
      className={`mt-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground ${
        isInView ? `${styles.listStagger} ${styles.listStaggerIn}` : styles.listStagger
      }`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function AnimatedText({
  text,
  className,
  style,
}: {
  text: string | string[]
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLParagraphElement | null>(null)
  const isInView = useInView(ref, { threshold: 0.3, rootMargin: "0px 0px -10% 0px" })

  return (
    <p
      ref={ref}
      className={`${className ?? ""} ${isInView ? `${styles.blockReveal} ${styles.blockRevealIn}` : styles.blockReveal}`}
      style={style}
    >
      {renderPlainText(text)}
    </p>
  )
}

function renderMaskedText(text: string | string[], keyPrefix: string) {
  if (Array.isArray(text)) {
    return text.map((line, index) => (
      <span key={`${keyPrefix}-line-${index}`} className={styles.textMaskLine}>
        {line.split("").map((char, charIndex) => (
          <span
            key={`${keyPrefix}-${index}-${charIndex}`}
            className={styles.textMaskChar}
            style={{ "--i": charIndex } as CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {index < text.length - 1 ? <br /> : null}
      </span>
    ))
  }

  return (
    <span className={styles.textMaskLine}>
      {text.split("").map((char, charIndex) => (
        <span
          key={`${keyPrefix}-${charIndex}`}
          className={styles.textMaskChar}
          style={{ "--i": charIndex } as CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

function renderPlainText(text: string | string[]) {
  if (Array.isArray(text)) {
    return text.map((line, index) => (
      <span key={`plain-line-${index}`}>
        {line}
        {index < text.length - 1 ? <br /> : null}
      </span>
    ))
  }
  return text
}

function renderStaggeredText(text: string, keyPrefix: string) {
  return (
    <span className={styles.staggerLine}>
      {text.split("").map((char, index) => (
        <span
          key={`${keyPrefix}-${index}`}
          className={styles.staggerChar}
          style={{ "--i": index } as CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
