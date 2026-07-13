import "server-only";
import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

/** Resolves the locale for the current request: explicit cookie override
 * first (set when the user picks a language via the switcher), otherwise
 * the browser's Accept-Language preference, otherwise the default. */
export async function getInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = (await headers()).get("accept-language");
  if (acceptLanguage) {
    for (const part of acceptLanguage.split(",")) {
      const tag = part.split(";")[0]?.trim().toLowerCase();
      const base = tag?.split("-")[0];
      if (isLocale(base)) return base;
    }
  }

  return defaultLocale;
}
