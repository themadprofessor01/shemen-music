import { TrackCardLarge } from "@/components/TrackCard";
import { tracks } from "@/lib/data";

export default function PraiseWorshipPage() {
  const worship = tracks
    .filter((track) => track.category === "worship")
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="ref-page">
      <h1 className="ref-title">Praise &amp; Worship Instrumentals</h1>
      <div className="ref-card-grid mt-10">
        {worship.slice(0, 45).map((track) => (
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
