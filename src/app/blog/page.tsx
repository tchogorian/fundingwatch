"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import {
  BLOG_POSTS,
  getCategoryCounts,
  getPopularPosts,
  CATEGORY_LABELS,
  type BlogCategory,
} from "@/lib/blog";

const CATEGORIES: BlogCategory[] = [
  "mca-basics",
  "borrower-rights",
  "lender-profiles",
  "industry-news",
  "contract-analysis",
  "state-guides",
  "tools-resources",
  "case-studies",
];

const POSTS_PER_PAGE = 9;

export default function BlogIndexPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return BLOG_POSTS;
    const q = search.toLowerCase();
    return BLOG_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        CATEGORY_LABELS[p.category].toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = useMemo(
    () =>
      filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    [filtered, page]
  );

  const counts = getCategoryCounts();
  const popular = getPopularPosts(5);

  return (
    <>
      {/* Hero */}
      <section
          className="py-20"
          style={{ background: "var(--color-bg-surface)" }}
        >
          <div className="mx-auto max-w-[var(--max-width-content)] px-4 sm:px-6">
            <p className="eyebrow text-center">THE MCA INTELLIGENCE HUB</p>
            <h1
              className="mt-3 text-center font-display text-3xl leading-tight md:text-4xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              Understand, Challenge, and Escape Predatory Lending
            </h1>
            <div className="mx-auto mt-8 flex max-w-[480px]">
              <label className="relative flex flex-1" htmlFor="blog-search">
                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: "var(--color-text-tertiary)" }}
                  aria-hidden
                />
                <input
                  id="blog-search"
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search 1,000+ articles..."
                  className="min-h-[48px] w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] py-3 pl-12 pr-4 text-[var(--text-base)] outline-none transition placeholder:opacity-70 focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-30"
                  style={{ color: "var(--color-text-primary)" }}
                  aria-label="Search articles"
                />
              </label>
            </div>
          </div>
        </section>

        <div
          className="mx-auto flex max-w-[1008px] flex-col gap-10 py-12 lg:flex-row lg:gap-12"
          style={{ maxWidth: "1008px" }}
        >
          {/* Main content — articles */}
          <div className="min-w-0 flex-1 px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            {paginated.length === 0 && (
              <p
                className="py-12 text-center text-[var(--text-lg)]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No articles match your search.
              </p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-12 flex justify-center gap-2"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="min-h-[44px] min-w-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 text-[var(--text-sm)] font-medium transition disabled:opacity-40"
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
                      className={`min-h-[44px] min-w-[44px] rounded-[var(--radius-md)] px-4 text-[var(--text-sm)] font-medium transition ${
                        p === page
                          ? "bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]"
                          : "border border-[var(--color-border-strong)] hover:border-[var(--color-accent-border)]"
                      }`}
                      style={
                        p !== page
                          ? { color: "var(--color-text-primary)" }
                          : undefined
                      }
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="min-h-[44px] min-w-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 text-[var(--text-sm)] font-medium transition disabled:opacity-40"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Next
                </button>
              </nav>
            )}
          </div>

          {/* Sidebar — 280px */}
          <aside
            className="w-full shrink-0 px-4 sm:px-6 lg:w-[280px] lg:px-0"
            aria-label="Blog sidebar"
          >
            <div className="space-y-8">
              {/* Popular Articles */}
              <div
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6"
                style={{ background: "var(--color-bg-surface)" }}
              >
                <h2
                  className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  Popular Articles
                </h2>
                <ul className="mt-4 space-y-3">
                  {popular.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-[14px] leading-snug transition hover:underline"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {p.title}
                      </Link>
                      {p.readCount != null && (
                        <span
                          className="ml-2 font-mono text-[var(--text-xs)]"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {p.readCount >= 1000
                            ? `${(p.readCount / 1000).toFixed(1)}k`
                            : p.readCount}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6"
                style={{ background: "var(--color-bg-surface)" }}
              >
                <h2
                  className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  Categories
                </h2>
                <ul className="mt-4 space-y-2">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/blog?category=${cat}`}
                        className="flex items-center justify-between text-[14px] transition hover:underline"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {CATEGORY_LABELS[cat]}
                        <span
                          className="font-mono text-[var(--text-xs)]"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {counts[cat]}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter — compact */}
              <div
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6"
                style={{ background: "var(--color-bg-surface)" }}
              >
                <h2
                  className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  Newsletter
                </h2>
                <p
                  className="mt-2 text-[var(--text-sm)]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  MCA updates, regulatory changes, borrower rights.
                </p>
                <form
                  className="mt-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="min-h-[40px] w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-3 py-2 text-[var(--text-sm)] outline-none focus:border-[var(--color-accent-primary)]"
                    style={{ color: "var(--color-text-primary)" }}
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="btn-primary mt-2 w-full py-2 text-[13px] uppercase"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Featured Tool — APR Calculator mini */}
              <div
                className="rounded-[var(--radius-lg)] border border-[var(--color-accent-border)] p-6"
                style={{ background: "var(--color-accent-muted)" }}
              >
                <h2
                  className="text-[var(--text-sm)] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  Featured Tool
                </h2>
                <p
                  className="mt-2 text-[14px]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  See what your MCA really costs in real APR.
                </p>
                <Link
                  href="/apr-calculator"
                  className="btn-primary mt-4 inline-flex w-full justify-center py-2.5 text-[13px]"
                >
                  APR Calculator →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      <Footer />
    </>
  );
}
