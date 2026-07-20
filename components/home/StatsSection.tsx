"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "./HorizontalScrollSections";

const STAT_ITEMS = [
  {
    value: "3",
    brush: "CHIFFRE 3.svg",
    image: "/images/IMG CERCLE_4_Plan de travail 1.webp",
  },
  {
    value: "+250",
    brush: "CHIFFRE 3.svg",
    image: "/images/IMG CERCLE_2_Plan de travail 1.webp",
  },
  {
    value: "100%",
    brush: "CHIFFRE 3.svg",
    image: "/images/IMG CERCLE_5_Plan de travail 1.webp",
  },
  {
    value: "+25",
    brush: "CHIFFRE 3.svg",
    image: "/images/IMG CERCLE_3_Plan de travail 1.webp",
  },
  {
    value: "<7%",
    brush: "CHIFFRE 3.svg",
    image: "/images/IMG CERCLE_Plan de travail 1.webp",
  },
] as const;

export function StatsSection() {
  const t = useTranslations();
  const stats = t.home.stats;
  const { containerAnimation, resolved } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingTraitRef = useRef<TraitHandle>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const brushTraitRefs = useRef<TraitHandle[]>([]);

  useGSAP(
    () => {
      const targets = [headingRef.current, ...cardRefs.current].filter(
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
          .add(() => headingTraitRef.current?.play(), "-=0.9")
          .add(
            () => brushTraitRefs.current.forEach((trait) => trait?.play()),
            "-=0.6",
          );
      };

      if (!resolved) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        containerAnimation: containerAnimation ?? undefined,
        start: isHorizontal ? "left 80%" : "top 80%",
        once: true,
        onEnter: playReveal,
      });
    },
    { scope: sectionRef, dependencies: [containerAnimation, resolved] },
  );

  const renderStatCard = (
    item: (typeof STAT_ITEMS)[number],
    idx: number,
    text: string,
  ) => (
    <div
      key={item.value}
      ref={(el) => {
        if (el) cardRefs.current[idx] = el;
      }}
      className="flex items-center gap-4"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden homesection:h-28 homesection:w-28 lg:w-38 lg:h-38 xl:w-48 xl:h-48 2xl:h-58 2xl:w-58">
        <Image src={item.image} alt="" fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="relative inline-flex h-10 items-center xl:h-12">
          <Trait
            ref={(el) => {
              if (el) brushTraitRefs.current[idx] = el;
            }}
            src={item.brush}
            className="absolute left-0 h-full w-auto max-w-none"
          />
          <span className="relative z-10 pl-3 font-lovelace text-2xl font-bold italic text-green xl:text-3xl">
            {item.value}
          </span>
        </div>
        <p className="max-w-[16rem] font-apparel text-sm leading-snug text-body">
          {text}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full h-dvh shrink-0 flex-col justify-center  gap-10 px-6 py-12 homesection:w-screen homesection:overflow-hidden homesection:px-16 lg:gap-5 lg:px-24"
    >
      <div ref={headingRef} className="flex flex-col gap-1">
        <h2 className="font-lovelace text-2xl font-bold leading-tight text-heading xl:text-3xl">
          {stats.headingLine1}
        </h2>
        <div className="relative inline-block w-fit pb-3">
          <span className="outline-text text-3xl italic tracking-wider xl:text-4xl">
            {stats.headingLine2}
          </span>
          <Trait
            ref={headingTraitRef}
            src="TRAIT 2.svg"
            className="absolute left-0 top-full -mt-6 homesection:-mt-6 w-2/3 max-w-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-10 homesection:w-full lg:w-[95%] 2xl:w-[95%] homesection:self-center-safe xl:gap-y-14">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 xl:flex xl:flex-row w-full xl:w-[75%] xl:self-center-safe  gap-x-12 homesection:flex-row xl:justify-center">
          {STAT_ITEMS.slice(0, 2).map((item, i) =>
            renderStatCard(item, i, stats.items[i]),
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 xl:grid-cols-3 homesection:gap-y-14">
          {STAT_ITEMS.slice(2).map((item, i) =>
            renderStatCard(item, i + 2, stats.items[i + 2]),
          )}
        </div>
      </div>
    </section>
  );
}
