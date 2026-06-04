import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/PageShell";
import { PlayAllButton } from "@/components/PlayAllButton";
import { InfiniteTrackGrid } from "@/components/InfiniteTrackGrid";
import { tracks, totalDuration } from "@/lib/data";
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
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "grid" } = await searchParams;

  const worship = tracks.filter((t) => t.category === "worship");

  return (
    <div className="px-4 sm:px-8 lg:px-14 pb-16">
      <PageShell
        eyebrow={`${worship.length} tracks · ${totalDuration(worship)}`}
        title="Praise & Worship Instrumentals"
      >
        Praise &amp; worship instrumentals for the church
      </PageShell>

      <div className="sticky top-16 z-10 -mx-4 sm:-mx-8 lg:-mx-14 px-4 sm:px-8 lg:px-14 py-3 flex items-center justify-between gap-3" style={{ background: "var(--background)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          {worship.length} track{worship.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <PlayAllButton tracks={worship.slice(0, 40)} />
          <Suspense fallback={null}>
            <ViewToggle />
          </Suspense>
        </div>
      </div>

      <InfiniteTrackGrid tracks={worship} view={view as "grid" | "list"} />
    </div>
  );
}
