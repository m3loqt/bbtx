/**
 * Remote hosts whose images go through the Next.js image optimizer (AVIF/WebP,
 * resized, lazy). This is the single source of truth: next.config.ts builds
 * its `remotePatterns` from it and RemoteCoverImage checks it before choosing
 * how to render.
 *
 * Why the check exists: next/image throws at render time for a host that is not
 * allow-listed. Blog covers are pasted into the admin by hand, so an unexpected
 * host must degrade to a plain <img>, never crash the page.
 *
 * Add a host here only when it is a place covers really come from.
 */
export const OPTIMIZED_IMAGE_HOSTS = [
  "substackcdn.com",
  "substack-post-media.s3.amazonaws.com",
  "substack-video.s3.amazonaws.com",
] as const;

/** Hostname suffixes (admin uploads go to Vercel Blob: <store>.public.blob.vercel-storage.com). */
export const OPTIMIZED_IMAGE_HOST_SUFFIXES = [".public.blob.vercel-storage.com"] as const;

export function isOptimizableImageUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  const host = url.hostname.toLowerCase();
  if ((OPTIMIZED_IMAGE_HOSTS as readonly string[]).includes(host)) return true;
  return OPTIMIZED_IMAGE_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix) && host.length > suffix.length);
}

/** Shape next.config.ts expects for `images.remotePatterns`. */
export const imageRemotePatterns = [
  ...OPTIMIZED_IMAGE_HOSTS.map((hostname) => ({ protocol: "https" as const, hostname, pathname: "/**" })),
  ...OPTIMIZED_IMAGE_HOST_SUFFIXES.map((suffix) => ({
    protocol: "https" as const,
    hostname: `**${suffix}`,
    pathname: "/**",
  })),
];
