# Debtura Homepage — Full Code Reference

All code for the current homepage build. Fix or copy as needed.

---

## `src/app/page.tsx`

```tsx
"use client";

import { useState, useCallback, useRef } from "react";
import type { AnalysisResult } from "@/types/analysis";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import OurIntelligence from "@/components/OurIntelligence";
import FeaturedInsight from "@/components/FeaturedInsight";
import CheckYourContract from "@/components/CheckYourContract";
import LoadingState from "@/components/LoadingState";
import ApplicationForm from "@/components/ApplicationForm";
import FAQ from "@/components/FAQ";
import SecondaryCTA from "@/components/SecondaryCTA";
import Footer from "@/components/Footer";
import RevealOnScrollProvider from "@/components/RevealOnScroll";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisSuccess, setAnalysisSuccess] = useState(false);
  const analysisResultRef = useRef<AnalysisResult | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setAnalysisError(null);
    setSelectedFile(file);
  }, []);

  const handleStartAnalysis = useCallback(async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisSuccess(false);
    analysisResultRef.current = null;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      let message = "Analysis failed. Please try again.";
      try {
        const data = await res.json();
        if (res.ok) {
          analysisResultRef.current = data as AnalysisResult;
          setAnalysisSuccess(true);
          return;
        }
        if (data?.error && typeof data.error === "string") message = data.error;
      } catch {
        if (!res.ok) message = res.status === 500 ? "Analysis failed. Please try again." : `Request failed (${res.status}).`;
      }
      setAnalysisError(message);
    } catch (e) {
      setAnalysisError(e instanceof Error ? e.message : "Analysis failed. Please try again.");
    } finally {
      if (!analysisResultRef.current) setIsAnalyzing(false);
    }
  }, [selectedFile]);

  const handleAnimationComplete = useCallback(() => {
    const result = analysisResultRef.current;
    if (result && typeof window !== "undefined") {
      sessionStorage.setItem("analysisResult", JSON.stringify(result));
      window.location.href = "/results";
    }
  }, []);

  return (
    <RevealOnScrollProvider>
      <>
        <Hero />
        <TrustBar />
        <OurIntelligence />
        <FeaturedInsight />
        <CheckYourContract
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onStartAnalysis={handleStartAnalysis}
          isAnalyzing={isAnalyzing}
          analysisError={analysisError}
        />
        {isAnalyzing && (
          <LoadingState
            apiComplete={analysisSuccess}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
        <ApplicationForm />
        <FAQ />
        <section id="about" className="py-12 px-4 bg-white">
          <div className="mx-auto max-w-[640px] text-center">
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b", fontSize: 15 }}>
              Debtura is a licensed commercial financing broker. We match businesses with vetted MCA lenders and help you understand your contract terms.
            </p>
          </div>
        </section>
        <SecondaryCTA />
        <Footer />
      </>
    </RevealOnScrollProvider>
  );
}
```

---

## `src/components/Navbar.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Lender Risk Index", href: "/lender-risk-index" },
  { label: "Contract Analyzer", href: "/analyze" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #1a3a5c 0%, #1e5a8a 50%, #2a6a9e 100%)",
    padding: "14px 32px",
  };

  return (
    <>
      <header
        className="sticky top-0 z-[100] w-full flex items-center justify-between px-4 py-3.5 sm:px-8"
        style={headerStyle}
      >
        <Link
          href="/"
          className="text-[22px] text-white lowercase tracking-tight"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", letterSpacing: "-0.5px" }}
        >
          debtura
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}
        >
          {navLinks.map((item) => {
            const href = item.href;
            const isHash = href.startsWith("#");
            const linkClass = "min-h-[48px] inline-flex items-center transition-colors hover:opacity-90 text-inherit no-underline bg-transparent border-0 cursor-pointer";
            if (isHash && !isHome) {
              return (
                <a key={href} href={`/#${href.slice(1)}`} className={linkClass}>
                  {item.label}
                </a>
              );
            }
            if (isHash) {
              return (
                <button key={href} type="button" onClick={() => scrollTo(href)} className={linkClass}>
                  {item.label}
                </button>
              );
            }
            return (
              <Link key={href} href={href} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-12 w-12 min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center md:hidden text-white bg-transparent border-0"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div
        className="fixed inset-y-0 right-0 z-[90] w-[300px] transform border-l border-[#e2e8f0] transition-transform duration-300 md:hidden"
        style={{
          background: "#fff",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          top: "84px",
          height: "calc(100vh - 84px)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
        }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-0 px-4 pt-6 pb-8" aria-label="Mobile">
          {navLinks.map((item) => {
            const href = item.href;
            const isHash = href.startsWith("#");
            const style = { color: "#0f172a", fontFamily: "var(--font-dm-sans), sans-serif" };
            if (isHash && !isHome) {
              return (
                <a key={href} href={`/#${href.slice(1)}`} className="flex min-h-[56px] items-center py-3 text-[16px] transition-colors hover:opacity-80" style={style} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              );
            }
            if (isHash) {
              return (
                <button key={href} type="button" onClick={() => scrollTo(href)} className="flex min-h-[56px] w-full items-center py-3 text-left text-[16px] transition-colors hover:opacity-80 bg-transparent border-0 cursor-pointer" style={style}>
                  {item.label}
                </button>
              );
            }
            return (
              <Link key={href} href={href} className="flex min-h-[56px] items-center py-3 text-[16px] transition-colors hover:opacity-80 no-underline" style={style} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className="fixed inset-0 z-[80] bg-black/10 transition-opacity duration-300 md:hidden"
        style={{ top: "84px", opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
    </>
  );
}
```

---

## `src/components/Hero.tsx`

```tsx
"use client";

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 px-4" style={{ background: "#f8fafb" }}>
      <div className="mx-auto max-w-[720px] text-center">
        <h1
          className="text-[40px] leading-[1.1] md:text-[58px] font-normal"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a" }}
        >
          Funding, with
          <br />
          <span className="italic" style={{ color: "#2a6a9e" }}>confidence.</span>
        </h1>
        <p
          className="mt-8 text-[17px] leading-[1.7] max-w-[520px] mx-auto"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
        >
          Debtura analyzes lender risk, uncovers hidden terms, and connects businesses with better funding partners.
        </p>
      </div>
    </section>
  );
}
```

---

## `src/components/TrustBar.tsx`

```tsx
"use client";

// Real numbers from database — update with actuals from blue data pull
const stats = [
  { value: "39+", label: "Lenders Analyzed" },
  { value: "12,000+", label: "UCC Filings Reviewed" },
  { value: "1,700+", label: "Contracts Analyzed" },
  { value: "50", label: "States Covered" },
];

export default function TrustBar() {
  return (
    <section className="py-10 px-4 bg-white" aria-label="Trust metrics">
      <div className="mx-auto max-w-[900px] flex flex-wrap items-center justify-center gap-y-6">
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={`flex flex-col items-center px-6 sm:px-8 ${i < stats.length - 1 ? "sm:border-r border-[#e2e8f0]" : ""}`}
          >
            <span
              className="text-[28px] tabular-nums"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, color: "#0f172a" }}
            >
              {value}
            </span>
            <span
              className="text-[13px] mt-0.5"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 400, color: "#94a3b8" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## `src/components/OurIntelligence.tsx`

```tsx
"use client";

import Link from "next/link";
import { Shield, FileSearch, Handshake } from "lucide-react";

const cards = [
  {
    title: "Lender Risk Index",
    icon: Shield,
    borderColor: "#1e5a8a",
    body: "Every MCA lender scored on six dimensions: complaint density, regulatory exposure, contract risk signals, litigation aggressiveness, transparency, and stacking behavior. Exposed in a public database anyone can search.",
    cta: "Browse the Index →",
    href: "/lender-risk-index",
  },
  {
    title: "Contract Analyzer",
    icon: FileSearch,
    borderColor: "#2a6a9e",
    body: "Upload any MCA contract or offer letter. Our system extracts the factor rate, calculates the real APR, flags missing reconciliation clauses, identifies confession of judgment language, and scores the lender — in seconds.",
    cta: "Analyze a Contract →",
    href: "/analyze",
  },
  {
    title: "Vetted Lender Matching",
    icon: Handshake,
    borderColor: "#22c55e",
    body: "Tell us about your business and we do the rest. We only route applications to lenders that passed our independent review — filtered by your revenue, industry, and funding needs.",
    cta: "Apply Now →",
    href: "#application",
    scroll: true,
  },
];

export default function OurIntelligence() {
  const scrollToApplication = () => {
    document.getElementById("application")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-[#f8fafb]" aria-label="Our intelligence">
      <div className="mx-auto max-w-[1100px]">
        <p
          className="text-xs font-semibold uppercase tracking-wider text-center"
          style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          OUR INTELLIGENCE
        </p>
        <h2
          className="text-2xl md:text-3xl text-center mt-2"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
        >
          The engine behind every match
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {cards.map(({ title, icon: Icon, borderColor, body, cta, href, scroll }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-sm flex flex-col"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderTop: `3px solid ${borderColor}` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "#f0f7ff", color: borderColor }}>
                <Icon className="w-6 h-6" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#0f172a" }}>
                {title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.65] flex-1" style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}>
                {body}
              </p>
              {scroll ? (
                <button
                  type="button"
                  onClick={scrollToApplication}
                  className="mt-6 text-[14px] font-semibold text-left transition hover:opacity-80 bg-transparent border-0 cursor-pointer"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
                >
                  {cta}
                </button>
              ) : (
                <Link
                  href={href}
                  className="mt-6 text-[14px] font-semibold inline-block transition hover:opacity-80 no-underline"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
                >
                  {cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/FeaturedInsight.tsx`

```tsx
"use client";

import Link from "next/link";

const featured = {
  label: "LATEST RESEARCH",
  title: "We Analyzed 1,700+ Borrower Complaints. Here's What Separates a Responsible Lender from a Predatory One.",
  excerpt: "We scraped and categorized thousands of borrower posts from Reddit and DailyFunder — then mapped complaints to specific lenders and deal structures. The data reveals clear patterns: brokers and stacking dominate the complaint landscape, while lender behavior splits into two distinct clusters. Here's how we tell them apart.",
  href: "/blog", // Replace with actual article slug when published
};

export default function FeaturedInsight() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#f0f4f8]" aria-label="Featured insight">
      <div className="mx-auto max-w-[1100px] grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#2a6a9e", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {featured.label}
          </p>
          <h2
            className="text-[28px] leading-[1.25] mt-2"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a", fontWeight: 400 }}
          >
            {featured.title}
          </h2>
          <p
            className="mt-6 text-[15px] leading-[1.7]"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
          >
            {featured.excerpt}
          </p>
          <Link
            href={featured.href}
            className="inline-block mt-6 text-[14px] font-semibold transition hover:opacity-80 no-underline"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#1e5a8a" }}
          >
            Read the Full Report →
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[200px] rounded-xl bg-white/60 border border-[#e2e8f0]">
          <span className="text-[13px] text-[#94a3b8]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Data graphic / visual placeholder
          </span>
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/CheckYourContract.tsx`

See repo file — same as in your project. (Full component with file upload, persona cards, validation.)

---

## `src/components/ApplicationForm.tsx`

See repo file — same as in your project. (Form with Industry, Revenue, Amount, Name, Phone, Email; submit confirmation; fine print.)

---

## `src/components/FAQ.tsx`

See repo file — 7 accordion items (Debtura money, loan?, already have MCA?, how fast?, credit?, different from brokers?, industries?).

---

## `src/components/SecondaryCTA.tsx`

See repo file — dark gradient banner, “Your next MCA should cost less.”, “Submit Your Application” button scrolling to #application.

---

## `src/components/Footer.tsx`

See repo file — Platform / Resources / Company columns, debtura logo, © 2026 Debtura.

---

## Other dependencies

- **Layout (fonts):** `src/app/layout.tsx` should load DM Serif Display and DM Sans and set `--font-dm-serif`, `--font-dm-sans`.
- **LoadingState:** `src/components/LoadingState.tsx` — used during contract analysis.
- **RevealOnScroll:** `src/components/RevealOnScroll.tsx` — wrapper for reveal animations.
- **FadeIn:** `src/components/FadeIn.tsx` — used in FAQ.
- **API:** `POST /api/analyze` for contract upload; results go to `/results` via `sessionStorage`.
- **Analyze redirect:** `src/app/analyze/page.tsx` redirects to `/#check-contract`.

All of the above component files exist in your repo at the paths shown. This file is a reference; edit the actual `.tsx` files in `src/components/` and `src/app/page.tsx` to make changes.
