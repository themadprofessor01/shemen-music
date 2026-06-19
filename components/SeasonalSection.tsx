"use client";

import { Play } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import { CoverImage } from "@/components/CoverImage";
import type { Track } from "@/lib/data";
import type { SeasonalTheme } from "@/lib/seasonal";

interface SeasonalSectionProps {
  theme: SeasonalTheme;
  tracks: Track[];
}

export function SeasonalSection({ theme, tracks }: SeasonalSectionProps) {
  const { play, toggle, currentTrack, isPlaying, setQueue } = usePlayer();

  if (tracks.length === 0) return null;

  function playAll() {
    setQueue(tracks);
    play(tracks[0]);
  }

  return (
    <section className="mb-10">
      {/* Banner */}
      <div
        className="relative overflow-hidden rounded-[1.8rem] px-6 py-7 sm:px-10 sm:py-9 mb-6"
        style={{
          background: `linear-gradient(135deg, ${theme.color}cc 0%, ${theme.color}66 100%)`,
          border: `1px solid ${theme.color}44`,
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 20%, white, transparent 60%)" }} />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <span className="text-3xl">{theme.emoji}</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">{theme.title}</h2>
            <p className="mt-1 text-white/70 text-sm">{theme.subtitle}</p>
          </div>
          <button
            onClick={playAll}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <Play size={15} style={{ marginLeft: 1 }} />
            Play All
          </button>
        </div>
      </div>

      {/* Track grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {tracks.slice(0, 10).map((track) => {
          const active = currentTrack?.id === track.id;
          return (
            <button
              key={track.id}
              onClick={() => { setQueue(tracks); toggle(track); }}
              className="group rounded-xl overflow-hidden text-left transition-transform hover:scale-[1.02]"
              style={{ background: "var(--surface2)", border: active ? `1px solid ${theme.color}` : "1px solid var(--border)" }}
            >
              <div className="relative aspect-square overflow-hidden">
                <CoverImage
                  src={track.coverImage || track.imageUrl}
                  alt={track.title}
                  coverColor={track.coverColor}
                  size={180}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.4)" }}>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: theme.color }}>
                    <Play size={16} className="text-white" style={{ marginLeft: 2 }} />
                  </span>
                </div>
                {active && isPlaying && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse" style={{ background: theme.color }} />
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold truncate" style={{ color: active ? theme.color : "var(--foreground)" }}>{track.title}</p>
                <p className="text-[10px] truncate mt-0.5" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
