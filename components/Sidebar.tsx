"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Headphones, Download, ListMusic, Heart, Music2, Sun, Moon, Mail } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shemen_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("shemen_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("shemen_theme", "light");
    }
  }

  return (
    <aside
      className="fixed top-0 left-0 bottom-0 w-48 flex flex-col z-40 overflow-y-auto"
      style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5">
        <Link href="/" className="flex items-center">
          <Image
            src="https://shemenmusic.com/three/wp-content/uploads/2022/07/NewLogo2022.png"
            alt="ShemenMusic"
            width={140}
            height={20}
            className="h-7 w-auto object-contain"
            style={{ filter: "var(--logo-filter, none)" }}
            priority
          />
        </Link>
      </div>

      {/* Browse */}
      <div className="px-4 mt-2">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "var(--foreground-muted)" }}>
          Browse
        </p>
        <nav className="flex flex-col gap-0.5">
          <SideLink href="/instrumentals" icon={<Headphones size={15} />} label="Instrumentals" />
          <SideLink href="/praise-worship-instrumentals" icon={<Music2 size={15} />} label="Praise & Worship" />
          <SideLink href="/download" icon={<Download size={15} />} label="Download Everything" />
        </nav>
      </div>

      {/* Library */}
      <div className="px-4 mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "var(--foreground-muted)" }}>
          Library
        </p>
        <nav className="flex flex-col gap-0.5">
          <SideLink href="/playlists" icon={<ListMusic size={15} />} label="Playlists" />
          <SideLink href="/likes" icon={<Heart size={15} />} label="Likes" />
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="px-4 pb-5 flex flex-col gap-3">
        {/* Dark theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
          style={{ color: "var(--foreground-muted)" }}
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
          <span>{dark ? "Light theme" : "Dark theme"}</span>
        </button>

        <Link href="/contact" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--foreground-muted)" }}>
          <Mail size={14} /> Contact Us
        </Link>

        <div className="flex gap-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <Link href="/terms" className="hover:opacity-80 transition-opacity">Terms</Link>
          <Link href="/privacy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
        </div>

        <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>@2024 ShemenMusic</p>
      </div>
    </aside>
  );
}

function SideLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-start gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
      style={{ color: "var(--foreground-muted)" }}
    >
      <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>{icon}</span>
      <span className="leading-snug">{label}</span>
    </Link>
  );
}
