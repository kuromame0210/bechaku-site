# Design (Gate 1)

## Decision
- h1〜h3 と p のサイズは共通スタイルで統一し、各要素にはサイズクラスを付けない。
- PC（md以上）で h1=48px、h2=28px、h3=24px を共通定義に反映。
- p は 16px を共通定義に反映。
- h5 は既存維持（必要なら後で調整）。

## Implementation plan
- `app/globals.css` に `h1`/`h2`/`h3`/`p` の共通スタイルを定義（PC時のサイズ含む）。
- `components/section-heading.tsx` のサイズクラスを削除（共通スタイルに寄せる）。
- 各ページの `h1`/`h2`/`h3`/`p` のサイズクラスを削除。

## Target updates
- `app/globals.css`
- `components/section-heading.tsx`
- `app/page.tsx` (hero h1)
- `app/flow/page.tsx` (page h1, section h2)
- `app/faq/page.tsx` (page h1)
- `components/cta-section.tsx` (section h2)
## CSS sizes
- h1 PC: `2.8rem` (約45px)
- h2 PC: `28px`
- h3 PC: `24px`
- p: PCのみ `19px`（SPは現状維持）

## CSS sizes
- h1 PC: `md:text-[48px]`
- h2 PC: `md:text-[28px]`
