import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { CTASection } from "@/components/cta-section"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "部品復元・図面なし製作コラム｜別役ロボット工業",
  description:
    "図面なし部品の製作、製造中止部品の復元、壊れた設備部品の3Dプリント対応など、リバースエンジニアリングの相談前に知っておきたい情報を解説します。",
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main>
      <section className="border-t border-border bg-card py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading tag="h1" sub="図面なし・製造中止・壊れた部品の復元で困っている方向けの解説です。">
              {"部品復元・リバースエンジニアリングコラム"}
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-14 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-3">
          {posts.map(({ frontmatter }) => (
            <Reveal key={frontmatter.slug}>
              <Link href={`/blog/${frontmatter.slug}`} className="group block h-full">
                <Card className="h-full border-border transition-shadow group-hover:shadow-lg">
                  <CardContent className="flex h-full flex-col gap-3 p-6">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {frontmatter.date}
                    </p>
                    <h2 className="text-base font-semibold leading-relaxed text-foreground group-hover:underline">
                      {frontmatter.title}
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      {frontmatter.description}
                    </p>
                    <span className="mt-auto pt-2 text-sm font-medium text-primary">
                      {"記事を読む →"}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        heading="まずは相談だけでも大丈夫です"
        description="図面なし・製造中止・壊れた部品など、現物や写真があれば対応可否の確認からご相談いただけます。"
        eventLabel="blog_index_cta"
      />
    </main>
  )
}
