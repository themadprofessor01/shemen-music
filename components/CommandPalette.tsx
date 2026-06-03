"use client";

import { useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowUpRight, Disc3, ListMusic, Mic2, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { artistProfiles, getStationSlug, moods, playlists, tracks } from "@/lib/data";

type Result = {
  href: string;
  title: string;
  meta: string;
  type: "Track" | "Mood" | "Playlist" | "Artist";
};

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement | null;
        if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
        event.preventDefault();
        onOpenChange(true);
      }
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);

  const results = useMemo<Result[]>(() => {
    const normalized = query.trim().toLowerCase();
    const all: Result[] = [
      ...tracks.map((track) => ({
        href: getStationSlug(track) ? `/station/${getStationSlug(track)}` : "/instrumentals",
        title: track.title,
        meta: track.artist,
        type: "Track" as const,
      })),
      ...moods.map((mood) => ({
        href: `/mood/${mood.id}`,
        title: mood.label,
        meta: "Mood collection",
        type: "Mood" as const,
      })),
      ...playlists.map((playlist) => ({
        href: `/playlists/${playlist.id}`,
        title: playlist.title,
        meta: `${playlist.trackCount} tracks`,
        type: "Playlist" as const,
      })),
      ...artistProfiles.map((artist) => ({
        href: `/artists/${artist.id}`,
        title: artist.name,
        meta: artist.role,
        type: "Artist" as const,
      })),
    ];

    if (!normalized) return all.slice(0, 8);
    return all.filter((item) => `${item.title} ${item.meta} ${item.type}`.toLowerCase().includes(normalized)).slice(0, 10);
  }, [query]);

  const groupedResults = useMemo(() => {
    return results.reduce<Record<Result["type"], Result[]>>(
      (groups, result) => {
        groups[result.type].push(result);
        return groups;
      },
      { Track: [], Artist: [], Playlist: [], Mood: [] }
    );
  }, [results]);

  function openResult(result: Result) {
    onOpenChange(false);
    setQuery("");
    router.push(result.href);
  }

  function onSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => Math.min(index + 1, results.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      openResult(results[selectedIndex]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-20 sm:pt-28" role="dialog" aria-modal="true" aria-label="Search ShemenMusic">
      <button className="absolute inset-0 bg-[rgba(12,24,35,0.38)]" aria-label="Close search" onClick={() => onOpenChange(false)} />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem]" style={{ background: "rgba(255,253,250,0.92)", border: "1px solid var(--border)", boxShadow: "0 34px 90px rgba(12,24,35,0.24)", backdropFilter: "blur(24px)" }}>
        <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
          <Search size={18} style={{ color: "var(--premium)" }} />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={onSearchKeyDown}
            className="min-w-0 flex-1 bg-transparent text-base outline-none"
            placeholder="Search tracks, moods, playlists..."
          />
          <button className="h-9 w-9 rounded-full flex items-center justify-center" style={{ background: "var(--surface2)" }} onClick={() => onOpenChange(false)} aria-label="Close search">
            <X size={16} />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex flex-wrap gap-2 px-1 pb-3">
            {["Rose Of Sharon", "First Love Music", "Anointing", "Download Everything"].map((suggestion) => (
              <button
                key={suggestion}
                className="rounded-full border px-3 py-1.5 text-xs font-bold"
                style={{ borderColor: "var(--border)", background: "var(--surface2)", color: "var(--foreground-muted)" }}
                onClick={() => {
                  setQuery(suggestion);
                  setSelectedIndex(0);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="max-h-[58vh] overflow-y-auto">
            {(["Track", "Artist", "Playlist", "Mood"] as const).map((type) => {
              const group = groupedResults[type];
              if (!group.length) return null;

              return (
                <section key={type} className="pb-2">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--premium)]">{type}s</p>
                  {group.map((item) => {
                    const absoluteIndex = results.findIndex((result) => result === item);
                    const selected = absoluteIndex === selectedIndex;

                    return (
                      <Link
                        key={`${item.type}-${item.href}-${item.title}`}
                        href={item.href}
                        className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors"
                        style={{ background: selected ? "rgba(245,234,210,0.62)" : "transparent" }}
                        onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                        onClick={(event) => {
                          event.preventDefault();
                          openResult(item);
                        }}
                      >
                        <span className="h-11 w-11 rounded-2xl flex items-center justify-center" style={{ background: selected ? "var(--premium-soft)" : "var(--blue-soft)", color: selected ? "var(--premium)" : "var(--blue)" }}>
                          {item.type === "Track" ? <Disc3 size={18} /> : item.type === "Playlist" ? <ListMusic size={18} /> : item.type === "Artist" ? <Mic2 size={18} /> : <Sparkles size={18} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-bold">{item.title}</span>
                          <span className="block truncate text-sm text-[var(--muted)]">{item.type} · {item.meta}</span>
                        </span>
                        {selected && <ArrowUpRight size={16} className="text-[var(--premium)]" />}
                      </Link>
                    );
                  })}
                </section>
              );
            })}
            {!results.length && (
              <div className="m-3 rounded-[1.4rem] border px-5 py-10 text-center" style={{ borderColor: "var(--border)", background: "rgba(245,234,210,0.34)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">No Match</p>
                <p className="mt-2 text-lg font-black">Nothing surfaced for this search.</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">Try a song title, artist, mood, or playlist name from the catalogue.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
