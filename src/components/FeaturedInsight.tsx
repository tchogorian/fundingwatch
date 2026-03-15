"use client";

import Link from "next/link";

const articles = [
  {
    tag: "LENDER ANALYSIS",
    tagColor: "#1e5a8a",
    tagBg: "#e8f0f8",
    title: "We Analyzed 1,700+ Borrower Complaints. Here's What Separates a Responsible Lender from a Predatory One.",
    excerpt: "Brokers — not lenders — are the #1 source of borrower frustration. Trucking, restaurants, and construction are the most affected industries.",
    href: "/intelligence/borrower-complaints-analysis",
    date: "March 2026",
  },
  {
    tag: "INDUSTRY REPORT",
    tagColor: "#92400e",
    tagBg: "#fef3c7",
    title: "What 2,400+ UCC Filings Reveal About Who's Lending and Who's Getting Funded",
    excerpt: "A state-by-state breakdown of MCA filing volume, top filers, and what filing patterns tell us about lender behavior.",
    href: "/intelligence/ucc-filing-analysis",
    date: "March 2026",
  },
  {
    tag: "BORROWER GUIDE",
    tagColor: "#166534",
    tagBg: "#dcfce7",
    title: "What Is a Factor Rate — And Why It's Not Your APR",
    excerpt: "The number your broker quoted you isn't what you think. Here's how to calculate what you're actually paying.",
    href: "/intelligence/factor-rate-vs-apr",
    date: "March 2026",
  },
];

export default function FeaturedInsight() {
  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f4f8" }} aria-label="Debtura Intelligence">
      <div className="mx-auto max-w-[1100px]">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-center"
          style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          DEBTURA INTELLIGENCE
        </p>
        <h2
          className="text-2xl md:text-3xl text-center mt-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
        >
          Research & Analysis
        </h2>
        <p
          className="text-center mt-3 text-[15px] max-w-[560px] mx-auto"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#94a3b8" }}
        >
          Independent research on MCA lending — lender behavior, borrower outcomes,
          contract trends, and regulatory shifts.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {articles.map(({ tag, tagColor, tagBg, title, excerpt, href, date }) => (
            <Link
              key={title}
              href={href}
              className="group bg-white rounded-2xl p-7 flex flex-col no-underline transition-shadow hover:shadow-md"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #f0f4f8" }}
            >
              <span
                className="inline-block self-start text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
                style={{ color: tagColor, background: tagBg }}
              >
                {tag}
              </span>
              <h3
                className="text-[17px] leading-[1.35] font-semibold group-hover:opacity-80 transition-opacity"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
              >
                {title}
              </h3>
              <p
                className="mt-3 text-[14px] leading-[1.6] flex-1 line-clamp-3"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#94a3b8" }}
              >
                {excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span
                  className="text-[13px] font-semibold group-hover:opacity-80 transition-opacity"
                  style={{ color: "#1e5a8a", fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  Read →
                </span>
                <span className="text-[12px]" style={{ color: "#c8cfd8", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  {date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/intelligence"
            className="text-[14px] font-semibold no-underline hover:opacity-80 transition-opacity"
            style={{ color: "#1e5a8a", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            View All Research →
          </Link>
        </div>
      </div>
    </section>
  );
}
