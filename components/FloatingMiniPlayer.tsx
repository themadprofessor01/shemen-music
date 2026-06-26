"use client";

import { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import { cleanTitle } from "@/lib/data";

export default function FloatingMiniPlayer() {
  const { currentTrack, isPlaying, play, pause, skipNext, skipPrev } = usePlayer();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!currentTrack || !visible) return null;

  const coverSrc = currentTrack.coverImage || currentTrack.imageUrl;
  const color = currentTrack.coverColor ?? "#075d9e";

  return (
    <div
      onClick={() => document.dispatchEvent(new CustomEvent("shemen:show-player"))}
      style={{
        position: "fixed",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 10px 6px 6px",
        borderRadius: 999,
        background: "color-mix(in srgb, var(--surface) 90%, transparent)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(20px)",
        boxShadow: `0 8px 32px rgba(12,24,35,0.2), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
        animation: "mini-player-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
        maxWidth: "calc(100vw - 32px)",
        minWidth: 260,
        cursor: "pointer",
      }}
    >
      {/* Album art */}
      <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
        {coverSrc
          ? <img src={coverSrc} alt="" style={{ width: 32, height: 32, objectFit: "cover" }} />
          : <div style={{ width: 32, height: 32, background: color }} />
        }
      </div>

      {/* Track title */}
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--foreground)",
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {cleanTitle(currentTrack.title)}
      </p>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
        <button
          onClick={skipPrev}
          style={{ color: "var(--foreground)", opacity: 0.55, padding: 4, lineHeight: 0 }}
          aria-label="Previous"
        >
          <SkipBack size={14} />
        </button>
        <button
          onClick={() => (isPlaying ? pause() : play(currentTrack))}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#0c1823",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying
            ? <Pause size={13} style={{ color: "white" }} />
            : <Play size={13} style={{ color: "white", marginLeft: 1 }} />
          }
        </button>
        <button
          onClick={skipNext}
          style={{ color: "var(--foreground)", opacity: 0.55, padding: 4, lineHeight: 0 }}
          aria-label="Next"
        >
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  );
}
