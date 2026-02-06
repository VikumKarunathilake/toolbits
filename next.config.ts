import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
