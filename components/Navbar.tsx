"use client";

import { useState } from "react";
import { Music2, Menu, X, ChevronDown, Download, Headphones, ListMusic, Heart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gold)" }}>
            <Music2 size={18} className="text-black" />
          </div>
          <span style={{ color: "var(--foreground)" }}>
            Shemen<span style={{ color: "var(--gold)" }}>Music</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {/* Browse dropdown */}
          <div className="relative">
            <button
              onClick={() => setBrowseOpen((o) => !o)}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: "var(--foreground)" }}
            >
              Browse <ChevronDown size={14} />
            </button>
            {browseOpen && (
              <div
                className="absolute top-8 left-0 rounded-xl shadow-2xl min-w-52 p-2 border"
                style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
              >
                <DropItem href="/instrumentals" icon={<Headphones size={15} />} label="Instrumentals" />
                <DropItem href="/worship" icon={<Music2 size={15} />} label="Praise & Worship" />
                <DropItem href="/download" icon={<Download size={15} />} label="Download Everything" />
              </div>
            )}
          </div>

          <Link href="/playlists" className="flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: "var(--foreground)" }}>
            <ListMusic size={15} /> Playlists
          </Link>
          <Link href="/likes" className="flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: "var(--foreground)" }}>
            <Heart size={15} /> Likes
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          style={{ color: "var(--foreground)" }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-3 text-sm font-medium" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <Link href="/instrumentals" className="flex items-center gap-2" style={{ color: "var(--foreground)" }}><Headphones size={15} />Instrumentals</Link>
          <Link href="/worship" className="flex items-center gap-2" style={{ color: "var(--foreground)" }}><Music2 size={15} />Praise & Worship</Link>
          <Link href="/download" className="flex items-center gap-2" style={{ color: "var(--foreground)" }}><Download size={15} />Download Everything</Link>
          <Link href="/playlists" className="flex items-center gap-2" style={{ color: "var(--foreground)" }}><ListMusic size={15} />Playlists</Link>
          <Link href="/likes" className="flex items-center gap-2" style={{ color: "var(--foreground)" }}><Heart size={15} />Likes</Link>
        </div>
      )}
    </header>
  );
}

function DropItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-80 transition-opacity text-sm"
      style={{ color: "var(--foreground)" }}
    >
      <span style={{ color: "var(--gold)" }}>{icon}</span>
      {label}
    </Link>
  );
}
