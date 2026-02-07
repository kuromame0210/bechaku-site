import React from "react"
import { cn } from "@/lib/utils"
interface SectionHeadingProps {
  tag?: "h1" | "h2" | "h3"
  children: React.ReactNode
  sub?: string
  className?: string
  subClassName?: string
}

export function SectionHeading({
  tag: Tag = "h2",
  children,
  sub,
  className,
  subClassName,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <Tag
        className={cn(
          Tag === "h1"
            ? "font-bold leading-relaxed text-foreground"
            : "font-semibold leading-relaxed text-primary",
          className,
        )}
      >
        {children}
      </Tag>
      {sub && (
        <p className={cn("leading-relaxed text-muted-foreground", subClassName)}>
          {sub}
        </p>
      )}
    </div>
  )
}
