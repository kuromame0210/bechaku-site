import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function SectionShell({ id, className, children }: SectionShellProps) {
  return (
    <section id={id} className={`py-24 md:py-28 ${className ?? ""}`.trim()}>
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">{children}</div>
      </div>
    </section>
  );
}
