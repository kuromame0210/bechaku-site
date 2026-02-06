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
            ? "text-2xl font-bold leading-relaxed text-foreground md:text-3xl"
            : Tag === "h2"
              ? "text-xl font-semibold leading-relaxed text-foreground md:text-2xl"
              : "text-lg font-semibold leading-relaxed text-foreground"
        }
      >
        {children}
      </Tag>
      {sub && (
        <p className="text-sm leading-relaxed text-muted-foreground">{sub}</p>
      )}
    </div>
  )
}
