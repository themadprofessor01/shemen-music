#!/usr/bin/env node
// Re-fetches remaining null tracks, matching both absolute and relative audio URLs
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const urlMap = JSON.parse(readFileSync(join(__dirname, "audio-urls.json"), "utf8"));
const missing = Object.keys(urlMap).filter((k) => !urlMap[k]);
console.log(`Re-fetching ${missing.length} tracks with broader regex…`);

const src = readFileSync(join(__dirname, "../lib/data.ts"), "utf8");
const stationMap = {};
const re = /id:\s*"([^"]+)"[\s\S]*?stationUrl:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(src)) !== null) stationMap[m[1]] = m[2];

const BASE = "https://shemenmusic.com";
// Match both absolute and relative paths
const AUDIO_RE = /(?:https:\/\/shemenmusic\.com)?\/three\/wp-content\/uploads\/[^\s"'<>]+\.(mp3|m4a|wav|ogg)/gi;

async function fetch1(id) {
  const url = stationMap[id];
  if (!url) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    const matches = html.match(AUDIO_RE);
    if (!matches) return null;
    const first = matches[0];
    // Make absolute
    return first.startsWith("http") ? first : `${BASE}${first}`;
  } catch {
    return null;
  }
}

const BATCH = 20;
let done = 0;
for (let i = 0; i < missing.length; i += BATCH) {
  const batch = missing.slice(i, i + BATCH);
  const results = await Promise.all(batch.map(fetch1));
  batch.forEach((id, j) => { if (results[j]) urlMap[id] = results[j]; });
  done += batch.length;
  process.stdout.write(`\r${done}/${missing.length}`);
}
console.log("\nDone.");
const found = Object.values(urlMap).filter(Boolean).length;
console.log(`Total with URL: ${found}/${Object.keys(urlMap).length}`);
writeFileSync(join(__dirname, "audio-urls.json"), JSON.stringify(urlMap, null, 2));
