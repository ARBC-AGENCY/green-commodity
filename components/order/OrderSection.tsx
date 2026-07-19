"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { OrderForm } from "./OrderForm";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@greencommodities.com";

const iconLinkClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-orange/60 text-orange transition-colors hover:border-orange hover:text-orange";

export function OrderSection() {
  const t = useTranslations();
  const order = t.order;
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 32,
        duration: 1.1,
        ease: "power4.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center gap-12 px-6 py-16 homesection:flex-row homesection:items-center homesection:justify-center homesection:gap-16 homesection:px-16 xl:px-24"
    >
      <div className="flex shrink-0 flex-col gap-4 max-homesection:items-center homesection:sticky homesection:top-16">
        <div className="max-homesection:h-24"></div>
        <h1 className="font-lovelace max-homesection:space-x-2 text-xl font-bold leading-tight text-heading">
          <span>{order.contactHeadingLine1}</span>
          <br className="max-homesection:hidden" />
         <span>{order.contactHeadingLine2}</span> 
        </h1>
        <div className="flex items-center gap-3">
          <a
            href={
              WHATSAPP_NUMBER
                ? `https://wa.me/${WHATSAPP_NUMBER}`
                : `mailto:${CONTACT_EMAIL}`
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label={order.whatsappLabel}
            className={iconLinkClass}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.44 1.32 4.94L2 22l5.2-1.36a9.96 9.96 0 0 0 4.84 1.24h.01c5.52 0 10-4.48 10-10s-4.49-9.88-10.01-9.88zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.09.81.82-3-.2-.31a8.2 8.2 0 1 1 6.95 3.83zm4.5-6.13c-.25-.12-1.45-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28z" />
            </svg>
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            target="_blank"
            aria-label={order.emailLabel}
            className={iconLinkClass}
          >
            <Mail size={16} />
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/svg/TRAIT 4.svg"
          alt=""
          aria-hidden="true"
          className="w-32 max-w-none xl:w-40"
        />
      </div>

      <OrderForm />
    </section>
  );
}
