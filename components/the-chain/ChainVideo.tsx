"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Script from "next/script";
import { useIntroActive } from "@/components/intro/IntroGate";
import type { StreamPlayer } from "@/lib/cloudflare-stream";

const STREAM_CUSTOMER = "customer-sjpsqgc6n64xivkb";
const STREAM_VIDEO_ID = "9b583550b37be7b7f19f842b6ceaccf4";

export type ChainVideoHandle = {
  setMuted: (muted: boolean) => void;
};

type ChainVideoProps = {
  className?: string;
};

export const ChainVideo = forwardRef<ChainVideoHandle, ChainVideoProps>(
  function ChainVideo({ className }, ref) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const playerRef = useRef<StreamPlayer | null>(null);
    const [sdkReady, setSdkReady] = useState(false);
    // Deferred while the intro overlay is up: this page can be a direct
    // landing page too, and there's no point autoplaying a hidden video that
    // competes with the intro's own video for bandwidth.
    const introActive = useIntroActive();

    useEffect(() => {
      if (introActive || !sdkReady || !iframeRef.current || !window.Stream)
        return;
      playerRef.current = window.Stream(iframeRef.current);
    }, [introActive, sdkReady]);

    useImperativeHandle(
      ref,
      () => ({
        setMuted: (muted: boolean) => {
          if (playerRef.current) playerRef.current.muted = muted;
        },
      }),
      [],
    );

    const src =
      `https://${STREAM_CUSTOMER}.cloudflarestream.com/${STREAM_VIDEO_ID}/iframe` +
      `?preload=true&autoplay=true&muted=true&loop=true&controls=false&letterboxColor=transparent` +
      `&poster=https%3A%2F%2F${STREAM_CUSTOMER}.cloudflarestream.com%2F${STREAM_VIDEO_ID}%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600`;

    return (
      <div
        className={`relative aspect-video homesection:aspect-auto homesection:min-h-0 homesection:flex-1 ${className ?? ""}`}
      >
        <Script
          src="https://embed.cloudflarestream.com/embed/sdk.latest.js"
          strategy="afterInteractive"
          // `onLoad` only fires the first time this script ever loads on the
          // page; later mounts (this component remounting after the intro,
          // repeat visits, Fast Refresh) get `onReady` instead.
          onLoad={() => setSdkReady(true)}
          onReady={() => setSdkReady(true)}
        />

        <div className="absolute inset-0 overflow-hidden bg-transparent">
          {!introActive && (
            <iframe
              ref={iframeRef}
              src={src}
              loading="eager"
              className="absolute inset-0 h-full w-full border-0 bg-transparent"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          )}
        </div>
      </div>
    );
  },
);
