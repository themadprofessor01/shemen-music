import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const filename = req.nextUrl.searchParams.get("filename") ?? "track.mp3";

  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  // Only allow downloads from trusted domains
  const allowed = ["shemenmusic.com", "i0.wp.com"];
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }
  if (!allowed.some(d => parsed.hostname === d || parsed.hostname.endsWith("." + d))) {
    return NextResponse.json({ error: "Domain not allowed" }, { status: 403 });
  }

  const res = await fetch(url, { headers: { "User-Agent": "ShemenMusic/1.0" } });
  if (!res.ok) return NextResponse.json({ error: "Fetch failed" }, { status: 502 });

  const contentType = res.headers.get("content-type") ?? "audio/mpeg";
  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
