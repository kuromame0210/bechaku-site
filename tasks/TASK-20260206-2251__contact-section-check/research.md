# 調査
- Contact セクション本体は `components/cta-section.tsx` にあり、`<section id="contact">` で定義。
- 表示内容: 見出し「お問い合わせ」、説明文、CTA ボタン「お問い合わせはこちら」、注記「※お問い合わせフォームは後日設置予定です」。
- 参照先: `app/page.tsx` の末尾と `app/company/page.tsx` の末尾で `<CTASection />` が呼ばれている。
- ナビゲーション/リンク: `components/header.tsx` と `components/footer.tsx` の「お問い合わせ」は `/#contact` にリンク。
