import SectionShell from "./SectionShell";
import SimpleTable from "./SimpleTable";

const rows = [
  { label: "図面形式", value: "PDF / STEP / IGES" },
  { label: "公差", value: "穴径 ±0.005mm / 平面度 0.01mm" },
  { label: "材質", value: "S45C / SUS304 / A6061" },
  { label: "形状", value: "角物 / 円筒 / 薄肉" },
  { label: "測定条件", value: "測定温度 20±1℃ / 測定面指定" },
];

export default function PreconditionsSection() {
  return (
    <SectionShell>
      <div className="col-span-12 md:col-span-4">
        <h2>精度成立の前提条件（入力仕様）</h2>
      </div>
      <div className="col-span-12 md:col-span-8">
        <SimpleTable rows={rows} />
      </div>
    </SectionShell>
  );
}
