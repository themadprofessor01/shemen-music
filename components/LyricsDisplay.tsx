"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { usePlayer } from "@/components/MusicPlayerContext";
import { lyricsMap } from "@/lib/lyrics-map";

type LrcLine = {
  time: number;   // seconds
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
    const isSection = /^(verse|chorus|bridge|interlude|outro|intro|chant|break|hook|pre-chorus|tag|instrumental|refrain)\b/i.test(text)
      && text.length < 40;
    lines.push({ time, text, isSection });
  }
  return lines.sort((a, b) => a.time - b.time);
}

export function LyricsDisplay({ trackId }: { trackId: string }) {
  const { progress, duration, isPlaying, currentTrack, seek } = usePlayer();
  const [lines, setLines] = useState<LrcLine[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const userScrolling = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filename = lyricsMap[trackId];

  // Load LRC file
  useEffect(() => {
    if (!filename) { setLoading(false); return; }
    setLoading(true);
    fetch(`/lyrics/${filename}`)
      .then(r => r.text())
      .then(text => { setLines(parseLrc(text)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filename]);

  // Current time in seconds
  const currentTime = duration > 0 ? (progress / 100) * duration : 0;

  // Find active line index
  const activeIndex = useMemo(() => {
    if (!lines.length) return -1;
    let idx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].time <= currentTime) idx = i;
      else break;
    }
    return idx;
  }, [lines, currentTime]);

  // Auto-scroll to active line
  useEffect(() => {
    if (userScrolling.current) return;
    const el = activeRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const elTop = el.offsetTop;
    const center = elTop - container.clientHeight / 2 + el.clientHeight / 2;
    container.scrollTo({ top: center, behavior: "smooth" });
  }, [activeIndex]);

  // Detect user manual scroll — pause auto-scroll for 3s
  function handleScroll() {
    userScrolling.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => { userScrolling.current = false; }, 3000);
  }

  if (!filename) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex items-center gap-1.5">
          {[0,1,2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)", animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!lines.length) return null;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="overflow-y-auto"
      style={{ maxHeight: 420, scrollbarWidth: "none" }}
    >
      <style>{`.lyrics-scroll::-webkit-scrollbar{display:none}`}</style>
      <div className="py-8 px-1 flex flex-col gap-0.5">
        {lines.map((line, i) => {
          const isActive = i === activeIndex;
          const dist = Math.abs(i - activeIndex);

          if (line.isSection) {
            return (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] mt-4 mb-1 px-2"
                style={{ color: isActive ? "var(--accent)" : "var(--foreground-muted)", opacity: 0.6 }}>
                {line.text}
              </p>
            );
          }

          const opacity = isActive ? 1 : dist === 1 ? 0.45 : dist === 2 ? 0.3 : 0.18;
          const fontSize = isActive ? "1.2rem" : dist === 1 ? "1.05rem" : "0.95rem";

          return (
            <button
              key={i}
              ref={isActive ? activeRef : undefined}
              onClick={() => {
                const pct = (line.time / duration) * 100;
                seek(pct);
              }}
              className="text-left px-2 py-1 rounded-xl transition-all w-full hover:opacity-100"
              style={{
                fontSize,
                fontWeight: isActive ? 800 : 500,
                color: isActive ? "var(--foreground)" : "var(--foreground)",
                opacity,
                lineHeight: 1.4,
                transition: "opacity 0.3s ease, font-size 0.3s ease, font-weight 0.3s ease",
              }}
            >
              {line.text}
            </button>
          );
        })}
        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}
