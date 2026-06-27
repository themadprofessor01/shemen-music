"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, ListMusic, Wind, Share2, Shuffle, Repeat, Repeat1, Mic } from "lucide-react";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import { cleanTitle } from "@/lib/data";
import { initAudioEngine, getAnalyser, setReverb, isReverbOn, resumeContext, isInitialized } from "@/lib/audioEngine";
import { KaraokeMode } from "@/components/KaraokeMode";
import { lyricsMap } from "@/lib/lyrics-map";

function fmt(secs: number) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Real-time frequency visualizer ────────────────────────────────────────────
function AudioVisualizer({ isPlaying, accentColor }: { isPlaying: boolean; accentColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  // Fallback animated heights when analyser not ready
  const fallbackRef = useRef<number[]>(Array.from({ length: 24 }, () => 8));
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(rafRef.current!);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx2d.clearRect(0, 0, W, H);

      const analyser = getAnalyser();
      const bars = 24;
      const barW = Math.floor(W / bars) - 1;

      if (analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const step = Math.floor(data.length / bars);

        for (let i = 0; i < bars; i++) {
          const val = data[i * step] / 255;
          const bH = Math.max(3, val * H);
          const x = i * (barW + 1);
          const alpha = 0.35 + val * 0.65;
          ctx2d.fillStyle = accentColor + Math.round(alpha * 255).toString(16).padStart(2, "0");
          ctx2d.beginPath();
          ctx2d.roundRect(x, H - bH, barW, bH, 2);
          ctx2d.fill();
        }
      } else {
        // Animated fallback
        timeRef.current += 0.06;
        for (let i = 0; i < bars; i++) {
          const base = 4 + ((i * 7 + 3) % 12);
          const bH = base + Math.abs(Math.sin(timeRef.current * (0.8 + i * 0.15)) * (H * 0.55));
          const x = i * (barW + 1);
          const progress = i / bars;
          ctx2d.fillStyle = progress < 0.4 ? accentColor + "99" : "rgba(12,24,35,0.18)";
          ctx2d.beginPath();
          ctx2d.roundRect(x, H - bH, barW, bH, 2);
          ctx2d.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [isPlaying, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      width={144}
      height={24}
      style={{ display: "block" }}
    />
  );
}

// ── Share card modal ───────────────────────────────────────────────────────────
function ShareCardModal({ onClose }: { onClose: () => void }) {
  const { currentTrack } = usePlayer();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentTrack) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 600;
    const H = 315; // 1.91:1 Open Graph ratio
    canvas.width = W;
    canvas.height = H;

    // Background gradient using cover color
    const color = currentTrack.coverColor ?? "#075d9e";
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, `rgba(${r},${g},${b},1)`);
    bg.addColorStop(1, `rgba(${Math.max(r - 60, 0)},${Math.max(g - 60, 0)},${Math.max(b - 60, 0)},1)`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Noise texture overlay
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 0, W, H);

    // Album art (left side)
    const coverSrc = currentTrack.coverImage || currentTrack.imageUrl;
    const artSize = 200;
    const artX = 48;
    const artY = (H - artSize) / 2;

    if (coverSrc) {
      try {
        const img = new window.Image();
        // Load without crossOrigin so image always renders (avoids CORS failures)
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = coverSrc;
        });
        // Rounded rect clip
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(artX, artY, artSize, artSize, 16);
        ctx.clip();
        ctx.drawImage(img, artX, artY, artSize, artSize);
        ctx.restore();
      } catch {
        // Fallback: translucent color block
        ctx.fillStyle = `rgba(255,255,255,0.15)`;
        ctx.beginPath();
        ctx.roundRect(artX, artY, artSize, artSize, 16);
        ctx.fill();
      }
    } else {
      // No art: draw colored placeholder
      ctx.fillStyle = `rgba(255,255,255,0.15)`;
      ctx.beginPath();
      ctx.roundRect(artX, artY, artSize, artSize, 16);
      ctx.fill();
    }

    // Text area (right side)
    const textX = artX + artSize + 36;
    const textW = W - textX - 40;

    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.font = "500 11px -apple-system, sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("NOW PLAYING", textX, artY + 20);
    ctx.letterSpacing = "0px";

    // Title
    ctx.fillStyle = "white";
    ctx.font = `700 ${cleanTitle(currentTrack.title).length > 24 ? 22 : 28}px -apple-system, sans-serif`;
    const title = cleanTitle(currentTrack.title);
    // Word wrap
    const words = title.split(" ");
    let line = "";
    let lineY = artY + 56;
    for (const word of words) {
      const test = line + (line ? " " : "") + word;
      if (ctx.measureText(test).width > textW && line) {
        ctx.fillText(line, textX, lineY);
        line = word;
        lineY += 34;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, textX, lineY);

    // Artist
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "400 14px -apple-system, sans-serif";
    ctx.fillText(currentTrack.artist || "ShemenMusic", textX, lineY + 28);

    // Branding bottom right
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "600 12px -apple-system, sans-serif";
    ctx.letterSpacing = "1px";
    ctx.fillText("shemenmusic.com", W - 160, H - 24);

    // Decorative circle
    ctx.beginPath();
    ctx.arc(W - 30, 30, 60, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fill();

    setReady(true);
  }, [currentTrack]);

  useEffect(() => { draw(); }, [draw]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const link = document.createElement("a");
      link.download = `shemen-${cleanTitle(currentTrack?.title ?? "track").replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Canvas tainted (image CORS) — open as image in new tab instead
      const win = window.open();
      if (win) win.document.write(`<img src="${canvas.toDataURL("image/png")}" />`);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 400,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)", borderRadius: 20, padding: 24,
          maxWidth: 660, width: "100%",
          border: "1px solid var(--border)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Share Card</p>
          <button onClick={onClose} style={{ color: "var(--muted)", opacity: 0.6 }}>
            <X size={16} />
          </button>
        </div>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", borderRadius: 12, display: "block" }}
        />
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button
            onClick={async () => {
              const url = `${window.location.origin}`;
              const shareData = {
                title: `${cleanTitle(currentTrack?.title ?? "")} — ShemenMusic`,
                text: `Listen to "${cleanTitle(currentTrack?.title ?? "")}" by ${currentTrack?.artist} on ShemenMusic`,
                url,
              };
              try {
                if (navigator.share) {
                  await navigator.share(shareData);
                } else {
                  await navigator.clipboard.writeText(url);
                  // briefly show feedback
                  const btn = document.getElementById("share-link-btn");
                  if (btn) { btn.textContent = "Copied!"; setTimeout(() => { btn.textContent = "Copy Link"; }, 2000); }
                }
              } catch {}
            }}
            id="share-link-btn"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 12,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Copy Link
          </button>
          <button
            onClick={download}
            disabled={!ready}
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: 12,
              background: "#0c1823",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              opacity: ready ? 1 : 0.5,
              cursor: ready ? "pointer" : "default",
            }}
          >
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main MusicPlayer ───────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const {
    currentTrack, isPlaying, play, pause,
    seek,
    volume, setVolume,
    muted, setMuted,
    skipNext, skipPrev,
    queue,
    getAudioElement,
    shuffle, setShuffle,
    repeat, setRepeat,
    playbackRate, setPlaybackRate,
  } = usePlayer();
  const { progress, duration } = useProgress();
  const [dismissed, setDismissed] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [reverbEnabled, setReverbEnabled] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showKaraoke, setShowKaraoke] = useState(false);
  const [consolidatedUp, setConsolidatedUp] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hide bottom player while scrolling (any direction); restore 400ms after scrolling stops
  useEffect(() => {
    const onScroll = () => {
      setConsolidatedUp(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setConsolidatedUp(false), 400);
    };
    const onShowPlayer = () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      setConsolidatedUp(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("shemen:show-player", onShowPlayer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("shemen:show-player", onShowPlayer);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // Init audio engine lazily on first play
  useEffect(() => {
    if (!isPlaying) return;
    const el = getAudioElement();
    if (el && !isInitialized()) {
      initAudioEngine(el);
    }
    resumeContext();
  }, [isPlaying, getAudioElement]);

  // Reset dismissed when new track loads
  useEffect(() => { setDismissed(false); }, [currentTrack?.id]);

  const toggleReverb = () => {
    const next = !reverbEnabled;
    setReverbEnabled(next);
    setReverb(next);
  };

  const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
  const cycleSpeed = () => {
    const idx = SPEEDS.indexOf(playbackRate);
    setPlaybackRate(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  const cycleRepeat = () => {
    const next: Record<"off" | "one" | "all", "off" | "one" | "all"> = { off: "all", all: "one", one: "off" };
    setRepeat(next[repeat]);
  };

  if (!currentTrack || dismissed) return null;

  const currentTime = (progress / 100) * duration;
  const coverSrc = currentTrack.coverImage || currentTrack.imageUrl;
  const accentColor = currentTrack.coverColor ?? "#075d9e";

  return (
    <>
      {showShare && <ShareCardModal onClose={() => setShowShare(false)} />}
      {showKaraoke && currentTrack && <KaraokeMode trackId={currentTrack.id} open={showKaraoke} onClose={() => setShowKaraoke(false)} />}

      {/* Mobile full-screen player */}
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
            <div className="flex items-center justify-between mb-1">
              <div className="min-w-0">
                <p className="text-2xl font-black truncate" style={{ color: "var(--foreground)" }}>{cleanTitle(currentTrack.title)}</p>
                <p className="text-sm mt-0.5 truncate" style={{ color: "var(--muted)" }}>{currentTrack.artist}</p>
              </div>
              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => setShuffle(!shuffle)}
                  title="Shuffle"
                  style={{ color: shuffle ? accentColor : "var(--muted)", opacity: shuffle ? 1 : 0.5, padding: 4 }}
                >
                  <Shuffle size={17} />
                </button>
                <button
                  onClick={cycleRepeat}
                  title={repeat === "off" ? "Repeat off" : repeat === "all" ? "Repeat all" : "Repeat one"}
                  style={{ color: repeat !== "off" ? accentColor : "var(--muted)", opacity: repeat !== "off" ? 1 : 0.5, padding: 4 }}
                >
                  {repeat === "one" ? <Repeat1 size={17} /> : <Repeat size={17} />}
                </button>
                <button onClick={cycleSpeed} title={`Speed: ${playbackRate}×`} style={{ color: playbackRate !== 1 ? accentColor : "var(--muted)", opacity: playbackRate !== 1 ? 1 : 0.5, padding: 4, fontSize: 11, fontWeight: 700, minWidth: 28 }}>
                  {playbackRate}×
                </button>
                <button
                  onClick={toggleReverb}
                  title="Sanctuary Reverb"
                  style={{
                    color: reverbEnabled ? accentColor : "var(--muted)",
                    opacity: reverbEnabled ? 1 : 0.5,
                    padding: 4,
                  }}
                >
                  <Wind size={18} />
                </button>
                <button
                  onClick={() => setShowShare(true)}
                  title="Share Card"
                  style={{ color: "var(--muted)", opacity: 0.5, padding: 4 }}
                >
                  <Share2 size={18} />
                </button>
                {lyricsMap[currentTrack.id] && (
                  <button
                    onClick={() => setShowKaraoke(true)}
                    title="Karaoke Mode"
                    style={{ color: "var(--accent)", opacity: 0.85, padding: 4 }}
                  >
                    <Mic size={18} />
                  </button>
                )}
              </div>
            </div>
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
      <div
        className="fixed left-0 right-0 md:left-48 bottom-16 md:bottom-4 z-50 px-3 md:px-4"
        style={{
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease",
          transform: consolidatedUp ? "translateY(140%)" : "translateY(0)",
          opacity: consolidatedUp ? 0 : 1,
          pointerEvents: consolidatedUp ? "none" : "auto",
        }}
      >
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
          {/* Track info */}
          <div className="relative flex items-center flex-1 min-w-0">
            {/* Mobile X button — absolutely positioned so track info stays centered */}
            <button
              className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity z-10"
              onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
              style={{ color: "var(--foreground)", padding: 4 }}
              aria-label="Close player"
            >
              <X size={18} />
            </button>
            <div
              className="flex items-center gap-3 flex-1 min-w-0 justify-center sm:justify-start pr-8 sm:pr-0"
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
                <div className="mt-2 hidden sm:block">
                  <AudioVisualizer isPlaying={isPlaying} accentColor={accentColor} />
                </div>
              </div>
            </div>
          </div>

          {/* Playback controls + progress */}
          <div className="flex flex-col items-stretch gap-2 sm:flex-shrink-0 sm:items-center">
            <div className="flex items-center justify-center gap-4">
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

          {/* Volume + controls + queue + close */}
          <div className="hidden items-center gap-3 flex-shrink-0 sm:flex">
            {/* Shuffle */}
            <button
              onClick={() => setShuffle(!shuffle)}
              title="Shuffle"
              style={{ color: shuffle ? accentColor : "var(--foreground)", opacity: shuffle ? 1 : 0.45, transition: "color 0.2s, opacity 0.2s" }}
            >
              <Shuffle size={15} />
            </button>
            {/* Repeat */}
            <button
              onClick={cycleRepeat}
              title={repeat === "off" ? "Repeat off" : repeat === "all" ? "Repeat all" : "Repeat one"}
              style={{ color: repeat !== "off" ? accentColor : "var(--foreground)", opacity: repeat !== "off" ? 1 : 0.45, transition: "color 0.2s, opacity 0.2s" }}
            >
              {repeat === "one" ? <Repeat1 size={15} /> : <Repeat size={15} />}
            </button>
            {/* Speed */}
            <button
              onClick={cycleSpeed}
              title={`Playback speed: ${playbackRate}×`}
              style={{ color: playbackRate !== 1 ? accentColor : "var(--foreground)", opacity: playbackRate !== 1 ? 1 : 0.45, fontSize: 11, fontWeight: 700, minWidth: 24, transition: "color 0.2s, opacity 0.2s" }}
            >
              {playbackRate}×
            </button>
            <div style={{ width: 1, height: 16, background: "var(--border)" }} />
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
            {/* Sanctuary Reverb */}
            <button
              onClick={toggleReverb}
              title={reverbEnabled ? "Sanctuary Reverb On" : "Sanctuary Reverb Off"}
              style={{
                color: reverbEnabled ? accentColor : "var(--foreground)",
                opacity: reverbEnabled ? 1 : 0.5,
                transition: "color 0.2s, opacity 0.2s",
              }}
            >
              <Wind size={16} />
            </button>
            {/* Share card */}
            <button
              onClick={() => setShowShare(true)}
              title="Share Now Playing card"
              className="opacity-50 hover:opacity-80 transition-opacity"
              style={{ color: "var(--foreground)" }}
            >
              <Share2 size={16} />
            </button>
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
