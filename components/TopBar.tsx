"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "@/components/SearchContext";

export default function TopBar() {
  const { query, setQuery } = useSearch();

  return (
    <header
      className="fixed top-0 left-0 right-0 md:left-48 z-30 h-16 flex items-center gap-3 px-4 md:px-6"
      style={{
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Mobile logo — only shows when sidebar is hidden */}
      <Link href="/" className="md:hidden flex-shrink-0">
        <Image
          src="/logo.png"
          alt="ShemenMusic"
          width={120}
          height={17}
          className="h-6 w-auto"
          priority
        />
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--foreground-muted)" }} />
        <input
          type="text"
          placeholder="Search tracks, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full text-sm py-2 pl-9 pr-4 outline-none"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
      </div>

    </header>
  );
}
