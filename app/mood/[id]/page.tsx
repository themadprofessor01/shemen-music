import { notFound } from "next/navigation";
import Link from "next/link";
import { TrackCardLarge } from "@/components/TrackCard";
import { moods, tracks } from "@/lib/data";

export default async function MoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mood = moods.find((item) => item.id === id);
  if (!mood) notFound();

  const moodTracks = tracks.filter((track) => track.mood === id);

  return (
    <div className="ref-page">
      <h1 className="ref-title">{mood.label}</h1>
      <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-base">
        {moods.concat([
          { id: "hope", label: "Hope", emoji: "H", color: "#dfe2e5" },
          { id: "love", label: "Love", emoji: "L", color: "#dfe2e5" },
          { id: "praise", label: "Praise", emoji: "P", color: "#dfe2e5" },
          { id: "prayer", label: "Prayer", emoji: "P", color: "#dfe2e5" },
          { id: "relationships", label: "Relationships", emoji: "R", color: "#dfe2e5" },
          { id: "spirituality", label: "Spirituality", emoji: "S", color: "#dfe2e5" },
        ]).map((item) => (
          <Link key={item.id} href={`/mood/${item.id}`} className={item.id === id ? "font-bold text-[var(--accent)]" : ""}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="ref-card-grid mt-10">
        {(moodTracks.length ? moodTracks : tracks.slice(0, 10)).map((track) => (
          <TrackCardLarge key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
