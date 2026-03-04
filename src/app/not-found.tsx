import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20"
      style={{ background: "#FFFFFF" }}
    >
      <h1
        className="font-display text-4xl font-semibold md:text-5xl"
        style={{ color: "#0F172A" }}
      >
        404
      </h1>
      <p
        className="mt-2 text-lg"
        style={{ color: "#64748B" }}
      >
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[15px] font-medium transition focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2"
        style={{
          background: "#0D9488",
          color: "#FFFFFF",
        }}
      >
        Back to home
      </Link>
    </section>
  );
}
