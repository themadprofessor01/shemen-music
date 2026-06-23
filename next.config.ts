import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [36, 64, 128, 200, 256, 384],
    minimumCacheTTL: 604800,
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
  },
  experimental: {
    optimizePackageImports: ["gsap", "motion", "lucide-react"],
  },
};

export default nextConfig;
