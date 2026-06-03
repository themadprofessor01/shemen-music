import { notFound } from "next/navigation";
import Link from "next/link";
import { artists, slugifyArtist, tracks } from "@/lib/data";
import { TrackCardLarge } from "@/components/TrackCard";

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artists.find((item) => item.slug === slug);
  const artistTracks = tracks.filter((track) => slugifyArtist(track.artist).includes(slug) || slugifyArtist(track.artist.split("&")[0].trim()) === slug);

  if (!artist && !artistTracks.length) notFound();

  const name = artist?.name ?? artistTracks[0]?.artist ?? slug;

  return (
    <div className="ref-page">
      <h1 className="ref-title">{name}</h1>

      <section className="mt-9">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-base">
          {artists.concat([
            { slug: "alvin-slaughter", name: "Alvin Slaughter" },
            { slug: "benny-hinn", name: "Benny Hinn" },
            { slug: "brooklyn-tabernacle-choir", name: "Brooklyn Tabernacle Choir" },
            { slug: "chris-tomlin", name: "Chris Tomlin" },
            { slug: "don-moen", name: "Don Moen" },
          ]).map((item) => (
            <Link key={item.slug} href={`/artist/${item.slug}`} className={item.slug === slug ? "font-bold text-[var(--accent)]" : "text-[var(--foreground)]"}>
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="ref-section-title">Tracks</h2>
        <div className="ref-card-grid">
          {(artistTracks.length ? artistTracks : tracks.slice(0, 10)).map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      </section>
    </div>
  );
}
