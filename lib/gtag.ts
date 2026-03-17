export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""

const isProduction = () =>
  typeof window !== "undefined" && process.env.NODE_ENV === "production"

export function pageview(url: string) {
  if (!isProduction() || !window.gtag) return
  window.gtag("config", GA_ID, { page_path: url })
}

export function event(
  action: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!isProduction() || !window.gtag) return
  window.gtag("event", action, params)
}
