"use client";

import { usePlayer } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";
import { cleanTitle } from "@/lib/data";
import type { SeasonalTheme } from "@/lib/seasonal";
import { Play, Pause } from "lucide-react";
import { CoverImage } from "@/components/CoverImage";

export function SeasonalSection({ theme, tracks }: { theme: SeasonalTheme; tracks: Track[] }) {
  const { currentTrack, isPlaying, toggle, setQueue } = usePlayer();

  if (tracks.length === 0) return null;

  function playAll() {
    setQueue(tracks);
    toggle(tracks[0]);
  }

  return (
    <section>
      {/* Header card */}
      <div
        className="relative overflow-hidden rounded-[2rem] p-6 sm:p-8 mb-6"
        style={{
          background: `linear-gradient(135deg, ${theme.color}dd, ${theme.color}88)`,
          boxShadow: `0 20px 60px ${theme.color}44`,
        }}
      >
        <div className="absolute -right-10 -top-10 text-[120px] opacity-20 select-none pointer-events-none leading-none">
          {theme.emoji}
        </div>
        <div className="relative">
          <span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            {theme.subtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{theme.emoji} {theme.title}</h2>
          <p className="mt-2 text-white/75 text-sm max-w-md">{theme.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={playAll}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "white", color: theme.color }}
            >
              <Play size={14} fill={theme.color} />
              Play All ({tracks.length} tracks)
            </button>
          </div>
        </div>
      </div>

      {/* Track grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {tracks.slice(0, 10).map((track) => {
          const active = currentTrack?.id === track.id;
          const cover = track.coverImage || track.imageUrl;
          return (
            <div
              key={track.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
              onClick={() => { setQueue(tracks); toggle(track); }}
            >
              <div className="relative" style={{ paddingBottom: "100%" }}>
                <div style={{ position: "absolute", inset: 0 }}>
                  <CoverImage
                    src={cover}
                    alt={track.title}
                    coverColor={track.coverColor}
                    size={200}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.35)" }}>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: active ? theme.color : "rgba(255,255,255,0.9)" }}>
                    {active && isPlaying
                      ? <Pause size={16} style={{ color: active ? "white" : "#0c1823" }} />
                      : <Play size={16} style={{ color: active ? "white" : "#0c1823", marginLeft: 2 }} />
                    }
                  </span>
                </div>
                {active && (
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full animate-pulse"
                    style={{ background: theme.color }} />
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold truncate" style={{ color: active ? theme.color : "var(--foreground)" }}>
                  {cleanTitle(track.title)}
                </p>
                <p className="text-[10px] truncate mt-0.5" style={{ color: "var(--foreground-muted)" }}>
                  {track.artist}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
