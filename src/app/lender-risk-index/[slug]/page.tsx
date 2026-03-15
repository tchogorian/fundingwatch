"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LenderDetail {
  slug: string;
  name: string;
  headquarters: string | null;
  lender_type: string | null;
  fw_rating: string;
  fw_risk_score: number | null;
  complaint_count: number | null;
  ucc_filing_count: number;
  lawsuit_count_verified: number;
  red_flags: string[] | null;
  assessment: string | null;
  coj_usage: string | null;
  litigation_pattern: string | null;
  regulatory_action_count: number;
  source_citations: Record<string, unknown> | null;
  last_updated: string | null;
}

const RATING_STYLES: Record<string, { bg: string; text: string; label: string; border: string }> = {
  certified: { bg: "#dcfce7", text: "#166534", label: "CERTIFIED", border: "#22c55e" },
  caution:   { bg: "#fef3c7", text: "#92400e", label: "CAUTION",   border: "#f59e0b" },
  warning:   { bg: "#ffedd5", text: "#9a3412", label: "WARNING",   border: "#f97316" },
  avoid:     { bg: "#fef2f2", text: "#991b1b", label: "AVOID",     border: "#ef4444" },
};

function scoreColor(score: number | null): string {
  if (score === null) return "#94a3b8";
  if (score <= 20) return "#22c55e";
  if (score <= 45) return "#f59e0b";
  if (score <= 70) return "#f97316";
  return "#ef4444";
}

function Stat({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="py-4 px-5 border border-[var(--line)]" style={{ background: "var(--white)" }}>
      <div className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
        {label}
      </div>
      <div className="text-[22px] font-bold mt-1 tabular-nums" style={{ color: highlight ? "var(--red)" : "var(--body)", fontFamily: "var(--font-sans)" }}>
        {value}
      </div>
    </div>
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
      .then((d) => {
        setLender({
          slug: d.slug ?? slug,
          name: d.name ?? "",
          headquarters: d.headquarters ?? null,
          lender_type: d.lender_type ?? null,
          fw_rating: d.fw_rating != null && d.fw_rating !== "unrated" ? String(d.fw_rating).toLowerCase() : "unrated",
          fw_risk_score: typeof d.fw_risk_score === "number" ? d.fw_risk_score : null,
          complaint_count: typeof d.complaint_count === "number" ? d.complaint_count : null,
          ucc_filing_count: d.ucc_filing_count ?? 0,
          lawsuit_count_verified: d.lawsuit_count_verified ?? 0,
          red_flags: Array.isArray(d.red_flags) ? d.red_flags : null,
          assessment: d.assessment ?? null,
          coj_usage: d.coj_usage ?? null,
          litigation_pattern: d.litigation_pattern ?? null,
          regulatory_action_count: d.regulatory_action_count ?? 0,
          source_citations: d.source_citations ?? null,
          last_updated: d.last_updated ?? null,
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <p className="text-[15px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>Loading...</p>
      </main>
    );
  }

  if (error || !lender) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <p className="text-[18px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>Lender not found</p>
        <Link href="/lender-risk-index" className="text-[14px] no-underline hover:opacity-80" style={{ color: "var(--blue)" }}>
          ← Back to Lender Risk Index
        </Link>
      </main>
    );
  }

  const rs = RATING_STYLES[lender.fw_rating] || { bg: "#f0f4f8", text: "#687788", label: "UNRATED", border: "#cdd6df" };
  const subtitle = [lender.headquarters, lender.lender_type ? `${lender.lender_type} lender` : null].filter(Boolean).join(" · ");

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-8 pt-10 pb-20">

        <Link href="/lender-risk-index" className="text-[13px] no-underline hover:opacity-80 transition-opacity"
          style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
          ← Lender Risk Index
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-[32px]" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontWeight: 600 }}>
                {lender.name}
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-4 py-1.5"
                style={{ background: rs.bg, color: rs.text }}>
                {rs.label}
              </span>
            </div>
            {subtitle && (
              <p className="mt-2 text-[14px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center px-8 py-5 border border-[var(--line)]" style={{ background: "var(--white)", minWidth: 130 }}>
            <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--muted)" }}>Risk Score</span>
            <span className="text-[48px] font-bold tabular-nums leading-none mt-1"
              style={{ color: scoreColor(lender.fw_risk_score), fontFamily: "var(--font-sans)" }}>
              {lender.fw_risk_score ?? "—"}
            </span>
            {lender.fw_risk_score !== null && (
              <span className="text-[13px] mt-1" style={{ color: "var(--faint)" }}>/100</span>
            )}
          </div>
        </div>

        <div className="my-8 h-px" style={{ background: "var(--line)" }} />

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Stat label="Lawsuits" value={lender.lawsuit_count_verified} highlight={lender.lawsuit_count_verified >= 20} />
          <Stat label="UCC Filings" value={lender.ucc_filing_count.toLocaleString()} />
          <Stat label="Complaints" value={lender.complaint_count ?? "—"} />
          <Stat label="Reg. Actions" value={lender.regulatory_action_count} />
        </div>

        {/* Assessment */}
        {lender.assessment && (
          <div className="mb-8 p-6 border border-[var(--line)]" style={{ background: "var(--white)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}>
              Assessment
            </p>
            <p className="text-[15px] leading-[1.7]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
              {lender.assessment}
            </p>
          </div>
        )}

        {/* Red Flags */}
        {lender.red_flags && lender.red_flags.length > 0 && (
          <div className="mb-8 p-6 border border-[var(--line)] relative" style={{ background: "var(--white)" }}>
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--red)" }} />
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}>
              Documented Red Flags
            </p>
            <div className="flex flex-wrap gap-2">
              {lender.red_flags.map((flag) => (
                <span key={flag} className="text-[13px] font-medium px-3 py-1.5"
                  style={{ background: "#fef2f2", color: "var(--red)", fontFamily: "var(--font-sans)" }}>
                  {flag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Litigation & COJ */}
        {(lender.litigation_pattern || lender.coj_usage) && (
          <div className="mb-8 p-6 border border-[var(--line)]" style={{ background: "var(--white)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}>
              Litigation &amp; Contract Practices
            </p>
            <div className="space-y-4">
              {lender.litigation_pattern && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    Litigation Pattern
                  </p>
                  <p className="text-[14px] leading-[1.6]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
                    {lender.litigation_pattern}
                  </p>
                </div>
              )}
              {lender.coj_usage && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    Confession of Judgment
                  </p>
                  <p className="text-[14px] leading-[1.6]" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
                    {lender.coj_usage}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Data Sources */}
        {lender.source_citations && Object.keys(lender.source_citations).length > 0 && (
          <div className="mb-8 p-6 border border-[var(--line)]" style={{ background: "var(--white)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
              Data Sources
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(lender.source_citations).map(([k, v]) => (
                <div key={k} className="px-3 py-2 border border-[var(--line)]" style={{ background: "var(--bg)" }}>
                  <div className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    {k.replace(/_/g, " ")}
                  </div>
                  <div className="text-[14px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
                    {String(v)}
                  </div>
                </div>
              ))}
            </div>
            {lender.last_updated && (
              <p className="mt-3 text-[12px]" style={{ color: "var(--faint)", fontFamily: "var(--font-sans)" }}>
                Last updated: {new Date(lender.last_updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 py-8 px-8 text-center border border-[var(--line)]" style={{ background: "var(--navy)" }}>
          <p className="text-[20px]" style={{ fontFamily: "var(--font-serif)", color: "var(--white)" }}>
            Have a contract with {lender.name}?
          </p>
          <p className="mt-2 text-[14px]" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}>
            Upload it free — get APR, red flags, and COJ detection in under 30 seconds.
          </p>
          <Link href="/#upload"
            className="inline-block mt-5 px-8 py-3 text-[14px] font-semibold no-underline transition-opacity hover:opacity-90"
            style={{ background: "var(--white)", color: "var(--body)", fontFamily: "var(--font-sans)" }}>
            Analyze My Contract →
          </Link>
        </div>

      </div>
    </main>
  );
}
