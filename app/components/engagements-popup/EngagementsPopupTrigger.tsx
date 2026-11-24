"use client";

// Decides WHEN the engagements popup appears. It renders nothing itself and loads the popup's code
// only at the moment the popup is about to show, so a page pays for a few listeners and one timer.
// Mounted once, in the root layout (numbers and the page list live in lib/promo/popup-logic.ts).
//
// Rules:
// - Desktop: when the cursor leaves through the top of the window (exit intent), once the visitor
//   has been on the page a few seconds. Everyone: after 5 seconds, or once 50% of the page is
//   scrolled, whichever is first. The scroll route waits at least 3 seconds, so a restored scroll
//   position on reload does not count.
// - Never on offer or booking pages, nor on the other pages listed in EXCLUDED_PATHS.
// - Never over another dialog, the open mobile menu, a field being typed in, or a hidden tab: it
//   waits and tries again.
// - Once per 7 days (recorded when it appears, not only when it is closed), and once per visit.
// - `?promo=open` (optionally `&slide=3`) shows it at once for review, with no analytics.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  EXIT_INTENT_ARM_MS,
  MIN_DWELL_MS,
  RETRY_MS,
  SEEN_KEY,
  TRIGGER_DELAY_MS,
  TRIGGER_SCROLL_FRACTION,
  interruptionReason,
  isExcludedPath,
  isExitIntent,
  parsePreview,
  readShownRecently,
  safeStorage,
  scrollFraction,
  visit,
  writeShown,
} from "@/lib/promo/popup-logic";
import type { PopupSource } from "./EngagementsPopup";

const EngagementsPopup = dynamic(() => import("./EngagementsPopup"), { ssr: false });

type Shown = { path: string; source: PopupSource; slide: number };

export function EngagementsPopupTrigger() {
  const pathname = usePathname() ?? "/";
  const [shown, setShown] = useState<Shown | null>(null);

  useEffect(() => {
    const preview = parsePreview(window.location.search);
    if (preview) {
      const show = window.setTimeout(() => setShown({ path: pathname, source: "preview", slide: preview.slide }), 0);
      return () => window.clearTimeout(show);
    }

    if (isExcludedPath(pathname)) return;

    const session = safeStorage("sessionStorage");
    const local = safeStorage("localStorage");
    let seenThisSession = false;
    try {
      seenThisSession = session?.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage refused: the in-memory flag below still covers client-side navigation.
    }
    if (visit.shown || seenThisSession || readShownRecently(local, Date.now())) return;

    const loaded = Date.now();
    let scrollTimer: number | undefined;
    let armTimer: number | undefined;
    let retryTimer: number | undefined;
    let triggered = false;
    const root = document.documentElement;

    const stopWatching = () => {
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(delayTimer);
      window.clearTimeout(scrollTimer);
      window.clearTimeout(armTimer);
    };

    const tryShow = (source: PopupSource) => {
      if (interruptionReason(document)) {
        retryTimer = window.setTimeout(() => tryShow(source), RETRY_MS);
        return;
      }
      visit.shown = true;
      writeShown(local, Date.now());
      try {
        session?.setItem(SEEN_KEY, "1");
      } catch {
        // Ignored; see above.
      }
      setShown({ path: pathname, source, slide: 0 });
    };

    const trigger = (source: PopupSource) => {
      if (triggered) return;
      triggered = true;
      stopWatching();
      tryShow(source);
    };

    function onScroll() {
      if (triggered || scrollTimer !== undefined) return;
      if (scrollFraction(window.scrollY, root.scrollHeight, window.innerHeight) < TRIGGER_SCROLL_FRACTION) return;
      // Far enough. Show once the minimum time on the page has passed.
      scrollTimer = window.setTimeout(() => trigger("scroll"), Math.max(0, MIN_DWELL_MS - (Date.now() - loaded)));
    }

    function onLeave(e: MouseEvent) {
      if (isExitIntent(e)) trigger("exit");
    }

    const delayTimer = window.setTimeout(() => trigger("timer"), TRIGGER_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Exit intent only makes sense with a mouse; touch screens have no cursor to leave with.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      armTimer = window.setTimeout(() => root.addEventListener("mouseleave", onLeave), EXIT_INTENT_ARM_MS);
    }

    return () => {
      triggered = true;
      stopWatching();
      window.clearTimeout(retryTimer);
    };
  }, [pathname]);

  // Leaving the page it opened on closes it; it is never carried over to the next page.
  if (!shown || shown.path !== pathname) return null;
  return <EngagementsPopup source={shown.source} startSlide={shown.slide} onClose={() => setShown(null)} />;
}
