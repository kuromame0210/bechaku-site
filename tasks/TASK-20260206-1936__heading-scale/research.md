# Research

## Notes
- 現行のh1/h2サイズと適用箇所を整理し、PC時の指定方法を確認する。

## Current heading implementation
- `components/section-heading.tsx` が h1/h2 の共通スタイルを定義。
  - h1: `text-2xl` / `md:text-3xl`
  - h2: `text-xl` / `md:text-2xl`
- 個別ページでも直接 `h1`/`h2` を持つ箇所あり（例: `app/page.tsx` `app/flow/page.tsx` `app/faq/page.tsx` `components/cta-section.tsx`）。

## Usage inventory (direct h1/h2)
- `app/page.tsx` (hero h1)
- `app/flow/page.tsx` (page h1, section h2 x2)
- `app/faq/page.tsx` (page h1)
- `components/cta-section.tsx` (section h2)

## Usage inventory (SectionHeading)
- `app/scan/page.tsx` (h1)
- `app/print/page.tsx` (h1)
- `app/usage/page.tsx` (h1, h2 x4)
- `app/notice/page.tsx` (h1)
- `app/company/page.tsx` (h1)

## Usage inventory (h3/h4/h5)
- h3: `app/page.tsx` `app/company/page.tsx` `app/scan/page.tsx` `app/usage/page.tsx`
- h5: `components/ui/alert.tsx`
- h4/h6: 未使用

## Usage inventory (p tags)
- 広範囲で使用（本文/注釈/補足/UIラベル）。主要箇所は `app/page.tsx` `app/scan/page.tsx` `app/print/page.tsx` `app/usage/page.tsx` `app/company/page.tsx` `app/faq/page.tsx` `app/notice/page.tsx` と `components/*`。
