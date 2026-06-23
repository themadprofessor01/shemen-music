"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Headphones, Download, Home, ListMusic, Heart, Moon, Music2, Mail, Sun } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import PillNav from "@/components/PillNav";

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
          <PillNav
            items={[
              { href: "/", icon: <Home size={15} />, label: "Home", exact: true },
              { href: "/instrumentals", icon: <Headphones size={15} />, label: "Instrumentals" },
              { href: "/worship", icon: <Music2 size={15} />, label: "Praise & Worship" },
              { href: "/download", icon: <Download size={15} />, label: "Download Everything" },
            ]}
          />
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

        <div className="flex-1" />

        {/* Footer */}
        <div className="px-4 pb-5 flex flex-col gap-3">
          <button
            onClick={toggleDark}
            className="flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all hover:opacity-80"
            style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--foreground)" }}
          >
            {dark ? <Sun size={13} /> : <Moon size={13} />}
            {dark ? "Light mode" : "Dark mode"}
          </button>
          <Link href="/contact" className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--foreground-muted)" }}>
            <Mail size={14} /> Contact Us
          </Link>
          <div className="flex gap-3 text-xs" style={{ color: "var(--foreground-muted)" }}>
            <Link href="/terms" className="hover:opacity-80">Terms</Link>
            <Link href="/privacy" className="hover:opacity-80">Privacy</Link>
          </div>
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>©2025 ShemenMusic</p>
        </div>
      </aside>

      <MobileBottomNav />
    </>
  );
}

function SideLink({ href, icon, label, exact = false }: { href: string; icon: React.ReactNode; label: string; exact?: boolean }) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : (pathname === href || pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-all"
      style={{
        background: isActive ? "var(--accent-dim, rgba(7,93,158,0.12))" : "transparent",
        color: isActive ? "var(--accent)" : "var(--foreground-muted)",
        fontWeight: isActive ? 700 : 400,
      }}
    >
      <span className="flex-shrink-0" style={{ color: "var(--accent)" }}>{icon}</span>
      <span className="leading-snug">{label}</span>
    </Link>
  );
}

const MOBILE_ITEMS: { href: string; icon: React.ReactNode; label: string; exact?: boolean }[] = [
  { href: "/", icon: <Home size={18} />, label: "Home", exact: true },
  { href: "/instrumentals", icon: <Headphones size={18} />, label: "Tracks" },
  { href: "/playlists", icon: <ListMusic size={18} />, label: "Lists" },
  { href: "/download", icon: <Download size={18} />, label: "Files" },
  { href: "/likes", icon: <Heart size={18} />, label: "Likes" },
];

function MobileBottomNav() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isFirst = useRef(true);

  const activeIndex = MOBILE_ITEMS.findIndex((item) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/")
  );

  useEffect(() => {
    if (activeIndex < 0 || !pillRef.current || !containerRef.current) return;
    const activeEl = itemRefs.current[activeIndex];
    if (!activeEl) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const iRect = activeEl.getBoundingClientRect();
    const props = { x: iRect.left - cRect.left, y: iRect.top - cRect.top, width: iRect.width, height: iRect.height };
    if (isFirst.current) { gsap.set(pillRef.current, props); isFirst.current = false; }
    else { gsap.to(pillRef.current, { ...props, duration: 0.4, ease: "power2.inOut" }); }
  }, [activeIndex]);

  return (
    <nav
      ref={containerRef}
      className="mobile-bottom-nav fixed inset-x-3 bottom-3 z-50 flex rounded-[1.35rem] border p-1.5 backdrop-blur-xl relative"
      style={{ background: "rgba(255,253,250,0.88)", borderColor: "rgba(231,223,209,0.92)", boxShadow: "0 20px 60px rgba(12,24,35,0.18)" }}
    >
      {/* Sliding pill */}
      <div
        ref={pillRef}
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "var(--accent-dim, rgba(7,93,158,0.1))",
          borderRadius: 18,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {MOBILE_ITEMS.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="flex flex-1 min-w-0 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-bold"
            style={{
              position: "relative",
              zIndex: 1,
              color: isActive ? "var(--accent)" : "var(--foreground-muted)",
              transition: "color 0.3s ease",
              textDecoration: "none",
            }}
          >
            <span style={{ color: "var(--accent)" }}>{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
