import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20"
      style={{ background: "var(--bg)", fontFamily: "var(--font-sans)" }}
    >
      <h1
        className="text-4xl font-semibold md:text-5xl"
        style={{ fontFamily: "var(--font-serif)", color: "var(--navy)" }}
      >
        404
      </h1>
      <p
        className="mt-2 text-lg"
        style={{ color: "var(--muted)" }}
      >
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-5 py-3 text-[13px] font-semibold uppercase tracking-wider transition-colors"
        style={{
          background: "var(--blue)",
          color: "var(--white)",
        }}
      >
        Back to Debtura
      </Link>
    </section>
  );
}
