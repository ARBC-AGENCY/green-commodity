"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { HeroVideo, type HeroVideoHandle } from "./HeroVideo";
import { SocialLinks } from "./SocialLinks";
import { useHorizontalScroll } from "./HorizontalScrollSections";

export function HeroSection() {
  const t = useTranslations();
  const hero = t.home.hero;
  const { containerAnimation } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const videoColRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2WrapRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const traitRef = useRef<TraitHandle>(null);
  const heroVideoRef = useRef<HeroVideoHandle>(null);
  const [muted, setMuted] = useState(true);

  const toggleMuted = () => {
    const next = !muted;
    setMuted(next);
    heroVideoRef.current?.setMuted(next);
  };

  useGSAP(
    () => {
      const targets = [
        videoColRef.current,
        h1Ref.current,
        h2WrapRef.current,
        descRef.current,
        barRef.current,
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
      className="relative flex w-full h-dvh justify-center shrink-0 flex-col gap-10 px-6 py-12 homesection:h-dvh homesection:w-screen homesection:flex-row homesection:items-center homesection:justify-center homesection:gap-12 homesection:overflow-hidden homesection:px-16 homesection:py-0 lg:gap-20 lg:px-24"
    >
      <div className="flex homesection:flex-1 flex-col max-homesection:items-center gap-2 homesection:gap-4 ">
        <h1
          ref={h1Ref}
          className="font-lovelace text-xl font-bold leading-tight text-heading xl:text-2xl "
        >
          {hero.h1Line1}
          <br />
          {hero.h1Line2}
        </h1>

        <div
          ref={h2WrapRef}
          className="relative inline-block w-fit xl:pl-10 pb-2 xl:pb-4"
        >
          <h2 className="font-lovelace text-xl font-bold leading-tight text-orange md:text-2xl xl:text-3xl">
            {hero.h2Line1}
            <br />
            <span className="relative text-heading tracking-wider italic outline-text font-black md:text-2xl xl:text-3xl">
              {hero.h2Line2}
              <Trait
                ref={traitRef}
                src="TRAIT 1.svg"
                className="absolute -right-5 sm:-right-7 top-full -mt-3 w-[85%] max-w-none md:-mt-5 xl:-mt-7"
              />
            </span>
          </h2>
        </div>

        <p
          ref={descRef}
          className="max-w-md xl:pl-10 font-apparel text-sm leading-snug text-body max-homesection:text-center"
        >
          {hero.description}
        </p>
      </div>
      <div
        ref={videoColRef}
        className="flex flex-col  w-full homesection:h-3/5 homesection:w-[60%] xl:w-[50%]"
      >
        <HeroVideo ref={heroVideoRef} />
      </div>

      <div
        ref={barRef}
        className="absolute inset-x-0 bottom-6 grid grid-cols-3 items-center gap-4 px-6 md:bottom-10 md:px-16 lg:px-24"
      >
        <SocialLinks labels={hero.social} className="justify-self-start" />
        <span className="max-[450px]:opacity-0 justify-self-center font-apparel text-sm uppercase tracking-[0.25em] text-heading/70">
          {hero.slideHint}
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
