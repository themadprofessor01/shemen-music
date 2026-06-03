"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
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

      {/* Auth */}
      <div className="flex items-center gap-2 ml-auto flex-shrink-0">
        <Link
          href="/signin"
          className="hidden sm:block text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ color: "var(--foreground-muted)" }}
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)", color: "#ffffff" }}
        >
          <User size={13} />
          <span className="hidden sm:inline">Sign Up</span>
        </Link>
      </div>
    </header>
  );
}
