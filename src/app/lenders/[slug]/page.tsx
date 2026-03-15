import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, AlertCircle, CheckCircle, Info, ArrowLeft, FileText } from "lucide-react";
import Footer from "@/components/Footer";

interface LenderDetail {
  id: number;
  name: string;
  slug: string;
  aliases: string[] | null;
  headquarters: string | null;
  lender_type: string | null;
  status: string | null;
  fw_rating: string | null;
  fw_risk_score: number | null;
  ucc_filing_count: number;
  lawsuit_count_verified: number;
  complaint_count: number;
  coj_usage: string | null;
  litigation_pattern: string | null;
  regulatory_action_count: number;
  red_flags: string[] | null;
  assessment: string | null;
  source_citations: Record<string, unknown> | null;
  last_updated: string;
}

const RATING_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType; description: string }> = {
  avoid:     { label: "Avoid",     color: "#DC2626", bg: "#FEF2F2", icon: AlertTriangle, description: "High lawsuit volume, COJ confirmed, documented harm to borrowers." },
  warning:   { label: "Warning",   color: "#D97706", bg: "#FFFBEB", icon: AlertCircle,   description: "Elevated filings or lawsuits. Material risk factors present." },
  caution:   { label: "Caution",   color: "#2563EB", bg: "#EFF6FF", icon: Info,          description: "Some risk signals. Review contract carefully." },
  certified: { label: "Certified", color: "#16A34A", bg: "#F0FDF4", icon: CheckCircle,   description: "Verified clean record. Meets FundingWatch transparency standards." },
};

async function getLender(slug: string): Promise<LenderDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.fundingwatch.org"}/api/lenders/${slug}`,
      { next: { revalidate: 300 } }
    );
    if (res.status === 404) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const lender = await getLender(params.slug);
  if (!lender) return { title: "Lender Not Found" };
  return {
    title: `${lender.name} MCA Review — FundingWatch Risk Index`,
    description: lender.assessment?.slice(0, 155) ?? `FundingWatch verified risk data for ${lender.name}: UCC filings, lawsuit history, and contract analysis.`,
  };
}

export default async function LenderDetailPage({ params }: { params: { slug: string } }) {
  const lender = await getLender(params.slug);
  if (!lender) notFound();

  const cfg = lender.fw_rating ? RATING_CONFIG[lender.fw_rating] : null;
  const Icon = cfg?.icon;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20"
        style={{ backgroundColor: "#1a1a2e" }}
      >
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/lenders"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Lender Risk Index
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1
                className="text-[28px] font-extrabold leading-tight tracking-tight text-white md:text-[38px] lg:text-[48px]"
                style={{ letterSpacing: "-0.04em" }}
              >
                {lender.name}
              </h1>
              {lender.headquarters && (
                <p className="mt-1 text-sm text-white/50">{lender.headquarters}</p>
              )}
              {lender.aliases && lender.aliases.length > 0 && (
                <p className="mt-1 text-xs text-white/40">
                  Also known as: {lender.aliases.join(", ")}
                </p>
              )}
            </div>

            {cfg && Icon && (
              <div
                className="shrink-0 rounded-xl px-5 py-3 text-center"
                style={{ background: cfg.bg }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" style={{ color: cfg.color }} aria-hidden />
                  <span className="text-lg font-extrabold" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
                <p className="mt-1 text-xs max-w-[200px]" style={{ color: cfg.color + "aa" }}>{cfg.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:flex lg:gap-10">
        {/* Main */}
        <div className="min-w-0 flex-1">

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
            {[
              { label: "UCC Filings", value: lender.ucc_filing_count.toLocaleString(), color: "#1a1a2e" },
              { label: "Lawsuits", value: lender.lawsuit_count_verified, color: lender.lawsuit_count_verified >= 20 ? "#DC2626" : "#1a1a2e" },
              { label: "Risk Score", value: lender.fw_risk_score !== null ? `${lender.fw_risk_score}/100` : "—", color: lender.fw_risk_score !== null && lender.fw_risk_score >= 80 ? "#DC2626" : "#1a1a2e" },
              { label: "Reg. Actions", value: lender.regulatory_action_count ?? 0, color: "#1a1a2e" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-[var(--color-border-default)] p-4"
                style={{ background: "var(--color-bg-surface)" }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-text-tertiary)" }}>{m.label}</div>
                <div className="text-2xl font-extrabold" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Risk score bar */}
          {lender.fw_risk_score !== null && (
            <div className="mb-8 rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-surface)" }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-tertiary)" }}>FundingWatch Risk Score</h2>
                <span className="text-xl font-extrabold" style={{ color: lender.fw_risk_score >= 80 ? "#DC2626" : lender.fw_risk_score >= 50 ? "#D97706" : "#2563EB" }}>
                  {lender.fw_risk_score}/100
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${lender.fw_risk_score}%`,
                    background: lender.fw_risk_score >= 80 ? "#DC2626" : lender.fw_risk_score >= 50 ? "#D97706" : "#2563EB",
                  }}
                />
              </div>
            </div>
          )}

          {/* Assessment */}
          {lender.assessment && (
            <div className="mb-8 rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-surface)" }}>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-tertiary)" }}>FundingWatch Assessment</h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-text-primary)" }}>{lender.assessment}</p>
            </div>
          )}

          {/* Red flags */}
          {lender.red_flags && lender.red_flags.length > 0 && (
            <div className="mb-8 rounded-xl border border-red-200 p-5 bg-red-50">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-red-700 mb-3">Documented Red Flags</h2>
              <ul className="space-y-2">
                {lender.red_flags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Litigation + COJ */}
          {(lender.litigation_pattern || lender.coj_usage) && (
            <div className="mb-8 rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-surface)" }}>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--color-text-tertiary)" }}>Litigation &amp; Contract Practices</h2>
              <div className="space-y-4">
                {lender.litigation_pattern && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-text-tertiary)" }}>Litigation Pattern</div>
                    <p className="text-sm" style={{ color: "var(--color-text-primary)" }}>{lender.litigation_pattern}</p>
                  </div>
                )}
                {lender.coj_usage && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-text-tertiary)" }}>Confession of Judgment Usage</div>
                    <p className="text-sm" style={{ color: "var(--color-text-primary)" }}>{lender.coj_usage}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Data sources */}
          {lender.source_citations && (
            <div className="mb-8 rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-surface)" }}>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-tertiary)" }}>Data Sources</h2>
              <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3" style={{ color: "var(--color-text-secondary)" }}>
                {Object.entries(lender.source_citations).map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-white border border-[var(--color-border-default)] px-3 py-2">
                    <div className="font-semibold text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--color-text-tertiary)" }}>{k.replace(/_/g, " ")}</div>
                    <div className="font-medium" style={{ color: "var(--color-text-primary)" }}>{String(v)}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                Last updated: {new Date(lender.last_updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-24 space-y-5">
            {/* CTA */}
            <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-surface)" }}>
              <FileText className="h-8 w-8 mb-3" style={{ color: "var(--color-accent-primary)" }} aria-hidden />
              <h3 className="font-bold text-base mb-2" style={{ color: "var(--color-text-primary)" }}>
                Have a contract with {lender.name}?
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                Upload it for a free analysis. We extract the APR, flag dangerous clauses, and cross-reference it against our lender database.
              </p>
              <Link
                href="/"
                className="block w-full rounded-xl py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: "var(--accent-blue)" }}
              >
                Analyze My Contract
              </Link>
            </div>

            {/* Back to index */}
            <Link
              href="/lenders"
              className="block rounded-xl border border-[var(--color-border-default)] p-4 text-sm font-medium transition hover:border-[var(--color-accent-primary)]"
              style={{ color: "var(--color-text-secondary)", background: "#fff" }}
            >
              ← Back to Lender Risk Index
            </Link>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}
