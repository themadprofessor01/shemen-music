"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, SkipBack, SkipForward, Mic } from "lucide-react";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";

interface KaraokeModeProps {
  track: Track;
  open: boolean;
  onClose: () => void;
}

export function KaraokeMode({ track, open, onClose }: KaraokeModeProps) {
  const { isPlaying, play, pause, skipNext, skipPrev } = usePlayer();
  const { progress } = useProgress();
  const [activeLine, setActiveLine] = useState(0);
  const linesRef = useRef<HTMLDivElement>(null);

  const lines = track.lyrics
    ? track.lyrics.split("\n").filter((l) => l.trim())
    : [];

  // Auto-scroll active line based on progress
  useEffect(() => {
    if (!open || lines.length === 0) return;
    const idx = Math.floor((progress / 100) * lines.length);
    setActiveLine(Math.min(idx, lines.length - 1));
  }, [progress, lines.length, open]);

  // Scroll active line into view
  useEffect(() => {
    if (!linesRef.current) return;
    const activeEl = linesRef.current.querySelector("[data-active='true']") as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLine]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const coverSrc = track.coverImage || track.imageUrl;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col overflow-hidden">
      {/* Blurred background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: coverSrc ? `url(${coverSrc})` : undefined,
          backgroundColor: coverSrc ? undefined : track.coverColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(48px) brightness(0.35)",
          transform: "scale(1.1)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full text-white">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 opacity-70">
            <Mic size={16} />
            <span className="text-sm font-semibold uppercase tracking-widest">Karaoke</span>
          </div>
          <div>
            <p className="text-sm font-bold truncate max-w-[200px] text-center">{track.title}</p>
            <p className="text-xs text-center opacity-60">{track.artist}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.12)" }}
            aria-label="Close karaoke"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lyrics */}
        <div ref={linesRef} className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-4 gap-6">
          {lines.length === 0 ? (
            <p className="text-center opacity-50 text-lg">No lyrics available for this track.</p>
          ) : (
            lines.map((line, i) => {
              const isActive = i === activeLine;
              const dist = Math.abs(i - activeLine);
              return (
                <p
                  key={i}
                  data-active={isActive}
                  onClick={() => setActiveLine(i)}
                  className="text-center font-black cursor-pointer transition-all duration-500 leading-tight"
                  style={{
                    fontSize: isActive ? "clamp(1.8rem, 5vw, 3rem)" : dist === 1 ? "clamp(1.1rem, 3vw, 1.6rem)" : "clamp(0.85rem, 2vw, 1.2rem)",
                    opacity: isActive ? 1 : dist === 1 ? 0.45 : dist === 2 ? 0.22 : 0.1,
                    color: isActive ? "white" : "rgba(255,255,255,0.9)",
                    textShadow: isActive ? "0 0 60px rgba(230,194,119,0.6), 0 0 20px rgba(230,194,119,0.4)" : "none",
                    transform: isActive ? "scale(1)" : "scale(0.95)",
                  }}
                >
                  {line}
                </p>
              );
            })
          )}
        </div>

        {/* Controls */}
        <div className="px-6 py-5 flex flex-col items-center gap-4">
          {/* Progress bar */}
          <div className="w-full max-w-md h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #e6c277, #c9a054)" }}
            />
          </div>

          {/* Playback buttons */}
          <div className="flex items-center gap-8">
            <button onClick={skipPrev} className="opacity-60 hover:opacity-100 transition-opacity">
              <SkipBack size={24} />
            </button>
            <button
              onClick={() => isPlaying ? pause() : play(track)}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
            </button>
            <button onClick={skipNext} className="opacity-60 hover:opacity-100 transition-opacity">
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
