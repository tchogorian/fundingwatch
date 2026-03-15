"use client";

export default function SecondaryCTA() {
  const scrollToApplication = () => {
    document.getElementById("application")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-16 px-4 sm:px-6 text-center"
      style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #1e5a8a 50%, #2a6a9e 100%)" }}
      aria-label="Call to action"
    >
      <div className="mx-auto max-w-[640px]">
        <h2
          className="text-[32px] font-normal text-white"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Your next MCA should cost less.
        </h2>
        <p
          className="mt-4 text-[16px] leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "rgba(255,255,255,0.7)" }}
        >
          Apply in 2 minutes. We&apos;ll call you with options.
        </p>
        <button
          type="button"
          onClick={scrollToApplication}
          className="mt-10 rounded-[12px] font-semibold text-[15px] py-4 px-8 transition hover:opacity-95 border-0 cursor-pointer"
          style={{
            background: "#fff",
            color: "#0f172a",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Submit Your Application
        </button>
      </div>
    </section>
  );
}
