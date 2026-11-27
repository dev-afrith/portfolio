import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    reactDebugChannel: false,
  },
};

export default nextConfig;
