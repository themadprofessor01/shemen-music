import { Suspense } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PlayAllButton } from "@/components/PlayAllButton";
import { TrackRow } from "@/components/TrackCard";
import { tracks, totalDuration } from "@/lib/data";
import { MoodFilter } from "./MoodFilter";

const PAGE_SIZE = 20;

export default async function WorshipPage({
  searchParams,
}: {
  searchParams: Promise<{ mood?: string; page?: string }>;
}) {
  const { mood, page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const worship = tracks.filter((t) => t.category === "worship");
  const filtered = mood && mood !== "all"
    ? worship.filter((t) => t.mood === mood)
    : worship;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageTracks = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      {/* Hero header */}
      <PageShell
        eyebrow={`${worship.length} tracks · ${totalDuration(worship)}`}
        title="Praise & Worship Instrumentals"
      >
        All praise and worship tracks
      </PageShell>

      {/* Filter bar + Play All row */}
      <div className="flex flex-col gap-4 px-4 sm:px-8 lg:px-14 -mt-2">
        <Suspense fallback={<div className="h-9" />}>
          <MoodFilter />
        </Suspense>
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            {filtered.length} track{filtered.length !== 1 ? "s" : ""}
            {mood && mood !== "all" ? ` · ${mood}` : ""}
          </p>
          <PlayAllButton tracks={pageTracks} />
        </div>
      </div>

      {/* Track list */}
      <div className="mt-4 px-4 sm:px-8 lg:px-14 divide-y" style={{ borderColor: "var(--border)" }}>
        {pageTracks.length === 0 ? (
          <p className="py-12 text-center text-sm" style={{ color: "var(--foreground-muted)" }}>
            No tracks found for this filter.
          </p>
        ) : (
          pageTracks.map((track, i) => (
            <TrackRow
              key={track.id}
              track={track}
              index={(currentPage - 1) * PAGE_SIZE + i}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/worship"
          mood={mood}
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
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  mood?: string;
}) {
  function href(page: number) {
    const params = new URLSearchParams();
    if (mood && mood !== "all") params.set("mood", mood);
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
