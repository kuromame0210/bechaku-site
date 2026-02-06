# Research

## Notes
- 既存のカラー変数とコンポーネントの使用箇所を調査し、青の適用候補を整理する。

## Current color system
- `app/globals.css` に CSS変数で配色定義（--primary/--secondary/--accent/--muted/--border）。
- `bg-card`, `bg-secondary`, `border-border`, `text-primary` などが多用されている。

## Corporate blue reference
- Base color: `#1E4BA0`
- HSL: `219 68% 37%`

## Candidate areas for corporate blue
- グローバル: `--primary`（ボタン/リンク/強調）、`--border`（セクション区切り）
- セクション背景: `bg-secondary` の差分帯（複数ページで使用）
- ボックス装飾: `Card` の `border-border` と `bg-card`
- 目立たせる装飾: `bg-primary` の丸バッジ/アイコン背景

## Usage hotspots (examples)
- ページ見出し帯: `bg-card` セクション（`app/page.tsx` `app/scan/page.tsx` `app/print/page.tsx` `app/faq/page.tsx` ほか）
- セクション区切り: `border-t border-border`（各ページ多数）
- 差分背景帯: `bg-secondary`（`app/page.tsx` `app/scan/page.tsx` `app/print/page.tsx` `app/company/page.tsx` `app/usage/page.tsx` など）
- CTA/フッター: `components/cta-section.tsx` `components/footer.tsx`
