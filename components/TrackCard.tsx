"use client";

import { Download, Mic, Pause, Play, Users, X } from "lucide-react";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";
import { formatPlays, cleanTitle, tracks as allTracks } from "@/lib/data";
import { useEffect, useRef, useState } from "react";
import { LikeButton } from "@/components/LikeButton";
import { Equalizer } from "@/components/Equalizer";
import { CoverImage } from "@/components/CoverImage";
import { ShareButton } from "@/components/ShareButton";
import { KaraokeMode } from "@/components/KaraokeMode";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";
import { LyricsDisplay } from "@/components/LyricsDisplay";
import { lyricsMap } from "@/lib/lyrics-map";

function dlHref(track: Track) {
  const url = track.audioUrl ?? track.downloadUrl ?? "";
  if (!url) return "#";
  const ext = url.endsWith(".m4a") ? "m4a" : "mp3";
  const filename = encodeURIComponent(`${track.title}.${ext}`);
  return `/api/download?url=${encodeURIComponent(url)}&filename=${filename}`;
}

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

  useEffect(() => {
    function handler(e: Event) {
      if ((e as CustomEvent).detail?.trackId === track.id) setDrawerOpen(true);
    }
    document.addEventListener("shemen:open-drawer", handler);
    return () => document.removeEventListener("shemen:open-drawer", handler);
  }, [track.id]);

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
        <p className="font-semibold text-sm truncate" style={{ color: "var(--foreground)" }}>{cleanTitle(track.title)}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
        <WaveformPreview trackId={track.id} className="mt-3" />
        <div className="mt-2 flex items-center justify-between text-[11px]" style={{ color: "var(--foreground-muted)" }}>
          <span>{formatPlays(track.plays)} plays</span>
          <div className="flex items-center gap-2">
            <span>{track.duration}</span>
            {(track.audioUrl ?? track.downloadUrl) && (
              <a
                href={dlHref(track)}
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

  useEffect(() => {
    function handler(e: Event) {
      if ((e as CustomEvent).detail?.trackId === track.id) setDrawerOpen(true);
    }
    document.addEventListener("shemen:open-drawer", handler);
    return () => document.removeEventListener("shemen:open-drawer", handler);
  }, [track.id]);

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
        <p className="font-semibold text-xs truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>{cleanTitle(track.title)}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
        <WaveformPreview trackId={track.id} className="mt-3" compact />
        <div className="flex items-center justify-between mt-1.5 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <span className="flex items-center gap-1"><Users size={10} />{formatPlays(track.plays)}</span>
          {(track.audioUrl ?? track.downloadUrl) && (
            <a
              href={dlHref(track)}
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
        <p className="text-sm font-medium truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>{cleanTitle(track.title)}</p>
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
  const { currentTrack, isPlaying, toggle, play, setQueue } = usePlayer();
  const active = currentTrack?.id === track.id;
  const [karaokeOpen, setKaraokeOpen] = useState(false);

  const related = allTracks
    .filter((t) => t.id !== track.id && t.artist === track.artist)
    .slice(0, 5);

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

        <h2 className="mt-6 text-3xl font-black tracking-tight">{cleanTitle(track.title)}</h2>
        <p className="mt-1 text-[var(--muted)]">{track.artist}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <DrawerMetric value={track.duration} label="Runtime" />
          {(track.audioUrl ?? track.downloadUrl) ? (
            <a
              href={dlHref(track)}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl p-3 flex flex-col gap-1 transition-opacity hover:opacity-80"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              aria-label={`Download ${track.title}`}
            >
              <div className="flex items-center gap-1.5">
                <Download size={14} style={{ color: "var(--premium)" }} />
                <p className="font-black text-sm">Download</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Free MP3</p>
            </a>
          ) : (
            <DrawerMetric value={track.size || "—"} label="File" />
          )}
          <DrawerMetric value={formatPlays(track.plays)} label="Plays" />
        </div>

        {(track.bpm || track.musicalKey || track.mood || (track.tags && track.tags.length > 0)) && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {track.bpm && <DrawerMetric value={`${track.bpm} BPM`} label="Tempo" />}
            {track.musicalKey && <DrawerMetric value={track.musicalKey} label="Key" />}
            {track.mood && !track.bpm && <DrawerMetric value={track.mood} label="Mood" />}
            {track.tags && track.tags.length > 0 && (
              <div className="col-span-2 rounded-2xl p-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {track.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 rounded-3xl p-5" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Waveform preview</p>
          <WaveformPreview trackId={track.id} className="mt-5" />
        </div>

        {lyricsMap[track.id] && (
          <div className="mt-6 rounded-3xl p-5" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Lyrics</p>
              <button
                onClick={() => setKaraokeOpen(true)}
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
                style={{ background: "var(--accent)", color: "white" }}
                aria-label="Open karaoke mode"
              >
                <Mic size={11} />
                Karaoke
              </button>
            </div>
            <p className="text-[11px] mb-3" style={{ color: "var(--foreground-muted)" }}>
              {active && isPlaying ? "Following along…" : "Play the track to sync"}
            </p>
            <LyricsDisplay trackId={track.id} />
          </div>
        )}
        <KaraokeMode trackId={track.id} open={karaokeOpen} onClose={() => setKaraokeOpen(false)} />

        {related.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] mb-3">More from {track.artist}</p>
            <div className="space-y-1">
              {related.map((t) => {
                const relActive = currentTrack?.id === t.id;
                const relCover = t.coverImage || t.imageUrl;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setQueue(allTracks); play(t); }}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                    style={{ background: relActive ? "var(--accent-dim)" : "transparent" }}
                    onMouseEnter={(e) => { if (!relActive) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
                    onMouseLeave={(e) => { if (!relActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                      {relCover
                        ? <img src={relCover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ width: "100%", height: "100%", background: t.coverColor }} />
                      }
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate" style={{ color: relActive ? "var(--accent)" : "var(--foreground)" }}>
                        {cleanTitle(t.title)}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{t.duration}</p>
                    </div>
                    <span style={{ color: relActive ? "var(--accent)" : "var(--muted)" }}>
                      {relActive && isPlaying ? <Pause size={13} /> : <Play size={13} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }} onClick={() => toggle(track)}>
            {active && isPlaying ? "Pause" : "Listen now"}
          </button>
          <ShareButton track={track} size={18} />
          <a className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: "var(--premium-soft)", color: "var(--premium)" }} href={dlHref(track)} aria-label={`Download ${track.title}`}>
            <Download size={18} />
          </a>
        </div>
      </aside>
    </div>
  );
}

function WaveformPreview({ trackId, compact = false, className = "" }: { trackId: string; compact?: boolean; className?: string }) {
  const { currentTrack, seek } = usePlayer(); // stable — only changes on track switch
  const [revealed, setRevealed] = useState(false);
  const isActive = currentTrack?.id === trackId;

  const barCount = compact ? 18 : 28;
  const seed = trackId.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const heights = Array.from({ length: barCount }, (_, i) => {
    const v = ((seed + i * 11) % 17) + (i % 3) * 4;
    return compact ? 5 + (v % 15) : 7 + (v % 22);
  });

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Static render for non-active tracks — no progress subscription, zero re-renders on ticks
  if (!isActive) {
    return (
      <div className={`flex items-end gap-[2px] ${className}`} style={{ userSelect: "none" }}>
        {heights.map((h, i) => (
          <span key={i} style={{
            display: "block", width: compact ? 3 : 4, height: h, borderRadius: 99,
            background: "var(--border)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scaleY(1)" : "scaleY(0.2)",
            transformOrigin: "bottom",
            transition: `opacity 0.35s ease ${i * 18}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 18}ms`,
          }} />
        ))}
      </div>
    );
  }

  // Active track: sub-component subscribes to progress — only this instance re-renders on ticks
  return <ActiveWaveformBars heights={heights} seek={seek} compact={compact} className={className} revealed={revealed} />;
}

// Only mounts for the currently-playing track — sole subscriber to ProgressContext among waveforms
function ActiveWaveformBars({ heights, seek, compact, className, revealed }: {
  heights: number[]; seek: (p: number) => void; compact: boolean; className: string; revealed: boolean;
}) {
  const { progress } = useProgress();
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const barCount = heights.length;

  function seekFromX(clientX: number) {
    const el = barRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    seek(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }

  return (
    <div
      ref={barRef}
      className={`flex items-end gap-[2px] ${className}`}
      style={{ cursor: "pointer", userSelect: "none" }}
      onMouseDown={(e) => { e.preventDefault(); dragging.current = true; seekFromX(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) seekFromX(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => { dragging.current = true; seekFromX(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (dragging.current) seekFromX(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {heights.map((height, i) => (
        <span key={i} style={{
          display: "block", width: compact ? 3 : 4, height, borderRadius: 99,
          background: (i / barCount) * 100 <= progress ? "var(--accent)" : "var(--border)",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scaleY(1)" : "scaleY(0.2)",
          transformOrigin: "bottom",
          transition: `background 0.08s ease, opacity 0.35s ease ${i * 18}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 18}ms`,
        }} />
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
