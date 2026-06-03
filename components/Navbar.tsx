"use client";

import { useState } from "react";
import { Download, Headphones, Heart, ListMusic, Menu, Search, Sparkles, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b" style={{ background: "rgba(255,255,255,0.86)", borderColor: "var(--border)", backdropFilter: "blur(18px)" }}>
        <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-black/5" aria-label="Open menu">
              <Menu size={20} />
            </button>
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <Image
                src="https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2022/07/NewLogo2022.png?fit=3000%2C424&ssl=1"
                alt="ShemenMusic"
                width={190}
                height={27}
                className="h-7 w-auto max-w-44 object-contain"
              />
            </Link>
          </div>

          <label className="hidden sm:flex items-center gap-3 h-11 flex-1 max-w-xl rounded-full px-4 shadow-sm" style={{ background: "rgba(244,247,251,0.9)", border: "1px solid var(--border)" }}>
            <input className="min-w-0 flex-1 bg-transparent outline-none text-sm" placeholder="Search..." />
            <Search size={17} />
          </label>

          <div className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/likes" className="hover:text-[var(--blue)]">Sign In</Link>
            <Link href="/download" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/20" style={{ background: "linear-gradient(135deg, var(--blue), var(--blue-deep))" }}>
              <User size={15} fill="currentColor" />
              Sign Up
            </Link>
          </div>

          <button className="md:hidden h-9 w-9 rounded-full flex items-center justify-center" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Search size={20} />}
          </button>
        </div>
      </header>

      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-52 border-r flex-col justify-between px-6 py-7 text-sm" style={{ background: "rgba(255,253,250,0.86)", borderColor: "var(--border)", backdropFilter: "blur(18px)" }}>
        <div className="space-y-8">
          <Link href="/download" className="premium-card block rounded-2xl p-4">
            <span className="premium-pill inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]">
              Studio
            </span>
            <p className="mt-3 text-sm font-bold leading-5">Master files, stems, and service-ready tools.</p>
          </Link>
          <NavGroup title="Browse">
            <DropItem href="/instrumentals" icon={<Headphones size={15} />} label="Instrumentals" />
            <DropItem href="/worship" icon={<Headphones size={15} />} label="Praise & Worship Instrumentals" />
            <DropItem href="/download" icon={<Download size={15} />} label="Download Everything" />
          </NavGroup>
          <NavGroup title="Library">
            <DropItem href="/playlists" icon={<ListMusic size={15} />} label="Playlists" />
            <DropItem href="/likes" icon={<Heart size={15} />} label="Likes" />
            <DropItem href="/download" icon={<Sparkles size={15} />} label="Premium Library" />
            <button className="flex items-center gap-3 text-left text-sm text-[var(--muted)]">
              <span className="h-5 w-9 rounded-full bg-black/10 p-0.5 flex">
                <span className="h-4 w-4 rounded-full bg-white shadow" />
              </span>
              Dark theme
            </button>
          </NavGroup>
          <div className="space-y-5 text-[var(--muted)]">
            <Link href="/download" className="block hover:text-[var(--blue)]">Contact Us</Link>
            <div className="flex gap-4">
              <Link href="/download" className="hover:text-[var(--blue)]">Terms</Link>
              <Link href="/download" className="hover:text-[var(--blue)]">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <p className="text-sm text-[var(--muted)]">@2024 ShemenMusic</p>
      </aside>

      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden border-b px-4 py-4 space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <label className="flex items-center gap-3 h-11 rounded-full px-4" style={{ background: "var(--background)" }}>
            <input className="min-w-0 flex-1 bg-transparent outline-none text-sm" placeholder="Search..." />
            <Search size={17} />
          </label>
          <div className="grid grid-cols-2 gap-3 text-sm font-medium">
            <DropItem href="/instrumentals" icon={<Headphones size={15} />} label="Instrumentals" />
            <DropItem href="/worship" icon={<Headphones size={15} />} label="Worship" />
            <DropItem href="/download" icon={<Download size={15} />} label="Downloads" />
            <DropItem href="/playlists" icon={<ListMusic size={15} />} label="Playlists" />
          </div>
        </div>
      )}
    </>
  );
}

function DropItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg py-1.5 text-sm leading-5 text-[var(--foreground)] hover:text-[var(--blue)]"
    >
      <span style={{ color: "var(--blue)" }}>{icon}</span>
      {label}
    </Link>
  );
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--muted)]">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
