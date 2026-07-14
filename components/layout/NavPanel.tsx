// src/components/layout/NavPanel.tsx
"use client";

import { useRef, useEffect } from "react";
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

export function NavPanel({
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

  // Lock page scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Stagger the links in every time the panel opens
  useGSAP(
    () => {
      const items =
        itemsRef.current?.querySelectorAll("[data-menu-item]") ?? [];
      if (open) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.25, // wait for panel slide to mostly finish
          },
        );
      } else {
        gsap.set(items, { opacity: 0, x: 40 });
      }
    },
    { scope: panelRef, dependencies: [open] },
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-500 panel:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sliding panel */}
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col justify-center gap-10 bg-[#25292b] px-10 text-white transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] panel:hidden sm:max-w-md ${
          open ? "translate-x-0" : "translate-x-full"
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

        <nav ref={itemsRef} className="flex flex-col gap-3 sm:gap-5">
          {ALL_LINKS.map((href) => {
            const active = pathname === href;
            return (
              <TransitionLink
                key={href}
                href={href}
                onClick={onClose}
                data-menu-item
                className={`font-lovelace text-2xl md:text-2xl font-medium tracking-wide transition-colors hover:text-orange ${
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
    </>
  );
}
