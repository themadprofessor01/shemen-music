"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Track } from "@/lib/data";

type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  play: (track: Track) => void;
  pause: () => void;
  toggle: (track: Track) => void;
};

const PlayerContext = createContext<PlayerState>({
  currentTrack: null,
  isPlaying: false,
  play: () => {},
  pause: () => {},
  toggle: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => setIsPlaying(false), []);

  const toggle = useCallback(
    (track: Track) => {
      if (currentTrack?.id === track.id) {
        setIsPlaying((p) => !p);
      } else {
        play(track);
      }
    },
    [currentTrack, play]
  );

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, play, pause, toggle }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
