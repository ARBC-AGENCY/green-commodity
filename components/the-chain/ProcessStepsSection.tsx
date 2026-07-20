"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

const STEP_IMAGES = [
  "/images/HOMME TRIE.webp",
  "/images/INCRUSTATION IMAGE PORTRAIT.webp",
  "/images/GREEN COMMODITIES INCRUSTATION 1.webp",
] as const;

export function ProcessStepsSection() {
  const t = useTranslations();
  const steps = t.theChain.processSteps;
  const { containerAnimation, resolved } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  useGSAP(
    () => {
      const targets = [leftRef.current, rightRef.current].filter(
        Boolean,
      ) as HTMLElement[];
      const isHorizontal = Boolean(containerAnimation);

      gsap.set(
        targets,
        isHorizontal ? { opacity: 0, x: 72 } : { opacity: 0, y: 32 },
      );

      const playReveal = () => {
        gsap.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.16,
        });
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
      className="relative flex min-h-screen homesection:h-dvh w-full flex-col gap-10 px-6 py-12 homesection:flex-row xl:gap-24 homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:items-center xl:px-24"
    >
      <div
        ref={leftRef}
        className="flex flex-col w-full homesection:w-1/2  max-homesection:items-start justify-center gap-8  "
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={step.titleLine1}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
              className="group flex items-start gap-3 max-homesection:text-center max-homesection:justify-center text-left cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/CERCLE.svg"
                alt=""
                aria-hidden="true"
                className="mt-2 h-4 w-4 shrink-0"
              />
              <span className="flex items-center gap-3">
                <span
                  className={`font-lovelace font-bold max-homesection:text-left leading-tight text-base md:text-lg homesection:xl lg:text-2xl transition-colors ${
                    isActive
                      ? "text-heading"
                      : "outline-text font-lovelace! [--outline-color:#2d2d2d] group-hover:[--outline-color:#f39116]"
                  }`}
                >
                  {step.titleLine1}
                  <br />
                  {step.titleLine2}
                </span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="font-lovelace max-md:hidden text-2xl text-heading"
                  >
                    →
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={rightRef}
        className="flex flex-col gap-4 w-full homesection:h-[80%] homesection:w-1/2"
      >
        <div className="relative h-64 w-full homesection:h-auto homesection:min-h-0 homesection:flex-1">
          <Image
            src={STEP_IMAGES[activeIndex]}
            alt=""
            fill
            sizes="(min-width: 860px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 max-homesection:items-center">
          <div className="relative w-fit pb-2">
            <h3 className="font-lovelace max-homesection:text-center text-base md:text-xl font-bold leading-tight text-green xl:text-2xl">
              {activeStep.titleLine1}
              <br />
              {activeStep.titleLine2}
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/svg/TRAIT 4.svg"
              alt=""
              aria-hidden="true"
              className="absolute max-homesection:hidden  left-0 top-full -mt-1 w-32 max-w-none xl:w-40"
            />
          </div>
          <p className="max-w-md font-apparel max-homesection:text-center text-sm leading-snug text-body">
            {activeStep.description}
          </p>
        </div>
      </div>
    </section>
  );
}
