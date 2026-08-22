import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  slug: string
  image?: string
  faq?: { question: string; answer: string }[]
}

export type BlogPost = {
  frontmatter: BlogFrontmatter
  content: string
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    frontmatter: { slug, ...data } as BlogFrontmatter,
    content,
  }
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map(getPost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
}
