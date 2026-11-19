"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SRC = "https://cdn.voxwins.ai/agent.js";
const AGENT_ID = "01a0ed53-bda2-7a40-afb9-797ee79b22ad";

// The vendor loader (agent.js) mounts a position:fixed wrapper covering the
// whole viewport (z-index 2147483647, pointer-events none), then the chat
// iframe asks it to shrink to the small launcher in the corner. Chrome scores
// that jump as layout shift: about 1.9 CLS on every page, measured in a real
// browser and by a Lighthouse audit (1.4 to 2.2 on all pages, mobile and desktop).
//
// The loader marks "the iframe has sent its size" by switching the wrapper's
// pointer-events to "auto", and marks a reset back to full screen by switching
// it to "none". So the wrapper is kept invisible whenever pointer-events is not
// "auto", and shown (after the new size has painted) once it is. Nothing
// visible ever moves; the launcher appears in the same place at the same
// moment as before (about two frames after the loader sizes it, measured at
// about 40 ms), because only the invisible full-screen stage is hidden. This is
// continuous, not one-shot: a reset after the first reveal is
// hidden again before it can paint.
//
// Safety net: if the wrapper has not settled after GIVE_UP_MS (slow device, or
// the vendor changed how it signals), stop guarding and show it, so the chat
// can never stay hidden. That is deliberately long: a short value shows the
// still-full-screen wrapper on a slow phone and brings the shift back.
const WRAPPER_Z_INDEX = "2147483647";
const GIVE_UP_MS = 15000;
let shiftGuardInstalled = false;

function guardWrapper(wrapper: HTMLElement) {
  let gaveUp = false;
  let revealFrame = 0;

  const hide = () => {
    cancelAnimationFrame(revealFrame);
    if (wrapper.style.getPropertyValue("visibility") !== "hidden") {
      wrapper.style.setProperty("visibility", "hidden", "important");
    }
  };

  const showAfterPaint = () => {
    cancelAnimationFrame(revealFrame);
    // Let the new size paint once while still hidden before showing it.
    revealFrame = requestAnimationFrame(() => {
      revealFrame = requestAnimationFrame(() => {
        if (wrapper.style.pointerEvents === "auto") wrapper.style.removeProperty("visibility");
      });
    });
  };

  const sync = () => {
    if (gaveUp) return;
    if (wrapper.style.pointerEvents === "auto") showAfterPaint();
    else hide();
  };

  hide();
  const styleObserver = new MutationObserver(sync);
  styleObserver.observe(wrapper, { attributes: true, attributeFilter: ["style"] });

  window.setTimeout(() => {
    if (wrapper.style.pointerEvents === "auto") return; // settled; keep guarding resets
    gaveUp = true;
    styleObserver.disconnect();
    cancelAnimationFrame(revealFrame);
    wrapper.style.removeProperty("visibility");
  }, GIVE_UP_MS);
}

function installShiftGuard() {
  if (shiftGuardInstalled) return;
  shiftGuardInstalled = true;

  // Stays installed for the life of the page: the loader rebuilds the wrapper
  // if it is ever detached.
  new MutationObserver((records) => {
    records.forEach((record) =>
      record.addedNodes.forEach((node) => {
        if (
          node instanceof HTMLElement &&
          node.parentElement === document.body &&
          node.style.zIndex === WRAPPER_Z_INDEX
        ) {
          guardWrapper(node);
        }
      }),
    );
  }).observe(document.body, { childList: true });
}

export function VoxwinsWidget() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdmin) return;
    installShiftGuard();
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
