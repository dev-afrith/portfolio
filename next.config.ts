import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/projects/:slug",
        destination: "/#projects",
        permanent: true,
      },
    ];
  },
  experimental: {
    reactDebugChannel: false,
  },
};

export default nextConfig;
