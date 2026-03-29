import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1.0 },
  { path: "/scan", priority: 0.9 },
  { path: "/print", priority: 0.9 },
  { path: "/company", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/notice", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    priority: route.priority,
  }))
}
