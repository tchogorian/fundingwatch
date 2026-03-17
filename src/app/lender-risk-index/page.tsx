"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

interface Lender {
  id: number;
  name: string;
  name_normalized: string;
  grade: string;
  safety_score: number | null;
  key_flags: string[] | null;
  overall_assessment: string | null;
  data_quality: string | null;
  courtlistener_cases: number | null;
  lawsuit_count: number | null;
}

const GRADE_ORDER: Record<string, number> = {
  F: 1, D: 2, "C-": 3, C: 4, "C+": 5,
  "B-": 6, B: 7, "B+": 8, A: 9, "A+": 10, NR: 11,
};

function gradeGroup(g: string): string {
  if (g === "A+" || g === "A") return "A";
  if (g === "B+" || g === "B" || g === "B-") return "B";
  if (g === "C+" || g === "C" || g === "C-") return "C";
  if (g === "D") return "D";
  if (g === "F") return "F";
  return "NR";
}

function GradeBadge({ grade }: { grade: string }) {
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    "A+": { bg: "#dcfce7", color: "#166534", border: "#22c55e" },
    A:    { bg: "#dcfce7", color: "#166534", border: "#22c55e" },
    "B+": { bg: "#dbeafe", color: "#1e40af", border: "#3b82f6" },
    B:    { bg: "#dbeafe", color: "#1e40af", border: "#3b82f6" },
    "B-": { bg: "#eff6ff", color: "#1d4ed8", border: "#93c5fd" },
    "C+": { bg: "#fef3c7", color: "#92400e", border: "#f59e0b" },
    C:    { bg: "#fef3c7", color: "#92400e", border: "#f59e0b" },
    "C-": { bg: "#ffedd5", color: "#9a3412", border: "#fb923c" },
    D:    { bg: "#fee2e2", color: "#991b1b", border: "#f87171" },
    F:    { bg: "#fef2f2", color: "#7f1d1d", border: "#ef4444" },
    NR:   { bg: "#f1f5f9", color: "#64748b", border: "#cbd5e1" },
  };
  const s = styles[grade] || styles.NR;
  return (
    <span
      className="inline-flex items-center justify-center text-[13px] font-bold px-2.5 py-1 min-w-[44px] text-center border"
      style={{ background: s.bg, color: s.color, borderColor: s.border, fontFamily: "var(--font-sans)" }}
    >
      {grade}
    </span>
  );
}

function ScoreBar({ score }: { score: number | null }) {
  if (score === null || score === undefined) {
    return <span className="text-[13px]" style={{ color: "var(--faint)" }}>—</span>;
  }
  const color =
    score >= 75 ? "#22c55e" :
    score >= 55 ? "#3b82f6" :
    score >= 35 ? "#f59e0b" :
    score >= 20 ? "#f97316" : "#ef4444";
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--line)" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(score, 100)}%`, background: color }}
        />
      </div>
      <span className="text-[13px] font-semibold tabular-nums w-7 text-right" style={{ color, fontFamily: "var(--font-sans)" }}>
        {score.toFixed(0)}
      </span>
    </div>
  );
}

function stripEmoji(str: string) {
  return str.replace(/[^\x00-\x7F]/g, "").trim();
}

function FlagChip({ flag }: { flag: string }) {
  const f = flag.toLowerCase();
  const isRed = f.includes("ban") || f.includes("ftc") || f.includes("criminal") || f.includes("fraud") || f.includes("4000");
  const isOrange = !isRed && (f.includes("ag ") || f.includes("lawsuit") || f.includes("apr") || f.includes("coj") || f.includes("settlement"));
  const bg = isRed ? "#fef2f2" : isOrange ? "#fff7ed" : "#fefce8";
  const color = isRed ? "var(--red)" : isOrange ? "#c2410c" : "#92400e";
  const border = isRed ? "#fca5a5" : isOrange ? "#fdba74" : "#fde68a";
  return (
    <span
      className="inline-block text-[11px] font-medium px-2 py-0.5 border whitespace-nowrap"
      style={{ background: bg, color, borderColor: border, fontFamily: "var(--font-sans)" }}
    >
      {stripEmoji(flag)}
    </span>
  );
}

type SortCol = "safety_score" | "courtlistener_cases";
type SortDir = "asc" | "desc";

export default function LenderRiskIndexPage() {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [sortCol, setSortCol] = useState<SortCol>("safety_score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    fetch("/api/lenders")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data.lenders ?? []);
        setLenders(list);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => ({
    total: lenders.length,
    graded: lenders.filter((l) => l.grade !== "NR").length,
    danger: lenders.filter((l) => l.grade === "F").length,
    safe: lenders.filter((l) => l.grade === "A" || l.grade === "A+").length,
  }), [lenders]);

  const filtered = useMemo(() => {
    let data = lenders.filter((l) => {
      if (gradeFilter !== "ALL" && gradeGroup(l.grade) !== gradeFilter) return false;
      if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    data = [...data].sort((a, b) => {
      if (sortCol === "safety_score") {
        const av = a.safety_score ?? (sortDir === "asc" ? Infinity : -Infinity);
        const bv = b.safety_score ?? (sortDir === "asc" ? Infinity : -Infinity);
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const av = (a.courtlistener_cases ?? a.lawsuit_count ?? 0);
      const bv = (b.courtlistener_cases ?? b.lawsuit_count ?? 0);
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return data;
  }, [lenders, gradeFilter, search, sortCol, sortDir]);

  function toggleSort(col: SortCol) {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("desc");
    }
  }

  const GRADE_PILLS = [
    { label: "All", value: "ALL" },
    { label: "A / A+", value: "A" },
    { label: "B range", value: "B" },
    { label: "C range", value: "C" },
    { label: "D", value: "D" },
    { label: "F — Danger", value: "F" },
    { label: "Not Rated", value: "NR" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Hero ── */}
      <div className="border-b" style={{ borderColor: "var(--line)", background: "var(--white)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 pt-14 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-0.5 w-5 rounded shrink-0" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}>
              Independent Research
            </span>
          </div>
          <h1
            className="text-[36px] md:text-[48px] font-semibold leading-tight mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
          >
            MCA Lender Risk Index
          </h1>
          <p className="text-[16px] leading-[1.7] max-w-[560px] mb-10" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            Independent ratings across litigation history, regulatory actions, predatory practices,
            and borrower harm. No paid placements. No affiliate relationships.
          </p>

          {!loading && !error && (
            <div className="flex gap-10 flex-wrap">
              {[
                { num: stats.total, label: "Lenders tracked", color: "var(--body)" },
                { num: stats.graded, label: "Fully graded", color: "var(--body)" },
                { num: stats.danger, label: "Confirmed predators (F)", color: "var(--red)" },
                { num: stats.safe, label: "Clean operators (A / A+)", color: "#166534" },
              ].map(({ num, label, color }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[28px] font-bold tabular-nums leading-none" style={{ color, fontFamily: "var(--font-sans)" }}>{num}</span>
                  <span className="text-[13px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="sticky top-[60px] z-40 border-b" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-3 flex items-center gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search lender name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded text-[14px] px-3 py-2 outline-none flex-1 min-w-[160px] max-w-[320px]"
            style={{
              borderColor: "var(--line)",
              background: "var(--bg)",
              color: "var(--body)",
              fontFamily: "var(--font-sans)",
            }}
          />
          <div className="flex gap-2 flex-wrap">
            {GRADE_PILLS.map(({ label, value }) => {
              const active = gradeFilter === value;
              return (
                <button
                  key={value}
                  onClick={() => setGradeFilter(value)}
                  className="text-[12px] font-semibold px-3 py-1.5 border transition-all"
                  style={{
                    background: active ? "var(--navy)" : "transparent",
                    color: active ? "var(--white)" : "var(--muted)",
                    borderColor: active ? "var(--navy)" : "var(--line)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          {!loading && (
            <span className="ml-auto text-[13px] shrink-0" style={{ color: "var(--faint)", fontFamily: "var(--font-sans)" }}>
              {filtered.length} lender{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-8">
        <div className="border" style={{ borderColor: "var(--line)", background: "var(--white)" }}>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--line)", borderTopColor: "var(--blue)" }} />
              <p className="text-[14px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Loading lender data…</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-[15px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Failed to load lender data.</p>
              <button onClick={() => window.location.reload()} className="mt-3 text-[13px] underline" style={{ color: "var(--blue)" }}>Retry</button>
            </div>
          )}

          {!loading && !error && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    Lender
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    Grade
                  </th>
                  <th
                    className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider cursor-pointer select-none hidden sm:table-cell"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}
                    onClick={() => toggleSort("safety_score")}
                  >
                    Safety Score {sortCol === "safety_score" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider hidden lg:table-cell" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    Top Flags
                  </th>
                  <th
                    className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider cursor-pointer select-none hidden md:table-cell"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}
                    onClick={() => toggleSort("courtlistener_cases")}
                  >
                    Cases {sortCol === "courtlistener_cases" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                      No lenders match your search.
                    </td>
                  </tr>
                )}
                {filtered.map((l) => {
                  const cases = l.courtlistener_cases ?? l.lawsuit_count;
                  const flags = (l.key_flags ?? []).slice(0, 3);
                  return (
                    <tr
                      key={l.id}
                      className="border-b hover:bg-[var(--bg)] transition-colors cursor-pointer"
                      style={{ borderColor: "var(--line)" }}
                      onClick={() => { window.location.href = `/lender-risk-index/${l.id}`; }}
                    >
                      <td className="px-4 py-4">
                        <div className="text-[14px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
                          {l.name.replace(/\s*\(formerly[^)]*\)/gi, "").trim().replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())}
                        </div>
                        {l.overall_assessment && (
                          <div className="text-[12px] mt-0.5 line-clamp-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                            {l.overall_assessment.slice(0, 80)}{l.overall_assessment.length > 80 ? "…" : ""}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <GradeBadge grade={l.grade} />
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <ScoreBar score={l.safety_score !== null ? parseFloat(String(l.safety_score)) : null} />
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell max-w-[260px]">
                        <div className="flex flex-wrap gap-1">
                          {flags.length > 0
                            ? flags.map((f) => <FlagChip key={f} flag={f} />)
                            : <span className="text-[12px]" style={{ color: "var(--faint)" }}>No major flags</span>
                          }
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell text-[13px] tabular-nums" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                        {cases != null ? cases.toLocaleString() : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Links ── */}
        <div className="mt-4 flex gap-4 flex-wrap">
          <Link href="/lender-risk-index/methodology" className="text-[13px] no-underline hover:opacity-80" style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}>
            How we score →
          </Link>
          <Link href="/analyze" className="text-[13px] no-underline hover:opacity-80" style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}>
            Free contract analysis →
          </Link>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="border-t py-12 px-6 text-center" style={{ borderColor: "var(--line)", background: "var(--navy)" }}>
        <p className="text-[22px] font-semibold mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--white)" }}>
          Have a contract with one of these lenders?
        </p>
        <p className="text-[15px] mb-6" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-sans)" }}>
          Upload it free — get APR, red flags, and COJ detection in under 30 seconds.
        </p>
        <Link
          href="/analyze"
          className="inline-block px-8 py-3 text-[14px] font-semibold no-underline transition-opacity hover:opacity-90"
          style={{ background: "var(--white)", color: "var(--body)", fontFamily: "var(--font-sans)" }}
        >
          Analyze My Contract →
        </Link>
      </div>

    </main>
  );
}
