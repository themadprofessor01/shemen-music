import Link from "next/link";
import { CollectionCover } from "@/components/CollectionCover";
import { TrackCardLarge } from "@/components/TrackCard";
import { moods, playlists, tracks } from "@/lib/data";

function SectionHeader({ title }: { title: string }) {
  return <h2 className="ref-section-title">{title}</h2>;
}

export default function HomePage() {
  const featured = tracks.filter((track) => track.featured).slice(0, 7);
  const trending = tracks.filter((track) => track.trending || track.category === "instrumental").slice(0, 10);

  return (
    <div className="ref-page">
      <h1 className="ref-title">Discover</h1>

      <section className="mt-10">
        <SectionHeader title="Featured" />
        <div className="flex gap-6 overflow-hidden pb-9">
          {featured.map((track, index) => (
            <div key={track.id} className={index === 0 ? "w-[180px] flex-none" : "w-[356px] flex-none"}>
              <TrackCardLarge track={track} />
            </div>
          ))}
        </div>
        <div className="mb-10 flex justify-center gap-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9a9a9a]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1f2328]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#9a9a9a]" />
        </div>
      </section>

      <section>
        <SectionHeader title="Trending" />
        <div className="ref-card-grid">
          {trending.map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader title="Moods" />
        <div className="ref-card-grid">
          {moods.map((mood) => (
            <Link key={mood.id} href={`/mood/${mood.id}`} className="ref-card block">
              <div className="ref-card-art">
                {mood.imageUrl ? (
                  <img src={mood.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full" style={{ background: "#dfe2e5" }} />
                )}
              </div>
              <div className="ref-card-body">
                <span className="ref-card-title">{mood.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader title="Playlists" />
        <div className="ref-card-grid">
          {playlists.map((playlist) => (
            <Link key={playlist.id} href="/login" className="ref-card block">
              <CollectionCover playlist={playlist} />
              <div className="ref-card-body">
                <span className="ref-card-title">Songs about the...</span>
                <span className="ref-card-subtitle">{playlist.curator}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
