import { notFound } from "next/navigation";
import Link from "next/link";
import { artistProfiles, tracks, tracksByArtist } from "@/lib/data";
import { TrackCardLarge } from "@/components/TrackCard";

export function generateStaticParams() {
  return artistProfiles.map((artist) => ({ id: artist.id }));
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = artistProfiles.find((profile) => profile.id === id);
  if (!artist) notFound();

  const artistTracks = tracksByArtist(artist.name);

  return (
    <div className="ref-page">
      <h1 className="ref-title">{artist.name}</h1>
      <p className="mt-6 max-w-3xl leading-7 text-[var(--muted)]">{artist.description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/artist/${artist.id}`} className="rounded border bg-white px-3 py-1 text-sm" style={{ borderColor: "var(--border)" }}>
          Artist archive
        </Link>
        <span className="rounded border bg-white px-3 py-1 text-sm" style={{ borderColor: "var(--border)" }}>{artist.role}</span>
      </div>
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
