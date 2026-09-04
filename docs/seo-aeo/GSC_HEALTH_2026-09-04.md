# GSC Technical Health — 2026-09-04

Source: Google Search Console API (Search Console MCP, OAuth as `devmelo2003@gmail.com`, `siteRestrictedUser` on `sc-domain:bbtx.ai`), cross-checked against live `curl` and the repo. First API-based pull since access was established 2026-09-03 (DAT-005). Feeds `TECH-*` and `AEO-001`.

This is a **technical health** snapshot (indexation, canonicalisation, redirects, sitemap, schema surfacing). It is not a performance baseline — see `BASELINE_2026-07-30.md` for that, still the reference "before" for traffic.

## Property and history

- Property is `sc-domain:bbtx.ai` — a **Domain property**, so it covers `www`, apex, `http`, and any subdomain in one place.
- Search-performance history begins **2026-03-22**; the sitemap was first submitted **2026-03-23**. This resolves **OPEN-008** — the pre-project GSC activity was a one-off sitemap submission in March 2026, not an unexplained earlier property.
- Sitemap `https://www.bbtx.ai/sitemap.xml`: 34 URLs, `errors: 0`, `warnings: 2`, last downloaded by Google 2026-08-31.

## Indexation

Confirmed **Submitted and indexed** (URL Inspection API): homepage, `/about`, `/services`, `/services/strategy-advisory`, `/services/organizational-assessment`, `/services/leadership-development`, `/services/implementation-support`, `/services/ai-integration`, `/coaching`, `/courses`, `/whitepapers`, `/chaotic-confluence` + all 11 posts spot-checked, `/digital-twin-snapshot`, `/resources`, `/links`, `/team/kaye`, `/team/mel`, `/privacy`, `/terms`. Canonical consolidation to `www` is working (Google-selected canonical = declared canonical on every page checked).

### Not indexed

| URL | State | Cause |
|---|---|---|
| `/team/grant` | **"URL is unknown to Google"** — never discovered, never crawled | Exactly **one** crawlable internal link site-wide (buried in the `/about` team grid). Nothing in Nav, Footer, homepage, or any service page. Homepage references it only as a schema `@id`, which is not a link. `/team/kaye` and `/team/mel` have the same single link but won crawl-order roulette on a near-zero crawl budget. |
| `/services/executive-recruitment` | "Discovered — currently not indexed", never crawled | 2026-08 page; low site authority = slow discovery→crawl. Not linked from Nav/homepage. |
| `/newsletter` | "Not found (404)", last crawled **2026-03-31** | Stale. The page is 200 live and in the sitemap; GSC's data predates it working. Needs revalidation, no code fix. |

### Legacy / duplicate URLs

| URL | Live behaviour | GSC state | Action |
|---|---|---|---|
| `/services/organizational-ai-assessment` | **404** (no redirect) | "Submitted and indexed", ~49 impressions/120d, ~#35 for "organizational ai assessment" | **FIXED this session** — 301 → `/services/organizational-assessment` added to `next.config.ts` |
| `/blog` | 308 → `/chaotic-confluence` | Still "indexed" (last crawl 2026-07-16, pre-redirect) | "Validate Fix" in GSC UI to clear faster |
| `/services/ai-organizational-model` | 308 → `/services/ai-integration` | — | Working, no action |
| `https://bbtx.ai/*` (apex), `http://www.bbtx.ai/*` | 307 (apex) / 308 (http) → `https://www.bbtx.ai/*` | "Page with redirect" | Consolidation working — see below |

### "Page with redirect" GSC report (14 URLs, first detected 2026-03-24)

All 14 are pre-consolidation apex/`http` addresses (`https://bbtx.ai/`, `http://www.bbtx.ai/`, `http://bbtx.ai/`, and the apex versions of `/about`, `/coaching`, `/services/*`, `/team/kaye`, etc.). They are **correctly not indexed** — the `www` equivalents are indexed and serving. This report is confirmation the domain consolidation worked, not a defect, and it decays on its own.

- **Repo is clean:** `grep` confirms zero non-`www` `bbtx.ai` references in `app/`, `lib/`, config, or live HTML. The site is not feeding the re-crawl. Google is re-checking from its own multi-year history of the old URLs plus external backlinks (Grant's Substack/Medium/LinkedIn/Chamber may still link `bbtx.ai` without `www`).
- **One accelerant, not code:** the apex redirect is **307 (temporary)** — `https://bbtx.ai/` → 307 → `https://www.bbtx.ai/`. A 307 keeps URLs in Google's re-crawl queue longer. Making it **308 permanent** lets Google consolidate and stop re-checking. This fires at Vercel's edge before the Next.js app, so `next.config.ts`/`middleware.ts` can't override it — it's a **Vercel dashboard change**: Project → Settings → Domains → set `bbtx.ai` as a permanent redirect to `www.bbtx.ai` (not just an assigned alias, which is what produces the auto-307). Then "Validate Fix" on the report.
- `http://bbtx.ai/` → 308 → `https://bbtx.ai/` and `http://www.bbtx.ai/` → 308 → `https://www.bbtx.ai/` are already permanent — only the apex-https → www hop is 307.

## Schema / rich results

- **Breadcrumbs** rich results confirmed live on service pages, `/team/kaye`, `/team/mel`, `/whitepapers`, `/chaotic-confluence` + posts.
- `/services` and `/services/ai-integration` report "None" for rich results **only because Google's last crawl of them (2026-07-21) predates the `BreadcrumbList` JSON-LD** — the schema is present in the live HTML. Not a bug; clears on re-crawl.
- `FAQPage` / `Organization` / `Person` schema is present but not surfacing rich results. Expected: Google restricts FAQ rich results to authoritative domains; Organization/Person feed the knowledge panel, not a "rich result" line item.

## Crawl frequency

Core pages are crawled every 2–6 weeks; `/services` and `/services/ai-integration` untouched since 2026-07-21. This is a **symptom of low site authority**, not a fixable defect — it improves with inbound links and content freshness, not configuration.

## Fixed this session (2026-09-04, uncommitted)

1. **`/team/grant` discoverability** — two internal links added:
   - `Grant Tate → /team/grant` in the Footer "Useful Links" group (`app/components/Footer.tsx`). The Footer renders on every page, so this takes Grant's page from 1 internal inbound link to ~30. Decisive for getting it out of "unknown to Google."
   - A contextual "Read Grant Tate's full background →" link at the end of the `/about` career-timeline section (`app/about/page.tsx`) — strong descriptive anchor text, in main content, directly after the content that is entirely about Grant. This is option (c) from the NAV-001 discussion; the Nav itself was left unchanged (a 2-item "About" dropdown would look sparse against the 4–6-card dropdown panels).
2. **`/services/organizational-ai-assessment` 301** — `next.config.ts`, → `/services/organizational-assessment` (chosen over `/services/ai-integration` to avoid reinforcing an AI-category framing per DEC-001). Matches the redirect pattern TECH-004 established for `/blog` and `/services/ai-organizational-model`.

`npx tsc --noEmit` + `npm run build` (52/52) clean. `eslint` clean on touched files (the 1 `Footer.tsx` `no-html-link-for-pages` error on the wordmark `<a href="/">` is pre-existing, confirmed by `git stash`).

## Still open — needs a person

### Code / design decision (Mel)
- **Service-page links to `/team/grant`.** Discovery is handled (Footer + `/about` contextual link, done this session). Link equity from the commercial pages toward Grant's authority page (report NAV-001, p. 21: "every service page links to Grant's authority page") is still open — it overlaps AUT-002 (needs the authority-page content built) and AUT-001 (blocked on 5 facts from Grant), so fold it into that work rather than bolt a bare link onto 6 pages now.

### GSC UI actions (no API for these)
- Read the **2 sitemap warnings** — the API only returns the count.
- "Validate Fix" on the `/blog` and `/services/organizational-ai-assessment` 404/redirect groups (after this session's changes deploy).
- Request indexing for `/team/grant` and `/services/executive-recruitment` once they're linked and deployed.
- Resubmit the sitemap after deploy.

### Vercel (Mel)
- ~~Set the apex `bbtx.ai` → `www.bbtx.ai` redirect to **308 permanent** (currently 307).~~ **Done 2026-09-04** — live-verified (`curl -sI https://bbtx.ai/` → `308` → `https://www.bbtx.ai/`). Should clear the 14-URL "Page with redirect" report on its own now; no further action.

### Content (AUT-002 pass, not technical SEO)
- `/about` `PEOPLE` data: Grant's email shows `grant@bbtx.com` (should be `.ai`); his `/about` bio still says "CEO of Bridge Business Transformations" (unresolved AUT-001 naming conflict) and leads with AI framing.
