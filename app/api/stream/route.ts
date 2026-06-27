export const runtime = "nodejs";

import { NextRequest } from "next/server";
import https from "node:https";

const BLUEHOST_IP = "162.241.252.194";
const agent = new https.Agent({ rejectUnauthorized: false, keepAlive: true });

const VALID_WP_PATH = /^\/three\/wp-content\/uploads\/[\w/.\-%]+\.(mp3|m4a|wav|ogg|aac)$/i;
const VALID_STATION_PATH = /^\/three\/station\/[\w-]+\/stream$/i;

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");

  const isWpPath = !!path && VALID_WP_PATH.test(path);
  const isStationPath = !!path && VALID_STATION_PATH.test(path);

  if (!path || (!isWpPath && !isStationPath)) {
    return new Response("Invalid path", { status: 400 });
  }

  // Station paths live on media.shemenmusic.com (same Bluehost IP, different vhost)
  const hostHeader = isStationPath ? "media.shemenmusic.com" : "shemenmusic.com";

  const rangeHeader = req.headers.get("range");

  return new Promise<Response>((resolve) => {
    const reqHeaders: Record<string, string> = {
      Host: hostHeader,
      "User-Agent": "ShemenMusic/1.0",
    };
    if (rangeHeader) reqHeaders["Range"] = rangeHeader;

    const options: https.RequestOptions = {
      hostname: BLUEHOST_IP,
      port: 443,
      path,
      method: "GET",
      agent,
      headers: reqHeaders,
    };

    const proxyReq = https.request(options, (proxyRes) => {
      const resHeaders: Record<string, string> = {
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      };

      const ct = proxyRes.headers["content-type"];
      if (ct) resHeaders["Content-Type"] = Array.isArray(ct) ? ct[0] : ct;

      const cl = proxyRes.headers["content-length"];
      if (cl) resHeaders["Content-Length"] = Array.isArray(cl) ? cl[0] : cl;

      const cr = proxyRes.headers["content-range"];
      if (cr) resHeaders["Content-Range"] = Array.isArray(cr) ? cr[0] : cr;

      const readable = new ReadableStream({
        start(controller) {
          proxyRes.on("data", (chunk: Buffer) => controller.enqueue(chunk));
          proxyRes.on("end", () => controller.close());
          proxyRes.on("error", (err) => controller.error(err));
        },
      });

      resolve(new Response(readable, { status: proxyRes.statusCode ?? 200, headers: resHeaders }));
    });

    proxyReq.on("error", () => resolve(new Response("Stream error", { status: 502 })));
    proxyReq.end();
  });
}
