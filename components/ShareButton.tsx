"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import type { Track } from "@/lib/data";

export function ShareButton({ track, size = 15 }: { track: Track; size?: number }) {
  const [copied, setCopied] = useState(false);

  async function handleShare(e: React.MouseEvent) {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/station/${track.id}` : "";
    const shareData = { title: `${track.title} — ShemenMusic`, text: `Listen to "${track.title}" by ${track.artist} on ShemenMusic`, url };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  }

  return (
    <button
      onClick={handleShare}
      className="transition-transform hover:scale-110 active:scale-95"
      aria-label="Share track"
      style={{ color: copied ? "var(--accent)" : "var(--muted)", lineHeight: 1 }}
    >
      {copied ? <Check size={size} /> : <Share2 size={size} />}
    </button>
  );
}
