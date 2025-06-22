import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ Added missing comma above
  devIndicators: false,
  images: {
    domains: ["utfs.io"],
  },
};

export default nextConfig;
