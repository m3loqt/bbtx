import Image from "next/image";
import { isOptimizableImageUrl } from "@/lib/image-hosts";

/**
 * Blog cover from a URL typed into the admin. Fills its parent, so the parent
 * must be `relative` and already have its own size (an aspect-ratio box), which
 * is what keeps the page from shifting while the image loads.
 *
 * Known hosts (lib/image-hosts.ts) are optimized: resized to `sizes`, served as
 * AVIF/WebP, lazy-loaded. Any other host falls back to a plain <img>, because
 * next/image throws for a host that is not allow-listed and a hand-pasted cover
 * must never take the page down.
 */
export function RemoteCoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (isOptimizableImageUrl(src)) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
