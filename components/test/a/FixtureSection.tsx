import SectionShell from "./SectionShell";
import SimpleTable from "./SimpleTable";

const rows = [
  { label: "設備型式", value: "立形マシニングセンタ VM-500" },
  { label: "固定方法", value: "治具ベース + 位置決めピン" },
  { label: "再現性の要", value: "治具交換時の基準面指定" },
  { label: "校正周期", value: "3か月" },
];

export default function FixtureSection() {
  return (
    <SectionShell>
      <div className="col-span-12 md:col-span-4">
        <h2>設備・治具の再現性構造</h2>
        <p className="text-xs text-muted-foreground">
          用語補足: 再現性の要 = 同じ精度を出すための固定条件
        </p>
      </div>
      <div className="col-span-12 md:col-span-8">
        <SimpleTable rows={rows} />
      </div>
    </SectionShell>
  );
}
