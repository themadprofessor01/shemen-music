"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 flex items-center gap-4 px-6"
      style={{
        left: "192px",
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--foreground-muted)" }} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full text-sm py-2 pl-9 pr-4 outline-none"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3 ml-auto flex-shrink-0">
        <Link
          href="/signin"
          className="text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ color: "var(--foreground-muted)" }}
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)", color: "#ffffff" }}
        >
          <User size={13} />
          Sign Up
        </Link>
      </div>
    </header>
  );
}
