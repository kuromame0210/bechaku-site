"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "トップ", href: "/" },
  { label: "3Dスキャン", href: "/scan" },
  { label: "3Dプリント", href: "/print" },
  { label: "会社案内", href: "/company" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-[1.25rem] font-bold text-primary md:text-[1.5rem]"
        >
          {"別役ロボット工業株式会社"}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link whitespace-nowrap text-base font-medium text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {"お問い合わせ"}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-foreground lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className="menu-reveal lg:hidden"
        data-state={isOpen ? "open" : "closed"}
        aria-hidden={!isOpen}
      >
        <nav className="border-t border-border bg-card px-6 pb-4 pt-2">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="nav-link block py-2 text-base font-medium text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="mt-1 block rounded-md bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                {"お問い合わせ"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
