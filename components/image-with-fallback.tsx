import Image, { type ImageProps } from "next/image"

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src: string
  fallbackSrc?: string
}

function resolveFallbackSrc(src: string, fallbackSrc?: string) {
  if (fallbackSrc) {
    return fallbackSrc
  }

  if (!src.toLowerCase().endsWith(".webp")) {
    return src
  }

  const replaced = src.replace(/\.webp$/i, ".png")
  if (replaced.startsWith("/images/")) {
    return `/images/png/${replaced.slice("/images/".length)}`
  }

  return replaced
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) {
  if (!src.toLowerCase().endsWith(".webp")) {
    return <Image {...props} src={src} />
  }

  const resolvedFallbackSrc = resolveFallbackSrc(src, fallbackSrc)

  return (
    <picture className="contents">
      <source srcSet={src} type="image/webp" />
      <Image {...props} src={resolvedFallbackSrc} />
    </picture>
  )
}
