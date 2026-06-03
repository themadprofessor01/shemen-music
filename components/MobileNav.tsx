"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Headphones, ListMusic, Heart, Download } from "lucide-react";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/instrumentals", icon: Headphones, label: "Browse" },
  { href: "/playlists", icon: ListMusic, label: "Playlists" },
  { href: "/likes", icon: Heart, label: "Likes" },
  { href: "/download", icon: Download, label: "Download" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 border-t"
      style={{
        background: "rgba(255,253,250,0.95)",
        borderColor: "var(--border)",
        backdropFilter: "blur(20px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {links.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-opacity"
            style={{ color: active ? "var(--accent)" : "var(--foreground-muted)" }}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[10px] font-semibold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
