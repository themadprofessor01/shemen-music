import { tracks, playlists, moods } from "@/lib/data";
import { TrackCardLarge, TrackRow } from "@/components/TrackCard";
import { ListMusic, TrendingUp, Sparkles, Music2 } from "lucide-react";
import Link from "next/link";

function SectionHeader({ icon, title, href }: { icon: React.ReactNode; title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2 font-bold text-lg" style={{ color: "var(--foreground)" }}>
        <span style={{ color: "var(--gold)" }}>{icon}</span>
        {title}
      </div>
      {href && (
        <Link href={href} className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: "var(--gold)" }}>
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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

      {/* Hero */}
      <section
        className="rounded-3xl px-8 py-12 flex flex-col items-center text-center"
        style={{ background: "linear-gradient(135deg, #d4a84b22, #7c3aed22)", border: "1px solid #d4a84b33" }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--gold)" }}>
          <Music2 size={30} className="text-black" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
          Shemen<span style={{ color: "var(--gold)" }}>Music</span>
        </h1>
        <p className="text-base opacity-60 max-w-md" style={{ color: "var(--foreground)" }}>
          Church music, praise instrumentals, and worship songs — anointed and free to download.
        </p>
        <div className="flex gap-3 mt-6">
          <Link
            href="/instrumentals"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-black transition-opacity hover:opacity-80"
            style={{ background: "var(--gold)" }}
          >
            Browse Instrumentals
          </Link>
          <Link
            href="/download"
            className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-opacity hover:opacity-80"
            style={{ color: "var(--foreground)", borderColor: "var(--border)" }}
          >
            Download All
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section>
        <SectionHeader icon={<Sparkles size={18} />} title="Featured" href="/instrumentals" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <SectionHeader icon={<TrendingUp size={18} />} title="Trending" href="/instrumentals" />
        <div className="rounded-2xl overflow-hidden divide-y" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          {trending.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} />
          ))}
        </div>
      </section>

      {/* Moods */}
      <section>
        <SectionHeader icon={<Sparkles size={18} />} title="Moods" />
        <div className="flex flex-wrap gap-3">
          {moods.map((mood) => (
            <Link
              key={mood.id}
              href={`/mood/${mood.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all hover:scale-105"
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
        <SectionHeader icon={<ListMusic size={18} />} title="Playlists" href="/playlists" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="rounded-2xl overflow-hidden group transition-transform hover:scale-[1.02]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="h-28 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${playlist.coverColor}88, ${playlist.coverColor}33)` }}
              >
                <ListMusic size={32} style={{ color: playlist.coverColor }} className="opacity-80" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{playlist.title}</p>
                <p className="text-xs opacity-50 mt-1" style={{ color: "var(--foreground)" }}>{playlist.trackCount} tracks</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
