import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, ArrowRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import BlogStickyCTA from "@/components/BlogStickyCTA";
import {
  getPostBySlug,
  getRelatedPosts,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type BlogCategory,
} from "@/lib/blog";

function getCategoryBadgeStyle(category: BlogCategory): React.CSSProperties {
  const color = CATEGORY_COLORS[category] ?? "var(--blue)";
  return { background: `${color}20`, borderColor: `${color}50`, color };
}

export async function generateStaticParams() {
  const { BLOG_POSTS } = await import("@/lib/blog");
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  const title = `${post.title} — Debtura Intelligence`;
  const description = post.metaDescription || post.excerpt;
  const url = `https://www.debtura.com/intelligence/${slug}`;
  return {
    title,
    description,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "Debtura",
      authors: post.author ? [post.author] : undefined,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function IntelligenceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const badgeStyle = getCategoryBadgeStyle(post.category);
  const dateFormatted = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <main className="min-h-screen" style={{ background: "var(--bg)" }}>
        <section className="border-b border-[var(--line)] bg-white">
          <div className="mx-auto max-w-[720px] px-6 md:px-8 pt-8 pb-8 md:pt-12 md:pb-10">
            <Link
              href="/intelligence"
              className="text-[13px] font-medium no-underline hover:opacity-80"
              style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}
            >
              ← Back to Intelligence
            </Link>
            <div className="mt-6 mb-2 flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
              <span
                className="text-[9px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}
              >
                {CATEGORY_LABELS[post.category]}
              </span>
            </div>
            <h1
              className="text-[28px] leading-tight md:text-[34px] lg:text-[38px] font-semibold"
              style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
            >
              {post.title}
            </h1>
            <p
              className="mt-3 text-[14px]"
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
            >
              {dateFormatted}
              <span className="mx-2">·</span>
              {post.readTimeMinutes} min read
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[720px] px-6 md:px-8 py-10 md:py-12">
          {post.headings && post.headings.length > 0 && (
            <details
              className="mb-10 rounded-lg border border-[var(--line)] overflow-hidden"
              style={{ background: "var(--white)" }}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}
              >
                Contents
                <span className="ml-2 text-[10px]" aria-hidden>▼</span>
              </summary>
              <ul className="border-t border-[var(--line)] px-5 py-4 space-y-1.5">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="block py-1.5 text-[14px] transition hover:opacity-80"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--body)",
                        paddingLeft: h.level === 3 ? 16 : 0,
                      }}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div
            className="article-prose text-[16px] leading-[1.75]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--body)" }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div
            className="mt-12 flex flex-col gap-4 rounded-lg border border-[var(--line)] p-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ background: "var(--bg)" }}
          >
            <div>
              <p
                className="flex items-center gap-2 text-[16px] font-semibold"
                style={{ fontFamily: "var(--font-sans)", color: "var(--navy)" }}
              >
                <Shield className="h-5 w-5 shrink-0" style={{ color: "var(--red)" }} aria-hidden />
                Does Your Contract Have These Red Flags?
              </p>
              <p
                className="mt-1 text-[14px]"
                style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
              >
                Upload it free — get your full analysis in under 30 seconds.
              </p>
            </div>
            <Link
              href="/#upload"
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-3 text-[14px] font-semibold transition hover:opacity-90"
              style={{
                fontFamily: "var(--font-sans)",
                background: "var(--red)",
                color: "var(--white)",
              }}
            >
              Analyze Free
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-14">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}
                >
                  Related
                </span>
              </div>
              <h2
                className="text-[22px] font-semibold"
                style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
              >
                Related Articles
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {related.map((p) => (
                  <div key={p.slug}>
                    <BlogCard post={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <BlogStickyCTA />
    </>
  );
}
