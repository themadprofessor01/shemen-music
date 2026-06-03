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
  coverColor2?: string;
  coverImage?: string;
  downloadUrl?: string;
  stationUrl?: string;
};

export type Playlist = {
  id: string;
  title: string;
  curator: string;
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

export type Artist = {
  slug: string;
  name: string;
  bio?: string;
};

const BASE = "https://shemenmusic.com/three";
const UPL = `${BASE}/wp-content/uploads`;

export const tracks: Track[] = [
  { id: "f1", title: "Rose Of Sharon", artist: "The Living Waters Singers", duration: "5:24", plays: 3200, size: "7.8 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/Rose-Of-Sharon_Inst_NoBVs-mp3-image.webp`, mood: "beloved", featured: true, coverColor: "#c2185b", coverColor2: "#ad1457", coverImage: `${UPL}/2025/11/Rose-Of-Sharon_Inst_NoBVs-mp3-image.webp`, stationUrl: `${BASE}/station/rose-of-sharon/`, downloadUrl: `${BASE}/station/rose-of-sharon/stream` },
  { id: "f2", title: "No Ordinary Water", artist: "The Living Waters Singers", duration: "6:10", plays: 2800, size: "8.9 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/No-Ordinary-Water_Inst_NoBVs-mp3-image.webp`, mood: "flow", featured: true, coverColor: "#0277bd", coverColor2: "#01579b", coverImage: `${UPL}/2025/11/No-Ordinary-Water_Inst_NoBVs-mp3-image.webp`, stationUrl: `${BASE}/station/no-ordinary-water/`, downloadUrl: `${BASE}/station/no-ordinary-water/stream` },
  { id: "f3", title: "Living Waters", artist: "The Living Waters Singers", duration: "7:02", plays: 4100, size: "10.2 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/living-waters.webp`, mood: "flow", featured: true, coverColor: "#e65100", coverColor2: "#bf360c", coverImage: `${UPL}/2025/11/living-waters.webp`, stationUrl: `${BASE}/station/living-waters/`, downloadUrl: `${BASE}/station/living-waters/stream` },
  { id: "f4", title: "Jesus You're So Cool", artist: "The Living Waters Singers", duration: "4:48", plays: 5300, size: "6.9 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/jesus-youre-so-cool.webp`, mood: "honour", featured: true, coverColor: "#00838f", coverColor2: "#006064", coverImage: `${UPL}/2025/11/jesus-youre-so-cool.webp`, stationUrl: `${BASE}/station/jesus-youre-so-cool/`, downloadUrl: `${BASE}/station/jesus-youre-so-cool/stream` },
  { id: "f5", title: "Jesus Is The Door", artist: "The Living Waters Singers", duration: "6:35", plays: 3900, size: "9.5 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/jesus-is-the-door.webp`, mood: "honour", featured: true, coverColor: "#f57f17", coverColor2: "#e65100", coverImage: `${UPL}/2025/11/jesus-is-the-door.webp`, stationUrl: `${BASE}/station/jesus-is-the-door/`, downloadUrl: `${BASE}/station/jesus-is-the-door/stream` },
  { id: "f6", title: "I've Found It", artist: "The Living Waters Singers", duration: "5:15", plays: 2600, size: "7.5 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/ive-found-it.webp`, mood: "anointing", featured: true, coverColor: "#2e7d32", coverColor2: "#1b5e20", coverImage: `${UPL}/2025/11/ive-found-it.webp`, stationUrl: `${BASE}/station/ive-found-it/`, downloadUrl: `${BASE}/station/ive-found-it/stream` },
  { id: "f7", title: "Go Church", artist: "The Living Waters Singers", duration: "4:30", plays: 3100, size: "6.5 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/go-church.webp`, mood: "dancing", featured: true, coverColor: "#6a1b9a", coverColor2: "#4a148c", coverImage: `${UPL}/2025/11/go-church.webp`, stationUrl: `${BASE}/station/go-church/`, downloadUrl: `${BASE}/station/go-church/stream` },
  { id: "f8", title: "Give Your Life To The Lord", artist: "The Living Waters Singers", duration: "7:20", plays: 2900, size: "10.6 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/Give-Your-Life-To-The-Lord_Inst_NoBVs-mp3-image.webp`, mood: "anointing", featured: true, coverColor: "#b71c1c", coverColor2: "#7f0000", coverImage: `${UPL}/2025/11/Give-Your-Life-To-The-Lord_Inst_NoBVs-mp3-image.webp`, stationUrl: `${BASE}/station/give-your-life-to-the-lord/`, downloadUrl: `${BASE}/station/give-your-life-to-the-lord/stream` },
  { id: "f9", title: "First Love Love First", artist: "The Living Waters Singers", duration: "5:55", plays: 2400, size: "8.5 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/first-love-love-first.webp`, mood: "beloved", featured: true, coverColor: "#283593", coverColor2: "#1a237e", coverImage: `${UPL}/2025/11/first-love-love-first.webp`, stationUrl: `${BASE}/station/first-love-love-first/`, downloadUrl: `${BASE}/station/first-love-love-first/stream` },
  { id: "f10", title: "1234 Jesus", artist: "The Living Waters Singers", duration: "3:58", plays: 4700, size: "5.7 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/1234-Jesus_Inst_NoBVs-mp3-image.webp`, mood: "dancing", featured: true, coverColor: "#d84315", coverColor2: "#bf360c", coverImage: `${UPL}/2025/11/1234-Jesus_Inst_NoBVs-mp3-image.webp`, stationUrl: `${BASE}/station/1234-jesus-2/`, downloadUrl: `${BASE}/station/1234-jesus-2/stream` },
  { id: "t1", title: "I Am The Way, The Truth, The Life (Official Instrumental)", artist: "First Love Music", duration: "8:14", plays: 12400, size: "11.9 MB", category: "instrumental", imageUrl: `${UPL}/2025/08/i-am-the-way.jpg`, mood: "honour", trending: true, coverColor: "#e64a19", coverColor2: "#ff6d00", coverImage: `${UPL}/2025/08/i-am-the-way.jpg`, stationUrl: `${BASE}/station/i-am-the-way-the-truth-the-life-official-instrumental/`, downloadUrl: `${BASE}/station/i-am-the-way-the-truth-the-life-official-instrumental/stream` },
  { id: "t2", title: "Jesus Prayed 31", artist: "First Love Music & Aida", duration: "5:24", plays: 8900, size: "7.8 MB", category: "worship", imageUrl: `${UPL}/2024/04/Jesus-Prayed-31-mp3-image.jpg`, mood: "anointing", trending: true, coverColor: "#00695c", coverColor2: "#004d40", coverImage: `${UPL}/2024/04/Jesus-Prayed-31-mp3-image.jpg`, stationUrl: `${BASE}/station/jesus-prayed-31/`, downloadUrl: `${BASE}/station/jesus-prayed-31/stream` },
  { id: "t3", title: "Tithes And Offerings 88", artist: "First Love Music & Aida", duration: "5:24", plays: 9200, size: "7.8 MB", category: "worship", imageUrl: `${UPL}/2024/08/Tithes-And-Offerings.jpg`, mood: "honour", trending: true, coverColor: "#8d6e63", coverColor2: "#6d4c41", coverImage: `${UPL}/2024/08/Tithes-And-Offerings.jpg`, stationUrl: `${BASE}/station/tithes-and-offerings-88/`, downloadUrl: `${BASE}/station/tithes-and-offerings-88/stream` },
  { id: "t4", title: "What Is Your Life 16", artist: "First Love Music & Aida", duration: "4:55", plays: 7600, size: "7.1 MB", category: "worship", imageUrl: `${UPL}/2024/08/Artboard-6-3.png`, mood: "anointing", trending: true, coverColor: "#e65100", coverColor2: "#bf360c", coverImage: `${UPL}/2024/08/Artboard-6-3.png`, stationUrl: `${BASE}/station/what-is-your-life-16/`, downloadUrl: `${BASE}/station/what-is-your-life-16/stream` },
  { id: "t5", title: "The More I Love, the Less I Be Loved 220", artist: "Aseda", duration: "6:40", plays: 11000, size: "9.6 MB", category: "worship", imageUrl: `${UPL}/2024/08/The-More-I-Love-the-Less-I-Be-Loved-.jpg`, mood: "beloved", trending: true, coverColor: "#ad1457", coverColor2: "#880e4f", coverImage: `${UPL}/2024/08/The-More-I-Love-the-Less-I-Be-Loved-.jpg`, stationUrl: `${BASE}/station/the-more-i-love-the-less-i-be-loved-220/`, downloadUrl: `${BASE}/station/the-more-i-love-the-less-i-be-loved-220/stream` },
  { id: "t6", title: "Lo I Tell You a Mystery 155", artist: "First Love Music & Keziah", duration: "7:15", plays: 8100, size: "10.5 MB", category: "worship", imageUrl: `${UPL}/2024/08/Lo-I-Tell-You-a-Mystery.jpg`, mood: "anointing", trending: true, coverColor: "#f9a825", coverColor2: "#f57f17", coverImage: `${UPL}/2024/08/Lo-I-Tell-You-a-Mystery.jpg`, stationUrl: `${BASE}/station/lo-i-tell-you-a-mystery-155/`, downloadUrl: `${BASE}/station/lo-i-tell-you-a-mystery-155/stream` },
  { id: "t7", title: "Soon and Very Soon B", artist: "MINISTRY MUSIC INSTRUMENTALS", duration: "4:20", plays: 6700, size: "6.3 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Artboard-9-2.png`, mood: "honour", trending: true, coverColor: "#1a237e", coverColor2: "#0d1b6e", coverImage: `${UPL}/2024/08/Artboard-9-2.png`, stationUrl: `${BASE}/station/soon-and-very-soon-b/`, downloadUrl: `${BASE}/station/soon-and-very-soon-b/stream` },
  { id: "t8", title: "Anoint Me (w/ BGVs)", artist: "Georlynn & First Love Music", duration: "6:11", plays: 9500, size: "8.9 MB", category: "worship", imageUrl: `${UPL}/2024/08/Anoint-Me.jpg`, mood: "anointing", trending: true, coverColor: "#7b1fa2", coverColor2: "#6a1b9a", coverImage: `${UPL}/2024/08/Anoint-Me.jpg`, stationUrl: `${BASE}/station/anoint-me/`, downloadUrl: `${BASE}/station/anoint-me/stream` },
  { id: "t9", title: "Take Me Back", artist: "Andraé Crouch", duration: "5:33", plays: 14200, size: "8.0 MB", category: "worship", imageUrl: `${UPL}/2024/08/Artboard-11-2.png`, mood: "beloved", trending: true, coverColor: "#37474f", coverColor2: "#263238", coverImage: `${UPL}/2024/08/Artboard-11-2.png`, stationUrl: `${BASE}/station/take-me-back/`, downloadUrl: `${BASE}/station/take-me-back/stream` },
  { id: "t10", title: "Let Me Love 183", artist: "Keziah & First Love Music", duration: "5:48", plays: 7300, size: "8.4 MB", category: "worship", imageUrl: `${UPL}/2024/08/Let-Me-Love.jpg`, mood: "beloved", trending: true, coverColor: "#558b2f", coverColor2: "#33691e", coverImage: `${UPL}/2024/08/Let-Me-Love.jpg`, stationUrl: `${BASE}/station/let-me-love-183/`, downloadUrl: `${BASE}/station/let-me-love-183/stream` },
  { id: "t11", title: "Go Somewhere 04", artist: "First Love Music & Aida", duration: "4:10", plays: 6200, size: "6.0 MB", category: "worship", imageUrl: `${UPL}/2024/08/Artboard-17-3.png`, mood: "dancing", trending: true, coverColor: "#00838f", coverColor2: "#006064", coverImage: `${UPL}/2024/08/Artboard-17-3.png`, stationUrl: `${BASE}/station/go-somewhere-04/`, downloadUrl: `${BASE}/station/go-somewhere-04/stream` },
  { id: "t12", title: "Hallowed Be Thy Name", artist: "Clint Brown", duration: "7:45", plays: 15800, size: "11.2 MB", category: "worship", imageUrl: `${UPL}/2024/03/ShemenMUSIC-Clint-Brown-Hallowed-Be-Thy-Name-mp3-image.jpg`, mood: "honour", trending: true, coverColor: "#4527a0", coverColor2: "#311b92", coverImage: `${UPL}/2024/03/ShemenMUSIC-Clint-Brown-Hallowed-Be-Thy-Name-mp3-image.jpg`, stationUrl: `${BASE}/station/hallowed-be-thy-name/`, downloadUrl: `${BASE}/station/hallowed-be-thy-name/stream` },
  { id: "t13", title: "It's Our Time", artist: "MINISTRY MUSIC INSTRUMENTALS", duration: "5:05", plays: 5900, size: "7.3 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Artboard-8-1.png`, mood: "anointing", trending: true, coverColor: "#c62828", coverColor2: "#b71c1c", coverImage: `${UPL}/2024/08/Artboard-8-1.png`, stationUrl: `${BASE}/station/its-our-time/`, downloadUrl: `${BASE}/station/its-our-time/stream` },
  { id: "t14", title: "If Heaven Never Was Promised", artist: "Andraé Crouch", duration: "6:22", plays: 18600, size: "9.2 MB", category: "worship", imageUrl: "", mood: "honour", trending: true, coverColor: "#1565c0", coverColor2: "#0d47a1", stationUrl: `${BASE}/station/if-heaven-never-was-promised/`, downloadUrl: `${BASE}/station/if-heaven-never-was-promised/stream` },
  { id: "t15", title: "I Believe In Jesus", artist: "Tommy Walker", duration: "4:50", plays: 11300, size: "7.0 MB", category: "worship", imageUrl: `${UPL}/2024/08/i-believe-i-believe-mp3-image-scaled.jpg`, mood: "honour", trending: true, coverColor: "#2e7d32", coverColor2: "#1b5e20", coverImage: `${UPL}/2024/08/i-believe-i-believe-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/i-believe-in-jesus/`, downloadUrl: `${UPL}/2024/08/i-believe-i-believe.mp3` },
  { id: "t16", title: "Loyalty And Disloyalty 100", artist: "First Love Music & Aida", duration: "6:55", plays: 7800, size: "10.0 MB", category: "worship", imageUrl: `${UPL}/2024/08/Loyalty-And-Disloyalty.jpg`, mood: "anointing", trending: true, coverColor: "#4e342e", coverColor2: "#3e2723", coverImage: `${UPL}/2024/08/Loyalty-And-Disloyalty.jpg`, stationUrl: `${BASE}/station/loyalty-and-disloyalty-100/`, downloadUrl: `${BASE}/station/loyalty-and-disloyalty-100/stream` },
  { id: "t17", title: "The Mountain Of the Lord's House 77", artist: "First Love Music & Aida", duration: "8:30", plays: 8400, size: "12.3 MB", category: "worship", imageUrl: `${UPL}/2024/08/The-Mountain-Of-the-Lords-House.jpg`, mood: "honour", trending: true, coverColor: "#0277bd", coverColor2: "#01579b", coverImage: `${UPL}/2024/08/The-Mountain-Of-the-Lords-House.jpg`, stationUrl: `${BASE}/station/the-mountain-of-the-lords-house-77/`, downloadUrl: `${BASE}/station/the-mountain-of-the-lords-house-77/stream` },
  { id: "t18", title: "Blocked My View Instrumental (Official Instrumental)", artist: "First Love Music & Keziah", duration: "5:18", plays: 6600, size: "7.6 MB", category: "instrumental", imageUrl: `${UPL}/2024/03/blockedmyview-2.png`, mood: "flow", trending: true, coverColor: "#00600f", coverColor2: "#1b5e20", coverImage: `${UPL}/2024/03/blockedmyview-2.png`, stationUrl: `${BASE}/station/blocked-my-view-instrumental-with-bvs-official-instrumental/`, downloadUrl: `${UPL}/2024/03/Blocked-My-View-Instrumental-with-BVs-Official-Instrumental-1.mp3` },
  { id: "t19", title: "Shepherd The People", artist: "First Love Music", duration: "7:08", plays: 9100, size: "10.3 MB", category: "worship", imageUrl: `${UPL}/2025/01/Shepherd-The-People.jpeg`, mood: "anointing", trending: true, coverColor: "#827717", coverColor2: "#f9a825", coverImage: `${UPL}/2025/01/Shepherd-The-People.jpeg`, stationUrl: `${BASE}/station/shepherd-the-people_nov7inst/`, downloadUrl: `${UPL}/2025/01/Shepherd-The-People.mp3` },
  { id: "t20", title: "Jesus You're So Cool", artist: "The Living Waters Singers", duration: "4:48", plays: 5300, size: "6.9 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/jesus-youre-so-cool.webp`, mood: "honour", trending: true, coverColor: "#00838f", coverColor2: "#006064", coverImage: `${UPL}/2025/11/jesus-youre-so-cool.webp`, stationUrl: `${BASE}/station/jesus-youre-so-cool/`, downloadUrl: `${BASE}/station/jesus-youre-so-cool/stream` },
];

export const playlists: Playlist[] = [
  { id: "p1", title: "Songs about the Anointing", curator: "First Love Music", trackCount: 14, coverColor: "#7b1fa2" },
];

export const moods: Mood[] = [
  { id: "anointing", label: "Anointing", emoji: "🕊️", color: "#7b1fa2" },
  { id: "beloved", label: "Beloved", emoji: "💛", color: "#f57f17" },
  { id: "dancing", label: "Dancing", emoji: "🕺", color: "#c62828" },
  { id: "flow", label: "Flow", emoji: "🌊", color: "#0277bd" },
  { id: "honour", label: "Honour", emoji: "👑", color: "#827717" },
];

export const artists: Artist[] = [
  { slug: "the-living-waters-singers", name: "The Living Waters Singers", bio: "A spirit-filled worship collective known for deeply anointed instrumentals and praise recordings." },
  { slug: "first-love-music", name: "First Love Music", bio: "First Love Music creates modern worship songs rooted in deep intimacy with God." },
  { slug: "ministry-music-instrumentals", name: "MINISTRY MUSIC INSTRUMENTALS", bio: "Ministry-focused instrumental tracks crafted for church services and prayer rooms." },
  { slug: "andrae-crouch", name: "Andraé Crouch", bio: "Gospel music pioneer whose songs have shaped generations of worshippers worldwide." },
  { slug: "aseda", name: "Aseda", bio: "Aseda brings heartfelt gospel praise with rich vocal arrangements." },
  { slug: "georlynn", name: "Georlynn", bio: "Georlynn is a gifted worship vocalist known for her anointed gospel delivery." },
  { slug: "keziah", name: "Keziah", bio: "Keziah crafts intimate worship experiences that draw listeners into God's presence." },
  { slug: "clint-brown", name: "Clint Brown", bio: "Clint Brown is a renowned gospel artist and worship leader with decades of ministry." },
  { slug: "tommy-walker", name: "Tommy Walker", bio: "Tommy Walker is a worship songwriter whose songs are sung in congregations worldwide." },
  { slug: "aida", name: "Aida", bio: "Aida brings powerful vocals and anointed worship to First Love Music collaborations." },
];

export function slugifyArtist(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getStationSlug(track: Track): string | null {
  if (!track.stationUrl) return null;
  const m = track.stationUrl.match(/\/station\/([^/]+)\/?$/);
  return m ? m[1] : null;
}

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
