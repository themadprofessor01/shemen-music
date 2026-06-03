import { tracks } from "@/lib/data";
import { TrackRow } from "@/components/TrackCard";

const instrumentals = tracks.filter(
  (t) => t.artist === "The Living Waters Singers" || t.title.toLowerCase().includes("instrumental")
);

export default function InstrumentalsPage() {
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Instrumentals</h1>
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          {instrumentals.length} tracks — worship instrumentals for prayer, ministry & study
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
        {instrumentals.map((track, i) => (
          <TrackRow key={track.id} track={track} index={i} />
        ))}
      </div>
    </div>
  );
}
