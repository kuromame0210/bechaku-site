"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { CSSProperties } from "react"
import styles from "./page.module.css"

const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
}

const speedMap = {
  slow: "1100ms",
  normal: "700ms",
  fast: "420ms",
}

const demoCards = [
  { title: "リビール：見出し＋リード＋CTA", key: "reveal", direction: "up", speed: "normal" },
  { title: "テキストマスク表示", key: "mask", direction: "left", speed: "fast" },
  { title: "画像クロスフェード", key: "crossfade", direction: "up", speed: "slow" },
  { title: "スクロール・パララックス（背景）", key: "parallax", direction: "down", speed: "normal" },
  { title: "カラーシフト", key: "color", direction: "right", speed: "slow" },
  { title: "単語切り替え", key: "swap", direction: "up", speed: "fast" },
]

export default function TestAnimationLabPage() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const parallaxRef = useRef<HTMLDivElement | null>(null)
  const parallaxDebugRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const target = parallaxRef.current
    if (!target) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const rect = target.getBoundingClientRect()
        const viewport = window.innerHeight
        const progress = Math.min(Math.max((viewport - rect.top) / (viewport + rect.height), 0), 1)
        const value = progress.toFixed(3)
        target.style.setProperty("--lab-scroll", value)
        if (parallaxDebugRef.current) {
          parallaxDebugRef.current.textContent = value
        }
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

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-lab-observe]"))
    if (!cards.length) return

    const applyVars = (element: HTMLElement) => {
      const dir = (element.dataset.labDirection ?? "up") as keyof typeof directionMap
      const speed = (element.dataset.labSpeed ?? "normal") as keyof typeof speedMap
      const values = directionMap[dir] ?? directionMap.up
      element.style.setProperty("--lab-dir-x", `${values.x}`)
      element.style.setProperty("--lab-dir-y", `${values.y}`)
      element.style.setProperty("--lab-duration", speedMap[speed] ?? speedMap.normal)
    }

    const runCountUp = (container: HTMLElement) => {
      const targets = Array.from(container.querySelectorAll<HTMLElement>("[data-lab-count]"))
      targets.forEach((target) => {
        const max = Number(target.dataset.labCount ?? "0")
        const duration = Number(target.dataset.labDuration ?? "1200")
        if (!Number.isFinite(max) || max <= 0) return
        const start = performance.now()
        const update = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const value = Math.floor(progress * max)
          target.textContent = value.toString()
          if (progress < 1) {
            requestAnimationFrame(update)
          }
        }
        requestAnimationFrame(update)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement
          if (entry.isIntersecting) {
            applyVars(element)
            element.classList.add(styles.labInView)
            runCountUp(element)
          } else {
            element.classList.remove(styles.labInView)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    )

    cards.forEach((card) => observer.observe(card))
    const onReplay = (event: Event) => {
      const target = event.target as HTMLElement | null
      const button = target?.closest<HTMLButtonElement>("[data-lab-replay]")
      if (!button) return
      const card = button.closest<HTMLElement>("[data-lab-observe]")
      if (!card) return
      applyVars(card)
      runCountUp(card)
      card.classList.remove(styles.labInView)
      // Force reflow to restart CSS animations.
      void card.offsetHeight
      card.classList.add(styles.labInView)
    }

    root.addEventListener("click", onReplay)
    return () => {
      observer.disconnect()
      root.removeEventListener("click", onReplay)
    }
  }, [])

  return (
    <main className={styles.labPage}>
      <div ref={rootRef} className={styles.labRoot}>
        <header className={styles.labHeader}>
          <p className={styles.labEyebrow}>アニメーション実験室</p>
          <h1 className={styles.labTitle}>モーションの実験場</h1>
          <p className={styles.labLead}>
            方向・速度・スクロール連動・色変化・テキスト/画像の変化を比較できます。
            このページだけに閉じて、後でクリーンアップできる前提です。
          </p>
          <p className={styles.labNote}>
            各カードが表示されたタイミングでアニメーションが発火します。方向と速度はカードごとに固定です。
          </p>
        </header>

        <section className={styles.labGrid}>
          {demoCards.map((card, index) => (
            <article
              key={card.key}
              className={styles.labCard}
              data-lab-observe
              data-lab-direction={card.direction}
              data-lab-speed={card.speed}
            >
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{card.title}</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>

              {card.key === "reveal" && (
                <div className={styles.labHero}>
                  <p className={`${styles.labReveal} ${styles.labEyebrow}`} style={{ animationDelay: "40ms" }}>
                    リバースエンジニアリング
                  </p>
                  <h3 className={styles.labReveal} style={{ animationDelay: "120ms" }}>
                    スキャン・解析・試作まで。
                    <br />
                    現物からデータ化へ。
                  </h3>
                  <p className={styles.labReveal} style={{ animationDelay: "220ms" }}>
                    方向と速度はカードごとに固定で、スクロール表示で発火します。
                  </p>
                  <div className={styles.labButtonRow}>
                    <button className={`${styles.labButton} ${styles.labReveal}`} style={{ animationDelay: "320ms" }}>
                      お問い合わせ
                    </button>
                    <button
                      className={`${styles.labButton} ${styles.labButtonGhost} ${styles.labReveal}`}
                      style={{ animationDelay: "380ms" }}
                    >
                      詳細を見る
                    </button>
                  </div>
                </div>
              )}

              {card.key === "mask" && (
                <div className={styles.labStack}>
                  <p className={styles.labMaskText}>エッジが綺麗なマスク表示。</p>
                  <p className={styles.labMuted}>
                    ヒーロー見出し向き。スローにすると印象的です。
                  </p>
                </div>
              )}

              {card.key === "crossfade" && (
                <div className={styles.labImageFrame}>
                  <Image
                    src="/images/homepage-hero.webp"
                    alt="ヒーロー画像の例1"
                    fill
                    priority
                    className={`${styles.labImage} ${styles.labImageA}`}
                  />
                  <Image
                    src="/images/3d-scanner-vl-700.webp"
                    alt="ヒーロー画像の例2"
                    fill
                    className={`${styles.labImage} ${styles.labImageB}`}
                  />
                  <div className={styles.labImageOverlay}>クロスフェード</div>
                </div>
              )}

              {card.key === "parallax" && (
                <div ref={parallaxRef} className={styles.labParallax}>
                  <div className={styles.labParallaxBg} />
                  <div className={styles.labParallaxTint} />
                  <div className={styles.labParallaxParticles} />
                  <div className={styles.labParallaxFg}>
                    <p>スクロールで背景が動きます。</p>
                    <span>CSS変数をスクロールで更新。</span>
                    <span className={styles.labParallaxDebug}>
                      scroll: <em ref={parallaxDebugRef}>0.000</em>
                    </span>
                  </div>
                </div>
              )}

              {card.key === "color" && (
                <div className={styles.labColorShift}>
                  <p>雰囲気を出すカラーシフト。</p>
                  <span>ファーストビューの空気感に。</span>
                </div>
              )}

              {card.key === "swap" && (
                <div className={styles.labSwap}>
                  <p>対応できること</p>
                  <div className={styles.labSwapWords}>
                    <span>リバースエンジニアリング</span>
                    <span>旧部品の復元</span>
                    <span>試作・小ロット</span>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>

        <section className={styles.labLibrary}>
          <h2>ライブラリ検証</h2>
          <p>
            GSAP / ScrollTrigger / Lottie / three.js の実験枠。使用範囲はこのページに閉じて管理します。
          </p>
          <div className={styles.labLibraryList}>
            <span>GSAP</span>
            <span>ScrollTrigger</span>
            <span>Lottie</span>
            <span>three.js</span>
          </div>
        </section>

        <section className={styles.labAppendix}>
          <h2>追加実験エリア</h2>
          <p>既存のデモは残したまま、下にどんどん追加できます。</p>
          <div className={styles.labAppendixGrid}>
            <article className={styles.labAppendixCard}>
              <h3>スロットA</h3>
              <p>新しいアニメーション実験を配置。</p>
            </article>
            <article className={styles.labAppendixCard}>
              <h3>スロットB</h3>
              <p>スクロール / 3D / Lottie など。</p>
            </article>
            <article className={styles.labAppendixCard}>
              <h3>スロットC</h3>
              <p>カラーや文字系の実験に。</p>
            </article>
          </div>
        </section>

        <section className={styles.labPatterns}>
          <h2>追加パターン</h2>
          <p>スクロールで発火するパターンを下に追加していきます。</p>
          <div className={styles.labPatternsGrid}>
            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>07</span>
                  <h2>SVG線描き</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <svg className={styles.labSvgDraw} viewBox="0 0 240 120" role="presentation" aria-hidden="true">
                <text className={styles.labSvgText} x="16" y="72">
                  REVERSE
                </text>
                <text className={styles.labSvgTextSub} x="16" y="98">
                  ENGINEERING
                </text>
              </svg>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="left" data-lab-speed="fast">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>08</span>
                  <h2>文字の1文字ずつ表示</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <p className={styles.labStaggerText}>
                {"精密なスキャンと解析で、"}
                {"現物から設計の手がかりを見つけます。"}
              </p>
              <div className={styles.labStaggerLine}>
                {"Reverse Engineering".split("").map((char, index) => (
                  <span key={`${char}-${index}`} className={styles.labStaggerChar} style={{ "--i": index } as CSSProperties}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="slow">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>09</span>
                  <h2>画像マスク切替</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labWipeFrame}>
                <Image
                  src="/images/homepage-hero.webp"
                  alt="ワイプ演出の例"
                  fill
                  className={styles.labWipeImage}
                />
                <div className={styles.labWipeMask} />
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>10</span>
                  <h2>ぼかし→フォーカス</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labBlurFrame}>
                <Image
                  src="/images/3d-printer-aglista.webp"
                  alt="フォーカス演出の例"
                  fill
                  className={styles.labBlurImage}
                />
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="right" data-lab-speed="fast">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>11</span>
                  <h2>グリッチ短尺</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labGlitchBox}>
                <span className={styles.labGlitchText} data-text="3Dスキャン">
                  3Dスキャン
                </span>
                <span className={styles.labGlitchSub}>短いノイズでアクセント</span>
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="slow">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>12</span>
                  <h2>微小フローティング</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labFloatStage}>
                <div className={styles.labFloatItem} />
                <div className={styles.labFloatItem} />
                <div className={styles.labFloatItem} />
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>13</span>
                  <h2>スキャンライン</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labScanFrame}>
                <div className={styles.labScanGrid} />
                <div className={styles.labScanLine} />
                <div className={styles.labScanBeam} />
                <div className={styles.labScanPulse} />
                <div className={styles.labScanLabel}>SCAN</div>
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>14</span>
                  <h2>線の収束</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labConverge}>
                <div className={styles.labConvergeGrid} />
                <div className={styles.labConvergeLine} />
                <div className={styles.labConvergeLine} />
                <div className={styles.labConvergeLine} />
                <div className={styles.labConvergeLine} />
                <div className={styles.labConvergeDot} />
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>15</span>
                  <h2>数字カウントアップ</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labCount}>
                <div>
                  <span className={styles.labCountNumber} data-lab-count="128" data-lab-duration="1400">
                    0
                  </span>
                  <span className={styles.labCountLabel}>案件</span>
                </div>
                <div>
                  <span className={styles.labCountNumber} data-lab-count="42" data-lab-duration="1200">
                    0
                  </span>
                  <span className={styles.labCountLabel}>スキャン</span>
                </div>
                <div>
                  <span className={styles.labCountNumber} data-lab-count="18" data-lab-duration="1100">
                    0
                  </span>
                  <span className={styles.labCountLabel}>造形</span>
                </div>
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>16</span>
                  <h2>スキャン断面スライス</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labSliceFrame}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`slice-${index}`}
                    className={styles.labSlice}
                    style={
                      {
                        backgroundImage: "url(/images/homepage-hero.webp)",
                        backgroundSize: "600% 100%",
                        backgroundPosition: `${index * 20}% 50%`,
                        "--i": index,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>17</span>
                  <h2>リキッドマスク</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labLiquidFrame}>
                <div className={styles.labLiquidImage} />
                <div className={styles.labLiquidBlob} />
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>18</span>
                  <h2>光の走査線＋残像</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labSweepFrame}>
                <div className={styles.labSweepBase}>Precision Engineering</div>
                <div className={styles.labSweepLine} />
                <div className={styles.labSweepTrail} />
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>19</span>
                  <h2>アウトライン→塗り</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labOutlineWrap}>
                <span className={styles.labOutlineText}>REPAIR</span>
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>20</span>
                  <h2>数値ゲージ</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labGauge}>
                {[
                  { label: "精度", value: "82%", count: 82 },
                  { label: "再現性", value: "65%", count: 65 },
                  { label: "スピード", value: "74%", count: 74 },
                ].map((item) => (
                  <div key={item.label} className={styles.labGaugeRow}>
                    <span>{item.label}</span>
                    <div className={styles.labGaugeTrack}>
                      <div
                        className={styles.labGaugeFill}
                        style={{ "--lab-gauge": item.value } as CSSProperties}
                      />
                    </div>
                    <span className={styles.labGaugeValue} data-lab-count={item.count} data-lab-duration="1000">
                      0
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>21</span>
                  <h2>ピクセル化→復元</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labPixelFrame}>
                <div className={styles.labPixelImage} />
                <div className={styles.labPixelOverlay} />
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>22</span>
                  <h2>カード解体→再構成</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labAssemble}>
                {[
                  { x: -40, y: -20 },
                  { x: 30, y: -10 },
                  { x: -20, y: 30 },
                  { x: 40, y: 20 },
                ].map((item, index) => (
                  <div
                    key={`piece-${index}`}
                    className={styles.labAssemblePiece}
                    style={{ "--x": `${item.x}px`, "--y": `${item.y}px` } as CSSProperties}
                  />
                ))}
                <div className={styles.labAssembleCore}>REBUILD</div>
              </div>
            </article>

            <article className={styles.labCard} data-lab-observe data-lab-direction="up" data-lab-speed="normal">
              <div className={styles.labCardHeader}>
                <div className={styles.labCardTitle}>
                  <span className={styles.labBadge}>23</span>
                  <h2>斜めレイヤーのスライド</h2>
                </div>
                <div className={styles.labCardActions}>
                  <span>パターン</span>
                  <button type="button" className={styles.labReplay} data-lab-replay>
                    再生
                  </button>
                </div>
              </div>
              <div className={styles.labDiagonal}>
                <div className={styles.labDiagonalLayer} />
                <div className={styles.labDiagonalLayer} />
                <div className={styles.labDiagonalLayer} />
                <span className={styles.labDiagonalText}>SCAN / PRINT</span>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.labSpacer} aria-hidden="true">
          <div />
          <div />
          <div />
        </section>
      </div>
    </main>
  )
}
