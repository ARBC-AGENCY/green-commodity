import type { Metadata } from "next";
import { ComingSoonSection } from "@/components/blog/ComingSoonSection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/blog",
    locale,
    noindex: true,
    en: {
      title: "Blog & News",
      description: "Green Commodities news and articles are coming soon.",
    },
    fr: {
      title: "Blog et Actualités",
      description: "Les actualités Green Commodities arrivent bientôt.",
    },
  });
}

export default function BlogPage() {
  return <ComingSoonSection />;
}
