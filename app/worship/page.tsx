import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PlayAllButton } from "@/components/PlayAllButton";
import { TrackRow, TrackCardLarge } from "@/components/TrackCard";
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

const PAGE_SIZE = 40;

export default async function WorshipPage({
  searchParams,
}: {
  searchParams: Promise<{ mood?: string; page?: string; view?: string }>;
}) {
  const { mood, page: pageParam, view = "grid" } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const worship = tracks.filter((t) => t.category === "worship");
  const filtered = mood && mood !== "all"
    ? worship.filter((t) => t.mood === mood)
    : worship;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageTracks = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="px-4 sm:px-8 lg:px-14 pb-16">
      {/* Hero header */}
      <PageShell
        eyebrow={`${worship.length} tracks · ${totalDuration(worship)}`}
        title="Praise & Worship Instrumentals"
      >
        All praise and worship tracks
      </PageShell>

      {/* Filter bar */}
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
            <PlayAllButton tracks={pageTracks} />
            <Suspense fallback={null}>
              <ViewToggle />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Tracks */}
      {pageTracks.length === 0 ? (
        <p className="py-12 text-center text-sm mt-4" style={{ color: "var(--foreground-muted)" }}>
          No tracks found for this filter.
        </p>
      ) : view === "list" ? (
        <div className="mt-4 divide-y" style={{ borderColor: "var(--border)" }}>
          {pageTracks.map((track, i) => (
            <TrackRow key={track.id} track={track} index={(currentPage - 1) * PAGE_SIZE + i} />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {pageTracks.map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/worship"
          mood={mood}
          view={view}
        />
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  basePath,
  mood,
  view,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  mood?: string;
  view?: string;
}) {
  function href(page: number) {
    const params = new URLSearchParams();
    if (mood && mood !== "all") params.set("mood", mood);
    if (view && view !== "grid") params.set("view", view);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ""}`;
  }

  // Build page number list with ellipsis
  const pages: (number | "...")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5 flex-wrap px-4" aria-label="Pagination">
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            className="h-9 min-w-[2.25rem] flex items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors"
            style={{
              background: p === currentPage ? "var(--accent)" : "var(--surface2)",
              color: p === currentPage ? "#fff" : "var(--foreground)",
              border: p === currentPage ? "1px solid var(--accent)" : "1px solid var(--border)",
            }}
          >
            {p}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={href(currentPage + 1)}
          className="h-9 flex items-center justify-center rounded-lg px-4 text-sm font-semibold ml-1 transition-opacity hover:opacity-80"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        >
          Older posts →
        </Link>
      )}
    </nav>
  );
}
