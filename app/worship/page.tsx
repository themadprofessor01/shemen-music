import { tracks } from "@/lib/data";
import { TrackRow } from "@/components/TrackCard";

const worship = tracks.filter(
  (t) => !t.title.toLowerCase().includes("instrumental") && t.artist !== "The Living Waters Singers"
);

export default function WorshipPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Praise & Worship</h1>
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          {worship.length} tracks — classic and contemporary praise & worship
        </p>
      </div>

      {/* Header row */}
      <div className="flex items-center gap-4 px-3 pb-2 mb-1 text-xs font-medium border-b" style={{ color: "var(--foreground-muted)", borderColor: "var(--border)" }}>
        <span className="w-8 text-center">#</span>
        <span className="w-9 flex-shrink-0" />
        <span className="flex-1">Title</span>
        <span className="hidden sm:flex items-center gap-4">
          <span className="w-12">Plays</span>
          <span className="w-14">Size</span>
          <span className="w-10 text-right">Time</span>
        </span>
      </div>

      <div className="flex flex-col">
        {worship.map((track, i) => (
          <TrackRow key={track.id} track={track} index={i} />
        ))}
      </div>
    </div>
  );
}
