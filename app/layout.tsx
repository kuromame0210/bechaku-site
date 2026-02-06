import React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Serif_JP } from "next/font/google"

import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "別役ロボット工業 | 3Dスキャン・3Dプリント",
  description:
    "実物から、解析・データ化・復元・試作まで。3Dスキャン・3Dプリントによるリバースエンジニアリング。図面がなくても、現物があれば技術的に成立するかを判断し、形にします。",
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSerifJP.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
