import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { TrackList } from "@/components/TrackList";
import { moods, tracks } from "@/lib/data";

export default async function MoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mood = moods.find((item) => item.id === id);
  if (!mood) notFound();

  const moodTracks = tracks.filter((track) => track.mood === id);

  return (
    <>
      <PageShell eyebrow={`${moodTracks.length} tracks`} title={`${mood.emoji} ${mood.label}`}>
        A focused stream shaped around the {mood.label.toLowerCase()} atmosphere.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4">
        <TrackList tracks={moodTracks} />
      </div>
    </>
  );
}
