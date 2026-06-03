import Link from "next/link";
import { ArrowUpRight, Disc3, Mail, Music2, ShieldCheck } from "lucide-react";
import { formatPlays, tracks, totalDuration } from "@/lib/data";
import type { ReactNode } from "react";

export function LuxuryFooter() {
  const totalPlays = tracks.reduce((sum, track) => sum + track.plays, 0);

  return (
    <footer className="mx-4 mb-8 mt-16 overflow-hidden rounded-[2rem] text-white sm:mx-8 lg:mx-14" style={{ background: "linear-gradient(135deg, #0c1823 0%, #123655 58%, #0b1520 100%)", boxShadow: "0 34px 90px rgba(12,24,35,0.22)" }}>
      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="motion-ambient absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[rgba(182,138,58,0.28)] blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">ShemenMusic</p>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-none tracking-tight">Premium worship sounds, prepared for teams who listen closely.</h2>
            <p className="mt-5 max-w-lg leading-7 text-white/62">Instrumentals, worship releases, and curated flows with a studio-first feel for service planning, rehearsal, and devotion.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/instrumentals" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0c1823] shadow-xl shadow-black/20">
                Explore catalogue
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/16 px-5 py-3 text-sm font-bold text-white/84">
                Contact team
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/46">Catalogue</p>
            <div className="mt-5 grid gap-3">
              <FooterMetric icon={<Disc3 size={15} />} value={`${tracks.length}`} label="Curated tracks" />
              <FooterMetric icon={<Music2 size={15} />} value={totalDuration(tracks)} label="Total runtime" />
              <FooterMetric icon={<ShieldCheck size={15} />} value={formatPlays(totalPlays)} label="Catalogue plays" />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/46">Navigate</p>
            <nav className="mt-5 grid gap-3 text-sm font-semibold text-white/72">
              <Link className="hover:text-white" href="/download">Downloads</Link>
              <Link className="hover:text-white" href="/playlists">Playlists</Link>
              <Link className="hover:text-white" href="/likes">Saved music</Link>
              <Link className="hover:text-white" href="/privacy">Privacy</Link>
              <Link className="hover:text-white" href="/terms">Terms</Link>
            </nav>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/46 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 ShemenMusic. All Rights Reserved.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.16em] text-white/64 hover:text-white">
            <Mail size={13} />
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterMetric({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[var(--premium-soft)]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-lg font-black text-white">{value}</span>
        <span className="block truncate text-xs font-semibold text-white/50">{label}</span>
      </span>
    </div>
  );
}
