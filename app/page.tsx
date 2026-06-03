import { tracks, playlists, moods } from "@/lib/data";
import { TrackCardLarge } from "@/components/TrackCard";
import { Crown, Download, Lock, SlidersHorizontal, Sparkles, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
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

  return (
    <div className="px-4 py-9 sm:px-8 lg:px-14 space-y-12">
      <header className="pt-4 grid lg:grid-cols-[1fr_360px] gap-6 items-end">
        <div>
          <span className="premium-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
            <Crown size={13} />
            Shemen Premium
          </span>
          <h1 className="mt-4 text-5xl sm:text-6xl font-black tracking-tight">Discover</h1>
          <p className="mt-3 max-w-xl text-[var(--muted)]">A refined worship library with premium downloads, stems, and service-ready collections.</p>
        </div>
        <Link href="/download" className="premium-card group rounded-3xl p-5 overflow-hidden relative">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--premium-soft)] blur-2xl" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[var(--premium)]">Upgrade experience</p>
              <p className="mt-1 text-xl font-black leading-6">Unlock WAV, stems, and chord tools.</p>
            </div>
            <span className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ background: "linear-gradient(135deg, var(--premium), #7a4f0b)" }}>
              <Sparkles size={20} />
            </span>
          </div>
        </Link>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <PremiumFeature icon={<Download size={18} />} title="Studio Downloads" label="WAV, MP3, stems" />
        <PremiumFeature icon={<SlidersHorizontal size={18} />} title="Key & Tempo Tools" label="Prepare every singer" />
        <PremiumFeature icon={<Wand2 size={18} />} title="AI Worship Flow" label="Plan the service mood" />
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
              <div className="aspect-square relative overflow-hidden" style={{ background: "linear-gradient(145deg, #e7edf3, #cfd8e1)" }}>
                <div className="absolute inset-5 rounded-3xl border border-white/70" />
                <div className="absolute bottom-5 left-5 premium-pill inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold">
                  <Lock size={11} />
                  Premium Set
                </div>
              </div>
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
    <div className="premium-card rounded-2xl p-4 flex items-center gap-4">
      <span className="h-11 w-11 rounded-2xl flex items-center justify-center text-[var(--blue)]" style={{ background: "var(--blue-soft)" }}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-bold truncate">{title}</p>
        <p className="text-sm text-[var(--muted)] truncate">{label}</p>
      </div>
    </div>
  );
}
