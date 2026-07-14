"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { getRouteLabel, NAV_LEFT, NAV_RIGHT } from "@/lib/routes";
import type { Locale } from "@/lib/i18n/config";
import { MobileMenu } from "./MobileMenu";

const navLinkClass =
  "font-apparel text-xs font-normal tracking-wide text-heading transition-colors hover:text-orange";

function NavLinks({ paths, locale }: { paths: readonly string[]; locale: Locale }) {
  const pathname = usePathname();

  return (
    <>
      {paths.map((href) => {
        const active = pathname === href;
        return (
          <TransitionLink
            key={href}
            href={href}
            className={`${navLinkClass} ${active ? "text-orange" : ""}`}
          >
            {getRouteLabel(href, locale).toUpperCase()}
          </TransitionLink>
        );
      })}
    </>
  );
}

export function Header() {
  const { locale } = useLocale();
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const homeLabel = getRouteLabel("/", locale);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b ">
      {/* Mobile row */}
      <div className="flex items-center justify-between px-6 py-4 md:hidden">
        <TransitionLink href="/" aria-label={homeLabel}>
          <Image
            src="/images/GREEN COMMODITIES LOGO_Plan de travail 1-1.png"
            alt="Green Commodity"
            width={676}
            height={145}
            className="h-7 w-auto"
            priority
          />
        </TransitionLink>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label={t.nav.openMenu}
          aria-expanded={mobileOpen}
          className="text-heading transition-colors hover:text-orange"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Desktop row */}
      <div className="mx-auto hidden max-w-[90%] grid-cols-[1fr_auto_1fr] items-center gap-6 px-10 py-6 md:grid">
        <nav className="flex items-center justify-self-start gap-8">
          <NavLinks paths={NAV_LEFT} locale={locale} />
        </nav>

        <TransitionLink href="/" aria-label={homeLabel} className="justify-self-center">
          <Image
            src="/images/GREEN COMMODITIES LOGO_Plan de travail 1-1.png"
            alt="Green Commodity"
            width={676}
            height={145}
            className="h-9 w-auto"
            priority
          />
        </TransitionLink>

        <div className="flex items-center justify-self-end gap-8">
          <nav className="flex items-center gap-8">
            <NavLinks paths={NAV_RIGHT} locale={locale} />
          </nav>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} locale={locale} />
    </header>
  );
}
