"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, ListMusic } from "lucide-react";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import { cleanTitle } from "@/lib/data";

function fmt(secs: number) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    currentTrack, isPlaying, play, pause,
    seek,
    volume, setVolume,
    muted, setMuted,
    skipNext, skipPrev,
    queue,
  } = usePlayer();
  const { progress, duration } = useProgress();
  const [dismissed, setDismissed] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const [barHeights, setBarHeights] = useState(() => Array.from({ length: 24 }, () => 8));
  const rafRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isPlaying) { cancelAnimationFrame(rafRef.current!); return; }
    const animate = () => {
      timeRef.current += 0.06;
      setBarHeights(prev => prev.map((_, i) => {
        const base = 5 + ((i * 7 + 3) % 17);
        return base + Math.abs(Math.sin(timeRef.current * (0.8 + i * 0.15)) * 14);
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [isPlaying]);

  if (!currentTrack || dismissed) return null;

  const currentTime = (progress / 100) * duration;
  const coverSrc = currentTrack.coverImage || currentTrack.imageUrl;
  const accentColor = currentTrack.coverColor ?? "#075d9e";

  return (
    <>
      {/* Mobile full-screen player — only visible on mobile */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col md:hidden"
          style={{ background: "var(--surface)", paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <button
              onClick={() => setFullscreen(false)}
              className="opacity-60 hover:opacity-100 p-2"
              style={{ color: "var(--foreground)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>Now Playing</p>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent("shemen:open-drawer", { detail: { trackId: currentTrack.id } }))}
              className="opacity-60 hover:opacity-100 p-2"
              style={{ color: "var(--foreground)" }}
              aria-label="Track details"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center px-10 py-4">
            <div className="w-full aspect-square overflow-hidden rounded-[2rem]" style={{ boxShadow: `0 32px 80px ${accentColor}55` }}>
              {coverSrc
                ? <img src={coverSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", background: accentColor }} />
              }
            </div>
          </div>

          <div className="px-7 pb-2">
            <p className="text-2xl font-black truncate" style={{ color: "var(--foreground)" }}>{cleanTitle(currentTrack.title)}</p>
            <p className="text-sm mt-0.5 truncate" style={{ color: "var(--muted)" }}>{currentTrack.artist}</p>
          </div>

          <div className="px-7 py-3">
            <input
              type="range" min={0} max={100} step={0.1} value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full"
              style={{ background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${progress}%, rgba(12,24,35,0.15) ${progress}%, rgba(12,24,35,0.15) 100%)` }}
            />
            <div className="flex justify-between text-xs mt-1 opacity-50" style={{ color: "var(--foreground)" }}>
              <span>{fmt(currentTime)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-10 pb-8">
            <button onClick={skipPrev} className="opacity-60 hover:opacity-100 p-2" style={{ color: "var(--foreground)" }}>
              <SkipBack size={28} />
            </button>
            <button
              onClick={() => (isPlaying ? pause() : play(currentTrack))}
              className="rounded-full flex items-center justify-center"
              style={{ background: "#0c1823", width: 72, height: 72, boxShadow: "0 16px 40px rgba(12,24,35,0.3)" }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white" style={{ marginLeft: 3 }} />}
            </button>
            <button onClick={skipNext} className="opacity-60 hover:opacity-100 p-2" style={{ color: "var(--foreground)" }}>
              <SkipForward size={28} />
            </button>
          </div>
        </div>
      )}

      {/* Mini player bar */}
      <div className="fixed inset-x-0 bottom-16 md:bottom-4 z-50 px-3 md:px-4">
        {/* Queue Panel */}
        {queueOpen && (
          <div
            className="mx-auto mb-3 max-w-5xl rounded-2xl border overflow-hidden"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "0 24px 70px rgba(12,24,35,0.22)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 sticky top-0"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Queue · {queue.length} track{queue.length !== 1 ? "s" : ""}
              </span>
              <button onClick={() => setQueueOpen(false)} className="opacity-50 hover:opacity-100" style={{ color: "var(--foreground)" }}>
                <X size={15} />
              </button>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 300 }}>
              {queue.map((track) => {
                const isActive = track.id === currentTrack?.id;
                const cover = track.coverImage || track.imageUrl;
                return (
                  <button
                    key={track.id}
                    onClick={() => play(track)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{ background: isActive ? "var(--accent-dim)" : "transparent" }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 6, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                      {cover
                        ? <img src={cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ width: "100%", height: "100%", background: track.coverColor }} />
                      }
                      {isActive && (
                        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {isPlaying
                            ? <Pause size={10} className="text-white" />
                            : <Play size={10} className="text-white" style={{ marginLeft: 1 }} />
                          }
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate" style={{ color: isActive ? "var(--accent)" : "var(--foreground)" }}>
                        {cleanTitle(track.title)}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{track.artist}</p>
                    </div>
                    {track.duration && (
                      <span className="text-xs flex-shrink-0" style={{ color: "var(--muted)" }}>{track.duration}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div
          className="motion-rise mx-auto flex max-w-5xl flex-col gap-3 rounded-[1.6rem] border px-4 py-3 sm:flex-row sm:items-center sm:gap-5"
          style={{
            background: "color-mix(in srgb, var(--surface) 86%, transparent)",
            borderColor: "var(--border)",
            boxShadow: "0 24px 70px rgba(12,24,35,0.2)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Track info — tapping opens fullscreen on mobile */}
          <div
            className="flex items-center gap-3 flex-1 min-w-0"
            style={{ cursor: "pointer" }}
            onClick={() => { if (window.innerWidth < 768) setFullscreen(true); }}
            role="button"
            aria-label="Expand player"
          >
            <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 40, height: 40 }}>
              {coverSrc
                ? <img src={coverSrc} alt="" style={{ width: 40, height: 40, objectFit: "cover" }} />
                : <div style={{ width: 40, height: 40, background: currentTrack.coverColor }} />
              }
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black truncate" style={{ color: "var(--foreground)" }}>{cleanTitle(currentTrack.title)}</p>
              <p className="text-xs truncate" style={{ color: "var(--muted)" }}>{currentTrack.artist}</p>
              <div className="mt-2 hidden sm:flex items-end gap-1">
                {barHeights.map((h, index) => (
                  <span
                    key={index}
                    className="w-1 rounded-full"
                    style={{
                      height: h,
                      background: index * 4 < progress ? accentColor : "rgba(12,24,35,0.13)",
                      transition: isPlaying ? "none" : "height 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Playback controls + progress */}
          <div className="flex flex-col items-stretch gap-2 sm:flex-shrink-0 sm:items-center">
            <div className="flex items-center gap-4">
              <button onClick={skipPrev} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
                <SkipBack size={18} />
              </button>
              <button
                onClick={() => (isPlaying ? pause() : play(currentTrack))}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
                style={{ background: "#0c1823", boxShadow: "0 14px 28px rgba(12,24,35,0.24)" }}
                aria-label={isPlaying ? "Pause track" : "Play track"}
              >
                {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" style={{ marginLeft: 2 }} />}
              </button>
              <button onClick={skipNext} className="opacity-50 hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)" }}>
                <SkipForward size={18} />
              </button>
            </div>

            <div className="flex w-full items-center gap-2 sm:w-64 sm:max-w-full">
              <span className="text-xs opacity-40 w-7 text-right" style={{ color: "var(--foreground)" }}>{fmt(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="flex-1"
                style={{
                  background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${progress}%, rgba(12,24,35,0.15) ${progress}%, rgba(12,24,35,0.15) 100%)`
                }}
              />
              <span className="text-xs opacity-40 w-7" style={{ color: "var(--foreground)" }}>{fmt(duration)}</span>
            </div>
          </div>

          {/* Volume + queue + close */}
          <div className="hidden items-center gap-3 flex-shrink-0 sm:flex">
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
            <button
              onClick={() => setQueueOpen((o) => !o)}
              className="transition-opacity"
              style={{ color: queueOpen ? "var(--accent)" : "var(--foreground)", opacity: queueOpen ? 1 : 0.5 }}
              aria-label="Toggle queue"
            >
              <ListMusic size={17} />
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="opacity-35 hover:opacity-80 transition-opacity ml-1"
              style={{ color: "var(--foreground)" }}
              aria-label="Close player"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
