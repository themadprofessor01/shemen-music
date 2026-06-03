import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PlayAllButton } from "@/components/PlayAllButton";
import { InfiniteTrackGrid } from "@/components/InfiniteTrackGrid";
import { tracks, totalDuration } from "@/lib/data";
import { MoodFilter } from "./MoodFilter";
import { ViewToggle } from "./ViewToggle";

export const metadata: Metadata = {
  title: "Praise & Worship — ShemenMusic",
  description: "Stream and download free Christian praise and worship songs — timeless hymns and contemporary worship music.",
  openGraph: {
    title: "Praise & Worship — ShemenMusic",
    description: "Free Christian praise and worship songs for streaming and download.",
    url: "https://shemenmusic.com/worship",
    siteName: "ShemenMusic",
    type: "website",
  },
  twitter: { card: "summary", title: "Praise & Worship — ShemenMusic" },
};

export default async function WorshipPage({
  searchParams,
}: {
  searchParams: Promise<{ mood?: string; view?: string }>;
}) {
  const { mood, view = "grid" } = await searchParams;

  const worship = tracks.filter((t) => t.category === "worship");
  const filtered = mood && mood !== "all"
    ? worship.filter((t) => t.mood === mood)
    : worship;

  return (
    <div className="px-4 sm:px-8 lg:px-14 pb-16">
      <PageShell
        eyebrow={`${worship.length} tracks · ${totalDuration(worship)}`}
        title="Praise & Worship Instrumentals"
      >
        All praise and worship tracks
      </PageShell>

      <div className="flex flex-col gap-4 -mt-2">
        <Suspense fallback={<div className="h-9" />}>
          <MoodFilter />
        </Suspense>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            {filtered.length} track{filtered.length !== 1 ? "s" : ""}
            {mood && mood !== "all" ? ` · ${mood}` : ""}
          </p>
          <div className="flex items-center gap-2">
            <PlayAllButton tracks={filtered.slice(0, 40)} />
            <Suspense fallback={null}>
              <ViewToggle />
            </Suspense>
          </div>
        </div>
      </div>

      <InfiniteTrackGrid tracks={filtered} view={view as "grid" | "list"} />
    </div>
  );
}
