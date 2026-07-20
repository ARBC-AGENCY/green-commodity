"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { CocoaVideo, type CocoaVideoHandle } from "./CocoaVideo";
import { SocialLinks } from "@/components/home/SocialLinks";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function CocoaHeroSection() {
  const t = useTranslations();
  const hero = t.ourCocoas.hero;
  const { containerAnimation, resolved } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const videoColRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const traitRef = useRef<TraitHandle>(null);
  const cocoaVideoRef = useRef<CocoaVideoHandle>(null);
  const [muted, setMuted] = useState(true);

  const toggleMuted = () => {
    const next = !muted;
    setMuted(next);
    cocoaVideoRef.current?.setMuted(next);
  };

  useGSAP(
    () => {
      const targets = [
        videoColRef.current,
        headingRef.current,
        descRef.current,
      ].filter(Boolean) as HTMLElement[];

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
      className="relative flex w-full h-dvh justify-center shrink-0 flex-col gap-10 px-6 py-12 homesection:h-dvh homesection:w-screen homesection:flex-row homesection:items-center homesection:justify-center homesection:gap-12 homesection:overflow-hidden homesection:px-16 homesection:py-0 lg:gap-20 lg:px-24"
    >
      <div className="flex homesection:flex-1 flex-col max-homesection:items-center justify-center gap-6">
        <div className="relative inline-block w-fit">
          <h1
            ref={headingRef}
            className="font-lovelace max-homesection:text-center text-xl homesection:text-2xl  xl:text-4xl font-bold leading-none text-heading"
          >
            {hero.h1Prefix}{" "}
            <span className="relative italic outline-text">
              {hero.h1Emphasis}
              <Trait
                ref={traitRef}
                src="TRAIT 2.svg"
                className="absolute left-0 -z-1 top-full -mt-3 homesection:-mt-5 homesection:w-40 xl:-mt-8 xl:w-64 max-w-none"
              />
            </span>
            <br />
            {hero.h1Line2}
            <br />
            {hero.h1Line3}
          </h1>
        </div>

        <p
          ref={descRef}
          className="max-w-md font-apparel xl:pl-20 text-sm leading-snug text-body max-homesection:text-center"
        >
          {hero.paragraph}
        </p>
      </div>

      <div
        ref={videoColRef}
        className="flex flex-col w-full homesection:h-3/5 homesection:w-[60%] xl:w-[50%]"
      >
        <CocoaVideo ref={cocoaVideoRef} />
      </div>

      <div
        ref={barRef}
        className="absolute inset-x-0 bottom-6 grid grid-cols-3 items-center gap-4 px-6 md:bottom-10 md:px-16 lg:px-24"
      >
        <SocialLinks
          labels={t.home.hero.social}
          className="justify-self-start"
        />
        <span className="max-[450px]:opacity-0 justify-self-center font-apparel text-xs uppercase tracking-[0.25em] text-heading/70">
          {t.home.hero.slideHint}
        </span>
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? t.intro.enableSound : t.intro.disableSound}
          className="flex h-10 w-10 cursor-pointer items-center justify-center justify-self-end rounded-full border border-orange/60 text-orange backdrop-blur transition-colors hover:border-orange hover:text-orange"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </section>
  );
}
