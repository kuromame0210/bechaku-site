import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Company info */}
          <div className="flex flex-col gap-2">
            <p className="font-bold">{"別役ロボット工業株式会社"}</p>
            <p className="text-primary-foreground">
              {"〒367-0212 埼玉県本庄市児玉町児玉 1732-1"}
            </p>
            <p className="text-primary-foreground">
              {"TEL: 0495-71-6824"}
            </p>
            <p className="text-primary-foreground">
              {"FAX: 0495-71-6825"}
            </p>
            <p className="text-primary-foreground">
              {"URL: http://www.brinet.co.jp"}
            </p>
            <p className="text-primary-foreground">
              {"e-mail: h-betchaku@brinet.co.jp"}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <p className="font-semibold text-primary-foreground/80">
              {"ページ"}
            </p>
            <Link
              href="/"
              className="text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80 hover:underline"
            >
              {"トップ"}
            </Link>
            <Link
              href="/scan"
              className="text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80 hover:underline"
            >
              {"3Dスキャン"}
            </Link>
            <Link
              href="/print"
              className="text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80 hover:underline"
            >
              {"3Dプリント"}
            </Link>
            <Link
              href="/company"
              className="text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80 hover:underline"
            >
              {"会社案内"}
            </Link>
            <Link
              href="/contact"
              className="text-sm text-primary-foreground transition-colors hover:text-primary-foreground/80 hover:underline"
            >
              {"お問い合わせ"}
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6">
          <p className="text-center text-primary-foreground">
            {"© 2026 別役ロボット工業株式会社 All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
