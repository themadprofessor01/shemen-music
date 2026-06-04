import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "shemenmusic.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    minimumCacheTTL: 604800,
    deviceSizes: [375, 640, 750, 828, 1080, 1200],
    imageSizes: [36, 64, 128, 200, 256, 384],
  },
  compress: true,
};

export default nextConfig;
