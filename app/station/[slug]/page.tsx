"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { Download, Heart, MessageSquare, MoreVertical, Play, Plus, Users } from "lucide-react";
import { CoverImage } from "@/components/CoverImage";
import { TrackCardLarge } from "@/components/TrackCard";
import { usePlayer } from "@/components/MusicPlayerContext";
import { formatPlays, getStationSlug, slugifyArtist, tracks } from "@/lib/data";

const roseLyrics = `Rose Of Sharon

Oooh Jesus, Jesus
Oooh Jesus, Jesus
Oooh Jesus, Jesus
Oooh Jesus, Jesus

Anything I saw before I saw you
Was a waste of life
Anyone I knew before I knew you
Was a waste of life
Anywhere I went without you
Was a waste of life
Anyone I saw before I saw you
Was a waste of life

Oooh, oh
I'm so glad, I'm so glad that I have you now
Oooh, oh
No more wasting my life on others

You are my rose of Sharon (Sharon)
You're my lily of the valley (Valley)
You are my lily among the thorns
My love among the daughters (daughters)

You are my rose of Sharon
Rose Of Sharon
My lily of the valley
Of the valley
You are my rose of Sharon
Rose Of Sharon
My lily of the valley
Of the valley`;

export default function StationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const track = tracks.find((item) => getStationSlug(item) === slug);
  if (!track) notFound();

  const related = tracks.filter((item) => item.id !== track.id && item.artist === track.artist).slice(0, 3);
  const versions = slug === "rose-of-sharon"
    ? [
        { title: "Rose Of Sharon (Official Instrumental with BVs)", artist: "The Living Waters Singers", time: "05:51" },
        { title: "Rose Of Sharon (Official Instrumental without BVs)", artist: "First Love Music", time: "05:52" },
      ]
    : [{ title: track.title, artist: track.artist, time: track.duration }];

  return <StationDetail track={track} versions={versions} related={related} />;
}

function StationDetail({
  track,
  versions,
  related,
}: {
  track: (typeof tracks)[number];
  versions: { title: string; artist: string; time: string }[];
  related: (typeof tracks)[number][];
}) {
  const { currentTrack, isPlaying, toggle, setQueue } = usePlayer();
  const active = currentTrack?.id === track.id;

  function handlePlay() {
    setQueue([track, ...related]);
    toggle(track);
  }

  return (
    <div className="px-4 py-9 sm:px-8 lg:px-14">
      <section className="rounded-[2rem] p-6 sm:p-8" style={{ background: "rgba(255,253,250,0.78)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
        <div className="grid gap-8 md:grid-cols-[270px_1fr]">
          <div className="h-[270px] w-[270px] overflow-hidden rounded-[1.7rem]" style={{ background: "#dfe2e5", boxShadow: "0 24px 70px rgba(12,24,35,0.2)" }}>
            <CoverImage src={track.coverImage || track.imageUrl} alt={track.title} coverColor={track.coverColor} size={540} />
          </div>
          <div className="flex flex-col justify-center">
            <Link href={`/artist/${slugifyArtist(track.artist)}`} className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--premium)]">
              {track.artist}
            </Link>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{track.title}</h1>
            <p className="mt-2 text-base text-[var(--muted)]">
              {track.category === "worship" ? "Praise & Worship" : "Instrumentals"} <span className="px-1">-</span> Album <span className="px-1">-</span> {versions.length} Tracks <span className="px-1">-</span> 11:43 <span className="px-1">-</span> 2025
            </p>
            <div className="mt-5 flex items-center gap-5 text-[var(--muted)]">
              <button className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }} onClick={handlePlay} aria-label={`Play ${track.title}`}>
                <Play size={18} style={{ marginLeft: 2 }} />
              </button>
              <span className="flex items-center gap-1 font-semibold"><Users size={15} />{active && isPlaying ? "Playing" : formatPlays(track.plays)}</span>
              <Heart size={18} />
              <span>14</span>
              <MessageSquare size={17} />
              <Download size={16} />
              <MoreVertical size={17} className="ml-auto" />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t" style={{ borderColor: "var(--border)" }}>
          {versions.map((version, index) => (
            <div key={version.title} className="grid grid-cols-[28px_30px_1fr_auto] items-center gap-4 border-b px-3 py-4" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm text-[var(--muted)]">{index + 1}</span>
              <Plus size={18} className="text-[var(--muted)]" />
              <div className="min-w-0">
                <p className="truncate font-medium">{version.title}</p>
                <p className="truncate text-sm text-[var(--muted)]">{version.artist}</p>
              </div>
              <div className="flex items-center gap-5 text-sm text-[var(--muted)]">
                <Download size={15} />
                <Heart size={16} />
                <span>{version.time}</span>
                <MoreVertical size={15} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="rounded-[2rem] p-6 text-[15px] leading-7 text-[#4a4d52] whitespace-pre-line sm:p-10" style={{ background: "rgba(255,253,250,0.62)", border: "1px solid var(--border)" }}>
          {roseLyrics}
          <p className="mt-8 text-[var(--muted)]">November 22, 2025</p>
          <div className="mt-5 flex gap-2">
            <span className="rounded-full border px-4 py-1 text-sm font-bold" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>Living Waters</span>
            <span className="rounded-full border px-4 py-1 text-sm font-bold" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>Rose Of Sharon</span>
          </div>
        </article>

        <aside>
          <div className="rounded-[2rem] p-9 text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))", boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-2xl font-black">Follow ShemenMusic</h2>
            <p className="mt-6 text-sm font-semibold leading-6">Stay connected with your favorite artists, tracks streamed directly to your devices.</p>
            <div className="mt-8 flex justify-between text-xl text-white/80">
              <span>◎</span><span>f</span><span>X</span><span>◉</span>
            </div>
          </div>
          <div className="mt-6 rounded-2xl p-4 text-center font-semibold text-[var(--premium)]" style={{ background: "var(--premium-soft)", border: "1px solid rgba(182,138,58,0.22)" }}>
            ShemenMusic 2024
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-black tracking-tight">Discover More</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(related.length ? related : tracks.slice(0, 3)).map((item) => (
            <TrackCardLarge key={item.id} track={item} />
          ))}
        </div>
      </section>

      <section className="mt-10 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-black tracking-tight">Comment</h2>
        <div className="grid grid-cols-[42px_1fr] gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#707070] text-white">○</div>
          <form className="grid gap-4">
            <p className="text-sm text-[var(--muted)]">Your email address will not be published. Required fields are marked <span className="text-red-500">*</span></p>
            <textarea className="h-32 rounded-2xl border p-3 outline-none" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} />
            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-sm text-[var(--muted)]">Name *<input className="mt-2 h-10 w-full rounded-xl border px-3" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} /></label>
              <label className="text-sm text-[var(--muted)]">Email *<input className="mt-2 h-10 w-full rounded-xl border px-3" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} /></label>
              <label className="text-sm text-[var(--muted)]">Website<input className="mt-2 h-10 w-full rounded-xl border px-3" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} /></label>
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--muted)]"><input type="checkbox" className="h-4 w-4" />Save my name, email, and website in this browser for the next time I comment.</label>
            <button className="w-fit rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}>Comment</button>
          </form>
        </div>
      </section>
    </div>
  );
}
