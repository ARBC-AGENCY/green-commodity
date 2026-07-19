import type { Metadata } from "next";
import type { Locale } from "./i18n/config";

/**
 * Single source of truth for the production domain and brand constants used
 * across metadata, the sitemap, robots.txt, and structured data. Change
 * SITE_URL here (or override it via the NEXT_PUBLIC_SITE_URL env var) once
 * the real domain is live — nothing else needs to change.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://greencommodities.com";

export const SITE_NAME = "Green Commodities";

export const SITE_DESCRIPTION_EN =
  "Green Commodities sources and exports premium Grade 1 Cameroonian cocoa for chocolate makers worldwide — traceable, EUDR-compliant, and sustainably grown with our partner producers.";

export const SITE_DESCRIPTION_FR =
  "Green Commodities sélectionne et exporte un cacao camerounais Grade 1 premium pour les maîtres chocolatiers du monde entier — traçable, conforme EUDR et cultivé durablement avec nos producteurs partenaires.";

export const SITE_LOGO_PATH =
  "/images/GREEN COMMODITIES LOGO_Plan de travail 1-1.png";

/**
 * Real social profile URLs go here once available — the placeholder links
 * currently wired into SocialLinks.tsx (linkedin.com, facebook.com,
 * tiktok.com homepages) are not the brand's actual profiles, so they're
 * intentionally left out of structured data until corrected.
 */
export const SITE_SOCIAL_PROFILES: string[] = [];

type PageCopy = { title: string; description: string };

/**
 * Builds a page's <title>/description in whichever language the visitor's
 * locale cookie resolves to, while keeping canonical/OG fixed to one URL —
 * see the "single-URL, one indexed language" tradeoff this site currently
 * accepts (no /fr /en path split, so bots always see the default locale).
 */
export function buildPageMetadata({
  path,
  locale,
  en,
  fr,
  noindex = false,
}: {
  path: string;
  locale: Locale;
  en: PageCopy;
  fr: PageCopy;
  noindex?: boolean;
}): Metadata {
  const copy = locale === "fr" ? fr : en;
  const url = `${SITE_URL}${path}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
    },
    twitter: {
      title: copy.title,
      description: copy.description,
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
