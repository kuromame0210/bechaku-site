import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Company info */}
          <div className="flex flex-col gap-2">
            <p className="font-bold">{"別役ロボット工業"}</p>
            <p className="text-primary-foreground/70">
              {"〒000-0000 ○○県○○市○○町0-0-0"}
            </p>
            <p className="text-primary-foreground/70">
              {"TEL: 000-000-0000"}
            </p>
            <p className="text-primary-foreground/70">
              {"※会社情報は仮のものです"}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <p className="font-semibold text-primary-foreground/80">
              {"ページ"}
            </p>
            <Link
              href="/"
              className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {"トップ"}
            </Link>
            <Link
              href="/scan"
              className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {"3Dスキャン"}
            </Link>
            <Link
              href="/print"
              className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {"3Dプリント"}
            </Link>
            <Link
              href="/contact"
              className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {"お問い合わせ"}
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6">
          <p className="text-center text-primary-foreground/50">
            {"© 2026 別役ロボット工業 All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
