"use client";

import Fuse from "fuse.js";
import { useSearch } from "@/components/SearchContext";
import { usePlayer } from "@/components/MusicPlayerContext";
import { tracks } from "@/lib/data";
import { Play, Pause, X } from "lucide-react";

const fuse = new Fuse(tracks, {
  keys: [
    { name: "title", weight: 3 },
    { name: "artist", weight: 2 },
    { name: "mood", weight: 1 },
    { name: "tags", weight: 1 },
  ],
  threshold: 0.35,
  includeScore: true,
});

export default function SearchOverlay() {
  const { query, setQuery } = useSearch();
  const { currentTrack, isPlaying, toggle, setQueue } = usePlayer();

  if (!query.trim()) return null;

  const results = query.length < 2
    ? tracks.filter((t) => t.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 12)
    : fuse.search(query, { limit: 20 }).map((r) => r.item);

  function handlePlay(index: number) {
    setQueue(results);
    toggle(results[index]);
  }

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ top: 64, left: 192, bottom: 80 }}
      onClick={() => setQuery("")}
    >
      <div
        className="absolute left-4 right-4 top-2 max-w-xl mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 60px rgba(12,24,35,0.18)",
          maxHeight: "calc(100vh - 180px)",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 sticky top-0"
          style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </span>
          <button onClick={() => setQuery("")} style={{ color: "var(--muted)" }}>
            <X size={16} />
          </button>
        </div>

        {results.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm" style={{ color: "var(--muted)" }}>
            No tracks found
          </div>
        ) : (
          <div className="py-1">
            {results.map((track, i) => {
              const active = currentTrack?.id === track.id;
              const coverSrc = track.coverImage || track.imageUrl;
              return (
                <div
                  key={track.id}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                  style={{ background: active ? "var(--accent-dim)" : "transparent" }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--surface2)"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  onClick={() => handlePlay(i)}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                    {coverSrc
                      ? <img src={coverSrc} alt={track.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ width: "100%", height: "100%", background: track.coverColor }} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: active ? "var(--accent)" : "var(--foreground)" }}>
                      {track.title}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--muted)" }}>
                      {track.artist}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{track.duration}</span>
                    <button
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                      style={{ background: "var(--accent)" }}
                    >
                      {active && isPlaying
                        ? <Pause size={12} className="text-white" />
                        : <Play size={12} className="text-white" style={{ marginLeft: 1 }} />
                      }
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
