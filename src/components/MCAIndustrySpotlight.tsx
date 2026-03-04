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
    <section className="py-16 md:py-24" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto max-w-[var(--max-width-content)] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center">INDUSTRY NEWS</p>
          <h2 className="mt-3 text-center" style={{ color: "var(--color-text-primary)" }}>
            What&apos;s Happening in the MCA Industry
          </h2>
          <p className="mt-4 text-center text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            Recent legal developments and regulatory actions affecting MCA borrowers.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <article className="card flex cursor-default flex-col p-6 transition-all duration-200 hover:-translate-y-1">
                <p className="text-[var(--text-sm)] font-mono" style={{ color: "var(--color-text-secondary)" }}>{card.date}</p>
                <h3 className="mt-2 text-[18px] font-semibold leading-snug" style={{ color: "var(--color-text-primary)" }}>
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.5]" style={{ color: "var(--color-text-secondary)" }}>
                  {card.summary}
                </p>
                <Link
                  href="/blog"
                  className="mt-4 text-[15px] font-medium transition-colors hover:underline"
                  style={{ color: "var(--color-accent-primary)" }}
                >
                  Read More →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
