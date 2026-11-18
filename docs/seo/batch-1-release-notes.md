# SEO/AEO Batch 1: Release Notes

**Branch:** `seo/batch-1-ai-consulting` (local; nothing committed, pushed, or deployed)
**Prepared:** 2026-11-17 · **Final additions:** 2026-11-18 (section 12)
**Status:** Guide approved by Grant (relayed by Mel, 2026-11-18) and his authorship is active. IndexNow added. **Committed and pushed to branch `seo/batch-1-ai-consulting` on 2026-11-19. Not merged to `main`, not deployed.** Open items are under "Approval needed before production".

Baseline measurements are in [`batch-1-baseline-2026-11-17.md`](./batch-1-baseline-2026-11-17.md).

---

## 1. Implementation summary

| Page / system | Files | What changed | Why | Status |
|---|---|---|---|---|
| Leadership & Team Development | `app/services/leadership-development/{page,layout}.tsx` | New section "Leading Teams Through AI Adoption" (about 350 words); stronger "Leadership for the AI Era" engagement and FAQ wording; contextual link to AI Integration; new title and description | Page already earns AI-leadership impressions (126 and 21) at positions 42 and 55 with 0 clicks | Done |
| AI Integration & Innovation | `app/services/ai-integration/{page,layout}.tsx` | New title and description; short "starts with the organization, not the software" paragraph after the intro; two engagement descriptions refined; link to Organizational Assessment in the "Assess Readiness" step | Target "AI strategy consulting" and "AI business consultant" without changing the five-part model or headline | Done |
| Organizational Assessment | `app/services/organizational-assessment/{page,layout}.tsx` | New title and description; AI Readiness Assessment description refined; "Not sure where to begin?" link to the new guide | Make it the commercial destination for readiness-assessment searches while keeping the broader organizational-diagnosis positioning | Done |
| Strategy & Advisory | `app/services/strategy-advisory/page.tsx` | One link, inside the existing "Do you use AI in the strategy process" FAQ answer | Connect to AI Integration; title and description deliberately untouched to avoid competing for the same keyword | Done |
| Implementation & Change Support | `app/services/implementation-support/page.tsx` | "AI Adoption & Change Support" description refined; link added to the "Can this support AI implementation" FAQ, with a sentence that BBTx's role is the organizational side of adoption | Clarify planning-to-daily-work transition; avoid implying software engineering | Done |
| **New:** AI Readiness guide | `app/resources/ai-readiness-assessment/{page.tsx,content.ts}` | New resource at `/resources/ai-readiness-assessment` (12 questions, 5 dimensions, evidence/assumption/unknown method, no score, decision record, CTA). **Copy replaced on 2026-11-17 with the final editorial draft (`ai-readiness-page-copy-clean.md`), verbatim**; design, SEO title/description/H1, canonical, schema and sitemap unchanged | Useful, linkable top-of-funnel asset that routes to the assessment service | Done; **approved by Grant 2026-11-18**; byline and schema credit him (section 12) |
| Resources page | `app/resources/page.tsx` | New card for the guide; breadcrumb added | Required internal link | Done |
| Guide copy fidelity | Script comparing the rendered page to `ai-readiness-page-copy-clean.md` | **110 of 110** text fragments present, 0 missing; no `[EDITOR` text; H1, H2 order, 12 question headings and their order match; badges 01 to 12; 6 TOC anchors resolve; Calendly link opens with `noopener`. Also run on a throwaway build with the approval flag on (byline and schema author switch correctly) |
| Sitemap | `app/sitemap.ts` | Added the guide (www host) | Discoverability | Done |
| Breadcrumb structured data | `lib/seo/schema.ts`, `app/components/JsonLd.tsx`, 12 layouts, blog index and article pages, `/services`, `/resources` | One shared `breadcrumbList()` builder. Removed the duplicate 2-item list that `app/services/layout.tsx` added to every service page. Lists are now named | Search Console reported "Unnamed item" (see section 3) | Done; verify after recrawl |
| Organization / WebSite schema | `lib/seo/schema.ts`, `app/layout.tsx`, `app/page.tsx` | One Organization + WebSite graph in the root layout; removed from the homepage | Every page now contains the entity that other schema points to, with no duplicates | Done |
| Grant's Person schema | `lib/seo/schema.ts`, `app/team/grant/layout.tsx` | Entity content unchanged. Its `@id` and URL are now defined once in `lib/seo/schema.ts` and used by the profile page, the Organization's `founder` and the guide's Article author; breadcrumb moved to the shared builder | One entity, referenced everywhere, no duplicates (section 12) | Done |
| Blog dates | `lib/seo/dates.ts`; blog index, article, whitepapers pages | Shared date helpers; normalise on the server | Fixes `article:published_time="[object Object]"` (reproduced on live) and a time-zone hydration risk | Done |
| Doubled title suffix | `app/services/layout.tsx`, `app/team/{grant,kaye,mel}/layout.tsx` | `title: { absolute }` | Live titles read "Grant Tate \| BBTx Consulting \| BBTx" | Done (found during QA; not in the original brief) |
| Legacy URL | `next.config.ts` | **No change needed.** Redirect already existed; now covered by tests | See section 4 | Verified |
| Analytics | `lib/analytics.ts`, `app/components/ContactModal.tsx`, `app/components/TrackedLink.tsx` | `generate_lead` after an accepted contact submission; non-key `readiness_guide_assessment_click` | GA4 recorded zero key events | Done; GA4 setup remains (section 6) |
| Tests | `tests/seo/*.test.mjs`, `package.json` (`npm test`) | 60 tests: dates, schema, redirects, guide content and links, analytics, IndexNow | Repo had no test runner | Done |
| **Final:** guide authorship | `app/resources/ai-readiness-assessment/content.ts` | `GUIDE_AUTHOR_APPROVED_BY_GRANT` is `true`; byline "Dr. Grant Tate" linking to `/team/grant`; Article author is Grant's Person `@id`; publisher stays BBTx Consulting; publication date `2026-11-19`, no "Updated" | Grant approved the guide | Done (section 12.1) |
| **Final:** IndexNow | `public/<key>.txt`, `scripts/indexnow/*`, `.github/workflows/indexnow.yml`, `tsconfig.json` (one option), `docs/seo/indexnow.md` | Key file, post-deploy workflow, change detection, logging | Faster discovery by Bing and other participating engines | Built and tested locally; **needs merge to `main` to run** (section 12.3) |

---

## 2. Content changes in detail

### Leadership & Team Development
- New section after "Typical Engagements": five short subsections (where AI belongs in a decision; keeping judgment and accountability with people; challenging the output; uncertainty, trust and resistance; checking whether performance improved), an introduction, and a closing paragraph linking to AI Integration.
- Does **not** introduce a named workshop or training package. The closing paragraph points to the coaching, assessment feedback and facilitation already described in the page's "How We Work" step 03.
- Title: `Leadership Development & AI Leadership Consulting | BBTx`. Description rewritten to about 155 characters. The H1 and the broader leadership-system framework are unchanged.

### AI Integration & Innovation
- Title `AI Strategy Consulting & Integration | BBTx Consulting`; description exactly as proposed.
- Added the proposed explanatory paragraph under the existing intro. The headline, the five-part model and the page layout are unchanged.
- "Organizational AI Assessment" and "Transformational Strategy & Implementation Plan" descriptions follow the proposed direction.

### Organizational Assessment
- Title `Organizational & AI Readiness Assessment | BBTx`; description as proposed. The H1 and the organizational-diagnosis content are unchanged. No scoring method or validation is claimed.

### New guide: structure
The page text is the final editorial draft, verbatim; `content.ts` holds the copy and `page.tsx` renders it in the unchanged design. Sections: opening; what a readiness assessment examines; how to use the questions (separate answers from leadership, the people doing the work, and risk/data/IT; sort each as evidence, assumption or unknown; no total score); the 12 questions, each with body copy and an "Evidence looks like" line; patterns in the answers; a seven-line decision page; next steps with links to the Organizational Assessment and AI Integration pages; a closing CTA to the assessment page or a conversation with Grant (the existing Calendly link). No external frameworks, statistics, quotes or case studies are cited.

Differences from the previous version of the page: the "Why it matters / What to look for" labels became body copy plus "Evidence looks like:"; the "What this guide is, and is not" callout, the questions-section intro line, and the CTA sub-paragraph are gone because the new copy does not include them; the decision-record labels "Starting performance measure" and "Criteria for continuing, adjusting, or stopping" are now "Starting measure" and "Continue, adjust or stop"; Question 3 no longer says "or change"; the CTA heading is "Want a second perspective on your answers?".

The draft's `[EDITOR: …]` note does not render. It asked to confirm BBTx's assessment methods before naming them. The supplied copy names none, so there was nothing to add. What it does say (that a formal assessment compares what leaders believe is happening with what people actually experience, and that the gap is the most useful finding) matches the Organizational Assessment page: step 01 "Compare Perspectives" and its observation that the gap between perspectives "is itself diagnostic". That page's FAQ also confirms interviews, survey data, documents and conversations are part of the work, if the editors later want to name them.

---

## 3. Structured data changes

**Cause of "Unnamed item".** `inspect_urls` (OpenSEO, reading Search Console) returned a PASS verdict with `Breadcrumbs: Unnamed item` entries: **two** for `/services/ai-integration` and **one** for `/team/grant`. The two matched two competing `BreadcrumbList` scripts on every service page: a 2-item list from `app/services/layout.tsx` and the page's own 3-item list. The `ListItem`s were already named, so the "Unnamed" label refers to the `BreadcrumbList` object having no `name`.

**Fix.** `breadcrumbList()` (in `lib/seo/schema.ts`) always emits Home first, 1-based positions, named items, absolute canonical URLs, and a named list; it throws if an item has a blank name. Each page now emits exactly one.

**Verified on a local production build (15 pages checked):** every page has exactly one full Organization node, every non-home page has exactly one BreadcrumbList, last crumb equals the page canonical, all JSON-LD parses, no `[object Object]`.

**Not yet verified:** that Google drops the "Unnamed item" label. That needs a recrawl after release (see section 8).

Other schema notes:
- The Organization `name` is now "BBTx Consulting" with `alternateName: "BBTx"` (it was "BBTx"), matching the confirmed decision in `OPEN_DECISIONS.md` that the name is "BBTx Consulting" everywhere. The WebSite node follows. This can influence the site name Google displays; flag if you prefer to keep "BBTx".
- Article schema (blog posts and the guide) now references the Organization by `@id` instead of declaring a second, unlinked Organization. JSON-LD is escaped so an article title can never close the script tag.
- Blog `datePublished` is now date-only (`2026-02-26`) instead of `2026-02-26T00:00:00.000Z`; `dateModified` stays a full ISO timestamp.
- Grant's Person entity was already correct (`@id` `…/team/grant#person`, `worksFor` the Organization, referenced back by the Organization's `founder`). Not changed.
- The guide's Article now credits Grant's Person entity by `@id` (approved 2026-11-18); blog posts still use the Organization because they have no author field (section 7, item 8).

## 4. Redirect behavior

`/services/organizational-ai-assessment` already redirected to `/services/organizational-assessment` (rule in `next.config.ts`). Checked on both the live site and the local build: it returns **308 Permanent Redirect** to the current page. Next.js emits 308 for `permanent: true`; Google treats 308 and 301 as equivalent permanent redirects, so I left it. No stale internal links exist to the old URL in `app/`, `lib/`, or `components/`. The bare `bbtx.ai` host also redirects (308) to `https://www.bbtx.ai/`. Tests check that the rule exists, is permanent, points to a real page, is not part of a chain or loop, and that the old route has no page of its own.

## 5. Dates

Root cause: `blogs.published_date` is a Postgres `date`, which the Neon driver returns as a JS `Date` although `lib/admin/types.ts` types it as `string`. Passing it to `openGraph.publishedTime` rendered as `[object Object]`. The visible dates and JSON-LD were not broken, but formatting a `Date` in the browser's time zone could show the wrong day after hydration. `lib/seo/dates.ts` normalises once on the server to `YYYY-MM-DD`; display formatting uses UTC so server and browser agree. Missing or impossible dates return `null` and the element is hidden. Nothing assigns today's date to old posts.

Checked against all 11 published posts on the local build: every `article:published_time` and `datePublished` is `YYYY-MM-DD`; no `[object Object]` anywhere.

## 6. Analytics

- **Property and initialisation.** The live homepage includes `G-MQKV290MX7` and a single `gtag('config')` call; the ID comes from `NEXT_PUBLIC_GA_MEASUREMENT_ID` and there is only one `<GoogleAnalytics />`, in the root layout.
- **New: `generate_lead`**, fired in `ContactModal` only after `/api/contact` returns success, and not when the honeypot field was filled. Parameters: `lead_source: "contact_form"` and `inquiry_type` (a fixed dropdown value). **No name, email or message is sent.**
- **New: `readiness_guide_assessment_click`**, from the guide to the assessment page (body link and CTA button). Deliberately a separate, non-conversion event.
- **Not implemented, by design:** booking confirmation. Every "Book a call" link goes to `calendly.com/granttate` as a plain external link; there is no embed and no success callback from the site's side, so a confirmed booking cannot be detected honestly. Options are in the "Remaining setup" list below.
- **Consent.** The site has no consent banner or Consent Mode today, so nothing was changed or bypassed. If a banner is added later, `trackEvent` in `lib/analytics.ts` is the single place to gate.
- **Route changes.** The site relies on GA4 enhanced measurement (history-change page views), not custom code. I could not confirm that setting from the repository; check it in GA4.

**Remaining GA4 setup (cannot be done from the repo):**
1. After release, trigger one test contact submission and confirm `generate_lead` in GA4 DebugView.
2. In GA4 Admin, mark `generate_lead` as a **key event**. Leave `readiness_guide_assessment_click` unmarked.
3. Confirm enhanced measurement ("Page changes based on browser history events") is on.
4. Decide how to measure Calendly bookings (Calendly's GA4 integration for the booking page, or switch to an embed that exposes `calendly.event_scheduled`).

## 7. Editorial items

**Resolved on 2026-11-18**
1. **Approval and authorship.** Mel confirmed that Grant approved the guide and its attribution to him. `GUIDE_AUTHOR_APPROVED_BY_GRANT` is `true`. The first-person passages (the opening, Question 9) and the closing "conversation with Grant" CTA now sit under his name, as approved. This repository holds no record of the approval itself beyond that instruction, so keep it with your files.
2. **Name form.** The draft's "Dr. R. Grant Tate" is now "Dr. Grant Tate", the form used across the site, as Mel instructed. "R. Grant" no longer appears anywhere in the code.
3. **Publication date.** `GUIDE_DATE_PUBLISHED` is `2026-11-19`, the release day Mel chose, and is treated as first publication: no `dateModified`, no "Updated" label. If the deploy slips to another day, change that one constant first.

**Still open (editorial judgment, not blocking in code)**
4. **The twelve questions and the patterns are an editorial starting point, not a validated BBTx instrument.** The copy says "not a test with a score" and that the questions "will not tell you whether to adopt AI", but it no longer carries the earlier explicit "not a validated diagnostic" statement.
5. **Unsourced generalizations** in the draft, with no statistics behind them: "In many organizations, staff are already using AI tools with client, employee or financial information" (Q4), "it tends to cost the organization some of its best people" (Q3), "Most organizations have two versions of their processes" (Q6), "This is the most common result" (patterns).
6. **Wording on other pages that goes slightly beyond existing copy:** "the evidence behind planned AI investments" (AI Integration assessment description); "A more formal examination is available through our organizational and AI readiness assessment"; "Our role is the organizational side of adoption" (Implementation Support FAQ, which also implies BBTx does not build or deploy software); "how AI would affect actual work" (assessment description).
7. **The new Leadership section** makes no client claims but is written in BBTx's voice about management practice; Grant should confirm it reflects his view.
8. **Chaotic Confluence authorship.** Posts have no author field in the database, and on Substack they are bylined to the shared "ChaoticConfluence" account (one post, "The Polished Turd Problem", also lists Mel). Nothing in the data shows which posts are Grant's, so **no post was attributed to him and none was given a link to the guide.** The one clearly on-topic candidate is "Strategic Confluence: A Beginner's Guide to AI Implementation" (first person; covers named owners, data requirements and success metrics). If Grant confirms it is his, adding the link is a one-sentence edit in the admin editor. The post body lives in the production database, so it is a content edit, not a code change, and I did not make it.

---

## 8. QA results

| Check | Command / method | Result |
|---|---|---|
| Type check | `npx tsc --noEmit` | **Passed** (re-run after final edits) |
| Production build | `next build` in a throwaway copy of the repo (so your running dev server's `.next` is untouched) | **Passed**. One earlier attempt failed on a transient `next/font/google` download error; the retry on identical code passed |
| Unit tests | `npm test` (`node --test "tests/**/*.test.mjs"`) | **60 passed, 0 failed** (re-run after final edits) |
| Lint | `npx eslint` on all 48 changed or new `.ts`/`.tsx`/`.mts`/`.mjs` files | 6 errors in two files (`react/no-unescaped-entities`), **all pre-existing**: linting those files at `HEAD` gives the same 5 and 1. No new lint errors. A full-repo `npm run lint` was not run |
| Rendered HTML, local production server | Script over **all 35 sitemap URLs** against `next start` | 35/35 return 200. One Organization node on every page, identical everywhere; Grant's Person declared once (on `/team/grant`); at most one Article and one BreadcrumbList per page; every breadcrumb is named and ends on its canonical; no duplicate `@id` within a page; guide Article author is Grant, all 11 blog Articles stay Organization; no `[object Object]`. **No problems found** |
| Required link relationships | Same script, rendered `<a href>` | 5 of 5 present when checked; the profile-to-guide link was then removed on request, leaving 4 (section 12.2) |
| IndexNow | 25 tests, including the real script run against a fake origin and a fake IndexNow endpoint; then 3 consecutive runs of the real script against the real production build | All passed. 3 runs of the real script on the real build: baseline, then 0 changed / 35 unchanged twice, 0 submissions. Found and fixed a false-positive bug on the way (section 12.3). **The real IndexNow API was not called** |
| Blog dates | All 11 published posts, local build | **Passed** |
| Sitemap | `/sitemap.xml` locally | Lists the guide; no non-www URLs |
| Internal links | Rendered HTML for all 8 planned links, plus tests | All 8 present; every `href` in touched pages resolves to a real route |
| Legacy redirect | Live and local | 308 to the current page |
| **Not run** | Visual/browser review at desktop and mobile; screen-reader check; Lighthouse; Google Rich Results Test; GA4 DebugView; preview deployment | **Not performed.** No visual check was done, per your standing preference not to have me open Chrome to verify UI. The new guide page is the one most worth a look on a phone |

## 9. Remaining issues and things I noticed but did not change

- **Homepage meta description still says "100+ organizations served across 40+ years"**, and `/resources` says "across 100+ engagements". The project rules treat both as unverified; they predate this batch and I did not touch them.
- **`/digital-twin-snapshot` and `/links` still render a doubled title suffix** ("… | BBTx Consulting | BBTx", "BBTx | Links | BBTx"). Same one-line fix as applied elsewhere; left alone because those pages are outside this batch.
- **Organization `sameAs`** includes Grant's personal LinkedIn but not the BBTx company page (`linkedin.com/company/bridgebusinesstransformations/`, noted in `OPEN_DECISIONS.md`). An entity decision for you.
- **Blog `dateModified`** comes from `updated_at`, and many posts share the same bulk-update timestamps (27 and 28 July 2026), so it may not reflect real edits.
- **Resources grid** now has four cards on a three-column desktop grid, leaving one card on a second row. Not redesigned, per the brief.
- The Resources mega menu in the nav does not list the new guide; the guide is reachable from `/resources` and the assessment page.

## 10. Approval needed before production

1. Your review of the guide page on a real phone and desktop (nothing was visually verified).
2. ~~Confirm the release date~~ Done: `GUIDE_DATE_PUBLISHED` is `2026-11-19` (section 7, item 3). Change it only if the deploy slips.
3. Decision on the Organization name change and the `sameAs` question (section 9).
4. Merge to `main` and deploy. The work is committed and pushed to `seo/batch-1-ai-consulting` (2026-11-19), but nothing has been merged or deployed. The homepage testimonials layout change (`app/sections/Testimonials.tsx`) is its own separate commit on this branch and is unrelated to SEO.
5. The IndexNow steps in section 12.3 after the deploy.

## 11. After release

1. Re-inspect `/services/ai-integration`, `/team/grant`, and one blog post in Search Console; confirm the breadcrumb label and that dates read correctly.
2. Request indexing in Search Console for `/resources/ai-readiness-assessment` (and `/services/executive-recruitment`, still open from TECH-005). IndexNow does not notify Google.
3. Confirm `/sitemap.xml` includes the guide and the live titles match this document.
4. Complete the GA4 setup in section 6.
5. Run the IndexNow initial submission (section 12.3).
6. Re-run the baseline queries after several weeks, using the same date windows as the baseline.

---

## 12. Final additions (2026-11-18)

### 12.1 Guide authorship
- `content.ts`: `GUIDE_AUTHOR_APPROVED_BY_GRANT = true`; byline name "Dr. Grant Tate", role "Founder, BBTx Consulting" (as in the approved copy); `GUIDE_DATE_PUBLISHED = "2026-11-19"`. The approved article text is untouched.
- `page.tsx` already switched on the flag: the byline name is a link to `/team/grant`.
- Article JSON-LD: `author` is `{ "@type": "Person", "@id": "https://www.bbtx.ai/team/grant#person", name: "Grant Tate", url: "https://www.bbtx.ai/team/grant" }`; `publisher` is the BBTx Consulting Organization `@id`; `datePublished` `2026-11-19`; no `dateModified`.
- **One Person entity.** `lib/seo/schema.ts` now owns `GRANT_PERSON_ID`, `GRANT_PROFILE_URL` and `grantPersonReference()`. `/team/grant` declares the full node from those constants; the Organization's `founder` and the guide's `author` reference it by `@id`. A test fails if any other file hard-codes the `@id` or declares another Grant node. His visible "Dr." is the node's `honorificPrefix`, so the schema `name` stays "Grant Tate".

### 12.2 Internal links
| Relationship | How |
|---|---|
| Guide to Grant's profile | Byline link |
| Grant's profile to guide | **Removed on request (2026-11-18).** A "Writing" line was added under his bio and then taken out; `TeamProfilePage.tsx` and `team-data.ts` are back to their original state. **This relationship therefore does not exist.** The profile still carries his Person entity, which the guide's Article schema references |
| Guide to Organizational Assessment | Existing (body link and CTA) |
| Guide to AI Integration | Existing (next-steps paragraph) |
| Resources hub to guide | Existing card |

The other four were confirmed in the rendered HTML of the production build, and are asserted by tests. **Blog posts:** none were linked (section 7, item 8).

### 12.3 IndexNow
**Was it already configured?** Not in this repository: no key file, script, CI workflow, Vercel config or code (`docs/seo-aeo/IMPLEMENTATION_STATUS.md` only notes that Google does not use IndexNow). The GitHub repo has no workflows at all. Vercel has no native IndexNow feature. **I cannot see Bing Webmaster Tools or the OpenSEO project from here.** The OpenSEO connector does have a `submit_indexnow_urls` tool, which creates its own key on first use; I did not call it (it would have submitted pages that are not live), so a separate key may exist there. Two keys can coexist, but check before relying on both.

**What was built** (details in [`indexnow.md`](./indexnow.md)):
- `public/45f2817914aedcec61df37f7c47082a1.txt`, served at `https://www.bbtx.ai/45f2817914aedcec61df37f7c47082a1.txt`, containing exactly the key (32 chars, within the protocol's 8 to 128). The key is public by design.
- `.github/workflows/indexnow.yml`. Runs only (a) when Vercel reports a **successful Production** deployment (`deployment_status`, environment `Production`; checked against the repo's 68 existing Vercel deployments, all named `Production`), or (b) when someone starts it by hand **on `main`**. Never on push, pull request, preview, schedule or local build; `npm run build` does not touch it.
- `scripts/indexnow/submit.mts`: reads the live sitemap, fingerprints each page (title, description, canonical, robots, JSON-LD, headings, visible text, excluding nav, footer, scripts), compares with the last successful run, and submits only new, changed, or removed (now 404/410/redirect) canonical URLs to `https://api.indexnow.org/indexnow`. It checks that the key file is live first, retries only 429/5xx/network errors (3 attempts), and **advances its baseline only after a successful submission**, so a failure is retried by the next deploy. A run that would submit more than 25 URLs stops and asks for a deliberate `force` run.
- Logging: every run writes the response codes and bodies to the Actions log and step summary, and uploads `report.json`/`report.txt` as an artifact (90 days). Failures exit non-zero, so GitHub flags the run.
- Initial submission set (`scripts/indexnow/initial-urls.txt`): the guide, the five Batch 1 service pages and the Resources hub (7 URLs). `/team/grant` is not in it.
- The sitemap and Search Console setup are untouched.
- `tsconfig.json` gained `allowImportingTsExtensions: true` (the project already has `noEmit`), so the type checker accepts the `.mts` imports. Without it `tsc` and `next build` fail.

**Bug found by testing:** on dynamic pages (the blog) Next.js streams metadata, so the same unchanged page is served sometimes with `<title>` in `<head>` and sometimes with it in `<body>`. The first fingerprinting counted the stray title text as content, so unchanged posts looked "changed" from one request to the next. Fixed (title is excluded from body text), covered by a regression test that fails without the fix, and checked against 23 real captured response pairs (23/23 now identical).

**Not verified, because it can't be from a local machine:**
- That Vercel's real `deployment_status` event starts the workflow (the filter matches the environment names GitHub already records, but the first Production deploy after merge is the real test; if it does not start, nothing is submitted, which is the safe failure).
- That the IndexNow API accepts the key. This needs the key file live on `www.bbtx.ai`; a `403` or `422` in the run log would mean it is not. Nothing was sent to IndexNow.

**Deployment requirements, in order:**
1. Merge to `main` and let Vercel deploy. GitHub only runs `deployment_status` and manual workflows from the default branch.
2. Open `https://www.bbtx.ai/45f2817914aedcec61df37f7c47082a1.txt` and confirm it shows the key.
3. The first automatic run records a baseline and submits nothing (look for the warning in the run). Then GitHub, Actions, IndexNow, **Run workflow**, mode `initial` (tick `dry_run` first if you want to see the list). Expect HTTP 200 or 202 in the summary.
4. Optionally confirm in Bing Webmaster Tools that the submission was received.
5. After that it needs no action. Limits to know: posts published from the admin without a deployment are not submitted automatically (run it by hand with mode `urls`), and if more than 90 days pass between runs the baseline expires and the next run starts a new one.

IndexNow is for Bing, Yandex, Seznam, Naver and other participating engines. It does not replace Google's indexing (use Search Console for that).
