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
  /** False for one render on mount: sections mount (and run their own
   * effects) before this provider's effect does, so on that first pass
   * `containerAnimation` is always still null - indistinguishable from
   * genuine vertical/mobile mode. Sections must wait for this to flip true
   * before creating their own reveal ScrollTrigger, or they build one
   * against the wrong (about-to-change) layout. */
  resolved: boolean;
};

const HorizontalScrollContext = createContext<HorizontalScrollContextValue>({
  containerAnimation: null,
  resolved: false,
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
  const [resolved, setResolved] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let matched = false;

      mm.add(HORIZONTAL_QUERY, () => {
        matched = true;
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
          setResolved(true);
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
        setResolved(true);
        tween.scrollTrigger?.refresh();

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          setContainerAnimation(null);
          revert();
        };
      });

      // gsap.matchMedia() evaluates conditions synchronously, so by this
      // point `matched` reflects whether the query above actually fired. If
      // it didn't, we're confirmed in vertical/mobile mode - resolve now
      // rather than leaving sections waiting on a horizontal mode that will
      // never arrive.
      if (!matched) setResolved(true);

      return () => mm.revert();
    },
    { scope: wrapperRef },
  );

  return (
    <HorizontalScrollContext.Provider value={{ containerAnimation, resolved }}>
      <div ref={wrapperRef} className="relative">
        <div ref={trackRef} className="flex flex-col">
          {children}
        </div>
      </div>
    </HorizontalScrollContext.Provider>
  );
}
