"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { IntroExperience } from "./IntroExperience";

const IntroActiveContext = createContext(false);

/** True while the intro overlay is mounted and covering the page beneath it.
 * Autoplaying page content (background videos, etc.) should stay dormant
 * while this is true instead of competing with the intro's own video for
 * bandwidth/CPU. */
export function useIntroActive() {
  return useContext(IntroActiveContext);
}

export function IntroGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDevPreview = pathname?.startsWith("/dev/");
  const [showIntro, setShowIntro] = useState(false);
  // Starts pessimistic (assume the intro may run) rather than deriving from
  // showIntro directly: showIntro's initial `false` only exists to dodge an
  // SSR/localStorage hydration mismatch, and for one tick on first render
  // dependent video components would otherwise read "not active", mount
  // their real iframe `src`, and immediately have it canceled once the
  // layout effect below corrects `showIntro` to true.
  const [introActive, setIntroActive] = useState(true);

  useLayoutEffect(() => {
    // Empty dependency array: this only runs once, on IntroGate's own mount.
    // IntroGate lives in the root layout, which persists across client-side
    // navigations (only `template.tsx` below it remounts per route) - so
    // this effect only fires on a genuine fresh load (hard refresh, typed
    // URL, new tab), never on an internal TransitionLink navigation. That's
    // exactly the distinction the client wants: the intro replays on every
    // real load of the homepage, but navigating to "/" from another page
    // is just a normal page transition, no intro.
    if (isDevPreview || pathname !== "/") {
      setIntroActive(false);
      return;
    }
    setShowIntro(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDevPreview) return <>{children}</>;

  return (
    <IntroActiveContext.Provider value={introActive}>
      {children}
      {showIntro && (
        <IntroExperience
          onDone={() => {
            setShowIntro(false);
            setIntroActive(false);
          }}
        />
      )}
    </IntroActiveContext.Provider>
  );
}
