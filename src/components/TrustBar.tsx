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
      className="border-y border-[var(--color-border-default)] py-5"
      style={{ background: "#FFFFFF" }}
      aria-label="Trust metrics"
    >
      <div className="mx-auto max-w-[var(--max-width-content)] px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center text-center md:border-r md:border-[var(--color-border-default)] md:last:border-r-0"
            >
              <span
                className="font-mono text-2xl font-medium"
                style={{ color: "var(--color-accent-primary)" }}
              >
                {value}
              </span>
              <span
                className="mt-1 text-[12px] uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
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
