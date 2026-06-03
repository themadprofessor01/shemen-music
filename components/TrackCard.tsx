"use client";

import { Crown, Play, Pause, Users } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";
import { formatPlays } from "@/lib/data";
import Image from "next/image";

function CoverArt({ track, size }: { track: Track; size: number }) {
  const bg = `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor2 ?? track.coverColor + "88"})`;
  if (track.coverImage) {
    return (
      <img
        src={track.coverImage}
        alt={track.title}
        width={size}
        height={size}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return <div style={{ width: "100%", height: "100%", background: bg }} />;
}

// Large card for Featured horizontal carousel
export function TrackCardLarge({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const active = currentTrack?.id === track.id;

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all hover:-translate-y-1"
      style={{ background: "var(--surface)", border: "1px solid rgba(227,233,239,0.95)", boxShadow: "var(--shadow-card)" }}
      onClick={() => toggle(track)}
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--surface2)]">
        <Image src={track.imageUrl} alt="" fill sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute left-3 top-3 premium-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">
          <Crown size={11} />
          Premium
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.38))" }}
        >
          <span className="h-12 w-12 rounded-full flex items-center justify-center bg-white/90 text-[var(--blue)] shadow-lg">
            {active && isPlaying ? <Pause size={21} /> : <Play size={21} fill="currentColor" style={{ marginLeft: 2 }} />}
          </span>
        </div>
      </div>

      <div className="p-4 min-w-0">
        <p className="font-medium text-base truncate">{track.title}</p>
        <p className="text-sm mt-0.5 truncate text-[var(--muted)]">{track.artist}</p>
        <p className="mt-3 text-xs font-semibold text-[var(--premium)]">WAV + stems available</p>
      </div>

      {active && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--blue)" }} />
      )}
    </div>
  );
}

// Grid card for Trending section
export function TrackCardGrid({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const active = currentTrack?.id === track.id;

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group transition-transform hover:scale-[1.02]"
      style={{ background: "var(--surface2)", border: `1px solid var(--border)` }}
      onClick={() => toggle(track)}
    >
      {/* Cover art */}
      <div className="relative" style={{ aspectRatio: "1", overflow: "hidden" }}>
        <CoverArt track={track} size={200} />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: active ? "var(--accent)" : "rgba(0,0,0,0.55)" }}
          >
            {active && isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" style={{ marginLeft: 2 }} />
            )}
          </div>
        </div>
        {active && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
              <Play size={20} className="text-white" style={{ marginLeft: 2 }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="font-semibold text-xs truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
        <div className="flex items-center gap-2 mt-1.5 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <span className="flex items-center gap-1"><Users size={10} />{formatPlays(track.plays)}</span>
        </div>
      </div>

      {active && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
      )}
    </div>
  );
}

// Row for list views
export function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const active = currentTrack?.id === track.id;

  return (
    <div
      className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer group transition-colors"
      style={{
        background: active ? "var(--blue-soft)" : "transparent",
        border: active ? "1px solid var(--blue)" : "1px solid transparent",
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      onClick={() => toggle(track)}
    >
      <div className="w-8 text-center flex-shrink-0">
        <span className="group-hover:hidden text-sm" style={{ color: "var(--foreground-muted)" }}>{index + 1}</span>
        <button className="hidden group-hover:flex items-center justify-center w-full">
          {active && isPlaying ? (
            <Pause size={16} style={{ color: "var(--blue)" }} />
          ) : (
            <Play size={16} style={{ color: "var(--blue)", marginLeft: 2 }} />
          )}
        </button>
      </div>

      <Image src={track.imageUrl} alt="" width={44} height={44} className="w-11 h-11 rounded object-cover flex-shrink-0" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: active ? "var(--blue)" : "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs truncate text-[var(--muted)]">{track.artist}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-4 text-xs flex-shrink-0 text-[var(--muted)]">
        <span className="flex items-center gap-1"><Users size={11} />{formatPlays(track.plays)}</span>
        <span>{track.size}</span>
        <span className="w-10 text-right">{track.duration}</span>
      </div>
    </div>
  );
}
