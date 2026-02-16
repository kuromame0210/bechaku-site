import SectionShell from "./SectionShell";
import SimpleTable from "./SimpleTable";

const rows = [
  { label: "図面形式", value: "必須" },
  { label: "公差", value: "必須" },
  { label: "材質", value: "必須" },
  { label: "数量", value: "必須" },
  { label: "検査要件", value: "必須（全数検査 / 抜取検査）" },
];

export default function SpecCheckSection() {
  return (
    <SectionShell id="spec-check">
      <div className="col-span-12 md:col-span-4">
        <h2>仕様確定チェック（相談導線）</h2>
        <p>役割: 不足情報を先に揃え、見積り・可否判断の往復を減らす。</p>
      </div>
      <div className="col-span-12 md:col-span-8">
        <SimpleTable
          rows={rows.map((row) => ({
            ...row,
            value: (
              <div className="rounded-md border border-border bg-background px-4 py-2 text-base">
                {row.value}
              </div>
            ),
          }))}
        />
      </div>
    </SectionShell>
  );
}
