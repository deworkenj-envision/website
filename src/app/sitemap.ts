import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.APP_URL || "http://localhost:3000";
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/products/premium-business-cards`, priority: 0.9 },
    { url: `${base}/editor`, priority: 0.7 },
    { url: `${base}/admin`, priority: 0.4 },
  ];
}
