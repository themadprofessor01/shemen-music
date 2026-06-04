"use client";

import { Download, Pause, Play, Users, X } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";
import { formatPlays } from "@/lib/data";
import { useState } from "react";
import { LikeButton } from "@/components/LikeButton";
import { Equalizer } from "@/components/Equalizer";
import { CoverImage } from "@/components/CoverImage";
import { ShareButton } from "@/components/ShareButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

function CoverArt({ track, size, priority }: { track: Track; size: number; priority?: boolean }) {
  return (
    <CoverImage
      src={track.coverImage || track.imageUrl}
      alt={track.title}
      coverColor={track.coverColor}
      size={size}
      priority={priority}
    />
  );
}

export function TrackCardLarge({ track, priority }: { track: Track; priority?: boolean }) {
  const { currentTrack, isPlaying, toggle, preload } = usePlayer();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = currentTrack?.id === track.id;
  const { ref: tiltRef, onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useMagneticTilt(6);

  return (
    <>
      <div
        ref={tiltRef}
        className="luxury-hover-card relative flex-shrink-0 rounded-2xl cursor-pointer group"
        style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)" }}
        onClick={() => setDrawerOpen(true)}
        onMouseEnter={() => { preload(track); setHovered(true); }}
        onMouseMove={tiltMove}
        onMouseLeave={() => { setHovered(false); tiltLeave(); }}
      >
        <div
          className="relative"
          style={{
            paddingBottom: "100%",
            overflow: "hidden",
            boxShadow: hovered ? `0 8px 32px ${track.coverColor}66` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <CoverArt track={track} size={200} priority={priority} />
          </div>
          <button
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`${active && isPlaying ? "Pause" : "Play"} ${track.title}`}
            onClick={(event) => {
              event.stopPropagation();
              toggle(track);
            }}
          >
            <span
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110"
              style={{ background: active ? "var(--accent)" : "rgba(0,0,0,0.45)" }}
            >
              {active && isPlaying ? (
                <Pause size={22} className="text-white" />
              ) : (
                <Play size={22} className="text-white" style={{ marginLeft: 2 }} />
              )}
            </span>
          </button>
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/18 bg-black/42 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/82 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <span>Preview</span>
            <span>{track.duration}</span>
          </div>
          <div className="absolute top-2 right-2 rounded-full p-1.5" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(8px)" }}>
            <LikeButton trackId={track.id} size={15} color="rgba(255,255,255,0.85)" />
          </div>
        </div>
      <div className="p-3">
        <p className="font-semibold text-sm truncate" style={{ color: "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
        <WaveformPreview trackId={track.id} className="mt-3" />
        <div className="mt-2 flex items-center justify-between text-[11px]" style={{ color: "var(--foreground-muted)" }}>
          <span>{formatPlays(track.plays)} plays</span>
          <div className="flex items-center gap-2">
            <span>{track.duration}</span>
            {(track.audioUrl ?? track.downloadUrl) && (
              <a
                href={track.audioUrl ?? track.downloadUrl ?? "#"}
                download
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-6 h-6 rounded-full transition-opacity hover:opacity-70"
                style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                aria-label={`Download ${track.title}`}
              >
                <Download size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
      </div>
      <TrackDetailDrawer track={track} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

export function TrackCardGrid({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle, preload } = usePlayer();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = currentTrack?.id === track.id;
  const { ref, revealed } = useScrollReveal();
  const { ref: tiltRef, onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useMagneticTilt(7);

  return (
    <div
      ref={(el) => { (ref as React.MutableRefObject<HTMLDivElement | null>).current = el; (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}
      className={`luxury-hover-card relative rounded-xl cursor-pointer group scroll-reveal${revealed ? " revealed" : ""}`}
      style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
      onClick={() => setDrawerOpen(true)}
      onMouseEnter={() => { preload(track); setHovered(true); }}
      onMouseMove={tiltMove}
      onMouseLeave={() => { setHovered(false); tiltLeave(); }}
    >
      <div
        className="relative"
        style={{
          paddingBottom: "100%",
          overflow: "hidden",
          boxShadow: hovered ? `0 8px 32px ${track.coverColor}66` : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <CoverArt track={track} size={200} />
        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          aria-label={`${active && isPlaying ? "Pause" : "Play"} ${track.title}`}
          onClick={(event) => {
            event.stopPropagation();
            toggle(track);
          }}
        >
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: active ? "var(--accent)" : "rgba(0,0,0,0.55)" }}
          >
            {active && isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" style={{ marginLeft: 2 }} />
            )}
          </span>
        </button>
        {active && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
              <Play size={20} className="text-white" style={{ marginLeft: 2 }} />
            </div>
          </div>
        )}
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-full bg-black/46 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/82 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <span>Preview</span>
          <span>{track.duration}</span>
        </div>
        <div className="absolute top-2 right-2 rounded-full p-1.5" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(8px)" }}>
          <LikeButton trackId={track.id} size={14} color="rgba(255,255,255,0.85)" />
        </div>
      </div>
      <div className="p-3">
        <p className="font-semibold text-xs truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
        <WaveformPreview trackId={track.id} className="mt-3" compact />
        <div className="flex items-center justify-between mt-1.5 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <span className="flex items-center gap-1"><Users size={10} />{formatPlays(track.plays)}</span>
          {(track.audioUrl ?? track.downloadUrl) && (
            <a
              href={track.audioUrl ?? track.downloadUrl ?? "#"}
              download
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-5 h-5 rounded-full transition-opacity hover:opacity-70"
              style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
              aria-label={`Download ${track.title}`}
            >
              <Download size={10} />
            </a>
          )}
        </div>
      </div>
      {active && (
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
      )}
      <TrackDetailDrawer track={track} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

export function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, toggle, preload } = usePlayer();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const active = currentTrack?.id === track.id;
  const { ref, revealed } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer group transition-colors scroll-reveal${revealed ? " revealed" : ""}`}
      style={{
        background: active ? "var(--accent-dim)" : "transparent",
        border: active ? "1px solid var(--accent)" : "1px solid transparent",
      }}
      onMouseEnter={(e) => { preload(track); if (!active) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      onClick={() => setDrawerOpen(true)}
    >
      <div className="w-8 text-center flex-shrink-0 flex items-center justify-center">
        {active && isPlaying ? (
          <Equalizer trackId={track.id} size={16} />
        ) : (
          <>
            <span className="group-hover:hidden text-sm" style={{ color: "var(--foreground-muted)" }}>{index + 1}</span>
            <button
              className="hidden group-hover:flex items-center justify-center w-full"
              onClick={(event) => {
                event.stopPropagation();
                toggle(track);
              }}
            >
              <Play size={16} style={{ color: "var(--accent)", marginLeft: 2 }} />
            </button>
          </>
        )}
      </div>
      <div className="relative w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden">
        <CoverArt track={track} size={36} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <LikeButton trackId={track.id} />
        <div className="hidden sm:flex items-center gap-4 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <span className="flex items-center gap-1"><Users size={11} />{formatPlays(track.plays)}</span>
          <span>{track.size}</span>
          <span className="w-10 text-right">{track.duration}</span>
          <ShareButton track={track} />
        </div>
      </div>
      <TrackDetailDrawer track={track} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

function TrackDetailDrawer({ track, open, onClose }: { track: Track; open: boolean; onClose: () => void }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const active = currentTrack?.id === track.id;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end" role="dialog" aria-modal="true" aria-label={`${track.title} details`}>
      <button className="absolute inset-0 bg-[rgba(12,24,35,0.34)]" aria-label="Close track details" onClick={onClose} />
      <aside className="relative h-full w-full max-w-md overflow-y-auto p-5 sm:p-6" style={{ background: "color-mix(in srgb, var(--surface) 96%, transparent)", borderLeft: "1px solid var(--border)", boxShadow: "-24px 0 70px rgba(12,24,35,0.18)", backdropFilter: "blur(24px)" }}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Studio Detail</p>
          <button className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: "var(--surface2)" }} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.6rem]" style={{ boxShadow: "var(--shadow-card)" }}>
          <div style={{ position: "relative", paddingBottom: "100%", overflow: "hidden" }}>
            <CoverArt track={track} size={440} />
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-black tracking-tight">{track.title}</h2>
        <p className="mt-1 text-[var(--muted)]">{track.artist}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <DrawerMetric value={track.duration} label="Runtime" />
          <DrawerMetric value={track.size} label="File" />
          <DrawerMetric value={formatPlays(track.plays)} label="Plays" />
        </div>

        <div className="mt-6 rounded-3xl p-5" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Waveform preview</p>
          <WaveformPreview trackId={track.id} className="mt-5" />
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }} onClick={() => toggle(track)}>
            {active && isPlaying ? "Pause" : "Listen now"}
          </button>
          <ShareButton track={track} size={18} />
          <a className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: "var(--premium-soft)", color: "var(--premium)" }} href={track.audioUrl ?? track.downloadUrl ?? "#"} aria-label={`Download ${track.title}`}>
            <Download size={18} />
          </a>
        </div>
      </aside>
    </div>
  );
}

function WaveformPreview({ trackId, compact = false, className = "" }: { trackId: string; compact?: boolean; className?: string }) {
  const { ref, revealed } = useScrollReveal();
  const seed = trackId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const bars = Array.from({ length: compact ? 18 : 28 }, (_, index) => {
    const value = ((seed + index * 11) % 17) + (index % 3) * 4;
    return compact ? 5 + (value % 15) : 7 + (value % 22);
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex items-center gap-1 ${className}`}
      aria-hidden="true"
    >
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-1 rounded-full"
          style={{
            height,
            background: index < bars.length * 0.42 ? "var(--premium)" : "rgba(12,24,35,0.14)",
            opacity: revealed ? (index < bars.length * 0.42 ? 0.9 : 0.78) : 0,
            transform: revealed ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom",
            transition: `opacity 0.35s ease ${index * 18}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 18}ms`,
          }}
        />
      ))}
    </div>
  );
}

function DrawerMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl p-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <p className="font-black">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
    </div>
  );
}
