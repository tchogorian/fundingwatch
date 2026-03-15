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

const CATEGORY_BADGE_CLASS: Record<BlogCategory, string> = {
  "contract-analysis": "badge badge-danger",
  "mca-basics": "badge badge-safe",
  "borrower-rights": "badge badge-warning",
  "lender-profiles": "badge",
  "industry-news": "badge",
  "state-guides": "badge",
  "tools-resources": "badge",
  "case-studies": "badge",
};

function getCategoryBadgeStyle(category: BlogCategory): React.CSSProperties {
  if (category === "contract-analysis") return {};
  const color = CATEGORY_COLORS[category];
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

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const badgeClass = CATEGORY_BADGE_CLASS[post.category];
  const badgeStyle = getCategoryBadgeStyle(post.category);

  return (
    <>
      <article className="mx-auto max-w-[1080px] px-6 md:px-8 py-12 lg:flex lg:gap-10 pb-24 md:pb-12" style={{ background: "var(--bg)" }}>
        {/* Main column — priority width for reading */}
        <div className="min-w-0 flex-1 lg:min-w-[min(100%,var(--max-width-text))] lg:max-w-[var(--max-width-text)]">
          {/* Breadcrumb */}
          <nav
            className="text-sm min-[375px]:text-[var(--text-sm)]"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:underline min-h-[48px] min-w-[48px] inline-flex items-center">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="transition hover:underline min-h-[48px] min-w-[48px] inline-flex items-center">Blog</Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--color-text-primary)" }}>
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--color-text-tertiary)" }} className="line-clamp-1">{post.title}</span>
          </nav>

          <span
            className={`mt-4 inline-block ${badgeClass}`}
            style={badgeStyle}
          >
            {CATEGORY_LABELS[post.category]}
          </span>

          <h1
            className="blog-article-title mt-4 font-display text-[28px] leading-tight md:text-3xl lg:text-[3rem]"
            style={{ color: "var(--color-text-primary)" }}
          >
            {post.title}
          </h1>

          {/* Byline */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="font-mono text-[var(--text-sm)]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className="text-[var(--text-sm)]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {post.readTimeMinutes} min read
            </span>
          </div>

          <hr
            className="my-8 border-[var(--color-border-default)]"
            aria-hidden
          />

          {/* Table of Contents — mobile: collapsible dropdown; desktop: sidebar only */}
          {post.headings && post.headings.length > 0 && (
            <aside className="mb-8 lg:mb-0 lg:hidden" aria-label="Table of contents">
              <details className="group rounded-xl border border-[var(--color-border-default)] overflow-hidden" style={{ background: "var(--color-bg-surface)" }}>
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent-primary)" }}>
                  Contents
                  <span className="blog-toc-chevron ml-2 transition-transform" aria-hidden>▼</span>
                </summary>
                <ul className="border-t border-[var(--color-border-default)] px-5 py-4 space-y-2">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block min-h-[48px] py-2 text-sm transition hover:underline"
                        style={{
                          color: "var(--color-text-secondary)",
                          paddingLeft: h.level === 3 ? 12 : 0,
                        }}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </aside>
          )}

          {/* Body */}
          <div
            className="article-prose mt-8"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Mid-article style CTA — one after content */}
          <div
            className="mt-12 flex flex-col gap-4 rounded-xl border border-[var(--color-accent-border)] p-5 sm:flex-row sm:items-center sm:justify-between md:p-7"
            style={{ background: "var(--color-bg-elevated)" }}
          >
            <div>
              <p
                className="flex items-center gap-2 text-base font-semibold md:text-[var(--text-lg)]"
                style={{ color: "var(--color-text-primary)" }}
              >
                <Shield className="h-5 w-5 shrink-0" style={{ color: "var(--color-accent-primary)" }} aria-hidden />
                Does Your Contract Have These Red Flags?
              </p>
              <p
                className="mt-1 text-sm md:text-[var(--text-base)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Upload it free — get your full analysis in under 30 seconds.
              </p>
            </div>
            <Link
              href="/#upload"
              className="btn-primary inline-flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center gap-2"
            >
              Analyze Free
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Related Articles — horizontal scroll on mobile */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2
                className="text-lg font-semibold md:text-xl"
                style={{ color: "var(--color-text-primary)" }}
              >
                Related Articles
              </h2>
              <div className="mt-6 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-3 sm:gap-6">
                <div className="flex gap-4 sm:contents">
                  {related.map((p) => (
                    <div key={p.slug} className="min-w-[280px] flex-1 sm:min-w-0">
                      <BlogCard post={p} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Sidebar ToC — sticky on desktop (only when we have headings) */}
        {post.headings && post.headings.length > 0 && (
          <aside
            className="hidden shrink-0 lg:block lg:w-[var(--sidebar-width)]"
            style={{ maxWidth: "220px" }}
          >
            <div
              className="sticky top-20 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4"
              style={{ background: "var(--color-bg-surface)" }}
            >
              <h2
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-accent-primary)" }}
              >
                Contents
              </h2>
              <ul className="mt-3 space-y-1">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="block border-l-2 border-transparent py-0.5 pl-2.5 text-[13px] leading-snug transition hover:underline line-clamp-2"
                      style={{
                        color: "var(--color-text-secondary)",
                        marginLeft: h.level === 3 ? 8 : 0,
                      }}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </article>
      <BlogStickyCTA />
    </>
  );
}
