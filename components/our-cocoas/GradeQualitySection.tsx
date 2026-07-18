"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function GradeQualitySection() {
  const t = useTranslations();
  const gradeQuality = t.ourCocoas.gradeQuality;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const traitRef = useRef<TraitHandle>(null);

  useGSAP(
    () => {
      const targets = [leftRef.current, ...imageRefs.current].filter(
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
      className="relative flex min-h-screen homesection:h-dvh w-full flex-col gap-10 px-6 py-12 homesection:flex-row xl:gap-24 homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:items-center xl:px-24"
    >
      <div
        ref={leftRef}
        className="flex flex-col max-homesection:items-center justify-center gap-6 homesection:w-[38%] homesection:max-w-md"
      >
        <h2 className="font-lovelace max-homesection:text-center text-xl lg:text-2xl font-bold leading-tight text-heading">
          {gradeQuality.h1Line1}

          <br />
          {gradeQuality.h1Line3}
          <br />

          {gradeQuality.h1Line5}
        </h2>

        <p className="max-w-md max-homesection:text-center font-apparel text-xs xl:text-sm leading-snug text-body">
          {gradeQuality.paragraph}
        </p>
      </div>

      <div className="flex flex-1 max-homesection:flex-col sm:gap-6 w-full homesection:h-[65%]">
        <div
          ref={(el) => {
            if (el) imageRefs.current[0] = el;
          }}
          className="relative flex-1 w-full sm:flex-3 homesection:h-full"
        >
          <Image
            src="/images/GREEN COMMODITIES INCRUSTATION 4.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 30vw, 90vw"
            className="object-contain"
          />
        </div>

        <div
          ref={(el) => {
            if (el) imageRefs.current[1] = el;
          }}
          className="relative flex-1 w-full sm:flex-2 homesection:h-full"
        >
          <Image
            src="/images/GREEN FARMERS INCRUSTATION 4.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 20vw, 90vw"
            className="object-contain max-sm:object-top "
          />
        </div>
      </div>
    </section>
  );
}
