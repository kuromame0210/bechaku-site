import SectionShell from "./SectionShell";

const processes = [
  {
    name: "荒加工",
    items: "取り代 / 切削条件 / 実測寸法",
    measured: "50.012mm",
    criteria: "50.000±0.020mm",
  },
  {
    name: "仕上げ加工",
    items: "回転数 / 送り / 実測寸法",
    measured: "50.004mm",
    criteria: "50.000±0.005mm",
  },
  {
    name: "最終検査",
    items: "測定器 / 測定位置 / 実測寸法",
    measured: "50.002mm",
    criteria: "50.000±0.005mm",
  },
];

export default function ProofSection() {
  return (
    <SectionShell className="bg-muted/20">
      <div className="col-span-12 space-y-3">
        <h2>工程証明（設計→加工→検査の実測列）</h2>
        <p className="text-xs text-muted-foreground">
          用語補足: 実測値 = 実際に測った数値、判定基準 = 合否を決める数値範囲
        </p>
      </div>
      <div className="col-span-12 space-y-6">
        {processes.map((process) => (
          <div
            key={process.name}
            className="rounded-lg border border-border bg-card px-6 py-6"
          >
            <div className="grid grid-cols-12 gap-x-6 gap-y-4">
              <div className="col-span-12 md:col-span-4">
                <p className="text-xs text-muted-foreground">実測値欄</p>
                <p
                  className={`text-base ${
                    process.measured === "50.002mm"
                      ? "font-semibold tracking-tight"
                      : ""
                  }`}
                >
                  {process.measured}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <p className="text-xs text-muted-foreground">判定基準</p>
                <p className="text-base">{process.criteria}</p>
              </div>
              <div className="col-span-12 md:col-span-4 space-y-2">
                <p className="text-base text-muted-foreground">{process.name}</p>
                <div>
                  <p className="text-xs text-muted-foreground">記録項目</p>
                  <p className="text-base">{process.items}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
