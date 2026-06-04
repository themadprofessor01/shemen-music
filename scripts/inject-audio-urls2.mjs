#!/usr/bin/env node
// Injects any missing audioUrl fields into data.ts (idempotent – skips existing ones)
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const urlMap = JSON.parse(readFileSync(join(__dirname, "audio-urls.json"), "utf8"));
const dataPath = join(__dirname, "../lib/data.ts");
let src = readFileSync(dataPath, "utf8");

let injected = 0;
// Only inject if the id line is NOT already followed by audioUrl
src = src.replace(/( +id: "([^"]+)",\n)(?!    audioUrl:)/g, (match, full, id) => {
  const url = urlMap[id];
  if (!url) return match;
  injected++;
  return `${full}    audioUrl: "${url}",\n`;
});

console.log(`Injected: ${injected}`);
writeFileSync(dataPath, src);
console.log("Updated lib/data.ts");
