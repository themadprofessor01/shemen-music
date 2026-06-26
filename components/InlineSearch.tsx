"use client";

import { Search, X } from "lucide-react";
import { useSearch } from "@/components/SearchContext";

export function InlineSearch() {
  const { query, setQuery } = useSearch();

  return (
    <div className="relative">
      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--foreground-muted)" }} />
      <input
        type="text"
        placeholder="Search tracks…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full text-sm py-1.5 pl-8 pr-8 outline-none w-48"
        style={{
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
        }}
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2"
          style={{ color: "var(--foreground-muted)", lineHeight: 0 }}
          aria-label="Clear search"
        >
          <X size={11} />
        </button>
      )}
    </div>
  );
}
