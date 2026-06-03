import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { CatalogInsights } from "@/components/CatalogInsights";
import { artistProfiles, tracks, tracksByArtist } from "@/lib/data";
import { TrackCardLarge } from "@/components/TrackCard";
import Image from "next/image";

export function generateStaticParams() {
  return artistProfiles.map((artist) => ({ id: artist.id }));
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = artistProfiles.find((profile) => profile.id === id);
  if (!artist) notFound();

  const artistTracks = tracksByArtist(artist.name);
  const signatureTrack = tracks.find((track) => track.id === artist.signatureTrackId) ?? artistTracks[0];

  return (
    <>
      <PageShell eyebrow={artist.role} title={artist.name}>
        {artist.description}
      </PageShell>
      <div className="px-4 pb-14 sm:px-8 lg:px-14 space-y-9">
        <section className="grid overflow-hidden rounded-[2rem] lg:grid-cols-[0.9fr_1.1fr]" style={{ background: artist.palette, boxShadow: "var(--shadow-card)" }}>
          <div className="relative min-h-[320px]">
            <Image src={artist.imageUrl} alt="" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1823] via-[#0c1823]/20 to-transparent" />
          </div>
          <div className="flex flex-col justify-between gap-8 p-6 text-white sm:p-8 lg:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/56">{artist.location}</p>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-none tracking-tight">{artist.name}</h2>
              <p className="mt-5 max-w-xl leading-7 text-white/70">{artist.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <ArtistProfileMetric value={`${artistTracks.length || tracks.length}`} label="Archive tracks" />
              <ArtistProfileMetric value={artist.role} label="Role" />
              <ArtistProfileMetric value={signatureTrack?.title ?? "Featured"} label="Signature" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/artist/${artist.id}`} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0c1823] shadow-xl shadow-black/20">
                Artist archive
              </Link>
              <span className="rounded-full border border-white/16 px-5 py-3 text-sm font-bold text-white/82">{artist.role}</span>
            </div>
          </div>
        </section>

        <CatalogInsights tracks={artistTracks.length ? artistTracks : tracks.slice(0, 10)} label={artist.name} />

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

function ArtistProfileMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
      <p className="truncate text-lg font-black">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/56">{label}</p>
    </div>
  );
}
