"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { hasSeenIntroRecently } from "@/lib/intro-storage";
import { IntroExperience } from "./IntroExperience";

export function IntroGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDevPreview = pathname?.startsWith("/dev/");
  const [showIntro, setShowIntro] = useState(false);

  useLayoutEffect(() => {
    if (isDevPreview) return;
    setShowIntro(!hasSeenIntroRecently());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDevPreview) return <>{children}</>;

  return (
    <>
      {children}
      {showIntro && <IntroExperience />}
    </>
  );
}
