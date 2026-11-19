import type { NextConfig } from "next";
import { imageRemotePatterns } from "./lib/image-hosts.ts";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Blog covers live on Substack/S3/Vercel Blob. Listing the hosts lets them
    // be resized and served as AVIF/WebP; see lib/image-hosts.ts.
    remotePatterns: imageRemotePatterns,
  },
  // experimental.inlineCss was tried for the "render-blocking resources" audit and
  // rejected: it put the whole 165 KB stylesheet into every page's HTML (twice,
  // once in <style> and once in Next's payload), taking the homepage from 20.7 KB
  // to 76.6 KB gzipped on every load, to save one cached request. Numbers in
  // docs/seo/batch-2-performance-images.md. Revisit only with measured field data.
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
