import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Blog is intentionally excluded — it's noindexed while it's a "coming soon"
// placeholder with no real content (see app/blog/page.tsx).
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/our-story", priority: 0.8 },
  { path: "/the-chain", priority: 0.8 },
  { path: "/our-cocoas", priority: 0.8 },
  { path: "/impact", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
  { path: "/order", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
