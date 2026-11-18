// IndexNow configuration for bbtx.ai. See docs/seo/indexnow.md.
//
// The key is NOT a secret: the IndexNow protocol requires it to be served in
// plain text from the site itself (public/<key>.txt) so search engines can
// confirm we own the host. tests/seo/indexnow.test.mjs asserts that the file
// exists and contains exactly this value.

export const SITE_ORIGIN = "https://www.bbtx.ai";
export const SITE_HOST = "www.bbtx.ai";

export const INDEXNOW_KEY = "45f2817914aedcec61df37f7c47082a1";
export const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;

/** Shared endpoint: forwards to every participating engine (Bing, Yandex, Seznam, Naver, ...). */
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;

/** Paths that must never be submitted, even if they somehow reach the sitemap. */
export const EXCLUDED_PATH_PREFIXES = ["/admin", "/api"];

/**
 * Safety valve for the automatic (post-deploy) path. A normal deploy changes a
 * handful of pages. If more than this many differ, the cause is almost always
 * a site-wide change (or a fingerprinting false positive), so the run stops and
 * asks for a deliberate manual run with force=true instead of spamming engines.
 */
export const MAX_AUTO_URLS = 25;

export const USER_AGENT = "BBTx-IndexNow-Action/1.0";
export const FETCH_TIMEOUT_MS = 20_000;
export const FETCH_CONCURRENCY = 6;
