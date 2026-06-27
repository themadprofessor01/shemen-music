export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import https from "node:https";

const BLUEHOST_IP = "162.241.252.194";
const agent = new https.Agent({ rejectUnauthorized: false, keepAlive: true });

function fetchFromBluehost(path: string): Promise<{ status: number; contentType: string; data: Buffer }> {
  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: BLUEHOST_IP,
      port: 443,
      path,
      method: "GET",
      agent,
      headers: { Host: "shemenmusic.com", "User-Agent": "ShemenMusic/1.0" },
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => {
        resolve({
          status: res.statusCode ?? 200,
          contentType: (res.headers["content-type"] as string) ?? "audio/mpeg",
          data: Buffer.concat(chunks),
        });
      });
      res.on("error", reject);
    });

    req.on("error", reject);
    req.end();
  });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const filename = req.nextUrl.searchParams.get("filename") ?? "track.mp3";

  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  // Handle /api/stream?path=... proxy URLs (internal)
  let blueHostPath: string | null = null;

  if (url.startsWith("/api/stream?path=")) {
    const inner = new URL(url, "http://localhost");
    blueHostPath = inner.searchParams.get("path");
  } else {
    // Validate external URL is from allowed domain
    let parsed: URL;
    try { parsed = new URL(url); } catch {
      return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }
    const allowed = ["shemenmusic.com", "media.shemenmusic.com", "i0.wp.com"];
    if (!allowed.some(d => parsed.hostname === d || parsed.hostname.endsWith("." + d))) {
      return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
    }
    // Extract path for shemenmusic.com URLs
    if (parsed.hostname.endsWith("shemenmusic.com")) {
      blueHostPath = parsed.pathname;
    }
  }

  if (!blueHostPath) {
    return NextResponse.json({ error: "Could not resolve media path" }, { status: 400 });
  }

  try {
    const { status, contentType, data } = await fetchFromBluehost(blueHostPath);
    if (status !== 200) {
      return NextResponse.json({ error: "File not found on media server" }, { status: 404 });
    }

    return new NextResponse(data.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not reach media server" }, { status: 502 });
  }
}
