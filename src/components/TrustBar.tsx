"use client";

export default function TrustBar() {
  const stats = [
    { value: "14,847+", label: "Contracts Analyzed" },
    { value: "$534M", label: "NY MCA Settlement" },
    { value: "40–350%", label: "Typical APR Range" },
    { value: "50 States", label: "Borrowers Served" },
  ];

  return (
    <section
      className="section-white stats-bar border-t border-b border-[var(--border-light)]"
      aria-label="Trust metrics"
    >
      <div className="stats-inner mx-auto grid max-w-[1280px] grid-cols-2 gap-0 px-4 md:grid-cols-4 md:px-12"
      >
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className="stat-cell border-r border-[#E5E7EB] py-7 text-center last:border-r-0 max-md:border-b max-md:border-r-0 max-md:py-5 odd:max-md:border-r max-md:last:border-b-0"
          >
            <p className="stat-val font-mono text-[26px] font-semibold leading-tight" style={{ color: "#0B1F3A", letterSpacing: "-0.02em" }}>
              {value}
            </p>
            <p className="stat-lbl mt-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
