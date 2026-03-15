"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Lender {
  slug: string;
  name: string;
  location: string | null;
  type: string | null;
  rating: string | null;
  risk_score: number | null;
  complaint_count: number | null;
  ucc_count: number | null;
  red_flags: string[] | null;
}

const RATING_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  certified: { bg: "#dcfce7", text: "#166534", label: "CERTIFIED" },
  caution: { bg: "#fef3c7", text: "#92400e", label: "CAUTION" },
  warning: { bg: "#ffedd5", text: "#9a3412", label: "WARNING" },
  avoid: { bg: "#fef2f2", text: "#991b1b", label: "AVOID" },
};

const TABS = ["all", "certified", "caution", "warning", "avoid"];
const TAB_BORDER_COLORS: Record<string, string> = {
  all: "var(--blue)",
  certified: "#22c55e",
  caution: "#f59e0b",
  warning: "#f97316",
  avoid: "var(--red)",
};

function scoreColor(score: number | null): string {
  if (score === null) return "#94a3b8";
  if (score <= 20) return "#22c55e";
  if (score <= 45) return "#f59e0b";
  if (score <= 70) return "#f97316";
  return "#ef4444";
}

const SORT_ORDER: Record<string, number> = { certified: 0, caution: 1, warning: 2, avoid: 3 };

function normalizeLender(raw: Record<string, unknown>): Lender {
  return {
    slug: String(raw.slug ?? raw.id ?? ""),
    name: String(raw.name ?? ""),
    location: raw.location != null ? String(raw.location) : null,
    type: raw.type != null ? String(raw.type) : null,
    rating: raw.rating != null ? String(raw.rating) : null,
    risk_score: typeof raw.risk_score === "number" ? raw.risk_score : null,
    complaint_count: typeof raw.complaint_count === "number" ? raw.complaint_count : null,
    ucc_count: typeof raw.ucc_count === "number" ? raw.ucc_count : null,
    red_flags: Array.isArray(raw.red_flags) ? raw.red_flags.map(String) : null,
  };
}

export default function LenderRiskIndex() {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch("/api/lenders")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray((data as { lenders?: unknown[] }).lenders)
            ? (data as { lenders: unknown[] }).lenders
            : Array.isArray((data as { data?: unknown[] }).data)
              ? (data as { data: unknown[] }).data
              : [];
        const normalized = list.map((l: Record<string, unknown>) => normalizeLender(l));
        const sorted = normalized.sort((a: Lender, b: Lender) => {
          const ra = SORT_ORDER[a.rating || ""] ?? 99;
          const rb = SORT_ORDER[b.rating || ""] ?? 99;
          if (ra !== rb) return ra - rb;
          return (a.risk_score ?? 999) - (b.risk_score ?? 999);
        });
        setLenders(sorted);
      })
      .catch(() => setLenders([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = lenders.filter((l) => {
    const matchesTab = activeTab === "all" || l.rating === activeTab;
    const matchesSearch = !search || l.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    total: lenders.length,
    certified: lenders.filter((l) => l.rating === "certified").length,
    flagged: lenders.filter((l) => l.rating && l.rating !== "certified").length,
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero — Debtura navy/blue gradient */}
      <section className="lri-hero px-4 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] text-center">
          <h1
            className="text-[32px] md:text-[40px] lg:text-[48px] text-white"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            Lender Risk Index
          </h1>
          <p
            className="mt-4 text-[16px] md:text-[18px] max-w-[600px] mx-auto"
            style={{ fontFamily: "var(--font-sans)", color: "rgba(255,255,255,0.85)" }}
          >
            Independent risk ratings for MCA lenders. Scored on complaints, litigation,
            contract terms, regulatory exposure, transparency, and stacking behavior.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-[560px] mx-auto relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={1.5}
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by lender name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[52px] pl-12 pr-4 text-[15px] outline-none transition-shadow focus:ring-2 focus:ring-white/30 border-0"
              style={{
                fontFamily: "var(--font-sans)",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
              }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-10">
        {/* Stats strip */}
        <div
          className="py-3 px-6 mb-6 flex items-center gap-4 text-[13px] border border-[var(--line)]"
          style={{ background: "var(--white)", fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          <span>
            <strong style={{ color: "var(--body)" }}>{counts.total}</strong> Lenders Indexed
          </span>
          <span>·</span>
          <span>
            <strong style={{ color: "var(--body)" }}>{counts.certified}</strong> Certified
          </span>
          <span>·</span>
          <span>
            <strong style={{ color: "var(--body)" }}>{counts.flagged}</strong> Flagged
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-0 border-b border-[var(--line)] mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-3 text-[13px] font-medium capitalize transition-colors cursor-pointer bg-transparent border-0"
              style={{
                fontFamily: "var(--font-sans)",
                color: activeTab === tab ? "var(--body)" : "var(--faint)",
                fontWeight: activeTab === tab ? 600 : 400,
                borderBottom:
                  activeTab === tab
                    ? `3px solid ${TAB_BORDER_COLORS[tab]}`
                    : "3px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-[15px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[15px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            No lenders found.
          </div>
        ) : (
          <div className="overflow-x-auto border border-[var(--line)] bg-white">
            <table className="w-full text-left" style={{ fontFamily: "var(--font-sans)" }}>
              <thead>
                <tr style={{ background: "var(--bg)" }}>
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Lender
                  </th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] hidden md:table-cell">
                    Location
                  </th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Rating
                  </th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Score
                  </th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] hidden lg:table-cell">
                    Complaints
                  </th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] hidden lg:table-cell">
                    UCC Filings
                  </th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] hidden xl:table-cell">
                    Red Flags
                  </th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => {
                  const rs = RATING_STYLES[l.rating || ""] || {
                    bg: "#f0f4f8",
                    text: "#64748b",
                    label: "—",
                  };
                  const isCertified = l.rating === "certified";
                  return (
                    <tr
                      key={l.slug}
                      className="transition-colors hover:bg-[#f8fafb]"
                      style={{
                        borderBottom: "1px solid var(--line)",
                        background: isCertified ? "#f9fefb" : i % 2 === 1 ? "var(--bg)" : "var(--white)",
                        borderLeft: isCertified
                          ? "3px solid #22c55e"
                          : "3px solid transparent",
                      }}
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/lender-risk-index/${l.slug}`}
                          className="text-[15px] font-semibold no-underline hover:opacity-70 transition-opacity"
                          style={{ color: "var(--body)" }}
                        >
                          {l.name}
                        </Link>
                        <div className="text-[12px] mt-0.5 md:hidden" style={{ color: "var(--muted)" }}>
                          {l.location || "—"}
                        </div>
                      </td>
                      <td
                        className="px-4 py-4 text-[13px] hidden md:table-cell"
                        style={{ color: "var(--muted)" }}
                      >
                        {l.location || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                          style={{ background: rs.bg, color: rs.text }}
                        >
                          {rs.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="text-[18px] font-bold tabular-nums"
                          style={{ color: scoreColor(l.risk_score) }}
                        >
                          {l.risk_score ?? "—"}
                        </span>
                        {l.risk_score !== null && (
                          <span className="text-[12px] ml-0.5" style={{ color: "var(--muted)" }}>
                            /100
                          </span>
                        )}
                      </td>
                      <td
                        className="px-4 py-4 text-[14px] hidden lg:table-cell"
                        style={{ color: "var(--body)" }}
                      >
                        {l.complaint_count ?? "—"}
                      </td>
                      <td
                        className="px-4 py-4 text-[14px] hidden lg:table-cell"
                        style={{ color: "var(--body)" }}
                      >
                        {l.ucc_count ?? "—"}
                      </td>
                      <td className="px-4 py-4 hidden xl:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {l.red_flags && l.red_flags.length > 0 ? (
                            l.red_flags.slice(0, 3).map((flag) => (
                              <span
                                key={flag}
                                className="text-[10px] font-medium px-2 py-0.5 rounded"
                                style={{ background: "#fef2f2", color: "#991b1b" }}
                              >
                                {flag.length > 20 ? flag.slice(0, 18) + "…" : flag}
                              </span>
                            ))
                          ) : (
                            <span className="text-[12px]" style={{ color: "var(--faint)" }}>
                              —
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/lender-risk-index/${l.slug}`}
                          className="text-[13px] font-semibold no-underline hover:opacity-70 transition-opacity"
                          style={{ color: "var(--blue)" }}
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Methodology */}
        <div className="mt-12 pt-10 border-t border-[var(--line)]">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Methodology</span>
          </div>
          <h2 className="mb-4 text-[18px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            How we score lenders
          </h2>
          <p
            className="text-[14px] leading-[1.65] max-w-[640px]"
            style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
          >
            Every lender is scored 0–100 across six dimensions: complaint density (25%),
            regulatory exposure (25%), contract risk signals (20%), litigation
            aggressiveness (15%), transparency (10%), and stacking behavior (5%). Lower
            is better.
          </p>
        </div>
      </div>
    </main>
  );
}
