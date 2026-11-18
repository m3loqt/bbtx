// Post-deploy IndexNow submission for bbtx.ai.
//
//   node scripts/indexnow/submit.mts [--mode changed|initial|urls] [--urls "<url> <url>"]
//        [--prev <manifest.json>] [--out <dir>] [--dry-run] [--force]
//
// Meant to run from .github/workflows/indexnow.yml after a successful
// *Production* deployment (or a manual run on main). It is not part of
// `next build` and never runs for previews or locally: outside GitHub Actions it
// is forced into dry-run, so running it by hand can only read the live site.
//
// How "only changed pages" works: every URL in the live sitemap is fetched and
// fingerprinted (see lib.mts). The fingerprints of the last successful run are
// the baseline (the `indexnow-manifest` workflow artifact). New or different
// fingerprints are submitted, and so are baseline URLs that now 404/410/redirect.
// The baseline only advances after a submission succeeds, so a failed run is
// retried by the next one instead of being forgotten.
//
// Modes
//   changed  (default) diff the live site against the baseline. With no baseline
//            it records one and submits nothing.
//   initial  submit scripts/indexnow/initial-urls.txt (the Batch 1 release set).
//   urls     submit the URLs given with --urls (removed pages allowed).
//
// Test seams (used by tests/seo/indexnow.test.mjs; never set in the workflow):
//   INDEXNOW_FETCH_ORIGIN=http://localhost:3000  read pages from a local server
//       instead of production. Forces dry-run, unless the endpoint override below
//       is also set (a full local simulation).
//   INDEXNOW_ENDPOINT_OVERRIDE=http://127.0.0.1:PORT/indexnow  POST here instead
//       of api.indexnow.org. Only loopback addresses are accepted.
//   INDEXNOW_RETRY_DELAY_MS  base back-off between retries (default 3000).

import { mkdirSync, readFileSync, writeFileSync, appendFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  FETCH_CONCURRENCY,
  FETCH_TIMEOUT_MS,
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  MAX_AUTO_URLS,
  SITEMAP_URL,
  SITE_ORIGIN,
  USER_AGENT,
} from "./config.mts";
import {
  buildPayload,
  canonicalize,
  describeResponse,
  diffManifests,
  fingerprintHtml,
  isSubmittableUrl,
  parseSitemap,
  parseUrlList,
  type Manifest,
} from "./lib.mts";

const here = dirname(fileURLToPath(import.meta.url));

// ---------- args ----------
function parseArgs(argv: string[]) {
  const args = { mode: "changed", urls: "", prev: "", out: ".indexnow/out", dryRun: false, force: false };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === "--dry-run") args.dryRun = true;
    else if (flag === "--force") args.force = true;
    else if (flag === "--mode") args.mode = argv[++i] ?? "";
    else if (flag === "--urls") args.urls = argv[++i] ?? "";
    else if (flag === "--prev") args.prev = argv[++i] ?? "";
    else if (flag === "--out") args.out = argv[++i] ?? "";
    else throw new Error(`Unknown argument: ${flag}`);
  }
  if (!["changed", "initial", "urls"].includes(args.mode)) throw new Error(`Unknown mode: ${args.mode}`);
  return args;
}

const args = parseArgs(process.argv.slice(2));
const inCI = process.env.GITHUB_ACTIONS === "true";
const fetchOrigin = process.env.INDEXNOW_FETCH_ORIGIN?.replace(/\/+$/, "") || "";
const retryDelayMs = Number(process.env.INDEXNOW_RETRY_DELAY_MS ?? 3000);

let endpoint = INDEXNOW_ENDPOINT;
const endpointOverride = process.env.INDEXNOW_ENDPOINT_OVERRIDE;
if (endpointOverride) {
  const { hostname } = new URL(endpointOverride);
  if (!["127.0.0.1", "localhost", "[::1]"].includes(hostname)) {
    throw new Error("INDEXNOW_ENDPOINT_OVERRIDE may only point at a loopback address (it exists for tests).");
  }
  endpoint = endpointOverride;
}

const dryReasons: string[] = [];
if (args.dryRun) dryReasons.push("--dry-run");
if (!inCI) dryReasons.push("not running in GitHub Actions");
if (fetchOrigin && !endpointOverride) dryReasons.push(`reading from ${fetchOrigin} instead of production`);
const dryRun = dryReasons.length > 0;

// ---------- logging ----------
const lines: string[] = [];
const log = (message = "") => {
  console.log(message);
  lines.push(message);
};
const report: Record<string, unknown> = {
  startedAt: new Date().toISOString(),
  mode: args.mode,
  dryRun,
  dryRunReasons: dryReasons,
};

// ---------- network ----------
const toFetchUrl = (url: string) => (fetchOrigin ? url.replace(SITE_ORIGIN, fetchOrigin) : url);

type Fetched = { status: number; body: string; error?: string };

async function get(url: string): Promise<Fetched> {
  try {
    const res = await fetch(toFetchUrl(url), {
      redirect: "manual",
      headers: { "User-Agent": USER_AGENT, "Cache-Control": "no-cache", Accept: "text/html,application/xml,text/plain" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    return { status: res.status, body: res.status === 200 ? await res.text() : "" };
  } catch (error) {
    return { status: 0, body: "", error: error instanceof Error ? error.message : String(error) };
  }
}

async function mapPool<T, R>(items: T[], size: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await fn(items[index]);
      }
    }),
  );
  return results;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const isGone = (status: number) => status === 404 || status === 410 || (status >= 300 && status < 400);

// ---------- state ----------
function loadPrev(): Manifest | null {
  if (!args.prev || !existsSync(args.prev)) return null;
  try {
    const data = JSON.parse(readFileSync(args.prev, "utf8")) as Manifest;
    if (data.version === 1 && data.pages && typeof data.pages === "object") return data;
    log(`::warning::Ignoring ${args.prev}: unrecognised manifest format.`);
  } catch (error) {
    log(`::warning::Ignoring ${args.prev}: ${error instanceof Error ? error.message : error}`);
  }
  return null;
}

function writeOutputs(manifest: Manifest | null) {
  mkdirSync(args.out, { recursive: true });
  report.finishedAt = new Date().toISOString();
  writeFileSync(join(args.out, "report.json"), JSON.stringify(report, null, 2));
  writeFileSync(join(args.out, "report.txt"), lines.join("\n") + "\n");
  if (manifest) writeFileSync(join(args.out, "manifest.json"), JSON.stringify(manifest, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, ["## IndexNow", "", "```", ...lines, "```", ""].join("\n"));
  }
}

function fail(message: string, manifest: Manifest | null = null): never {
  log(`::error::${message}`);
  report.error = message;
  writeOutputs(manifest);
  process.exit(1);
}

// ---------- main ----------
async function main() {
  log(`IndexNow ${args.mode} run, ${dryRun ? `DRY RUN (${dryReasons.join("; ")})` : "LIVE submission"}`);

  const prev = loadPrev();
  log(prev ? `Baseline: ${Object.keys(prev.pages).length} pages from ${prev.generatedAt}` : "Baseline: none");

  // 1. The canonical page list is the live sitemap.
  const sitemap = await get(SITEMAP_URL);
  if (sitemap.status !== 200) fail(`Could not read ${SITEMAP_URL} (status ${sitemap.status}${sitemap.error ? `: ${sitemap.error}` : ""})`);
  const listed = parseSitemap(sitemap.body);
  const sitemapUrls = listed.filter(isSubmittableUrl).map(canonicalize);
  const skipped = listed.filter((u) => !isSubmittableUrl(u));
  if (skipped.length) log(`Skipped ${skipped.length} sitemap URL(s) that are not canonical/submittable: ${skipped.join(", ")}`);
  if (sitemapUrls.length === 0) fail("Sitemap contained no submittable URLs; refusing to continue.");
  log(`Sitemap: ${sitemapUrls.length} URLs`);

  // 2. Fingerprint every live page.
  const pages = await mapPool(sitemapUrls, FETCH_CONCURRENCY, async (url) => ({ url, res: await get(url) }));
  const current: Manifest["pages"] = {};
  const unavailable: { url: string; status: number }[] = [];
  for (const { url, res } of pages) {
    if (res.status === 200) current[url] = fingerprintHtml(res.body);
    else unavailable.push({ url, status: res.status });
  }
  if (unavailable.length) log(`Sitemap URLs not returning 200 (left out of the baseline): ${unavailable.map((u) => `${u.url} [${u.status}]`).join(", ")}`);
  report.pagesFingerprinted = Object.keys(current).length;
  report.unavailable = unavailable;

  // 3. Decide what to submit.
  let toSubmit: string[] = [];
  let nextPages: Manifest["pages"] = current;
  const note = { added: [] as string[], changed: [] as string[], removed: [] as string[], explicit: [] as string[] };

  if (args.mode === "changed") {
    if (!prev) {
      log("::warning::No baseline found. Recorded the live site as the baseline and submitted nothing. " +
        "Run this workflow manually with mode=initial to submit the release URLs.");
    } else {
      const diff = diffManifests(prev.pages, current);
      note.added = diff.added;
      note.changed = diff.changed;
      // A page that vanished is only "removed" if it now answers 404/410/redirect.
      // A 5xx or timeout proves nothing, so it stays in the baseline and is retried.
      const carry: Manifest["pages"] = {};
      for (const url of diff.removed) {
        const res = await get(url);
        if (isGone(res.status)) note.removed.push(url);
        else {
          carry[url] = prev.pages[url];
          log(`Not submitting ${url}: absent from the sitemap but answered ${res.status || res.error}.`);
        }
      }
      nextPages = { ...current, ...carry };
      toSubmit = [...note.added, ...note.changed, ...note.removed];
      log(`Added ${note.added.length}, changed ${note.changed.length}, removed ${note.removed.length}, unchanged ${diff.unchanged.length}`);
      if (toSubmit.length > MAX_AUTO_URLS && !args.force) {
        fail(`${toSubmit.length} URLs differ from the baseline (limit ${MAX_AUTO_URLS}). That looks like a site-wide change. ` +
          `Review report.txt, then re-run manually with force=true (or submit specific pages with mode=urls). Nothing was submitted and the baseline was not advanced.`);
      }
    }
  } else {
    const requested = args.mode === "initial"
      ? parseUrlList(readFileSync(join(here, "initial-urls.txt"), "utf8"))
      : parseUrlList(args.urls);
    if (requested.length === 0) fail(`mode=${args.mode} but no URLs were provided.`);
    const invalid = requested.filter((u) => !isSubmittableUrl(u));
    if (invalid.length) fail(`Not canonical submittable URLs (https://www.bbtx.ai/..., no query, no trailing slash): ${invalid.join(", ")}`);
    const urls = [...new Set(requested.map(canonicalize))];

    const merged: Manifest["pages"] = prev ? { ...prev.pages } : { ...current };
    for (const url of urls) {
      const res = url in current ? { status: 200, body: "" } : await get(url);
      if (res.status === 200) {
        if (!(url in current)) current[url] = fingerprintHtml(res.body);
        merged[url] = current[url];
        toSubmit.push(url);
      } else if (args.mode === "urls" && isGone(res.status)) {
        delete merged[url];
        toSubmit.push(url); // an intentional removal/redirect
      } else {
        fail(`${url} answered ${res.status || res.error}; expected 200${args.mode === "urls" ? " (or 404/410/redirect for a removal)" : ""}. Is the deployment live? Nothing was submitted.`);
      }
    }
    note.explicit = toSubmit;
    nextPages = merged;
  }

  const nextManifest: Manifest = { version: 1, generatedAt: new Date().toISOString(), origin: SITE_ORIGIN, pages: nextPages };
  Object.assign(report, { toSubmit, ...note });
  // The baseline only ever advances in a live run, and only after success (below).
  const advance = () => (dryRun ? null : nextManifest);

  if (toSubmit.length === 0) {
    log("Nothing to submit.");
    return writeOutputs(advance());
  }

  // 4. The key file must be live, or every engine will reject the request.
  const keyUrl = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
  const keyRes = await get(keyUrl);
  if (keyRes.status !== 200 || keyRes.body.trim() !== INDEXNOW_KEY) {
    fail(`Key file ${keyUrl} is not live with the expected contents (status ${keyRes.status}). Not submitting.`);
  }
  log(`Key file verified: ${keyUrl}`);

  const payload = buildPayload(toSubmit);
  log(`${dryRun ? "Would submit" : "Submitting"} ${payload.urlList.length} URL(s) to ${endpoint}:`);
  payload.urlList.forEach((u) => log(`  ${u}`));

  if (dryRun) return writeOutputs(null);

  // 5. Submit, retrying only transient failures.
  let last: { status: number; body: string } = { status: 0, body: "" };
  const attempts: unknown[] = [];
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": USER_AGENT },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      last = { status: res.status, body: (await res.text()).slice(0, 500) };
    } catch (error) {
      last = { status: 0, body: error instanceof Error ? error.message : String(error) };
    }
    const verdict = describeResponse(last.status);
    attempts.push({ attempt, status: last.status, meaning: verdict.meaning, body: last.body });
    log(`Attempt ${attempt}: HTTP ${last.status || "no response"}, ${verdict.meaning}${last.body ? `, body: ${last.body}` : ""}`);
    if (verdict.ok) break;
    const transient = last.status === 0 || last.status === 429 || last.status >= 500;
    if (!transient || attempt === 3) break;
    await sleep(attempt * retryDelayMs);
  }
  report.response = last;
  report.attempts = attempts;

  if (!describeResponse(last.status).ok) {
    fail(`IndexNow submission failed (HTTP ${last.status || "no response"}). The baseline was not advanced, so the next run will retry these URLs.`);
  }

  log(`Submitted ${payload.urlList.length} URL(s). Baseline advanced.`);
  writeOutputs(nextManifest);
}

main().catch((error) => fail(`Unexpected error: ${error instanceof Error ? error.stack ?? error.message : error}`));
