#!/usr/bin/env node
// Fetches MP3 URLs from all station pages and outputs a JSON mapping.
// Usage: node scripts/fetch-audio-urls.mjs

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "../lib/data.ts");
const src = readFileSync(dataPath, "utf8");

// Extract all track entries: id + stationUrl
const trackRegex = /id:\s*"([^"]+)"[\s\S]*?stationUrl:\s*"([^"]+)"/g;
const tracks = [];
let m;
while ((m = trackRegex.exec(src)) !== null) {
  tracks.push({ id: m[1], stationUrl: m[2] });
}

console.log(`Found ${tracks.length} tracks with stationUrl.`);

const MP3_RE = /https:\/\/shemenmusic\.com\/three\/wp-content\/uploads\/[^"'\s]+\.mp3/g;

async function fetchMp3(track) {
  try {
    const res = await fetch(track.stationUrl, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return { id: track.id, url: null, error: `HTTP ${res.status}` };
    const html = await res.text();
    const matches = html.match(MP3_RE);
    // First match is the primary track MP3
    return { id: track.id, url: matches ? matches[0] : null };
  } catch (e) {
    return { id: track.id, url: null, error: String(e) };
  }
}

// Fetch in batches of 20 concurrent requests
const BATCH = 20;
const results = {};
let done = 0;

for (let i = 0; i < tracks.length; i += BATCH) {
  const batch = tracks.slice(i, i + BATCH);
  const batchResults = await Promise.all(batch.map(fetchMp3));
  for (const r of batchResults) {
    results[r.id] = r.url ?? null;
    if (r.error) console.error(`  FAIL ${r.id}: ${r.error}`);
  }
  done += batch.length;
  process.stdout.write(`\rProgress: ${done}/${tracks.length}`);
}
console.log("\nDone.");

const outPath = join(__dirname, "../scripts/audio-urls.json");
writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`Wrote ${outPath}`);
const found = Object.values(results).filter(Boolean).length;
console.log(`Found MP3 URLs: ${found}/${tracks.length}`);
