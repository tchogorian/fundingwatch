import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

/** Production domain only — do not use VERCEL_URL or any env for sitemap URLs. */
const SITEMAP_BASE = "https://www.fundingwatch.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITEMAP_BASE.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/apr-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sample-report`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/questionnaire`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
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
