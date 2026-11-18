// Thin, safe wrapper around the GA4 `gtag` global initialised in
// app/components/GoogleAnalytics.tsx. It is a no-op when GA isn't loaded
// (no measurement ID in the environment, blocked by the browser, SSR), so
// callers never need to guard it.
//
// Rules for what may be sent:
// - Never personal or free-text form data (names, emails, messages).
// - Only fire conversion events (`generate_lead`) after the server accepted
//   the submission, never on a button click.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
  }
}

export function trackEvent(eventName: string, params?: GtagParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, params);
  } catch {
    // Analytics must never break the page.
  }
}
