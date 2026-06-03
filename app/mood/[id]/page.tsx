import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { TrackCardLarge } from "@/components/TrackCard";
import { moods, tracks } from "@/lib/data";

export default async function MoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mood = moods.find((item) => item.id === id);
  if (!mood) notFound();

  const moodTracks = tracks.filter((track) => track.mood === id);
  const moodLinks = moods.concat([
    { id: "hope", label: "Hope", emoji: "H", color: "#dfe2e5" },
    { id: "love", label: "Love", emoji: "L", color: "#dfe2e5" },
    { id: "praise", label: "Praise", emoji: "P", color: "#dfe2e5" },
    { id: "prayer", label: "Prayer", emoji: "P", color: "#dfe2e5" },
    { id: "relationships", label: "Relationships", emoji: "R", color: "#dfe2e5" },
    { id: "spirituality", label: "Spirituality", emoji: "S", color: "#dfe2e5" },
  ]);

  return (
    <>
      <PageShell eyebrow={`${moodTracks.length || 10} tracks`} title={mood.label} />
      <div className="px-4 pb-14 sm:px-8 lg:px-14">
        <div className="flex flex-wrap gap-3">
          {moodLinks.map((item) => (
            <Link
              key={item.id}
              href={`/mood/${item.id}`}
              className="rounded-full border px-4 py-2 text-sm font-bold transition-opacity hover:opacity-80"
              style={{
                borderColor: item.id === id ? "rgba(182,138,58,0.45)" : "var(--border)",
                background: item.id === id ? "var(--premium-soft)" : "var(--surface2)",
                color: item.id === id ? "var(--premium)" : "var(--foreground-muted)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
          {(moodTracks.length ? moodTracks : tracks.slice(0, 10)).map((track) => (
            <TrackCardLarge key={track.id} track={track} />
          ))}
        </div>
      </div>
    </>
  );
}
