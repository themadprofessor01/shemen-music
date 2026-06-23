import type { Metadata } from "next";
import { tracks, getStationSlug, stationDetailFor } from "@/lib/data";
import StationClient from "./StationClient";

const BASE = "https://shemenmusic.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const track = tracks.find((t) => getStationSlug(t) === slug);
  if (!track) return {};

  const detail = stationDetailFor(track);
  const image = track.coverImage || track.imageUrl;

  return {
    title: `${track.title} — ShemenMusic`,
    description: detail.description,
    openGraph: {
      title: `${track.title} by ${track.artist}`,
      description: detail.description,
      url: `${BASE}/station/${slug}`,
      siteName: "ShemenMusic",
      type: "music.song",
      ...(image ? { images: [{ url: image, width: 600, height: 600, alt: track.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${track.title} by ${track.artist} — ShemenMusic`,
      description: detail.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: getStationSlug(t) }));
}

export default async function StationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <StationClient slug={slug} />;
}
