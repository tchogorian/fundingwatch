import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
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
  return {
    title: `${post.title} — FundingWatch Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.fundingwatch.org/blog/${slug}`,
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
      <article className="mx-auto max-w-[1008px] px-5 py-12 sm:px-6 lg:flex lg:gap-12 pb-24 md:pb-12">
        {/* Main column — max-width 680px */}
        <div className="min-w-0 flex-1 lg:max-w-[var(--max-width-text)]">
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
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-medium"
              style={{
                background: "var(--color-accent-muted)",
                color: "var(--color-accent-primary)",
              }}
            >
              {post.author ? post.author.charAt(0) : "F"}
            </div>
            <span
              className="text-[var(--text-base)] font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {post.author ?? "FundingWatch Research Team"}
            </span>
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

          {/* Author bio — stack on mobile */}
          <div
            className="mt-12 rounded-xl border border-[var(--color-border-default)] p-5 md:p-6"
            style={{ background: "var(--color-bg-surface)" }}
          >
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-mono text-xl font-medium"
                style={{
                  background: "var(--color-accent-muted)",
                  color: "var(--color-accent-primary)",
                }}
              >
                {post.author ? post.author.charAt(0) : "F"}
              </div>
              <div className="min-w-0">
                <p
                  className="text-base font-semibold md:text-[var(--text-base)]"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {post.author ?? "FundingWatch Research Team"}
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed md:text-[var(--text-sm)]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {post.authorBio ?? "Our team analyzes MCA contracts, regulatory actions, and borrower rights so small business owners have the facts they need to make informed decisions."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar ToC — sticky on desktop (only when we have headings) */}
        {post.headings && post.headings.length > 0 && (
          <aside
            className="hidden shrink-0 lg:block"
            style={{ width: "var(--sidebar-width)" }}
          >
            <div
              className="sticky top-20 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6"
              style={{ background: "var(--color-bg-surface)" }}
            >
              <h2
                className="text-[var(--text-xs)] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-accent-primary)" }}
              >
                Contents
              </h2>
              <ul className="mt-4 space-y-2">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="block border-l-2 border-transparent py-1 pl-3 text-[14px] transition hover:underline"
                      style={{
                        color: "var(--color-text-secondary)",
                        marginLeft: h.level === 3 ? 12 : 0,
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
      <Footer />
    </>
  );
}
