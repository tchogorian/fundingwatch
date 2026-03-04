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
      className="section-white stats-bar"
      aria-label="Trust metrics"
    >
      <div className="stats-inner">
        {stats.map(({ value, label }, i) => (
          <div key={label} className="stat-cell">
            <p className="stat-value">{value}</p>
            <p className="stat-label">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
