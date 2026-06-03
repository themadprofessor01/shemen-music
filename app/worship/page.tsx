import { PageShell } from "@/components/PageShell";
import { TrackList } from "@/components/TrackList";
import { tracks, totalDuration } from "@/lib/data";

export default function WorshipPage() {
  const worship = tracks.filter((track) => track.category === "worship");

  return (
    <>
      <PageShell eyebrow={`${worship.length} tracks · ${totalDuration(worship)}`} title="Praise & Worship">
        Songs for congregational worship, devotion, and praise moments that need a clear, spirit-filled lead.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4">
        <TrackList tracks={worship} />
      </div>
    </>
  );
}
