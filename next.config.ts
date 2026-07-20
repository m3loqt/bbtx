import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/assessment",
        destination: "/digital-twin-snapshot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
