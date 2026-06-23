"use client";

import { useRef, useState, useCallback } from "react";

interface SeekBarProps {
  progress: number;       // 0–100
  duration: number;       // seconds
  accentColor: string;
  onSeek: (pct: number) => void;
}

function fmt(secs: number) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SeekBar({ progress, duration, accentColor, onSeek }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [hoverPct, setHoverPct] = useState<number | null>(null);

  const pctFromEvent = useCallback((clientX: number): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const { left, width } = el.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    onSeek(pctFromEvent(e.clientX));
  }, [pctFromEvent, onSeek]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const pct = pctFromEvent(e.clientX);
    setHoverPct(pct);
    if (isDragging.current) onSeek(pct);
  }, [pctFromEvent, onSeek]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (isDragging.current) {
      onSeek(pctFromEvent(e.clientX));
      isDragging.current = false;
    }
  }, [pctFromEvent, onSeek]);

  const onPointerLeave = useCallback(() => {
    isDragging.current = false;
    setHoverPct(null);
  }, []);

  const hoverTime = hoverPct !== null && duration ? (hoverPct / 100) * duration : null;

  return (
    <div className="relative w-full" style={{ touchAction: "none" }}>
      {/* Time tooltip */}
      {hoverPct !== null && hoverTime !== null && (
        <div
          className="absolute bottom-full mb-2 px-2 py-0.5 rounded text-xs font-semibold pointer-events-none select-none"
          style={{
            left: `clamp(18px, ${hoverPct}%, calc(100% - 18px))`,
            transform: "translateX(-50%)",
            background: "rgba(12,24,35,0.88)",
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          {fmt(hoverTime)}
        </div>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className="relative w-full cursor-pointer"
        style={{ height: 20, display: "flex", alignItems: "center" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        <div className="relative w-full rounded-full overflow-hidden" style={{ height: 4, background: "rgba(12,24,35,0.15)" }}>
          {/* Progress fill */}
          <div
            style={{
              position: "absolute",
              inset: "0 0 0 0",
              width: `${progress}%`,
              background: accentColor,
              borderRadius: "inherit",
              transition: isDragging.current ? "none" : "width 0.1s linear",
            }}
          />
          {/* Hover ghost */}
          {hoverPct !== null && (
            <div
              style={{
                position: "absolute",
                inset: "0 0 0 0",
                width: `${hoverPct}%`,
                background: `${accentColor}55`,
                borderRadius: "inherit",
              }}
            />
          )}
        </div>

        {/* Thumb */}
        <div
          style={{
            position: "absolute",
            left: `${progress}%`,
            transform: "translateX(-50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#fff",
            border: `2px solid ${accentColor}`,
            boxShadow: "0 1px 6px rgba(0,0,0,0.25)",
            transition: isDragging.current ? "none" : "left 0.1s linear",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
