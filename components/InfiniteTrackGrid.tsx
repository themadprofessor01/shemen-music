"use client";

import { useState, useEffect, useRef } from "react";
import type { Track } from "@/lib/data";
import { TrackCardLarge, TrackRow } from "@/components/TrackCard";

const BATCH = 12;

export function InfiniteTrackGrid({
  tracks,
  view,
}: {
  tracks: Track[];
  view: "grid" | "list";
}) {
  const [count, setCount] = useState(BATCH);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset when track list changes (mood filter navigated)
  useEffect(() => {
    setCount(BATCH);
  }, [tracks]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || count >= tracks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((c) => Math.min(c + BATCH, tracks.length));
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [count, tracks.length]);

  const visible = tracks.slice(0, count);
  const hasMore = count < tracks.length;

  if (tracks.length === 0) {
    return (
      <p className="py-16 text-center text-sm" style={{ color: "var(--foreground-muted)" }}>
        No tracks found for this filter.
      </p>
    );
  }

  return (
    <div>
      {view === "list" ? (
        <div className="mt-4 divide-y" style={{ borderColor: "var(--border)" }}>
          {visible.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {visible.map((track, i) => (
            <TrackCardLarge key={track.id} track={track} priority={i < 6} />
          ))}
        </div>
      )}

      {/* Sentinel + loading indicator */}
      <div ref={sentinelRef} className="py-10 flex justify-center">
        {hasMore ? (
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)", animationDelay: `${i * 180}ms` }}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs font-semibold" style={{ color: "var(--foreground-muted)" }}>
            {tracks.length} track{tracks.length !== 1 ? "s" : ""} · end of catalogue
          </p>
        )}
      </div>
    </div>
  );
}
