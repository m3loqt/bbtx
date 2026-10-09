"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function VoxwinsWidget() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <Script
      src="https://cdn.voxwins.ai/agent.js"
      data-id="01a0ed53-bda2-7a40-afb9-797ee79b22ad"
      strategy="afterInteractive"
    />
  );
}
