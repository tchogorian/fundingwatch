import Link from "next/link";

export default function LenderRiskIndexPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-[560px] w-full text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)", fontFamily: "var(--font-sans)" }}>
            Coming Soon
          </span>
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
        </div>
        <h1
          className="text-[36px] md:text-[44px] font-semibold leading-tight mt-4"
          style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
        >
          Lender Risk Index
        </h1>
        <p
          className="mt-4 text-[16px] leading-[1.7]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          We&rsquo;re building independent risk ratings for every major MCA lender —
          scored on litigation history, UCC filings, contract terms, COJ usage, and
          regulatory exposure. No review sites. No paid placements.
        </p>
        <p
          className="mt-3 text-[15px]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}
        >
          Check back soon.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] font-semibold no-underline hover:opacity-80 transition-opacity"
            style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}
          >
            ← Back to Debtura
          </Link>
        </div>
      </div>
    </main>
  );
}
