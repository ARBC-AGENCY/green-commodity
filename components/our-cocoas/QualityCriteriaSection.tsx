"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

const ITEM_IMAGES = [
  "/images/IMG CERCLE_Plan de travail 1.webp",
  "/images/IMG CERCLE_2_Plan de travail 1.webp",
  "/images/IMG CERCLE_Plan de travail 1.webp",
] as const;

const ITEM_POSITION_CLASSES = [
  "homesection:col-start-1 homesection:row-start-1 homesection:row-span-2 homesection:self-center",
  "homesection:col-start-2 homesection:row-start-1",
  "homesection:col-start-2 homesection:row-start-2",
] as const;

export function QualityCriteriaSection() {
  const t = useTranslations();
  const qualityCriteria = t.ourCocoas.qualityCriteria;
  const { containerAnimation, resolved } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const traitRef = useRef<TraitHandle>(null);

  useGSAP(
    () => {
      const targets = [leftRef.current, ...itemRefs.current].filter(
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

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen homesection:h-dvh w-full flex-col gap-10 px-6 py-12 homesection:flex-row xl:gap-16 homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:items-center xl:px-24"
    >
      <div
        ref={leftRef}
        className="flex flex-col max-homesection:items-center justify-center gap-6 homesection:w-[32%] homesection:max-w-sm"
      >
        <h2 className="font-lovelace max-homesection:text-center text-3xl homesection:text-4xl font-bold leading-none text-heading ">
          {qualityCriteria.heading}{" "}
          <span className="relative inline-block w-fit">
            <span className="italic outline-text">
              {qualityCriteria.emphasis}
            </span>
            <Trait
              ref={traitRef}
              src="TRAIT ENGAGEMENT.svg"
              className="absolute -z-1 left-0 top-full -mt-2 w-full max-w-none xl:-mt-6"
            />
          </span>
        </h2>

        <p className="max-w-md max-homesection:text-center xl:pl-10 font-apparel text-xs xl:text-sm leading-snug text-body">
          {qualityCriteria.paragraph}
        </p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-x-10 w-full max-homesection:gap-y-10 max-homesection:items-center homesection:grid-cols-2 homesection:grid-rows-2 homesection:h-[85%]">
        {qualityCriteria.items.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              if (el) itemRefs.current[index] = el;
            }}
            className={`flex flex-col max-homesection:items-center 2xl:items-center 2xl:gap-5 max-homesection:text-center max-homesection:flex-col 2xl:flex-row ${ITEM_POSITION_CLASSES[index]}`}
          >
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full 2xl:h-48 2xl:w-48">
              <Image
                src={ITEM_IMAGES[index]}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div className="flex max-w-xs flex-col gap-2">
              <h3 className="flex items-start gap-2 font-lovelace text-lg font-bold leading-tight text-green xl:text-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/svg/CERCLE.svg"
                  alt=""
                  aria-hidden="true"
                  className="mt-1.5 h-3 w-3 shrink-0"
                />
                {item.title}
              </h3>
              <p className="flex items-start gap-2 font-apparel text-xs xl:text-sm leading-snug text-body">
                <img
                  src="/svg/CERCLE.svg"
                  alt=""
                  aria-hidden="true"
                  className="mt-1.5 h-3 w-3 shrink-0 opacity-0"
                />
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
