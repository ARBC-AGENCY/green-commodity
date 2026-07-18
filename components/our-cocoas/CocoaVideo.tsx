"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Script from "next/script";
import type { StreamPlayer } from "@/lib/cloudflare-stream";

const STREAM_CUSTOMER = "customer-sjpsqgc6n64xivkb";
// Placeholder: reuses the homepage Hero video until the real footage for
// this page is ready.
const STREAM_VIDEO_ID = "b42cd581b28899970c852d4851f87a29";

export type CocoaVideoHandle = {
  setMuted: (muted: boolean) => void;
};

type CocoaVideoProps = {
  className?: string;
};

export const CocoaVideo = forwardRef<CocoaVideoHandle, CocoaVideoProps>(
  function CocoaVideo({ className }, ref) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const playerRef = useRef<StreamPlayer | null>(null);
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
      if (!sdkReady || !iframeRef.current || !window.Stream) return;
      playerRef.current = window.Stream(iframeRef.current);
    }, [sdkReady]);

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
          onLoad={() => setSdkReady(true)}
        />

        <div className="absolute inset-0 overflow-hidden bg-transparent">
          <iframe
            ref={iframeRef}
            src={src}
            loading="eager"
            className="absolute inset-0 h-full w-full border-0 bg-transparent"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
        </div>
      </div>
    );
  },
);
