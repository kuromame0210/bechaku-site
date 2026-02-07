# Design

## 方針
- トップページの Hero セクションに画像を追加する。
- 画像は `public/images/` のユーザー提供素材を使用する（ネット検索不可のため）。
- 既存のテキスト主体レイアウトを維持しつつ、2カラム構成で右側に画像を配置する。

## 画像候補
- `public/images/メインページトップ.jpg`（名前から主候補）
- `public/images/工場の機械ロボットアーム.png`
- `public/images/3dスキャナ使っている様子.jpg`

## 既存画像の割り当て（該当あり）
- `/images/icon-scan.png` → `public/images/icon-scan.png`（元: 3dスキャナの画像）
- `/images/icon-print.png` → `public/images/icon-print.png`（元: 3dプリンタの画像）
- `/images/icon-3d-data.jpg` → `public/images/icon-3d-data.jpg`（元: 3dスキャナ使っている様子）
- `/images/icon-assembly.jpg` → `public/images/icon-assembly.jpg`（元: 電子基盤組立）

## 未充足の画像（AI生成想定）
- `/images/icon-restore.jpg`（復元・再生のイメージ）
- `/images/icon-prototype.jpg`（試作のイメージ）
- `/images/icon-no-drawing.jpg`（図面なしの実物）
- `/images/icon-caution-surface.jpg`（透明・鏡面・囲い形状）
- `/images/icon-caution-correction.jpg`（補正・推定が必要な形状）
- `/images/icon-small-batch.jpg`（小ロット・複数造形）

## 配置設計（トップページ）
- 対象ファイル: `app/page.tsx`
- Hero セクション内を `grid` に変更し、左: テキスト、右: 画像。
- 画像は `next/image` の `fill` と `object-cover` を使い、`rounded-2xl` と軽い `shadow` を付与。
- モバイルは縦積み（テキスト→画像）で `gap` を確保。
- `sizes` は `"(max-width: 768px) 100vw, 50vw"` を指定。

## 配置設計（各ページヘッダー/会社概要）
- `app/scan/page.tsx`: ヘッダーに `icon-scan.png` を配置（2カラム）。
- `app/print/page.tsx`: ヘッダーに `icon-print.png` を配置（2カラム）。
- `app/flow/page.tsx`: ヘッダーに `icon-3d-data.jpg` を配置（2カラム）。
- `app/company/page.tsx`: 「弊社について」に `工場の機械ロボットアーム.png` を配置（2カラム）。

## 画像ファイル名の扱い
- 現状の日本語ファイル名でも参照は可能。
- URLの扱いを安定させたい場合は `hero-main.jpg` 等のASCII名にリネームし、参照先を更新する。

## 画像命名（提案）
- 既存画像の割り当て分は `public/images/icon-*.png` のASCII名にリネームし、コード側も同名で参照する。
  - 実施済み: `icon-scan.png`, `icon-print.png`, `icon-3d-data.jpg`, `icon-assembly.jpg`

## 実装手順（Gate 1 承認後）
1) 画像ファイル名を確定（必要ならリネーム）。
2) `app/page.tsx` の Hero セクションに画像ブロックを追加。
3) 参照先の `src` を候補画像に合わせて設定。
