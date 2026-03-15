"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";
import Footer from "@/components/Footer";

interface Lender {
  id: number;
  name: string;
  slug: string;
  fw_rating: string | null;
  fw_risk_score: number | null;
  ucc_filing_count: number;
  lawsuit_count_verified: number;
  complaint_count: number;
  lender_type: string | null;
  assessment: string | null;
  red_flags: string[] | null;
  coj_usage: string | null;
}

const RATING_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  avoid:     { label: "Avoid",     color: "#DC2626", bg: "#FEF2F2", icon: AlertTriangle },
  warning:   { label: "Warning",   color: "#D97706", bg: "#FFFBEB", icon: AlertCircle },
  caution:   { label: "Caution",   color: "#2563EB", bg: "#EFF6FF", icon: Info },
  certified: { label: "Certified", color: "#16A34A", bg: "#F0FDF4", icon: CheckCircle },
};

const RATINGS = ["avoid", "warning", "caution", "certified"] as const;

export default function LenderIndexPage() {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Lender[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [activeRating, setActiveRating] = useState<string>("all");

  useEffect(() => {
    fetch("/api/lenders")
      .then((r) => r.json())
      .then((d) => { setLenders(d.lenders || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setSearchResults(null); return; }
    setSearching(true);
    try {
      const r = await fetch(`/api/lenders/search?q=${encodeURIComponent(q)}`);
      const d = await r.json();
      setSearchResults(d.lenders || []);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => runSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery, runSearch]);

  const displayList = searchResults !== null
    ? searchResults
    : activeRating === "all"
      ? lenders
      : lenders.filter((l) => l.fw_rating === activeRating);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
        style={{ backgroundColor: "#1a1a2e" }}
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Live data — updated from verified court filings and UCC records
          </div>
          <h1
            className="text-[32px] font-extrabold leading-tight tracking-tight text-white md:text-[42px] lg:text-[52px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            MCA Lender Risk Index
          </h1>
          <p className="mt-4 max-w-[640px] text-base text-white/80 md:text-lg lg:text-xl">
            Every rating is based on verified UCC filings, court opinions, and contract analysis. No review sites. No guesses.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-[560px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" aria-hidden />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by lender name…"
                className="w-full rounded-xl bg-white/10 border border-white/20 pl-12 pr-4 py-4 text-white placeholder-white/40 text-base outline-none focus:border-white/50 focus:bg-white/15 transition min-h-[56px]"
                aria-label="Search lenders"
              />
              {searching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-6 md:py-10 lg:px-8">

        {/* Rating filter pills — only when not searching */}
        {searchResults === null && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveRating("all")}
              className="rounded-full border px-4 py-2 text-sm font-medium transition min-h-[40px]"
              style={activeRating === "all"
                ? { background: "#1a1a2e", color: "#fff", borderColor: "#1a1a2e" }
                : { background: "#fff", color: "#374151", borderColor: "#E5E7EB" }}
            >
              All Lenders
              <span className="ml-1.5 text-xs opacity-60">({lenders.length})</span>
            </button>
            {RATINGS.map((r) => {
              const cfg = RATING_CONFIG[r];
              const count = lenders.filter((l) => l.fw_rating === r).length;
              if (!count) return null;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setActiveRating(r)}
                  className="rounded-full border px-4 py-2 text-sm font-medium transition min-h-[40px]"
                  style={activeRating === r
                    ? { background: cfg.color, color: "#fff", borderColor: cfg.color }
                    : { background: "#fff", color: cfg.color, borderColor: cfg.color + "60" }}
                >
                  {cfg.label}
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {searchResults !== null && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setSearchResults(null); }}
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--color-accent-primary)" }}
            >
              Clear search
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="h-48 rounded-xl border border-[var(--color-border-default)] animate-pulse bg-gray-50" />
            ))}
          </div>
        ) : displayList.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-medium" style={{ color: "var(--color-text-primary)" }}>
              {searchQuery ? `No lenders found matching "${searchQuery}"` : "No lenders in this category yet."}
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              We add verified lenders as data becomes available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayList.map((lender) => (
              <LenderCard key={lender.id} lender={lender} />
            ))}
          </div>
        )}

        {/* Methodology note */}
        <div
          className="mt-12 rounded-xl border border-[var(--color-border-default)] p-6"
          style={{ background: "var(--color-bg-surface)" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-tertiary)" }}>
            How Ratings Are Determined
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {RATINGS.map((r) => {
              const cfg = RATING_CONFIG[r];
              return (
                <div key={r} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                  <span className="leading-snug">
                    {r === "avoid"     && "High lawsuit volume, COJ confirmed, documented harm to borrowers."}
                    {r === "warning"   && "Elevated filings or lawsuits. Material risk factors present."}
                    {r === "caution"   && "Some risk signals. Review contract carefully before signing."}
                    {r === "certified" && "Verified clean record. Meets FundingWatch transparency standards."}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            All data sourced from UCC filing databases, federal and state court records, and contract corpus analysis. No third-party review sites. Lenders with insufficient verified data are unrated.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

function LenderCard({ lender }: { lender: Lender }) {
  const cfg = lender.fw_rating ? RATING_CONFIG[lender.fw_rating] : null;
  const Icon = cfg?.icon;

  return (
    <Link
      href={`/lenders/${lender.slug}`}
      className="group flex flex-col rounded-xl border border-[var(--color-border-default)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-snug" style={{ color: "var(--color-text-primary)" }}>
          {lender.name}
        </h3>
        {cfg && Icon ? (
          <span
            className="shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            <Icon className="h-3 w-3" aria-hidden />
            {cfg.label}
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
            Unrated
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
        <div>
          <div className="font-semibold text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--color-text-tertiary)" }}>UCC Filings</div>
          <div className="text-base font-bold" style={{ color: "var(--color-text-primary)" }}>{lender.ucc_filing_count.toLocaleString()}</div>
        </div>
        <div>
          <div className="font-semibold text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--color-text-tertiary)" }}>Lawsuits</div>
          <div className="text-base font-bold" style={{ color: lender.lawsuit_count_verified >= 20 ? "#DC2626" : "var(--color-text-primary)" }}>
            {lender.lawsuit_count_verified}
          </div>
        </div>
        {lender.fw_risk_score !== null && (
          <div className="col-span-2">
            <div className="font-semibold text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--color-text-tertiary)" }}>Risk Score</div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${lender.fw_risk_score}%`,
                  background: lender.fw_risk_score >= 80 ? "#DC2626" : lender.fw_risk_score >= 50 ? "#D97706" : "#2563EB",
                }}
              />
            </div>
            <div className="mt-0.5 text-xs font-medium" style={{ color: "var(--color-text-tertiary)" }}>{lender.fw_risk_score}/100</div>
          </div>
        )}
      </div>

      {lender.assessment && (
        <p className="mt-3 text-xs leading-relaxed line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
          {lender.assessment}
        </p>
      )}

      <div className="mt-auto pt-3 flex items-center justify-end">
        <span className="text-xs font-medium transition group-hover:underline" style={{ color: "var(--color-accent-primary)" }}>
          Full report →
        </span>
      </div>
    </Link>
  );
}
