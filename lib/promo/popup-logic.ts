// Behaviour rules for the homepage engagements popup, kept free of React and the DOM so they can
// be tested on their own. The popup component only wires these to the page.

export const DISMISS_KEY = "bbtx.engagements-popup.dismissed-at";
export const SEEN_KEY = "bbtx.engagements-popup.seen";

/** A visitor who closes the popup is left alone for this long. */
export const DISMISS_DAYS = 7;
/** The popup appears after this long on the homepage... */
export const TRIGGER_DELAY_MS = 10_000;
/** ...or once the visitor has scrolled this far, whichever comes first. */
export const TRIGGER_SCROLL_FRACTION = 0.3;
/**
 * The scroll trigger never fires sooner than this after the page loads. Browsers restore the
 * scroll position on a reload, which would otherwise count as "30% scrolled" at first paint.
 */
export const MIN_DWELL_MS = 3_000;
/** How often a blocked popup checks whether it may show now. */
export const RETRY_MS = 1_500;

/**
 * Module-level memory of this visit. Client-side navigation keeps the module alive, so this
 * stops the popup coming back when a visitor returns to the homepage, even when the browser
 * gives us no storage at all.
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

type ReadableStorage = Pick<Storage, "getItem"> | null | undefined;
type WritableStorage = Pick<Storage, "setItem"> | null | undefined;

/** True when the stored dismissal timestamp is still inside the quiet period. */
export function isDismissed(raw: string | null | undefined, now: number, days = DISMISS_DAYS): boolean {
  if (!raw) return false;
  const at = Number(raw);
  if (!Number.isFinite(at) || at <= 0) return false;
  // A timestamp from the future (clock change) is not trusted.
  if (at > now) return false;
  return now - at < days * 24 * 60 * 60 * 1000;
}

/** Reads the dismissal; storage that is missing or throws counts as "not dismissed". */
export function readDismissed(storage: ReadableStorage, now: number): boolean {
  try {
    return isDismissed(storage?.getItem(DISMISS_KEY), now);
  } catch {
    return false;
  }
}

export function writeDismissed(storage: WritableStorage, now: number): void {
  try {
    storage?.setItem(DISMISS_KEY, String(now));
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
 * `?promo=open` shows the popup at once, ignoring the delay and any dismissal, and sends no
 * analytics, so the popup can be reviewed. `&slide=3` starts on the third engagement.
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
 * Why the popup must wait right now, or null when it may show. It never interrupts another
 * dialog (contact form, subscribe form), the open mobile menu, a visitor typing into a field,
 * or a tab nobody is looking at.
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
