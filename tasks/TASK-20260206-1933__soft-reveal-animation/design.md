# Design (Gate 1)

## Motion spec
- 老舗の落ち着き: フェード中心 + ごく小さな移動
- Duration: 500ms
- Easing: ease-out
- Offset: 6px
- Stagger: 0ms（多用しない）

## Trigger
- スクロールで画面に入った時に発火
- `prefers-reduced-motion: reduce` では無効化

## Implementation plan
- IntersectionObserver を使って表示時に `reveal--in` を付与
- `app/globals.css` に `.reveal` / `.reveal--in` を追加
- 付与対象は主要ブロックのみ（負荷を抑える）
- モバイルは発火タイミングを早めに調整

## Target list (minimal)
- ページ先頭の見出しブロック
- CTAセクション
- カード類はカード単位で付与

## Notes
- 既存の動き（ハンバーガー）と干渉しないよう命名を分離
