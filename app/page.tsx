"use client";

import { useTranslations } from "@/components/i18n/LocaleProvider";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold text-heading">{t.home.heading}</h1>
      <p className="max-w-md text-lg leading-8 text-body">{t.home.body}</p>
    </div>
  );
}
