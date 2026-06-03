import { PageShell } from "@/components/PageShell";
import { LikedTracks } from "@/components/LikedTracks";

export default function LikesPage() {
  return (
    <>
      <PageShell eyebrow="Saved for later" title="Likes">
        Your saved collection starts here, shaped by the releases you mark for repeat listening.
      </PageShell>
      <div className="max-w-7xl mx-auto px-4">
        <LikedTracks />
      </div>
    </>
  );
}
