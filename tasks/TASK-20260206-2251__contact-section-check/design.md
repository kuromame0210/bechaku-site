# 設計
- 対象: `components/cta-section.tsx` の Contact セクション内テキスト群（見出し/説明文/CTAボタン/注記）。
- 方針: `<Reveal>` に `className` を追加して縦方向の間隔を付与する。
- 具体: `className="flex flex-col items-center gap-3 md:gap-4"` を付与し、テキスト間の余白を確保する。
- 変更範囲: 余白のみ（文言や構造は変更しない）。
