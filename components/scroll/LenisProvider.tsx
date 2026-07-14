"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Drives smooth scrolling for the whole site and keeps ScrollTrigger in sync. */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);

    const syncTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(syncTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(syncTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
