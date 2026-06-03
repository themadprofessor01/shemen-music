"use client";

import { Play, Pause, Users } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";
import { formatPlays } from "@/lib/data";

export function TrackCardLarge({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const active = currentTrack?.id === track.id;

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:scale-[1.02]"
      style={{ background: track.coverColor + "22", border: `1px solid ${track.coverColor}44` }}
      onClick={() => toggle(track)}
    >
      {/* Cover art */}
      <div className="h-36 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${track.coverColor}66, ${track.coverColor}22)` }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110"
          style={{ background: active ? "var(--gold)" : "rgba(255,255,255,0.15)" }}
        >
          {active && isPlaying ? (
            <Pause size={22} className="text-black" />
          ) : (
            <Play size={22} className={active ? "text-black" : "text-white"} style={{ marginLeft: 2 }} />
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="font-semibold text-sm truncate" style={{ color: "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs mt-0.5 truncate opacity-60" style={{ color: "var(--foreground)" }}>{track.artist}</p>
        <div className="flex items-center gap-3 mt-2 text-xs opacity-50" style={{ color: "var(--foreground)" }}>
          <span className="flex items-center gap-1"><Users size={11} />{formatPlays(track.plays)}</span>
          <span>{track.duration}</span>
          <span>{track.size}</span>
        </div>
      </div>

      {active && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--gold)" }} />
      )}
    </div>
  );
}

export function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const active = currentTrack?.id === track.id;

  return (
    <div
      className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer group transition-colors"
      style={{
        background: active ? "var(--gold-dim)" : "transparent",
        border: active ? "1px solid var(--gold)" : "1px solid transparent",
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      onClick={() => toggle(track)}
    >
      {/* Index / play button */}
      <div className="w-8 text-center flex-shrink-0">
        <span className="group-hover:hidden text-sm opacity-40" style={{ color: "var(--foreground)" }}>{index + 1}</span>
        <button className="hidden group-hover:flex items-center justify-center w-full">
          {active && isPlaying ? (
            <Pause size={16} style={{ color: "var(--gold)" }} />
          ) : (
            <Play size={16} style={{ color: "var(--gold)", marginLeft: 2 }} />
          )}
        </button>
      </div>

      {/* Color dot */}
      <div className="w-9 h-9 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor}88)` }} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: active ? "var(--gold)" : "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs opacity-50 truncate" style={{ color: "var(--foreground)" }}>{track.artist}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-4 text-xs opacity-40 flex-shrink-0" style={{ color: "var(--foreground)" }}>
        <span className="flex items-center gap-1"><Users size={11} />{formatPlays(track.plays)}</span>
        <span>{track.size}</span>
        <span className="w-10 text-right">{track.duration}</span>
      </div>
    </div>
  );
}
