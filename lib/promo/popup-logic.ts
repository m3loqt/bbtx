// Behaviour rules for the engagements popup, kept free of React and the DOM so they can be tested
// on their own. The popup components only wire these to the page.

/** localStorage: when the popup last appeared. */
export const SHOWN_KEY = "bbtx.engagements-popup.shown-at";
/** sessionStorage: it has already appeared during this visit. */
export const SEEN_KEY = "bbtx.engagements-popup.seen";

/**
 * FREQUENCY CAP. ON for publishing (switched on 2026-11-27): once it has appeared it stays away for
 * COOLDOWN_MINUTES, and it appears at most once per visit. Set this to `false` only for testing: the
 * popup then appears on every page load (and again after navigating to another page where it is
 * allowed), with no memory at all.
 */
export const FREQUENCY_CAP_ENABLED = true;
/** Once it has appeared, it stays away for this long (when the cap is on). */
export const COOLDOWN_MINUTES = 30;
export const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000;
/** It appears after this long on a page... */
export const TRIGGER_DELAY_MS = 5_000;
/** ...or once the visitor has scrolled this far, whichever comes first. */
export const TRIGGER_SCROLL_FRACTION = 0.5;
/**
 * The scroll route never fires sooner than this after the page loads. Browsers restore the scroll
 * position on a reload, which would otherwise count as "50% scrolled" at first paint.
 */
export const MIN_DWELL_MS = 3_000;
/** Exit intent (desktop only) is armed only after this long, so a quick bounce is not pitched at. */
export const EXIT_INTENT_ARM_MS = 3_000;
/** How often a blocked popup checks whether it may show now. */
export const RETRY_MS = 1_500;

/** Slides advance on their own this often (paused while hovered, focused, hidden, or reduced motion). */
export const AUTOPLAY_MS = 6_000;
/** Length of the crossfade between slides. */
export const CROSSFADE_MS = 400;

/**
 * Pages where it never appears. Offer and booking pages: a visitor already deciding does not need a
 * second pitch. Plus pages that are not for browsing. A prefix matches the page and everything below.
 */
export const EXCLUDED_PATHS = [
  "/offerings",
  "/services",
  "/coaching",
  "/courses",
  "/digital-twin-snapshot",
  "/assessment",
  "/resources/ai-readiness-assessment",
  "/book",
  "/booking",
  "/schedule",
  "/admin",
  "/api",
  "/links",
  "/privacy",
  "/terms",
  "/cookies",
] as const;

/** True for a pathname the popup must stay off. */
export function isExcludedPath(pathname: string | null | undefined): boolean {
  const path = (pathname ?? "/").split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return EXCLUDED_PATHS.some((p) => path === p || path.startsWith(p + "/"));
}

/**
 * Module-level memory of this visit. Client-side navigation keeps the module alive, so this stops the
 * popup coming back on the next page, even when the browser gives us no storage at all.
 */
export const visit = { shown: false };

/** Next index after moving by `delta`, wrapping at both ends. */
export function wrapIndex(current: number, delta: number, count: number): number {
  if (count <= 0) return 0;
  return (((current + delta) % count) + count) % count;
}

/** How far down the page the visitor is, from 0 to 1. A page that fits the window is 0. */
export function scrollFraction(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const scrollable = scrollHeight - viewportHeight;
  if (!(scrollable > 0)) return 0;
  return Math.min(1, Math.max(0, scrollY / scrollable));
}

/** The cursor left through the top edge of the window: the move people make toward the tab bar. */
export function isExitIntent(e: { clientY: number }): boolean {
  return e.clientY <= 0;
}

type ReadableStorage = Pick<Storage, "getItem"> | null | undefined;
type WritableStorage = Pick<Storage, "setItem"> | null | undefined;

/** True when the stored timestamp is still inside the cooldown. */
export function shownRecently(raw: string | null | undefined, now: number, ms = COOLDOWN_MS): boolean {
  if (!raw) return false;
  const at = Number(raw);
  if (!Number.isFinite(at) || at <= 0) return false;
  // A timestamp from the future (clock change) is not trusted.
  if (at > now) return false;
  return now - at < ms;
}

/**
 * Whether the frequency cap says to stay away: it has appeared during this visit, or within the cooldown.
 * With the cap off (see FREQUENCY_CAP_ENABLED) it never blocks.
 */
export function frequencyCapBlocks(o: {
  visitShown: boolean;
  seenThisSession: boolean;
  lastShown: string | null | undefined;
  now: number;
  enabled?: boolean;
}): boolean {
  if (!(o.enabled ?? FREQUENCY_CAP_ENABLED)) return false;
  return o.visitShown || o.seenThisSession || shownRecently(o.lastShown, o.now);
}

/** Reads the last-shown time; storage that is missing or throws counts as "not shown". */
export function readShownRecently(storage: ReadableStorage, now: number): boolean {
  try {
    return shownRecently(storage?.getItem(SHOWN_KEY), now);
  } catch {
    return false;
  }
}

export function writeShown(storage: WritableStorage, now: number): void {
  try {
    storage?.setItem(SHOWN_KEY, String(now));
  } catch {
    // Private mode, quota, blocked storage: the in-memory flag still covers this visit.
  }
}

/** The browser's storages, or null where the browser refuses to hand them over. */
export function safeStorage(kind: "localStorage" | "sessionStorage"): Storage | null {
  try {
    return typeof window === "undefined" ? null : window[kind];
  } catch {
    return null;
  }
}

/**
 * `?promo=open` shows the popup at once, on any page, ignoring the rules above (frequency cap included), and sends no
 * analytics, so it can be reviewed. `&slide=3` starts on the third slide.
 */
export function parsePreview(search: string, count = 4): { slide: number } | null {
  const params = new URLSearchParams(search);
  if (params.get("promo") !== "open") return null;
  const n = Number(params.get("slide"));
  const slide = Number.isInteger(n) && n >= 1 && n <= count ? n - 1 : 0;
  return { slide };
}

type DocLike = {
  visibilityState?: string;
  activeElement?: { tagName?: string; isContentEditable?: boolean } | null;
  querySelector: (selector: string) => unknown;
  body?: { style?: { position?: string; overflow?: string } } | null;
};

/**
 * Why the popup must wait right now, or null when it may show. It never interrupts another dialog
 * (contact form, subscribe form), the open mobile menu, a visitor typing into a field, or a tab
 * nobody is looking at.
 */
export function interruptionReason(doc: DocLike): string | null {
  if (doc.visibilityState && doc.visibilityState !== "visible") return "tab-hidden";
  if (doc.querySelector('[role="dialog"][aria-modal="true"]')) return "dialog-open";
  const style = doc.body?.style;
  // The mobile menu freezes the page by fixing the body; the forms set overflow hidden.
  if (style?.position === "fixed" || style?.overflow === "hidden") return "page-locked";
  const el = doc.activeElement;
  const tag = el?.tagName?.toUpperCase();
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el?.isContentEditable) return "typing";
  return null;
}
