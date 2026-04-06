import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_BASE_URL || "https://bid-compare.vercel.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
