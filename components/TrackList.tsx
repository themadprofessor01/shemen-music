"use client";

import { TrackRow } from "@/components/TrackCard";
import type { Track } from "@/lib/data";
import { PlayAllButton } from "@/components/PlayAllButton";

export function TrackList({ tracks }: { tracks: Track[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {tracks.length} track{tracks.length !== 1 ? "s" : ""}
        </p>
        <PlayAllButton tracks={tracks} />
      </div>
      <div className="rounded overflow-hidden divide-y" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        {tracks.map((track, index) => (
          <TrackRow key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}
