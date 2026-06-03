import { PageShell } from "@/components/PageShell";
import { TrackList } from "@/components/TrackList";
import { tracks } from "@/lib/data";

export default function LikesPage() {
  const liked = tracks.filter((track) => track.featured);

  return (
    <>
      <PageShell eyebrow="Saved for later" title="Likes">
        Your saved collection starts here. For now, we are showing featured songs as a warm starting set.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4">
        <TrackList tracks={liked} />
      </div>
    </>
  );
}
