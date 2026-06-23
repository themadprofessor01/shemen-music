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

export type RepeatMode = "none" | "one" | "all";

type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
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
  getAudio: () => HTMLAudioElement | null;
  shuffle: boolean;
  setShuffle: (s: boolean) => void;
  repeat: RepeatMode;
  setRepeat: (r: RepeatMode) => void;
};

// Separate context for rapidly-changing playback position
// Splitting this prevents all card components from re-rendering on every progress tick
type ProgressState = { progress: number; duration: number };
const ProgressContext = createContext<ProgressState>({ progress: 0, duration: 0 });

const PlayerContext = createContext<PlayerState>({
  currentTrack: null,
  isPlaying: false,
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
  getAudio: () => null,
  shuffle: false,
  setShuffle: () => {},
  repeat: "none",
  setRepeat: () => {},
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
  const [shuffle, setShuffleState] = useState(false);
  const [repeat, setRepeatState] = useState<RepeatMode>("none");
  const shuffleRef = useRef(false);
  const repeatRef = useRef<RepeatMode>("none");

  const setShuffle = useCallback((s: boolean) => {
    setShuffleState(s);
    shuffleRef.current = s;
  }, []);

  const setRepeat = useCallback((r: RepeatMode) => {
    setRepeatState(r);
    repeatRef.current = r;
  }, []);

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
      // Repeat one: restart immediately
      if (repeatRef.current === "one") {
        const el = audioRef.current;
        if (el) { el.currentTime = 0; el.play().catch(() => {}); }
        return;
      }
      // Auto-advance queue respecting shuffle and repeat-all
      setCurrentTrack((cur) => {
        if (!cur) { setIsPlaying(false); return cur; }
        let nextTrack: Track | null = null;
        setQueue((q) => {
          const idx = q.findIndex((t) => t.id === cur.id);
          if (shuffleRef.current && q.length > 1) {
            let randIdx = Math.floor(Math.random() * (q.length - 1));
            if (randIdx >= idx) randIdx++;
            nextTrack = q[randIdx];
          } else if (idx >= 0 && idx < q.length - 1) {
            nextTrack = q[idx + 1];
          } else if (repeatRef.current === "all" && q.length > 0) {
            nextTrack = q[0];
          }
          return q;
        });
        if (nextTrack) {
          const src = (nextTrack as Track).downloadUrl ?? (nextTrack as Track).stationUrl ?? "";
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

  const getAudio = useCallback(() => audioRef.current, []);

  const preload = useCallback((track: Track) => {
    const src = track.downloadUrl ?? track.stationUrl ?? "";
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
    const src = track.downloadUrl ?? track.stationUrl ?? "";
    if (!src) return;

    // Track play event for analytics
    if (currentTrackIdRef.current !== track.id) {
      try {
        const statsRaw = localStorage.getItem("shemen_stats") ?? "{}";
        const stats: Record<string, number> = JSON.parse(statsRaw);
        stats[track.id] = (stats[track.id] ?? 0) + 1;
        localStorage.setItem("shemen_stats", JSON.stringify(stats));
      } catch {}
      // Fire custom event that Vercel Analytics can pick up via window.va
      if (typeof window !== "undefined" && (window as Window & { va?: (event: string, props: Record<string, string>) => void }).va) {
        (window as Window & { va?: (event: string, props: Record<string, string>) => void }).va!("track", { event: "play", trackId: track.id, title: track.title, artist: track.artist });
      }
    }

    // Perform all DOM side-effects synchronously — BEFORE React batches the state update.
    // If these lived inside a setCurrentTrack updater, React 18 defers them and
    // audioRef.current?.play() would fire before the new src is assigned.
    if (currentTrackIdRef.current !== track.id) {
      const pre = preloadRef.current;
      const audio = audioRef.current!;

      if (pre && pre.src === src && pre.readyState >= 2) {
        // Swap preloaded element in as the main player
        audio.pause();
        detachHandlers(audio);
        pre.volume = audio.volume;
        pre.muted = audio.muted;
        attachHandlers(pre);
        preloadRef.current = audio;
        audioRef.current = pre;
      } else {
        audio.src = src;
      }
    }

    audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    setCurrentTrack(track);
  }, [attachHandlers, detachHandlers]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(
    (track: Track) => {
      if (currentTrackIdRef.current === track.id) {
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
    [isPlaying, play]
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
    let next: Track | undefined;
    if (shuffle) {
      let randIdx = Math.floor(Math.random() * (queue.length - 1));
      if (randIdx >= idx) randIdx++;
      next = queue[randIdx];
    } else {
      next = queue[idx + 1] ?? (repeat === "all" ? queue[0] : undefined);
    }
    if (next) play(next);
  }, [currentTrack, queue, play, shuffle, repeat]);

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
        getAudio,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
      }}
    >
      <ProgressContext.Provider value={{ progress, duration }}>
        {children}
      </ProgressContext.Provider>
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
export const useProgress = () => useContext(ProgressContext);
