/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
 devIndicators: {
    buildActivity:false
  },
  
  images: {
    domains: ["utfs.io"],
  },
};

module.exports = nextConfig;