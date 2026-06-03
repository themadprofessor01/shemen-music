"use client";

import { useState } from "react";
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

  if (!currentTrack || dismissed) return null;

  const currentTime = (progress / 100) * duration;
  const coverSrc = currentTrack.coverImage || currentTrack.imageUrl;

  return (
    <div
      className="fixed inset-x-0 bottom-16 md:bottom-4 z-50 px-3 md:px-4"
    >
      <div
        className="mx-auto flex max-w-5xl flex-col gap-3 rounded-[1.6rem] border px-4 py-3 sm:flex-row sm:items-center sm:gap-5"
        style={{
          background: "rgba(255,253,250,0.78)",
          borderColor: "rgba(231,223,209,0.88)",
          boxShadow: "0 24px 70px rgba(12,24,35,0.2)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {coverSrc
            ? <img src={coverSrc} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
            : <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: currentTrack.coverColor }} />
          }
          <div className="min-w-0">
            <p className="text-sm font-black truncate" style={{ color: "var(--foreground)" }}>{currentTrack.title}</p>
            <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{currentTrack.artist}</p>
            <div className="mt-2 hidden sm:flex items-end gap-1">
              {Array.from({ length: 24 }).map((_, index) => (
                <span
                  key={index}
                  className="w-1 rounded-full"
                  style={{
                    height: 5 + ((index * 7) % 18),
                    background: index * 4 < progress ? "var(--premium)" : "rgba(12,24,35,0.13)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={skipPrev} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
              <SkipBack size={18} />
            </button>
            <button
              onClick={() => (isPlaying ? pause() : play(currentTrack))}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))", boxShadow: "0 14px 28px rgba(12,24,35,0.24)" }}
              aria-label={isPlaying ? "Pause track" : "Play track"}
            >
              {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" style={{ marginLeft: 2 }} />}
            </button>
            <button onClick={skipNext} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
              <SkipForward size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 w-64 max-w-full">
            <span className="text-xs opacity-40 w-7 text-right" style={{ color: "var(--foreground)" }}>{fmt(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs opacity-40 w-7" style={{ color: "var(--foreground)" }}>{fmt(duration)}</span>
          </div>
        </div>

        {/* Volume + close */}
        <div className="flex items-center gap-3 flex-shrink-0">
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
