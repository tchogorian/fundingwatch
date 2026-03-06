"use client";

const CLAUSES = [
  {
    heading: "Factor Rate",
    finePrint:
      "Fixed multiplier 1.25–1.50× applied to advance. Does not represent annualized rate.",
  },
  {
    heading: "Confession of Judgment",
    finePrint:
      "Funder may enter judgment in any court without prior notice or hearing.",
  },
  {
    heading: "Reconciliation",
    finePrint:
      "Available only if Merchant is in full compliance and not in default.",
  ],
] as const;

export default function HeroContractCard() {
  return (
    <div
      className="hero-contract-card w-full max-w-full lg:max-w-[420px]"
      style={{
        background: "#0F172A",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
      }}
      aria-hidden
    >
      {/* Card header */}
      <div
        className="border-b pb-3 mb-4"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.15em]"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Merchant Cash Advance Agreement
        </p>
      </div>

      {/* Clause rows */}
      <ul className="space-y-4">
        {CLAUSES.map((clause, i) => (
          <li key={i}>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-bold text-[14px]"
                style={{ color: "#FFFFFF" }}
              >
                {clause.heading}
              </span>
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded text-[14px] shrink-0"
                style={{ background: "#EF4444", color: "#FFFFFF", fontSize: "14px" }}
                aria-hidden
              >
                ⚠
              </span>
            </div>
            <p
              className="mt-1.5 font-mono text-[11px] leading-snug"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {clause.finePrint}
            </p>
          </li>
        ))}
      </ul>

      {/* Scan result bar */}
      <div
        className="hero-contract-card-scan mt-5 flex items-center gap-2 px-4 py-2.5"
        style={{
          marginLeft: -24,
          marginRight: -24,
          marginBottom: -24,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(239,68,68,0.1)",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full hero-contract-card-pulse"
          style={{ background: "#EF4444" }}
          aria-hidden
        />
        <span
          className="text-[12px] font-medium"
          style={{ color: "#EF4444" }}
        >
          3 high-risk clauses detected
        </span>
      </div>
    </div>
  );
}
