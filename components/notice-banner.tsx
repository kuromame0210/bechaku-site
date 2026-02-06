import { Info } from "lucide-react"

export function NoticeBanner() {
  return (
    <div className="border-b border-border bg-accent">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-2.5">
        <Info className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          {"※本ページは営業・説明用途を想定した構成検討用の仮サイトです。"}
        </p>
      </div>
    </div>
  )
}
