import type { ReactNode } from "react";

type SimpleTableRow = {
  label: string;
  value: ReactNode;
};

type SimpleTableProps = {
  rows: SimpleTableRow[];
};

export default function SimpleTable({ rows }: SimpleTableProps) {
  return (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-12 gap-x-4 px-6 py-4">
            <p className="col-span-12 text-xs text-muted-foreground md:col-span-4">
              {row.label}
            </p>
            <div className="col-span-12 text-base md:col-span-8">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
