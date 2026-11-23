"use client";

// Decides WHEN the engagements popup appears. It renders nothing itself and loads the popup's
// code only at the moment the popup is about to show, so the homepage pays for a few listeners
// and one timer, no more.
//
// Rules (numbers live in lib/promo/popup-logic.ts):
// - Never on first paint: after 10 seconds, or once 30% of the page is scrolled, whichever
//   is first (the scroll route waits at least 3 seconds, so a restored scroll position on
//   reload does not count).
// - Never over another dialog, the open mobile menu, a field being typed in, or a hidden tab:
//   it waits and tries again.
// - Once per visit, and not again for 7 days after it is closed.
// - `?promo=open` (optionally `&slide=3`) shows it at once for review, with no analytics.

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  MIN_DWELL_MS,
  RETRY_MS,
  SEEN_KEY,
  TRIGGER_DELAY_MS,
  TRIGGER_SCROLL_FRACTION,
  interruptionReason,
  parsePreview,
  readDismissed,
  safeStorage,
  scrollFraction,
  visit,
} from "@/lib/promo/popup-logic";
import type { PopupSource } from "./EngagementsPopup";

const EngagementsPopup = dynamic(() => import("./EngagementsPopup"), { ssr: false });

export function EngagementsPopupTrigger() {
  const [shown, setShown] = useState<{ source: PopupSource; slide: number } | null>(null);

  useEffect(() => {
    const preview = parsePreview(window.location.search);
    if (preview) {
      const show = window.setTimeout(() => setShown({ source: "preview", slide: preview.slide }), 0);
      return () => window.clearTimeout(show);
    }

    const session = safeStorage("sessionStorage");
    let seenThisSession = false;
    try {
      seenThisSession = session?.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage refused: the in-memory flag below still covers client-side navigation.
    }
    if (visit.shown || seenThisSession || readDismissed(safeStorage("localStorage"), Date.now())) return;

    const loaded = Date.now();
    let scrollTimer: number | undefined;
    let retryTimer: number | undefined;
    let triggered = false;

    const stopWatching = () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(delayTimer);
      window.clearTimeout(scrollTimer);
    };

    const tryShow = (source: PopupSource) => {
      if (interruptionReason(document)) {
        retryTimer = window.setTimeout(() => tryShow(source), RETRY_MS);
        return;
      }
      visit.shown = true;
      try {
        session?.setItem(SEEN_KEY, "1");
      } catch {
        // Ignored; see above.
      }
      setShown({ source, slide: 0 });
    };

    const trigger = (source: PopupSource) => {
      if (triggered) return;
      triggered = true;
      stopWatching();
      tryShow(source);
    };

    function onScroll() {
      if (triggered || scrollTimer !== undefined) return;
      const doc = document.documentElement;
      if (scrollFraction(window.scrollY, doc.scrollHeight, window.innerHeight) < TRIGGER_SCROLL_FRACTION) return;
      // Far enough. Show once the minimum time on the page has passed.
      scrollTimer = window.setTimeout(() => trigger("scroll"), Math.max(0, MIN_DWELL_MS - (Date.now() - loaded)));
    }

    const delayTimer = window.setTimeout(() => trigger("timer"), TRIGGER_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      triggered = true;
      stopWatching();
      window.clearTimeout(retryTimer);
    };
  }, []);

  if (!shown) return null;
  return <EngagementsPopup source={shown.source} startSlide={shown.slide} onClose={() => setShown(null)} />;
}
