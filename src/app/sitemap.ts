import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

/**
 * Sitemap for Google Search Console and other crawlers.
 * All URLs use production domain only (no VERCEL_URL).
 *
 * Static routes below must match actual app routes. Update when adding new indexable pages.
 * Blog URLs are derived from BLOG_POSTS (same source as app/blog/[slug]/page.tsx).
 *
 * Excluded (by design):
 * - /analyze — redirects to /#upload
 * - /results — session-based; disallowed in robots.txt
 * - /api routes — disallowed in robots.txt
 */
const SITEMAP_BASE = "https://www.fundingwatch.org";

/** Static paths that have a corresponding page. Update when adding new indexable pages. */
const STATIC_ROUTES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/questionnaire", changeFrequency: "monthly", priority: 0.8 },
  { path: "/questionnaire/results", changeFrequency: "monthly", priority: 0.5 },
  { path: "/apr-calculator", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sample-report", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITEMAP_BASE.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
