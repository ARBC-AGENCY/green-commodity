"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Volume2, VolumeX } from "lucide-react";

const STREAM_VIDEO_ID = "c77c074d8da70443dd38c706e8c0c5e8";
const STREAM_CUSTOMER = "customer-sjpsqgc6n64xivkb";
const EXPLORE_DELAY_MS = 10_000;

type StreamPlayer = {
  muted: boolean;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
};

declare global {
  interface Window {
    Stream?: (el: HTMLIFrameElement) => StreamPlayer;
  }
}

type IntroVideoProps = {
  /** Fires once the video has actually started rendering frames (safe to reveal it). */
  onReady: () => void;
  onFinished: () => void;
};

export function IntroVideo({ onReady, onFinished }: IntroVideoProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const playerRef = useRef<StreamPlayer | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [exploreVisible, setExploreVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExploreVisible(true), EXPLORE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!exploreVisible || !exploreRef.current) return;
    gsap.fromTo(
      exploreRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [exploreVisible]);

  useEffect(() => {
    if (!sdkReady || !iframeRef.current || !window.Stream) return;

    const player = window.Stream(iframeRef.current);
    playerRef.current = player;

    // "playing" only fires once real frames are being rendered, which is the
    // safe moment to fade the preloader background away and reveal the video.
    let revealed = false;
    const handlePlaying = () => {
      if (revealed) return;
      revealed = true;
      onReady();
    };

    player.addEventListener("playing", handlePlaying);
    player.addEventListener("ended", onFinished);

    return () => {
      player.removeEventListener("playing", handlePlaying);
      player.removeEventListener("ended", onFinished);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady]);

  const toggleMuted = () => {
    const next = !muted;
    setMuted(next);
    if (playerRef.current) playerRef.current.muted = next;
  };

  const src = `https://${STREAM_CUSTOMER}.cloudflarestream.com/${STREAM_VIDEO_ID}/iframe?preload=true&autoplay=true&muted=true&controls=false&poster=https%3A%2F%2F${STREAM_CUSTOMER}.cloudflarestream.com%2F${STREAM_VIDEO_ID}%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600`;

  return (
    <div className="fixed inset-0 z-90 h-dvh w-dvw bg-black">
      <Script
        src="https://embed.cloudflarestream.com/embed/sdk.latest.js"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={src}
          loading="eager"
          // Sized/cropped like `object-fit: cover` (assumes a 16:9 source) so
          // the player fills the viewport instead of letterboxing.
          className="pointer-events-none absolute left-1/2 top-1/2 h-[max(100vh,56.25vw)] w-[max(100vw,177.78vh)] -translate-x-1/2 -translate-y-1/2 border-0"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; "
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/60  backdrop-blur-[2px]" />

      <button
        type="button"
        onClick={toggleMuted}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        className="absolute bottom-10 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-orange backdrop-blur transition-colors hover:bg-black/60"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {exploreVisible && (
        <button
          ref={exploreRef}
          type="button"
          onClick={onFinished}
          className="absolute cursor-pointer bottom-10 left-1/2 z-10 -translate-x-1/2 rounded-full border border-orange hover:bg-orange px-8 py-3 font-lovelace font-medium text-white opacity-0 transition-colors hover:brightness-110"
        >
          Explorer
        </button>
      )}
    </div>
  );
}
