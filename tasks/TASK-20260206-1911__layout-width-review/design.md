# Design (Gate 1)

## Decision
- PC表示の主コンテナ幅を `max-w-7xl` (1280px相当) に拡張する。
- 本文や説明文は既存の `max-w-2xl/3xl` を維持して行長を制御する。

## Rationale (40〜50代向け)
- 画面占有率を上げて見やすくしつつ、本文行長は長くしすぎない。
- 余白は維持されるため、詰まり感は出にくい。

## Implementation plan
- `max-w-5xl` を使用している主要ページコンテナを `max-w-7xl` に置換。
- `max-w-2xl/3xl` はそのまま（本文の読みやすさ保持）。
- 例外として `app/notice/page.tsx` の `max-w-2xl` は情報量が少ないため現状維持。

## Target files
- `app/page.tsx`
- `app/scan/page.tsx`
- `app/print/page.tsx`
- `app/flow/page.tsx`
- `app/usage/page.tsx`
- `app/company/page.tsx`
- `app/faq/page.tsx`
- `components/header.tsx`
- `components/footer.tsx`
- `components/cta-section.tsx`
- `components/notice-banner.tsx`
