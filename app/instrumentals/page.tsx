import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PlayAllButton } from "@/components/PlayAllButton";
import { InfiniteTrackGrid } from "@/components/InfiniteTrackGrid";
import { InlineSearch } from "@/components/InlineSearch";
import { tracks, totalDuration } from "@/lib/data";
import { ViewToggle } from "./ViewToggle";

export const metadata: Metadata = {
  title: "Instrumentals — ShemenMusic",
  description: "Browse hundreds of free Christian instrumental tracks — worship, prayer, and gospel music available for streaming and download.",
  openGraph: {
    title: "Instrumentals — ShemenMusic",
    description: "Browse hundreds of free Christian instrumental tracks.",
    url: "https://shemenmusic.com/instrumentals",
    siteName: "ShemenMusic",
    type: "website",
  },
  twitter: { card: "summary", title: "Instrumentals — ShemenMusic" },
};

export default async function InstrumentalsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "grid" } = await searchParams;

  const instrumentals = tracks.filter((t) => t.category === "instrumental");

  return (
    <div className="px-4 sm:px-8 lg:px-14 pb-16">
      <PageShell
        eyebrow={`${instrumentals.length} tracks · ${totalDuration(instrumentals)}`}
        title="Instrumentals"
      >
        Studio-grade instrumentals for worship teams
      </PageShell>

      <div className="sticky top-16 z-10 -mx-4 sm:-mx-8 lg:-mx-14 px-4 sm:px-8 lg:px-14 py-3 flex items-center justify-between gap-3" style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
        <p className="text-sm flex-shrink-0" style={{ color: "var(--foreground-muted)" }}>
          {instrumentals.length} track{instrumentals.length !== 1 ? "s" : ""}
        </p>
        <Suspense fallback={null}>
          <InlineSearch />
        </Suspense>
        <div className="flex items-center gap-2 flex-shrink-0">
          <PlayAllButton tracks={instrumentals.slice(0, 40)} />
          <Suspense fallback={null}>
            <ViewToggle />
          </Suspense>
        </div>
      </div>

      <InfiniteTrackGrid tracks={instrumentals} view={view as "grid" | "list"} />
    </div>
  );
}
