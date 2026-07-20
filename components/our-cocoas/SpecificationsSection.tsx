"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { Trait, type TraitHandle } from "@/components/transition/Trait";
import { CocoaVideo, type CocoaVideoHandle } from "./CocoaVideo";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function SpecificationsSection() {
  const t = useTranslations();
  const specifications = t.ourCocoas.specifications;
  const { containerAnimation, resolved } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
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
      const targets = [leftRef.current, rightRef.current].filter(
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
        className="flex flex-col max-homesection:items-center max-xl:justify-center gap-10 w-full homesection:h-[80%] homesection:w-[38%]"
      >
        <div className="relative inline-block w-fit">
          <h2 className="font-lovelace max-homesection:text-center text-3xl homesection:text-2xl font-bold leading-tight text-heading">
            {specifications.h1Line1}
            <br />
            {specifications.h1Line2}
          </h2>
          <Trait
            ref={traitRef}
            src="TRAIT 2.svg"
            className="absolute left-0 top-full -mt-2 w-48 max-w-none xl:-mt-3 xl:w-64"
          />
        </div>

        <div className="flex flex-col gap-3 max-homesection:flex! max-xl:hidden w-full homesection:min-h-0 homesection:flex-1">
          <CocoaVideo ref={cocoaVideoRef} />

          <button
            type="button"
            onClick={toggleMuted}
            aria-label={muted ? t.intro.enableSound : t.intro.disableSound}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center self-start rounded-full border border-orange/60 text-orange transition-colors hover:border-orange hover:text-orange"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      <div
        ref={rightRef}
        className="flex flex-col max-homesection:items-center gap-6 w-full homesection:flex-1"
      >
        <p className="max-w-lg font-apparel max-homesection:text-center text-xs xl:text-sm leading-snug text-body">
          {specifications.paragraph}
        </p>

        <div className="w-full overflow-x-auto">
          <table className="w-full lg:min-w-160 border-separate border-spacing-1 text-left">
            <thead>
              <tr>
                {specifications.table.headers.map((header) => (
                  <th
                    key={header}
                    className="bg-orange p-4 font-lovelace text-xs font-bold leading-snug text-white xl:text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specifications.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="bg-green p-4 font-apparel text-xs leading-snug text-white xl:text-sm"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
