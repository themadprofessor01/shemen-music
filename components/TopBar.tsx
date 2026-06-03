"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="top-bar fixed top-0 right-0 z-30 h-16 flex items-center gap-4 px-4 sm:px-6">
        <button
          className="flex-1 max-w-md relative rounded-full text-left text-sm py-2 pl-9 pr-4 outline-none"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
          onClick={() => setSearchOpen(true)}
        >
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--foreground-muted)" }} />
          <span>Search...</span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border px-2 py-0.5 text-[10px] font-bold" style={{ borderColor: "var(--border)" }}>/</span>
        </button>

        <div className="hidden items-center gap-3 ml-auto flex-shrink-0 sm:flex">
          <Link
            href="/login"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: "var(--foreground-muted)" }}
          >
            Sign In
          </Link>
          <Link
            href="/login?action=register"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--blue), var(--blue-deep))", color: "#ffffff" }}
          >
            <User size={13} />
            Sign Up
          </Link>
        </div>
      </header>
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
