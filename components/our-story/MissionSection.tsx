"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function MissionSection() {
  const t = useTranslations();
  const mission = t.ourStory.mission;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const gridItemRefs = useRef<HTMLDivElement[]>([]);
  const headingTraitRef = useRef<TraitHandle>(null);
  const missionTraitRef = useRef<TraitHandle>(null);
  const engagementTraitRef = useRef<TraitHandle>(null);

  useGSAP(
    () => {
      const targets = [leftRef.current, ...gridItemRefs.current].filter(
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
          .add(() => headingTraitRef.current?.play(), "-=0.6")
          .add(() => missionTraitRef.current?.play(), "-=0.5")
          .add(() => engagementTraitRef.current?.play(), "-=0.4");
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
      className="relative flex min-h-screen homesection:h-dvh w-full flex-col gap-10 px-6 py-12 homesection:flex-row homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:items-center xl:px-24"
    >
      <div
        ref={leftRef}
        className="flex flex-col max-homesection:items-center justify-center gap-6 homesection:w-[38%] homesection:max-w-md"
      >
        <div className="flex flex-col max-homesection:items-center ">
          <h2 className="font-lovelace max-homesection:text-center text-2xl homesection:text-2xl lg:text-2xl font-bold leading-none text-heading xl:text-4xl">
            {mission.h1Line1}
            <br />
            <span className="text-2xl homesection:text-2xl lg:text-4xl"> {mission.h1Line2}</span>
          </h2>
          <div className="relative inline-block w-fit">
            <span className="font-lovelace italic outline-text text-xl homesection:text-3xl lg:text-4xl leading-none ">
              {mission.h3Emphasis}
            </span>
            <Trait
              ref={headingTraitRef}
              src="TRAIT 1.svg"
              className="absolute left-0 top-full -mt-2 xl:-mt-6 homesection:w-32 xl:w-72 max-w-none"
            />
          </div>
        </div>
        <p className="max-w-md max-homesection:text-center font-apparel text-sm xl:text-sm leading-snug text-body">
          {mission.paragraph}
        </p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-x-5 homesection:grid-cols-2 homesection:grid-rows-2 gap-6 lg:gap-x-14 lg:gap-y-10 lg:h-[80%] ">
        <div
          ref={(el) => {
            if (el) gridItemRefs.current[0] = el;
          }}
          className="relative h-72 w-full homesection:h-full homesection:row-span-2"
        >
          <Image
            src="/images/INCRUSTATION IMAGE PORTRAIT.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 30vw, 90vw"
            className="object-contain max-homesection:object-center! max-lg:object-left object-center"
          />
        </div>

        <div
          ref={(el) => {
            if (el) gridItemRefs.current[1] = el;
          }}
          className="flex flex-col max-homesection:items-center justify-center gap-4"
        >
          <div className="flex flex-col max-homesection:items-center gap-1">
            <h3 className="font-lovelace text-lg font-bold leading-none text-green xl:text-3xl">
              {mission.missionTitle}
            </h3>
            <div className="relative inline-block w-fit">
              <span className="font-lovelace italic outline-text text-lg leading-none xl:text-3xl">
                {mission.missionEmphasis}
              </span>
              <Trait
                ref={missionTraitRef}
                src="TRAIT MISSION.svg"
                className="absolute left-0 -z-1 top-full -mt-2 homesection:-mt-3 homesection:w-20 xl:w-56 max-w-none"
              />
            </div>
          </div>
          <p className="max-w-md max-homesection:text-center font-apparel text-sm xl:text-sm leading-snug text-body">
            {mission.missionParagraph}
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) gridItemRefs.current[2] = el;
          }}
          className="flex flex-col max-homesection:items-center justify-center gap-4"
        >
          <div className="flex flex-col max-homesection:items-center gap-1">
            <h3 className="font-lovelace text-lg font-bold leading-none text-green xl:text-3xl">
              {mission.engagementTitle}
            </h3>
            <div className="relative inline-block w-fit">
              <span className="font-lovelace italic outline-text text-lg leading-none xl:text-3xl">
                {mission.engagementEmphasis}
              </span>
              <Trait
                ref={engagementTraitRef}
                src="TRAIT ENGAGEMENT.svg"
                className="absolute right-0 -z-1 top-full -mt-2 homesection:-mt-3 homesection:w-20 xl:w-56 max-w-none"
              />
            </div>
          </div>
          <p className="max-w-md max-homesection:text-center font-apparel text-sm xl:text-sm leading-snug text-body">
            {mission.engagementParagraph}
          </p>
        </div>
      </div>
    </section>
  );
}
