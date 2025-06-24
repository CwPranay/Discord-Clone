/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
  images: {
    domains: ["utfs.io"],
  },
};

module.exports = nextConfig;