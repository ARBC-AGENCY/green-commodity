"use client";

import { useEffect } from "react";
import { useTransitionOverlay } from "@/components/transition/TransitionProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  const { notifyRouteMounted } = useTransitionOverlay();

  useEffect(() => {
    notifyRouteMounted();
  }, [notifyRouteMounted]);

  return children;
}
