"use client";

import { Download, ListPlus, Maximize2, Mic, Pause, Play, SkipBack, SkipForward, Users, X } from "lucide-react";
import { LyricsDisplay } from "@/components/LyricsDisplay";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";
import { formatPlays, tracks as allTracks } from "@/lib/data";
import { useState } from "react";
import { LikeButton } from "@/components/LikeButton";
import { Equalizer } from "@/components/Equalizer";
import { CoverImage } from "@/components/CoverImage";
import { ShareButton } from "@/components/ShareButton";
import { KaraokeMode } from "@/components/KaraokeMode";

function CoverArt({ track, size }: { track: Track; size: number }) {
  return (
    <CoverImage
      src={track.coverImage || track.imageUrl}
      alt={track.title}
      coverColor={track.coverColor}
      size={size}
    />
  );
}

export function TrackCardLarge({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle, queue, setQueue } = usePlayer();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queued, setQueued] = useState(false);
  const active = currentTrack?.id === track.id;

  function addToQueue(e: React.MouseEvent) {
    e.stopPropagation();
    setQueue([...queue, track]);
    setQueued(true);
    setTimeout(() => setQueued(false), 2000);
  }

  return (
    <>
      <div
        className="luxury-hover-card relative flex-shrink-0 rounded-2xl cursor-pointer group"
        style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)" }}
        onClick={() => setDrawerOpen(true)}
      >
        <div className="relative flex items-center justify-center" style={{ aspectRatio: "1", overflow: "hidden" }}>
          <CoverArt track={track} size={200} />
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
        </div>
      <div className="p-3">
        <p className="font-semibold text-sm truncate" style={{ color: "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
        <WaveformPreview trackId={track.id} className="mt-3" />
        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[var(--muted)]">
          <span>{formatPlays(track.plays)} plays</span>
          <div className="flex items-center gap-2">
            <button
              onClick={addToQueue}
              title="Add to queue"
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-[var(--accent)]"
              style={{ color: queued ? "var(--accent)" : "var(--muted)" }}
            >
              <ListPlus size={13} />
            </button>
            <span>{track.duration}</span>
          </div>
        </div>
      </div>
        {active && (
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
        )}
      </div>
      <TrackDetailDrawer track={track} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

export function TrackCardGrid({ track }: { track: Track }) {
  const { currentTrack, isPlaying, toggle } = usePlayer();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const active = currentTrack?.id === track.id;

  return (
    <div
      className="luxury-hover-card relative rounded-xl cursor-pointer group"
      style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
      onClick={() => setDrawerOpen(true)}
    >
      <div className="relative" style={{ aspectRatio: "1", overflow: "hidden" }}>
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
      </div>
      <div className="p-3">
        <p className="font-semibold text-xs truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
        <WaveformPreview trackId={track.id} className="mt-3" compact />
        <div className="flex items-center justify-between mt-1.5 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <span className="flex items-center gap-1"><Users size={10} />{formatPlays(track.plays)}</span>
          <LikeButton trackId={track.id} size={13} />
        </div>
      </div>
      {active && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
      )}
      <TrackDetailDrawer track={track} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

export function TrackRow({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, toggle, queue, setQueue } = usePlayer();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [queued, setQueued] = useState(false);
  const active = currentTrack?.id === track.id;

  function addToQueue(e: React.MouseEvent) {
    e.stopPropagation();
    setQueue([...queue, track]);
    setQueued(true);
    setTimeout(() => setQueued(false), 2000);
  }

  return (
    <div
      className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer group transition-colors"
      style={{
        background: active ? "var(--accent-dim)" : "transparent",
        border: active ? "1px solid var(--accent)" : "1px solid transparent",
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
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
      <div className="w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden">
        <CoverArt track={track} size={36} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>{track.title}</p>
        <p className="text-xs truncate" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
      </div>
      <div className="hidden sm:flex items-center gap-3 text-xs flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>
        <span className="flex items-center gap-1"><Users size={11} />{formatPlays(track.plays)}</span>
        <span className="w-10 text-right">{track.duration}</span>
        <LikeButton trackId={track.id} />
        <button
          onClick={addToQueue}
          title="Add to queue"
          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-[var(--accent)] rounded-md p-1"
          style={{ color: queued ? "var(--accent)" : "var(--foreground-muted)" }}
        >
          <ListPlus size={15} />
        </button>
        <ShareButton track={track} />
      </div>
      <TrackDetailDrawer track={track} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

function fmt(secs: number) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function TrackDetailDrawer({ track, open, onClose }: { track: Track; open: boolean; onClose: () => void }) {
  const { currentTrack, isPlaying, toggle, play, setQueue, skipPrev, skipNext, seek } = usePlayer();
  const { progress, duration } = useProgress();
  const [karaokeOpen, setKaraokeOpen] = useState(false);
  const [lyricsFullscreen, setLyricsFullscreen] = useState(false);
  const active = currentTrack?.id === track.id;

  const related = allTracks.filter((t) => t.id !== track.id && t.artist === track.artist).slice(0, 5);

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
          <div className="aspect-square">
            <CoverArt track={track} size={440} />
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-black tracking-tight">{track.title}</h2>
        <p className="mt-1 text-[var(--muted)]">{track.artist}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <DrawerMetric value={track.duration} label="Runtime" />
          <DrawerMetric value={formatPlays(track.plays)} label="Plays" />
          <a
            href={track.downloadUrl ?? "#"}
            className="rounded-2xl p-3 flex flex-col items-center justify-center gap-1 text-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            aria-label={`Download ${track.title}`}
          >
            <Download size={18} style={{ color: "var(--premium)" }} />
            <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--muted)" }}>Download</p>
          </a>
        </div>

        <div className="mt-6 rounded-3xl p-5" style={{ background: "rgba(7,93,158,0.12)", border: "1px solid rgba(7,93,158,0.28)" }}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>Lyrics</p>
            <button
              onClick={() => setLyricsFullscreen(true)}
              className="h-7 w-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: "rgba(7,93,158,0.22)", color: "var(--accent)" }}
              aria-label="Fullscreen lyrics"
            >
              <Maximize2 size={13} />
            </button>
          </div>
          <LyricsDisplay trackId={track.id} />
        </div>

        {/* Related tracks */}
        {related.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--premium)" }}>More from {track.artist}</p>
            <div className="flex flex-col gap-1">
              {related.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setQueue(allTracks); play(t); }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:opacity-80"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
                >
                  <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                    <CoverImage src={t.coverImage || t.imageUrl} alt={t.title} coverColor={t.coverColor} size={32} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: "var(--foreground)" }}>{t.title}</p>
                    <p className="text-[10px] truncate" style={{ color: "var(--foreground-muted)" }}>{t.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }} onClick={() => toggle(track)}>
            {active && isPlaying ? "Pause" : "Listen now"}
          </button>
          {track.lyrics && (
            <button
              onClick={() => setKaraokeOpen(true)}
              className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ background: "var(--premium-soft)", color: "var(--premium)" }}
              aria-label="Karaoke mode"
            >
              <Mic size={18} />
            </button>
          )}
          <ShareButton track={track} size={18} />
        </div>
      </aside>

      {/* Fullscreen lyrics overlay */}
      {lyricsFullscreen && (
        <div className="fixed inset-0 z-[250] flex flex-col" style={{ background: "var(--background)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
            <div>
              <p className="font-black text-lg">{track.title}</p>
              <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>{track.artist}</p>
            </div>
            <button
              onClick={() => setLyricsFullscreen(false)}
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface2)" }}
              aria-label="Close fullscreen lyrics"
            >
              <X size={18} />
            </button>
          </div>

          {/* Lyrics */}
          <div className="flex-1 overflow-hidden px-6">
            <LyricsDisplay trackId={track.id} height={520} centered />
          </div>

          {/* Music controls footer */}
          <div className="flex-shrink-0 px-8 pb-8 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs opacity-40 w-8 text-right tabular-nums" style={{ color: "var(--foreground)" }}>
                {fmt(duration > 0 ? (progress / 100) * duration : 0)}
              </span>
              <input
                type="range" min={0} max={100} step={0.1}
                value={active ? progress : 0}
                onChange={(e) => { if (active) seek(Number(e.target.value)); }}
                className="flex-1"
                style={{ background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${active ? progress : 0}%, rgba(12,24,35,0.15) ${active ? progress : 0}%, rgba(12,24,35,0.15) 100%)` }}
              />
              <span className="text-xs opacity-40 w-8 tabular-nums" style={{ color: "var(--foreground)" }}>
                {fmt(active ? duration : 0)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-10">
              <button onClick={skipPrev} className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
                <SkipBack size={28} />
              </button>
              <button
                onClick={() => toggle(track)}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "#0c1823", boxShadow: "0 12px 32px rgba(12,24,35,0.3)" }}
                aria-label={isPlaying && active ? "Pause" : "Play"}
              >
                {isPlaying && active
                  ? <Pause size={26} className="text-white" />
                  : <Play size={26} className="text-white" style={{ marginLeft: 3 }} />
                }
              </button>
              <button onClick={skipNext} className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
                <SkipForward size={28} />
              </button>
            </div>
          </div>
        </div>
      )}

      <KaraokeMode track={track} open={karaokeOpen} onClose={() => setKaraokeOpen(false)} />
    </div>
  );
}

function WaveformPreview({ trackId, compact = false, className = "" }: { trackId: string; compact?: boolean; className?: string }) {
  const seed = trackId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const bars = Array.from({ length: compact ? 18 : 28 }, (_, index) => {
    const value = ((seed + index * 11) % 17) + (index % 3) * 4;
    return compact ? 5 + (value % 15) : 7 + (value % 22);
  });

  return (
    <div className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-1 rounded-full"
          style={{
            height,
            background: index < bars.length * 0.42 ? "var(--premium)" : "rgba(12,24,35,0.14)",
            opacity: index < bars.length * 0.42 ? 0.9 : 0.78,
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
