"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TrackRow } from "@/components/TrackCard";
import type { Track } from "@/lib/data";
import { PlayAllButton } from "@/components/PlayAllButton";
import { EmptyState } from "@/components/EmptyState";

const PAGE_SIZE = 10;

export function TrackList({ tracks }: { tracks: Track[] }) {
  const [page, setPage] = useState(1);

  if (!tracks.length) {
    return (
      <EmptyState title="No tracks in this room yet." actionHref="/instrumentals" actionLabel="Browse instrumentals">
        This collection is ready for curation. Start with the wider catalogue and bring your favorite worship moments back here.
      </EmptyState>
    );
  }

  const totalPages = Math.ceil(tracks.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageTracks = tracks.slice(start, start + PAGE_SIZE);

  function goTo(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {tracks.length} track{tracks.length !== 1 ? "s" : ""}
          {totalPages > 1 && <span className="ml-2 opacity-60">— Page {page} of {totalPages}</span>}
        </p>
        <PlayAllButton tracks={tracks} />
      </div>
      <div className="rounded overflow-hidden divide-y" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        {pageTracks.map((track, index) => (
          <TrackRow key={track.id} track={track} index={start + index} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-opacity disabled:opacity-30"
            style={{ color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
          >
            <ChevronLeft size={15} /> Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className="w-9 h-9 rounded-lg text-sm font-bold transition-all"
              style={{
                background: p === page ? "linear-gradient(135deg, var(--ink), var(--blue-deep))" : "var(--surface)",
                color: p === page ? "#fff" : "var(--foreground)",
                border: `1px solid ${p === page ? "transparent" : "var(--border)"}`,
                boxShadow: p === page ? "0 4px 12px rgba(12,24,35,0.2)" : "none",
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-opacity disabled:opacity-30"
            style={{ color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
