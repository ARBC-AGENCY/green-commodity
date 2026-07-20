"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "@/components/i18n/LocaleProvider";
import { useHorizontalScroll } from "@/components/home/HorizontalScrollSections";

export function PurchaseSection() {
  const t = useTranslations();
  const purchase = t.ourStory.purchase;
  const { containerAnimation, resolved } = useHorizontalScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = [textRef.current, imageRef.current].filter(
        Boolean,
      ) as HTMLElement[];
      const isHorizontal = Boolean(containerAnimation);

      gsap.set(
        targets,
        isHorizontal ? { opacity: 0, x: 72 } : { opacity: 0, y: 32 },
      );
      // Held up above the page, rotated, before it comes down.
      gsap.set(stampRef.current, { opacity: 0, scale: 2.6, rotate: -22 });

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
          // The stamp itself: a fast slam down into place...
          .to(
            stampRef.current,
            {
              opacity: 1,
              scale: 1.05,
              rotate: -8,
              duration: 0.28,
              ease: "power4.in",
            },
            "-=0.35",
          )
          // ...a hard compress from the impact...
          .to(stampRef.current, {
            scale: 0.9,
            duration: 0.07,
            ease: "power1.out",
          })
          // ...and a small settle, like it's still rocking on the page.
          .to(stampRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
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
      className="relative flex min-h-screen homesection:h-dvh w-full flex-col justify-center  px-6 py-12 lg:flex-row lg:items-center  homesection:overflow-hidden homesection:px-16 homesection:py-16 2xl:px-24"
    >
      <div className=" max-homesection:h-0! max-lg:h-54  xl:w-20"></div>
      <div
        ref={textRef}
        className="flex flex-col max-homesection:w-full max-homesection:items-center homesection:w-[42%] homesection:max-w-lg"
      >
        <h2 className="font-lovelace text-xl font-bold leading-tight text-heading homesection:text-xl ">
          <span className="text-orange decoration-2 underline-offset-4">
            {purchase.headingWord}
          </span>{" "}
          {purchase.headingRest}
        </h2>
        <p className="font-lovelace homesection:pl-5 xl:pl-10 text-2xl font-bold leading-tight text-heading homesection:text-xl">
          {purchase.headingLine2}
        </p>
        <p className="outline-text homesection:pl-5 xl:pl-10 text-3xl italic leading-snug homesection:text-3xl ">
          {purchase.headingLine3}
        </p>
        <p className="max-w-sm flex max-homesection:text-center font-lovelace homesection:pl-5 xl:pl-10 text-xl font-bold leading-none text-green homesection:text-xl">
          {purchase.headingLine4}
        </p>

        <div ref={stampRef} className="mt-10  homesection:pl-5 xl:pl-10 w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/100 POURCENT LOCAL.svg"
            alt="100% Local"
            className="w-40 homesection:w-62"
          />
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative h-72 w-full lg:w-[60%] xl:w-[70%] homesection:h-full "
      >
        <Image
          src="/images/CHANT DU CACAO.webp"
          alt=""
          fill
          className="object-contain max-homesection:object-center object-right"
        />
      </div>
    </section>
  );
}
