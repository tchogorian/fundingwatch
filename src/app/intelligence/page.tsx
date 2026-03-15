"use client";

import Link from "next/link";

const articles = [
  {
    tag: "LENDER ANALYSIS",
    tagColor: "#1e5a8a",
    tagBg: "#e8f0f8",
    title: "We Analyzed 1,700+ Borrower Complaints. Here's What Separates a Responsible Lender from a Predatory One.",
    href: "/intelligence/borrower-complaints-analysis",
    date: "March 2026",
  },
  {
    tag: "INDUSTRY REPORT",
    tagColor: "#92400e",
    tagBg: "#fef3c7",
    title: "What 2,400+ UCC Filings Reveal About Who's Lending and Who's Getting Funded",
    href: "/intelligence/ucc-filing-analysis",
    date: "March 2026",
  },
  {
    tag: "BORROWER GUIDE",
    tagColor: "#166534",
    tagBg: "#dcfce7",
    title: "What Is a Factor Rate — And Why It's Not Your APR",
    href: "/intelligence/factor-rate-vs-apr",
    date: "March 2026",
  },
];

export default function IntelligencePage() {
  return (
    <main className="min-h-screen py-16 px-4" style={{ background: "#f8fafb" }}>
      <div className="mx-auto max-w-[720px]">
        <Link href="/" className="text-[13px] font-medium no-underline hover:opacity-80" style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans)" }}>
          ← Back to Debtura
        </Link>
        <h1 className="mt-8 text-[32px] md:text-[40px]" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}>
          Debtura Intelligence
        </h1>
        <p className="mt-3 text-[16px]" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}>
          Independent research on MCA lending — lender behavior, borrower outcomes, contract trends, and regulatory shifts.
        </p>
        <div className="mt-12 space-y-6">
          {articles.map(({ tag, tagColor, tagBg, title, href, date }) => (
            <Link
              key={href}
              href={href}
              className="block p-6 rounded-xl no-underline transition-shadow hover:shadow-md bg-white border border-[#f0f4f8]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full" style={{ color: tagColor, background: tagBg }}>
                {tag}
              </span>
              <h2 className="mt-3 text-[18px] font-semibold" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}>
                {title}
              </h2>
              <span className="text-[13px]" style={{ color: "#94a3b8" }}>{date}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
