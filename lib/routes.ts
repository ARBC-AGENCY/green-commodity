import type { Locale } from "./i18n/config";
import { dictionaries } from "./i18n/dictionaries";

/** Per-locale label for a route, used for breadcrumbs and transition text. */
export const ROUTE_LABELS: Record<Locale, Record<string, string>> = {
  en: { "/": dictionaries.en.common.home },
  fr: { "/": dictionaries.fr.common.home },
};

/** Filename (in public/SVG) of the trait/underline brush to draw under a
 * destination's label during a page transition. Routes with no entry get
 * no underline. */
export const ROUTE_TRAITS: Record<string, string> = {
  "/": "TRAIT 2.svg",
};

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
