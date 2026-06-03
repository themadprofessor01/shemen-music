"use client";

import { useState } from "react";
import Link from "next/link";
import { Headphones, Download, ListMusic, Heart, Music2, Mail, Menu } from "lucide-react";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-40 flex w-[199px] flex-col overflow-y-auto"
      style={{ background: "#ffffff", borderRight: "1px solid #eef0f2" }}
    >
      <div className="flex h-16 items-center gap-3 px-6">
        <Menu size={18} style={{ color: "#5d6268" }} />
        <Link href="/" className="flex items-center">
          <img
            src="https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2022/07/NewLogo2022.png?fit=3000%2C424&ssl=1"
            alt="ShemenMusic"
            className="h-[30px] w-[158px] object-contain object-left"
          />
        </Link>
      </div>

      <div className="px-6 pt-7">
        <p className="mb-3 text-sm" style={{ color: "#777a80" }}>
          Browse
        </p>
        <nav className="flex flex-col gap-2">
          <SideLink href="/instrumentals" icon={<Headphones size={15} />} label="Instrumentals" />
          <SideLink href="/praise-worship-instrumentals" icon={<Music2 size={15} />} label="Praise & Worship Instrumentals" />
          <SideLink href="/download" icon={<Download size={15} />} label="Download Everything" />
        </nav>
      </div>

      <div className="px-6 pt-8">
        <p className="mb-3 text-sm" style={{ color: "#777a80" }}>
          Library
        </p>
        <nav className="flex flex-col gap-2">
          <SideLink href="/login" icon={<ListMusic size={15} />} label="Playlists" />
          <SideLink href="/login" icon={<Heart size={15} />} label="Likes" />
        </nav>
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-6 px-6 pb-8">
        <button
          onClick={() => setDark((d) => !d)}
          className="flex items-center gap-2 text-sm"
          style={{ color: "#20242a" }}
        >
          <span className="relative inline-flex h-4 w-8 rounded-full bg-[#e1e3e6]">
            <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow ${dark ? "left-4" : "left-0.5"}`} />
          </span>
          <span>Dark theme</span>
        </button>

        <a href="mailto:contact@shemenmusic.com" className="flex items-center gap-2 text-sm" style={{ color: "#777a80" }}>
          <Mail size={14} /> Contact Us
        </a>

        <div className="flex gap-4 text-sm" style={{ color: "#777a80" }}>
          <Link href="/terms" className="hover:opacity-80 transition-opacity">Terms</Link>
          <Link href="/privacy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
        </div>

        <p className="text-sm" style={{ color: "#777a80" }}>@2024 ShemenMusic</p>
      </div>
    </aside>
  );
}

function SideLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 text-[15px] transition-colors hover:opacity-80"
      style={{ color: "#20242a" }}
    >
      <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>{icon}</span>
      <span className="leading-snug">{label}</span>
    </Link>
  );
}
