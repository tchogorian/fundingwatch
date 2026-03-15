import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

/**
 * Sitemap for Google Search Console and other crawlers.
 * All URLs use production domain only (no VERCEL_URL).
 *
 * Includes:
 * - Static routes (home, LRI, methodology, intelligence index, tools, products, legal, etc.)
 * - All intelligence articles from BLOG_POSTS (/intelligence/[slug])
 * - Lender Risk Index lender detail pages (/lender-risk-index/[slug]), slugs from OPS API or fallback
 *
 * Excluded (by design):
 * - /analyze — redirects to /#upload
 * - /blog, /blog/[slug] — 301 to /intelligence and /intelligence/[slug]
 * - /lenders — redirects to /lender-risk-index
 * - /results — session-based; disallowed in robots.txt
 * - /api routes — disallowed in robots.txt
 */
const SITEMAP_BASE = "https://www.debtura.com";

const OPS_LENDERS_API = "https://ops.fundingwatch.org/api/lenders";

/** Fallback LRI slugs when OPS API is unavailable at build time (must match api/lenders fallback). */
const FALLBACK_LRI_SLUGS = ["kapitus", "coastal-capital", "lendora", "regal-capital"];

/** Static paths that have a corresponding page. Update when adding new indexable pages. */
const STATIC_ROUTES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/lender-risk-index", changeFrequency: "weekly", priority: 0.9 },
  { path: "/lender-risk-index/methodology", changeFrequency: "monthly", priority: 0.7 },
  { path: "/intelligence", changeFrequency: "weekly", priority: 0.8 },
  { path: "/questionnaire", changeFrequency: "monthly", priority: 0.8 },
  { path: "/apr-calculator", changeFrequency: "monthly", priority: 0.8 },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sample-report", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  // Products
  { path: "/products/merchant-cash-advance", changeFrequency: "weekly", priority: 0.9 },
  { path: "/products/mortgage", changeFrequency: "monthly", priority: 0.6 },
  { path: "/products/sba-loans", changeFrequency: "monthly", priority: 0.6 },
  // Tools
  { path: "/tools/contract-analyzer", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools/lender-matching", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools/mca-calculator", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/quick-assessment", changeFrequency: "monthly", priority: 0.8 },
];

async function getLenderRiskIndexSlugs(): Promise<string[]> {
  try {
    const res = await fetch(OPS_LENDERS_API, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return FALLBACK_LRI_SLUGS;
    const data = await res.json();
    const list = Array.isArray(data)
      ? data
      : Array.isArray((data as { lenders?: unknown[] }).lenders)
        ? (data as { lenders: unknown[] }).lenders
        : Array.isArray((data as { data?: unknown[] }).data)
          ? (data as { data: unknown[] }).data
          : [];
    const slugs = list
      .map((item: { slug?: string }) => (item && typeof item === "object" && typeof item.slug === "string" ? item.slug : null))
      .filter((s): s is string => Boolean(s));
    return slugs.length > 0 ? slugs : FALLBACK_LRI_SLUGS;
  } catch {
    return FALLBACK_LRI_SLUGS;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITEMAP_BASE.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const intelligenceEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/intelligence/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lriSlugs = await getLenderRiskIndexSlugs();
  const lriEntries: MetadataRoute.Sitemap = lriSlugs.map((slug) => ({
    url: `${base}/lender-risk-index/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...intelligenceEntries, ...lriEntries];
}
