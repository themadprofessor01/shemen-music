"use client";

import { useRef, useState, useEffect } from "react";
import type { Track } from "@/lib/data";
import { TrackCardLarge } from "@/components/TrackCard";

export function FeaturedScrollSection({ tracks }: { tracks: Track[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const index = Math.round(progress * (tracks.length - 1));
      setActiveIndex(Math.max(0, Math.min(index, tracks.length - 1)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [tracks.length]);

  function scrollToIndex(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    const target = tracks.length > 1 ? (index / (tracks.length - 1)) * maxScroll : 0;
    el.scrollTo({ left: target, behavior: "smooth" });
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x"
        style={{ scrollbarWidth: "none" }}
      >
        {tracks.map((track, i) => (
          <div key={track.id} className="min-w-[260px] sm:min-w-[340px] max-w-[420px] flex-1 snap-start">
            <TrackCardLarge track={track} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 pt-3">
        {tracks.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to track ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: activeIndex === i ? "20px" : "6px",
              height: "6px",
              background: activeIndex === i ? "var(--accent)" : "var(--foreground-muted)",
              opacity: activeIndex === i ? 1 : 0.35,
            }}
          />
        ))}
      </div>
    </>
  );
}
