"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const MOODS = [
  { id: "all", label: "All" },
  { id: "anointing", label: "Anointing" },
  { id: "beloved", label: "Beloved" },
  { id: "dancing", label: "Dancing" },
  { id: "flow", label: "Flow" },
  { id: "honour", label: "Honour" },
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
    <div className="flex flex-wrap gap-2">
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
