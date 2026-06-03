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
      className="fixed bottom-0 left-0 right-0 z-50 border-t px-4 py-3"
      style={{
        background: "rgba(15,15,15,0.97)",
        backdropFilter: "blur(20px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {coverSrc
            ? <img src={coverSrc} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
            : <div style={{ width: 40, height: 40, borderRadius: 6, flexShrink: 0, background: currentTrack.coverColor }} />
          }
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{currentTrack.title}</p>
            <p className="text-xs opacity-50 truncate" style={{ color: "var(--foreground)" }}>{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={skipPrev} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
              <SkipBack size={18} />
            </button>
            <button
              onClick={() => (isPlaying ? pause() : play(currentTrack))}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: "var(--accent)" }}
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
          <button onClick={() => setDismissed(true)} className="opacity-30 hover:opacity-70 transition-opacity ml-1" style={{ color: "var(--foreground)" }}>
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
