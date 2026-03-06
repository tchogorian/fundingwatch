"use client";

import { TrendingUp, AlertTriangle, BarChart3, Search } from "lucide-react";
import FadeIn from "./FadeIn";

const scanFinds = [
  "Estimated APR",
  "Hidden default triggers",
  "Confession of judgment clauses",
  "Stacking and renewal traps",
];

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
    <section className="section-card" aria-label="What your report includes">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Contract Scan Finds — dark block, amber ⚠, white text */}
        <div className="section-dark rounded-2xl px-6 py-8 sm:px-8 sm:py-10" style={{ marginBottom: "3rem" }}>
          <FadeIn>
            <h2 className="section-heading text-center" style={{ color: "#FFFFFF" }}>
              Contract Scan Finds:
            </h2>
            <ul className="mx-auto mt-8 max-w-[560px] space-y-4 text-lg font-medium" style={{ color: "#FFFFFF" }}>
              {scanFinds.map((label, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="shrink-0 text-xl" style={{ color: "#F59E0B" }} aria-hidden>⚠</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn>
          <p className="eyebrow text-center">YOUR ANALYSIS</p>
          <h2 className="section-heading text-center" style={{ color: "var(--color-text-primary)" }}>
            Everything You Need to Understand Your Contract
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-[var(--text-base)]" style={{ color: "var(--color-text-secondary)" }}>
            Our system reads your contract the way a financial analyst would — then gives you the facts in plain English.
          </p>
        </FadeIn>

        <div className="mt-12 flex flex-col-reverse gap-12 lg:mt-16 lg:flex-row lg:items-start lg:gap-10">
          {/* Report mockup — left 55% */}
          <FadeIn delay={100} className="lg:order-2 lg:w-[55%]">
            <div className="report-mockup-card rounded-2xl border border-[var(--color-border-default)] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]" style={{ background: "#FFFFFF" }}>
              {/* Header: company + risk score */}
              <div className="flex items-center justify-between border-b border-[var(--color-border-default)] px-5 py-4" style={{ background: "#FAFBFC" }}>
                <p className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>Sample MCA Co.</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>Risk</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold" style={{ background: "var(--color-danger-muted)", color: "var(--danger)" }}>78</div>
                </div>
              </div>
              <div className="p-5 space-y-5">
                {/* Actual APR — one clear row */}
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>ACTUAL APR</span>
                  <span className="font-mono text-xl font-bold" style={{ color: "var(--danger)" }}>147%</span>
                </div>
                {/* Red flags — compact list */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-tertiary)" }}>Red flags</p>
                  <ul className="space-y-1.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--danger)" }} aria-hidden />
                      Confession of judgment
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--warning)" }} aria-hidden />
                      No reconciliation clause
                    </li>
                  </ul>
                </div>
                {/* Terms */}
                <div className="rounded-lg border border-[var(--color-border-default)] overflow-hidden" style={{ background: "#F8FAFC" }}>
                  <div className="flex justify-between px-4 py-2.5 text-sm border-b border-[var(--color-border-default)]">
                    <span style={{ color: "var(--color-text-secondary)" }}>Factor rate</span>
                    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>1.45</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm border-b border-[var(--color-border-default)]">
                    <span style={{ color: "var(--color-text-secondary)" }}>Payment</span>
                    <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>Daily</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span style={{ color: "var(--color-text-secondary)" }}>Personal guarantee</span>
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
                <div className="rounded-[var(--radius-lg)] border-l-4 border-[var(--color-border-default)] py-5 pl-5 pr-5 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]" style={{ borderLeftColor: "var(--color-accent-primary)", background: "#FFFFFF", borderColor: "var(--color-border-default)" }}>
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
