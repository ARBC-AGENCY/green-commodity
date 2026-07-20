"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function StoryIntroSection() {
  const t = useTranslations();
  const intro = t.ourStory.intro;
  const { containerAnimation, resolved } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const traitRef = useRef<TraitHandle>(null);

  useGSAP(
    () => {
      const isHorizontal = Boolean(containerAnimation);

      gsap.set(
        textRef.current,
        isHorizontal ? { opacity: 0, x: 72 } : { opacity: 0, y: 32 },
      );

      const playReveal = () => {
        gsap
          .timeline()
          .to(textRef.current, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.3,
            ease: "power4.out",
          })
          .add(() => traitRef.current?.play(), "-=0.5");
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
      className="relative flex h-dvh w-full flex-col justify-center overflow-hidden px-6 py-12 homesection:flex-row homesection:items-stretch homesection:justify-between xl:gap-12 homesection:px-16 homesection:py-0 2xl:px-34"
    >
      <div
        ref={textRef}
        className="flex flex-col max-homesection:items-center xl:justify-center gap-6 homesection:w-[50%] lg:w-[40%] 2xl:w-1/2 homesection:max-w-xl"
      >
        <div className="h-24 xl:hidden"></div>
        <div className="flex ">
          <span
            aria-hidden="true"
            className="font-lovelace! hidden homesection:flex outline-text text-6xl leading-none text-heading/70"
          >
            &ldquo;
          </span>
          <div className="flex flex-col gap-1 max-homesection:items-center">
            <h1 className="font-lovelace text-3xl font-bold leading-none text-heading homesection:text-4xl xl:text-5xl">
              
              {intro.quoteLine1}
            </h1>
            <div className="relative inline-block w-fit ">
              <span className=" outline-text italic text-4xl leading-none text-heading homesection:text-5xl xl:text-6xl">
                {intro.quoteLine2}
              </span>
              {/* TRAIT 3 is a thicker brush shape (~3:1) than the thin
                underline traits used elsewhere (~7-8:1), so it needs a
                fixed, more conservative size and more reserved bottom
                space to avoid overlapping the paragraph below. */}
              <Trait
                ref={traitRef}
                src="TRAIT 2.svg"
                className="absolute right-0 top-full -mt-3 homesection:w-52 max-w-none"
              />
            </div>
            <p className="max-w-md font-apparel text-sm max-homesection:text-center xl:text-sm leading-normal text-body mt-10">
              {intro.paragraph}
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden homesection:flex h-64 w-full shrink-0 homesection:h-auto homesection:w-1/2 2xl:w-[40%]">
        <Image
          src="/images/JESSICA NANG_Plan de travail 1.webp"
          alt=""
          fill
          sizes="(min-width: 860px) 42vw, 100vw"
          className="object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
}
