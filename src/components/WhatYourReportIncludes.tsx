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
      "Our AI identifies concerning clauses — confessions of judgment, personal guarantees, UCC liens, prepayment penalties, and missing reconciliation.",
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
    <section className="bg-primary py-section-y-mobile sm:py-section-y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-eyebrow font-semibold uppercase tracking-widest text-accent">
            YOUR ANALYSIS
          </p>
          <h2 className="mt-3 text-center text-section-mobile font-semibold text-dark-text sm:text-section-desktop">
            Everything You Need to Understand Your Contract
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-body text-muted">
            Our AI reads your contract the way a financial analyst would — then gives you the facts in plain English.
          </p>
        </FadeIn>

        <div className="mt-12 flex flex-col-reverse gap-12 lg:mt-16 lg:flex-row lg:items-start lg:gap-10">
          {/* Report mockup — left 55% */}
          <FadeIn delay={100} className="lg:order-2 lg:w-[55%]">
            <div className="rounded-card border border-border bg-secondary-bg p-6 shadow-card">
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <div className="relative h-20 w-20">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="6"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32 * (1 - 0.78)}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-dark-text">
                      78
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-small text-muted">Sample MCA Co.</p>
                  <span className="mt-1 inline-block rounded-button bg-danger/10 px-2.5 py-1 text-sm font-semibold text-danger">
                    147%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 border-l-4 border-danger/50 bg-danger/5 py-2 pl-3 text-sm text-muted">
                    Confession of judgment
                  </div>
                  <div className="flex gap-2 border-l-4 border-warning/50 bg-warning/5 py-2 pl-3 text-sm text-muted">
                    No reconciliation clause
                  </div>
                </div>
                <div className="rounded-input border border-border bg-primary">
                  <div className="flex justify-between border-b border-border px-4 py-2 text-small text-muted">
                    <span>Factor rate</span>
                    <span className="font-medium text-dark-text">1.45</span>
                  </div>
                  <div className="flex justify-between border-b border-border px-4 py-2 text-small text-muted">
                    <span>Payment</span>
                    <span className="font-medium text-dark-text">Daily</span>
                  </div>
                  <div className="flex justify-between px-4 py-2 text-small text-muted">
                    <span>Personal guarantee</span>
                    <span className="font-medium text-dark-text">Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Feature callouts — right 45% */}
          <div className="flex flex-col gap-4 lg:order-1 lg:w-[45%]">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={150 + i * 60}>
                <div className="rounded-card border-l-[3px] border-accent bg-primary py-5 pl-5 pr-5 shadow-card transition-shadow hover:shadow-card-hover">
                  <div className="flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center text-accent">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-dark-text">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-[16px] leading-[1.6] text-muted">
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
