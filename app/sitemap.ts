import type { MetadataRoute } from "next";
import { tracks, playlists } from "@/lib/data";

const BASE = "https://shemenmusic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/instrumentals`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/worship`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/playlists`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/download`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/likes`, lastModified: now, changeFrequency: "never", priority: 0.3 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "never", priority: 0.4 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "never", priority: 0.2 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "never", priority: 0.2 },
  ];

  const playlistPages: MetadataRoute.Sitemap = playlists.map((p) => ({
    url: `${BASE}/playlists/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const trackPages: MetadataRoute.Sitemap = tracks.map((t) => ({
    url: `${BASE}/station/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...playlistPages, ...trackPages];
}
