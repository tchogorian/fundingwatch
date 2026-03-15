"use client";

// Real numbers from database — update with actuals from blue data pull
const stats = [
  { value: "39+", label: "Lenders Analyzed" },
  { value: "12,000+", label: "UCC Filings Reviewed" },
  { value: "1,700+", label: "Contracts Analyzed" },
  { value: "50", label: "States Covered" },
];

export default function TrustBar() {
  return (
    <section className="py-10 px-4 bg-white" aria-label="Trust metrics">
      <div className="mx-auto max-w-[900px] flex flex-wrap items-center justify-center gap-y-6">
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={`flex flex-col items-center px-6 sm:px-8 ${i < stats.length - 1 ? "sm:border-r border-[#e2e8f0]" : ""}`}
          >
            <span
              className="text-[28px] tabular-nums"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, color: "#0f172a" }}
            >
              {value}
            </span>
            <span
              className="text-[13px] mt-0.5"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 400, color: "#94a3b8" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
