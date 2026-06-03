import { PageShell } from "@/components/PageShell";
import { TrackCardLarge } from "@/components/TrackCard";
import { tracks } from "@/lib/data";

export default function PraiseWorshipPage() {
  const worship = tracks
    .filter((track) => track.category === "worship")
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <PageShell eyebrow={`${worship.length} worship tracks`} title="Praise & Worship Instrumentals" />
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
        {worship.slice(0, 45).map((track) => (
          <TrackCardLarge key={track.id} track={track} />
        ))}
        </div>
        <div className="mt-12 flex justify-center gap-3 text-sm font-bold">
          {["1", "2", "...", "8", ">"].map((page, index) => (
            <span
              key={`${page}-${index}`}
              className="flex h-10 min-w-10 items-center justify-center rounded-full border px-3"
              style={{ borderColor: "var(--border)", background: index === 0 ? "var(--premium-soft)" : "var(--surface2)", color: index === 0 ? "var(--premium)" : "var(--foreground-muted)" }}
            >
              {page}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
