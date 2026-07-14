"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Sections pin+scroll horizontally at this width and up; below it they stack normally. */
const HORIZONTAL_QUERY = "(min-width: 768px)";

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

export function HorizontalScrollSections({ children }: { children: ReactNode }) {
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
        // Nothing to scroll to yet with a single panel — pinning with a
        // zero-length scroll distance is a known source of GSAP pin-spacer
        // glitches (stray reserved height, mistimed unpin).
        if (track.children.length < 2) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        setContainerAnimation(tween);

        return () => setContainerAnimation(null);
      });

      return () => mm.revert();
    },
    { scope: wrapperRef },
  );

  return (
    <HorizontalScrollContext.Provider value={{ containerAnimation }}>
      <div ref={wrapperRef} className="relative md:overflow-hidden ">
        <div ref={trackRef} className="flex flex-col md:h-dvh md:flex-row md:flex-nowrap ">
          {children}
        </div>
      </div>
    </HorizontalScrollContext.Provider>
  );
}
