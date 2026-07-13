const STORAGE_KEY = "gc-intro-seen-at";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function hasSeenIntroRecently() {
  if (typeof window === "undefined") return true;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  const seenAt = Number(raw);
  if (Number.isNaN(seenAt)) return false;

  return Date.now() - seenAt < TTL_MS;
}

export function markIntroSeen() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
}
