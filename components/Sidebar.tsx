"use client";

import Link from "next/link";
import Image from "next/image";
import { Headphones, Download, Home, Heart, Moon, Music2, Mail, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <>
    <aside
      className="hidden md:flex fixed top-0 left-0 bottom-0 w-48 flex-col z-40 overflow-y-auto"
      style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
    >
      {/* Logo */}
      <div className="px-4 py-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ShemenMusic"
            width={140}
            height={20}
            className="w-full max-w-[140px] h-auto"
            style={{ filter: dark ? "brightness(0) invert(1)" : "none" }}
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
          <SideLink href="/" icon={<Home size={15} />} label="Home" />
          <SideLink href="/instrumentals" icon={<Headphones size={15} />} label="Instrumentals" />
          <SideLink href="/worship" icon={<Music2 size={15} />} label="Praise & Worship" />
          <SideLink href="/download" icon={<Download size={15} />} label="Download Everything" />
        </nav>
      </div>

      {/* Library */}
      <div className="px-4 mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "var(--foreground-muted)" }}>
          Library
        </p>
        <nav className="flex flex-col gap-0.5">
          <SideLink href="/likes" icon={<Heart size={15} />} label="Likes" />
        </nav>
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="px-4 pb-5 flex flex-col gap-3">
        <Link href="/contact" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--foreground-muted)" }}>
          <Mail size={14} /> Contact Us
        </Link>
        <div className="flex gap-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
          <Link href="/terms" className="hover:opacity-80">Terms</Link>
          <Link href="/privacy" className="hover:opacity-80">Privacy</Link>
        </div>
        <button onClick={toggleDark} className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--foreground-muted)" }}>
          {dark ? <Sun size={13} /> : <Moon size={13} />}
          {dark ? "Light mode" : "Dark mode"}
        </button>
        <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>©2025 ShemenMusic</p>
      </div>
      </aside>

      <nav className="mobile-bottom-nav fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-[1.35rem] border p-1.5 backdrop-blur-xl" style={{ background: "rgba(255,253,250,0.88)", borderColor: "rgba(231,223,209,0.92)", boxShadow: "0 20px 60px rgba(12,24,35,0.18)" }}>
        <MobileLink href="/" icon={<Home size={18} />} label="Home" />
        <MobileLink href="/instrumentals" icon={<Headphones size={18} />} label="Tracks" />
        <MobileLink href="/download" icon={<Download size={18} />} label="Files" />
        <MobileLink href="/likes" icon={<Heart size={18} />} label="Likes" />
      </nav>
    </>
  );
}


function SideLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className="flex items-start gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors"
      style={{
        color: active ? "var(--foreground)" : "var(--foreground-muted)",
        background: active ? "var(--surface2)" : "transparent",
        fontWeight: active ? "600" : "normal",
      }}
    >
      <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>{icon}</span>
      <span className="leading-snug">{label}</span>
    </Link>
  );
}

function MobileLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold" style={{ color: "var(--foreground-muted)" }}>
      <span className="text-[var(--accent)]">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}
