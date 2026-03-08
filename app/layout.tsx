import React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google"

import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SITE_NAME, SITE_URL } from "@/lib/site"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin", "japanese"],
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "600", "700"],
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin", "japanese"],
  variable: "--font-noto-serif-jp",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | 3Dスキャン・3Dプリント`,
  description:
    "実物から、解析・データ化・復元・試作まで。3Dスキャン・3Dプリントによるリバースエンジニアリング。図面がなくても、現物があれば技術的に成立するかを判断し、形にします。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | 3Dスキャン・3Dプリント`,
    description:
      "実物から、解析・データ化・復元・試作まで。3Dスキャン・3Dプリントによるリバースエンジニアリング。図面がなくても、現物があれば技術的に成立するかを判断し、形にします。",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 3Dスキャン・3Dプリント`,
    description:
      "実物から、解析・データ化・復元・試作まで。3Dスキャン・3Dプリントによるリバースエンジニアリング。図面がなくても、現物があれば技術的に成立するかを判断し、形にします。",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon-32.png",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased`}
      >
        {recaptchaSiteKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="afterInteractive"
          />
        ) : null}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
