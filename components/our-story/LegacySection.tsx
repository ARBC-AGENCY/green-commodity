"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function LegacySection() {
  const t = useTranslations();
  const legacy = t.ourStory.legacy;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const gridItemRefs = useRef<HTMLDivElement[]>([]);
  const headingTraitRef = useRef<TraitHandle>(null);
  const calloutTraitRef = useRef<TraitHandle>(null);

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
          .add(() => calloutTraitRef.current?.play(), "-=0.4");
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
      className="relative flex h-dvh w-full flex-col gap-10 px-6 py-12 homesection:flex-row xl:gap-24 homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:items-center xl:px-24"
    >
      <div
        ref={leftRef}
        className="flex flex-col max-[550px]:items-center min-[550px]:grid min-[550px]:grid-cols-2 homesection:flex homesection:flex-col justify-center gap-6 homesection:w-[38%] homesection:max-w-md"
      >
        <div className="flex flex-col  max-homesection:justify-center max-homesection:items-center gap-1">
          <h2 className="font-lovelace max-[550px]:text-center text-lg homesection:text-2xl font-bold leading-none text-heading  xl:text-5xl">
            {legacy.h1Line1}
            <br />
            {legacy.h1Line2}
          </h2>
          <div className="relative inline-block w-fit ">
            <span className="font-lovelace text-lg homesection:text-2xl leading-none text-heading xl:text-5xl">
              {legacy.h3Prefix && `${legacy.h3Prefix} `}
              <span className="italic outline-text">{legacy.h3Emphasis}</span>
            </span>
            <Trait
              ref={headingTraitRef}
              src="TRAIT 2.svg"
              className="absolute right-0 top-full -mt-2 xl:-mt-6 homesection:w-32 xl:w-72 max-w-none"
            />
          </div>
        </div>
        <p className="max-w-md  font-apparel hidden homesection:flex text-xs xl:text-sm leading-snug text-body xl:mt-10">
          {legacy.paragraph}
        </p>
        <div className="relative inline-block w-fit max-[550px]:items-center">
          <p className="max-w-md max-[550px]:text-center homesection:hidden font-apparel text-xs xl:text-sm leading-snug text-body xl:mt-10">
            {legacy.paragraph}
          </p>
          <p className="max-w-sm  max-[550px]:text-center max-[550px]:justify-self-center font-lovelace text-sm xl:text-base font-bold leading-normal xl:leading-snug text-green">
            {legacy.callout}
          </p>
          <Trait
            ref={calloutTraitRef}
            src="TRAIT 3.svg"
            className="max-[550px]:justify-self-center min-[550px]:absolute min-[550px]:left-0 top-full w-32 xl:-mt-2 xl:w-full max-w-none"
          />
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 min-[550px]:grid-cols-2 gap-6 homesection:grid-cols-2 homesection:grid-rows-[1.5fr_1fr] homesection:gap-8 xl:gap-x-14 homesection:h-[80%]">
        <div
          ref={(el) => {
            if (el) gridItemRefs.current[0] = el;
          }}
          className="relative h-64 w-full homesection:h-full homesection:w-auto"
        >
          <Image
            src="/images/HOMME TRIE 1.webp"
            alt=""
            fill
            className="object-contain object-center homesection:object-right"
          />
        </div>

        <div
          ref={(el) => {
            if (el) gridItemRefs.current[1] = el;
          }}
          className="flex flex-col justify-center max-[550px]:items-center gap-4"
        >
          <h3 className="inline-block w-fit pb-2 font-lovelace  font-bold leading-tight xl:text-xl">
            <span className="text-orange">{legacy.founded.leadIn}</span>{" "}
            <span className="text-green">{legacy.founded.brand1}</span>
            <br />
            <span className="text-orange">{legacy.founded.and}</span>{" "}
            <span className="text-green">{legacy.founded.brand2}</span>
          </h3>
          <p className="max-w-md  max-[550px]:text-center font-apparel text-xs xl:text-sm leading-snug text-body">
            {legacy.founded.paragraph}
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) gridItemRefs.current[2] = el;
          }}
          className="relative h-48 w-full homesection:h-full"
        >
          <Image
            src="/images/cacao.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 22vw, 50vw"
            className="object-cover"
          />
        </div>

        <div
          ref={(el) => {
            if (el) gridItemRefs.current[3] = el;
          }}
          className="relative h-48 w-full homesection:h-full"
        >
          <Image
            src="/images/INCRUSTATION MAIN CACAO 1.webp"
            alt=""
            fill
            sizes="(min-width: 860px) 22vw, 50vw"
            className="object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}
