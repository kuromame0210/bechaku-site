# Design (Gate 1)

## Placement instruction sheet
### Base folder
- Place all new images in `public/images/`

### Naming convention
- Use lowercase English + hyphen, JPEG recommended
- Format: `<section>-<purpose>.jpg`

### Required assets
1) Home / Capabilities cards (16:9)
- File: `public/images/home-capability-scan.jpg`
  - Alt: 実物を3Dスキャンしてデータ化するイメージ
  - Use: トップページ「実物 → 3Dデータ化」
  - Visual: スキャナが対象物を読み取っている様子（人物なし）
- File: `public/images/home-capability-print.jpg`
  - Alt: 3Dプリンタで造形しているイメージ
  - Use: トップページ「3Dデータ → 造形」
  - Visual: 3Dプリンタの造形中、積層が分かるカット（人物なし）
- File: `public/images/home-capability-restore.jpg`
  - Alt: 旧パーツの復元に向けた測定・解析のイメージ
  - Use: トップページ「旧パーツ・部品の復元」
  - Visual: 部品＋計測/解析の雰囲気（人物なし）
- File: `public/images/home-capability-prototype.jpg`
  - Alt: 試作と小ロット量産のイメージ
  - Use: トップページ「試作・量産（カスタム）」
  - Visual: 試作部品の集合や段階的な造形（人物なし）

2) 3Dスキャン / Capabilities cards (16:9)
- File: `public/images/scan-capability-precision.jpg`
  - Alt: 実物を精密にスキャンするイメージ
  - Use: 3Dスキャン「実物を精密にスキャン」
  - Visual: スキャナが対象物を読み取る様子（人物なし）
- File: `public/images/scan-capability-3ddata.jpg`
  - Alt: 点群やメッシュで3Dデータ化するイメージ
  - Use: 3Dスキャン「形状・構造を3Dデータとして取得」
  - Visual: 点群/メッシュ/CAD画面のイメージ（人物なし）
- File: `public/images/scan-capability-nodrawing.jpg`
  - Alt: 図面がない状態から検討できるイメージ
  - Use: 3Dスキャン「図面がない状態から検討可能」
  - Visual: 現物＋メモ/測定器具など（人物なし）

3) 3Dスキャン / Cautions cards (16:9)
- File: `public/images/scan-caution-surface.jpg`
  - Alt: 透明・鏡面・囲い形状の注意点イメージ
  - Use: 3Dスキャン「透明・鏡面・囲い形状」
  - Visual: 透明材/鏡面/囲い形状の雰囲気（人物なし）
- File: `public/images/scan-caution-correction.jpg`
  - Alt: 補正・推定が入る場合の注意点イメージ
  - Use: 3Dスキャン「補正・推定が入る場合」
  - Visual: 欠損を補完する表示や補正の雰囲気（人物なし）

4) 3Dプリント / Capabilities cards (16:9)
- File: `public/images/print-capability-prototype.jpg`
  - Alt: 試作品の造形イメージ
  - Use: 3Dプリント「試作品の造形」
  - Visual: 造形中のプリンタや積層のアップ（人物なし）
- File: `public/images/print-capability-assembly.jpg`
  - Alt: 組付け・干渉確認モデルのイメージ
  - Use: 3Dプリント「組付け・干渉確認モデル」
  - Visual: 複数部品の組み合わせ/はめ合い（人物なし）
- File: `public/images/print-capability-smallbatch.jpg`
  - Alt: 小ロットでの形状確認イメージ
  - Use: 3Dプリント「小ロットでの形状確認」
  - Visual: 同形状の複数パーツの並び（人物なし）

## Image specs
- Aspect ratio: 16:9
- Recommended size: 1600x900 or larger
- Format: JPG (quality high), or PNG if necessary

## Replacement plan
- Replace existing icon image paths with above files after assets are provided.
