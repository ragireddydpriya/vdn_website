/** 
 * Sitemap Generator for SEO
 * Place this in your scripts folder and run: node scripts/generate-sitemap.cjs
 * Outputs to: public/sitemap.xml
 */

const fs = require("fs");
const path = require("path");

// Define all URLs for your site
const pages = [
  {
    url: "https://www.vdnlandscapes.in/",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    url: "https://www.vdnlandscapes.in/products",
    changefreq: "weekly",
    priority: "0.9",
  },
  // Add product categories
  {
    url: "https://www.vdnlandscapes.in/products?category=plants",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    url: "https://www.vdnlandscapes.in/products?category=seeds",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    url: "https://www.vdnlandscapes.in/products?category=pots",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    url: "https://www.vdnlandscapes.in/products?category=planters",
    changefreq: "weekly",
    priority: "0.8",
  },
];

function generateSitemap() {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  )
  .join("")}
</urlset>`;

  const sitemapPath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemapXml.trim());
  console.log("✅ Sitemap generated:", sitemapPath);
}

generateSitemap();
