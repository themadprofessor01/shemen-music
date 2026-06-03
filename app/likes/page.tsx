"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useLikes } from "@/components/LikesContext";
import { PageShell } from "@/components/PageShell";
import { TrackList } from "@/components/TrackList";
import { tracks } from "@/lib/data";

export default function LikesPage() {
  const { liked } = useLikes();
  const likedTracks = tracks.filter((t) => liked.has(t.id));

  return (
    <>
      <PageShell eyebrow="Your collection" title="Your Likes">
        Songs you&apos;ve saved for later.
      </PageShell>

      <div className="px-4 sm:px-8 lg:px-14 pb-12">
        {likedTracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <Heart
              size={48}
              className="opacity-25"
              style={{ color: "var(--foreground)" }}
            />
            <div>
              <p className="text-lg font-semibold">No liked songs yet</p>
              <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
                Tap the heart icon on any track to save it here.
              </p>
            </div>
            <Link
              href="/instrumentals"
              className="mt-2 inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "var(--accent)" }}
            >
              Browse Instrumentals
            </Link>
          </div>
        ) : (
          <TrackList tracks={likedTracks} />
        )}
      </div>
    </>
  );
}
