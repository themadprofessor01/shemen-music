import { TrackCardLarge } from "@/components/TrackCard";
import { tracks } from "@/lib/data";

export default function InstrumentalsPage() {
  const instrumentals = tracks
    .filter((track) => track.category === "instrumental")
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="ref-page">
      <h1 className="ref-title">Instrumentals</h1>
      <p className="mt-8 text-base">All Instrumental tracks</p>
      <div className="ref-card-grid mt-7">
        {instrumentals.slice(0, 50).map((track) => (
          <TrackCardLarge key={track.id} track={track} />
        ))}
      </div>
      <div className="mt-12 flex justify-center gap-6 text-lg">
        <span className="text-[var(--muted)]">1</span>
        <span>2</span>
        <span>...</span>
        <span>8</span>
        <span>›</span>
      </div>
    </div>
  );
}
