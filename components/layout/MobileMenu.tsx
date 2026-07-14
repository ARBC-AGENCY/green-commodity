"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { getRouteLabel, NAV_LEFT, NAV_RIGHT } from "@/lib/routes";
import type { Locale } from "@/lib/i18n/config";

const ALL_LINKS = [...NAV_LEFT, ...NAV_RIGHT];

export function MobileMenu({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = itemsRef.current?.querySelectorAll("[data-menu-item]") ?? [];

      if (open) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.07, delay: 0.2 },
        );
      } else {
        gsap.set(items, { opacity: 0, y: 18 });
      }
    },
    { scope: panelRef, dependencies: [open] },
  );

  return (
    <div
      ref={panelRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-green text-white transition-opacity duration-500 ease-out md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t.nav.closeMenu}
        className="absolute right-6 top-6 text-white transition-colors hover:text-orange"
      >
        <X size={28} />
      </button>

      <nav ref={itemsRef} className="flex flex-col items-center gap-7">
        {ALL_LINKS.map((href) => {
          const active = pathname === href;
          return (
            <TransitionLink
              key={href}
              href={href}
              onClick={onClose}
              data-menu-item
              className={`font-lovelace text-3xl font-medium tracking-wide transition-colors hover:text-orange ${
                active ? "text-orange" : "text-white"
              }`}
            >
              {getRouteLabel(href, locale).toUpperCase()}
            </TransitionLink>
          );
        })}
      </nav>

      <div data-menu-item>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
