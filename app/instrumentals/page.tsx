"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CatalogInsights } from "@/components/CatalogInsights";
import { TrackCardLarge } from "@/components/TrackCard";
import { tracks } from "@/lib/data";

const PAGE_SIZE = 10;

export default function InstrumentalsPage() {
  const [page, setPage] = useState(1);
  const instrumentals = tracks
    .filter((track) => track.category === "instrumental")
    .sort((a, b) => a.title.localeCompare(b.title));

  const totalPages = Math.ceil(instrumentals.length / PAGE_SIZE);
  const pageTracks = instrumentals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function goTo(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <PageShell eyebrow={`${instrumentals.length} official tracks`} title="Instrumentals">
        All Instrumental tracks
      </PageShell>
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <CatalogInsights tracks={instrumentals} label="Instrumental archive" />
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
          {pageTracks.map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
        <div className="mt-12 flex items-center justify-center gap-2 text-sm font-bold">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-opacity disabled:opacity-30"
            style={{ borderColor: "var(--border)", background: "var(--surface2)", color: "var(--foreground-muted)" }}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className="flex h-10 min-w-10 items-center justify-center rounded-full border px-3 transition-all"
              style={{
                borderColor: p === page ? "transparent" : "var(--border)",
                background: p === page ? "linear-gradient(135deg, var(--ink), var(--blue-deep))" : "var(--surface2)",
                color: p === page ? "#fff" : "var(--foreground-muted)",
                boxShadow: p === page ? "0 4px 12px rgba(12,24,35,0.25)" : "none",
              }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-opacity disabled:opacity-30"
            style={{ borderColor: "var(--border)", background: "var(--surface2)", color: "var(--foreground-muted)" }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
