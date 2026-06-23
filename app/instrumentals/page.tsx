import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PlayAllButton } from "@/components/PlayAllButton";
import { tracks, totalDuration } from "@/lib/data";
import { MoodFilter } from "./MoodFilter";
import { InfiniteTrackGrid } from "@/components/InfiniteTrackGrid";

export default async function InstrumentalsPage({
  searchParams,
}: {
  searchParams: Promise<{ mood?: string }>;
}) {
  const { mood } = await searchParams;

  const instrumentals = tracks.filter((t) => t.category === "instrumental");
  const filtered = mood && mood !== "all"
    ? instrumentals.filter((t) => t.mood === mood)
    : instrumentals;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <PageShell
        eyebrow={`${instrumentals.length} tracks · ${totalDuration(instrumentals)}`}
        title="Instrumentals"
      >
        All Instrumental tracks
      </PageShell>

      <div className="flex flex-col gap-4 px-4 sm:px-8 lg:px-14 -mt-2">
        <Suspense fallback={<div className="h-9" />}>
          <MoodFilter />
        </Suspense>
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            {filtered.length} track{filtered.length !== 1 ? "s" : ""}
            {mood && mood !== "all" ? ` · ${mood}` : ""}
          </p>
          <PlayAllButton tracks={filtered} />
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-14">
        <InfiniteTrackGrid tracks={filtered} view="grid" />
      </div>
    </div>
  );
}
