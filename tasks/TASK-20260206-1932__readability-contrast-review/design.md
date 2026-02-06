# Design (Gate 1)

## Proposal
- 薄いグレーを廃止し、本文/補助テキストを濃い黒に寄せる。
- `text-muted-foreground` は `--foreground` と同等の濃さに設定する。
- `text-muted-foreground/60` の注記は `text-foreground` に置き換える。

## Color adjustments (draft)
- `--muted-foreground`: `215 10% 45%` → `215 25% 15%`（`--foreground` と同等）
- `--muted`: 現状維持（背景トーンを崩さない）

## Target updates
- `app/globals.css`（CSS変数の更新）
- `app/page.tsx` `app/print/page.tsx` `app/scan/page.tsx` などの注記 `text-muted-foreground/60`

## Notes
- 50代向けには「補助テキストでも読める濃さ」が必要。
- フッターは背景が濃色のため、黒化ではなく現状の白系を維持する想定。
