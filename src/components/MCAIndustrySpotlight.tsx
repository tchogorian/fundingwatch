"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

const cards = [
  {
    date: "November 2023",
    title: "New York's Landmark MCA Settlement Signals Industry Shift",
    summary:
      "A major MCA provider agreed to a $534 million settlement over allegations of deceptive lending practices. The case highlighted widespread issues with undisclosed fees, inflated factor rates, and aggressive collection tactics targeting small businesses.",
  },
  {
    date: "January 2024",
    title: "California Enacts MCA Disclosure Requirements",
    summary:
      "California's Department of Financial Protection and Innovation now requires MCA providers to disclose the equivalent annual percentage rate before funding. Providers must present total cost comparisons in standardized formats, giving borrowers clear information for the first time.",
  },
  {
    date: "September 2025",
    title: "Texas Transparency Law Takes Effect",
    summary:
      "Texas HB 700 requires MCA providers to register with the OCCC and meet new disclosure requirements. The law establishes transparency standards for commercial financing, joining a growing number of states regulating the MCA industry.",
  },
];

export default function MCAIndustrySpotlight() {
  return (
    <section className="section-dark" aria-label="Industry news">
      <div className="section-inner mx-auto max-w-[1280px] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center text-[var(--accent-cyan)] font-semibold tracking-widest">INDUSTRY NEWS</p>
          <h2 className="section-title text-center mt-2" style={{ color: "var(--on-dark-1)" }}>
            What&apos;s Happening in the MCA Industry
          </h2>
          <p className="mt-4 text-center text-[var(--text-base)]" style={{ color: "var(--on-dark-2)" }}>
            Recent legal developments and regulatory actions affecting MCA borrowers.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
          {cards.map((card, i) => {
            const variants = ["spotlight-card--blue", "spotlight-card--purple", "spotlight-card--teal"];
            return (
            <FadeIn key={card.title} delay={i * 80}>
              <article className={`plaid-box ${variants[i]} h-full flex flex-col`}>
                <p className="spotlight-date text-[13px] font-mono font-medium" style={{ color: "var(--on-light-3)" }}>{card.date}</p>
                <h3 className="mt-2 text-[18px] font-semibold leading-snug" style={{ color: "var(--on-light-1)" }}>
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.5]" style={{ color: "var(--on-light-2)" }}>
                  {card.summary}
                </p>
                <Link
                  href="/blog"
                  className="spotlight-link mt-4 inline-block text-[15px] font-semibold transition-colors hover:underline"
                >
                  Read More →
                </Link>
              </article>
            </FadeIn>
          );
          })}
        </div>
      </div>
    </section>
  );
}
