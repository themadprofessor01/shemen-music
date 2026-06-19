import { tracks, type Track } from "@/lib/data";

export type SeasonalTheme = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
  moods: string[];
  keywords: string[]; // matched against track titles (case-insensitive)
};

/** Seasonal/holiday themes mapped to months + date ranges */
const themes: Array<SeasonalTheme & { months: number[]; dayStart?: number; dayEnd?: number }> = [
  {
    id: "new-year",
    months: [1],
    dayStart: 1, dayEnd: 14,
    title: "New Year, New Hope",
    subtitle: "Fresh Start",
    description: "Begin the year with worship, prayer and renewed expectation.",
    emoji: "🌅",
    color: "#0369a1",
    moods: ["hope", "prayer", "intercession", "devotion"],
    keywords: ["new", "beginning", "fresh", "start", "hope"],
  },
  {
    id: "valentines",
    months: [2],
    title: "Love Season",
    subtitle: "Valentine's Day",
    description: "Songs celebrating love — for God and for each other.",
    emoji: "❤️",
    color: "#be185d",
    moods: ["love", "relationships", "devotion"],
    keywords: ["love", "heart", "beloved", "tender"],
  },
  {
    id: "lent-easter",
    months: [3, 4],
    title: "Lent & Easter",
    subtitle: "Resurrection Season",
    description: "Reflective and triumphant worship for the Easter season.",
    emoji: "✝️",
    color: "#7c3aed",
    moods: ["prayer", "devotion", "healing", "hope", "worship"],
    keywords: ["easter", "cross", "risen", "resurrection", "blood", "lamb"],
  },
  {
    id: "mothers-day",
    months: [5],
    dayStart: 1, dayEnd: 14,
    title: "Honouring Mothers",
    subtitle: "Mother's Day",
    description: "Worship songs honouring the women who shape us.",
    emoji: "🌸",
    color: "#db2777",
    moods: ["love", "honour", "relationships", "thankfulness"],
    keywords: ["mother", "woman", "honour", "love"],
  },
  {
    id: "pentecost",
    months: [5, 6],
    dayStart: 15,
    title: "Pentecost Fire",
    subtitle: "Holy Spirit Season",
    description: "Spirit-filled worship celebrating the fire of Pentecost.",
    emoji: "🔥",
    color: "#d97706",
    moods: ["worship", "celebration", "praise", "honour"],
    keywords: ["spirit", "fire", "anoint", "holy", "power"],
  },
  {
    id: "fathers-day",
    months: [6],
    dayStart: 1, dayEnd: 21,
    title: "Honouring Fathers",
    subtitle: "Father's Day",
    description: "Songs of honour for fathers and the Heavenly Father.",
    emoji: "👑",
    color: "#b45309",
    moods: ["honour", "worship", "relationships"],
    keywords: ["father", "honour", "king", "lord"],
  },
  {
    id: "summer",
    months: [6, 7, 8],
    title: "Summer Worship",
    subtitle: "Mid-Year Revival",
    description: "High-energy praise tracks for summer camps, revivals, and outdoor worship.",
    emoji: "☀️",
    color: "#ca8a04",
    moods: ["celebration", "praise", "hope", "worship"],
    keywords: ["joy", "praise", "celebrate", "glory"],
  },
  {
    id: "back-to-school",
    months: [9],
    title: "Fresh Season",
    subtitle: "September Renewal",
    description: "New seasons call for renewed faith and bold worship.",
    emoji: "🍂",
    color: "#15803d",
    moods: ["hope", "devotion", "prayer", "intercession"],
    keywords: ["new", "season", "faith", "trust"],
  },
  {
    id: "harvest",
    months: [10],
    title: "Harvest Praise",
    subtitle: "October",
    description: "Celebrating the fruits of worship and the goodness of God.",
    emoji: "🌾",
    color: "#b45309",
    moods: ["thankfulness", "praise", "celebration"],
    keywords: ["harvest", "fruit", "good", "blessing"],
  },
  {
    id: "thanksgiving",
    months: [11],
    title: "A Thankful Heart",
    subtitle: "Thanksgiving Season",
    description: "Gratitude worship — songs that declare God's faithfulness all year.",
    emoji: "🙏",
    color: "#ca8a04",
    moods: ["thankfulness", "praise", "worship", "honour"],
    keywords: ["thank", "grateful", "faithful", "goodness"],
  },
  {
    id: "christmas",
    months: [12],
    title: "Christmas Worship",
    subtitle: "Advent & Christmas",
    description: "Celebrating the birth of Jesus with worship, joy and reverence.",
    emoji: "⭐",
    color: "#0369a1",
    moods: ["worship", "love", "hope", "celebration"],
    keywords: ["christmas", "advent", "born", "joy", "glory", "peace"],
  },
];

/** Returns the active seasonal theme for the given date */
export function getSeasonalTheme(date = new Date()): SeasonalTheme {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Find the most specific matching theme (with day range check)
  const match = themes.find((t) => {
    if (!t.months.includes(month)) return false;
    if (t.dayStart !== undefined && day < t.dayStart) return false;
    if (t.dayEnd !== undefined && day > t.dayEnd) return false;
    return true;
  });

  // Fall back to the month-only match
  const fallback = themes.find((t) => t.months.includes(month) && t.dayStart === undefined);

  return match ?? fallback ?? themes[6]; // default to summer
}

/** Returns tracks matching the seasonal theme, sorted by relevance */
export function getSeasonalTracks(theme: SeasonalTheme, limit = 20): Track[] {
  const moodSet = new Set(theme.moods);
  const kw = theme.keywords.map((k) => k.toLowerCase());

  const scored = tracks.map((t) => {
    let score = 0;
    if (t.mood && moodSet.has(t.mood)) score += 3;
    const titleLower = t.title.toLowerCase();
    for (const k of kw) {
      if (titleLower.includes(k)) score += 2;
    }
    if (t.trending) score += 1;
    return { track: t, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.track);
}
