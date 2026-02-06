# Design (Gate 1)

## Evaluation (50代向け)
- ナビが `text-sm` で小さく、現在の本文基準（18px）と差が大きい。
- `text-muted-foreground` のままではコントラストが弱い。
- ロゴが `text-lg` で小さめに見える。

## Recommendations
1) ロゴサイズを `text-xl` に引き上げ
2) ナビを `text-base` に引き上げ（PC/モバイル）
3) ナビの色を `text-foreground` へ（hoverは `text-primary` 維持）
4) メニューのタップ領域を少し広げる（`py-2` など）

## Impact
- 視認性改善、50代向けに読みやすくなる
- コーポレート感は維持
