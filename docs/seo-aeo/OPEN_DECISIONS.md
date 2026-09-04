# Open Decisions

Only decisions that materially block or alter implementation. Each entry states the recommended default, consequences, evidence, owner, and the tasks it blocks.

## DEC-001 / H-001 — Primary positioning statement

**Status: APPROVED** (Grant + Mel, confirmed 2026-07-28)

> BBTx Consulting helps leaders and organizations make better decisions, align their people, and turn strategy into sustained execution — guided directly by Dr. Grant Tate's decades of executive leadership, organizational transformation, and coaching experience. AI is an enabling capability, not the category.

This resolves the report's central strategic question (report pp. 2, 20, 33). It does **not** pre-approve specific on-page wording. AUT-002 (Grant authority page) and SER-00x (service page copy passes) still need a final wording review against this statement before publishing — the decision is the *position*, not a blank check on phrasing.

**Unblocks:** profile/service-page copy drafting work can now proceed to the drafting stage; publishing still requires a wording sign-off per task.

**POS-002 (homepage rewrite) — DECLINED, 2026-07-28.** Three drafts were tried (report-style rewrite, light-touch word swaps, an "AI amplifies Grant" middle version); Mel rejected all three and confirmed the current homepage copy ("AI Business Consulting for Leaders and Organizations," the AI-powered-initiatives hero subhead, the AI-focused FAQ answer) stays as-is. This is a deliberate scope narrowing of DEC-001, not an oversight: the approved position statement now governs *new* surfaces (Grant's authority page, service pages, future profile copy) rather than requiring a rewrite of the existing homepage. Do not re-propose a homepage rewrite without Mel raising it first. If asked why the homepage still reads AI-first despite DEC-001, this is why.

## OPEN-001 — Exact "100+ organizations" claim wording and evidence (H-005)

**Scope corrected 2026-07-31** — this claim is live in far more places than originally logged here. Full current count, confirmed by repo-wide search:

- `app/page.tsx` (homepage meta description)
- `app/sections/Hero.tsx` (homepage H1-adjacent subhead)
- `app/sections/Results.tsx` (homepage trust line)
- `app/components/Nav.tsx` (Resources dropdown description — renders on **every** page, not homepage-only)
- `app/whitepapers/layout.tsx` (meta description + OG description)
- `app/whitepapers/WhitepapersExperience.tsx` (visible page copy)
- `app/resources/page.tsx` (meta description)
- `app/services/page.tsx` ("More than 100+ organizations" — also just awkward doubled-up phrasing independent of the verification question)
- `app/services/implementation-support/page.tsx` (visible page copy)

The report explicitly flags this as unverified and recommends separating total organizations served (historical, all consulting work) from AI-specific engagement counts (report p. 11, p. 32).

- **Recommended default:** do not change the number without evidence; separate it into two claims — one for total career client relationships, one (smaller, precise) for AI-enabled engagements — once Grant confirms the real counts. When the correction ships, it needs to ship across all 9 files above, not just Hero/Results.
- **Consequence of inaction:** the claim ships in POS-002/homepage rewrite without correction, carrying legal/credibility risk the report specifically calls out — and the more places it's copy-pasted, the more places a future correction has to touch.
- **Owner:** Grant + Mel.
- **Blocks:** POS-002 (homepage rewrite), any Grant authority page proof section, GBP description (GBP-002).

## OPEN-002 — Should `/team/grant` absorb `/about`'s career timeline, or build a new `/grant-tate` page?

`app/about/page.tsx` already has a detailed timeline (IBM PC launch in Europe/Canada, Netherlands consulting practice, 20-year US practice, ChatGPT-era pivot) that isn't surfaced on `app/team/grant` (currently 3 generic sentences via `app/team/team-data.ts`). The report recommends a dedicated `/grant-tate/` authority page with `Person`/`ProfilePage` schema (report p. 21, p. 25) — but the repo already has `/team/grant` as the live, indexed, sitemap-listed URL for Grant.

- **Recommended default:** expand `/team/grant` in place (rather than create a new `/grant-tate` route) to avoid unnecessary URL churn per the addendum's redirect rule, folding in the `/about` timeline content plus new career evidence from AUT-001's interview. Keep `/about` as the company-history page, or consider whether it becomes redundant once `/team/grant` is complete.
- **Consequence of inaction:** Grant's strongest proof stays split across two under-linked pages, keeping the "authority page" backlog item (AUT-002) blocked on a URL decision it doesn't actually need to be blocked on.
- **Owner:** Mel (URL/architecture call), Grant (content).
- **Blocks:** AUT-001, AUT-002.

## OPEN-003 — Dedicated `/case-studies` hub vs. continuing to embed testimonials inline

The report calls for a case-study hub, template, and 2–4 outcome-based cases before scaling content (report p. 15, p. 21, p. 25–26). Today there is no case-studies route at all — client proof lives only as short quotes in `app/sections/Testimonials.tsx` (General Atomics, Accenture, Lincoln Surveying, InBio, and others), reused across the homepage and four service pages.

- **Recommended default:** build the hub per the report's template (situation/stakes/role/method/decisions/implementation/outcome/client voice), starting with Lincoln Surveying and InBio as the report suggests — contingent on CAS-002 (client permission and outcome verification), which is a human task.
- **Consequence of inaction:** BBTx keeps citing named clients without any page that proves outcomes, which is exactly the differentiation gap the report identifies against competitors like MindSalt.
- **Owner:** Grant (permission/facts) + Mel/Claude (build).
- **Blocks:** CAS-001, CAS-003, NAV-001 (internal linking depends on the hub existing).

## OPEN-004 — Analytics/measurement account access (H-003)

There is currently **no analytics implementation of any kind** in the repo — no GA4, GTM, measurement ID, or consent banner. `app/cookies/page.tsx` explicitly states "we do not currently use analytics cookies." This is a wider gap than the report assumed (it planned to audit *existing* tags for conflicts; there's nothing to conflict with, but also nothing to build on).

- **Recommended default:** treat GA4/GSC setup as fully greenfield. Needs a Google account with authority to create/authorize a GA4 property and Search Console verification before any code changes (env vars, tag injection, event wiring).
- **Consequence of inaction:** BBTx has zero first-party visibility into what's already happening (traffic, conversions, query data) — the report's own required first step ("export the baseline") isn't possible yet.
- **Owner:** Mel (account creation/authorization).
- **Blocks:** DAT-001 through DAT-004, CON-002, AEO-003, and all of Phase 6's KPI review.

**Update, 2026-09-03 — Mel clarified account structure:** the GSC property sits under Mel's Google Workspace domain account; Grant is the owner. **Google Cloud Console access is prohibited** on that account (Workspace admin policy — scope not yet confirmed: unclear whether this blocks Cloud Console only for accounts inside that Workspace org, or more broadly). This rules out the plan floated the same session (create an OAuth client directly in that account's GCP project for a Search Console MCP server).

**Update, 2026-09-04 — GSC half RESOLVED.** Read access to Search Console is live via a Search Console MCP server, authenticated as `devmelo2003@gmail.com` (`siteRestrictedUser` scope) on `sc-domain:bbtx.ai` — an account outside the restricted Workspace org, so the Cloud Console block never came into play; no OAuth client was created inside Mel/Grant's Workspace account. First API-based pull performed the same day (`GSC_HEALTH_2026-09-04.md`), which also resolved OPEN-008. This unblocks DAT-005's GSC half, TECH-005, and ongoing GSC-based audits (AEO-001). **Still open:** GA4 Data API access for internal reporting — untouched this session, no account/scope established. `siteRestrictedUser` is read-only, so anything requiring GSC write access (sitemap submission via API, URL removal requests) would need a separate, higher-scoped grant.

## OPEN-005 — Chamber, LinkedIn, and GBP ownership/access status (H-008 / H-009)

**GBP: RESOLVED, 2026-09-04.** Mel confirmed manager access is working and applied live corrections to the listing the same day (description, primary/secondary category, LinkedIn social link — see `IMPLEMENTATION_STATUS.md` GBP-001/GBP-002). Remaining GBP-002 items (website protocol, old-entity social removal, service area, hours, veteran/women-owned confirmation) are execution detail, not an access question anymore.

**LinkedIn: partially resolved, 2026-09-04.** The company page was located — `linkedin.com/company/bridgebusinesstransformations/` (37 followers, already named "BBTx Consulting," old AI-first tagline/cover image/URL slug). Grant is **not** an admin; the likely admin is a dormant "R. Grant" account. Mel filed a LinkedIn admin-access request 2026-09-04. Corrected copy for both the company page and Grant's personal profile is fully drafted (`ENT_PROFILE_DRAFTS_2026-09-04.md` §2/§2a) and ready to apply the moment access lands. Do not create a new company page — this one carries the followers and Google's existing cross-reference to it.

**Chamber: still not verified** — no account access available to Claude Code, and Mel/Grant haven't logged into the member dashboard yet. The 2026-09-04 AEO baseline confirmed the report's concern is current and worse than described: the live profile links to a Circle.so community (not bbtx.ai) and carries an active "AI Explorers" membership checkout in its header, on top of the AI-first description and obsolete category list (report p. 12, p. 22–23). Corrected copy is fully drafted and paste-ready (`ENT_PROFILE_DRAFTS_2026-09-04.md` §1) — the only remaining blocker is the login.

- **Recommended default:** Mel/Grant get Chamber member-dashboard login and LinkedIn admin access; both corrections are pre-written and ready to paste in.
- **Owner:** Mel + Grant.
- **Blocks:** ENT-002 (Chamber login), ENT-003 (LinkedIn admin access).

## OPEN-006 — Calendly as the long-term booking asset

The site's only consultation CTA (`"Schedule a Consultation"`, 7 call sites) links to `https://www.calendly.com/granttate` — Grant's personal Calendly link, not a BBTx-branded or team-wide scheduling asset. The report's recommended CTA is "Talk with Grant," which doesn't appear verbatim anywhere in the current code (current label is "Schedule a Consultation").

- **Recommended default:** confirm this personal Calendly link is intentional and durable (not tied to Grant's personal account in a way that complicates future team scheduling), and decide whether to rename the CTA label to match the report's "Talk with Grant" framing as part of CON-001.
- **Owner:** Grant + Mel.
- **Blocks:** CON-001.

## OPEN-007 — Orphaned `/api/assessment` route

`app/api/assessment/route.ts` still exists (multi-step questionnaire schema) but no page references it — `/assessment` permanently redirects to `/digital-twin-snapshot` in `next.config.ts`, and no component calls this API route. Low priority, not report-driven, flagged here only so it isn't mistaken for live functionality.

- **Recommended default:** leave as-is for now; revisit for deletion in a general code-cleanup pass, not an SEO/AEO task.
- **Owner:** Mel.
- **Blocks:** nothing — informational only.

## OPEN-008 — GSC property predates the documented "greenfield" assumption

**Status: RESOLVED** (2026-09-04, via the first API-based GSC pull — `GSC_HEALTH_2026-09-04.md`).

`sc-domain:bbtx.ai` is a **Domain property** covering www/apex/http in one. The API confirms search-performance history begins **2026-03-22** and the sitemap was first submitted **2026-03-23** — a normal pre-project sitemap submission, not an unexplained earlier property or a second account. No further action needed; the property is the correct one to keep using.

`IMPLEMENTATION_STATUS.md` (DAT-001, written 2026-07-28) and `OPEN-004` both stated no GA4/GSC property existed yet. Mel's manual Search Console export (Coverage report, pulled 2026-07-30) shows index-coverage data going back to **2026-04-30** — three months before that note was written, and before this SEO/AEO project started. A verified GSC property must already have existed by then.

- **Owner:** Resolved — no further owner needed.
- **Blocks:** Nothing further. See `BASELINE_2026-07-30.md` and `GSC_HEALTH_2026-09-04.md`.

## OPEN-011 — Off-site entity/profile correction gate (facts only Grant can confirm)

Raised by the 2026-09-04 entity-correction drafting pass (`ENT_PROFILE_DRAFTS_2026-09-04.md`, prompted by the AEO baseline showing the practice under 6 different names — see `AEO_BASELINE_2026-09-04.md`). All corrected copy for Chamber/LinkedIn/GBP is written and paste-ready; these are the remaining fact gates before any of it ships. (Founder-vs-co-founder and the IBM PC/Europe career details are the same open conflicts already tracked under AUT-001 — not duplicated here.)

1. **Exact business name** — "BBTx Consulting" everywhere? Legal entity/DBA situation — is "The Bridge, Ltd" still the registered entity behind it?
2. **Phone** — is (434) 466-4655 current and correct for public listings?
3. **Address** — is 184 Brookwood Dr an office or a home address? Drives the GBP hide-address call (service-area business vs. a listed storefront).
4. **Veteran-owned / women-owned** — the GBP attributes are currently both set. Remove any that aren't literally true.
5. **paradigmassociates.us** — **DONE, 2026-09-05**: Mel applied the edit (BBx → "BBTx Consulting," linked to `https://www.bbtx.ai/`); live-verified. See `ENT_PROFILE_DRAFTS_2026-09-04.md` §4. Two sub-facts on that same page still need Grant before touching: (5a) whether "Bridgewater Research Group (BRG)" — described there as European-Union distance education — is still active/related to BBTx, and (5b) "Executive Director of the Connecticut Institute of Technology" — checked 2026-09-05: the real institution by that name is a University of New Haven hub that launched in 2020, decades after Grant's bio places this role, so it can't be the same thing; a search result that looked like confirmation traced back to the same single source (paradigmassociates.us) rather than independent corroboration. Likely an error, possibly confused with AUT-001's CATEC (Charlottesville, VA). Don't repeat elsewhere until Grant confirms.

- **Recommended default:** none — these are factual/ownership calls only Grant can make. Nothing in `ENT_PROFILE_DRAFTS_2026-09-04.md` ships until he confirms.
- **Consequence of inaction:** the paste-ready Chamber/LinkedIn/GBP corrections stay in draft indefinitely, and the entity fragmentation the AEO baseline found (0/8 non-branded discovery prompts naming BBTx) doesn't improve.
- **Owner:** Grant (with Mel relaying).
- **Blocks:** ENT-001 (canonical entity record finalization), the remaining GBP-002 items, and publishing the ENT-002/ENT-003 drafts once account access exists.

## OPEN-009 — Canonical domain mismatch: `bbtx.ai` (code) vs `www.bbtx.ai` (live)

**Status: RESOLVED** (Mel, 2026-07-31) — confirmed `www.bbtx.ai` as the long-term canonical domain, matching Vercel's actual production URL. Every hardcoded `https://bbtx.ai` reference across the repo (29 files: `metadataBase`, sitemap, robots, every route's canonical/OG, all JSON-LD `@id`s, transactional email templates) has been updated to `https://www.bbtx.ai`. Not yet committed/deployed — see `IMPLEMENTATION_STATUS.md` TECH-002. Once deployed, monitor Search Console for index consolidation onto www (a short-lived ranking dip during consolidation is possible per the original analysis below).

Every canonical/sitemap/OG reference in the repo (`app/layout.tsx` `metadataBase`, `app/sitemap.ts` `BASE_URL`, `app/robots.ts` sitemap URL) declares `https://bbtx.ai` (apex, no www) as the site's identity. But Vercel's project config (`vercel project ls`, confirmed 2026-07-30) shows the actual **Production URL is `https://www.bbtx.ai`**, and live redirect behavior confirms it:

- `https://bbtx.ai/*` → 307 → `https://www.bbtx.ai/*`
- `http://bbtx.ai/*` → 308 → `https://bbtx.ai/*` (then 307 again to www)
- `http://www.bbtx.ai/*` → 308 → `https://www.bbtx.ai/*`
- `https://www.bbtx.ai/*` → 200 (this is the only URL that doesn't redirect)

Search Console's Coverage report shows this has already split the index: top pages (`/`, `/about`, `/services/organizational-ai-assessment`, `/blog`) are indexed under the **apex** (no-www) URL and earn nearly all clicks/impressions, while many other pages are indexed under the **www** URL earning far less. This is almost certainly the source of the 4 "Alternate page with proper canonical tag" + 2 "Page with redirect" issues in the same report (see `BASELINE_2026-07-30.md`).

- **Recommended default:** update the code to declare `https://www.bbtx.ai` as canonical everywhere (metadataBase, sitemap, robots.txt, OG url, any hardcoded `https://bbtx.ai` references), matching Vercel's actual production domain — rather than flipping Vercel's primary domain setting. This is the lower-risk direction: it's a normal reviewable code diff instead of a live production domain/routing change, and it doesn't touch DNS.
- **Open question this doesn't resolve on its own:** Google is currently ranking the apex versions of the top pages best. Switching canonical to www should make Google consolidate onto www over time, but there's a real (if usually short-lived) risk of a temporary ranking dip during consolidation. Mel/Grant should confirm they're fine with `www.bbtx.ai` as the long-term brand domain before this ships — if not, the alternative is changing the Vercel primary domain to apex instead, which is a Mel-only action Claude can't perform.
- **Owner:** Mel (domain/brand call), Claude (implementation once decided).
- **Blocks:** TECH-002.

## OPEN-010 — Gumroad listing content bugs (not fixable from this repo)

While researching real course copy for the new `/courses` page (CRS-001, 2026-08-08), two content-accuracy bugs were found on the live Gumroad listings themselves (`chaoticconfluence.gumroad.com`), not in this repo:

1. The "Making Modern Managers — Self-Paced Learning" ($499, `/l/gjwijk`) and "— Group Cohort" ($999, `/l/erqvm`) product pages both carry body copy duplicated verbatim from the "— Individual Coaching" ($3,500) page — wrongly describing "six one-on-one coaching sessions with Grant" and "you'll receive a link to book your first session," which isn't part of either of those two tiers.
2. Three of the five AI-course Gumroad pages (`AI for Leadership and Organizational Transformation`, `AI Implementation for Business Value`, `AI-Empowered Coaching & Consulting`) cross-sell two course titles — "Introduction to Generative AI ($99)" and "Mastering Prompt Patterns ($99)" — that don't match any of the 5 real, currently-listed AI course names. Likely stale copy from an earlier naming pass.

Neither is being reproduced on bbtx.ai (`/courses` gets fresh, accurate copy for the Self-Paced tier; the AI-course cross-sell references are dropped). Claude Code has read access to these listings via an authenticated browser session but is not authorized to edit them.

- **Recommended default:** Grant/Mel correct the Self-Paced and Group Cohort page bodies on Gumroad directly (shortest fix: replace with tier-appropriate copy — no coaching sessions, self-paced access to the same 17-chapter program), and update or remove the two stale cross-sell references.
- **Consequence of inaction:** Gumroad checkout pages keep describing the wrong product to buyers who click through from bbtx.ai — a real buyer-facing accuracy problem, independent of anything in this repo.
- **Owner:** Grant (Gumroad account access).
- **Blocks:** Nothing in this repo — informational, flagged so bbtx.ai copy isn't drafted from the broken source.
