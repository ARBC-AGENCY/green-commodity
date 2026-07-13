"use client";

import { useTranslations } from "@/components/i18n/LocaleProvider";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
        {t.home.heading}
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {t.home.body}
      </p>
    </div>
  );
}
