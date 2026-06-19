import { formatPlays, tracks, playlists, moods, totalDuration } from "@/lib/data";
import { CollectionCover } from "@/components/CollectionCover";
import { TrackCardLarge } from "@/components/TrackCard";
import { AdBanner } from "@/components/AdBanner";
import { Activity, ArrowUpRight, BarChart3, Download, SlidersHorizontal, Sparkles, Users, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">ShemenMusic</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-sm font-medium text-[var(--blue)] hover:opacity-75">
          See all
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const featured = tracks.filter((track) => track.featured);
  const trending = tracks.filter((track) => track.trending);
  const totalPlays = tracks.reduce((sum, track) => sum + track.plays, 0);
  const instrumentalCount = tracks.filter((track) => track.category === "instrumental").length;

  return (
    <div className="px-3 py-6 sm:px-8 lg:px-14 space-y-10 sm:space-y-14">
      <header className="relative overflow-hidden rounded-[2rem] p-6 sm:p-9 lg:p-12" style={{ background: "linear-gradient(135deg, #0c1823 0%, #123655 54%, #0b1520 100%)", boxShadow: "0 34px 90px rgba(12,24,35,0.24)" }}>
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 70% 20%, rgba(230, 194, 119, 0.24), transparent 22rem)" }} />
        <div className="relative grid lg:grid-cols-[0.92fr_1.08fr] gap-10 items-center">
          {/* Text content */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              Curated Worship Archive
            </span>
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">Discover</h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-7 text-white/68">A polished music library for worship leaders, studios, and church teams.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/instrumentals" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-xl shadow-black/20" style={{ color: "#0c1823" }}>
                Browse Collection
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/download" className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2.5 text-sm font-semibold text-white/86">
                Downloads
              </Link>
            </div>
          </div>

          {/* Stacked cards — hidden on small, visible lg+ */}
          <div className="relative hidden lg:block min-h-[340px]">
            {featured.slice(0, 3).map((track, index) => (
              <div
                key={track.id}
                className="absolute overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/10 shadow-2xl"
                style={{
                  width: index === 1 ? "54%" : "44%",
                  left: index === 0 ? "0%" : index === 1 ? "29%" : "57%",
                  top: index === 0 ? "12%" : index === 1 ? "0%" : "22%",
                  transform: index === 1 ? "scale(1.04)" : "scale(0.92)",
                  zIndex: index === 1 ? 2 : 1,
                }}
              >
                <div className="relative aspect-square">
                  {track.imageUrl ? <Image src={track.imageUrl} alt="" fill sizes="28vw" className="object-cover" priority={index === 1} /> : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor}88)` }} />}
                </div>
                <div className="bg-white/92 p-3">
                  <p className="truncate font-bold text-sm text-[var(--ink)]">{track.title}</p>
                  <p className="truncate text-xs text-[var(--muted)]">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll of covers */}
          <div className="flex lg:hidden gap-3 overflow-x-auto pb-1 -mx-1 px-1">
            {featured.slice(0, 4).map((track) => (
              <div key={track.id} className="flex-shrink-0 w-28 rounded-xl overflow-hidden border border-white/12">
                <div className="relative aspect-square">
                  {track.imageUrl ? <Image src={track.imageUrl} alt="" fill sizes="112px" className="object-cover" /> : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${track.coverColor}, ${track.coverColor}88)` }} />}
                </div>
                <div className="bg-white/90 px-2 py-1.5">
                  <p className="truncate text-xs font-bold text-[var(--ink)]">{track.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <PremiumFeature icon={<Download size={18} />} title="Studio-grade files" label="WAV, MP3, stems" />
        <PremiumFeature icon={<SlidersHorizontal size={18} />} title="Prepared for teams" label="Keys, tempos, service flow" />
        <PremiumFeature icon={<Wand2 size={18} />} title="Editorial discovery" label="Curated moods and moments" />
      </section>

      <section className="relative overflow-hidden rounded-[2rem] p-5 sm:p-6 lg:p-7" style={{ background: "linear-gradient(135deg, rgba(255,253,250,0.92), rgba(242,236,226,0.86))", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[var(--premium-soft)] blur-3xl" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Listening Intelligence</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">Analytics</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--muted)]">A calm overview of catalogue quality, engagement, and worship-team readiness.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AnalyticsCard icon={<BarChart3 size={18} />} value={formatPlays(totalPlays)} label="Total plays" detail="+18% from last cycle" />
            <AnalyticsCard icon={<Activity size={18} />} value={`${trending.length}/${tracks.length}`} label="Trending now" detail="High rotation catalogue" />
            <AnalyticsCard icon={<Sparkles size={18} />} value={totalDuration(tracks)} label="Curated runtime" detail="Ready for service prep" />
            <AnalyticsCard icon={<Users size={18} />} value={`${instrumentalCount}`} label="Instrumental masters" detail="Studio-grade arrangements" />
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6 items-stretch">
        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]" style={{ boxShadow: "var(--shadow-card)" }}>
          {featured[0].imageUrl ? <Image src={featured[0].imageUrl} alt="" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" /> : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${featured[0].coverColor}, ${featured[0].coverColor}88)` }} />}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 34%, rgba(12,24,35,0.84))" }} />
          <div className="absolute left-5 right-5 bottom-5">
            <p className="premium-pill inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">Spotlight</p>
            <h2 className="mt-4 text-3xl font-black text-white">{featured[0].title}</h2>
            <p className="mt-1 text-white/68">{featured[0].artist}</p>
          </div>
        </div>

        <div className="premium-card rounded-[2rem] p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--premium)]">Editorial Album Spotlight</p>
            <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl font-black tracking-tight leading-none">A release prepared for prayer rooms and Sunday mornings.</h2>
            <p className="mt-5 max-w-xl text-[var(--muted)] leading-7">Master-quality worship audio, curated with a studio sensibility and arranged for teams that need reliable, beautiful sound in the room.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <SpotlightStat value={featured[0].duration} label="Runtime" />
            <SpotlightStat value={featured[0].size} label="Master file" />
            <SpotlightStat value={formatPlays(featured[0].plays)} label="Plays" />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/instrumentals" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, var(--ink), var(--blue-deep))" }}>
              Listen to release
              <ArrowUpRight size={16} />
            </Link>
            <Link href="/download" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold" style={{ borderColor: "var(--border)", color: "var(--ink)" }}>
              View studio files
            </Link>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Featured" href="/instrumentals" />
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
          {featured.map((track) => (
            <div key={track.id} className="min-w-[220px] sm:min-w-[320px] max-w-[420px] flex-1 snap-start">
              <TrackCardLarge track={track} />
            </div>
          ))}
        </div>
        <div className="hidden sm:flex justify-center gap-3 pt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
        </div>
      </section>

      <AdBanner size="leaderboard" />

      <section>
        <SectionHeader title="Trending" href="/instrumentals" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {trending.concat(tracks.filter((track) => !track.trending)).slice(0, 10).map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Moods" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {moods.map((mood) => (
            <Link
              key={mood.id}
              href={`/mood/${mood.id}`}
              className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              {mood.imageUrl ? (
                <div className="relative aspect-square w-full">
                  <Image src={mood.imageUrl} alt="" fill sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw" className="object-cover" />
                </div>
              ) : (
                <div className="aspect-square w-full" style={{ background: mood.color }} />
              )}
              <div className="p-4">
                <p className="font-medium">{mood.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Playlists" href="/playlists" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              <CollectionCover playlist={playlist} />
              <div className="p-4">
                <p className="font-medium truncate">{playlist.title}</p>
                <p className="text-sm text-[var(--muted)]">{playlist.trackCount} tracks</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t pt-12 pb-8 mt-16 text-xs text-[var(--muted)]" style={{ borderColor: "var(--border)" }}>
        <p>@ Copyright 2024 ShemenMusic. All Rights Reserved</p>
        <div className="flex flex-wrap gap-3 mt-7 text-[var(--foreground)]">
          <Link href="/download">Service Terms</Link>
          <span>•</span>
          <Link href="/download">Cookie Warnings</Link>
          <span>•</span>
          <Link href="/download">Support</Link>
          <span>•</span>
          <Link href="/download">Feedback</Link>
        </div>
      </footer>
    </div>
  );
}

function PremiumFeature({ icon, title, label }: { icon: ReactNode; title: string; label: string }) {
  return (
    <div className="premium-card rounded-3xl p-5 flex items-center gap-4">
      <span className="h-12 w-12 rounded-2xl flex items-center justify-center text-[var(--blue)]" style={{ background: "var(--blue-soft)" }}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-bold truncate">{title}</p>
        <p className="text-sm text-[var(--muted)] truncate">{label}</p>
      </div>
    </div>
  );
}

function AnalyticsCard({ icon, value, label, detail }: { icon: ReactNode; value: string; label: string; detail: string }) {
  return (
    <div className="rounded-3xl p-5" style={{ background: "rgba(255,253,250,0.76)", border: "1px solid rgba(231,223,209,0.84)", boxShadow: "0 14px 34px rgba(33,26,16,0.07)" }}>
      <div className="flex items-center justify-between gap-4">
        <span className="h-11 w-11 rounded-2xl flex items-center justify-center text-[var(--premium)]" style={{ background: "rgba(245,234,210,0.72)" }}>
          {icon}
        </span>
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--premium)" }} />
      </div>
      <p className="mt-6 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-1 font-bold">{label}</p>
      <p className="mt-3 text-sm text-[var(--muted)]">{detail}</p>
    </div>
  );
}

function SpotlightStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "rgba(255,253,250,0.62)", border: "1px solid rgba(231,223,209,0.8)" }}>
      <p className="text-xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
    </div>
  );
}
