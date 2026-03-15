"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LenderDetail {
  slug: string;
  name: string;
  location: string | null;
  type: string | null;
  rating: string | null;
  risk_score: number | null;
  complaint_count: number | null;
  ucc_count: number | null;
  red_flags: string[] | null;
  positive_signals: string[] | null;
  messaging_kit: {
    state_opinions?: Array<{ state: string; summary: string }>;
    state_opinion_summary?: string;
  } | null;
}

const RATING_STYLES: Record<string, { bg: string; text: string; label: string; border: string }> = {
  certified: { bg: "#dcfce7", text: "#166534", label: "CERTIFIED", border: "#22c55e" },
  caution: { bg: "#fef3c7", text: "#92400e", label: "CAUTION", border: "#f59e0b" },
  warning: { bg: "#ffedd5", text: "#9a3412", label: "WARNING", border: "#f97316" },
  avoid: { bg: "#fef2f2", text: "#991b1b", label: "AVOID", border: "#ef4444" },
};

function scoreColor(score: number | null): string {
  if (score === null) return "#94a3b8";
  if (score <= 20) return "#22c55e";
  if (score <= 45) return "#f59e0b";
  if (score <= 70) return "#f97316";
  return "#ef4444";
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
      .then((data) => {
        setLender({
          slug: data.slug ?? data.id ?? slug,
          name: data.name ?? "",
          location: data.location ?? null,
          type: data.type ?? null,
          rating: data.rating ?? null,
          risk_score: typeof data.risk_score === "number" ? data.risk_score : null,
          complaint_count: typeof data.complaint_count === "number" ? data.complaint_count : null,
          ucc_count: typeof data.ucc_count === "number" ? data.ucc_count : null,
          red_flags: Array.isArray(data.red_flags) ? data.red_flags : null,
          positive_signals: Array.isArray(data.positive_signals) ? data.positive_signals : null,
          messaging_kit: data.messaging_kit ?? null,
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
        <p className="text-[18px] font-semibold" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
          Lender not found
        </p>
        <Link href="/lender-risk-index" className="text-[14px] no-underline hover:opacity-80" style={{ color: "var(--blue)" }}>
          ← Back to Lender Risk Index
        </Link>
      </main>
    );
  }

  const rs = RATING_STYLES[lender.rating || ""] || { bg: "#f0f4f8", text: "#687788", label: "UNRATED", border: "#cdd6df" };

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-8 pt-10 pb-20">

        {/* Breadcrumb */}
        <Link href="/lender-risk-index" className="text-[13px] no-underline hover:opacity-80 transition-opacity"
          style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
          ← Back to Lender Risk Index
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-[32px]"
                style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontWeight: 600 }}>
                {lender.name}
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-4 py-1.5 border-0"
                style={{ background: rs.bg, color: rs.text }}>
                {rs.label}
              </span>
            </div>
            <p className="mt-2 text-[14px]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
              {[lender.location, lender.type ? `${lender.type} lender` : null].filter(Boolean).join(" · ") || "—"}
            </p>
          </div>

          {/* Score display */}
          <div className="flex flex-col items-center px-8 py-5 border border-[var(--line)]" style={{ background: "var(--white)" }}>
            <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--muted)" }}>Risk Score</span>
            <span className="text-[48px] font-bold tabular-nums leading-none mt-1" style={{ color: scoreColor(lender.risk_score), fontFamily: "var(--font-sans)" }}>
              {lender.risk_score ?? "—"}
            </span>
            {lender.risk_score !== null && (
              <span className="text-[13px] mt-1" style={{ color: "var(--faint)" }}>/100</span>
            )}
            {lender.risk_score === null && lender.rating === "certified" && (
              <span className="text-[12px] mt-1" style={{ color: "#166534" }}>Meets all criteria</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: "var(--line)" }} />

        {/* Key metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Complaints", value: lender.complaint_count ?? "—" },
            { label: "UCC Filings", value: lender.ucc_count ?? "—" },
            { label: "Red Flags", value: lender.red_flags?.length ?? 0 },
            { label: "Rating", value: rs.label },
          ].map(({ label, value }) => (
            <div key={label} className="py-4 px-5 border border-[var(--line)]" style={{ background: "var(--white)" }}>
              <div className="text-[11px] uppercase tracking-wider font-medium" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                {label}
              </div>
              <div className="text-[22px] font-bold mt-1 tabular-nums" style={{ color: "var(--body)", fontFamily: "var(--font-sans)" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Red Flags */}
        {lender.red_flags && lender.red_flags.length > 0 && (
          <div className="mb-8 p-6 border border-[var(--line)] relative" style={{ background: "var(--white)" }}>
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--red)" }} />
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Red Flags</span>
            </div>
            <h3 className="mb-4 text-[14px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>Red Flags</h3>
            <div className="flex flex-wrap gap-2">
              {lender.red_flags.map((flag) => (
                <span key={flag} className="text-[13px] font-medium px-3 py-1.5 border-0" style={{ background: "#fef2f2", color: "var(--red)" }}>
                  {flag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Positive Signals */}
        {lender.positive_signals && lender.positive_signals.length > 0 && (
          <div className="mb-8 p-6 border border-[var(--line)] relative" style={{ background: "var(--white)" }}>
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--green)" }} />
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--green)" }} />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--green)" }}>Positive Signals</span>
            </div>
            <h3 className="mb-4 text-[14px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>Positive Signals</h3>
            <div className="flex flex-wrap gap-2">
              {lender.positive_signals.map((signal) => (
                <span key={signal} className="text-[13px] font-medium px-3 py-1.5 border-0" style={{ background: "#dcfce7", color: "#166534" }}>
                  {signal}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Court Opinions */}
        {lender.messaging_kit?.state_opinions && lender.messaging_kit.state_opinions.length > 0 && (
          <div className="mb-8 p-6 border border-[var(--line)] relative" style={{ background: "var(--white)" }}>
            <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: "var(--blue)" }} />
            <div className="mb-2 flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--blue)" }} />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--blue)" }}>Legal & Regulatory</span>
            </div>
            <h3 className="mb-4 text-[14px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>Legal & Regulatory</h3>
            {lender.messaging_kit.state_opinion_summary && (
              <p className="text-[14px] leading-[1.6] mb-4" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                {lender.messaging_kit.state_opinion_summary}
              </p>
            )}
            <div className="space-y-3">
              {lender.messaging_kit.state_opinions.map((op, i) => (
                <div key={i} className="py-3 border-t border-[var(--line)]">
                  <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    {op.state}
                  </span>
                  <p className="mt-1 text-[14px] leading-[1.5]" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    {op.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 py-8 px-8 text-center border border-[var(--line)]" style={{ background: "var(--navy)" }}>
          <p className="text-[20px]" style={{ fontFamily: "var(--font-serif)", color: "var(--white)" }}>
            Want better terms?
          </p>
          <p className="mt-2 text-[14px]" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-sans)" }}>
            Apply through Debtura and get matched with vetted lenders.
          </p>
          <Link href="/#application"
            className="inline-block mt-5 px-8 py-3 text-[14px] font-semibold no-underline transition-opacity hover:opacity-90 border-0"
            style={{ background: "var(--white)", color: "var(--body)", fontFamily: "var(--font-sans)" }}>
            Apply Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
