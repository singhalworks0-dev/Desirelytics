// Generates public/sitemap.xml from the app's known routes before every build.
// Run manually anytime with: node scripts/generate-sitemap.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://desirelytics.com"; // 👈 update if the live domain is different
const WP_URL = "https://blog.desirelytics.com/wp-json/wp/v2";

// Static routes — keep this in sync with src/routes/AppRoutes.jsx
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly" },
  { path: "/case-studies", priority: "0.8", changefreq: "monthly" },

  { path: "/development/web-design", priority: "0.7", changefreq: "monthly" },
  { path: "/development/app-development", priority: "0.7", changefreq: "monthly" },
  { path: "/development/adult-website-development", priority: "0.7", changefreq: "monthly" },

  { path: "/local/uk", priority: "0.6", changefreq: "monthly" },
  { path: "/local/dubai", priority: "0.6", changefreq: "monthly" },
  { path: "/local/portugal", priority: "0.6", changefreq: "monthly" },
  { path: "/local/usa", priority: "0.6", changefreq: "monthly" },
  { path: "/local/australia", priority: "0.6", changefreq: "monthly" },
  { path: "/local/germany", priority: "0.6", changefreq: "monthly" },

  { path: "/services/affiliate-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/ai-companion-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/category-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/content-marketing", priority: "0.7", changefreq: "monthly" },
  { path: "/services/directory-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/link-building", priority: "0.7", changefreq: "monthly" },
  { path: "/services/live-content-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/local-reach-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/marketplace-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/niche-ecommerce-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/platform-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/programmatic-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/retail-seo", priority: "0.7", changefreq: "monthly" },
  { path: "/services/streaming-site-seo", priority: "0.7", changefreq: "monthly" },

  { path: "/contact", priority: "0.6", changefreq: "yearly" },
  { path: "/free-audit", priority: "0.8", changefreq: "yearly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
];

async function getBlogSlugs() {
  // Skip while the WordPress URL is still the placeholder value.
  if (!WP_URL || WP_URL.includes("yourblog.com")) return [];

  try {
    const res = await fetch(`${WP_URL}/posts?per_page=100&_fields=slug,modified`);
    if (!res.ok) return [];
    const posts = await res.json();
    return posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.modified?.slice(0, 10) }));
  } catch {
    console.warn("⚠️  Could not fetch blog posts for sitemap — continuing without them.");
    return [];
  }
}

function buildXml(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq || "monthly"}</changefreq>
    <priority>${r.priority || "0.5"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const blogRoutes = await getBlogSlugs();
const xml = buildXml([...staticRoutes, ...blogRoutes]);
const outPath = path.join(__dirname, "..", "public", "sitemap.xml");

fs.writeFileSync(outPath, xml);
console.log(`✅ sitemap.xml written with ${staticRoutes.length + blogRoutes.length} URLs → ${outPath}`);