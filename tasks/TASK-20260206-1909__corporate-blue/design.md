# Design (Gate 1)

## Color system proposal
- Primary: `#1E4BA0` (`219 68% 37%`)
- Primary foreground: `210 20% 98%` (ほぼ白)
- Secondary (background band): `215 45% 96%` (薄いブルーの帯)
- Accent (subtle UI): `215 40% 92%`
- Muted (subtle UI): `215 35% 95%`
- Border: `215 30% 85%` (青味のある区切り線)

## Where blue will appear
- ボタン・リンク・強調: `--primary` により全体反映
- セクションの切れ目: `border-border` を青味にして区切りを明確化
- 差分背景帯: `bg-secondary` を薄いブルーで信頼感のあるトーンに
- ボックス装飾: `Card` の枠線が青味で統一
- 注意喚起/バッジ: 既存の `bg-primary` バッジもコーポレートブルーに

## Non-goals
- 画像のブラー・フィルタには青を使用しない。
- 本文テキスト色は基本維持（コントラストを確保）。

## Implementation plan
- `app/globals.css` の CSS変数を更新。
- `--primary`/`--secondary`/`--accent`/`--muted`/`--border`/`--ring` を新配色に調整。
