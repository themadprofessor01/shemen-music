#!/usr/bin/env node
// Re-fetches only the tracks that didn't get an audio URL, now matching mp3/m4a/wav/ogg
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const urlMap = JSON.parse(readFileSync(join(__dirname, "audio-urls.json"), "utf8"));

// IDs with null URLs
const missing = Object.keys(urlMap).filter((k) => !urlMap[k]);
console.log(`Re-fetching ${missing.length} tracks…`);

// Build stationUrl map from data.ts
const src = readFileSync(join(__dirname, "../lib/data.ts"), "utf8");
const stationMap = {};
const re = /id:\s*"([^"]+)"[\s\S]*?stationUrl:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(src)) !== null) stationMap[m[1]] = m[2];

const AUDIO_RE = /https:\/\/shemenmusic\.com\/three\/wp-content\/uploads\/[^"'\s]+\.(mp3|m4a|wav|ogg)/gi;

async function fetch1(id) {
  const url = stationMap[id];
  if (!url) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
    const html = await res.text();
    const matches = html.match(AUDIO_RE);
    return matches ? matches[0] : null;
  } catch {
    return null;
  }
}

const BATCH = 20;
let done = 0;
for (let i = 0; i < missing.length; i += BATCH) {
  const batch = missing.slice(i, i + BATCH);
  const results = await Promise.all(batch.map(fetch1));
  batch.forEach((id, j) => {
    if (results[j]) urlMap[id] = results[j];
  });
  done += batch.length;
  process.stdout.write(`\r${done}/${missing.length}`);
}
console.log("\nDone.");

const found = Object.values(urlMap).filter(Boolean).length;
console.log(`Total with URL: ${found}/${Object.keys(urlMap).length}`);
writeFileSync(join(__dirname, "audio-urls.json"), JSON.stringify(urlMap, null, 2));
console.log("Saved audio-urls.json");
