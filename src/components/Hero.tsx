"use client";

export default function Hero() {
  return (
    <section
      className="relative flex h-[420px] items-center overflow-hidden"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-bg.jpg)",
          backgroundPosition: "70% 60%",
          backgroundColor: "#0a0e14",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,.93) 32%, rgba(0,0,0,.55) 58%, rgba(0,0,0,.08) 82%, transparent 100%)",
        }}
      />
      <div
        className="relative z-10 max-w-[620px] px-6 md:px-10"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <h1
          className="mb-3.5 text-[40px] font-semibold leading-tight tracking-tight text-white"
          style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.3px" }}
        >
          debtura
        </h1>
        <p
          className="max-w-[560px] text-[15px] font-light leading-[1.7]"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Our analyst-driven lender ratings, contract analysis, and AI-powered matching provide critical intelligence — translating complexity into clarity so businesses can fund with conviction.
        </p>
      </div>
    </section>
  );
}
