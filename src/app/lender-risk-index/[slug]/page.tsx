"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import type { LenderDetail } from "@/types/lenders";

function ratingStyle(rating: string | undefined) {
  if (!rating) return { bg: "var(--color-bg-elevated)", color: "var(--color-text-secondary)" };
  const r = (rating || "").toLowerCase();
  if (r === "certified") return { bg: "var(--accent-green)", color: "#fff" };
  if (r === "caution") return { bg: "var(--accent-yellow)", color: "#000" };
  if (r === "warning") return { bg: "var(--warning)", color: "#fff" };
  if (r === "avoid") return { bg: "var(--danger)", color: "#fff" };
  return { bg: "var(--color-bg-elevated)", color: "var(--color-text-secondary)" };
}

export default function LenderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [lender, setLender] = useState<LenderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    params.then((p) => {
      if (cancelled) return;
      setSlug(p.slug);
      setLoading(true);
      setError(null);
      fetch(`/api/lenders/${encodeURIComponent(p.slug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          if (!data?.slug) {
            setError("Lender not found");
            setLender(null);
          } else {
            setLender(data as LenderDetail);
            setError(null);
          }
        })
        .catch((e) => {
          if (!cancelled) {
            setError(e?.message || "Failed to load lender");
            setLender(null);
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });
    return () => { cancelled = true; };
  }, [params]);

  if (loading || !slug) {
    return (
      <>
        <main className="min-h-screen px-4 py-16 flex items-center justify-center" style={{ background: "var(--color-bg-base)" }}>
          <Loader2 className="h-10 w-10 animate-spin" style={{ color: "var(--accent-blue)" }} aria-hidden />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !lender) {
    return (
      <>
        <main className="min-h-screen px-4 py-16" style={{ background: "var(--color-bg-base)" }}>
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>{error || "Lender not found."}</p>
            <Link
              href="/lender-risk-index"
              className="mt-6 inline-flex items-center gap-2 font-semibold"
              style={{ color: "var(--accent-blue)" }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Lender Risk Index
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const rating = lender.rating ?? lender.fw_rating;
  const style = ratingStyle(rating);
  const redFlags = lender.top_red_flags ?? (lender as { top_red_flags?: string[] }).top_red_flags ?? [];

  return (
    <>
      <main className="min-h-screen px-4 py-16 sm:px-6" style={{ background: "var(--color-bg-base)" }}>
        <div className="mx-auto max-w-[840px]">
          <Link
            href="/lender-risk-index"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8"
            style={{ color: "var(--accent-blue)" }}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Lender Risk Index
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                {lender.name}
              </h1>
              {rating && (
                <span
                  className="rounded-full px-4 py-1.5 text-sm font-semibold"
                  style={{ background: style.bg, color: style.color }}
                >
                  {rating}
                </span>
              )}
            </div>
            {lender.headline_stat && (
              <p className="mt-2 text-base" style={{ color: "var(--color-text-secondary)" }}>
                {lender.headline_stat}
              </p>
            )}
          </header>

          {lender.description && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>Overview</h2>
              <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{lender.description}</p>
            </section>
          )}

          {lender.primary_violation && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>Primary concerns</h2>
              <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{lender.primary_violation}</p>
            </section>
          )}

          {redFlags.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--color-text-primary)" }}>Top red flags</h2>
              <ul className="list-disc list-inside space-y-1" style={{ color: "var(--color-text-secondary)" }}>
                {redFlags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
            </section>
          )}

          {(lender.risk_score != null || lender.severity_score != null) && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>Risk score</h2>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {(lender.risk_score ?? lender.severity_score) ?? "—"} / 100
              </p>
            </section>
          )}

          <div className="pt-8 border-t" style={{ borderColor: "var(--color-border-default)" }}>
            <Link
              href="/#upload"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-95"
              style={{ background: "var(--accent-blue)" }}
            >
              Analyze My Contract
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
