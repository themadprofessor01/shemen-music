import { PageShell } from "@/components/PageShell";
import { TrackList } from "@/components/TrackList";
import { tracks, totalDuration } from "@/lib/data";

export default function InstrumentalsPage() {
  const instrumentals = tracks.filter((track) => track.category === "instrumental");

  return (
    <>
      <PageShell eyebrow={`${instrumentals.length} tracks · ${totalDuration(instrumentals)}`} title="Instrumentals">
        Praise beds, soaking sounds, and altar-flow arrangements ready for prayer rooms, services, and quiet devotion.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4">
        <TrackList tracks={instrumentals} />
      </div>
    </>
  );
}
