import { TrackCardLarge } from "@/components/TrackCard";
import { tracks } from "@/lib/data";

export default function WorshipPage() {
  const worship = tracks.filter((track) => track.category === "worship");

  return (
    <div className="ref-page">
      <h1 className="ref-title">Praise &amp; Worship Instrumentals</h1>
      <div className="ref-card-grid mt-10">
        {worship.map((track) => (
          <TrackCardLarge key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
