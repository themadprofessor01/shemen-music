"use client";

import { useEffect, useRef } from "react";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";

const STORAGE_KEY = "shemen_session";

type SavedSession = {
  trackId: string;
  progress: number; // 0–100
};

export function SessionRestore({ tracks }: { tracks: Track[] }) {
  const { play, seek, pause, setQueue, currentTrack } = usePlayer();
  const { progress } = useProgress();
  const restored = useRef(false);

  // Restore on mount
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const { trackId, progress: savedProgress } = JSON.parse(raw) as SavedSession;
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;
      // Set up the queue and load the track without auto-playing
      setQueue(tracks);
      play(track);
      // Seek after a short delay to let the audio element load
      setTimeout(() => seek(savedProgress), 800);
      // Then pause — user can resume manually
      setTimeout(() => pause(), 850);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save session whenever the track or progress changes
  useEffect(() => {
    if (!currentTrack) return;
    try {
      const session: SavedSession = { trackId: currentTrack.id, progress };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {}
  }, [currentTrack, progress]);

  return null;
}
