"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 right-0 z-30 flex h-16 items-center gap-4 px-6"
        style={{
          left: "199px",
          background: "#ffffff",
          borderBottom: "1px solid #eef0f2",
        }}
      >
        <button
          className="relative mx-auto h-10 w-full max-w-[640px] rounded-full py-2 pl-5 pr-11 text-left text-base outline-none"
          style={{
            background: "#f4f5f6",
            border: "1px solid #eef0f2",
            color: "var(--muted)",
          }}
          onClick={() => setSearchOpen(true)}
        >
          <span>Search...</span>
          <Search size={16} className="absolute right-5 top-1/2 -translate-y-1/2" style={{ color: "#20242a" }} />
        </button>

        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
          <Link
            href="/login"
            className="text-sm font-medium hover:opacity-80"
            style={{ color: "#20242a" }}
          >
            Sign In
          </Link>
          <Link
            href="/login?action=register"
            className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#0073d1", color: "#ffffff" }}
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
