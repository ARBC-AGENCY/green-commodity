"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "@/components/SplitText";
import { Trait, type TraitHandle } from "./Trait";

export type TraitConfig = {
  src: string;
  className?: string;
  style?: CSSProperties;
};

export type PageTransitionOverlayHandle = {
  /** Cover with a single centered label (used for ordinary page navigations). */
  coverSingleLine: (label: string, trait?: TraitConfig) => Promise<void>;
  /** Cover with two stacked lines and an optional trait underline (intro preloader). */
  coverMultiline: (
    lines: [string, string],
    trait?: TraitConfig,
  ) => Promise<void>;
  /** Fade out just the background/image layer, leaving the text pinned on screen. */
  fadeBackgroundOnly: () => Promise<void>;
  /** Fade everything out, fully revealing the page underneath. */
  revealAll: () => Promise<void>;
};

const wrapperClasses =
  "absolute w-full max-w-sm h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " +
  "md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:w-[72vw] md:max-w-2xl md:aspect-auto md:h-[90vh]";

const line1TextClass =
  "font-lovelace text-4xl font-medium leading-none text-white md:text-6xl";
const line2TextClass =
  "font-lovelace text-4xl font-bold leading-none text-white md:text-6xl";

const nextFrame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );

type Mode = "idle" | "single" | "multiline";
type MultilinePhase = "line1" | "line2";

export const PageTransitionOverlay = forwardRef<PageTransitionOverlayHandle>(
  function PageTransitionOverlay(_props, ref) {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const singleLineRef = useRef<HTMLDivElement>(null);
    const singleWrapRef = useRef<HTMLDivElement>(null);
    const multiWrapRef = useRef<HTMLDivElement>(null);
    const cachetRef = useRef<HTMLDivElement>(null);
    const traitRef = useRef<TraitHandle>(null);

    const [mode, setMode] = useState<Mode>("idle");
    const [multilinePhase, setMultilinePhase] =
      useState<MultilinePhase>("line1");
    const [lines, setLines] = useState<[string, string]>(["", ""]);
    const [sequenceKey, setSequenceKey] = useState(0);
    const [trait, setTrait] = useState<TraitConfig | null>(null);

    const line1DoneRef = useRef<() => void>(() => {});
    const line2DoneRef = useRef<() => void>(() => {});

    const { contextSafe } = useGSAP(
      () => {
        gsap.set(rootRef.current, { pointerEvents: "none" });
        gsap.set(bgRef.current, { opacity: 0 });
      },
      { scope: rootRef },
    );

    const coverSingleLine = contextSafe(
      async (label: string, traitConfig?: TraitConfig) => {
        setTrait(traitConfig ?? null);
        setMode("single");
        gsap.set(rootRef.current, { pointerEvents: "auto" });
        await nextFrame();

        if (singleLineRef.current) {
          singleLineRef.current.textContent = label;
          gsap.set(singleLineRef.current, { opacity: 0, y: 24 });
        }

        await Promise.all([
          gsap.to(bgRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          }),
          gsap.to(singleLineRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.15,
            ease: "power3.out",
          }),
        ]);

        if (traitConfig) {
          await traitRef.current?.play();
        }
      },
    );

    const animateCachetIn = () =>
      new Promise<void>((resolve) => {
        if (!cachetRef.current) {
          resolve();
          return;
        }
        gsap.fromTo(
          cachetRef.current,
          { opacity: 0, x: 40, rotate: -20 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.6)",
            onComplete: resolve,
          },
        );
      });

    const coverMultiline = contextSafe(
      async (linesArg: [string, string], traitConfig?: TraitConfig) => {
        gsap.set(rootRef.current, { pointerEvents: "auto" });
        gsap.set(bgRef.current, { opacity: 1 });
        setTrait(traitConfig ?? null);
        setLines(linesArg);
        setSequenceKey((key) => key + 1);
        setMultilinePhase("line1");
        setMode("multiline");

        await nextFrame();
        if (cachetRef.current) gsap.set(cachetRef.current, { opacity: 0 });

        await new Promise<void>((resolve) => {
          line1DoneRef.current = resolve;
        });

        setMultilinePhase("line2");
        await nextFrame();

        await new Promise<void>((resolve) => {
          line2DoneRef.current = resolve;
        });

        await Promise.all([
          traitConfig ? traitRef.current?.play() : Promise.resolve(),
          animateCachetIn(),
        ]);
      },
    );

    const fadeBackgroundOnly = contextSafe(async () => {
      await gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.set(rootRef.current, { pointerEvents: "none" });
    });

    const revealAll = contextSafe(async () => {
      const targets = [
        singleWrapRef.current,
        multiWrapRef.current,
        cachetRef.current,
      ].filter(Boolean);

      await Promise.all([
        gsap.to(bgRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        }),
        targets.length
          ? gsap.to(targets, {
              opacity: 0,
              y: -16,
              duration: 0.5,
              ease: "power2.in",
            })
          : Promise.resolve(),
      ]);

      gsap.set(rootRef.current, { pointerEvents: "none" });
      setTrait(null);
      setMode("idle");
    });

    useImperativeHandle(
      ref,
      () => ({
        coverSingleLine,
        coverMultiline,
        fadeBackgroundOnly,
        revealAll,
      }),
      [coverSingleLine, coverMultiline, fadeBackgroundOnly, revealAll],
    );

    return (
      <div ref={rootRef} className="fixed inset-0 z-100" aria-hidden="true">
        <div
          ref={bgRef}
          className="absolute inset-0 overflow-hidden"
          style={{ background: "#25292b" }}
        >
          <div className={wrapperClasses}>
            <Image
              src="/images/ONDE_Plan de travail 1-1.png"
              alt=""
              fill
              className="object-contain h-full w-full"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {mode === "single" && (
            <div ref={singleWrapRef} className="relative inline-block">
              <div ref={singleLineRef} className={line2TextClass} />
              {trait && (
                <Trait
                  ref={traitRef}
                  src={trait.src}
                  className={
                    trait.className ??
                    "absolute left-1/2 top-full -mt-2 sm:-mt-2 md:-mt-4 lg:-mt-6 w-full max-w-none -translate-x-1/2"
                  }
                  style={trait.style}
                />
              )}
            </div>
          )}

          {mode === "multiline" && (
            <>
              <div className="relative inline-block">
                <SplitText
                  key={`l1-${sequenceKey}`}
                  text={lines[0]}
                  tag="span"
                  className={`relative z-10 ${line1TextClass}`}
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  duration={1.3}
                  delay={50}
                  ease="power3.out"
                  threshold={0}
                  rootMargin="0px"
                  onLetterAnimationComplete={() => line1DoneRef.current()}
                />
                <div
                  ref={cachetRef}
                  className="pointer-events-none absolute left-10/12 top-1/2 z-0 h-15 w-15 sm:w-20 sm:h-20 -translate-x-1/3 -translate-y-1/2 opacity-0 md:h-30 md:w-30"
                >
                  <Image
                    src="/images/CACHET 1.webp"
                    alt=""
                    fill
                    className="object-contain h-full w-full"
                  />
                </div>
              </div>

              {multilinePhase === "line2" && (
                <div ref={multiWrapRef} className="relative inline-block">
                  <SplitText
                    key={`l2-${sequenceKey}`}
                    text={lines[1]}
                    tag="span"
                    className={line2TextClass}
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    duration={1.3}
                    delay={50}
                    ease="power3.out"
                    threshold={0}
                    rootMargin="0px"
                    onLetterAnimationComplete={() => line2DoneRef.current()}
                  />
                  {trait && (
                    <Trait
                      ref={traitRef}
                      src={trait.src}
                      className={
                        trait.className ??
                        "absolute left-[65%] top-full -mt-4 sm:-mt-4 md:-mt-6 lg:-mt-8 w-[80%] max-w-none -translate-x-1/2"
                      }
                      style={trait.style}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);
