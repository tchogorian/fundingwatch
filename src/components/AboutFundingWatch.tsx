"use client";

import { Shield } from "lucide-react";
import FadeIn from "./FadeIn";

const stats = [
  { value: "$12B+", label: "Annual MCA Market" },
  { value: "100K+", label: "Borrowers Per Year" },
  { value: "40-350%", label: "Typical APR Range" },
];

export default function AboutFundingWatch() {
  return (
    <section id="about" className="section-card" aria-label="About FundingWatch">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn className="lg:order-1">
            <div className="mission-block rounded-2xl border border-[var(--border-light)] bg-[var(--bg-light)] p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] md:p-10">
              <p className="eyebrow">OUR MISSION</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                Transparency for Every Business Owner
              </h2>
              <div className="mt-6 max-w-[520px] space-y-6 text-[var(--text-base)] leading-[1.8]" style={{ color: "var(--color-text-primary)" }}>
              <p>
                The merchant cash advance industry processes over $12 billion every year. For many small businesses, an MCA is the fastest — sometimes the only — way to access working capital. But speed comes at a cost that most borrowers never fully understand.
              </p>
              <p>
                Factor rates sound simple. A rate of 1.3 doesn&apos;t sound alarming. But when you convert that to an annual percentage rate, the number can be shocking — 80%, 150%, sometimes over 300%. And buried in the fine print are clauses that can freeze your bank account, seize your assets, and leave you with no legal recourse.
              </p>
              <p>
                FundingWatch exists to fix this. We built the FundingWatch scanner that reads your contract the way a financial analyst would — and translates the complexity into plain English. No jargon, no sales pitch, no cost. Just the facts about what you signed and what it really means for your business.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-[32px] font-semibold" style={{ color: "var(--color-accent-primary)" }}>{s.value}</p>
                  <p className="mt-1 text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>{s.label}</p>
                </div>
              ))}
            </div>
            </div>
          </FadeIn>
          <FadeIn delay={100} className="relative hidden lg:order-2 lg:block">
            <div className="flex justify-center">
              <div className="h-64 w-64 rounded-full opacity-[0.08]" style={{ background: "radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)" }} />
              <Shield className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 opacity-20" style={{ color: "var(--color-accent-primary)" }} aria-hidden />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
