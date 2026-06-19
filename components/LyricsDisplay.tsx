"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import { lyricsMap } from "@/lib/lyrics-map";

type LrcLine = {
  time: number;
  text: string;
  isSection: boolean;
};

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

export function LyricsDisplay({ trackId }: { trackId: string }) {
  const { seek } = usePlayer();
  const { progress, duration } = useProgress();
  const [lines, setLines] = useState<LrcLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const prevIndexRef = useRef(-1);
  const userScrolling = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filename = lyricsMap[trackId];

  // Load LRC file
  useEffect(() => {
    if (!filename) { setLoading(false); return; }
    setLoading(true);
    setActiveIndex(-1);
    prevIndexRef.current = -1;
    fetch(`/lyrics/${filename}`)
      .then(r => r.text())
      .then(text => { setLines(parseLrc(text)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filename]);

  // Only update activeIndex state when the line actually changes — avoids re-renders on every tick
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

  // Smooth scroll to active line — only fires when activeIndex changes
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

  function copyLyrics() {
    const text = lines
      .filter(l => !l.isSection)
      .map(l => l.text)
      .join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!filename) return null;
  if (loading) return (
    <div className="flex justify-center py-8">
      <div className="flex gap-1.5">
        {[0,1,2].map(i => (
          <span key={i} className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent)", animationDelay: `${i * 150}ms` }} />
        ))}
      </div>
    </div>
  );
  if (!lines.length) return null;

  return (
    <div>
      {/* Copy button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={copyLyrics}
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
          style={{
            background: "var(--surface)",
            color: copied ? "var(--accent)" : "var(--muted)",
            border: "1px solid var(--border)",
            transition: "color 0.2s ease",
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy lyrics"}
        </button>
      </div>

    <div className="relative" style={{ maxHeight: 400 }}>
      {/* Gradient fade at top and bottom */}
      <div className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--surface2), transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--surface2), transparent)" }} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-y-auto"
        style={{ maxHeight: 400, scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div style={{ paddingTop: 80, paddingBottom: 100, display: "flex", flexDirection: "column", gap: 2 }}>
          {lines.map((line, i) => {
            const isActive = i === activeIndex;
            const dist = Math.abs(i - activeIndex);

            if (line.isSection) {
              return (
                <p
                  key={i}
                  ref={el => { lineRefs.current[i] = el; }}
                  className="text-[10px] font-bold uppercase tracking-[0.22em] px-2 mt-5 mb-1"
                  style={{
                    color: "var(--accent)",
                    opacity: isActive ? 0.9 : 0.35,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  {line.text}
                </p>
              );
            }

            // Scale instead of font-size — no layout reflow = no jitter
            const scale = isActive ? 1.08 : 1;
            const opacity = isActive ? 1 : dist === 1 ? 0.5 : dist === 2 ? 0.32 : 0.18;
            const weight = isActive ? 800 : 500;

            return (
              <button
                key={i}
                ref={el => { lineRefs.current[i] = el; }}
                onClick={() => seek((line.time / duration) * 100)}
                className="text-left w-full px-2 rounded-lg"
                style={{
                  fontSize: "1.05rem",
                  fontWeight: weight,
                  lineHeight: 1.55,
                  color: "var(--foreground)",
                  opacity,
                  transform: `scale(${scale})`,
                  transformOrigin: "left center",
                  transition: "opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1), font-weight 0.4s ease",
                  paddingTop: isActive ? 6 : 3,
                  paddingBottom: isActive ? 6 : 3,
                  willChange: "opacity, transform",
                }}
              >
                {line.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
