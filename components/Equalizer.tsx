"use client";

import { usePlayer } from "@/components/MusicPlayerContext";

export function Equalizer({ trackId, size = 14 }: { trackId: string; size?: number }) {
  const { currentTrack, isPlaying } = usePlayer();
  const active = currentTrack?.id === trackId && isPlaying;

  return (
    <span
      className="inline-flex items-end gap-px flex-shrink-0"
      aria-hidden="true"
      style={{ height: size, width: size * 1.2 }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: Math.floor(size / 4),
            borderRadius: 2,
            background: "var(--accent)",
            animationName: active ? `eq-bar-${i}` : "none",
            animationDuration: active ? `${0.7 + i * 0.15}s` : undefined,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            height: active ? size * 0.5 : size * 0.25,
            alignSelf: "flex-end",
            transition: active ? "none" : "height 0.2s",
          }}
        />
      ))}
      <style>{`
        @keyframes eq-bar-0 { from { height: ${size * 0.25}px } to { height: ${size}px } }
        @keyframes eq-bar-1 { from { height: ${size * 0.5}px } to { height: ${size * 0.7}px } }
        @keyframes eq-bar-2 { from { height: ${size * 0.3}px } to { height: ${size * 0.9}px } }
      `}</style>
    </span>
  );
}
