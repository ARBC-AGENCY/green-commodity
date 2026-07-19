"use client";

import { useTranslations } from "@/components/i18n/LocaleProvider";

export function ComingSoonSection() {
  const t = useTranslations();

  return (
    <section className="flex min-h-screen w-full flex-1 items-center justify-center px-6 py-12">
      <h1 className="font-lovelace text-3xl font-bold text-heading xl:text-5xl">
        {t.blog.comingSoon}
      </h1>
    </section>
  );
}
