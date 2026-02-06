# Research

## Notes
- 現行のハンバーガーメニュー開閉動作を調査し、アニメーションの有無を確認する。

## Current behavior
- `components/header.tsx` で `isOpen` による条件描画のみ。
- アニメーションは未実装（即時表示/非表示）。

## Update (after animation)
- モバイルメニューは常時描画に変更し、`menu-reveal` で開閉アニメーション。
- `nav` に `px-6 pb-4 pt-2` が残るため、閉じている時も余白が見える。
- `border-t` も常時表示になり、閉じていても区切り線が見える。
