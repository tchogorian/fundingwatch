"use client";

import Link from "next/link";
import Image from "next/image";

const HERO_PIGGY = "/images/hero-piggy.png";

export default function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ background: "#f8fafb" }}>
      <div
        className="flex flex-col items-center min-h-[520px] px-4 pt-[70px] pb-5 gap-8 md:flex-row md:items-center md:px-12 md:gap-5 md:min-h-[520px]"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* LEFT: Headline + CTAs */}
        <div className="flex-1 min-w-0 w-full md:min-w-[320px]">
          <h1
            className="text-[36px] leading-[1.08] mb-6 md:text-[54px]"
            style={{
              fontFamily: "var(--font-dm-serif), Georgia, serif",
              color: "#0f172a",
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
              href="#upload"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-[15px] font-semibold text-sm text-white no-underline transition hover:opacity-95"
              style={{
                background: "#1e5a8a",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 13V3h12v7H5l-3 3z" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="5.5" cy="6.5" r="0.8" fill="#fff" />
                <circle cx="8" cy="6.5" r="0.8" fill="#fff" />
                <circle cx="10.5" cy="6.5" r="0.8" fill="#fff" />
              </svg>
              <span>Analyze My Contract</span>
            </Link>
            <Link
              href="/lender-risk-index"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-[15px] font-semibold text-sm no-underline transition hover:opacity-95 border-[1.5px] border-[#e2e8f0] bg-white"
              style={{
                color: "#0f172a",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="5" stroke="#1e5a8a" strokeWidth="1.3" />
                <path d="M11 11l3 3" stroke="#1e5a8a" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>Look Up a Lender</span>
            </Link>
          </div>
        </div>

        {/* RIGHT: Piggy bank + floating cards — stacked on mobile, full on desktop */}
        <div
          className="flex-shrink-0 w-full max-w-[400px] h-[280px] sm:h-[340px] md:h-[440px] relative"
        >
          {/* Soft glow behind image */}
          <div
            className="absolute rounded-full opacity-50 blur-[40px]"
            style={{
              top: 40,
              left: 20,
              right: 20,
              bottom: 40,
              background: "#fff",
            }}
          />
          {/* Piggy bank image */}
          <div className="absolute top-5 left-0 right-0 w-[280px] h-[280px] mx-auto md:w-[360px] md:h-[360px] md:top-5 z-[1]">
            <Image
              src={HERO_PIGGY}
              alt="Broken piggy bank with coins"
              width={360}
              height={360}
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }}
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
