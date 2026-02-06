# Design (Gate 1)

## Decision
- 全体フォントを明朝系に変更する。
- `Noto Serif JP` を優先し、フォールバックを指定する。

## Implementation plan
- `app/layout.tsx` のフォント読み込みを `Noto_Serif_JP` に変更。
- `tailwind.config.ts` の `fontFamily.sans` を以下に更新。
  - `'var(--font-noto-serif-jp)', 'YuMincho', 'Yu Mincho', 'Hiragino Mincho ProN', 'serif'`
- `body` の `font-sans` で全体に適用。
