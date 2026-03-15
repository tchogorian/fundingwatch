"use client";

import Link from "next/link";
import { Shield, FileSearch, Handshake } from "lucide-react";

const cards = [
  {
    title: "Lender Risk Index",
    icon: Shield,
    borderColor: "#1e5a8a",
    body: "Every MCA lender scored on six dimensions: complaint density, regulatory exposure, contract risk signals, litigation aggressiveness, transparency, and stacking behavior. Exposed in a public database anyone can search.",
    cta: "Browse the Index →",
    href: "/lender-risk-index",
  },
  {
    title: "Contract Analyzer",
    icon: FileSearch,
    borderColor: "#2a6a9e",
    body: "Upload any MCA contract or offer letter. Our system extracts the factor rate, calculates the real APR, flags missing reconciliation clauses, identifies confession of judgment language, and scores the lender — in seconds.",
    cta: "Analyze a Contract →",
    href: "/analyze",
  },
  {
    title: "Vetted Lender Matching",
    icon: Handshake,
    borderColor: "#22c55e",
    body: "Tell us about your business and we do the rest. We only route applications to lenders that passed our independent review — filtered by your revenue, industry, and funding needs.",
    cta: "Apply Now →",
    href: "#application",
    scroll: true,
  },
];

export default function OurIntelligence() {
  const scrollToApplication = () => {
    document.getElementById("application")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-[#f8fafb]" aria-label="Our intelligence">
      <div className="mx-auto max-w-[1100px]">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-center"
          style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          OUR INTELLIGENCE
        </p>
        <h2
          className="text-2xl md:text-3xl text-center mt-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
        >
          The engine behind every match
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {cards.map(({ title, icon: Icon, borderColor, body, cta, href, scroll }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-sm flex flex-col"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderTop: `3px solid ${borderColor}` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "#f0f7ff", color: borderColor }}>
                <Icon className="w-6 h-6" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}>
                {title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.65] flex-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}>
                {body}
              </p>
              {scroll ? (
                <button
                  type="button"
                  onClick={scrollToApplication}
                  className="mt-6 text-[14px] font-semibold text-left transition hover:opacity-80 bg-transparent border-0 cursor-pointer"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
                >
                  {cta}
                </button>
              ) : (
                <Link
                  href={href}
                  className="mt-6 text-[14px] font-semibold inline-block transition hover:opacity-80 no-underline"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
                >
                  {cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
