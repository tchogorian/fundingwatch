import type { MetadataRoute } from "next";

const SITEMAP_BASE = "https://www.debtura.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers on public pages
      { userAgent: "*", allow: "/", disallow: ["/api/", "/results"] },
      // Explicitly allow common AI / LLM crawlers (they respect robots.txt)
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/results"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/", "/results"] },
      { userAgent: "Claude-Web", allow: "/", disallow: ["/api/", "/results"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/results"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/results"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/results"] },
      { userAgent: "Anthropic-AI", allow: "/", disallow: ["/api/", "/results"] },
    ],
    sitemap: `${SITEMAP_BASE}/sitemap.xml`,
    host: SITEMAP_BASE,
  };
}
