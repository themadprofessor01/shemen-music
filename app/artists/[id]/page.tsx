import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Disc3, Download, MapPin, Music2, Sparkles, Users } from "lucide-react";
import { artistProfiles, formatPlays, totalDuration, tracks, tracksByArtist } from "@/lib/data";
import { TrackCardLarge } from "@/components/TrackCard";
import { TrackList } from "@/components/TrackList";
import type { ReactNode } from "react";

type ArtistPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return artistProfiles.map((artist) => ({ id: artist.id }));
}

export async function generateMetadata({ params }: ArtistPageProps) {
  const { id } = await params;
  const artist = artistProfiles.find((profile) => profile.id === id);

  if (!artist) return {};

  return {
    title: `${artist.name} | ShemenMusic`,
    description: artist.description,
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { id } = await params;
  const artist = artistProfiles.find((profile) => profile.id === id);

  if (!artist) notFound();

  const artistTracks = tracksByArtist(artist.name);
  const totalPlays = artistTracks.reduce((sum, track) => sum + track.plays, 0);
  const signatureTrack = tracks.find((track) => track.id === artist.signatureTrackId) ?? artistTracks[0];

  return (
    <div className="px-4 py-9 sm:px-8 lg:px-14 space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] text-white" style={{ background: artist.palette, boxShadow: "var(--shadow-card)" }}>
        <div className="absolute inset-0 opacity-28" style={{ background: "radial-gradient(circle at 78% 18%, rgba(255,255,255,0.34), transparent 18rem)" }} />
        <div className="relative grid min-h-[560px] gap-10 p-6 sm:p-9 lg:grid-cols-[0.86fr_1.14fr] lg:p-12">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
                ShemenMusic Artist
              </Link>
              <h1 className="mt-8 text-5xl font-black leading-none tracking-tight sm:text-7xl">{artist.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">{artist.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <ProfileMetric icon={<Music2 size={16} />} value={`${artistTracks.length}`} label="Releases" />
              <ProfileMetric icon={<Users size={16} />} value={formatPlays(totalPlays)} label="Plays" />
              <ProfileMetric icon={<Disc3 size={16} />} value={totalDuration(artistTracks)} label="Runtime" />
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/10 shadow-2xl">
            <Image src={artist.imageUrl} alt="" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1823]/92 via-[#0c1823]/28 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white/72">
                <span className="inline-flex items-center gap-2"><MapPin size={15} />{artist.location}</span>
                <span className="inline-flex items-center gap-2"><Sparkles size={15} />{artist.role}</span>
              </div>
              <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight">{signatureTrack?.title ?? "Signature worship release"}</h2>
              <p className="mt-2 text-sm text-white/64">Signature release selected from the current ShemenMusic catalogue.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="premium-card rounded-[2rem] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--premium)]">Artist Notes</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight">Built for worship teams that need dependable beauty.</h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">This profile frames the artist catalogue as a premium listening room: clear repertoire, strong visual hierarchy, and quick access to the tracks most likely to support a live service or studio session.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/download" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}>
              Studio downloads
              <Download size={16} />
            </Link>
            <Link href="/instrumentals" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold" style={{ borderColor: "var(--border)" }}>
              Full catalogue
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Selected Releases</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Artist Highlights</h2>
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {artistTracks.slice(0, 5).map((track) => (
              <div key={track.id} className="min-w-[220px] sm:min-w-[320px]">
                <TrackCardLarge track={track} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Catalogue</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">Complete Artist Tracklist</h2>
        </div>
        <TrackList tracks={artistTracks} />
      </section>
    </div>
  );
}

function ProfileMetric({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/14">
        {icon}
      </span>
      <p className="mt-4 truncate text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/56">{label}</p>
    </div>
  );
}
