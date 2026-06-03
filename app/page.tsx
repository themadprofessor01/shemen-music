import { tracks, playlists, moods } from "@/lib/data";
import { TrackCardLarge, TrackCardGrid } from "@/components/TrackCard";
import { ListMusic } from "lucide-react";
import Link from "next/link";

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--foreground-muted)" }}>
          See all →
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const featured = tracks.filter((t) => t.featured);
  const trending = tracks.filter((t) => t.trending);

  return (
    <div className="px-6 py-8 space-y-12">

      <h1 className="text-4xl font-bold" style={{ color: "var(--foreground)" }}>Discover</h1>

      {/* Featured — horizontal scroll carousel */}
      <section>
        <SectionHeader title="Featured" />
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {featured.map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* Trending — 4-col grid */}
      <section>
        <SectionHeader title="Trending" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((track) => (
            <TrackCardGrid key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* Moods */}
      <section>
        <SectionHeader title="Moods" />
        <div className="flex flex-wrap gap-3">
          {moods.map((mood) => (
            <Link
              key={mood.id}
              href={`/mood/${mood.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all hover:opacity-80"
              style={{
                background: mood.color + "22",
                borderColor: mood.color + "55",
                color: "var(--foreground)",
              }}
            >
              <span>{mood.emoji}</span>
              {mood.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Playlists */}
      <section>
        <SectionHeader title="Playlists" href="/playlists" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="rounded-2xl overflow-hidden group transition-transform hover:scale-[1.02]"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
            >
              <div
                className="h-28 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${playlist.coverColor}cc, ${playlist.coverColor}55)` }}
              >
                <ListMusic size={32} className="text-white opacity-80" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{playlist.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--foreground-muted)" }}>{playlist.curator}</p>
                <p className="text-xs mt-1" style={{ color: "var(--foreground-muted)" }}>{playlist.trackCount} tracks</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
