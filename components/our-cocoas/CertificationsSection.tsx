"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

const LOGOS = [
  { src: "/images/LOGO_Plan de travail 1-1.png", alt: "ONCC-NCCB" },
  { src: "/images/LOGO_Plan de travail 1-2.png", alt: "CICC Cacao & Café" },
  { src: "/images/LOGO_Plan de travail 1-3.png", alt: "EUDR Compliant" },
  { src: "/images/LOGO_Plan de travail 1-4.png", alt: "Rainforest Alliance" },
] as const;

export function CertificationsSection() {
  const t = useTranslations();
  const certifications = t.ourCocoas.certifications;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const traitRef = useRef<TraitHandle>(null);

  useGSAP(
    () => {
      const targets = [leftRef.current, imageRef.current].filter(
        Boolean,
      ) as HTMLElement[];
      const isHorizontal = Boolean(containerAnimation);

      gsap.set(
        targets,
        isHorizontal ? { opacity: 0, x: 72 } : { opacity: 0, y: 32 },
      );

      const playReveal = () => {
        gsap
          .timeline()
          .to(targets, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.3,
            ease: "power4.out",
            stagger: 0.16,
          })
          .add(() => traitRef.current?.play(), "-=0.6");
      };

      if (containerAnimation) {
        playReveal();
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: playReveal,
      });
    },
    { scope: sectionRef, dependencies: [containerAnimation] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen homesection:h-dvh w-full flex-col gap-10 px-6 py-12 homesection:flex-row xl:gap-16 homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:items-center"
    >
      <div
        ref={leftRef}
        className="flex flex-col max-homesection:items-center justify-center gap-8 homesection:w-[42%] homesection:max-w-lg homesection:pl-16 xl:pl-24"
      >
        <div className="relative inline-block w-fit">
          <span className="italic outline-text text-2xl lg:text-3xl">
            {certifications.heading}
          </span>
          <Trait
            ref={traitRef}
            src="TRAIT 2.svg"
            className="absolute left-0 top-full -mt-5 w-full max-w-none xl:-mt-7 -z-1"
          />
        </div>

        <div className="flex flex-col max-homesection:items-center gap-6 homesection:flex-row homesection:items-center">
          <p className="max-w-xs max-homesection:text-center font-apparel text-xs xl:text-sm leading-snug text-body">
            {certifications.paragraph}
          </p>

        </div>
                  <div className="relative w-40 shrink-0 -rotate-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/100 POURCENT LOCAL.svg"
              alt="100% Local"
              className="w-full"
            />
          </div>

        <div className="flex flex-wrap items-center max-homesection:justify-center gap-6">
          {LOGOS.map((logo) => (
            <div key={logo.alt} className="relative max-[425px]:h-12 max-[425px]:w-12 h-16 w-16 xl:w-20 xl:h-20 shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-64 w-full homesection:h-full homesection:flex-1 homesection:overflow-visible">
        <div
          ref={imageRef}
          className="relative h-full w-full homesection:absolute homesection:inset-y-0 homesection:right-0 lg:w-[125%]"
        >
          <Image
            src="/images/CACAOO.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 60vw, 90vw"
            className="object-contain homesection:object-right"
          />

        </div>
      </div>
    </section>
  );
}
