"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SRC = "https://cdn.voxwins.ai/agent.js";
const AGENT_ID = "01a0ed53-bda2-7a40-afb9-797ee79b22ad";

export function VoxwinsWidget() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdmin) return;
    if (document.querySelector(`script[src="${SRC}"]`)) return;

    // The loader reads its id from document.currentScript, so the tag must
    // be a real script element carrying data-id when it executes.
    const script = document.createElement("script");
    script.src = SRC;
    script.dataset.id = AGENT_ID;
    document.body.appendChild(script);
  }, [isAdmin]);

  return null;
}
