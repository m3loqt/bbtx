# Open Decisions

Only decisions that materially block or alter implementation. Each entry states the recommended default, consequences, evidence, owner, and the tasks it blocks.

## DEC-001 / H-001 — Primary positioning statement

**Status: APPROVED** (Grant + Mel, confirmed 2026-07-28)

> BBTx Consulting helps leaders and organizations make better decisions, align their people, and turn strategy into sustained execution — guided directly by Dr. Grant Tate's decades of executive leadership, organizational transformation, and coaching experience. AI is an enabling capability, not the category.

This resolves the report's central strategic question (report pp. 2, 20, 33). It does **not** pre-approve specific on-page wording. AUT-002 (Grant authority page) and SER-00x (service page copy passes) still need a final wording review against this statement before publishing — the decision is the *position*, not a blank check on phrasing.

**Unblocks:** profile/service-page copy drafting work can now proceed to the drafting stage; publishing still requires a wording sign-off per task.

**POS-002 (homepage rewrite) — DECLINED, 2026-07-28.** Three drafts were tried (report-style rewrite, light-touch word swaps, an "AI amplifies Grant" middle version); Mel rejected all three and confirmed the current homepage copy ("AI Business Consulting for Leaders and Organizations," the AI-powered-initiatives hero subhead, the AI-focused FAQ answer) stays as-is. This is a deliberate scope narrowing of DEC-001, not an oversight: the approved position statement now governs *new* surfaces (Grant's authority page, service pages, future profile copy) rather than requiring a rewrite of the existing homepage. Do not re-propose a homepage rewrite without Mel raising it first. If asked why the homepage still reads AI-first despite DEC-001, this is why.

## OPEN-001 — Exact "100+ organizations" claim wording and evidence (H-005)

The homepage (`app/sections/Hero.tsx`, `app/sections/Results.tsx`) and homepage metadata (`app/page.tsx`) currently state "100+ organizations" served and "100+ companies" trusted, tied to "AI-powered initiatives." The report explicitly flags this as unverified and recommends separating total organizations served (historical, all consulting work) from AI-specific engagement counts (report p. 11, p. 32).

- **Recommended default:** do not change the number without evidence; separate it into two claims — one for total career client relationships, one (smaller, precise) for AI-enabled engagements — once Grant confirms the real counts.
- **Consequence of inaction:** the claim ships in POS-002/homepage rewrite without correction, carrying legal/credibility risk the report specifically calls out.
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

## OPEN-005 — Chamber, LinkedIn, and GBP ownership/access status (H-008 / H-009)

Not yet verified from inside this session (no account access available to Claude Code). The report describes the Chamber profile as using an obsolete "AI Explorers Circle" checkout URL and AI-first description (report p. 12, p. 22–23), and the LinkedIn company tagline as "Exploring AI for Professionals" (report p. 11). These could not be confirmed or refuted by reading the repo, since they're external profiles.

- **Recommended default:** Mel/Grant confirm current login access to Chamber, LinkedIn company page, Grant's personal LinkedIn, and Google Business Profile before ENT-002/ENT-003/GBP-001 begin.
- **Owner:** Mel + Grant.
- **Blocks:** ENT-002, ENT-003, GBP-001, GBP-002.

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
