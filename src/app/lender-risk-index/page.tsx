"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Search, AlertTriangle, Loader2, ArrowRight } from "lucide-react";
import type { LenderListItem, LendersResponse } from "@/types/lenders";

const HERO_STAT = "Every MCA lender rated on the same scale. Data from 1,700+ borrower complaints, 10,000+ UCC filings, and 500+ court records.";

const RATING_ORDER: string[] = ["certified", "caution", "warning", "avoid"];
const RATING_LABELS: Record<string, string> = {
  certified: "Certified",
  caution: "Caution",
  warning: "Warning",
  avoid: "Avoid",
};

function normalizeList(res: LendersResponse | LenderListItem[]): LenderListItem[] {
  if (Array.isArray(res)) return res;
  if (res?.lenders && Array.isArray(res.lenders)) return res.lenders;
  if (res?.data && Array.isArray(res.data)) return res.data;
  return [];
}

function getRating(l: LenderListItem): string {
  const r = (l.rating ?? l.fw_rating ?? "").toString().toLowerCase().trim();
  return r || "unrated";
}

function sortLenders(list: LenderListItem[]): LenderListItem[] {
  return [...list].sort((a, b) => {
    const ra = getRating(a);
    const rb = getRating(b);
    const ia = RATING_ORDER.indexOf(ra);
    const ib = RATING_ORDER.indexOf(rb);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

function ratingStyle(rating: string) {
  const r = rating.toLowerCase();
  if (r === "certified") return { bg: "var(--accent-green)", border: "var(--accent-green)" };
  if (r === "caution") return { bg: "#f59e0b", border: "#f59e0b" };
  if (r === "warning") return { bg: "#ea580c", border: "#ea580c" };
  if (r === "avoid") return { bg: "var(--danger)", border: "var(--danger)" };
  return { bg: "var(--color-bg-elevated)", border: "var(--color-border-default)" };
}

const DEBOUNCE_MS = 300;

export default function LenderRiskIndexPage() {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [allLenders, setAllLenders] = useState<LenderListItem[] | null>(null);
  const [searchResults, setSearchResults] = useState<LenderListItem[] | null>(null);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all lenders on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch("/api/lenders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load lenders");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setAllLenders(normalizeList(data));
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e?.message ?? "Failed to load lenders");
          setAllLenders([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults(null);
      setQuery("");
      return;
    }
    const t = setTimeout(() => {
      setQuery(searchInput.trim());
      setSearching(true);
      fetch(`/api/lenders/search?q=${encodeURIComponent(searchInput.trim())}`)
        .then((res) => {
          if (!res.ok) throw new Error("Search failed");
          return res.json();
        })
        .then((data) => setSearchResults(normalizeList(data)))
        .catch(() => setSearchResults([]))
        .finally(() => setSearching(false));
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchInput]);

  const dataSource = searchResults !== null ? searchResults : allLenders ?? [];
  const filtered = useMemo(() => {
    if (filterRating === "all") return dataSource;
    return dataSource.filter((l) => getRating(l) === filterRating);
  }, [dataSource, filterRating]);
  const sorted = useMemo(() => sortLenders(filtered), [filtered]);

  const certifiedCount = useMemo(() => filtered.filter((l) => getRating(l) === "certified").length, [filtered]);
  const flaggedCount = useMemo(
    () => filtered.filter((l) => ["caution", "warning", "avoid"].includes(getRating(l))).length,
    [filtered]
  );

  const ratingsWithLenders = useMemo(() => {
    const set = new Set<string>();
    dataSource.forEach((l) => {
      const r = getRating(l);
      if (r !== "unrated") set.add(r);
    });
    return RATING_ORDER.filter((r) => set.has(r));
  }, [dataSource]);

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

          <div className="mt-8 flex flex-col items-center">
            <div className="relative w-full max-w-[560px]">
              <Search
                className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none"
                style={{ color: "#6b7280" }}
                aria-hidden
              />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by lender name..."
                className="lri-hero-search pl-14 pr-6"
                aria-label="Search lenders by name"
                autoComplete="off"
              />
              {searching && (
                <Loader2
                  className="absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin"
                  style={{ color: "#6b7280" }}
                  aria-hidden
                />
              )}
            </div>
          </div>

          <p className="lri-hero-stat mt-8 max-w-[640px] mx-auto">
            {HERO_STAT}
          </p>
        </div>
      </section>

      <main
        id="lender-results"
        className="min-h-screen px-4 py-10 sm:px-6"
        style={{ background: "var(--color-bg-base)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          {error && (
            <div
              className="mb-8 flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ borderColor: "var(--danger)", background: "var(--color-bg-surface)" }}
            >
              <AlertTriangle className="h-5 w-5 shrink-0" style={{ color: "var(--danger)" }} aria-hidden />
              <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin" style={{ color: "var(--accent-blue)" }} aria-hidden />
            </div>
          ) : (
            <>
              {/* Filter pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setFilterRating("all")}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition min-h-[40px]"
                  style={
                    filterRating === "all"
                      ? { background: "var(--accent-blue)", color: "#fff", borderColor: "var(--accent-blue)" }
                      : { background: "var(--color-bg-base)", color: "var(--color-text-secondary)", borderColor: "var(--color-border-default)" }
                  }
                >
                  All
                </button>
                {ratingsWithLenders.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setFilterRating(r)}
                    className="rounded-full border px-4 py-2 text-sm font-medium transition min-h-[40px]"
                    style={
                      filterRating === r
                        ? { background: ratingStyle(r).bg, color: r === "caution" ? "#000" : "#fff", borderColor: ratingStyle(r).border }
                        : { background: "var(--color-bg-base)", color: "var(--color-text-secondary)", borderColor: "var(--color-border-default)" }
                    }
                  >
                    {RATING_LABELS[r] ?? r}
                  </button>
                ))}
              </div>

              {/* Stats bar */}
              <div
                className="mb-8 rounded-xl border px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm"
                style={{ borderColor: "var(--color-border-default)", background: "var(--bg-light)" }}
              >
                <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                  {sorted.length} Lenders Indexed
                </span>
                <span className="font-mono" style={{ color: "var(--color-text-secondary)" }}>
                  {certifiedCount} Certified
                </span>
                <span className="font-mono" style={{ color: "var(--color-text-secondary)" }}>
                  {flaggedCount} Flagged
                </span>
              </div>

              {/* Lender grid */}
              <section aria-label="Lender index" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((lender) => {
                  const rating = getRating(lender);
                  const style = ratingStyle(rating);
                  const riskScore = lender.fw_risk_score ?? lender.risk_score ?? lender.severity_score;
                  const complaints = lender.complaint_count ?? 0;
                  const ucc = lender.ucc_filing_count ?? 0;
                  const flags = Array.isArray(lender.red_flags) ? lender.red_flags.slice(0, 2) : [];
                  const location = lender.headquarters ?? "";
                  const type = lender.lender_type ?? "";
                  const sub = [location, type].filter(Boolean).join(" · ");
                  return (
                    <article
                      key={lender.slug}
                      className="rounded-xl border bg-white overflow-hidden flex flex-col"
                      style={{
                        borderColor: "var(--color-border-default)",
                        borderLeftWidth: "4px",
                        borderLeftColor: style.border,
                      }}
                    >
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="text-lg font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                          {lender.name}
                        </h2>
                        {sub && (
                          <p className="text-xs mt-1" style={{ color: "var(--color-text-tertiary)" }}>
                            {sub}
                          </p>
                        )}
                        {rating !== "unrated" && (
                          <span
                            className="inline-block mt-3 rounded-full px-3 py-1 text-xs font-semibold w-fit"
                            style={{ background: style.bg, color: rating === "caution" ? "#000" : "#fff" }}
                          >
                            {RATING_LABELS[rating] ?? rating.toUpperCase()}
                          </span>
                        )}
                        <div className="mt-4">
                          <span className="font-mono text-2xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                            {riskScore != null ? riskScore : "Unrated"}
                          </span>
                          <span className="text-sm ml-1" style={{ color: "var(--color-text-tertiary)" }}>
                            risk score
                          </span>
                        </div>
                        <div className="mt-2 flex gap-4 text-xs font-mono" style={{ color: "var(--color-text-tertiary)" }}>
                          <span>{complaints} complaints</span>
                          <span>{ucc} UCC filings</span>
                        </div>
                        {flags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {flags.map((f, i) => (
                              <span
                                key={i}
                                className="rounded px-2 py-0.5 text-xs"
                                style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-secondary)" }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                        <Link
                          href={`/lender-risk-index/${lender.slug}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold w-fit"
                          style={{ color: "var(--accent-blue)" }}
                        >
                          View Report
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </section>

              {sorted.length === 0 && (
                <p className="text-center py-12" style={{ color: "var(--color-text-secondary)" }}>
                  {searchInput.trim()
                    ? `No lenders match “${searchInput.trim()}”.`
                    : "No lenders match this filter."}
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
