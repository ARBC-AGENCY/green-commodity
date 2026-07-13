"use client";

import { useRef } from "react";
import {
  PageTransitionOverlay,
  type PageTransitionOverlayHandle,
} from "@/components/transition/PageTransitionOverlay";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getRouteLabel } from "@/lib/routes";

const buttonClass =
  "rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700";

export default function PreloaderPreviewPage() {
  const overlayRef = useRef<PageTransitionOverlayHandle>(null);
  const { locale } = useLocale();
  const homeLabel = getRouteLabel("/", locale);

  return (
    <div className="min-h-dvh bg-zinc-100 p-10">
      <h1 className="text-2xl font-bold text-zinc-900">
        Preloader / transition preview
      </h1>
      <p className="mt-2 max-w-xl text-sm text-zinc-600">
        Dev-only page. Nothing here auto-advances - trigger each step below
        and it holds until you click the next one, so you can inspect and
        nudge the trait/text positioning in devtools. Final values go back
        into <code>components/transition/PageTransitionOverlay.tsx</code>.
      </p>

      <div className="relative z-200 mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className={buttonClass}
          onClick={() =>
            overlayRef.current?.coverMultiline(["le Chant", "du Cacao"], {
              src: "TRAIT ACCUEIL.svg",
            })
          }
        >
          1. Cover (le Chant / du Cacao + trait)
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => overlayRef.current?.fadeBackgroundOnly()}
        >
          2. Fade background only
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => overlayRef.current?.coverSingleLine(homeLabel)}
        >
          3. Cover single line ({homeLabel})
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() =>
            overlayRef.current?.coverSingleLine(homeLabel, {
              src: "TRAIT 2.svg",
            })
          }
        >
          3b. Cover single line + trait
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => overlayRef.current?.revealAll()}
        >
          4. Reveal all
        </button>
      </div>

      <PageTransitionOverlay ref={overlayRef} />
    </div>
  );
}
