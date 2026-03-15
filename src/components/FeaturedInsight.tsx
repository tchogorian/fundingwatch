"use client";

import Link from "next/link";

const featured = {
  label: "LATEST RESEARCH",
  title: "We Analyzed 1,700+ Borrower Complaints. Here's What Separates a Responsible Lender from a Predatory One.",
  excerpt: "We scraped and categorized thousands of borrower posts from Reddit and DailyFunder — then mapped complaints to specific lenders and deal structures. The data reveals clear patterns: brokers and stacking dominate the complaint landscape, while lender behavior splits into two distinct clusters. Here's how we tell them apart.",
  href: "/blog", // Replace with actual article slug when published
};

export default function FeaturedInsight() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#f0f4f8]" aria-label="Featured insight">
      <div className="mx-auto max-w-[1100px] grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {featured.label}
          </p>
          <h2
            className="text-[28px] leading-[1.25] mt-2"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
          >
            {featured.title}
          </h2>
          <p
            className="mt-6 text-[15px] leading-[1.7]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
          >
            {featured.excerpt}
          </p>
          <Link
            href={featured.href}
            className="inline-block mt-6 text-[14px] font-semibold transition hover:opacity-80 no-underline"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
          >
            Read the Full Report →
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[200px] rounded-xl bg-white/60 border border-[#e2e8f0]">
          <span className="text-[13px] text-[#94a3b8]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Data graphic / visual placeholder
          </span>
        </div>
      </div>
    </section>
  );
}
