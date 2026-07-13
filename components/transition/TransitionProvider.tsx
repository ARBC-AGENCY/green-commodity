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

const FALLBACK_REVEAL_MS = 500;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
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
        label ?? getRouteLabel(href),
        trait ?? (traitSrc ? { src: traitSrc } : undefined),
      );
      router.push(href);

      clearFallback();
      fallbackTimerRef.current = setTimeout(() => {
        notifyRouteMounted();
      }, FALLBACK_REVEAL_MS);
    },
    [router, clearFallback, notifyRouteMounted]
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
