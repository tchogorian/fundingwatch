"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";

const HERO_STAT = "Every MCA lender rated on the same scale. Data from 1,700+ borrower complaints, 10,000+ UCC filings, and 500+ court records.";

export default function LenderRiskIndexPage() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to lender search/filter
    if (query.trim()) {
      const el = document.getElementById("lender-results");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero — dark blue gradient, white text, search-first (same style as homepage/blog) */}
      <section
        className="lri-hero relative overflow-hidden"
        aria-label="Lender Risk Index hero"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="lri-hero-title text-white">
            Lender Risk Index
          </h1>
          <p className="lri-hero-sub mt-4">
            Before you sign, look them up.
          </p>

          {/* Search bar — #1 element, white on dark blue */}
          <form onSubmit={handleSearch} className="mt-8 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[560px]">
              <Search
                className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none"
                style={{ color: "#6b7280" }}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by lender name..."
                className="lri-hero-search pl-14 pr-6"
                aria-label="Search lenders by name"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:opacity-95 min-h-[48px]"
            >
              Search
            </button>
          </form>

          <p className="lri-hero-stat mt-8 max-w-[640px] mx-auto">
            {HERO_STAT}
          </p>
        </div>
      </section>

      {/* Main content — placeholder until index is built */}
      <main
        id="lender-results"
        className="min-h-screen px-4 py-16 sm:px-6"
        style={{ background: "var(--color-bg-base)" }}
      >
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            We rate MCA lenders on transparency, contract terms, complaint history, and regulatory record. Certified lenders meet our standards for fair dealing; others are flagged as Caution, Warning, or Avoid.
          </p>
          <p className="mt-4 text-base" style={{ color: "var(--color-text-tertiary)" }}>
            The full index and criteria are being updated. Check back soon or analyze your contract to see how your lender compares.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/#upload"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95"
              style={{ background: "var(--accent-blue)" }}
            >
              Analyze My Contract
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 px-6 py-3 font-semibold transition hover:opacity-90"
              style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-primary)" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
