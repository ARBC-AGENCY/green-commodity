"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Drives smooth scrolling for the whole site and keeps ScrollTrigger in sync. */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });
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
    };
  }, []);

  return <>{children}</>;
}
