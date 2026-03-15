"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36 px-4" style={{ background: "#f8fafb" }}>
      {/* Subtle background elements for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #1e5a8a 0%, transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }} />

        {/* Fine grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3a5c" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)"/>
        </svg>

        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px opacity-[0.06]"
          style={{ background: "linear-gradient(to right, transparent, #1e5a8a, transparent)" }} />
        <div className="absolute top-3/4 left-0 w-full h-px opacity-[0.04]"
          style={{ background: "linear-gradient(to right, transparent, #2a6a9e, transparent)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[720px] text-center">
        {/* Small label above headline */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-8"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#94a3b8" }}>
          MCA INTELLIGENCE & BROKERAGE
        </p>

        <h1
          className="text-[44px] leading-[1.08] md:text-[58px] font-normal"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: "#0f172a" }}
        >
          Funding, with
          <br />
          <span className="italic" style={{ color: "#2a6a9e" }}>confidence.</span>
        </h1>

        <p
          className="mt-8 text-[17px] leading-[1.7] max-w-[520px] mx-auto"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "#64748b" }}
        >
          Debtura analyzes lender risk, uncovers hidden terms, and connects
          businesses with better funding partners.
        </p>

        {/* Subtle divider */}
        <div className="mt-10 mx-auto w-12 h-px" style={{ background: "#d1d5db" }} />
      </div>
    </section>
  );
}
