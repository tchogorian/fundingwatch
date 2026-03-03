"use client";

import { UploadCloud, Sparkles, FileCheck2, ChevronRight, Clock } from "lucide-react";
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
    title: "AI Analyzes",
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
    <section className="bg-secondary-bg py-section-y-mobile sm:py-section-y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-eyebrow font-semibold uppercase tracking-widest text-accent">
            HOW IT WORKS
          </p>
          <h2 className="mt-3 text-center text-section-mobile font-semibold text-dark-text sm:text-section-desktop">
            Three Steps to Contract Clarity
          </h2>
        </FadeIn>
        <div className="mt-16 flex flex-col items-stretch gap-8 sm:flex-row sm:justify-between sm:gap-4">
          {steps.map(({ number, title, description, Icon }, i) => (
            <FadeIn key={number} delay={i * 100}>
              <div className="relative flex flex-1 flex-col">
                <div className="rounded-card border border-border bg-primary p-8 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                    {number}
                  </div>
                  <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-card bg-trust-bg text-accent">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-subhead-mobile font-semibold text-dark-text sm:text-subhead-desktop">
                    {title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-muted">
                    {description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-muted sm:block">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={300}>
          <p className="mt-10 flex cursor-default items-center justify-center gap-2 text-small text-muted">
            <Clock className="h-4 w-4" />
            Average analysis time: under 30 seconds
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
