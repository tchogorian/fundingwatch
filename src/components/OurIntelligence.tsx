"use client";

import Link from "next/link";

const cards = [
  {
    barColor: "var(--blue)",
    catColor: "var(--blue)",
    category: "Lender Risk Index",
    title: "Lender Risk Index",
    body: "We rate every MCA lender on complaints, contract terms, litigation history, and transparency.",
    cta: "Browse the Index →",
    href: "/lender-risk-index",
  },
  {
    barColor: "var(--navy)",
    catColor: "var(--navy)",
    category: "Contract Analyzer",
    title: "Contract Analyzer",
    body: "Upload any MCA contract. Our AI extracts the real APR, flags hidden terms, and scores your lender in seconds — free.",
    cta: "Try It Free →",
    href: "/analyze",
  },
  {
    barColor: "var(--green)",
    catColor: "var(--green)",
    category: "Vetted Matching",
    title: "Vetted Lender Matching",
    body: "We match you with certified lenders based on your profile and the terms you deserve.",
    cta: "Get Matched →",
    href: "#application",
    scroll: true,
  },
];

export default function OurIntelligence() {
  const scrollToApplication = () => document.getElementById("application")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="how-it-works" className="border-b border-[var(--line)] py-11 px-6 md:px-8" style={{ background: "var(--bg)", fontFamily: "var(--font-sans)" }} aria-label="Our intelligence">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Our Intelligence</span>
        </div>
        <h2 className="mb-5 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          The engine behind every match
        </h2>
        <div className="grid border border-[var(--line)] md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="relative flex flex-col border-r border-[var(--line)] bg-white p-6 last:border-r-0"
            >
              <div className="absolute left-0 right-0 top-0 h-0.5" style={{ background: c.barColor }} />
              <div className="mt-3.5 mb-2 text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: c.catColor }}>{c.category}</div>
              <h3 className="mb-2 text-[14px] font-semibold leading-snug" style={{ color: "var(--navy)" }}>{c.title}</h3>
              <p className="mb-3.5 flex-1 text-[12.5px] font-light leading-[1.65]" style={{ color: "var(--muted)" }}>{c.body}</p>
              {c.scroll ? (
                <button type="button" onClick={scrollToApplication} className="text-[11.5px] font-semibold bg-transparent border-none cursor-pointer p-0 text-left" style={{ color: c.catColor }}>{c.cta}</button>
              ) : (
                <Link href={c.href} className="text-[11.5px] font-semibold no-underline" style={{ color: c.catColor }}>{c.cta}</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
