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
      {
        // Legacy pre-redesign slug, still indexed and drawing impressions
        // (~#35 for "organizational ai assessment"). Closest living page.
        source: "/services/organizational-ai-assessment",
        destination: "/services/organizational-assessment",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
