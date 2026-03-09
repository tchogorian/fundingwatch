"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import {
  BLOG_POSTS,
  getCategoryCounts,
  getPopularPosts,
  CATEGORY_LABELS,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blog";

const CATEGORIES: BlogCategory[] = [
  "mca-basics",
  "borrower-rights",
  "contract-analysis",
  "industry-news",
  "state-guides",
  "lender-profiles",
  "tools-resources",
  "case-studies",
];

const BLOG_CATEGORY_COLORS: Record<BlogCategory, string> = {
  "contract-analysis": "#FF3B5C",
  "mca-basics": "#2E75B6",
  "borrower-rights": "#2E7D32",
  "industry-news": "#E65100",
  "state-guides": "#5E35B1",
  "lender-profiles": "#6B7280",
  "tools-resources": "#56CF9E",
  "case-studies": "#FF7A45",
};

const POSTS_PER_PAGE = 9;

function BlogIndexSkeleton() {
  return (
    <>
      <section
        className="blog-hero relative overflow-hidden px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
        style={{
          backgroundColor: "#2E75B6",
        }}
        aria-label="Blog hero"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="h-10 w-3/4 max-w-[520px] rounded bg-white/20" />
          <div className="mt-4 h-5 w-full max-w-[640px] rounded bg-white/10" />
        </div>
      </section>
      <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-6 md:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="min-h-[260px] rounded-xl border border-[var(--color-border-default)] bg-white p-6 animate-pulse" />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

function BlogIndexContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") as BlogCategory | null;
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
      setPage(1);
    }
  }, [categoryFromUrl]);

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = useMemo(
    () =>
      filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    [filtered, page]
  );

  const counts = getCategoryCounts();
  const popular = getPopularPosts(5);
  const [expandedCategory, setExpandedCategory] = useState<BlogCategory | null>(null);
  const featuredPost = BLOG_POSTS[0];
  const restForFirstPage = BLOG_POSTS.slice(1, POSTS_PER_PAGE);
  const displayPosts =
    selectedCategory === "all" && page === 1
      ? restForFirstPage
      : paginated;

  return (
    <>
      {/* Hero — dark blue gradient matching homepage */}
      <section
        className="blog-hero relative overflow-hidden px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
        style={{
          backgroundColor: "#2E75B6",
        }}
        aria-label="Blog hero"
      >
        <div className="mx-auto max-w-[1180px]">
          <h1
            className="blog-hero-title text-[32px] font-extrabold leading-tight tracking-tight text-white md:text-[42px] lg:text-[52px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            MCA Intelligence. Built for Borrowers.
          </h1>
          <p className="blog-hero-sub mt-4 max-w-[640px] text-base text-white/90 md:text-lg lg:text-xl">
            Contract analysis, lender data, and borrower rights explained by people who have read the fine print.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:flex lg:gap-10">
        {/* Main content */}
        <div className="min-w-0 flex-1 lg:max-w-[calc(100%-320px)]">
          {/* Featured article — most recent */}
          {featuredPost && page === 1 && selectedCategory === "all" && (
            <section className="mb-10 md:mb-12" aria-label="Featured article">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="blog-featured-card group block overflow-hidden rounded-2xl border border-[var(--color-border-default)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                style={{ background: "#FFFFFF" }}
              >
                <div className="p-6 md:p-8 lg:p-10">
                  <span
                    className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wider"
                    style={{
                      background: `${BLOG_CATEGORY_COLORS[featuredPost.category]}20`,
                      color: BLOG_CATEGORY_COLORS[featuredPost.category],
                    }}
                  >
                    {CATEGORY_LABELS[featuredPost.category]}
                  </span>
                  <h2 className="mt-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl" style={{ color: "var(--color-text-primary)" }}>
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed md:text-lg" style={{ color: "var(--color-text-secondary)" }}>
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <span className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                      {featuredPost.readTimeMinutes} min read
                    </span>
                    <span
                      className="inline-flex w-full min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition group-hover:opacity-95 sm:w-auto"
                      style={{ background: "var(--accent-blue)" }}
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Mobile/tablet: horizontal category filter */}
          <div className="mb-6 overflow-x-auto pb-2 md:mb-8 lg:hidden" role="tablist">
            <div className="flex gap-2 min-w-max px-1">
              <button
                type="button"
                onClick={() => { setSelectedCategory("all"); setPage(1); }}
                className="blog-cat-pill shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition min-h-[48px]"
                style={
                  selectedCategory === "all"
                    ? { background: "var(--accent-blue)", color: "#fff", borderColor: "var(--accent-blue)" }
                    : { background: "#fff", color: "var(--color-text-secondary)", borderColor: "var(--color-border-default)" }
                }
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                  className="blog-cat-pill shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition min-h-[48px]"
                  style={
                    selectedCategory === cat
                      ? { background: BLOG_CATEGORY_COLORS[cat], color: "#fff", borderColor: BLOG_CATEGORY_COLORS[cat] }
                      : { background: "#fff", color: "var(--color-text-secondary)", borderColor: "var(--color-border-default)" }
                  }
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Article grid */}
          <section aria-label="Articles">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post) => (
                <BlogIndexCard key={post.slug} post={post} />
              ))}
            </div>
            {displayPosts.length === 0 && (
              <p className="py-12 text-center text-lg" style={{ color: "var(--color-text-secondary)" }}>
                No articles in this category.
              </p>
            )}

            {totalPages > 1 && (
              <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="min-h-[48px] min-w-[48px] rounded-lg border border-[var(--color-border-default)] px-4 text-sm font-medium transition disabled:opacity-40"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p: number;
                  if (totalPages <= 5) p = i + 1;
                  else if (page <= 3) p = i + 1;
                  else if (page >= totalPages - 2) p = totalPages - 4 + i;
                  else p = page - 2 + i;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`min-h-[48px] min-w-[48px] rounded-lg px-4 text-sm font-medium transition ${
                        p === page
                          ? "bg-[var(--color-accent-primary)] text-white"
                          : "border border-[var(--color-border-default)] hover:border-[var(--color-accent-primary)]"
                      }`}
                      style={p !== page ? { color: "var(--color-text-primary)" } : undefined}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="min-h-[48px] min-w-[48px] rounded-lg border border-[var(--color-border-default)] px-4 text-sm font-medium transition disabled:opacity-40"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Next
                </button>
              </nav>
            )}
          </section>

          {/* Mobile: Popular Articles below grid */}
          <section className="mt-12 block lg:hidden" aria-label="Popular articles">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent-primary)" }}>
              Popular Articles
            </h2>
            <ul className="mt-4 space-y-3">
              {popular.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="flex min-h-[48px] items-center gap-2 rounded-lg py-2 text-base transition hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <span className="line-clamp-2 flex-1">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar — desktop only */}
        <aside
          className="hidden w-[300px] shrink-0 lg:block"
          aria-label="Blog sidebar"
        >
          <div className="sticky top-24 space-y-8">
            <div
              className="rounded-xl border border-[var(--color-border-default)] p-6"
              style={{ background: "var(--color-bg-surface)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent-primary)" }}>
                Popular Articles
              </h2>
              <ul className="mt-4 space-y-3">
                {popular.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block text-sm leading-snug transition hover:underline line-clamp-2"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-xl border border-[var(--color-border-default)] p-6"
              style={{ background: "var(--color-bg-surface)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent-primary)" }}>
                Categories
              </h2>
              <ul className="mt-4 space-y-1">
                {CATEGORIES.map((cat) => {
                  const isExpanded = expandedCategory === cat;
                  const postsInCat = BLOG_POSTS.filter((p) => p.category === cat);
                  return (
                    <li key={cat} className="rounded-lg">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                          className="flex min-h-[44px] flex-1 items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition hover:bg-white/50"
                          style={{ color: "var(--color-text-secondary)" }}
                          aria-expanded={isExpanded}
                        >
                          <span className="flex items-center gap-1.5">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
                            ) : (
                              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                            )}
                            {CATEGORY_LABELS[cat]}
                          </span>
                          <span className="font-mono text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                            {counts[cat]}
                          </span>
                        </button>
                        <Link
                          href={`/blog?category=${cat}`}
                          className="min-h-[44px] shrink-0 px-2 py-2 text-sm font-medium transition hover:underline"
                          style={{ color: "var(--color-accent-primary)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View all
                        </Link>
                      </div>
                      {isExpanded && postsInCat.length > 0 && (
                        <ul className="ml-6 mt-1 space-y-1 border-l-2 border-[var(--color-border-default)] pl-3 pb-2">
                          {postsInCat.map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/blog/${p.slug}`}
                                className="block py-1.5 text-sm leading-snug transition hover:underline line-clamp-2"
                                style={{ color: "var(--color-text-secondary)" }}
                              >
                                {p.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              className="rounded-xl border border-[var(--color-border-default)] p-6"
              style={{ background: "var(--color-bg-surface)" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent-primary)" }}>
                Newsletter
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                MCA updates, regulatory changes, borrower rights.
              </p>
              <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="min-h-[48px] w-full rounded-lg border border-[var(--color-border-default)] bg-white px-4 py-2 text-sm outline-none focus:border-[var(--color-accent-primary)]"
                  style={{ color: "var(--color-text-primary)" }}
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="btn-primary mt-2 w-full min-h-[48px] py-3 text-sm font-semibold uppercase"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}

export default function BlogIndexPage() {
  return (
    <Suspense fallback={<BlogIndexSkeleton />}>
      <BlogIndexContent />
    </Suspense>
  );
}

function BlogIndexCard({ post }: { post: BlogPost }) {
  const color = BLOG_CATEGORY_COLORS[post.category];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card group flex min-h-[260px] flex-col rounded-xl border border-[var(--color-border-default)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:p-7"
      style={{ background: "#FFFFFF" }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider md:px-4 md:py-2 md:text-sm"
          style={{ background: `${color}20`, color }}
        >
          {CATEGORY_LABELS[post.category]}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug md:text-xl" style={{ color: "var(--color-text-primary)" }}>
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-secondary)" }}>
        {post.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between gap-2 text-sm" style={{ color: "var(--color-text-tertiary)" }}>
        <span>{post.readTimeMinutes} min read</span>
        <span className="font-medium transition group-hover:underline" style={{ color: "var(--color-accent-primary)" }}>
          Read →
        </span>
      </div>
    </Link>
  );
}
