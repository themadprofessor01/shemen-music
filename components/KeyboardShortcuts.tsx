"use client";

import { useEffect } from "react";
import { usePlayer } from "@/components/MusicPlayerContext";

export function KeyboardShortcuts() {
  const { currentTrack, isPlaying, play, pause, seek, skipNext, skipPrev, muted, setMuted, getAudio } = usePlayer();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          if (currentTrack) { isPlaying ? pause() : play(currentTrack); }
          break;
        case "ArrowRight": {
          e.preventDefault();
          const audio = getAudio();
          if (audio && audio.duration) {
            const newTime = Math.min(audio.currentTime + 10, audio.duration);
            seek((newTime / audio.duration) * 100);
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const audio = getAudio();
          if (audio && audio.duration) {
            const newTime = Math.max(audio.currentTime - 10, 0);
            seek((newTime / audio.duration) * 100);
          }
          break;
        }
        case "n":
        case "N":
          e.preventDefault();
          skipNext();
          break;
        case "p":
        case "P":
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
  }, [currentTrack, isPlaying, play, pause, seek, skipNext, skipPrev, muted, setMuted, getAudio]);

  return null;
}
