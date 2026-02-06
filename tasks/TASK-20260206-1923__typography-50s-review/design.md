# Design (Gate 1)

## Proposal
- SPで `text-sm` を16px、`text-xs` を15pxに引き上げる。
- PC（md以上）で `text-sm` を18px、`text-xs` を16pxに引き上げる。
- `text-base` は SPで17px、PC（md以上）で19.2pxに引き上げる。
- 行間は可読性のため `1.6〜1.75` を狙う。

## Rationale
- 50代の視認性では16px未満が小さく感じやすい。
- 既存の見出し階層は維持しつつ、本文/補助テキストの底上げが目的。

## Implementation plan
- `app/globals.css` の `@layer utilities` で `text-sm`/`text-xs` を上書き。
- `text-base` も同様に上書き。
- モバイルは `text-sm`/`text-xs` を16px/15pxに設定。
- `@media (min-width: 768px)` では `text-sm`/`text-xs` を18px/16pxに設定。

## CSS draft
```css
@layer utilities {
  .text-sm {
    font-size: 1rem;
    line-height: 1.6rem;
  }

  .text-base {
    font-size: 1.0625rem;
    line-height: 1.7rem;
  }

  .text-xs {
    font-size: 0.9375rem;
    line-height: 1.5rem;
  }

  @media (min-width: 768px) {
    .text-sm {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    .text-base {
      font-size: 1.2rem;
      line-height: 1.9rem;
    }

    .text-xs {
      font-size: 1rem;
      line-height: 1.6rem;
    }
  }
}
```

## Risk / Mitigation
- UIコンポーネントの一部も拡大されるため、必要に応じて個別に `text-[size]` を指定して戻す。
