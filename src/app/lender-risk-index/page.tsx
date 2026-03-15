"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InnerPageHeader from "@/components/InnerPageHeader";

/** Use our API route to avoid CORS; it proxies to ops.fundingwatch.org */
const LENDERS_API = "/api/lenders";

interface Lender {
  slug: string;
  name: string;
  fw_risk_score: number | null;
  fw_rating: string;
  lawsuit_count_verified: number | null;
  complaint_count: number | null;
}

function scoreToGrade(score: number): { letter: string; tier: string; bg: string; text: string } {
  if (score <= 5) return { letter: "A+", tier: "Certified", bg: "#dcfce7", text: "#166534" };
  if (score <= 15) return { letter: "A", tier: "Certified", bg: "#dcfce7", text: "#166534" };
  if (score <= 25) return { letter: "B+", tier: "Standard", bg: "#dbeafe", text: "#1e40af" };
  if (score <= 35) return { letter: "B", tier: "Standard", bg: "#dbeafe", text: "#1e40af" };
  if (score <= 50) return { letter: "C+", tier: "Caution", bg: "#fef3c7", text: "#92400e" };
  if (score <= 65) return { letter: "C", tier: "Warning", bg: "#ffedd5", text: "#9a3412" };
  if (score <= 80) return { letter: "D", tier: "Warning", bg: "#ffedd5", text: "#9a3412" };
  return { letter: "F", tier: "Avoid", bg: "#fef2f2", text: "#991b1b" };
}

const TABS = ["all", "certified", "caution", "warning", "avoid"] as const;
const TAB_BORDER_COLORS: Record<string, string> = {
  all: "var(--blue)",
  certified: "#22c55e",
  caution: "#f59e0b",
  warning: "#f97316",
  avoid: "var(--red)",
};

function normalizeLender(raw: Record<string, unknown>): Lender {
  const score = typeof raw.fw_risk_score === "number" ? raw.fw_risk_score : null;
  return {
    slug: String(raw.slug ?? raw.id ?? ""),
    name: String(raw.name ?? ""),
    fw_risk_score: score,
    fw_rating: raw.fw_rating != null && String(raw.fw_rating).toLowerCase() !== "unrated" ? String(raw.fw_rating).toLowerCase() : "unrated",
    lawsuit_count_verified: typeof raw.lawsuit_count_verified === "number" ? raw.lawsuit_count_verified : null,
    complaint_count: typeof raw.complaint_count === "number" ? raw.complaint_count : null,
  };
}

export default function LenderRiskIndex() {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    fetch(LENDERS_API, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((data: unknown) => {
        const list = Array.isArray(data)
          ? data
          : (data as { lenders?: unknown[] })?.lenders ?? [];
        const normalized = list.map((l) => normalizeLender(l as Record<string, unknown>));
        const RATING_ORDER: Record<string, number> = { certified: 0, caution: 1, warning: 2, avoid: 3 };
        const sorted = normalized.sort((a: Lender, b: Lender) => {
          const ra = RATING_ORDER[a.fw_rating] ?? 99;
          const rb = RATING_ORDER[b.fw_rating] ?? 99;
          if (ra !== rb) return ra - rb;
          if (a.fw_risk_score === null && b.fw_risk_score === null) return 0;
          if (a.fw_risk_score === null) return 1;
          if (b.fw_risk_score === null) return -1;
          return a.fw_risk_score - b.fw_risk_score;
        });
        setLenders(sorted);
      })
      .catch(() => setLenders([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = lenders.filter((l) => {
    const matchesTab = activeTab === "all" || l.fw_rating === activeTab;
    const matchesSearch = !search || l.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    total: lenders.length,
    certified: lenders.filter((l) => l.fw_rating === "certified").length,
    flagged: lenders.filter((l) => l.fw_rating && l.fw_rating !== "certified").length,
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="border-b border-[var(--line)] bg-white">
        <InnerPageHeader
          eyebrow="Ratings"
          title="Lender Risk Index"
          description="Independent risk ratings for MCA lenders. Scored on complaints, litigation, contract terms, regulatory exposure, transparency, and stacking behavior."
        />
      </section>

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-10">
        <div className="mb-6 max-w-[560px] relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="var(--muted)"
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
            className="w-full h-[52px] pl-12 pr-4 text-[15px] outline-none border rounded"
            style={{
              fontFamily: "var(--font-sans)",
              background: "var(--white)",
              borderColor: "var(--line)",
              color: "var(--body)",
            }}
          />
        </div>

        <h2 className="mb-6 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
          Indexed lenders
        </h2>
        <div
          className="py-3 px-6 mb-6 flex items-center gap-4 text-[13px] border border-[var(--line)]"
          style={{ background: "var(--white)", fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          <span><strong style={{ color: "var(--body)" }}>{counts.total}</strong> Lenders Indexed</span>
          <span>·</span>
          <span><strong style={{ color: "var(--body)" }}>{counts.certified}</strong> Certified</span>
          <span>·</span>
          <span><strong style={{ color: "var(--body)" }}>{counts.flagged}</strong> Flagged</span>
        </div>

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
                borderBottom: activeTab === tab ? `3px solid ${TAB_BORDER_COLORS[tab]}` : "3px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

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
                  <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Lender Name</th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Grade</th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Risk Score</th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Lawsuits</th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Complaints</th>
                  <th className="px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Rating Tier</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => {
                  const gradeInfo = l.fw_risk_score !== null
                    ? scoreToGrade(l.fw_risk_score)
                    : l.fw_rating === "certified" ? { letter: "✓", tier: "Certified", bg: "#dcfce7", text: "#166534" }
                    : l.fw_rating === "caution"   ? { letter: "C", tier: "Caution",   bg: "#fef3c7", text: "#92400e" }
                    : l.fw_rating === "warning"   ? { letter: "D", tier: "Warning",   bg: "#ffedd5", text: "#9a3412" }
                    : l.fw_rating === "avoid"     ? { letter: "F", tier: "Avoid",     bg: "#fef2f2", text: "#991b1b" }
                    : null;
                  const isCertified = l.fw_rating === "certified";
                  return (
                    <tr
                      key={l.slug}
                      className="transition-colors hover:bg-[var(--bg)]"
                      style={{
                        borderBottom: "1px solid var(--line)",
                        background: isCertified ? "#f9fefb" : i % 2 === 1 ? "var(--bg)" : "var(--white)",
                        borderLeft: isCertified ? "3px solid #22c55e" : "3px solid transparent",
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
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-block text-[14px] font-bold w-8"
                          style={{ color: gradeInfo ? gradeInfo.text : "var(--muted)" }}
                        >
                          {gradeInfo ? gradeInfo.letter : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[18px] font-bold tabular-nums" style={{ color: gradeInfo ? gradeInfo.text : "var(--muted)" }}>
                          {l.fw_risk_score ?? "—"}
                        </span>
                        {l.fw_risk_score != null && (
                          <span className="text-[12px] ml-0.5" style={{ color: "var(--muted)" }}>/100</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-[14px]" style={{ color: "var(--body)" }}>
                        {l.lawsuit_count_verified ?? "—"}
                      </td>
                      <td className="px-4 py-4 text-[14px]" style={{ color: "var(--body)" }}>
                        {l.complaint_count ?? "—"}
                      </td>
                      <td className="px-4 py-4">
                        {gradeInfo ? (
                          <span
                            className="inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1"
                            style={{ background: gradeInfo.bg, color: gradeInfo.text }}
                          >
                            {gradeInfo.tier}
                          </span>
                        ) : (
                          <span className="text-[11px]" style={{ color: "var(--muted)" }}>Unrated</span>
                        )}
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

        <p className="mt-12 pt-8 border-t border-[var(--line)]">
          <Link
            href="/lender-risk-index/methodology"
            className="text-[14px] font-medium no-underline hover:opacity-80"
            style={{ color: "var(--blue)" }}
          >
            How we score lenders →
          </Link>
        </p>
      </div>
    </main>
  );
}
