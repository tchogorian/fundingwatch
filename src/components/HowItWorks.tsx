"use client";

import Link from "next/link";
import { ClipboardList, ShieldCheck, Banknote } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Tell Us About Your Business",
    description: "Quick application — business name, revenue, funding amount. Takes under 2 minutes.",
    Icon: ClipboardList,
  },
  {
    number: 2,
    title: "We Match You",
    description:
      "Our system scores every lender in our network on risk, terms, and transparency. We only match you with lenders that passed.",
    Icon: ShieldCheck,
  },
  {
    number: 3,
    title: "Get Funded",
    description: "Receive offers from vetted lenders. Choose the best option. Fund in as little as 2 hours.",
    Icon: Banknote,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 bg-white" aria-label="How it works">
      <div className="mx-auto max-w-[1000px]">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-center"
          style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          HOW IT WORKS
        </p>
        <h2
          className="text-3xl md:text-4xl text-center mt-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
        >
          Three Steps to Better Funding
        </h2>

        <div className="mt-14 flex flex-col sm:flex-row items-stretch gap-10 sm:gap-6">
          {steps.map(({ number, title, description, Icon }, i) => (
            <div key={number} className="flex-1 flex flex-col items-center text-center relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold border-2 flex-shrink-0"
                style={{ borderColor: "#1e5a8a", color: "#1e5a8a", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {number}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="hidden sm:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0 border-t-2 border-dashed border-[#e2e8f0]"
                  aria-hidden
                />
              )}
              <div className="mt-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#f1f5f9", color: "#1e5a8a" }}>
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2 text-[15px] leading-relaxed max-w-[280px]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="#application"
            className="inline-flex items-center rounded-[12px] text-white no-underline transition hover:opacity-95"
            style={{
              background: "#1e5a8a",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 600,
              fontSize: 14,
              padding: "16px 40px",
            }}
          >
            Get Approved in as Soon as 2 Hours
          </Link>
        </div>
      </div>
    </section>
  );
}
