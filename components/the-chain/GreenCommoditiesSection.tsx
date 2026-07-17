"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function GreenCommoditiesSection() {
  const t = useTranslations();
  const greenCommodities = t.theChain.greenCommodities;
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
        className="flex flex-col max-homesection:items-center justify-center gap-6 homesection:w-[42%] homesection:max-w-lg"
      >
        <div className="relative inline-block w-fit">
          <h2 className="font-lovelace text-base font-bold leading-none text-green xl:text-xl">
            {greenCommodities.eyebrow}
          </h2>
          <Trait
            ref={traitRef}
            src="TRAIT ECOSYTEME INTEGRE.svg"
            className="absolute right-0 top-full -mt-1 w-32 max-w-none xl:w-40"
          />
        </div>

        <h3 className="font-lovelace max-homesection:text-center text-2xl homesection:text-2xl font-bold leading-tight text-heading xl:text-2xl xl:pl-10">
          {greenCommodities.heading}
        </h3>

        <div className="flex flex-col gap-4 xl:pl-20">
          <p className="max-w-md max-homesection:text-center font-apparel text-xs xl:text-sm leading-snug text-body">
            {greenCommodities.paragraph1}
          </p>
          <p className="max-w-md max-homesection:text-center font-apparel text-xs xl:text-sm leading-snug text-body">
            {greenCommodities.paragraph2}
          </p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 min-[550px]:grid-cols-2 lg:grid-rows-2 gap-4 w-full lg:h-[75%] homesection:gap-6">
        <div
          ref={(el) => {
            if (el) imageRefs.current[0] = el;
          }}
          className="relative h-56 w-full lg:h-full lg:col-start-1 lg:row-start-1"
        >
          <Image
            src="/images/GREEN COMMODITIES INCRUSTATION.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 32vw, 90vw"
            className="object-contain object-bottom"
          />
        </div>

        <div
          ref={(el) => {
            if (el) imageRefs.current[1] = el;
          }}
          className="relative h-56 w-full lg:h-full lg:col-start-1 lg:row-start-2"
        >
          <Image
            src="/images/GREEN COMMODITIES INCRUSTATION 1.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 32vw, 90vw"
            className="object-contain object-top"
          />
        </div>

        <div
          ref={(el) => {
            if (el) imageRefs.current[2] = el;
          }}
          className="relative max-[550px]:hidden max-[550px]:h-72 w-full lg:h-full min-[550px]:col-start-2 min-[550px]:row-start-1 min-[550px]:row-span-2"
        >
          <Image
            src="/images/INCRUSTATION IMAGE PORTRAIT 4.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 22vw, 90vw"
            className="object-contain min-[550px]:object-cover"
          />
        </div>
      </div>
    </section>
  );
}
