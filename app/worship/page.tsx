import { PageShell } from "@/components/PageShell";
import { CatalogInsights } from "@/components/CatalogInsights";
import { TrackCardLarge } from "@/components/TrackCard";
import { tracks } from "@/lib/data";

export default function WorshipPage() {
  const worship = tracks.filter((track) => track.category === "worship");

  return (
    <>
      <PageShell eyebrow={`${worship.length} worship tracks`} title="Praise & Worship Instrumentals" />
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <CatalogInsights tracks={worship} label="Praise & worship archive" />
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
        {worship.map((track) => (
          <TrackCardLarge key={track.id} track={track} />
        ))}
        </div>
      </div>
    </>
  );
}
