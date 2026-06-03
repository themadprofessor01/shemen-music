"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState } from "react";
import { CheckCircle, Download, Heart, MessageSquare, MoreVertical, Play, Plus, Users } from "lucide-react";
import { CoverImage } from "@/components/CoverImage";
import { TrackCardLarge } from "@/components/TrackCard";
import { usePlayer } from "@/components/MusicPlayerContext";
import { formatPlays, getStationSlug, slugifyArtist, stationDetailFor, tracks } from "@/lib/data";

export default function StationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const track = tracks.find((item) => getStationSlug(item) === slug);
  if (!track) notFound();

  const related = tracks.filter((item) => item.id !== track.id && item.artist === track.artist).slice(0, 3);
  const detail = stationDetailFor(track);
  const versions = detail.versions ?? [{ title: track.title, artist: track.artist, time: track.duration }];

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
  const [tab, setTab] = useState<"overview" | "versions" | "comment">("overview");
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const active = currentTrack?.id === track.id;
  const detail = stationDetailFor(track);
  const moreFromArtist = tracks.filter((item) => item.id !== track.id && item.artist === track.artist).slice(0, 5);

  function handlePlay() {
    setQueue([track, ...related]);
    toggle(track);
  }

  function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCommentSubmitted(true);
  }

  return (
    <div className="px-4 py-9 sm:px-8 lg:px-14">
      <section className="rounded-[2rem] p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
        <div className="grid gap-8 md:grid-cols-[270px_1fr]">
          <div className="h-[270px] w-[270px] overflow-hidden rounded-[1.7rem]" style={{ background: "#dfe2e5", boxShadow: "0 24px 70px rgba(12,24,35,0.2)" }}>
            <CoverImage src={track.coverImage || track.imageUrl} alt={track.title} coverColor={track.coverColor} size={540} />
          </div>
          <div className="flex flex-col justify-center">
            <Link href={`/artist/${slugifyArtist(track.artist)}`} className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--premium)]">
              {track.artist}
            </Link>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{track.title}</h1>
            <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">{detail.description}</p>
            <p className="mt-2 text-base text-[var(--muted)]">
              {track.category === "worship" ? "Praise & Worship" : "Instrumentals"} <span className="px-1">-</span> Album <span className="px-1">-</span> {versions.length} Tracks <span className="px-1">-</span> {track.duration} <span className="px-1">-</span> {detail.albumYear}
            </p>
            <div className="mt-5 flex items-center gap-5 text-[var(--muted)]">
              <button className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }} onClick={handlePlay} aria-label={`Play ${track.title}`}>
                <Play size={18} style={{ marginLeft: 2 }} />
              </button>
              <span className="flex items-center gap-1 font-semibold"><Users size={15} />{active && isPlaying ? "Playing" : formatPlays(track.plays)}</span>
              <Heart size={18} />
              <span>14</span>
              <MessageSquare size={17} />
              {track.downloadUrl && (
                <a href={track.downloadUrl} download aria-label="Download track"><Download size={16} /></a>
              )}
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

      <div className="mt-8 flex flex-wrap gap-2 rounded-full border p-1" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {[
          ["overview", detail.lyrics ? "Lyrics" : "Overview"],
          ["versions", "Versions"],
          ["comment", "Comment"],
        ].map(([value, label]) => (
          <button
            key={value}
            className="rounded-full px-5 py-2 text-sm font-bold"
            style={{ background: tab === value ? "var(--premium-soft)" : "transparent", color: tab === value ? "var(--premium)" : "var(--foreground-muted)" }}
            onClick={() => setTab(value as "overview" | "versions" | "comment")}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="rounded-[2rem] p-6 text-[15px] leading-7 text-[var(--foreground)] whitespace-pre-line sm:p-10" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
          {detail.lyrics ?? detail.description}
          {track.downloadUrl && (
            <div className="mt-6">
              <a href={track.downloadUrl} download className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}>
                <Download size={14} /> Free Download
              </a>
            </div>
          )}
          <p className="mt-8 text-[var(--muted)]">{detail.date}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {detail.tags.map((tag) => (
              <span key={tag} className="rounded-full border px-4 py-1 text-sm font-bold" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>{tag}</span>
            ))}
          </div>
        </article>

        <aside>
          <div className="rounded-[2rem] p-9 text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))", boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-2xl font-black">Follow ShemenMusic</h2>
            <p className="mt-6 text-sm font-semibold leading-6">Stay connected with your favorite artists, tracks streamed directly to your devices.</p>
            <div className="mt-8 flex justify-between text-xl text-white/80">
              <a href="https://instagram.com/shemenmusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">◎</a>
              <a href="https://facebook.com/shemenmusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">f</a>
              <a href="https://x.com/shemenmusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="X">𝕏</a>
              <a href="https://youtube.com/@shemenmusic" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="mt-6 rounded-2xl p-4 text-center font-semibold text-[var(--premium)]" style={{ background: "var(--premium-soft)", border: "1px solid rgba(182,138,58,0.22)" }}>
            ShemenMusic 2025
          </div>
        </aside>
      </div>}

      {tab === "versions" && (
        <section className="mt-8 rounded-[2rem] p-5 sm:p-7" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-2xl font-black tracking-tight">Available Versions</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Reference-style track versions and download access, presented as a premium release table.</p>
          <div className="mt-6 grid gap-3">
            {versions.map((version, index) => (
              <div key={version.title} className="grid gap-4 rounded-2xl border p-4 sm:grid-cols-[36px_1fr_auto]" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-[var(--premium)]" style={{ background: "var(--premium-soft)" }}>{index + 1}</span>
                <div className="min-w-0">
                  <p className="truncate font-bold">{version.title}</p>
                  <p className="truncate text-sm text-[var(--muted)]">{version.artist}</p>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-[var(--muted)]">
                  <Download size={15} />
                  <span>{version.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {moreFromArtist.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-black tracking-tight">More from {track.artist}</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreFromArtist.slice(0, 3).map((item) => (
              <TrackCardLarge key={item.id} track={item} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-2xl font-black tracking-tight">Discover More</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(related.length ? related : tracks.slice(0, 3)).map((item) => (
            <TrackCardLarge key={item.id} track={item} />
          ))}
        </div>
      </section>

      {tab === "comment" && <section className="mt-10 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-black tracking-tight">Comment</h2>
        {commentSubmitted ? (
          <div className="mt-6 flex items-center gap-3 rounded-2xl p-6" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
            <CheckCircle size={22} className="text-green-500 shrink-0" />
            <div>
              <p className="font-bold">Thank you for your comment!</p>
              <p className="text-sm text-[var(--muted)]">Your comment is awaiting moderation.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[42px_1fr] gap-4 mt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#707070] text-white">○</div>
            <form className="grid gap-4" onSubmit={handleCommentSubmit}>
              <p className="text-sm text-[var(--muted)]">Your email address will not be published. Required fields are marked <span className="text-red-500">*</span></p>
              <textarea className="h-32 rounded-2xl border p-3 outline-none" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} />
              <div className="grid gap-4 md:grid-cols-3">
                <label className="text-sm text-[var(--muted)]">Name *<input className="mt-2 h-10 w-full rounded-xl border px-3" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} /></label>
                <label className="text-sm text-[var(--muted)]">Email *<input className="mt-2 h-10 w-full rounded-xl border px-3" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} /></label>
                <label className="text-sm text-[var(--muted)]">Website<input className="mt-2 h-10 w-full rounded-xl border px-3" style={{ background: "var(--surface2)", borderColor: "var(--border)" }} /></label>
              </div>
              <label className="flex items-center gap-2 text-sm text-[var(--muted)]"><input type="checkbox" className="h-4 w-4" />Save my name, email, and website in this browser for the next time I comment.</label>
              <button type="submit" className="w-fit rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}>Comment</button>
            </form>
          </div>
        )}
      </section>}
    </div>
  );
}
