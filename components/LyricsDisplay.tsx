"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { usePlayer, useProgress } from "@/components/MusicPlayerContext";
import { lyricsMap } from "@/lib/lyrics-map";

gsap.registerPlugin(GSAPSplitText);

type LrcLine = { time: number; text: string; isSection: boolean };

const LINE_H = 46;  // fixed px height for every line — no layout reflow

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

export function LyricsDisplay({ trackId, height = 400, centered = false }: { trackId: string; height?: number; centered?: boolean }) {
  const { seek } = usePlayer();
  const { progress, duration } = useProgress();
  const [lines, setLines] = useState<LrcLine[]>([]);
  const [loading, setLoading] = useState(true);
  const lineTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeSplitRef = useRef<InstanceType<typeof GSAPSplitText> | null>(null);

  const filename = lyricsMap[trackId];

  useEffect(() => {
    if (!filename) { setLoading(false); return; }
    setLoading(true);
    fetch(`/lyrics/${filename}`)
      .then(r => r.text())
      .then(text => { setLines(parseLrc(text)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filename]);

  const currentTime = duration > 0 ? (progress / 100) * duration : 0;

  const activeIndex = useMemo(() => {
    if (!lines.length) return -1;
    let idx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].time <= currentTime) idx = i;
      else break;
    }
    return idx;
  }, [lines, currentTime]);

  // GSAP SplitText char animation when active lyric line changes
  useEffect(() => {
    if (activeIndex < 0 || !lineTextRefs.current[activeIndex]) return;

    // Revert previous split
    if (activeSplitRef.current) {
      try { activeSplitRef.current.revert(); } catch { /* noop */ }
      activeSplitRef.current = null;
    }

    const el = lineTextRefs.current[activeIndex]!;
    const split = new GSAPSplitText(el, { type: "chars" });
    activeSplitRef.current = split;

    if (split.chars.length > 0) {
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: centered ? 14 : 8 },
        {
          opacity: 1,
          y: 0,
          duration: centered ? 0.5 : 0.32,
          ease: "power3.out",
          stagger: centered ? 0.028 : 0.016,
        }
      );
    }

    return () => {
      if (activeSplitRef.current === split) {
        try { split.revert(); } catch { /* noop */ }
        activeSplitRef.current = null;
      }
    };
  }, [activeIndex, centered]);

  // Slide the inner column so the active line sits at the vertical center
  const translateY = activeIndex < 0
    ? height / 2
    : height / 2 - activeIndex * LINE_H - LINE_H / 2;

  if (!filename) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)", animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!lines.length) return null;

  return (
    <div style={{ height, overflow: "hidden", position: "relative" }}>
      {/* Fade masks — same background as parent so lines dissolve in/out */}
      <div style={{ position: "absolute", inset: "0 0 auto 0", height: 90, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to bottom, var(--surface, #fff) 30%, transparent)" }} />
      <div style={{ position: "absolute", inset: "auto 0 0 0", height: 90, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to top, var(--surface, #fff) 30%, transparent)" }} />

      {/* Sliding column — only transform changes, so no layout reflow */}
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
          paddingInline: 8,
        }}
      >
        {lines.map((line, i) => {
          const isActive = i === activeIndex;
          const dist = Math.abs(i - activeIndex);
          const opacity = isActive ? 1 : dist === 1 ? 0.48 : dist === 2 ? 0.28 : 0.13;

          if (line.isSection) {
            return (
              <div key={i} style={{ height: LINE_H, display: "flex", alignItems: "center" }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.2em", color: "var(--accent)",
                  opacity: isActive ? 0.9 : opacity * 0.5,
                  transition: "opacity 0.45s ease",
                }}>
                  {line.text}
                </span>
              </div>
            );
          }

          return (
            <button
              key={i}
              onClick={() => seek((line.time / duration) * 100)}
              style={{
                height: LINE_H,
                width: "100%",
                display: "flex",
                alignItems: "center",
                textAlign: centered ? "center" : "left",
                justifyContent: centered ? "center" : "flex-start",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 4px",
                fontSize: isActive ? (centered ? "1.5rem" : "1.18rem") : (centered ? "1.2rem" : "1rem"),
                fontWeight: isActive ? 800 : 500,
                color: "var(--foreground)",
                opacity,
                lineHeight: 1.35,
                transition: "opacity 0.45s ease",
              }}
            >
              {/* dangerouslySetInnerHTML prevents React from reconciling children,
                  allowing GSAP SplitText to own the inner DOM safely */}
              <span
                ref={(el) => { lineTextRefs.current[i] = el; }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: line.text }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
