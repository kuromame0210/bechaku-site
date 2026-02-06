# Design (Gate 1)

## Evaluation
- 現状は即時表示/非表示で、視線の誘導が弱い。
- 50代向けには「ゆっくりすぎないが分かりやすい」短いフェード/スライドが適切。

## Recommendations
- メニューの開閉に 150〜200ms のフェード+スライド（軽い下方向）を追加。
- `prefers-reduced-motion` に対応して動きを抑制。
- クリック時の反応遅延を避けるため、過度なアニメーションはしない。

## Implementation plan
- `components/header.tsx` のモバイルメニューに `data-state` を付与し、CSSでアニメーションを当てる。
- `app/globals.css` に `@media (prefers-reduced-motion: reduce)` を追加。

## Follow-up (spacing when closed)
- 閉じた時の余白/区切り線を消すため、`nav` ではなく内側ラッパーに `padding` と `border` を移す。
- `menu-reveal` は高さ0/透明/非操作で閉じた状態を維持し、開いた時だけ余白が出る構成にする。
