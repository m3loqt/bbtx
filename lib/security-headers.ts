/**
 * Security response headers for every route, wired up in next.config.ts.
 *
 * Added after a Screaming Frog crawl flagged all four as missing on every URL. The site's
 * third-party footprint is small and known, which is what makes a tight policy safe: the
 * only third-party script is Google Analytics, there are no iframes, embeds, off-site form
 * posts or client-side calls to other origins, and published post bodies contain none of
 * those either (checked against the database on 2026-11-19).
 *
 * 'unsafe-inline' for scripts and styles is deliberate. Next.js inlines its bootstrap data
 * and the GA init snippet, and styles are set inline by React; removing it needs a
 * per-request nonce from middleware, which is a larger change. The policy still blocks
 * every script origin except Google Tag Manager, plus plugins, framing and form hijacking.
 *
 * If something stops working after a change, look at the browser console for
 * "Refused to ..." first: that names the exact directive to widen.
 */

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  // Blog covers and post images come from Substack, S3 and Vercel Blob, and an admin can paste any https URL.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://stats.g.doubleclick.net",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

export type Header = { key: string; value: string };

/**
 * The CSP is production-only: `next dev` needs eval for hot reloading and would be blocked.
 */
export function securityHeaders({ production }: { production: boolean }): Header[] {
  const headers: Header[] = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ];
  if (production) headers.push({ key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY });
  return headers;
}
