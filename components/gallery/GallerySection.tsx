"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { SocialLinks } from "@/components/home/SocialLinks";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";
import { GalleryCarousel } from "./GalleryCarousel";

export function GallerySection() {
  const t = useTranslations();
  const gallery = t.gallery;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const traitRef = useRef<TraitHandle>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = [leftRef.current, carouselRef.current].filter(
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
      className="relative flex min-h-screen justify-center homesection:h-dvh w-full flex-col gap-10 px-6 py-12 homesection:flex-row xl:gap-16 homesection:overflow-hidden homesection:px-16 homesection:py-16 homesection:items-center xl:px-24"
    >
      <div
        ref={leftRef}
        className="flex flex-col max-homesection:items-center justify-center gap-2 homesection:w-[24%] homesection:shrink-0"
      >
        <div className="relative inline-block w-fit">
          <h1 className="font-lovelace text-2xl homesection:text-3xl font-bold leading-none text-heading ">
            {gallery.heading}
          </h1>
          <Trait
            ref={traitRef}
            src="TRAIT 2.svg"
            className="absolute left-0 top-full -mt-2 w-25 max-w-none xl:-mt-3 xl:w-48"
          />
        </div>
      </div>

      <div ref={carouselRef} className="w-full homesection:h-[80%] homesection:flex-1 ">
        <GalleryCarousel />
      </div>

      <div
        ref={barRef}
        className="absolute inset-x-0 bottom-6 grid grid-cols-3 items-center gap-4 px-6 md:bottom-10 md:px-16 lg:px-24"
      >
        <SocialLinks
          labels={t.home.hero.social}
          className="justify-self-start"
        />
        <span className="opacity-0 justify-self-center font-apparel text-xs uppercase tracking-[0.25em] text-heading/70">
          {gallery.seeMore}
        </span>
        <span />
      </div>
    </section>
  );
}
