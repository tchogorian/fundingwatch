import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "SBA Loans — Debtura",
  description: "Coming soon: SBA loan solutions through Debtura.",
};

export default function SBALoansProductPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="lri-hero relative overflow-hidden border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1160px] px-6 md:px-8 py-16 md:py-20">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Products</span>
          </div>
          <h1 className="lri-hero-title mb-4" style={{ fontFamily: "var(--font-serif)", color: "white" }}>
            SBA Loans
          </h1>
          <p className="lri-hero-sub max-w-[640px]" style={{ fontFamily: "var(--font-sans)" }}>
            Coming soon. Debtura is expanding to SBA loan solutions.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="mb-4 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Stay Updated
          </h2>
          <p className="mb-8 text-[13px] font-light" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            We&apos;re building SBA loan solutions with the same transparency and independent rating system that powers our MCA platform.
          </p>
          <Link
            href="/#application"
            className="inline-flex items-center gap-2 px-6 py-3 text-[10.5px] font-bold uppercase tracking-wider rounded"
            style={{ background: "var(--blue)", color: "var(--white)", fontFamily: "var(--font-sans)" }}
          >
            Get Notified
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
