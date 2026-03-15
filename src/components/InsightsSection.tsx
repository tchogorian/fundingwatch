"use client";

import Link from "next/link";
import Image from "next/image";

const latestInsights = [
  { date: "13 Mar 2026", title: "MCA Lender Risk: North America Outlook Q1 2026", href: "/intelligence" },
  { date: "10 Mar 2026", title: "Yellowstone Capital Downgraded to C Following Consent Order", href: "/intelligence" },
  { date: "5 Mar 2026", title: "Trucking Sector Alert: Predatory Stacking Patterns in 14 States", href: "/intelligence" },
  { date: "28 Feb 2026", title: "TX HB 700 Implementation: What Borrowers Need to Know", href: "/intelligence" },
  { date: "20 Feb 2026", title: "Reconciliation Failure as Legal Hook: 2025 Review", href: "/intelligence" },
];

export default function InsightsSection() {
  return (
    <section className="border-b border-[var(--line)] bg-white px-6 md:px-8" aria-label="Latest insights">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid border border-[var(--line)] md:grid-cols-[300px_minmax(0,1.4fr)_minmax(0,0.6fr)]">
          {/* Left: Latest Insights list */}
          <div className="border-b border-[var(--line)] p-5 pr-4 md:border-b-0 md:border-r">
            <h2 className="border-b border-[var(--line)] pb-2 text-[14px] font-bold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
              Latest Insights
            </h2>
            <div className="flex flex-col">
              {latestInsights.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-start justify-between gap-2 border-b border-[var(--line)] py-2.5 last:border-0"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <div>
                    <div className="text-[10.5px] font-light" style={{ color: "var(--faint)", marginBottom: 2 }}>{item.date}</div>
                    <div className="text-[12px] font-semibold leading-snug group-hover:text-[var(--red)] transition-colors" style={{ color: "var(--body)" }}>{item.title}</div>
                  </div>
                  <span className="shrink-0 text-[13px]" style={{ color: "var(--faint)" }}>›</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center: large featured image card */}
          <Link
            href="/intelligence"
            className="group flex flex-col border-r border-[var(--line)]"
          >
            <div className="h-[340px] shrink-0 relative overflow-hidden border-b border-[var(--line)]">
              <Image
                src="/images/insights-featured.png"
                alt="Shipping container port — global commerce and industry"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col p-5 pt-5 pb-6" style={{ fontFamily: "var(--font-sans)" }}>
              <div className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--red)", marginBottom: 8 }}>Research &amp; Analysis</div>
              <div className="text-[18px] font-semibold leading-snug group-hover:text-[var(--red)] transition-colors" style={{ color: "var(--body)", marginBottom: 10 }}>MCA Industry Report: The True Cost of Merchant Cash Advances in 2026</div>
              <div className="text-[13px] font-light leading-[1.65] flex-1" style={{ color: "var(--muted)", marginBottom: 12 }}>Our comprehensive analysis of 500+ MCA contracts reveals the hidden terms borrowers miss — and the lenders who exploit them.</div>
              <span className="text-[20px]" style={{ color: "var(--mid)" }}>→</span>
            </div>
          </Link>

          {/* Right: stacked text-only cards */}
          <div className="grid grid-rows-[1fr_1fr] border-t border-[var(--line)] md:border-t-0">
            <Link
              href="/lender-risk-index"
              className="group flex flex-col justify-center overflow-hidden border-b border-[var(--line)]"
            >
              <div className="flex flex-col px-5 py-6" style={{ fontFamily: "var(--font-sans)" }}>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--red)", marginBottom: 8 }}>Products &amp; Services</div>
                <div className="text-[15px] font-semibold leading-snug group-hover:text-[var(--red)] transition-colors" style={{ color: "var(--body)", marginBottom: 8 }}>Lender Risk Index</div>
                <div className="text-[12px] font-light leading-[1.6] flex-1" style={{ color: "var(--muted)", marginBottom: 10 }}>Our analyst-scored database of active MCA lenders. Search by state, score, and complaint history.</div>
                <span className="text-[18px]" style={{ color: "var(--mid)" }}>→</span>
              </div>
            </Link>
            <Link
              href="/intelligence"
              className="group flex flex-col justify-center overflow-hidden"
            >
              <div className="flex flex-col px-5 py-6" style={{ fontFamily: "var(--font-sans)" }}>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--red)", marginBottom: 8 }}>Featured Topic</div>
                <div className="text-[15px] font-semibold leading-snug group-hover:text-[var(--red)] transition-colors" style={{ color: "var(--body)", marginBottom: 8 }}>MCA Borrower Defense</div>
                <div className="text-[12px] font-light leading-[1.6] flex-1" style={{ color: "var(--muted)", marginBottom: 10 }}>How distressed borrowers are fighting back — and winning — against predatory MCA lenders.</div>
                <span className="text-[18px]" style={{ color: "var(--mid)" }}>→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
