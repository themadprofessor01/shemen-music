import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
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
    <>
      <PageShell eyebrow={artist.role} title={artist.name}>
        {artist.description}
      </PageShell>
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <div className="flex flex-wrap gap-3">
          <Link href={`/artist/${artist.id}`} className="rounded-full border px-4 py-2 text-sm font-bold" style={{ borderColor: "rgba(182,138,58,0.45)", background: "var(--premium-soft)", color: "var(--premium)" }}>
            Artist archive
          </Link>
          <span className="rounded-full border px-4 py-2 text-sm font-bold" style={{ borderColor: "var(--border)", background: "var(--surface2)", color: "var(--foreground-muted)" }}>{artist.role}</span>
        </div>
        <section className="mt-10">
          <h2 className="text-2xl font-black tracking-tight">Tracks</h2>
          <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
            {(artistTracks.length ? artistTracks : tracks.slice(0, 10)).map((track) => (
              <TrackCardLarge key={track.id} track={track} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
