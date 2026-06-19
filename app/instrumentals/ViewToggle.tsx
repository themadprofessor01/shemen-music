"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";

export function ViewToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "grid";

  function select(v: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (v === "grid") params.delete("view");
    else params.set("view", v);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      className="flex gap-0.5 rounded-lg p-0.5"
      style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
    >
      <button
        onClick={() => select("grid")}
        className="flex h-7 w-7 items-center justify-center rounded-md transition-all"
        style={{
          background: view === "grid" ? "var(--surface)" : "transparent",
          color: view === "grid" ? "var(--accent)" : "var(--foreground-muted)",
          boxShadow: view === "grid" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        }}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
      >
        <LayoutGrid size={14} />
      </button>
      <button
        onClick={() => select("list")}
        className="flex h-7 w-7 items-center justify-center rounded-md transition-all"
        style={{
          background: view === "list" ? "var(--surface)" : "transparent",
          color: view === "list" ? "var(--accent)" : "var(--foreground-muted)",
          boxShadow: view === "list" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        }}
        aria-label="List view"
        aria-pressed={view === "list"}
      >
        <List size={14} />
      </button>
    </div>
  );
}
