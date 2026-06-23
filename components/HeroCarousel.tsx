"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Track } from "@/lib/data";

// 3× the original 120×145 cards
const CARD_W = 360;
const CARD_H = 435;
const SIDE_OFFSET = 240;  // px from center → side card center
const SIDE_SCALE = 0.72;
const INTERVAL_MS = 4000;

export function HeroCarousel({ tracks }: { tracks: Track[] }) {
  const items = tracks.slice(0, 3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(prev => (prev + 1) % items.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className="relative w-full" style={{ height: CARD_H + 48 }}>
      {items.map((track, i) => {
        // Normalize diff to -1, 0, +1 for 3 items
        let diff = i - active;
        if (diff > 1) diff -= items.length;
        if (diff < -1) diff += items.length;

        const isCenter = diff === 0;
        const tx = diff * SIDE_OFFSET;
        const scale = isCenter ? 1 : SIDE_SCALE;

        return (
          <div
            key={track.id}
            onClick={() => !isCenter && setActive(i)}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: CARD_W,
              height: CARD_H,
              marginLeft: -CARD_W / 2,
              transform: `translateX(${tx}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.75s ease",
              zIndex: isCenter ? 3 : 1,
              opacity: isCenter ? 1 : 0.55,
              cursor: isCenter ? "default" : "pointer",
            }}
          >
            <div
              className="h-full w-full overflow-hidden"
              style={{
                borderRadius: "1.75rem",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: isCenter
                  ? "0 48px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)"
                  : "0 20px 50px rgba(0,0,0,0.32)",
                background: track.coverColor ?? "rgba(12,24,35,0.6)",
              }}
            >
              {/* Cover art — 78% height */}
              <div className="relative" style={{ height: "78%" }}>
                {track.imageUrl ? (
                  <Image
                    src={track.imageUrl}
                    alt={track.title}
                    fill
                    sizes="360px"
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(160deg, ${track.coverColor ?? "#123655"}, ${(track.coverColor ?? "#123655")}88)`,
                    }}
                  />
                )}
                {/* Bottom gradient on image for smooth transition to info bar */}
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{ height: 48, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.9))" }}
                />
              </div>

              {/* Info bar — 22% height */}
              <div
                className="flex flex-col justify-center"
                style={{ height: "22%", padding: "0 20px", background: "rgba(255,255,255,0.96)" }}
              >
                <p
                  className="truncate font-black leading-tight"
                  style={{ color: "#0c1823", fontSize: "1.05rem" }}
                >
                  {track.title}
                </p>
                <p className="truncate text-sm mt-0.5" style={{ color: "#74706a" }}>
                  {track.artist}
                </p>
                {track.duration && (
                  <p className="text-xs mt-1 font-bold" style={{ color: "#b6863a" }}>
                    {track.duration}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation dots */}
      <div
        className="absolute flex justify-center items-center gap-2"
        style={{ bottom: 8, left: 0, right: 0 }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to card ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: active === i ? 24 : 6,
              height: 6,
              background: "rgba(255,255,255,0.9)",
              opacity: active === i ? 1 : 0.38,
            }}
          />
        ))}
      </div>
    </div>
  );
}
