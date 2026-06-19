"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import type { Track } from "@/lib/data";

type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;       // 0–100
  duration: number;       // seconds
  volume: number;         // 0–100
  muted: boolean;
  play: (track: Track) => void;
  pause: () => void;
  toggle: (track: Track) => void;
  seek: (pct: number) => void;
  setVolume: (v: number) => void;
  setMuted: (m: boolean) => void;
  skipNext: () => void;
  skipPrev: () => void;
  queue: Track[];
  setQueue: (tracks: Track[]) => void;
};

const PlayerContext = createContext<PlayerState>({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 80,
  muted: false,
  play: () => {},
  pause: () => {},
  toggle: () => {},
  seek: () => {},
  setVolume: () => {},
  setMuted: () => {},
  skipNext: () => {},
  skipPrev: () => {},
  queue: [],
  setQueue: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [muted, setMutedState] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      // Auto-advance queue
      setCurrentTrack((cur) => {
        if (!cur) return cur;
        setQueue((q) => {
          const idx = q.findIndex((t) => t.id === cur.id);
          if (idx >= 0 && idx < q.length - 1) {
            const next = q[idx + 1];
            audio.src = next.downloadUrl ?? next.stationUrl ?? "";
            audio.play().catch(() => {});
            setIsPlaying(true);
            return q;
          }
          return q;
        });
        return cur;
      });
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Sync volume/mute to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  const play = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    const src = track.downloadUrl ?? track.stationUrl ?? "";
    if (!src) return;

    setCurrentTrack((cur) => {
      if (cur?.id !== track.id) {
        audio.src = src;
        audio.load();
      }
      return track;
    });

    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(
    (track: Track) => {
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
        } else {
          audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      } else {
        play(track);
      }
    },
    [currentTrack, isPlaying, play]
  );

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = (pct / 100) * audio.duration;
      setProgress(pct);
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    setMutedState(false);
  }, []);

  const setMuted = useCallback((m: boolean) => setMutedState(m), []);

  const skipNext = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const next = queue[idx + 1];
    if (next) play(next);
  }, [currentTrack, queue, play]);

  const skipPrev = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Restart if > 3s in, else go to previous
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      setProgress(0);
      return;
    }
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const prev = queue[idx - 1];
    if (prev) play(prev);
  }, [currentTrack, queue, play]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        muted,
        play,
        pause,
        toggle,
        seek,
        setVolume,
        setMuted,
        skipNext,
        skipPrev,
        queue,
        setQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
export const useProgress = () => {
  const { progress, duration } = useContext(PlayerContext);
  return { progress, duration };
};
