# Research

## Notes
- 既存のCSS/TSのタイポグラフィ定義を確認し、PCブレークポイントの最小文字サイズを特定する。
- 16pxに合わせた際の見出し/本文/注釈のバランスを確認する。

## Findings (current typography)
- ベースのフォントサイズは明示指定がなく、Tailwindの既定値を使用。
- 多くの本文や注釈が `text-sm` (0.875rem) と `text-xs` (0.75rem) を使用している。
- `md:text-base` の併記がある箇所もあるが、`text-sm` のままの箇所が多数。

## Locations (examples)
- ページ本文: `app/page.tsx` `app/scan/page.tsx` `app/print/page.tsx` `app/faq/page.tsx`
- 共通部: `components/footer.tsx` `components/cta-section.tsx` `components/header.tsx`
