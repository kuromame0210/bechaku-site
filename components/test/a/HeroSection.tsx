import SectionShell from "./SectionShell";

export default function HeroSection() {
  return (
    <SectionShell>
      <div className="col-span-12 md:col-span-8">
        <h1>公差内を工程で保証する仕組み</h1>
      </div>
      <div className="col-span-12 space-y-4 md:col-span-9">
        <p>図面・公差・材質・測定条件を先に示し、成立条件を固定する</p>
        <p>工程ごとの実測値と判定基準を並べ、任せられる根拠にする</p>
        <p className="text-xs text-muted-foreground">
          図面に書いた条件が、そのまま検査まで通る仕組みを用意しています。
        </p>
      </div>
      <div className="col-span-12">
        <a
          href="#spec-check"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground"
        >
          仕様の前提を共有する
        </a>
      </div>
    </SectionShell>
  );
}
