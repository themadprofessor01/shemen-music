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
  description: string;
  trackIds: string[];
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

export type StationDetail = {
  date: string;
  albumYear: string;
  description: string;
  lyrics?: string;
  tags: string[];
  versions?: { title: string; artist: string; time: string }[];
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
  { id: "f10b", title: "1234 Jesus (Official Instrumental with BVs)", artist: "shemenmusic", duration: "3:58", plays: 252, size: "5.8 MB", category: "instrumental", imageUrl: `${UPL}/2025/11/1234-jesus.webp`, mood: "dancing", coverColor: "#d84315", coverColor2: "#bf360c", coverImage: `${UPL}/2025/11/1234-jesus.webp`, stationUrl: `${BASE}/station/1234-jesus/`, downloadUrl: `${UPL}/2025/11/1234-Jesus_Inst_BVs.mp3` },
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
  { id: "r1", title: "A FaithFul Friend 112", artist: "First Love Music & Aida", duration: "5:31", plays: 112, size: "7.9 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/A-FaithFul-Friend.jpg`, mood: "belovedosing", coverColor: "#08743b", coverImage: `${UPL}/2024/08/A-FaithFul-Friend.jpg`, stationUrl: `${BASE}/station/a-faithful-friend-112/` },
  { id: "r2", title: "A Lovely Diamond 212", artist: "First Love Music & Keziah", duration: "4:52", plays: 212, size: "7.0 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/A-Lovely-Diamond.jpg`, mood: "belovedosing", coverColor: "#8d6e63", coverImage: `${UPL}/2024/08/A-Lovely-Diamond.jpg`, stationUrl: `${BASE}/station/a-lovely-diamond-212/` },
  { id: "r3", title: "A Mega Church 01", artist: "First Love Music & Aida", duration: "5:07", plays: 1, size: "7.2 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Artboard-12-3.png`, mood: "honour", coverColor: "#00acc1", coverImage: `${UPL}/2024/08/Artboard-12-3.png`, stationUrl: `${BASE}/station/a-mega-church-01/` },
  { id: "r4", title: "A Soul Is A Soul 70", artist: "First Love Music & Aida", duration: "4:50", plays: 70, size: "6.9 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/A-Soul-Is-A-Soul.jpg`, mood: "belovedosing", coverColor: "#ad1457", coverImage: `${UPL}/2024/08/A-Soul-Is-A-Soul.jpg`, stationUrl: `${BASE}/station/a-soul-is-a-soul-70/` },
  { id: "r5", title: "Abide In Me", artist: "Sandra Crouch", duration: "5:44", plays: 540, size: "8.1 MB", category: "instrumental", imageUrl: `${UPL}/2022/07/Artboard-1.png`, mood: "anointing", coverColor: "#0d4770", coverImage: `${UPL}/2022/07/Artboard-1.png`, stationUrl: `${BASE}/station/abide-in-me/` },
  { id: "r6", title: "All About You", artist: "MINISTRY MUSIC INSTRUMENTALS", duration: "5:02", plays: 83, size: "7.3 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Artboard-2.png`, mood: "honour", coverColor: "#0d4770", coverImage: `${UPL}/2024/08/Artboard-2.png`, stationUrl: `${BASE}/station/all-about-you/` },
  { id: "r7", title: "All Have Sinned 241", artist: "First Love Music & Aida", duration: "4:47", plays: 241, size: "6.8 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/All-Have-Sinned.jpg`, mood: "belovedosing", coverColor: "#ad1457", coverImage: `${UPL}/2024/08/All-Have-Sinned.jpg`, stationUrl: `${BASE}/station/all-have-sinned-241/` },
  { id: "r8", title: "All I Want Is A Christian Girl", artist: "First Love Music & Aida", duration: "4:58", plays: 116, size: "7.1 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/All-I-Want-Is-A-Christian-Girl.jpg`, mood: "relationships", coverColor: "#08743b", coverImage: `${UPL}/2024/08/All-I-Want-Is-A-Christian-Girl.jpg`, stationUrl: `${BASE}/station/all-i-want-is-a-christian-girl/` },
  { id: "r9", title: "All Things Work Together", artist: "First Love Music & Keziah", duration: "6:01", plays: 161, size: "8.7 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/All-Things-Work-Together.jpg`, mood: "hope", coverColor: "#d6a718", coverImage: `${UPL}/2024/08/All-Things-Work-Together.jpg`, stationUrl: `${BASE}/station/all-things-work-together/` },
  { id: "r10", title: "Altar Call 114", artist: "First Love Music & Aida", duration: "5:36", plays: 114, size: "8.0 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Altar-Call.jpg`, mood: "prayer", coverColor: "#08743b", coverImage: `${UPL}/2024/08/Altar-Call.jpg`, stationUrl: `${BASE}/station/altar-call-114/` },
  { id: "r11", title: "Be Nice 136", artist: "First Love Music & Aida", duration: "4:40", plays: 136, size: "6.7 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Be-Nice.jpg`, mood: "love", coverColor: "#00856f", coverImage: `${UPL}/2024/08/Be-Nice.jpg`, stationUrl: `${BASE}/station/be-nice-136/` },
  { id: "r12", title: "Be Quick To Obey 90", artist: "First Love Music & Aida", duration: "5:21", plays: 90, size: "7.7 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Be-Quick-To-Obey.jpg`, mood: "spirituality", coverColor: "#6d3b08", coverImage: `${UPL}/2024/08/Be-Quick-To-Obey.jpg`, stationUrl: `${BASE}/station/be-quick-to-obey-90/` },
  { id: "r13", title: "Be Strong In The Lord 8", artist: "First Love Music & Aida", duration: "4:18", plays: 8, size: "6.2 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Artboard-20-3.png`, mood: "hope", coverColor: "#2196f3", coverImage: `${UPL}/2024/08/Artboard-20-3.png`, stationUrl: `${BASE}/station/be-strong-in-the-lord-8/` },
  { id: "r14", title: "Be Zealously Affected 07", artist: "First Love Music & Aida", duration: "4:44", plays: 7, size: "6.8 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Artboard-19-3.png`, mood: "spirituality", coverColor: "#00a99d", coverImage: `${UPL}/2024/08/Artboard-19-3.png`, stationUrl: `${BASE}/station/be-zealously-affected-07/` },
  { id: "r15", title: "Bear Much Fruit 193", artist: "First Love Music & Georlynn", duration: "5:15", plays: 193, size: "7.5 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Bear-Much-Fruit.jpg`, mood: "spirituality", coverColor: "#8d6e63", coverImage: `${UPL}/2024/08/Bear-Much-Fruit.jpg`, stationUrl: `${BASE}/station/bear-much-fruit-193/` },
  { id: "r16", title: "Bear Your Cross 137", artist: "First Love Music & Aida", duration: "4:57", plays: 137, size: "7.1 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Bear-Your-Cross.jpg`, mood: "spirituality", coverColor: "#00856f", coverImage: `${UPL}/2024/08/Bear-Your-Cross.jpg`, stationUrl: `${BASE}/station/bear-your-cross-137/` },
  { id: "r17", title: "Blessed Are Thou Oh Lord", artist: "First Love Music & Keziah", duration: "5:43", plays: 304, size: "8.2 MB", category: "instrumental", imageUrl: `${UPL}/2025/05/Blessed-Are-Thou-Oh-Lord-INSTRUMENTAL-FIRST-LOVE-MUSIC-INSTRUMENTALS-mp3-image-scaled.jpg`, mood: "honour", coverColor: "#263238", coverImage: `${UPL}/2025/05/Blessed-Are-Thou-Oh-Lord-INSTRUMENTAL-FIRST-LOVE-MUSIC-INSTRUMENTALS-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/blessed-are-thou-oh-lord/` },
  { id: "r18", title: "Blessed Jesus 195", artist: "First Love Music & Georlynn", duration: "5:18", plays: 195, size: "7.6 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Blessed-Jesus.jpg`, mood: "honour", coverColor: "#8d6e63", coverImage: `${UPL}/2024/08/Blessed-Jesus.jpg`, stationUrl: `${BASE}/station/blessed-jesus-195/` },
  { id: "r19", title: "Blind Bartimaeus 218", artist: "Aseda", duration: "5:02", plays: 218, size: "7.2 MB", category: "instrumental", imageUrl: `${UPL}/2024/08/Blind-Bartimaeus.jpg`, mood: "prayer", coverColor: "#ad1457", coverImage: `${UPL}/2024/08/Blind-Bartimaeus.jpg`, stationUrl: `${BASE}/station/blind-bartimaeus-218/` },
  { id: "p1a", title: "All Around", artist: "Israel Houghton", duration: "4:40", plays: 86, size: "6.7 MB", category: "worship", imageUrl: `${UPL}/2022/07/Israel-Houghton-All-Around-mp3-image.jpg`, mood: "praise", coverColor: "#0d4770", coverImage: `${UPL}/2022/07/Israel-Houghton-All-Around-mp3-image.jpg`, stationUrl: `${BASE}/station/all-around-2/` },
  { id: "p2a", title: "Ancient Of Days", artist: "Sound Of The New Breed", duration: "5:54", plays: 88, size: "8.5 MB", category: "worship", imageUrl: `${UPL}/2022/07/Sound-Of-The-New-Breed-Ancient-Of-Days-mp3-image.jpg`, mood: "honour", coverColor: "#455a64", coverImage: `${UPL}/2022/07/Sound-Of-The-New-Breed-Ancient-Of-Days-mp3-image.jpg`, stationUrl: `${BASE}/station/ancient-of-days/` },
  { id: "p3a", title: "Arise", artist: "William Murphy", duration: "6:02", plays: 72, size: "8.7 MB", category: "worship", imageUrl: `${UPL}/2024/08/arise-mp3-image-scaled.jpg`, mood: "praise", coverColor: "#1565c0", coverImage: `${UPL}/2024/08/arise-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/arise/` },
  { id: "p4a", title: "Awesome In This Place", artist: "Dave Billington", duration: "5:48", plays: 63, size: "8.3 MB", category: "worship", imageUrl: `${UPL}/2024/08/awesome-in-this-place-mp3-image-scaled.jpg`, mood: "prayer", coverColor: "#6a1b9a", coverImage: `${UPL}/2024/08/awesome-in-this-place-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/awesome-in-this-place/` },
  { id: "p5a", title: "Best Praise", artist: "Lara George", duration: "4:30", plays: 47, size: "6.5 MB", category: "worship", imageUrl: `${UPL}/2024/08/best-praise-mp3-image-scaled.jpg`, mood: "praise", coverColor: "#c62828", coverImage: `${UPL}/2024/08/best-praise-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/best-praise/` },
  { id: "p6a", title: "Bless The Lord Oh My Soul", artist: "Andraé Crouch", duration: "6:20", plays: 92, size: "9.1 MB", category: "worship", imageUrl: `${UPL}/2024/08/bless-the-lord-oh-my-soul-mp3-image-scaled.jpg`, mood: "honour", coverColor: "#0277bd", coverImage: `${UPL}/2024/08/bless-the-lord-oh-my-soul-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/bless-the-lord-oh-my-soul/` },
  { id: "p7a", title: "Breathe Upon Me", artist: "Vineyard Music", duration: "5:41", plays: 51, size: "8.2 MB", category: "worship", imageUrl: `${UPL}/2024/08/breathe-upon-me-mp3-image-scaled.jpg`, mood: "prayer", coverColor: "#558b2f", coverImage: `${UPL}/2024/08/breathe-upon-me-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/breathe-upon-me/` },
  { id: "p8a", title: "Come Let Us Worship And Bow Down", artist: "Maranatha Music", duration: "4:58", plays: 56, size: "7.1 MB", category: "worship", imageUrl: `${UPL}/2024/08/come-let-us-worship-and-bow-down-mp3-image.jpg`, mood: "prayer", coverColor: "#283593", coverImage: `${UPL}/2024/08/come-let-us-worship-and-bow-down-mp3-image.jpg`, stationUrl: `${BASE}/station/come-let-us-worship-and-bow-down/` },
  { id: "p9a", title: "Come Now Is The Time", artist: "Brian Doerksen", duration: "5:05", plays: 62, size: "7.3 MB", category: "worship", imageUrl: `${UPL}/2024/08/come-now-is-the-time-mp3-image-scaled.jpg`, mood: "praise", coverColor: "#00695c", coverImage: `${UPL}/2024/08/come-now-is-the-time-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/come-now-is-the-time/` },
  { id: "p10a", title: "God Is Here", artist: "Lara Martin", duration: "5:52", plays: 76, size: "8.4 MB", category: "worship", imageUrl: `${UPL}/2024/03/Lara-Martin-God-Is-Here-Official-Instrumental-mp3-image-scaled.jpg`, mood: "honour", coverColor: "#4527a0", coverImage: `${UPL}/2024/03/Lara-Martin-God-Is-Here-Official-Instrumental-mp3-image-scaled.jpg`, stationUrl: `${BASE}/station/god-is-here/` },
];

export const playlists: Playlist[] = [
  {
    id: "anointing",
    title: "Songs about the Anointing",
    curator: "First Love Music",
    trackCount: 14,
    coverColor: "#7b1fa2",
    description: "A reference-inspired flow of anointing songs, altar-call instrumentals, and prayer-room arrangements.",
    trackIds: ["t2", "t4", "t6", "t8", "t13", "t16", "t19", "f6", "f8", "r5", "r10", "r15", "r16", "r19"],
  },
  {
    id: "living-waters-essentials",
    title: "Living Waters Essentials",
    curator: "The Living Waters Singers",
    trackCount: 10,
    coverColor: "#0277bd",
    description: "The core Living Waters instrumentals from the reference catalogue, gathered for quick rehearsal access.",
    trackIds: ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10"],
  },
  {
    id: "praise-and-worship",
    title: "Praise & Worship Instrumentals",
    curator: "ShemenMusic",
    trackCount: 12,
    coverColor: "#b68a3a",
    description: "Classic praise and worship selections prepared for services, devotion, and ministry teams.",
    trackIds: ["p1a", "p2a", "p3a", "p4a", "p5a", "p6a", "p7a", "p8a", "p9a", "p10a", "t12", "t15"],
  },
];

export const moods: Mood[] = [
  { id: "anointing", label: "Anointing", emoji: "A", color: "#f0d860", imageUrl: `${UPL}/2024/08/Artboard-17-6.png` },
  { id: "belovedosing", label: "Belovedosing", emoji: "B", color: "#dfe2e5" },
  { id: "beloved", label: "Beloved", emoji: "B", color: "#f4bfd1" },
  { id: "dancing", label: "Dancing", emoji: "D", color: "#7eb5f5", imageUrl: `${UPL}/2024/08/Artboard-19-6.png` },
  { id: "flow", label: "FLOW", emoji: "F", color: "#dfe2e5" },
  { id: "honour", label: "Honour", emoji: "H", color: "#9aa5ad", imageUrl: `${UPL}/2024/08/Artboard-21-4.png` },
  { id: "hope", label: "Hope", emoji: "H", color: "#dfe2e5" },
  { id: "love", label: "Love", emoji: "L", color: "#f5d6dc" },
  { id: "praise", label: "Praise", emoji: "P", color: "#f0d860" },
  { id: "prayer", label: "Prayer", emoji: "P", color: "#d9e7ef" },
  { id: "relationships", label: "Relationships", emoji: "R", color: "#ead8c7" },
  { id: "spirituality", label: "Spirituality", emoji: "S", color: "#dce8d8" },
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
  { slug: "alvin-slaughter", name: "Alvin Slaughter", bio: "A gospel worship voice represented in the wider reference artist archive." },
  { slug: "benny-hinn", name: "Benny Hinn", bio: "Ministry music and worship selections associated with the wider reference archive." },
  { slug: "brooklyn-tabernacle-choir", name: "Brooklyn Tabernacle Choir", bio: "Choir-led gospel worship represented in the wider reference artist archive." },
  { slug: "chris-tomlin", name: "Chris Tomlin", bio: "Contemporary worship selections represented in the wider reference artist archive." },
  { slug: "don-moen", name: "Don Moen", bio: "Classic praise and worship selections represented in the wider reference artist archive." },
];

export type ArtistProfile = {
  id: string;
  name: string;
  description: string;
  role: string;
  location: string;
  palette: string;
  imageUrl: string;
  signatureTrackId?: string;
};

export const artistProfiles: ArtistProfile[] = [
  {
    id: "the-living-waters-singers",
    name: "The Living Waters Singers",
    description: "A spirit-filled worship collective whose deeply anointed instrumentals carry the presence of God into any service, prayer room, or devotional space.",
    role: "Worship Collective",
    location: "USA",
    palette: "linear-gradient(135deg, #0c3547 0%, #0277bd 100%)",
    imageUrl: `${UPL}/2025/11/living-waters.webp`,
    signatureTrackId: "f3",
  },
  {
    id: "first-love-music",
    name: "First Love Music",
    description: "First Love Music crafts modern worship songs rooted in deep intimacy with God, blending heartfelt lyrics with anointed arrangements.",
    role: "Worship Ministry",
    location: "Ghana",
    palette: "linear-gradient(135deg, #1a3a4a 0%, #e64a19 100%)",
    imageUrl: `${UPL}/2025/08/i-am-the-way.jpg`,
    signatureTrackId: "t1",
  },
  {
    id: "ministry-music-instrumentals",
    name: "MINISTRY MUSIC INSTRUMENTALS",
    description: "Ministry-focused instrumental tracks crafted for church services and prayer rooms, providing a solid musical foundation for worship leaders.",
    role: "Instrumental Ministry",
    location: "USA",
    palette: "linear-gradient(135deg, #1a237e 0%, #4a148c 100%)",
    imageUrl: `${UPL}/2024/08/Artboard-9-2.png`,
    signatureTrackId: "t7",
  },
  {
    id: "andrae-crouch",
    name: "Andraé Crouch",
    description: "Gospel music pioneer whose timeless songs have shaped generations of worshippers worldwide. His recordings remain essential for any church music library.",
    role: "Gospel Pioneer",
    location: "USA",
    palette: "linear-gradient(135deg, #263238 0%, #37474f 100%)",
    imageUrl: `${UPL}/2024/08/Artboard-11-2.png`,
    signatureTrackId: "t9",
  },
  {
    id: "aseda",
    name: "Aseda",
    description: "Aseda brings heartfelt gospel praise with rich vocal arrangements that stir the soul and invite congregational participation.",
    role: "Gospel Artist",
    location: "Ghana",
    palette: "linear-gradient(135deg, #880e4f 0%, #ad1457 100%)",
    imageUrl: `${UPL}/2024/08/The-More-I-Love-the-Less-I-Be-Loved-.jpg`,
    signatureTrackId: "t5",
  },
  {
    id: "clint-brown",
    name: "Clint Brown",
    description: "Clint Brown is a renowned gospel artist and worship leader with decades of ministry, whose songs are beloved in churches worldwide.",
    role: "Gospel Artist & Worship Leader",
    location: "USA",
    palette: "linear-gradient(135deg, #311b92 0%, #4527a0 100%)",
    imageUrl: `${UPL}/2024/03/ShemenMUSIC-Clint-Brown-Hallowed-Be-Thy-Name-mp3-image.jpg`,
    signatureTrackId: "t12",
  },
  {
    id: "tommy-walker",
    name: "Tommy Walker",
    description: "Tommy Walker is a worship songwriter whose anointed songs are sung in congregations worldwide, known for creating space for authentic encounters with God.",
    role: "Worship Songwriter",
    location: "USA",
    palette: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    imageUrl: `${UPL}/2024/08/i-believe-i-believe-mp3-image-scaled.jpg`,
    signatureTrackId: "t15",
  },
  {
    id: "georlynn",
    name: "Georlynn",
    description: "Georlynn brings clear, prayerful worship vocals to First Love Music collaborations and ministry-focused arrangements.",
    role: "Worship Vocalist",
    location: "Ghana",
    palette: "linear-gradient(135deg, #3e2723 0%, #8d6e63 100%)",
    imageUrl: `${UPL}/2024/08/Bear-Much-Fruit.jpg`,
    signatureTrackId: "r15",
  },
  {
    id: "keziah",
    name: "Keziah",
    description: "Keziah's worship recordings lean intimate and reflective, with instrumentals suited for devotion and altar ministry.",
    role: "Worship Artist",
    location: "Ghana",
    palette: "linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)",
    imageUrl: `${UPL}/2024/08/A-Lovely-Diamond.jpg`,
    signatureTrackId: "r2",
  },
  {
    id: "aida",
    name: "Aida",
    description: "Aida appears across First Love Music worship releases with service-ready tracks shaped for teaching, praise, and prayer.",
    role: "Worship Collaborator",
    location: "Ghana",
    palette: "linear-gradient(135deg, #004d40 0%, #00856f 100%)",
    imageUrl: `${UPL}/2024/08/A-FaithFul-Friend.jpg`,
    signatureTrackId: "r1",
  },
];

export const stationDetails: Record<string, StationDetail> = {
  "rose-of-sharon": {
    date: "November 22, 2025",
    albumYear: "2025",
    description: "Rose Of Sharon from The Living Waters Singers, presented with official instrumental versions and worship-room context.",
    tags: ["Living Waters", "Rose Of Sharon"],
    versions: [
      { title: "Rose Of Sharon (Official Instrumental with BVs)", artist: "The Living Waters Singers", time: "05:51" },
      { title: "Rose Of Sharon (Official Instrumental without BVs)", artist: "First Love Music", time: "05:52" },
    ],
    lyrics: `Rose Of Sharon

Oooh Jesus, Jesus
Oooh Jesus, Jesus
Oooh Jesus, Jesus
Oooh Jesus, Jesus

Anything I saw before I saw you
Was a waste of life
Anyone I knew before I knew you
Was a waste of life
Anywhere I went without you
Was a waste of life
Anyone I saw before I saw you
Was a waste of life

Oooh, oh
I'm so glad, I'm so glad that I have you now
Oooh, oh
No more wasting my life on others

You are my rose of Sharon (Sharon)
You're my lily of the valley (Valley)
You are my lily among the thorns
My love among the daughters (daughters)

You are my rose of Sharon
Rose Of Sharon
My lily of the valley
Of the valley
You are my rose of Sharon
Rose Of Sharon
My lily of the valley
Of the valley`,
  },
};

export function stationDetailFor(track: Track): StationDetail {
  const slug = getStationSlug(track);
  if (slug && stationDetails[slug]) return stationDetails[slug];

  return {
    date: "ShemenMusic Archive",
    albumYear: "2024",
    description: `${track.title} by ${track.artist}, copied into the premium ShemenMusic archive with download and playback access for worship teams.`,
    tags: [track.artist.split("&")[0].trim(), track.category === "worship" ? "Praise & Worship" : "Instrumentals"],
    versions: [{ title: track.title, artist: track.artist, time: track.duration }],
  };
}

export function tracksForPlaylist(playlist: Playlist): Track[] {
  const selected = playlist.trackIds
    .map((id) => tracks.find((track) => track.id === id))
    .filter((track): track is Track => Boolean(track));

  return selected.length ? selected : tracks.slice(0, playlist.trackCount);
}

export function tracksByArtist(artistName: string): Track[] {
  const normalized = artistName.toLowerCase();
  return tracks.filter((t) =>
    t.artist.toLowerCase().includes(normalized) ||
    normalized.includes(t.artist.toLowerCase().split(" ")[0].toLowerCase())
  );
}

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
