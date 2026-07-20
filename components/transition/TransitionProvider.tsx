"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getRouteLabel, getRouteTrait } from "@/lib/routes";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useLenis } from "@/components/scroll/LenisProvider";
import {
  PageTransitionOverlay,
  type PageTransitionOverlayHandle,
  type TraitConfig,
} from "./PageTransitionOverlay";

type TransitionContextValue = {
  overlay: React.RefObject<PageTransitionOverlayHandle | null>;
  navigateWithTransition: (
    href: string,
    label?: string,
    trait?: TraitConfig,
  ) => Promise<void>;
  notifyRouteMounted: () => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

// Safety net only: the real reveal signal is `template.tsx` mounting the new
// route and calling `notifyRouteMounted`. This must stay generous - Next
// compiles routes on demand in dev (first nav can take several seconds), and
// firing early reveals the *old* page, then the real mount swaps in the new
// one a moment later with nothing masking it (a visible flicker).
const FALLBACK_REVEAL_MS = 8000;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { locale } = useLocale();
  const lenisRef = useLenis();
  const overlayRef = useRef<PageTransitionOverlayHandle>(null);
  const pendingRef = useRef(false);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFallback = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const notifyRouteMounted = useCallback(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;
    clearFallback();
    overlayRef.current?.revealAll();
  }, [clearFallback]);

  const navigateWithTransition = useCallback(
    async (href: string, label?: string, trait?: TraitConfig) => {
      if (!overlayRef.current) return;
      pendingRef.current = true;
      const traitSrc = getRouteTrait(href);
      await overlayRef.current.coverSingleLine(
        label ?? getRouteLabel(href, locale),
        trait ?? (traitSrc ? { src: traitSrc } : undefined),
      );

      // Reset scroll while the overlay is fully opaque, before the next
      // route's sections mount: otherwise their ScrollTrigger reveals
      // ("top 80%") measure themselves against whatever scroll position was
      // left over from this page, so they either misfire immediately or
      // never fire at all - and lands the incoming page mid-scroll for a
      // beat, which reads as a flicker once the overlay fades.
      lenisRef?.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);

      router.push(href);

      clearFallback();
      fallbackTimerRef.current = setTimeout(() => {
        notifyRouteMounted();
      }, FALLBACK_REVEAL_MS);
    },
    [router, locale, lenisRef, clearFallback, notifyRouteMounted]
  );

  return (
    <TransitionContext.Provider
      value={{ overlay: overlayRef, navigateWithTransition, notifyRouteMounted }}
    >
      {children}
      <PageTransitionOverlay ref={overlayRef} />
    </TransitionContext.Provider>
  );
}

export function useTransitionOverlay() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionOverlay must be used within a TransitionProvider");
  }
  return ctx;
}
