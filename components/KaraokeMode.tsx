"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, X, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import { lyricsMap } from "@/lib/lyrics-map";
import { cleanTitle } from "@/lib/data";

type LrcLine = { time: number; text: string; isSection: boolean };

function parseLrc(raw: string): LrcLine[] {
  const lines: LrcLine[] = [];
  for (const line of raw.split("\n")) {
    const match = line.match(/^\[(\d+):(\d+\.\d+)\](.*)/);
    if (!match) continue;
    const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
    const text = match[3].trim();
    if (!text) continue;
    const isSection =
      /^(verse|chorus|bridge|interlude|outro|intro|chant|break|hook|pre-chorus|tag|instrumental|refrain)\b/i.test(text) &&
      text.length < 40;
    lines.push({ time, text, isSection });
  }
  return lines.sort((a, b) => a.time - b.time);
}

function fmt(secs: number) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function KaraokeMode({ trackId, open, onClose }: { trackId: string; open: boolean; onClose: () => void }) {
  const { currentTrack, isPlaying, play, pause, seek, skipNext, skipPrev } = usePlayer();
  const { progress, duration } = useProgress();
  const [lines, setLines] = useState<LrcLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const prevIndexRef = useRef(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const userScrolling = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filename = lyricsMap[trackId];

  // Load LRC
  useEffect(() => {
    if (!filename || !open) return;
    setLines([]);
    setActiveIndex(-1);
    prevIndexRef.current = -1;
    fetch(`/lyrics/${filename}`)
      .then(r => r.text())
      .then(text => setLines(parseLrc(text)))
      .catch(() => {});
  }, [filename, open]);

  // Track active line
  useEffect(() => {
    if (!lines.length || duration <= 0) return;
    const t = (progress / 100) * duration;
    let idx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].time <= t) idx = i;
      else break;
    }
    if (idx !== prevIndexRef.current) {
      prevIndexRef.current = idx;
      setActiveIndex(idx);
    }
  }, [progress, duration, lines]);

  // Auto-scroll to active line
  useEffect(() => {
    if (userScrolling.current || activeIndex < 0) return;
    const el = lineRefs.current[activeIndex];
    const container = containerRef.current;
    if (!el || !container) return;
    const target = el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;
    container.scrollTo({ top: target, behavior: "smooth" });
  }, [activeIndex]);

  function handleScroll() {
    userScrolling.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { userScrolling.current = false; }, 4000);
  }

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const coverSrc = currentTrack?.coverImage || currentTrack?.imageUrl;
  const accentColor = currentTrack?.coverColor ?? "#075d9e";
  const currentTime = (progress / 100) * duration;
  const hasLyrics = lines.length > 0;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
      style={{ background: "#05080d" }}
    >
      {/* Blurred album art background */}
      {coverSrc && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${coverSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px)",
            transform: "scale(1.1)",
          }}
        />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,8,13,0.7) 0%, rgba(5,8,13,0.5) 50%, rgba(5,8,13,0.9) 100%)" }} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Mic size={16} className="text-white opacity-70" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/60">Karaoke</span>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-white/90 truncate max-w-xs">{currentTrack ? cleanTitle(currentTrack.title) : ""}</p>
          <p className="text-xs text-white/50">{currentTrack?.artist}</p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.1)" }}
          aria-label="Close karaoke"
        >
          <X size={16} className="text-white" />
        </button>
      </div>

      {/* Lyrics */}
      <div className="relative flex-1 min-h-0 z-10">
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #05080d, transparent)" }} />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #05080d, transparent)" }} />

        {!hasLyrics ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Mic size={40} className="text-white opacity-20" />
            <p className="text-white/40 text-sm">No lyrics available for this track</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto px-6 md:px-24 lg:px-40"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div style={{ paddingTop: "40%", paddingBottom: "40%", display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
              {lines.map((line, i) => {
                const isActive = i === activeIndex;
                const dist = Math.abs(i - activeIndex);

                if (line.isSection) {
                  return (
                    <p
                      key={i}
                      ref={el => { lineRefs.current[i] = el; }}
                      className="text-xs font-bold uppercase tracking-[0.22em] mt-8 mb-2"
                      style={{
                        color: accentColor,
                        opacity: isActive ? 0.9 : 0.25,
                        transition: "opacity 0.6s ease",
                      }}
                    >
                      {line.text}
                    </p>
                  );
                }

                const fontSize = isActive ? "clamp(1.8rem, 5vw, 3rem)" : dist === 1 ? "clamp(1.1rem, 3vw, 1.6rem)" : "clamp(0.9rem, 2.5vw, 1.3rem)";
                const opacity = isActive ? 1 : dist === 1 ? 0.45 : dist === 2 ? 0.22 : 0.1;
                const fontWeight = isActive ? 900 : 500;

                return (
                  <button
                    key={i}
                    ref={el => { lineRefs.current[i] = el; }}
                    onClick={() => seek((line.time / duration) * 100)}
                    className="block w-full leading-tight"
                    style={{
                      fontSize,
                      fontWeight,
                      color: isActive ? "white" : "rgba(255,255,255,0.9)",
                      opacity,
                      textShadow: isActive ? `0 0 60px ${accentColor}88, 0 2px 20px rgba(0,0,0,0.8)` : "none",
                      transition: "opacity 0.5s ease, font-size 0.5s cubic-bezier(0.4,0,0.2,1), text-shadow 0.5s ease",
                      paddingTop: isActive ? 14 : 6,
                      paddingBottom: isActive ? 14 : 6,
                      willChange: "opacity, font-size",
                    }}
                  >
                    {line.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 px-6 pb-8 pt-2">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs text-white/40 w-8 text-right">{fmt(currentTime)}</span>
          <input
            type="range" min={0} max={100} step={0.1} value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1"
            style={{
              background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${progress}%, rgba(255,255,255,0.15) ${progress}%, rgba(255,255,255,0.15) 100%)`
            }}
          />
          <span className="text-xs text-white/40 w-8">{fmt(duration)}</span>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-center gap-8">
          <button onClick={skipPrev} className="text-white/60 hover:text-white transition-colors">
            <SkipBack size={22} />
          </button>
          <button
            onClick={() => currentTrack && (isPlaying ? pause() : play(currentTrack))}
            className="w-16 h-16 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
            style={{ background: accentColor, boxShadow: `0 8px 32px ${accentColor}66` }}
          >
            {isPlaying ? <Pause size={22} className="text-white" /> : <Play size={22} className="text-white" style={{ marginLeft: 3 }} />}
          </button>
          <button onClick={skipNext} className="text-white/60 hover:text-white transition-colors">
            <SkipForward size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
