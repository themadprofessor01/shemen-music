"use client";

import { useEffect } from "react";
import { usePlayer } from "@/components/MusicPlayerContext";

export function KeyboardShortcuts() {
  const { currentTrack, isPlaying, play, pause, skipNext, skipPrev, muted, setMuted } = usePlayer();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Don't intercept when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          if (!currentTrack) return;
          if (isPlaying) pause();
          else play(currentTrack);
          break;
        case "ArrowRight":
          e.preventDefault();
          skipNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipPrev();
          break;
        case "m":
        case "M":
          e.preventDefault();
          setMuted(!muted);
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentTrack, isPlaying, play, pause, skipNext, skipPrev, muted, setMuted]);

  return null;
}
