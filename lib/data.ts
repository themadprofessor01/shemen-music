export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  plays: number;
  size: string;
  category: "instrumental" | "worship";
  imageUrl: string;
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
  imageUrl?: string;
};

export const tracks: Track[] = [
  {
    id: "1",
    title: "Rose Of Sharon",
    artist: "The Living Waters Singers",
    duration: "6:42",
    plays: 1240,
    size: "9.2 MB",
    category: "worship",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2025/11/Rose-Of-Sharon_Inst_NoBVs-mp3-image.webp?fit=768%2C768&ssl=1",
    mood: "anointing",
    featured: true,
    trending: true,
    coverColor: "#7c3aed",
  },
  {
    id: "2",
    title: "No Ordinary Water",
    artist: "The Living Waters Singers",
    duration: "5:18",
    plays: 980,
    size: "7.6 MB",
    category: "instrumental",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2025/11/No-Ordinary-Water_Inst_NoBVs-mp3-image.webp?fit=768%2C768&ssl=1",
    mood: "flow",
    featured: true,
    coverColor: "#0369a1",
  },
  {
    id: "3",
    title: "Living Waters",
    artist: "The Living Waters Singers",
    duration: "7:05",
    plays: 1560,
    size: "10.1 MB",
    category: "worship",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2025/11/living-waters.webp?fit=768%2C768&ssl=1",
    mood: "honour",
    featured: true,
    trending: true,
    coverColor: "#b45309",
  },
  {
    id: "4",
    title: "Blocked My View Instrumental",
    artist: "First Love Music & Keziah",
    duration: "8:30",
    plays: 2100,
    size: "12.3 MB",
    category: "instrumental",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/arise-mp3-image-scaled.jpg?fit=300%2C300&ssl=1",
    mood: "anointing",
    trending: true,
    coverColor: "#065f46",
  },
  {
    id: "5",
    title: "He's Waiting",
    artist: "MINISTRY MUSIC INSTRUMENTALS",
    duration: "9:15",
    plays: 870,
    size: "13.4 MB",
    category: "instrumental",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/Were-Not-Close-Anymore.jpg?fit=300%2C300&ssl=1",
    mood: "honour",
    trending: true,
    coverColor: "#9d174d",
  },
  {
    id: "6",
    title: "Use It Or Lose It 213",
    artist: "Georlynn",
    duration: "4:55",
    plays: 1340,
    size: "7.1 MB",
    category: "worship",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/Forsake-The-World.jpg?fit=300%2C300&ssl=1",
    mood: "dancing",
    trending: true,
    coverColor: "#d97706",
  },
  {
    id: "7",
    title: "Jesus, Lord To Me",
    artist: "Alvin Slaughter",
    duration: "6:20",
    plays: 990,
    size: "9.0 MB",
    category: "worship",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/Artboard-6-3.png?fit=300%2C300&ssl=1",
    mood: "beloved",
    coverColor: "#6d28d9",
  },
  {
    id: "8",
    title: "I Like The Way You Like Me 148",
    artist: "Georlynn",
    duration: "5:48",
    plays: 1780,
    size: "8.4 MB",
    category: "worship",
    imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/I-Wish.jpg?fit=300%2C300&ssl=1",
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
  { id: "anointing", label: "Anointing", emoji: "🕊️", color: "#d6bd38", imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/Artboard-17-6.png?resize=1080%2C1080&ssl=1" },
  { id: "beloved", label: "Belovedosing", emoji: "💛", color: "#d8dde2" },
  { id: "dancing", label: "Dancing", emoji: "🕺", color: "#5d91dd", imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/Artboard-19-6.png?resize=1080%2C1080&ssl=1" },
  { id: "flow", label: "FLOW", emoji: "🌊", color: "#d8dde2" },
  { id: "honour", label: "Honour", emoji: "👑", color: "#8aa2bd", imageUrl: "https://i0.wp.com/shemenmusic.com/three/wp-content/uploads/2024/08/Artboard-21-4.png?resize=1080%2C1080&ssl=1" },
];

export function formatPlays(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function totalDuration(trackList: Track[]): string {
  const minutes = trackList.reduce((sum, track) => {
    const [m, s] = track.duration.split(":").map(Number);
    return sum + m + s / 60;
  }, 0);

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remaining = Math.round(minutes % 60);
    return `${hours}h ${remaining}m`;
  }

  return `${Math.round(minutes)}m`;
}
