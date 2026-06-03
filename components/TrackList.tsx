"use client";

import { TrackRow } from "@/components/TrackCard";
import type { Track } from "@/lib/data";
import { PlayAllButton } from "@/components/PlayAllButton";
import { EmptyState } from "@/components/EmptyState";

export function TrackList({ tracks }: { tracks: Track[] }) {
  if (!tracks.length) {
    return (
      <EmptyState title="No tracks in this room yet." actionHref="/instrumentals" actionLabel="Browse instrumentals">
        This collection is ready for curation. Start with the wider catalogue and bring your favorite worship moments back here.
      </EmptyState>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {tracks.length} track{tracks.length !== 1 ? "s" : ""}
        </p>
        <PlayAllButton tracks={tracks} />
      </div>
      <div className="overflow-hidden rounded border bg-white" style={{ borderColor: "var(--border)" }}>
        {tracks.map((track, index) => (
          <TrackRow key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}
