"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Track } from "@/lib/data";

const CARD_W = 360;
const CARD_H = 435;

// Position offsets (relative to container center) for each slot:
// slot 0 = spotlight (center-front), slot 1 = back-left, slot 2 = back-right
const SLOTS = [
  { x: 0,    y:   0, scale: 1.0,  z: 3, opacity: 1    },
  { x: -150, y:  45, scale: 0.72, z: 1, opacity: 0.60 },
  { x:  130, y:  26, scale: 0.78, z: 2, opacity: 0.65 },
];

export function HeroCarousel({ tracks }: { tracks: Track[] }) {
  const items = tracks.slice(0, 3);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full" style={{ height: 480 }}>
      {items.map((track, i) => {
        // Which slot does this card currently occupy?
        const slotIdx = (i - activeIdx + items.length) % items.length;
        const { x, y, scale, z, opacity } = SLOTS[slotIdx];
        return (
          <div
            key={track.id}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: CARD_W,
              height: CARD_H,
              marginLeft: -CARD_W / 2,
              marginTop: -CARD_H / 2,
              zIndex: z,
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              opacity,
              transition: "transform 0.55s cubic-bezier(0.34,1.4,0.64,1), opacity 0.45s ease",
            }}
          >
            <div
              className="h-full overflow-hidden shadow-2xl"
              style={{ borderRadius: "2rem", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.08)" }}
            >
              <div className="relative" style={{ height: "78%" }}>
                {track.imageUrl
                  ? <Image src={track.imageUrl} alt={track.title} fill sizes="480px" style={{ objectFit: "cover" }} priority />
                  : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor}88)` }} />
                }
              </div>
              <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.92)" }}>
                <p className="truncate text-base font-bold" style={{ color: "#0c1823" }}>{track.title}</p>
                <p className="truncate text-sm mt-0.5" style={{ color: "#74706a" }}>{track.artist}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
