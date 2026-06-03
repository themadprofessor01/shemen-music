import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { artists, artistProfiles, slugifyArtist, tracks } from "@/lib/data";
import { TrackCardLarge } from "@/components/TrackCard";

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // If there's a premium artist profile matching this slug, redirect to it
  const profile = artistProfiles.find((p) => slugifyArtist(p.name) === slug || p.id === slug);
  if (profile) redirect(`/artists/${profile.id}`);

  // Otherwise fall back to simple layout
  const artist = artists.find((item) => item.slug === slug);
  const artistTracks = tracks.filter((track) => slugifyArtist(track.artist).includes(slug) || slugifyArtist(track.artist.split("&")[0].trim()) === slug);

  if (!artist && !artistTracks.length) notFound();

  const name = artist?.name ?? artistTracks[0]?.artist ?? slug;

  return (
    <>
      <PageShell eyebrow={`${artistTracks.length || 10} tracks`} title={name} />
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <section className="rounded-[2rem] p-5" style={{ background: "rgba(255,253,250,0.72)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex flex-wrap gap-3">
            {artists.map((item) => (
              <Link
                key={item.slug}
                href={`/artist/${item.slug}`}
                className="rounded-full border px-4 py-2 text-sm font-bold transition-opacity hover:opacity-80"
                style={{
                  borderColor: item.slug === slug ? "rgba(182,138,58,0.45)" : "var(--border)",
                  background: item.slug === slug ? "var(--premium-soft)" : "var(--surface2)",
                  color: item.slug === slug ? "var(--premium)" : "var(--foreground-muted)",
                }}
              >
              {item.name}
              </Link>
            ))}
          </div>
        </section>

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
