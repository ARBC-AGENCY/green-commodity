"use client";

import { locales } from "@/lib/i18n/config";
import { useLocale, useTranslations } from "./LocaleProvider";

const LOCALE_LABELS: Record<(typeof locales)[number], string> = {
  en: "EN",
  fr: "FR",
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  return (
    <div
      role="group"
      aria-label={t.languageSwitcher.label}
      className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/80 p-1 text-xs font-medium backdrop-blur dark:border-white/15 dark:bg-black/60"
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
            locale === code
              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black"
              : "text-zinc-600 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10"
          }`}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
