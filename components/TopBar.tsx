"use client";

import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function TopBar() {
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
    <header
      className="fixed top-0 left-0 right-0 md:left-48 z-30 h-16 flex items-center justify-between px-4 md:px-6"
      style={{
        background: "color-mix(in srgb, var(--background) 86%, transparent)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(18px)",
      }}
    >
      {/* Mobile: spacer left */}
      <div className="md:hidden w-16 flex-shrink-0" />

      {/* Mobile logo — centered absolutely */}
      <Link href="/" className="md:hidden absolute left-1/2 -translate-x-1/2 flex-shrink-0">
        <Image
          src="/logo.png"
          alt="ShemenMusic"
          width={120}
          height={17}
          className="h-6 w-auto"
          style={{ filter: "var(--logo-filter, none)" }}
          priority
        />
      </Link>

      {/* Desktop: empty flex spacer */}
      <div className="hidden md:block flex-1" />

      {/* Dark mode toggle */}
      <button
        onClick={toggleDark}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
        style={{
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          color: "var(--foreground-muted)",
        }}
        aria-label="Toggle dark mode"
      >
        {dark ? <Sun size={13} /> : <Moon size={13} />}
        {dark ? "Light" : "Dark"}
      </button>
    </header>
  );
}
