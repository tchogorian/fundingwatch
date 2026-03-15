import Link from "next/link";
import { BLOG_POSTS, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/blog";

export const revalidate = 0;

export default function IntelligencePage() {
  const articles = BLOG_POSTS;

  return (
    <main className="min-h-screen py-16 px-6 md:px-8" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-[720px]">
        <Link href="/" className="text-[13px] font-medium no-underline hover:opacity-80" style={{ color: "var(--blue)", fontFamily: "var(--font-sans)" }}>
          ← Back to Debtura
        </Link>
        <div className="mt-8 mb-2 flex items-center gap-2">
          <span className="h-0.5 w-5 shrink-0 rounded" style={{ background: "var(--red)" }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--red)" }}>Research</span>
        </div>
        <h1 className="text-[32px] md:text-[40px]" style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", fontWeight: 600 }}>
          Debtura Intelligence
        </h1>
        <p className="mt-3 text-[16px]" style={{ fontFamily: "var(--font-sans)", color: "var(--muted)" }}>
          Independent research on MCA lending — lender behavior, borrower outcomes, contract trends, and regulatory shifts.
        </p>
        <div className="mt-12 space-y-0 border border-[var(--line)]">
          {articles.map((post) => {
            const tagColor = CATEGORY_COLORS[post.category] ?? "var(--blue)";
            const dateFormatted = new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            return (
              <Link
                key={post.slug}
                href={`/intelligence/${post.slug}`}
                className="block p-6 no-underline transition-colors hover:bg-[var(--bg)] border-b border-[var(--line)] last:border-b-0 relative bg-white"
              >
                <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: tagColor }} />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--red)" }}>
                  {CATEGORY_LABELS[post.category]}
                </span>
                <h2 className="mt-2 text-[18px] font-semibold" style={{ fontFamily: "var(--font-sans)", color: "var(--body)" }}>
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-1.5 text-[14px] leading-[1.5] line-clamp-2" style={{ color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-2 block text-[13px]" style={{ color: "var(--muted)" }}>{dateFormatted}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
