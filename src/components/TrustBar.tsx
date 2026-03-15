"use client";

const stats = [
  { value: "39+", label: "Lenders Analyzed" },
  { value: "2,400+", label: "UCC Filings Reviewed" },
  { value: "208+", label: "Contracts Analyzed" },
  { value: "6", label: "States Covered" },
];

export default function TrustBar() {
  return (
    <section className="py-10 px-4" style={{ background: "#fff" }} aria-label="Trust metrics">
      <div className="mx-auto max-w-[960px] rounded-2xl py-8 px-6"
        style={{ background: "#f8fafb", border: "1px solid #f0f4f8" }}>
        <div className="flex flex-wrap items-center justify-center gap-y-6">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center px-8 sm:px-12 ${
                i < stats.length - 1 ? "sm:border-r border-[#e2e8f0]" : ""
              }`}
            >
              <span
                className="text-[32px] tabular-nums tracking-tight"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, color: "#0f172a" }}
              >
                {value}
              </span>
              <span
                className="text-[12px] mt-1 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, color: "#94a3b8" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
