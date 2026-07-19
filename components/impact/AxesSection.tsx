"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

const AXIS_IMAGES = [
  "/images/INCRUSTATION IMAGE PORTRAIT 1.webp",
  "/images/INCRUSTATION IMAGE PORTRAIT 3.webp",
] as const;

// Swapped in only between the homesection and xl breakpoints; the images
// above are used below and above that range.
const AXIS_IMAGES_MID = [
  "/images/FRAME 1.webp",
  "/images/INCRUSTATION MAIN CACAO 2.webp",
] as const;

export function AxesSection() {
  const t = useTranslations();
  const axes = t.impact.axes;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const targets = itemRefs.current.filter(Boolean) as HTMLElement[];
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
      className="relative flex min-h-screen homesection:h-dvh w-full flex-col gap-10 px-6 py-12 homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:justify-center homesection:items-center xl:px-24"
    >
      <div className="grid grid-cols-1 gap-x-16 homesection:gap-y-16 w-full homesection:h-[80%] homesection:grid-cols-2 homesection:justify-center xl:grid-cols-4 homesection:items-center">
        {axes.map((axis, index) => (
          <Fragment key={axis.label}>
            <div
              ref={(el) => {
                if (el) itemRefs.current[index * 2] = el;
              }}
              className="flex flex-col max-homesection:items-center gap-3 max-homesection:text-center"
            >
              <div className="flex items-start gap-3 max-homesection:justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/svg/CERCLE.svg"
                  alt=""
                  aria-hidden="true"
                  className="mt-1.5 h-4 w-4 shrink-0 max-homesection:hidden"
                />
                <span className="font-lovelace text-lg font-bold leading-tight text-green xl:text-xl">
                  {axis.label}
                  <br />
                  {axis.title}
                </span>
              </div>

              <p className="max-w-xs font-apparel text-xs xl:text-sm leading-snug text-body">
                {axis.paragraph1}
              </p>
              <p className="max-w-xs font-apparel text-xs xl:text-sm leading-snug text-body">
                {axis.paragraph2}
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) itemRefs.current[index * 2 + 1] = el;
              }}
              className="relative h-96 w-full homesection:h-full"
            >
              <Image
                src={AXIS_IMAGES[index]}
                alt=""
                fill
                sizes="(min-width: 860px) 22vw, 90vw"
                className="block object-contain homesection:hidden xl:block xl:object-contain"
              />
              <Image
                src={AXIS_IMAGES_MID[index]}
                alt=""
                fill
                sizes="(min-width: 860px) 22vw, 90vw"
                className="hidden object-contain homesection:block xl:hidden"
              />
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
