"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BLOG_POSTS, type BlogCategory } from "@/lib/blog";

const FILTER_TABS = ["ALL", "LENDER REVIEW", "BORROWER GUIDE", "INDUSTRY REPORT", "REGULATORY"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const CATEGORY_TO_FILTER: Record<BlogCategory, FilterTab> = {
  "lender-profiles": "LENDER REVIEW",
  "borrower-rights": "BORROWER GUIDE",
  "mca-basics": "BORROWER GUIDE",
  "tools-resources": "BORROWER GUIDE",
  "industry-news": "INDUSTRY REPORT",
  "case-studies": "INDUSTRY REPORT",
  "contract-analysis": "REGULATORY",
  "state-guides": "REGULATORY",
};

const FILTER_BAR_COLOR: Record<FilterTab, string> = {
  ALL: "var(--red)",
  "LENDER REVIEW": "var(--blue)",
  "BORROWER GUIDE": "var(--green)",
  "INDUSTRY REPORT": "var(--navy)",
  REGULATORY: "var(--red)",
};

function getBarColorForPost(category: BlogCategory): string {
  return FILTER_BAR_COLOR[CATEGORY_TO_FILTER[category]];
}

export default function IntelligencePage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");

  const { featured, gridArticles } = useMemo(() => {
    const sorted = [...BLOG_POSTS].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const [first, ...rest] = sorted;
    return { featured: first ?? null, gridArticles: rest };
  }, []);

  const filteredGrid = useMemo(() => {
    if (activeTab === "ALL") return gridArticles;
    return gridArticles.filter((post) => CATEGORY_TO_FILTER[post.category] === activeTab);
  }, [activeTab, gridArticles]);

  return (
    <main className="min-h-screen py-12 px-6 md:px-8" style={{ background: "var(--bg)", fontFamily: "var(--font-sans)" }}>
      <div className="mx-auto max-w-[1160px]">
        {/* Section label */}
        <div className="mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>
            Research
          </span>
        </div>
        <h1 className="text-[28px] md:text-[34px]" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontWeight: 600 }}>
          Debtura Intelligence
        </h1>
        <p className="mt-2 text-[15px]" style={{ color: "var(--muted)" }}>
          Independent research on MCA lending — lender behavior, borrower outcomes, contract trends, and regulatory shifts.
        </p>

        {/* Featured article hero — newest */}
        {featured && (
          <Link
            href={`/intelligence/${featured.slug}`}
            className="group mt-10 block border border-[var(--line)] bg-white no-underline"
          >
            <div className="h-[3px] w-full shrink-0" style={{ background: getBarColorForPost(featured.category) }} />
            <div className="p-6 md:p-8">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: getBarColorForPost(featured.category) }}
              >
                {CATEGORY_TO_FILTER[featured.category]}
              </span>
              <h2
                className="mt-2 text-[22px] md:text-[26px] font-semibold leading-tight transition-colors group-hover:text-[var(--red)]"
                style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
              >
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-3 text-[15px] leading-[1.6] line-clamp-2" style={{ color: "var(--muted)" }}>
                  {featured.excerpt}
                </p>
              )}
              <span className="mt-4 block text-[13px]" style={{ color: "var(--muted)" }}>
                {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </Link>
        )}

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-1 border-b border-[var(--line)]">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider border-b-2 -mb-px transition-colors"
              style={{
                color: activeTab === tab ? "var(--navy)" : "var(--muted)",
                borderColor: activeTab === tab ? "var(--navy)" : "transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Article grid — 3 columns, 3px top bar per card */}
        <div className="mt-6 grid gap-0 border border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-r-0 sm:[&>*]:border-r sm:[&>*:nth-child(2n)]:border-r-0 lg:[&>*:nth-child(3n)]:border-r-0">
          {filteredGrid.map((post) => {
            const barColor = getBarColorForPost(post.category);
            const dateFormatted = new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            return (
              <Link
                key={post.slug}
                href={`/intelligence/${post.slug}`}
                className="group relative flex flex-col border-b border-[var(--line)] bg-white p-5 no-underline last:border-b-0"
              >
                <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: barColor }} />
                <span
                  className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: barColor }}
                >
                  {CATEGORY_TO_FILTER[post.category]}
                </span>
                <h3
                  className="mt-2 text-[16px] font-semibold leading-snug transition-colors group-hover:text-[var(--red)]"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
                >
                  {post.title}
                </h3>
                <span className="mt-2 block text-[12px]" style={{ color: "var(--muted)" }}>
                  {dateFormatted}
                </span>
              </Link>
            );
          })}
        </div>

        {filteredGrid.length === 0 && (
          <p className="mt-8 text-center text-[14px]" style={{ color: "var(--muted)" }}>
            No articles in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
