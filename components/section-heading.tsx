import React from "react"
interface SectionHeadingProps {
  tag?: "h1" | "h2" | "h3"
  children: React.ReactNode
  sub?: string
}

export function SectionHeading({
  tag: Tag = "h2",
  children,
  sub,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <Tag
        className={
          Tag === "h1"
            ? "font-bold leading-relaxed text-foreground"
            : Tag === "h2"
              ? "font-semibold leading-relaxed text-foreground"
              : "font-semibold leading-relaxed text-foreground"
        }
      >
        {children}
      </Tag>
      {sub && (
        <p className="leading-relaxed text-muted-foreground">{sub}</p>
      )}
    </div>
  )
}
