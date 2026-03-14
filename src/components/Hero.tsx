"use client";

import Link from "next/link";
import Image from "next/image";

const HERO_PIGGY = "/images/hero-piggy.png";

export default function Hero() {
  return (
    <div className="relative overflow-visible" style={{ background: "#faf8f5" }}>
      <div
        className="flex flex-col items-center min-h-[560px] px-4 pt-[70px] pb-8 gap-8 md:flex-row md:items-end md:px-12 md:gap-8 md:min-h-[580px]"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* LEFT: Headline + CTA */}
        <div className="flex-1 min-w-0 w-full md:min-w-[320px] md:pb-4">
          <h1
            className="text-[36px] leading-[1.08] mb-6 md:text-[54px] font-normal"
            style={{
              fontFamily: "var(--font-dm-serif), Georgia, serif",
              color: "#0f172a",
              fontWeight: 400,
            }}
          >
            Funding, with
            <br />
            <span className="text-[#2a6a9e] italic">confidence.</span>
          </h1>
          <p
            className="text-base leading-[1.7] mb-10 max-w-[420px]"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              color: "#64748b",
            }}
          >
            Debtura analyzes lender risk, uncovers hidden terms, and connects businesses with better funding partners.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              href="#"
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

        {/* RIGHT: Piggy bank + floating cards — image dominates, overflows at bottom */}
        <div
          className="flex-shrink-0 w-full max-w-[520px] min-h-[320px] md:min-h-[520px] relative flex-1 md:flex-initial"
        >
          {/* Piggy bank image — no box; background matches hero (#faf8f5 warm cream) so image blends in */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 z-[1] w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] md:left-auto md:right-0 md:translate-x-0 bg-transparent"
            style={{ filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.08))", background: "transparent" }}
          >
            <Image
              src={HERO_PIGGY}
              alt="Broken piggy bank with coins"
              width={500}
              height={500}
              className="w-full h-full object-contain object-bottom bg-transparent"
              style={{ background: "transparent" }}
            />
          </div>

          {/* Floating card 1: Risk Score — hidden on small screens */}
          <div
            className="absolute left-0 top-0 z-[3] rounded-[14px] p-3.5 md:p-[14px_18px] bg-white/97 shadow-lg hidden md:block"
            style={{ animation: "hero-fc1 4s ease-in-out infinite", boxShadow: "0 8px 28px rgba(0,0,0,0.1)" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 48 48" width={48} height={48} className="block">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#f0f0f0" strokeWidth="4" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeDasharray="126"
                    strokeDashoffset="28"
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                    style={{ animation: "hero-gauge 1.8s ease-out forwards" }}
                  />
                </svg>
                <div
                  className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-[#0f172a]"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  78
                </div>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#94a3b8] tracking-wider" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>RISK SCORE</div>
                <div className="text-[17px] text-[#0f172a]" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>Warning</div>
              </div>
            </div>
          </div>

          {/* Floating card 2: APR */}
          <div
            className="absolute top-[90px] right-0 z-[3] rounded-xl p-3 hidden lg:block"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              animation: "hero-fc2 3.5s ease-in-out infinite 0.8s",
            }}
          >
            <div className="flex items-baseline gap-2">
              <div className="text-[10px] font-medium text-[#94a3b8]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>APR</div>
              <div className="text-xl font-bold text-[#ef4444]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>147%</div>
              <svg width="14" height="8" viewBox="0 0 14 8">
                <path d="M1 4h12M10 1l3 3-3 3" stroke="#94a3b8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
              <div className="text-xl font-bold text-[#22c55e]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>45%</div>
            </div>
          </div>

          {/* Floating card 3: Certified Lender */}
          <div
            className="absolute bottom-[30px] right-0 z-[3] rounded-[14px] p-3.5 md:p-[14px_18px] bg-white/97 border-l-[3px] border-l-[#22c55e] hidden md:block"
            style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.1)", animation: "hero-fc1 4.2s ease-in-out infinite 1.5s" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-[#dcfce7] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 7l2.5 2.5L11 4" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Certified Lender</div>
                <div className="text-[11px] text-[#94a3b8]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>Score: 14 · 0 red flags</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swirl wave transition — fill matches page background */}
      <svg
        width="100%"
        height="60"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block relative z-[5] -mt-5"
        aria-hidden
      >
        <path d="M0,25 C300,55 600,0 900,35 C1100,55 1300,15 1440,30 L1440,60 L0,60 Z" fill="#fff" />
      </svg>
    </div>
  );
}
