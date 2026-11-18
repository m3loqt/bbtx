# IndexNow for bbtx.ai

IndexNow tells Bing, Yandex, Seznam, Naver and other participating engines that a URL is new, changed or gone, so they recrawl it sooner. **Google does not use IndexNow**; keep using Search Console for Google.

Added in SEO/AEO Batch 1 (final additions, 2026-11-18). Background and test results: [`batch-1-release-notes.md`](./batch-1-release-notes.md), section 12.3.

## Pieces

| Piece | Where |
|---|---|
| Verification key, served at `https://www.bbtx.ai/<key>.txt` | `public/45f2817914aedcec61df37f7c47082a1.txt` (the file contains only the key; the key is public by design) |
| Settings (host, key, endpoint, 25-URL safety limit) | `scripts/indexnow/config.mts` |
| Pure logic (URL rules, page fingerprint, diff, payload) | `scripts/indexnow/lib.mts` |
| The job | `scripts/indexnow/submit.mts` |
| Release set for the first submission | `scripts/indexnow/initial-urls.txt` |
| Trigger | `.github/workflows/indexnow.yml` |
| Tests | `tests/seo/indexnow.test.mjs` |

## When it runs

- **Automatically**, only after Vercel reports a *successful* deployment to the **Production** environment.
- **By hand**, from the GitHub Actions tab (IndexNow, Run workflow), only on `main`.
- **Never** on push, pull request, preview deployments, a schedule, or `npm run build`/`dev`.
- Running the script on your own machine is always a read-only dry run.

## What it submits

1. Reads the live `https://www.bbtx.ai/sitemap.xml` (so blog posts published from the admin are included).
2. Fetches each page and fingerprints what a search engine would index: title, description, canonical, robots, social tags, JSON-LD, headings and visible text. Nav, footer, scripts and build hashes are ignored, so a redeploy with identical content changes nothing.
3. Compares with the **baseline** from the last successful run (workflow artifact `indexnow-manifest`, kept 90 days).
4. Submits only: pages that are **new**, pages whose fingerprint **changed**, and pages that were in the baseline and now answer 404, 410 or a redirect (**removed**).
5. Confirms the key file is live, POSTs one request to `https://api.indexnow.org/indexnow`, retries 429/5xx/network errors up to 3 times, and logs the response.
6. Saves the new baseline **only if the submission succeeded**. After a failure the old baseline stays, so the next deploy retries those URLs.

Only canonical URLs are accepted: `https://www.bbtx.ai/...`, no query string, no fragment, no trailing slash, nothing under `/admin` or `/api`.

## Manual runs

Actions, IndexNow, Run workflow:

| Mode | Use it to |
|---|---|
| `changed` (default) | Re-check the live site against the baseline (e.g. after publishing a post from the admin) |
| `initial` | Submit `scripts/indexnow/initial-urls.txt` (do this once after the Batch 1 deploy) |
| `urls` | Submit specific URLs you list, including pages you removed |

Options: `dry_run` (log only, keep the baseline) and `force` (allow more than 25 changed URLs).

A dry run from a terminal against production:

```bash
node scripts/indexnow/submit.mts --mode initial --out /tmp/indexnow-out
```

## Reading the result

The run's summary and the `indexnow-report-<run id>` artifact list what was found, what was submitted, and each response.

| Response | Meaning | What to do |
|---|---|---|
| 200 | Submitted | Nothing |
| 202 | Accepted, key validation pending | Nothing; check again later |
| 403 | Key not valid | The key file is missing or different on the live site |
| 422 | URLs do not belong to the host, or key mismatch | Check `host`/`keyLocation` and the URL list |
| 429 | Too many requests | The job already retries; if it persists, wait and re-run |

Other messages from the job:

- **"No baseline found"**: first run, or the previous baseline expired (90 days). It recorded a new one and submitted nothing. Use mode `initial` or `urls` if there was something to send.
- **"N URLs differ from the baseline (limit 25)"**: almost always a site-wide change (for example a new nav). Check the report, then re-run with `force`, or submit specific pages with mode `urls`. Nothing was sent.
- **"Key file ... is not live"**: the deploy does not serve `/<key>.txt`. Nothing was sent.

## Limits worth knowing

- Posts published from the admin **without a deployment** are not picked up automatically. Run mode `changed` or `urls` by hand.
- IndexNow is a hint to participating engines, not a guarantee of indexing.
- The Production filter depends on Vercel naming its GitHub environment `Production`. If a deploy does not start a run, check the repo's Deployments list; the failure mode is "nothing submitted".

## Replacing the key

1. Generate a new one: `openssl rand -hex 16`.
2. Add `public/<newkey>.txt` containing only the key, deploy it, and confirm it is live.
3. Change `INDEXNOW_KEY` in `scripts/indexnow/config.mts` and delete the old file. `npm test` checks that the two agree and that there is only one key file.
