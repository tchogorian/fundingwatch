"use client";

import { UploadCloud, Sparkles, FileCheck2, Clock } from "lucide-react";
import FadeIn from "./FadeIn";

const steps = [
  {
    number: 1,
    title: "Upload",
    description: "Drop your MCA contract (PDF or photo). Takes 10 seconds.",
    Icon: UploadCloud,
  },
  {
    number: 2,
    title: "Our Engine Analyzes",
    description:
      "Our system extracts every term, calculates your real APR, and checks for red flags.",
    Icon: Sparkles,
  },
  {
    number: 3,
    title: "See Your Report",
    description:
      "Plain English breakdown of what's in your contract. No jargon, no cost.",
    Icon: FileCheck2,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-dark-grad reveal"
      aria-label="How it works"
    >
      <div className="section-inner mx-auto max-w-[1280px] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center" style={{ color: "var(--accent-cyan)" }}>HOW IT WORKS</p>
          <h2 className="mt-3 text-center text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-tight tracking-tight" style={{ color: "var(--on-dark-1)" }}>
            Three Steps to Contract Clarity
          </h2>
        </FadeIn>
        <div className="mt-16 flex flex-col items-stretch gap-12 sm:flex-row sm:justify-between sm:gap-6">
          {steps.map(({ number, title, description, Icon }, i) => (
            <FadeIn key={number} delay={i * 150}>
              <div className="relative flex flex-1 flex-col items-center text-center">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[20px] font-medium"
                  style={{
                    borderColor: "var(--color-accent-primary)",
                    color: "var(--color-accent-primary)",
                  }}
                >
                  {number}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="absolute -bottom-6 left-1/2 h-8 w-px border-l-2 border-dashed sm:-right-4 sm:top-9 sm:left-auto sm:h-0 sm:w-24 sm:border-t-2 sm:border-l-0"
                    style={{ borderColor: "var(--color-border-strong)" }}
                  />
                )}
                <div className="mt-8 w-full rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 transition-shadow hover:shadow-[var(--shadow-md)]" style={{ background: "var(--color-bg-surface)" }}>
                  <div
                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]"
                    style={{ background: "var(--color-accent-muted)", color: "var(--color-accent-primary)" }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3
                    className="mt-4 text-[16px] font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={300}>
          <div
            className="mt-10 flex cursor-default items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[var(--text-sm)]"
            style={{
              borderColor: "var(--color-accent-border)",
              color: "var(--color-accent-primary)",
              background: "var(--color-bg-elevated)",
            }}
          >
            <Clock className="h-4 w-4" aria-hidden />
            Average analysis time: under 30 seconds
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
