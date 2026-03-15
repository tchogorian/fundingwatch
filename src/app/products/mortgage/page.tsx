import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InnerPageHeader from "@/components/InnerPageHeader";

export const metadata = {
  title: "Mortgage — Debtura",
  description: "Coming soon: Mortgage lending solutions through Debtura.",
};

export default function MortgageProductPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="border-b border-[var(--line)] bg-white">
        <InnerPageHeader
          eyebrow="Products"
          title="Mortgage"
          description="Coming soon. Debtura is expanding to mortgage lending solutions."
        />
      </section>

      <section className="border-b border-[var(--line)] bg-white py-11 px-6 md:px-8">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="mb-4 text-[22px] font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}>
            Stay Updated
          </h2>
          <p className="mb-8 text-[13px] font-light" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
            We&apos;re building mortgage solutions with the same transparency and independent rating system that powers our MCA platform.
          </p>
          <Link
            href="/questionnaire"
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
