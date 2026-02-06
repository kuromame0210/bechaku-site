# Design (Gate 1)

## Approach
- PCブレークポイント（`md` 以上）で `text-sm` / `text-xs` を最小16pxに引き上げる。
- モバイルの文字サイズは維持するため、`md` 以上でのみ上書きする。

## Implementation plan
- `app/globals.css` に `@layer utilities` で上書きユーティリティを追加。
- `@media (min-width: 768px)` 内で `.text-sm` と `.text-xs` を `font-size: 1rem` に設定。
- 既存の `leading-*` 指定がある場合はそちらを優先し、未指定の場合は `line-height: 1.5rem` を適用。

## CSS draft
```css
@layer utilities {
  @media (min-width: 768px) {
    .text-sm,
    .text-xs {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
}
```

## Notes / Impact
- PCで小さく見える本文・注釈の最小値を底上げできる。
- `text-xs` を使っている注記やフッターも16pxになるため、必要であれば後で個別調整する。
