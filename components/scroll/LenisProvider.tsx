"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/** The shared Lenis instance, exposed as a ref so reading it never forces a
 * re-render - consumers just check `.current` when they actually need it
 * (e.g. resetting scroll position right before a page transition). */
export function useLenis() {
  return useContext(LenisContext);
}

/** Drives smooth scrolling for the whole site and keeps ScrollTrigger in sync. */
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const syncTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(syncTicker);
    gsap.ticker.lagSmoothing(0);

    // Keep Lenis's cached scroll range in sync whenever ScrollTrigger
    // recalculates (e.g. pin-spacers resizing after late-loading content).
    const resizeLenis = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", resizeLenis);

    return () => {
      ScrollTrigger.removeEventListener("refresh", resizeLenis);
      gsap.ticker.remove(syncTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
