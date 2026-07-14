import type { Locale } from "./i18n/config";
import { dictionaries } from "./i18n/dictionaries";

/** Per-locale label for a route, used for breadcrumbs and transition text. */
export const ROUTE_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    "/": dictionaries.en.common.home,
    "/our-story": dictionaries.en.nav.ourStory,
    "/the-chain": dictionaries.en.nav.theChain,
    "/our-cocoas": dictionaries.en.nav.ourCocoas,
    "/impact": dictionaries.en.nav.impact,
    "/gallery": dictionaries.en.nav.gallery,
    "/blog": dictionaries.en.nav.blog,
    "/order": dictionaries.en.nav.order,
  },
  fr: {
    "/": dictionaries.fr.common.home,
    "/our-story": dictionaries.fr.nav.ourStory,
    "/the-chain": dictionaries.fr.nav.theChain,
    "/our-cocoas": dictionaries.fr.nav.ourCocoas,
    "/impact": dictionaries.fr.nav.impact,
    "/gallery": dictionaries.fr.nav.gallery,
    "/blog": dictionaries.fr.nav.blog,
    "/order": dictionaries.fr.nav.order,
  },
};

/** Filename (in public/SVG) of the trait/underline brush to draw under a
 * destination's label during a page transition. Routes with no entry get
 * no underline. */
export const ROUTE_TRAITS: Record<string, string> = {
  "/": "TRAIT 2.svg",
};

/** Primary nav, split either side of the centered logo. */
export const NAV_LEFT = ["/", "/our-story", "/the-chain", "/our-cocoas"] as const;
export const NAV_RIGHT = ["/impact", "/gallery", "/blog", "/order"] as const;

function humanize(segment: string) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getRouteLabel(pathname: string, locale: Locale) {
  const labels = ROUTE_LABELS[locale];
  if (labels[pathname]) return labels[pathname];

  const lastSegment = pathname.split("/").filter(Boolean).pop();
  return lastSegment ? humanize(lastSegment) : labels["/"];
}

export function getRouteTrait(pathname: string): string | undefined {
  return ROUTE_TRAITS[pathname];
}
