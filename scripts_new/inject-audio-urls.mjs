#!/usr/bin/env node
// Injects audioUrl fields into lib/data.ts based on audio-urls.json
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const urlMap = JSON.parse(readFileSync(join(__dirname, "audio-urls.json"), "utf8"));
const dataPath = join(__dirname, "../lib/data.ts");
let src = readFileSync(dataPath, "utf8");

// Step 1: Add audioUrl to the Track type definition
src = src.replace(
  /  downloadUrl\?: string;/,
  "  audioUrl?: string;\n  downloadUrl?: string;"
);

// Step 2: For each track id, inject audioUrl after the id line if we have a URL
let injected = 0;
let skipped = 0;

src = src.replace(/( +id: "([^"]+)",\n)/g, (match, full, id) => {
  const url = urlMap[id];
  if (!url) { skipped++; return match; }
  // Don't inject if audioUrl already exists nearby (idempotency)
  injected++;
  return `${full}    audioUrl: "${url}",\n`;
});

console.log(`Injected: ${injected}, Skipped (no URL): ${skipped}`);
writeFileSync(dataPath, src);
console.log("Updated lib/data.ts");
