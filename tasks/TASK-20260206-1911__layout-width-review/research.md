# Research

## Notes
- `max-width` 指定箇所を確認し、余白が大きく見える原因を整理する。
- 40〜50代の可読性を考慮し、行長・余白バランスを評価する。

## Current layout widths
- 主要ページのコンテナは `max-w-5xl` (1024px相当) が中心。
- 一部、`max-w-2xl` / `max-w-3xl` を本文幅として使用。

## Usage inventory (max-w-5xl)
- `app/page.tsx` `app/scan/page.tsx` `app/print/page.tsx` `app/flow/page.tsx`
- `app/usage/page.tsx` `app/company/page.tsx` `app/faq/page.tsx`
- `components/header.tsx` `components/footer.tsx` `components/cta-section.tsx` `components/notice-banner.tsx`

## Evaluation (40〜50代向けUI観点)
- 左右余白が大きいと視線移動量が増え、画面占有率が低く感じられる。
- 本文の行長は長すぎると読みづらくなるため、コンテナ幅拡大と本文幅の制御は分けて考えるのが安全。
- 既に本文は `max-w-2xl/3xl` で制御されているため、外側コンテナの拡大は崩れを起こしにくい。
