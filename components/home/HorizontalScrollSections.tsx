"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Sections pin+scroll horizontally at this width and up; below it they stack
 * normally. Must match --breakpoint-homesection in globals.css. */
const HORIZONTAL_QUERY = "(min-width: 860px)";

type HorizontalScrollContextValue = {
  /** Set while the track is pinned+horizontal; null in normal vertical flow (mobile). */
  containerAnimation: gsap.core.Tween | null;
};

const HorizontalScrollContext = createContext<HorizontalScrollContextValue>({
  containerAnimation: null,
});

/** Lets a section's own ScrollTrigger work whether the homepage is in
 * horizontal-pinned mode (tablet/desktop) or plain vertical flow (mobile). */
export function useHorizontalScroll() {
  return useContext(HorizontalScrollContext);
}

export function HorizontalScrollSections({
  children,
}: {
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] =
    useState<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(HORIZONTAL_QUERY, () => {
        const track = trackRef.current;
        const wrapper = wrapperRef.current;
        if (!track || !wrapper) return;

        const panels = Array.from(track.children) as HTMLElement[];

        // Drive the row layout directly in px instead of leaning on a
        // Tailwind custom-breakpoint class here: this ties "horizontal mode
        // is active" and "the track is actually N viewport-widths wide" to
        // the exact same code path, so they can never disagree — and it
        // keeps working correctly across window resizes via onRefreshInit.
        const applyLayout = () => {
          gsap.set(wrapper, { overflow: "hidden" });
          gsap.set(track, {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            height: "100dvh",
          });
          gsap.set(panels, { width: window.innerWidth, flexShrink: 0 });
        };

        const revert = () => {
          gsap.set(wrapper, { clearProps: "overflow" });
          gsap.set(track, {
            clearProps: "display,flexDirection,flexWrap,height",
          });
          gsap.set(panels, { clearProps: "width,flexShrink" });
        };

        applyLayout();

        // Nothing to scroll to yet with a single panel — pinning with a
        // zero-length scroll distance is a known source of GSAP pin-spacer
        // glitches (stray reserved height, mistimed unpin).
        if (panels.length < 2) {
          return revert;
        }

        // Computed directly from the widths we just set, rather than
        // measured back off track.scrollWidth — no dependency on the
        // browser having already applied those styles by read time.
        const getDistance = () => (panels.length - 1) * window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.5,
            pin: true,
            // The wrapper's parent (`main`) is a flex container, and GSAP
            // disables pin-spacing by default in that case — without this,
            // no extra scroll room gets reserved and the page can't scroll
            // past the pinned section at all.
            pinSpacing: true,
            invalidateOnRefresh: true,
            onRefreshInit: applyLayout,
          },
        });

        setContainerAnimation(tween);
        tween.scrollTrigger?.refresh();

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          setContainerAnimation(null);
          revert();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapperRef },
  );

  return (
    <HorizontalScrollContext.Provider value={{ containerAnimation }}>
      <div ref={wrapperRef} className="relative">
        <div ref={trackRef} className="flex flex-col">
          {children}
        </div>
      </div>
    </HorizontalScrollContext.Provider>
  );
}
