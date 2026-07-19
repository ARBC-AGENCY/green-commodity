"use client";

import { useEffect, useRef, useState } from "react";
import { useTransitionOverlay } from "../transition/TransitionProvider";
import { markIntroSeen } from "@/lib/intro-storage";
import { IntroVideo } from "./IntroVideo";

type Phase = "preloader" | "video" | "done";

const PRELOADER_TIMEOUT_MS = 6000;
// Belt-and-suspenders: even if the video never fires "ended" and the user
// never clicks "Explore" (e.g. the stream never loads at all), the intro
// must still get out of the way on its own eventually.
const AUTO_FINISH_MS = 16000;

/** Never let a stalled preloader animation block the site indefinitely. */
function withTimeout(promise: Promise<void>, ms: number) {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => setTimeout(resolve, ms)),
  ]);
}

type IntroExperienceProps = {
  /** Called once the intro has fully finished (video ended or a guard fired)
   * and it's safe to let dormant page content behind it become active. */
  onDone: () => void;
};

export function IntroExperience({ onDone }: IntroExperienceProps) {
  const { overlay, navigateWithTransition } = useTransitionOverlay();
  const [phase, setPhase] = useState<Phase>("preloader");
  const finishedRef = useRef(false);

  const handleFinished = async () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    markIntroSeen();
    await navigateWithTransition("/");
    setPhase("done");
    onDone();
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await withTimeout(
        overlay.current?.coverMultiline(["le Chant", "du Cacao"], {
          src: "TRAIT ACCUEIL.svg",
        }) ?? Promise.resolve(),
        PRELOADER_TIMEOUT_MS,
      );
      // Mount the video now, while the background is still fully opaque, so
      // it's already rendering frames underneath by the time we reveal it -
      // otherwise fading the background out exposes the real page for a beat.
      if (!cancelled) setPhase("video");
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "video") return;
    const timer = setTimeout(handleFinished, AUTO_FINISH_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleVideoReady = () => {
    overlay.current?.fadeBackgroundOnly();
  };

  if (phase === "video") {
    return (
      <IntroVideo onReady={handleVideoReady} onFinished={handleFinished} />
    );
  }

  return null;
}
