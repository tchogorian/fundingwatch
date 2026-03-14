"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Search, AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import type { LenderListItem, LendersResponse } from "@/types/lenders";

const HERO_STAT = "Every MCA lender rated on the same scale. Data from 1,700+ borrower complaints, 10,000+ UCC filings, and 500+ court records.";

function normalizeList(res: LendersResponse | LenderListItem[]): LenderListItem[] {
  if (Array.isArray(res)) return res;
  if (res?.lenders && Array.isArray(res.lenders)) return res.lenders;
  if (res?.data && Array.isArray(res.data)) return res.data;
  return [];
}

function ratingStyle(rating: string | undefined) {
  if (!rating) return { bg: "var(--color-bg-elevated)", color: "var(--color-text-secondary)" };
  const r = (rating || "").toLowerCase();
  if (r === "certified") return { bg: "var(--accent-green)", color: "#fff" };
  if (r === "caution") return { bg: "var(--accent-yellow)", color: "#000" };
  if (r === "warning") return { bg: "var(--warning)", color: "#fff" };
  if (r === "avoid") return { bg: "var(--danger)", color: "#fff" };
  return { bg: "var(--color-bg-elevated)", color: "var(--color-text-secondary)" };
}

export default function LenderRiskIndexPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LenderListItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allLenders, setAllLenders] = useState<LenderListItem[] | null>(null);

  const runSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setSearchResults(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/lenders/search?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Search failed");
      setSearchResults(normalizeList(data));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lenders");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load lenders");
      const list = normalizeList(data);
      setAllLenders(list);
      setSearchResults(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load lenders");
      setAllLenders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
    const el = document.getElementById("lender-results");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const showList = searchResults !== null ? searchResults : allLenders;
  const hasSearched = query.trim() !== "";

  return (
    <>
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
              disabled={loading}
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:opacity-95 min-h-[48px] disabled:opacity-70 inline-flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              Search
            </button>
          </form>

          <p className="lri-hero-stat mt-8 max-w-[640px] mx-auto">
            {HERO_STAT}
          </p>
        </div>
      </section>

      <main
        id="lender-results"
        className="min-h-screen px-4 py-16 sm:px-6"
        style={{ background: "var(--color-bg-base)" }}
      >
        <div className="mx-auto max-w-[840px]">
          {error && (
            <div
              className="mb-8 flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ borderColor: "var(--danger)", background: "var(--color-bg-surface)" }}
            >
              <AlertTriangle className="h-5 w-5 shrink-0" style={{ color: "var(--danger)" }} aria-hidden />
              <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{error}</p>
            </div>
          )}

          {showList && showList.length > 0 && (
            <section className="mb-12" aria-label="Search results">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-text-primary)" }}>
                {searchResults !== null
                  ? `Results for “${query}”`
                  : "All lenders"}
              </h2>
              <ul className="space-y-3">
                {showList.map((lender) => {
                  const rating = lender.rating ?? lender.fw_rating;
                  const style = ratingStyle(rating);
                  return (
                    <li key={lender.slug}>
                      <Link
                        href={`/lender-risk-index/${lender.slug}`}
                        className="flex flex-wrap items-center gap-3 rounded-xl border p-4 transition hover:shadow-md"
                        style={{ borderColor: "var(--color-border-default)", background: "var(--bg-light)" }}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                            {lender.name}
                          </span>
                          {lender.headline_stat && (
                            <p className="text-sm mt-0.5 truncate" style={{ color: "var(--color-text-tertiary)" }}>
                              {lender.headline_stat}
                            </p>
                          )}
                        </div>
                        {rating && (
                          <span
                            className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                            style={{ background: style.bg, color: style.color }}
                          >
                            {rating}
                          </span>
                        )}
                        <ExternalLink className="h-4 w-4 shrink-0" style={{ color: "var(--color-text-tertiary)" }} aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {showList && showList.length === 0 && hasSearched && !loading && (
            <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
              No lenders found for “{query}”. Try a different name or browse all lenders below.
            </p>
          )}

          <div className="text-center">
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              We rate MCA lenders on transparency, contract terms, complaint history, and regulatory record. Certified lenders meet our standards for fair dealing; others are flagged as Caution, Warning, or Avoid.
            </p>
            <p className="mt-4 text-base" style={{ color: "var(--color-text-tertiary)" }}>
              Search above or browse the full index.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={loadAll}
                disabled={loading}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95 disabled:opacity-70"
                style={{ background: "var(--accent-blue)" }}
              >
                {loading && !showList ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                Browse All Lenders
              </button>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
