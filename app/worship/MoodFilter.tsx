"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const MOODS = [
  { id: "all", label: "All" },
  { id: "worship", label: "Worship" },
  { id: "devotion", label: "Devotion" },
  { id: "intercession", label: "Intercession" },
  { id: "honour", label: "Honour" },
  { id: "celebration", label: "Celebration" },
  { id: "healing", label: "Healing" },
  { id: "hope", label: "Hope" },
  { id: "love", label: "Love" },
  { id: "praise", label: "Praise" },
  { id: "prayer", label: "Prayer" },
  { id: "relationships", label: "Relationships" },
  { id: "spirituality", label: "Spirituality" },
  { id: "thankfulness", label: "Thankfulness" },
  { id: "the-church", label: "The Church" },
];

export function MoodFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("mood") ?? "all";

  function select(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("mood");
    } else {
      params.set("mood", id);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {MOODS.map((m) => {
        const isActive = active === m.id;
        return (
          <button
            key={m.id}
            onClick={() => select(m.id)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: isActive ? "var(--accent)" : "var(--surface2)",
              color: isActive ? "#fff" : "var(--foreground-muted)",
              border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
            }}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
