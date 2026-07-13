export const ROUTE_LABELS: Record<string, string> = {
  "/": "Accueil",
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

export function getRouteLabel(pathname: string) {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];

  const lastSegment = pathname.split("/").filter(Boolean).pop();
  return lastSegment ? humanize(lastSegment) : ROUTE_LABELS["/"];
}

export function getRouteTrait(pathname: string): string | undefined {
  return ROUTE_TRAITS[pathname];
}
