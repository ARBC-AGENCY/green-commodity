export const ROUTE_LABELS: Record<string, string> = {
  "/": "Accueil",
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
