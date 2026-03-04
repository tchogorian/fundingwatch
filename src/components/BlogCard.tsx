import Link from "next/link";
import {
  BLOG_POSTS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type BlogPost,
  type BlogCategory,
} from "@/lib/blog";

const CATEGORY_BADGE_CLASS: Record<BlogCategory, string> = {
  "contract-analysis": "badge badge-danger",
  "mca-basics": "badge badge-safe",
  "borrower-rights": "badge badge-warning",
  "lender-profiles": "badge",
  "industry-news": "badge",
  "state-guides": "badge",
  "tools-resources": "badge",
  "case-studies": "badge",
};

function getCategoryBadgeStyle(category: BlogCategory): React.CSSProperties {
  if (category === "contract-analysis") return {};
  const color = CATEGORY_COLORS[category];
  return {
    background: `${color}20`,
    borderColor: `${color}50`,
    color,
  };
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const isRedFlag = post.category === "contract-analysis";
  const badgeClass = CATEGORY_BADGE_CLASS[post.category];
  const badgeStyle = isRedFlag ? {} : getCategoryBadgeStyle(post.category);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group flex min-h-[220px] flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-border)] hover:shadow-[var(--shadow-md)]"
      style={{ background: "var(--color-bg-surface)" }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`${badgeClass} shrink-0`}
          style={badgeStyle}
        >
          {CATEGORY_LABELS[post.category]}
        </span>
        <span
          className="font-mono text-[var(--text-xs)]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
      <h3
        className="mt-3 font-display text-[22px] leading-snug transition-colors group-hover:underline"
        style={{
          color: "var(--color-text-primary)",
          textDecorationColor: "var(--color-accent-primary)",
        }}
      >
        {post.title}
      </h3>
      <p
        className="mt-2 line-clamp-2 flex-1 text-[var(--text-base)] leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {post.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span
          className="text-[14px] font-medium transition-colors group-hover:underline"
          style={{
            color: "var(--color-accent-primary)",
            textDecorationColor: "var(--color-accent-primary)",
          }}
        >
          → Read Article
        </span>
        <span
          className="text-[var(--text-sm)]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {post.readTimeMinutes} min read
        </span>
      </div>
    </Link>
  );
}
