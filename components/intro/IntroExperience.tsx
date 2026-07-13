"use client";

import { useEffect, useState } from "react";
import { useTransitionOverlay } from "../transition/TransitionProvider";
import { markIntroSeen } from "@/lib/intro-storage";
import { IntroVideo } from "./IntroVideo";

type Phase = "preloader" | "video" | "done";

export function IntroExperience() {
  const { overlay, navigateWithTransition } = useTransitionOverlay();
  const [phase, setPhase] = useState<Phase>("preloader");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await overlay.current?.coverMultiline(["le Chant", "du Cacao"], {
        src: "TRAIT ACCUEIL.svg",
      });
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

  const handleVideoReady = () => {
    overlay.current?.fadeBackgroundOnly();
  };

  const handleFinished = async () => {
    markIntroSeen();
    await navigateWithTransition("/");
    setPhase("done");
  };

  if (phase === "video") {
    return (
      <IntroVideo onReady={handleVideoReady} onFinished={handleFinished} />
    );
  }

  return null;
}
