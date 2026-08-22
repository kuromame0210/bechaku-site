import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { getAllPosts } from "@/lib/blog"

const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1.0 },
  { path: "/scan", priority: 0.9 },
  { path: "/print", priority: 0.9 },
  { path: "/blog", priority: 0.7 },
  { path: "/company", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/notice", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    priority: route.priority,
  }))

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.date),
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}
