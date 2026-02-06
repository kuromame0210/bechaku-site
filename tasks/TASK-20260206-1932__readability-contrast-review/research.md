# Research

## Notes
- `text-muted-foreground` や `text-*-foreground/XX` の使用箇所を整理し、コントラストの弱い箇所を特定する。
- 50代向けの可読性を考慮したコントラスト改善の目安を整理する。

## Current usage (muted/low contrast)
- `text-muted-foreground` が広範囲に使用（本文・説明・注記・UI補助）。
- `text-muted-foreground/60` などの薄い指定もあり、注記で使用。
- フッターは `text-primary-foreground/70` と `text-primary-foreground/50`。

## Hotspots (examples)
- ページ本文/説明: `app/page.tsx` `app/scan/page.tsx` `app/print/page.tsx` `app/usage/page.tsx` `app/company/page.tsx` `app/faq/page.tsx`
- UI補助: `components/section-heading.tsx` `components/notice-banner.tsx` `components/cta-section.tsx`
- 注記: `text-muted-foreground/60`（`app/page.tsx` `app/print/page.tsx` `app/scan/page.tsx`）
- フッター: `components/footer.tsx`
