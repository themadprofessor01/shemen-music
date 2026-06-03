"use client";

import { Play, Shuffle } from "lucide-react";
import { usePlayer } from "@/components/MusicPlayerContext";
import type { Track } from "@/lib/data";

export function PlayAllButton({ tracks }: { tracks: Track[] }) {
  const { play, setQueue } = usePlayer();

  function playAll() {
    if (tracks.length === 0) return;
    setQueue(tracks);
    play(tracks[0]);
  }

  function shuffle() {
    if (tracks.length === 0) return;
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    play(shuffled[0]);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={playAll}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
        style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}
      >
        <Play size={14} style={{ marginLeft: 1 }} />
        Play All
      </button>
      <button
        onClick={shuffle}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
        style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
      >
        <Shuffle size={14} />
        Shuffle
      </button>
    </div>
  );
}
