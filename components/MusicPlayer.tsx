"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";

function fmt(secs: number) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    currentTrack, isPlaying, play, pause,
    progress, duration, seek,
    volume, setVolume,
    muted, setMuted,
    skipNext, skipPrev,
  } = usePlayer();
  const [dismissed, setDismissed] = useState(false);

  // Effect 1: Animated waveform bars
  const [barHeights, setBarHeights] = useState(() => Array.from({ length: 24 }, () => 8));
  const rafRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isPlaying) { cancelAnimationFrame(rafRef.current!); return; }
    const animate = () => {
      timeRef.current += 0.06;
      setBarHeights(prev => prev.map((_, i) => {
        const base = 5 + ((i * 7 + 3) % 17);
        return base + Math.abs(Math.sin(timeRef.current * (0.8 + i * 0.15)) * 14);
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [isPlaying]);

  // Effect 3: Crossfade blur on track switch
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    if (!currentTrack?.id) return;
    setTransitioning(true);
    const timer = setTimeout(() => setTransitioning(false), 350);
    return () => clearTimeout(timer);
  }, [currentTrack?.id]);

  if (!currentTrack || dismissed) return null;

  const currentTime = (progress / 100) * duration;
  const coverSrc = currentTrack.coverImage || currentTrack.imageUrl;
  const accentColor = currentTrack.coverColor ?? "#075d9e";

  return (
    <div
      className="fixed inset-x-0 bottom-16 md:bottom-4 z-50 px-3 md:px-4"
    >
      <div
        className="motion-rise mx-auto flex max-w-5xl flex-col gap-3 rounded-[1.6rem] border px-4 py-3 sm:flex-row sm:items-center sm:gap-5"
        style={{
          background: "color-mix(in srgb, var(--surface) 86%, transparent)",
          borderColor: "var(--border)",
          boxShadow: "0 24px 70px rgba(12,24,35,0.2)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {coverSrc
            ? <img src={coverSrc} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
            : <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: currentTrack.coverColor }} />
          }
          {/* Effect 3: blur/fade transition on track change */}
          <div
            className="min-w-0"
            style={{
              transition: "filter 0.35s ease, opacity 0.35s ease",
              filter: transitioning ? "blur(4px)" : "none",
              opacity: transitioning ? 0.4 : 1,
            }}
          >
            <p className="text-sm font-black truncate" style={{ color: "var(--foreground)" }}>{currentTrack.title}</p>
            <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{currentTrack.artist}</p>
            {/* Effect 1: animated waveform bars */}
            <div className="mt-2 hidden sm:flex items-end gap-1">
              {barHeights.map((h, index) => (
                <span
                  key={index}
                  className="w-1 rounded-full"
                  style={{
                    height: h,
                    background: index * 4 < progress ? accentColor : "rgba(12,24,35,0.13)",
                    transition: isPlaying ? "none" : "height 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:flex-shrink-0 sm:items-center">
          <div className="flex items-center gap-4">
            <button onClick={skipPrev} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
              <SkipBack size={18} />
            </button>
            <button
              onClick={() => (isPlaying ? pause() : play(currentTrack))}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
              style={{ background: "#0c1823", boxShadow: "0 14px 28px rgba(12,24,35,0.24)" }}
              aria-label={isPlaying ? "Pause track" : "Play track"}
            >
              {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" style={{ marginLeft: 2 }} />}
            </button>
            <button onClick={skipNext} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
              <SkipForward size={18} />
            </button>
          </div>

          {/* Progress bar — Effect 2: color from currentTrack.coverColor */}
          <div className="flex w-full items-center gap-2 sm:w-64 sm:max-w-full">
            <span className="text-xs opacity-40 w-7 text-right" style={{ color: "var(--foreground)" }}>{fmt(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1"
              style={{
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${progress}%, rgba(12,24,35,0.15) ${progress}%, rgba(12,24,35,0.15) 100%)`
              }}
            />
            <span className="text-xs opacity-40 w-7" style={{ color: "var(--foreground)" }}>{fmt(duration)}</span>
          </div>
        </div>

        {/* Volume + close */}
        <div className="hidden items-center gap-3 flex-shrink-0 sm:flex">
          <button onClick={() => setMuted(!muted)} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 hidden sm:block"
          />
          <button onClick={() => setDismissed(true)} className="opacity-35 hover:opacity-80 transition-opacity ml-1" style={{ color: "var(--foreground)" }} aria-label="Close player">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
