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
    <section
      id="about"
      className="bg-primary py-section-y-mobile sm:py-section-y"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn className="lg:order-1">
            <p className="text-eyebrow font-semibold uppercase tracking-widest text-accent">
              OUR MISSION
            </p>
            <h2 className="mt-3 text-[36px] font-semibold leading-tight text-dark-text">
              Transparency for Every Business Owner
            </h2>
            <div className="mt-6 max-w-[520px] space-y-6 text-body leading-[1.8] text-dark-text">
              <p>
                The merchant cash advance industry processes over $12 billion every year. For many small businesses, an MCA is the fastest — sometimes the only — way to access working capital. But speed comes at a cost that most borrowers never fully understand.
              </p>
              <p>
                Factor rates sound simple. A rate of 1.3 doesn&apos;t sound alarming. But when you convert that to an annual percentage rate, the number can be shocking — 80%, 150%, sometimes over 300%. And buried in the fine print are clauses that can freeze your bank account, seize your assets, and leave you with no legal recourse.
              </p>
              <p>
                FundingWatch exists to fix this. We built an AI-powered tool that reads your contract the way a financial analyst would — and translates the complexity into plain English. No jargon, no sales pitch, no cost. Just the facts about what you signed and what it really means for your business.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[32px] font-bold text-accent">{s.value}</p>
                  <p className="mt-1 text-small text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={100} className="relative hidden lg:order-2 lg:block">
            <div className="flex justify-center">
              <div
                className="h-64 w-64 rounded-full opacity-[0.06]"
                style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
              />
              <Shield className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 text-accent opacity-20" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
