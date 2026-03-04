"use client";

import { TrendingUp, AlertTriangle, BarChart3, Search } from "lucide-react";
import FadeIn from "./FadeIn";

const features = [
  {
    icon: TrendingUp,
    title: "True APR Calculation",
    description:
      "We convert factor rates, fees, and payment schedules into a single APR number so you can compare apples to apples.",
  },
  {
    icon: AlertTriangle,
    title: "Red Flag Detection",
    description:
      "Our system identifies concerning clauses — confessions of judgment, personal guarantees, UCC liens, prepayment penalties, and missing reconciliation.",
  },
  {
    icon: BarChart3,
    title: "Risk Scoring",
    description:
      "Every contract gets a 0-100 risk score based on APR, contract terms, and lender practices — so you know at a glance how your deal stacks up.",
  },
  {
    icon: Search,
    title: "Lender Analysis",
    description:
      "We cross-reference your lender against public records, regulatory actions, and industry data to give you context on who you're dealing with.",
  },
];

export default function WhatYourReportIncludes() {
  return (
    <section className="section-white" aria-label="What your report includes">
      <div className="section-inner mx-auto max-w-[1280px] px-4 sm:px-6">
        <FadeIn>
          <p className="eyebrow text-center">YOUR ANALYSIS</p>
          <h2 className="mt-3 text-center" style={{ color: "var(--color-text-primary)" }}>
            Everything You Need to Understand Your Contract
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            Our system reads your contract the way a financial analyst would — then gives you the facts in plain English.
          </p>
        </FadeIn>

        <div className="mt-12 flex flex-col-reverse gap-12 lg:mt-16 lg:flex-row lg:items-start lg:gap-10">
          {/* Report mockup — left 55% */}
          <FadeIn delay={100} className="lg:order-2 lg:w-[55%]">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-[var(--shadow-sm)]" style={{ background: "#FFFFFF" }}>
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <div className="relative h-20 w-20">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80" aria-hidden>
                      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-bg-subtle)" strokeWidth="6" />
                      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-danger)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 * (1 - 0.78)} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      78
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>Sample MCA Co.</p>
                  <span className="badge badge-danger mt-1">147%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 rounded py-2 pl-3 text-sm" style={{ borderLeft: "3px solid var(--color-danger)", background: "var(--color-danger-muted)", color: "var(--color-text-secondary)" }}>
                    Confession of judgment
                  </div>
                  <div className="flex gap-2 rounded py-2 pl-3 text-sm" style={{ borderLeft: "3px solid var(--color-warning)", background: "var(--color-warning-muted)", color: "var(--color-text-secondary)" }}>
                    No reconciliation clause
                  </div>
                </div>
                <div className="rounded-[var(--radius-md)] border border-[var(--color-border-default)]" style={{ background: "#F8FAFC" }}>
                  <div className="flex justify-between border-b border-[var(--color-border-default)] px-4 py-2 text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>
                    <span>Factor rate</span>
                    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>1.45</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border-default)] px-4 py-2 text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>
                    <span>Payment</span>
                    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>Daily</span>
                  </div>
                  <div className="flex justify-between px-4 py-2 text-[var(--text-sm)]" style={{ color: "var(--color-text-secondary)" }}>
                    <span>Personal guarantee</span>
                    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Feature callouts — right 45% */}
          <div className="flex flex-col gap-4 lg:order-1 lg:w-[45%]">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={150 + i * 60}>
                <div className="rounded-[var(--radius-lg)] border-l-4 py-5 pl-5 pr-5 transition-shadow hover:shadow-[var(--shadow-md)]" style={{ borderLeftColor: "var(--color-accent-primary)", background: "#FFFFFF", borderColor: "var(--color-border-default)" }}>
                  <div className="flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center" style={{ color: "var(--color-accent-primary)" }}>
                      <f.icon className="h-6 w-6" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold" style={{ color: "var(--color-text-primary)" }}>
                        {f.title}
                      </h3>
                      <p className="mt-1 text-[16px] leading-[1.6]" style={{ color: "var(--color-text-secondary)" }}>
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
