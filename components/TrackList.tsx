import { TrackRow } from "@/components/TrackCard";
import type { Track } from "@/lib/data";

export function TrackList({ tracks }: { tracks: Track[] }) {
  return (
    <div className="rounded overflow-hidden divide-y" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      {tracks.map((track, index) => (
        <TrackRow key={track.id} track={track} index={index} />
      ))}
    </div>
  );
}
