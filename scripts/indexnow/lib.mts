// Pure helpers for the IndexNow post-deploy job. No network, no filesystem:
// everything here is unit-tested in tests/seo/indexnow.test.mjs.

import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import {
  EXCLUDED_PATH_PREFIXES,
  INDEXNOW_KEY,
  KEY_LOCATION,
  SITE_HOST,
  SITE_ORIGIN,
} from "./config.mts";

export type PageRecord = { hash: string; title: string };
export type Manifest = {
  version: 1;
  generatedAt: string;
  origin: string;
  pages: Record<string, PageRecord>;
};

export type Diff = {
  added: string[];
  changed: string[];
  removed: string[];
  unchanged: string[];
};

/** A URL IndexNow may be told about: https, the www host, no query/hash, not admin/api. */
export function isSubmittableUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" || url.host !== SITE_HOST) return false;
  if (url.search || url.hash) return false;
  // Canonical form has no trailing slash (the root is the bare origin).
  if (url.pathname !== "/" && url.pathname.endsWith("/")) return false;
  return !EXCLUDED_PATH_PREFIXES.some(
    (prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`),
  );
}

/** Canonical string for a submittable URL: the bare origin for "/", otherwise as given. */
export function canonicalize(raw: string): string {
  const url = new URL(raw);
  return url.pathname === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${url.pathname}`;
}

const decodeXml = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");

/** <loc> values from a sitemap.xml, in order, de-duplicated. */
export function parseSitemap(xml: string): string[] {
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => decodeXml(m[1]));
  return [...new Set(locs)];
}

/** URLs from initial-urls.txt or a --urls value: "#" comments to end of line are dropped; spaces, commas and newlines separate. */
export function parseUrlList(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, ""))
    .join(" ")
    .split(/[\s,]+/)
    .filter(Boolean);
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`);
    return `{${entries.join(",")}}`;
  }
  return JSON.stringify(value);
}

// Removed before reading body text: not content, or sitewide chrome that would
// make every page look "changed" whenever the nav or footer changes.
// "title" matters: on dynamic pages Next.js streams metadata, so the same page
// is sometimes served with <title> in <head> and sometimes with it streamed into
// <body>. The title is captured separately below; left in, its text would make
// an unchanged page fingerprint differently from one request to the next.
const NON_CONTENT_SELECTORS = [
  "script:not([type='application/ld+json'])",
  "style",
  "noscript",
  "svg",
  "template",
  "iframe",
  "title",
  "nav",
  "footer",
];

/**
 * Fingerprint of what a search engine would index from a page: title,
 * description, canonical, robots, social tags, JSON-LD (key-order independent),
 * headings and visible body text. Build hashes, nonces, script chunks and
 * sitewide nav/footer are excluded, so a redeploy of identical content gives the
 * same fingerprint.
 */
export function fingerprintHtml(html: string): PageRecord {
  const $ = cheerio.load(html);

  const meta = (selector: string) => ($(selector).first().attr("content") ?? "").trim();
  const title = ($("head > title").first().text() || $("title").first().text()).trim();

  const jsonLd = $("script[type='application/ld+json']")
    .map((_, el) => {
      const raw = $(el).text().trim();
      try {
        return stableStringify(JSON.parse(raw));
      } catch {
        return raw;
      }
    })
    .get()
    .sort();

  NON_CONTENT_SELECTORS.forEach((selector) => $(selector).remove());

  const headings = $("h1, h2, h3")
    .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
    .get();
  const text = $("body").text().replace(/\s+/g, " ").trim();

  const fields = {
    title,
    description: meta("meta[name='description']"),
    canonical: ($("link[rel='canonical']").first().attr("href") ?? "").trim(),
    robots: meta("meta[name='robots']"),
    ogTitle: meta("meta[property='og:title']"),
    ogDescription: meta("meta[property='og:description']"),
    jsonLd,
    headings,
    text,
  };

  return { hash: createHash("sha256").update(stableStringify(fields)).digest("hex"), title };
}

/**
 * What changed between the last submitted baseline and the live site.
 * - added: live now, not in the baseline
 * - changed: in both, fingerprint differs
 * - removed: in the baseline, no longer live
 */
export function diffManifests(prev: Manifest["pages"], current: Manifest["pages"]): Diff {
  const added: string[] = [];
  const changed: string[] = [];
  const unchanged: string[] = [];
  for (const [url, record] of Object.entries(current)) {
    if (!(url in prev)) added.push(url);
    else if (prev[url].hash !== record.hash) changed.push(url);
    else unchanged.push(url);
  }
  const removed = Object.keys(prev).filter((url) => !(url in current));
  return { added: added.sort(), changed: changed.sort(), removed: removed.sort(), unchanged: unchanged.sort() };
}

/** Request body for the IndexNow API. Throws rather than send anything off-host. */
export function buildPayload(urls: string[]) {
  if (urls.length === 0) throw new Error("buildPayload: no URLs");
  if (urls.length > 10_000) throw new Error("buildPayload: IndexNow accepts at most 10,000 URLs per request");
  const bad = urls.filter((u) => !isSubmittableUrl(u));
  if (bad.length) throw new Error(`buildPayload: not submittable: ${bad.join(", ")}`);
  return { host: SITE_HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList: [...new Set(urls)] };
}

/** Response codes documented by the IndexNow protocol. */
export function describeResponse(status: number): { ok: boolean; meaning: string } {
  switch (status) {
    case 200:
      return { ok: true, meaning: "OK: URLs submitted" };
    case 202:
      return { ok: true, meaning: "Accepted: key validation pending" };
    case 400:
      return { ok: false, meaning: "Bad request: invalid format" };
    case 403:
      return { ok: false, meaning: "Forbidden: key not valid (key file missing or mismatched)" };
    case 422:
      return { ok: false, meaning: "Unprocessable: URLs do not belong to the host, or key does not match the schema" };
    case 429:
      return { ok: false, meaning: "Too many requests: potential spam, back off" };
    default:
      return { ok: false, meaning: `Unexpected status ${status}` };
  }
}
