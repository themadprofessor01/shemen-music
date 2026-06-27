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
  getAudioElement: () => HTMLAudioElement | null;
  shuffle: boolean;
  setShuffle: (s: boolean) => void;
  repeat: "off" | "one" | "all";
  setRepeat: (r: "off" | "one" | "all") => void;
  playbackRate: number;
  setPlaybackRate: (r: number) => void;
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
  getAudioElement: () => null,
  shuffle: false,
  setShuffle: () => {},
  repeat: "off",
  setRepeat: () => {},
  playbackRate: 1,
  setPlaybackRate: () => {},
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
  const [repeat, setRepeatState] = useState<"off" | "one" | "all">("off");
  const [playbackRate, setPlaybackRateState] = useState(1);
  const shuffleRef = useRef(false);
  const repeatRef = useRef<"off" | "one" | "all">("off");

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
      // Repeat one: restart current track
      if (repeatRef.current === "one") {
        const el = audioRef.current!;
        el.currentTime = 0;
        el.play().then(() => setIsPlaying(true)).catch(() => {});
        return;
      }
      setProgress(0);
      // Auto-advance queue respecting shuffle and repeat
      setCurrentTrack((cur) => {
        if (!cur) { setIsPlaying(false); return cur; }
        let nextTrack: Track | null = null;
        setQueue((q) => {
          if (shuffleRef.current) {
            const others = q.filter((t) => t.id !== cur.id);
            if (others.length > 0) {
              nextTrack = others[Math.floor(Math.random() * others.length)];
            } else if (repeatRef.current === "all" && q.length > 0) {
              nextTrack = q[Math.floor(Math.random() * q.length)];
            }
          } else {
            const idx = q.findIndex((t) => t.id === cur.id);
            if (idx >= 0 && idx < q.length - 1) {
              nextTrack = q[idx + 1];
            } else if (repeatRef.current === "all" && q.length > 0) {
              nextTrack = q[0];
            }
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

  // Sync playback rate to audio element
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  // Keep currentTrackId ref in sync for preload comparisons
  useEffect(() => {
    currentTrackIdRef.current = currentTrack?.id ?? null;
  }, [currentTrack]);

  const getAudioElement = useCallback(() => audioRef.current, []);

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

    const audio = audioRef.current;
    if (!audio) return;

    // Apply src / element swap BEFORE calling play(). Side effects must NOT live
    // inside a setState updater — React 18 does not guarantee updaters run
    // synchronously, so audio.src would be unset when play() is called.
    if (currentTrackIdRef.current !== track.id) {
      const pre = preloadRef.current;
      if (pre && pre.src === src && pre.readyState >= 2) {
        // Swap preloaded element in so its buffered data is reused
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
      currentTrackIdRef.current = track.id;
    }

    setCurrentTrack(track);
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
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

  const setShuffle = useCallback((s: boolean) => {
    setShuffleState(s);
    shuffleRef.current = s;
  }, []);

  const setRepeat = useCallback((r: "off" | "one" | "all") => {
    setRepeatState(r);
    repeatRef.current = r;
  }, []);

  const setPlaybackRate = useCallback((r: number) => {
    setPlaybackRateState(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  }, []);

  const skipNext = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    if (shuffle) {
      const others = queue.filter((t) => t.id !== currentTrack.id);
      if (others.length > 0) play(others[Math.floor(Math.random() * others.length)]);
    } else {
      const idx = queue.findIndex((t) => t.id === currentTrack.id);
      const next = queue[idx + 1] ?? (repeat === "all" ? queue[0] : null);
      if (next) play(next);
    }
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
        getAudioElement,
        shuffle,
        setShuffle,
        repeat,
        setRepeat,
        playbackRate,
        setPlaybackRate,
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
