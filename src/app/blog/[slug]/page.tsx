import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
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
      <article className="mx-auto max-w-[1008px] px-4 py-12 sm:px-6 lg:flex lg:gap-12">
        {/* Main column — max-width 680px */}
        <div className="min-w-0 flex-1 lg:max-w-[var(--max-width-text)]">
          {/* Breadcrumb */}
          <nav
            className="text-[var(--text-sm)]"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="transition hover:underline">Blog</Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--color-text-primary)" }}>
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--color-text-tertiary)" }}>{post.title}</span>
          </nav>

          <span
            className={`mt-4 inline-block ${badgeClass}`}
            style={badgeStyle}
          >
            {CATEGORY_LABELS[post.category]}
          </span>

          <h1
            className="mt-4 font-display text-3xl leading-tight md:text-[3rem]"
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
              F
            </div>
            <span
              className="text-[var(--text-base)] font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              FundingWatch Research Team
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

          {/* Table of Contents — visible on mobile only */}
          {post.headings && post.headings.length > 0 && (
            <aside
              className="mb-8 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 lg:mb-0 lg:hidden"
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
                      className="text-[14px] transition hover:underline"
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
            </aside>
          )}

          {/* Body */}
          <div
            className="article-prose mt-8"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Mid-article style CTA — one after content */}
          <div
            className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-accent-border)] p-6 md:p-7"
            style={{ background: "var(--color-bg-elevated)" }}
          >
            <div>
              <p
                className="flex items-center gap-2 text-[var(--text-lg)] font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                <Shield className="h-5 w-5" style={{ color: "var(--color-accent-primary)" }} aria-hidden />
                Does Your Contract Have These Red Flags?
              </p>
              <p
                className="mt-1 text-[var(--text-base)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Upload it free — get your full analysis in under 30 seconds.
              </p>
            </div>
            <Link
              href="/#upload"
              className="btn-primary inline-flex shrink-0 items-center gap-2"
            >
              Analyze Free
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2
                className="text-xl font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Related Articles
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}

          {/* Author bio */}
          <div
            className="mt-12 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6"
            style={{ background: "var(--color-bg-surface)" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-mono text-xl font-medium"
                style={{
                  background: "var(--color-accent-muted)",
                  color: "var(--color-accent-primary)",
                }}
              >
                F
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  FundingWatch Research Team
                </p>
                <p
                  className="mt-1 text-[var(--text-sm)] leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Our team analyzes MCA contracts, regulatory actions, and borrower rights so small business owners have the facts they need to make informed decisions.
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
      <Footer />
    </>
  );
}
