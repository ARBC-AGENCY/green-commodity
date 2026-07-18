"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { SocialLinks } from "@/components/home/SocialLinks";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function ImpactHeroSection() {
  const t = useTranslations();
  const hero = t.impact.hero;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const traitRef = useRef<TraitHandle>(null);

  useGSAP(
    () => {
      const targets = [
        imageColRef.current,
        headingRef.current,
        axisRef.current,
      ].filter(Boolean) as HTMLElement[];

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
          .add(() => traitRef.current?.play(), "-=0.5");
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
      className="relative flex w-full h-dvh justify-center shrink-0 flex-col gap-10 px-6 py-12 homesection:h-dvh homesection:w-screen homesection:flex-row homesection:items-center homesection:justify-center homesection:gap-12 homesection:overflow-hidden homesection:px-16 homesection:py-0 lg:gap-20 lg:px-24"
    >
      <div className="flex homesection:flex-1 flex-col max-homesection:items-center justify-center gap-10">
        <div className="relative inline-block w-fit">
          <h1
            ref={headingRef}
            className="font-lovelace max-homesection:text-center text-2xl homesection:text-2xl lg:text-3xl font-bold leading-none text-heading"
          >
            {hero.h1Prefix}{" "}
            <span className="relative italic outline-text">
              {hero.h1Emphasis}{" "}
              <Trait
                ref={traitRef}
                src="TRAIT ECOSYTEME INTEGRE.svg"
                className="absolute left-0 -z-1 top-full -mt-2 homesection:w-30 xl:-mt-5  max-w-none"
              />
            </span>{" "}
            {hero.h1Suffix}
            <br />
            {hero.h1Line2}
          </h1>
        </div>

        <div
          ref={axisRef}
          className="flex items-start gap-3 max-homesection:text-center max-homesection:justify-center xl:pl-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/CERCLE.svg"
            alt=""
            aria-hidden="true"
            className="mt-1.5 h-4 w-4 max-homesection:hidden shrink-0"
          />
          <div className="flex flex-col gap-1">
            <span className="font-lovelace text-sm font-bold leading-tight text-orange xl:text-base">
              {hero.axisLabel}
            </span>
            <span className="font-lovelace text-lg font-bold leading-tight text-green xl:text-xl">
              {hero.axisTitle}
            </span>
            <p className="max-w-sm font-apparel text-xs xl:text-sm leading-snug text-body mt-2">
              {hero.paragraph1}
            </p>
            <p className="max-w-sm font-apparel text-xs xl:text-sm leading-snug text-body mt-2">
              {hero.paragraph2}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={imageColRef}
        className="relative flex flex-col w-full homesection:h-3/5 homesection:w-[60%] xl:w-[50%]"
      >
        <div className="relative aspect-video homesection:aspect-auto homesection:flex-1">
          <Image
            src="/images/FRAME CHARTE SOCIALE.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 50vw, 90vw"
            className="object-contain"
          />
        </div>
      </div>

      <div
        ref={barRef}
        className="absolute inset-x-0 bottom-6 grid grid-cols-3 items-center gap-4 px-6 md:bottom-10 md:px-16 lg:px-24"
      >
        <SocialLinks
          labels={t.home.hero.social}
          className="justify-self-start"
        />
        <span className="max-[450px]:opacity-0 max-homesection:hidden justify-self-center font-apparel text-xs uppercase tracking-[0.25em] text-heading/70">
          {t.home.hero.slideHint}
        </span>
        <span />
      </div>
    </section>
  );
}
