import type { Metadata } from "next";
import { formatPlays, tracks, playlists, totalDuration } from "@/lib/data";
import { FeaturedScrollSection } from "@/components/FeaturedScrollSection";
import { CollectionCover } from "@/components/CollectionCover";
import { TrackCardLarge } from "@/components/TrackCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CountUp } from "@/components/CountUp";
import { AdBanner } from "@/components/AdBanner";
import { Activity, ArrowUpRight, BarChart3, Sparkles, Users } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ShemenMusic — Church Music & Instrumentals",
  description: "Free worship music, praise instrumentals, and gospel tracks from Shemen Music. Stream and download hundreds of tracks for church teams, worship leaders, and personal devotion.",
  openGraph: {
    title: "ShemenMusic — Church Music & Instrumentals",
    description: "Free worship music, praise instrumentals, and gospel tracks from Shemen Music.",
    url: "https://shemenmusic.com",
    siteName: "ShemenMusic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShemenMusic — Church Music & Instrumentals",
    description: "Free worship music, praise instrumentals, and gospel tracks from Shemen Music.",
  },
  alternates: { canonical: "https://shemenmusic.com" },
};

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="text-center mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">ShemenMusic</p>
      <h2 className="mt-1 text-2xl font-black tracking-tight">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium text-[var(--blue)] hover:opacity-75 mt-1 inline-block">
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
      <header className="relative overflow-hidden rounded-[2rem] p-6 pb-10 sm:p-9 sm:pb-14 lg:p-12 lg:pb-16" style={{ background: "var(--hero-bg)", boxShadow: "0 34px 90px rgba(12,24,35,0.24)", minHeight: "clamp(260px, 55vh, 580px)" }}>
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 70% 20%, rgba(230, 194, 119, 0.24), transparent 22rem)" }} />
        <div className="relative flex flex-col items-center text-center text-white gap-6">
          {/* Badge + heading */}
          <div>
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2">
              <Image src="/logo.png" alt="ShemenMusic" width={140} height={20} className="h-5 w-auto" style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }} priority />
            </div>
            <h1 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-shimmer">Discover</h1>
          </div>

          {/* Orbiting cards */}
          <HeroCarousel tracks={featured} />

          {/* Description + buttons */}
          <div className="flex flex-col items-center gap-4">
            <p className="max-w-md text-base sm:text-lg leading-7 text-white/68">A polished music library for worship leaders, studios, and church teams.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/instrumentals" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-xl shadow-black/20" style={{ color: "#0c1823" }}>
                Browse Collection
                <ArrowUpRight size={15} />
              </Link>
              <Link href="/download" className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2.5 text-sm font-semibold text-white/86">
                Downloads
              </Link>
            </div>
          </div>
        </div>
      </header>

<section className="relative overflow-hidden rounded-[2rem] p-5 sm:p-6 lg:p-7" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[var(--premium-soft)] blur-3xl" />
        <div className="relative flex flex-col gap-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--premium)]">Listening Intelligence</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">Analytics</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">A calm overview of catalogue quality, engagement, and worship-team readiness.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <AnalyticsCard icon={<BarChart3 size={18} />} value={formatPlays(totalPlays)} label="Total plays" detail="Across all releases" />
            <AnalyticsCard icon={<Activity size={18} />} value={`${trending.length}/${tracks.length}`} label="Trending now" detail="High rotation catalogue" />
            <AnalyticsCard icon={<Sparkles size={18} />} value={totalDuration(tracks)} label="Curated runtime" detail="Ready for service prep" />
            <AnalyticsCard icon={<Users size={18} />} value={`${instrumentalCount}`} label="Instrumental masters" detail="Studio-grade arrangements" />
          </div>
        </div>
      </section>

      {/* Ad placement — leaderboard between analytics and spotlight */}
      <AdBanner size="leaderboard" />

      <section className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6 items-stretch">
        <div className="relative min-h-[200px] sm:min-h-[360px] overflow-hidden rounded-[2rem]" style={{ boxShadow: "var(--shadow-card)" }}>
          {featured[0].imageUrl ? <Image src={featured[0].imageUrl} alt="" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" priority /> : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${featured[0].coverColor}, ${featured[0].coverColor}88)` }} />}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 34%, rgba(12,24,35,0.84))" }} />
          <div className="absolute left-5 right-5 bottom-5">
            <p className="premium-pill inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">Spotlight</p>
            <h2 className="mt-4 text-3xl font-black text-white">{featured[0].title}</h2>
            <p className="mt-1 text-white/68">{featured[0].artist}</p>
          </div>
        </div>

        <div className="premium-card rounded-[2rem] p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 sm:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--premium)]">Editorial Album Spotlight</p>
            <h2 className="mt-3 max-w-2xl text-2xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-none">A release prepared for prayer rooms and Sunday mornings.</h2>
            <p className="mt-3 sm:mt-5 max-w-xl text-[var(--muted)] leading-7 text-sm sm:text-base">Master-quality worship audio, curated with a studio sensibility and arranged for teams that need reliable, beautiful sound in the room.</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
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
        <FeaturedScrollSection tracks={featured} />
      </section>

      <section>
        <SectionHeader title="Trending" href="/instrumentals" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5">
          {trending.concat(tracks.filter((track) => !track.trending)).slice(0, 10).map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* Ad placement — rectangle between trending and playlists */}
      <AdBanner size="rectangle" />

      <section>
        <SectionHeader title="Playlists" href="/playlists" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5">
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
        <p>© Copyright 2025 ShemenMusic. All Rights Reserved</p>
        <div className="flex flex-wrap gap-3 mt-7 text-[var(--foreground)]">
          <Link href="/terms">Service Terms</Link>
          <span>•</span>
          <Link href="/privacy">Cookie Warnings</Link>
          <span>•</span>
          <Link href="/contact">Support</Link>
          <span>•</span>
          <Link href="/contact">Feedback</Link>
        </div>
      </footer>
    </div>
  );
}


function AnalyticsCard({ icon, value, label, detail }: { icon: ReactNode; value: string; label: string; detail: string }) {
  return (
    <div className="rounded-3xl p-4 sm:p-5" style={{ background: "var(--surface2)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center justify-between gap-4">
        <span className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center text-[var(--premium)]" style={{ background: "rgba(245,234,210,0.72)" }}>
          {icon}
        </span>
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--premium)" }} />
      </div>
      <p className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-black tracking-tight"><CountUp value={value} /></p>
      <p className="mt-1 font-bold text-sm sm:text-base">{label}</p>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[var(--muted)]">{detail}</p>
    </div>
  );
}

function SpotlightStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
      <p className="text-xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
    </div>
  );
}
