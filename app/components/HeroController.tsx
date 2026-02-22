"use client";

import { useRef, useState } from "react";
import HeroVideo from "./HeroVideo";
import PlayButton from "./PlayButton";

export default function HeroController() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [active, setActive] = useState(false);

  const toggleVideo = () => {
    setActive((prev) => {
      const next = !prev;

      if (next) {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }

      return next;
    });
  };

  return (
    <>
      <HeroVideo active={active} videoRef={videoRef} />
      <PlayButton active={active} onToggle={toggleVideo} />
    </>
  );
}
