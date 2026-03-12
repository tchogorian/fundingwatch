import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

/**
 * Sitemap for Google Search Console and other crawlers.
 * All URLs use production domain only (no VERCEL_URL).
 *
 * Included: home, blog index, all blog posts, questionnaire, questionnaire/results,
 * apr-calculator, glossary, sample-report, privacy, terms.
 *
 * Excluded (by design):
 * - /analyze — redirects to /#upload; no need to index redirect URL
 * - /results — post-upload results (session-based); disallowed in robots.txt
 * - /api/* — API routes; disallowed in robots.txt
 */
const SITEMAP_BASE = "https://www.fundingwatch.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITEMAP_BASE.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    // Home
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    // Main product / flows
    { url: `${base}/questionnaire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/questionnaire/results`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/apr-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Content
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sample-report`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Legal
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogPosts];
}
