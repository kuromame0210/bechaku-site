import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getAllSlugs, getPost } from "@/lib/blog"
import { CTASection } from "@/components/cta-section"
import { SITE_URL } from "@/lib/site"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.frontmatter.title}｜別役ロボット工業`,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { frontmatter, content } = post

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      "@type": "Organization",
      name: "別役ロボット工業株式会社",
      url: SITE_URL,
    },
  }

  const faqSchema =
    frontmatter.faq && frontmatter.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: frontmatter.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null

  return (
    <main>
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(articleSchema)}
      </Script>
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(faqSchema)}
        </Script>
      )}

      <article className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <header className="mb-10">
          <p className="text-sm text-muted-foreground">{frontmatter.date}</p>
          <h1 className="mt-2 text-2xl font-bold leading-relaxed text-foreground md:text-3xl">
            {frontmatter.title}
          </h1>
          {frontmatter.image && (
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}
        </header>

        <div className="prose prose-neutral max-w-none">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="mb-4 mt-10 border-b border-border pb-3 text-xl font-bold text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-loose text-foreground/90">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 ml-4 list-disc leading-loose text-foreground/90">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 ml-4 list-decimal leading-loose text-foreground/90">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="mb-1.5 leading-relaxed">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              table: ({ children }) => (
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="border-b border-border bg-secondary/50">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-border/50 px-4 py-3 text-sm">
                  {children}
                </td>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mb-4 border-l-4 border-primary/40 pl-4 text-muted-foreground">
                  {children}
                </blockquote>
              ),
              img: ({ src, alt }) => (
                <span className="my-6 block overflow-hidden rounded-lg">
                  <Image
                    src={src || ""}
                    alt={alt || ""}
                    width={768}
                    height={432}
                    className="w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </span>
              ),
            }}
          >
            {content}
          </Markdown>
        </div>

        {/* FAQ section from frontmatter */}
        {frontmatter.faq && frontmatter.faq.length > 0 && (
          <section className="mt-12 rounded-lg border border-border bg-secondary/30 p-6 md:p-8">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              よくある質問
            </h2>
            <dl className="flex flex-col gap-6">
              {frontmatter.faq.map((item, i) => (
                <div key={i}>
                  <dt className="font-semibold text-foreground">
                    Q. {item.question}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-muted-foreground">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </article>

      <CTASection
        heading="まずは相談だけでも大丈夫です"
        description="図面がない部品や製造中止品も、写真や現物があれば対応可否の確認からご相談いただけます。"
        eventLabel="blog_cta"
      />
    </main>
  )
}
