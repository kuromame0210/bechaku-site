import SectionShell from "./SectionShell";
import SimpleTable from "./SimpleTable";

const rows = [
  { label: "測定点数", value: "12点" },
  { label: "測定頻度", value: "初品100% / ロット毎 10点" },
  { label: "測定器", value: "三次元測定機 / マイクロメータ" },
  {
    label: "分解能",
    value: <span className="font-semibold tracking-tight">0.001mm</span>,
  },
];

export default function MeasurementSection() {
  return (
    <SectionShell>
      <div className="col-span-12 md:col-span-4">
        <h2>測定体系（測定点・頻度・基準の一覧）</h2>
        <p className="text-xs text-muted-foreground">
          用語補足: 分解能 = どこまで細かく測れるかの最小単位
        </p>
      </div>
      <div className="col-span-12 md:col-span-8">
        <SimpleTable rows={rows} />
      </div>
    </SectionShell>
  );
}
