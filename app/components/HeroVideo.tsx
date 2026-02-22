"use client";

import { RefObject, useEffect } from "react";

interface Props {
  active: boolean;
  videoRef: RefObject<HTMLVideoElement>;
}

export default function HeroVideo({ active, videoRef }: Props) {
  useEffect(() => {
    if (active && videoRef.current) {
      videoRef.current.play().catch(() => {
        // browser silently block kare to error ignore
      });
    }
  }, [active, videoRef]);

  if (!active) return null;

  return (
    <video
      ref={videoRef}
      src="/hero-video.mp4"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className="hero_video"
    />
  );
}
