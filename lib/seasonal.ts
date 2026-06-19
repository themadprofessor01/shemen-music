import type { Track } from "@/lib/data";

export type SeasonalTheme = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  emoji: string;
  moods: string[];
  keywords: string[];
};

const THEMES: SeasonalTheme[] = [
  {
    id: "christmas",
    title: "Christmas Worship",
    subtitle: "Celebrate the birth of Jesus",
    color: "#c0392b",
    emoji: "🎄",
    moods: ["celebration", "joy", "honour"],
    keywords: ["christmas", "jesus", "born", "manger", "advent", "glory", "noel"],
  },
  {
    id: "easter",
    title: "Easter & Resurrection",
    subtitle: "He is risen — worship the risen King",
    color: "#8e44ad",
    emoji: "✝️",
    moods: ["salvation", "praise", "worship"],
    keywords: ["easter", "resurrection", "risen", "cross", "calvary", "blood", "alive"],
  },
  {
    id: "valentines",
    title: "Love Songs",
    subtitle: "Songs of love and devotion",
    color: "#e91e63",
    emoji: "❤️",
    moods: ["love", "devotion"],
    keywords: ["love", "heart", "together", "marriage", "bride", "faithful", "forever"],
  },
  {
    id: "new-year",
    title: "New Year Worship",
    subtitle: "Start the year in His presence",
    color: "#2980b9",
    emoji: "🎆",
    moods: ["prayer", "dedication", "calling"],
    keywords: ["new year", "beginning", "fresh start", "surrender", "commit", "faithful"],
  },
  {
    id: "prayer",
    title: "Prayer & Fasting Season",
    subtitle: "Seek His face — intercede for the nations",
    color: "#16a085",
    emoji: "🙏",
    moods: ["prayer", "intercession", "seeking"],
    keywords: ["prayer", "intercession", "seek", "fast", "holy", "revival"],
  },
  {
    id: "harvest",
    title: "Harvest & Thanksgiving",
    subtitle: "Give thanks to the Lord",
    color: "#e67e22",
    emoji: "🌾",
    moods: ["thanksgiving", "joy", "celebration"],
    keywords: ["thank", "grateful", "bless", "harvest", "praise", "grateful"],
  },
  {
    id: "general",
    title: "Worship Collection",
    subtitle: "Top picks for your worship set",
    color: "#4da3e8",
    emoji: "🎵",
    moods: ["worship", "praise", "honour"],
    keywords: ["worship", "praise", "jesus", "lord", "holy"],
  },
];

export function getSeasonalTheme(date: Date = new Date()): SeasonalTheme {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if (month === 12) return THEMES.find((t) => t.id === "christmas")!;
  if (month === 1 && day <= 7) return THEMES.find((t) => t.id === "new-year")!;
  if (month === 2 && day <= 14) return THEMES.find((t) => t.id === "valentines")!;
  // Easter: roughly March-April (simplified)
  if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) return THEMES.find((t) => t.id === "easter")!;
  if (month === 11) return THEMES.find((t) => t.id === "harvest")!;
  // January fasting season in many churches
  if (month === 1) return THEMES.find((t) => t.id === "prayer")!;

  return THEMES.find((t) => t.id === "general")!;
}

export function getSeasonalTracks(theme: SeasonalTheme, allTracks: Track[], limit = 20): Track[] {
  const scored = allTracks.map((track) => {
    let score = 0;
    const titleLower = track.title.toLowerCase();
    const moodLower = (track.mood || "").toLowerCase();

    if (theme.moods.includes(moodLower)) score += 3;
    if (track.trending) score += 1;
    for (const kw of theme.keywords) {
      if (titleLower.includes(kw)) { score += 2; break; }
    }
    return { track, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.track);
}
