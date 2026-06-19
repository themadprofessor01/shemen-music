"use client";

import Image from "next/image";
import type { Track } from "@/lib/data";

const DURATION = 14;  // seconds per full rotation
const RADIUS = 80;    // px from orbit center to card center
const CARD_W = 120;
const CARD_H = 145;

// Card's left edge offset from container center
const LEFT_OFFSET = RADIUS - CARD_W / 2; // 80 - 60 = 20px
// Transform origin: orbit center relative to card's top-left corner
const ORIGIN_X = CARD_W / 2 - RADIUS; // 60 - 80 = -20px
const ORIGIN_Y = CARD_H / 2;           // 72.5px

export function HeroCarousel({ tracks }: { tracks: Track[] }) {
  const items = tracks.slice(0, 3);

  return (
    <div
      className="relative w-full"
      style={{ height: 320 }}
    >
      {items.map((track, i) => (
        <div
          key={track.id}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: LEFT_OFFSET,
            marginTop: -CARD_H / 2,
            width: CARD_W,
            height: CARD_H,
            transformOrigin: `${ORIGIN_X}px ${ORIGIN_Y}px`,
            animation: `orbit-spin ${DURATION}s linear infinite`,
            animationDelay: `${-(i * DURATION / 3)}s`,
          }}
        >
          {/* Counter-rotate inner card so it stays upright */}
          <div
            style={{
              width: "100%",
              height: "100%",
              animation: `orbit-counter ${DURATION}s linear infinite`,
              animationDelay: `${-(i * DURATION / 3)}s`,
            }}
          >
            <div
              className="h-full overflow-hidden shadow-2xl"
              style={{ borderRadius: "1.25rem", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.08)" }}
            >
              <div className="relative" style={{ height: "73%" }}>
                {track.imageUrl
                  ? <Image src={track.imageUrl} alt="" fill sizes="120px" style={{ objectFit: "cover" }} priority={i === 0} />
                  : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor}88)` }} />
                }
              </div>
              <div className="px-2.5 py-2" style={{ background: "rgba(255,255,255,0.92)" }}>
                <p className="truncate text-xs font-bold" style={{ color: "#0c1823" }}>{track.title}</p>
                <p className="truncate text-[10px]" style={{ color: "#74706a" }}>{track.artist}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
