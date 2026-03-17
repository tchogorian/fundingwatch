"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LenderDetail {
  id: number;
  name: string;
  grade: string;
  safety_score: string | null;
  score_regulatory: string | null;
  score_litigation: string | null;
  score_reputation: string | null;
  score_predatory: string | null;
  score_transparency: string | null;
  score_borrower_harm: string | null;
  key_flags: string[] | null;
  key_themes: string[] | null;
  overall_assessment: string | null;
  data_quality: string | null;
  bbb_rating: string | null;
  trustpilot_rating: number | null;
  trustpilot_reviews: number | null;
  lawsuit_count: number | null;
  courtlistener_cases: number | null;
  hard_cap_applied: string | null;
  scored_at: string | null;
}

const GRADE_STYLES: Record<string, { bg: string; color: string; border: string; label: string }> = {
  "A+": { bg: "#dcfce7", color: "#166534", border: "#22c55e", label: "EXCELLENT" },
  "A":  { bg: "#dcfce7", color: "#166534", border: "#22c55e", label: "STRONG" },
  "B+": { bg: "#dbeafe", color: "#1e40af", border: "#3b82f6", label: "GOOD" },
  "B":  { bg: "#dbeafe", color: "#1e40af", border: "#3b82f6", label: "GOOD" },
  "B-": { bg: "#eff6ff", color: "#1d4ed8", border: "#93c5fd", label: "FAIR" },
  "C+": { bg: "#fef3c7", color: "#92400e", border: "#f59e0b", label: "CAUTION" },
  "C":  { bg: "#fef3c7", color: "#92400e", border: "#f59e0b", label: "CAUTION" },
  "C-": { bg: "#ffedd5", color: "#9a3412", border: "#fb923c", label: "WARNING" },
  "D":  { bg: "#fee2e2", color: "#991b1b", border: "#f87171", label: "HIGH RISK" },
  "F":  { bg: "#fef2f2", color: "#7f1d1d", border: "#ef4444", label: "AVOID" },
  "NR": { bg: "#f1f5f9", color: "#64748b", border: "#cbd5e1", label: "NOT RATED" },
};

function scoreColor(score: number): string {
  if (score >= 75) return "#16a34a";
  if (score >= 55) return "#2563eb";
  if (score >= 35) return "#d97706";
  if (score >= 20) return "#ea580c";
  return "#dc2626";
}

function SubScoreBar({ label, value }: { label: string; value: string | null }) {
  const num = value !== null ? parseFloat(value) : null;
  if (num === null) return null;
  const color = scoreColor(num);
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: "var(--line)" }}>
      <span className="text-[13px] w-36 shrink-0" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--line)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(num, 100)}%`, background: color }} />
      </div>
      <span className="text-[13px] font-semibold tabular-nums w-8 text-right" style={{ color, fontFamily: "var(--font-sans)" }}>
        {num.toFixed(0)}
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
  const isOrange = !isRed && (f.includes("ag ") || f.includes("settlement") || f.includes("apr") || f.includes("coj"));
  const bg = isRed ? "#fef2f2" : isOrange ? "#fff7ed" : "#fefce8";
  const color = isRed ? "var(--red)" : isOrange ? "#c2410c" : "#92400e";
  const border = isRed ? "#fca5a5" : isOrange ? "#fdba74" : "#fde68a";
  return (
    <span
      className="inline-block text-[12px] font-medium px-2.5 py-1 border"
      style={{ background: bg, color, borderColor: border, fontFamily: "var(--font-sans)" }}
    >
      {stripEmoji(flag)}
    </span>
  );
}

export default function LenderDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [lender, setLender] = useState<LenderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/lenders/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((d) => setLender(d))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--line)", borderTopColor: "var(--blue)" }} />
          <p className="text-[14px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Loading…</p>
        </div>
      </main>
    );
  }

  if (error || !lender) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <p className="text-[18px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Lender not found</p>
        <Link href="/lender-risk-index" className="text-[13px] no-underline hover:opacity-80" style={{ color: "var(--blue)" }}>
          ← Back to Lender Risk Index
        </Link>
      </main>
    );
  }

  const gs = GRADE_STYLES[lender.grade] || GRADE_STYLES.NR;
  const safetyScore = lender.safety_score !== null ? parseFloat(lender.safety_score) : null;
  const cases = lender.courtlistener_cases ?? lender.lawsuit_count;
  const displayName = lender.name.replace(/\s*\(formerly[^)]*\)/gi, "").trim().replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-8 pt-10 pb-20">

        <Link
          href="/lender-risk-index"
          className="text-[13px] no-underline hover:opacity-80 transition-opacity"
          style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}
        >
          ← Lender Risk Index
        </Link>

        {/* ── Header ── */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[32px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
                {displayName}
              </h1>
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 border"
                style={{ background: gs.bg, color: gs.color, borderColor: gs.border, fontFamily: "var(--font-sans)" }}
              >
                Grade {lender.grade} — {gs.label}
              </span>
            </div>
            {lender.data_quality && (
              <p className="mt-2 text-[13px]" style={{ color: "var(--faint)", fontFamily: "var(--font-sans)" }}>
                Data quality: {lender.data_quality}
                {lender.scored_at && ` · Last scored ${new Date(lender.scored_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`}
              </p>
            )}
          </div>

          {safetyScore !== null && (
            <div className="flex flex-col items-center px-8 py-5 border shrink-0" style={{ background: "var(--white)", borderColor: "var(--line)", minWidth: 120 }}>
              <span className="text-[11px] uppercase tracking-wider font-medium mb-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                Safety Score
              </span>
              <span className="text-[48px] font-bold tabular-nums leading-none"
                style={{ color: scoreColor(safetyScore), fontFamily: "var(--font-sans)" }}>
                {safetyScore.toFixed(0)}
              </span>
              <span className="text-[13px] mt-1" style={{ color: "var(--faint)", fontFamily: "var(--font-sans)" }}>/100</span>
            </div>
          )}
        </div>

        <div className="my-8 h-px" style={{ background: "var(--line)" }} />

        {/* ── Key stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Court Cases", value: cases != null ? cases.toLocaleString() : "—", highlight: cases != null && cases >= 20 },
            { label: "BBB Rating", value: lender.bbb_rating ?? "—" },
            { label: "Trustpilot", value: lender.trustpilot_rating != null ? `${lender.trustpilot_rating}/5 (${lender.trustpilot_reviews?.toLocaleString()} reviews)` : "—" },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="py-4 px-5 border" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
              <div className="text-[11px] uppercase tracking-wider font-medium mb-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                {label}
              </div>
              <div className="text-[20px] font-bold" style={{ color: highlight ? "var(--red)" : "var(--body)", fontFamily: "var(--font-sans)" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Assessment ── */}
        {lender.overall_assessment && (
          <div className="mb-6 p-6 border" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}>
              Assessment
            </p>
            <p className="text-[15px] leading-[1.7]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
              {lender.overall_assessment}
            </p>
          </div>
        )}

        {/* ── Key flags ── */}
        {lender.key_flags && lender.key_flags.length > 0 && (
          <div className="mb-6 p-6 border relative" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--red)" }} />
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}>
              Documented Red Flags
            </p>
            <div className="flex flex-wrap gap-2">
              {lender.key_flags.map((flag) => (
                <FlagChip key={flag} flag={flag} />
              ))}
            </div>
          </div>
        )}

        {/* ── Key themes ── */}
        {lender.key_themes && lender.key_themes.length > 0 && (
          <div className="mb-6 p-6 border" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
              Key Findings
            </p>
            <ul className="space-y-2">
              {lender.key_themes.map((theme) => (
                <li key={theme} className="flex items-start gap-2 text-[14px] leading-[1.6]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
                  <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--red)" }} />
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Sub-scores ── */}
        <div className="mb-6 p-6 border" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            Score Breakdown
          </p>
          <SubScoreBar label="Regulatory" value={lender.score_regulatory} />
          <SubScoreBar label="Litigation" value={lender.score_litigation} />
          <SubScoreBar label="Reputation" value={lender.score_reputation} />
          <SubScoreBar label="Predatory Practices" value={lender.score_predatory} />
          <SubScoreBar label="Transparency" value={lender.score_transparency} />
          <SubScoreBar label="Borrower Harm" value={lender.score_borrower_harm} />
        </div>

        <Link
          href="/lender-risk-index/methodology"
          className="text-[13px] no-underline hover:opacity-80"
          style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}
        >
          How we calculate these scores →
        </Link>

      </div>
    </main>
  );
}
