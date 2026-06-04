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
  preload: (track: Track) => void;
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
  preload: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIdRef = useRef<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [muted, setMutedState] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);

  // Store event handler refs so they can be re-attached after an element swap
  const handlersRef = useRef<{
    onTimeUpdate: () => void;
    onLoadedMetadata: () => void;
    onEnded: () => void;
  } | null>(null);

  /** Attach the shared event handlers to a given audio element */
  const attachHandlers = useCallback((el: HTMLAudioElement) => {
    const h = handlersRef.current;
    if (!h) return;
    el.addEventListener("timeupdate", h.onTimeUpdate);
    el.addEventListener("loadedmetadata", h.onLoadedMetadata);
    el.addEventListener("ended", h.onEnded);
  }, []);

  const detachHandlers = useCallback((el: HTMLAudioElement) => {
    const h = handlersRef.current;
    if (!h) return;
    el.removeEventListener("timeupdate", h.onTimeUpdate);
    el.removeEventListener("loadedmetadata", h.onLoadedMetadata);
    el.removeEventListener("ended", h.onEnded);
  }, []);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onLoadedMetadata = () => setDuration((audioRef.current as HTMLAudioElement).duration);
    const onEnded = () => {
      setProgress(0);
      // Auto-advance queue and update currentTrack so UI shows new song
      setCurrentTrack((cur) => {
        if (!cur) { setIsPlaying(false); return cur; }
        let nextTrack: Track | null = null;
        setQueue((q) => {
          const idx = q.findIndex((t) => t.id === cur.id);
          if (idx >= 0 && idx < q.length - 1) {
            nextTrack = q[idx + 1];
          }
          return q;
        });
        if (nextTrack) {
          const src = (nextTrack as Track).audioUrl ?? (nextTrack as Track).downloadUrl ?? (nextTrack as Track).stationUrl ?? "";
          if (src) {
            const el = audioRef.current!;
            el.src = src;
            el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          }
          return nextTrack;
        }
        setIsPlaying(false);
        return cur;
      });
    };

    handlersRef.current = { onTimeUpdate, onLoadedMetadata, onEnded };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume/mute to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  // Keep currentTrackId ref in sync for preload comparisons
  useEffect(() => {
    currentTrackIdRef.current = currentTrack?.id ?? null;
  }, [currentTrack]);

  const preload = useCallback((track: Track) => {
    const src = track.audioUrl ?? track.downloadUrl ?? track.stationUrl ?? "";
    if (!src || currentTrackIdRef.current === track.id) return;
    if (!preloadRef.current) {
      preloadRef.current = new Audio();
      preloadRef.current.preload = "auto";
    }
    if (preloadRef.current.src !== src) {
      preloadRef.current.src = src;
      preloadRef.current.load();
    }
  }, []);

  const play = useCallback((track: Track) => {
    const src = track.audioUrl ?? track.downloadUrl ?? track.stationUrl ?? "";
    if (!src) return;

    setCurrentTrack((cur) => {
      if (cur?.id !== track.id) {
        const pre = preloadRef.current;
        const audio = audioRef.current!;

        if (pre && pre.src === src && pre.readyState >= 2) {
          // Swap preloaded element in as the main player so its buffered data is used
          audio.pause();
          detachHandlers(audio);
          pre.volume = audio.volume;
          pre.muted = audio.muted;
          attachHandlers(pre);
          preloadRef.current = audio; // recycle old element as the next preload slot
          audioRef.current = pre;
        } else {
          audio.src = src;
        }
      }
      return track;
    });

    audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [attachHandlers, detachHandlers]);

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
        preload,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
