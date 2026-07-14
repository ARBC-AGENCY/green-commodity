"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export type TraitHandle = {
  play: () => Promise<void>;
};

type TraitProps = {
  /** Filename inside public/svg, e.g. "TRAIT ACCUEIL.svg" */
  src: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  delay?: number;
  ease?: string;
};

/**
 * Reusable brush-stroke underline. The trait SVGs are complex traced vectors
 * (not simple stroke paths), so "drawing in" is done via a left-to-right
 * clip-path reveal rather than stroke-dasharray animation.
 */
export const Trait = forwardRef<TraitHandle, TraitProps>(function Trait(
  { src, className, style, duration = 0.7, delay = 0, ease = "power2.out" },
  ref
) {
  const imgRef = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(imgRef.current, { clipPath: "inset(0 100% 0 0)" });
    },
    { scope: imgRef }
  );

  const play = contextSafe(() => {
    return new Promise<void>((resolve) => {
      gsap.to(imgRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration,
        delay,
        ease,
        onComplete: resolve,
      });
    });
  });

  useImperativeHandle(ref, () => ({ play }), [play]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={`/svg/${src}`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{ objectFit: "contain", ...style }}
    />
  );
});
