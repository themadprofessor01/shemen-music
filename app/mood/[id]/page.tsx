import { notFound } from "next/navigation";
import Link from "next/link";
import { tracks, moods } from "@/lib/data";
import { TrackList } from "@/components/TrackList";

export function generateStaticParams() {
  return moods.map((m) => ({ id: m.id }));
}

export default async function MoodPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mood = moods.find((m) => m.id === id);
  if (!mood) notFound();

  const moodTracks = tracks.filter((t) => t.mood === id);
  const otherMoods = moods.filter((m) => m.id !== id);

  return (
    <div className="px-4 py-9 sm:px-8 lg:px-14">
      <header className="space-y-3 mb-8">
        <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
          {moodTracks.length} track{moodTracks.length !== 1 ? "s" : ""}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          {mood.emoji} {mood.label}
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main track list */}
        <div className="flex-1 min-w-0">
          <TrackList tracks={moodTracks} />
        </div>

        {/* Sidebar: Other Moods */}
        <aside className="lg:w-[200px] shrink-0">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--foreground-muted)" }}
          >
            Other Moods
          </h2>
          <ul className="space-y-1">
            {otherMoods.map((m) => {
              const count = tracks.filter((t) => t.mood === m.id).length;
              return (
                <li key={m.id}>
                  <Link
                    href={`/mood/${m.id}`}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--surface2)]"
                  >
                    <span className="flex items-center gap-2">
                      <span>{m.emoji}</span>
                      <span className="font-medium">{m.label}</span>
                    </span>
                    <span
                      className="text-xs tabular-nums"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
