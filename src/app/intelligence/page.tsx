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
    <main className="min-h-screen py-16 px-6 md:px-8" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-[720px]">
        <Link href="/" className="text-[13px] font-medium no-underline hover:opacity-80" style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}>
          ← Back to Debtura
        </Link>
        <div className="mt-8 mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Research</span>
        </div>
        <h1 className="text-[32px] md:text-[40px]" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontWeight: 600 }}>
          Debtura Intelligence
        </h1>
        <p className="mt-3 text-[16px]" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
          Independent research on MCA lending — lender behavior, borrower outcomes, contract trends, and regulatory shifts.
        </p>
        <div className="mt-12 space-y-0 border border-[var(--line)]">
          {articles.map(({ tag, tagColor, tagBg, title, href, date }, i) => (
            <Link
              key={href}
              href={href}
              className="block p-6 no-underline transition-colors hover:bg-[var(--bg)] border-b border-[var(--line)] last:border-b-0 relative bg-white"
            >
              <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: tagColor }} />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--red)" }}>
                {tag}
              </span>
              <h2 className="mt-2 text-[18px] font-semibold" style={{ fontFamily: "var(--font-sans)", color: "var(--body)" }}>
                {title}
              </h2>
              <span className="text-[13px]" style={{ color: "var(--muted)" }}>{date}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
