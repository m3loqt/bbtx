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
      {
        source: "/blog",
        destination: "/chaotic-confluence",
        permanent: true,
      },
      {
        source: "/services/ai-organizational-model",
        destination: "/services/ai-integration",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
