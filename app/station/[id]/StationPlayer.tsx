"use client";

import { Pause, Play, MessageSquare, Users } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import { formatPlays } from "@/lib/data";
import type { Track } from "@/lib/data";

export default function StationPlayer({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const active = currentTrack?.id === track.id;
  const playing = active && isPlaying;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Large play button */}
      <button
        onClick={() => toggle(track)}
        aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        className="flex items-center justify-center w-16 h-16 rounded-full text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{
          background: playing
            ? "var(--accent)"
            : "linear-gradient(135deg, var(--ink), var(--blue-deep))",
          boxShadow: "0 10px 30px rgba(7,93,158,0.35)",
        }}
      >
        {playing ? (
          <Pause size={26} />
        ) : (
          <Play size={26} style={{ marginLeft: 3 }} />
        )}
      </button>

      {/* Engagement stats */}
      <div className="flex flex-wrap gap-3">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
        >
          <Users size={14} style={{ color: "var(--foreground-muted)" }} />
          <span className="font-semibold" style={{ color: "var(--foreground)" }}>
            {formatPlays(track.plays)}
          </span>
          <span style={{ color: "var(--foreground-muted)" }}>plays</span>
        </div>

        <div
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
        >
          <MessageSquare size={14} style={{ color: "var(--foreground-muted)" }} />
          <span className="font-semibold" style={{ color: "var(--foreground)" }}>
            {Math.round(track.plays * 0.03)}
          </span>
          <span style={{ color: "var(--foreground-muted)" }}>comments</span>
        </div>
      </div>
    </div>
  );
}
