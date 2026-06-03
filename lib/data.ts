export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  plays: number;
  size: string;
  mood?: string;
  featured?: boolean;
  trending?: boolean;
  coverColor: string;
};

export type Playlist = {
  id: string;
  title: string;
  trackCount: number;
  coverColor: string;
};

export type Mood = {
  id: string;
  label: string;
  emoji: string;
  color: string;
};

export const tracks: Track[] = [
  {
    id: "1",
    title: "Holy Spirit Come",
    artist: "Shemen Music",
    duration: "6:42",
    plays: 1240,
    size: "9.2 MB",
    mood: "anointing",
    featured: true,
    trending: true,
    coverColor: "#7c3aed",
  },
  {
    id: "2",
    title: "River of Life",
    artist: "Shemen Music",
    duration: "5:18",
    plays: 980,
    size: "7.6 MB",
    mood: "flow",
    featured: true,
    coverColor: "#0369a1",
  },
  {
    id: "3",
    title: "Ancient of Days",
    artist: "Shemen Music",
    duration: "7:05",
    plays: 1560,
    size: "10.1 MB",
    mood: "honour",
    featured: true,
    trending: true,
    coverColor: "#b45309",
  },
  {
    id: "4",
    title: "Overflow (Instrumental)",
    artist: "Shemen Music",
    duration: "8:30",
    plays: 2100,
    size: "12.3 MB",
    mood: "anointing",
    trending: true,
    coverColor: "#065f46",
  },
  {
    id: "5",
    title: "Throne Room",
    artist: "Shemen Music",
    duration: "9:15",
    plays: 870,
    size: "13.4 MB",
    mood: "honour",
    trending: true,
    coverColor: "#9d174d",
  },
  {
    id: "6",
    title: "Dancing Before the Lord",
    artist: "Shemen Music",
    duration: "4:55",
    plays: 1340,
    size: "7.1 MB",
    mood: "dancing",
    trending: true,
    coverColor: "#d97706",
  },
  {
    id: "7",
    title: "Draw Me Closer",
    artist: "Shemen Music",
    duration: "6:20",
    plays: 990,
    size: "9.0 MB",
    mood: "beloved",
    coverColor: "#6d28d9",
  },
  {
    id: "8",
    title: "Fire of God",
    artist: "Shemen Music",
    duration: "5:48",
    plays: 1780,
    size: "8.4 MB",
    mood: "anointing",
    trending: true,
    coverColor: "#dc2626",
  },
];

export const playlists: Playlist[] = [
  {
    id: "p1",
    title: "Songs of the Anointing",
    trackCount: 12,
    coverColor: "#7c3aed",
  },
  {
    id: "p2",
    title: "Sunday Morning Worship",
    trackCount: 8,
    coverColor: "#0369a1",
  },
  {
    id: "p3",
    title: "Soaking Instrumentals",
    trackCount: 15,
    coverColor: "#065f46",
  },
  {
    id: "p4",
    title: "Praise & Dance",
    trackCount: 10,
    coverColor: "#d97706",
  },
];

export const moods: Mood[] = [
  { id: "anointing", label: "Anointing", emoji: "🕊️", color: "#7c3aed" },
  { id: "beloved", label: "Beloved", emoji: "💛", color: "#d97706" },
  { id: "dancing", label: "Dancing", emoji: "🕺", color: "#dc2626" },
  { id: "flow", label: "Flow", emoji: "🌊", color: "#0369a1" },
  { id: "honour", label: "Honour", emoji: "👑", color: "#b45309" },
];

export function formatPlays(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
