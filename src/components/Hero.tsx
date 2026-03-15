"use client";

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 px-4" style={{ background: "#f8fafb" }}>
      <div className="mx-auto max-w-[720px] text-center">
        <h1
          className="text-[40px] leading-[1.1] md:text-[58px] font-normal"
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
          Debtura analyzes lender risk, uncovers hidden terms, and connects businesses with better funding partners.
        </p>
      </div>
    </section>
  );
}
