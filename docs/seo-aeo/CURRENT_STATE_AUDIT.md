# Current State Audit

Factual repository state as of 2026-07-28, gathered by direct inspection (not from the report). Where the report's findings and the repo disagree, the repo wins and the conflict is noted.

## Architecture

- **Framework:** Next.js 16.1.6 (App Router), React 19.2.3, TypeScript, Tailwind CSS 4.
- **Content model:** no headless CMS. Content (blog "Chaotic Confluence" posts, whitepapers, contact/newsletter submissions) lives in a self-built admin system backed by Neon Postgres (`lib/db.ts`, `lib/neon-schema.sql`, `lib/admin/queries.ts`). Blog editor uses Tiptap (`@tiptap/*`). Admin auth via `jose` + custom session cookie (`lib/admin/session.ts`). Legacy/unused schema files (`lib/supabase-schema.sql`, `lib/admin-schema.sql`) and Supabase env vars remain in `.env.local` but are not the active DB client.
- **Deployment:** Vercel (`.vercel/` present).
- **Testing:** no test suite. `package.json` scripts are `dev`, `build`, `start`, `lint` only. No `typecheck` script (`next build` runs the TS compiler as part of the build). No Jest/Vitest/Playwright dependency.
- **Key third-party deps:** `@anthropic-ai/sdk` (Digital Twin Snapshot generation), `resend` (transactional email), `@vercel/blob` (uploads), `react-calendly`, `zod`, `react-hook-form`.

## Route inventory (relevant to SEO/AEO)

| Route | Purpose | Metadata | Notes |
|---|---|---|---|
| `/` | Homepage | title/description/canonical, no per-page OG image override | Still "AI Business Consulting" framing — see Positioning below |
| `/services`, `/services/strategy-advisory`, `/services/organizational-assessment`, `/services/leadership-development`, `/services/implementation-support`, `/services/ai-integration` | Commercial service pages | Each has its own title/description/OG/canonical via sibling `layout.tsx` | Slugs differ from the report's suggested `/services/strategic-planning/` etc. — see OPEN decision on URL strategy in the backlog |
| `/about` | Company/founder timeline | title/description/OG/canonical | Has the richest career-history content on the site (IBM PC launch, Netherlands practice, 20-year US practice) — not surfaced elsewhere |
| `/team/grant`, `/team/kaye`, `/team/mel` | Individual bios | title/description/OG/canonical per `layout.tsx` | Grant's bio here is 3 generic sentences (`app/team/team-data.ts`), thinner than `/about` |
| `/coaching` | Paid coaching offer (Gumroad checkout, 2 tiers) | fixed via `layout.tsx` (recently added, see below) | Not AI-specific |
| `/whitepapers` | Whitepaper hub, DB-backed | title/description/OG/canonical | **No longer an empty shelf** — 3 published papers across Leadership, Strategy, and AI Leadership categories |
| `/chaotic-confluence`, `/chaotic-confluence/[slug]` | Blog/newsletter, DB-backed | dynamic `generateMetadata()` per post incl. `Article` JSON-LD | Broader-than-AI topics already (leadership, philosophy, human implications of AI) |
| `/resources` | Hub linking Digital Twin Snapshot, Whitepapers, Chaotic Confluence | title/description only | **No canonical, no OpenGraph, missing from sitemap** |
| `/links` | Link-in-bio style page | title/description only | **No canonical, no OpenGraph, missing from sitemap** |
| `/digital-twin-snapshot` | Free self-serve AI-generated "strategic snapshot" lead tool | title/description/OG/canonical | Ends in a "Talk to BBTx About the Full Process" CTA → opens the contact modal, not a direct Calendly link |
| `/privacy`, `/terms`, `/cookies` | Legal pages | title/description only | **No canonical, no OpenGraph** |
| `/newsletter` | Newsletter signup | has metadata | — |
| `/admin/**` | Internal CMS | no metadata (expected) | Blocked via `robots.ts` and requires auth via `middleware.ts` |

## Current public positioning found in code (still accurate vs. the report)

**Still exactly as the report describes — no post-report commit touched this:**
- `app/page.tsx` metadata: `"BBTx | AI Business Consulting for Leaders and Organizations"`; description repeats "100+ organizations served... AI-powered initiatives."
- `app/sections/Hero.tsx`: eyebrow "40+ Years of Executive Coaching & Business Consulting"; H1 "Helping leaders and organizations transform their work with 40+ years of experience"; subhead reiterates "100+ organizations... AI-powered initiatives... measurable results in as little as 12 weeks."
- `app/sections/FAQ.tsx`: still AI-forward, including "Do you work with organizations that have already started AI initiatives?"
- `app/sections/Results.tsx`: "Trusted by 100+ companies across industries."
- Homepage JSON-LD (`app/page.tsx` lines ~22–75): `Organization` description repeats "AI business consulting for leaders and organizations."
- Confirmed live on bbtx.ai — identical.

**Already ahead of the report's diagnosis:**
- Homepage Services section (`app/sections/Services.tsx`) already leads with "Strategy and Advisory Services" as the featured card, with "AI Integration and Innovation" as one of four supporting cards, not the lead.
- All 5 service pages already frame AI as one dimension of organizational capability (e.g., AI Integration page H1: "Most organizations don't have an AI problem. They have an organizational capability problem AI happens to expose"), not the primary discipline.

**Stale in the report (already resolved):**
- Whitepapers: no longer an "empty shelf." 3 published papers now span Leadership, Strategy, and AI Leadership.

**Partially stale:**
- Grant's bio is thin on `/team/grant` but a much richer timeline already exists on `/about`, just not cross-surfaced.

## Analytics / SEO / schema implementation

- **Analytics:** none. No GA4, GTM, gtag, measurement ID, or third-party analytics package anywhere in the repo (`app/layout.tsx` injects no third-party scripts). `app/cookies/page.tsx` explicitly states no analytics or advertising cookies are used. No consent-management banner/component exists.
- **Metadata:** no shared metadata helper/util; every route hand-defines its own `export const metadata` object following the same shape. Gaps: `/privacy`, `/terms`, `/cookies`, `/resources`, `/links` have title/description only, missing canonical and OpenGraph.
- **Sitemap:** `app/sitemap.ts`, dynamic, recently cleaned up (commit `ac725ff`). Missing `/resources` and `/links`.
- **Robots:** `app/robots.ts`, dynamic. Disallows `/admin`, `/admin/`, `/api/`. No other rules.
- **Structured data:** only two implementations exist — homepage `WebSite`/`Organization`/`SiteLinksSearchBox` (`Organization.sameAs` is an empty array), and blog post `Article` schema (author/publisher hardcoded to `Organization`, not `Person`). No `Person`, `Service`, `BreadcrumbList`, `FAQPage`, or `LocalBusiness` schema exists anywhere, despite real individual bios, real service pages, and a real FAQ component that could back all four.
- **Redirects:** one — `/assessment` → `/digital-twin-snapshot` (`next.config.ts`). `middleware.ts` only handles `/admin` auth gating, not public-route SEO redirects.
- **Images:** default OG image `public/oglogo.webp` (1200×630), favicon `app/icon.png` wired through `metadata.icons`. No `public/favicon.ico`, no `app/manifest.ts`.
- **llms.txt:** does not exist. Per the report (citing Google's own July 2026 guidance, G02), this is correctly not a priority — Google does not use it as a ranking signal.

## Forms / lead capture

- **Contact** (`app/api/contact/route.ts`): name/email/inquiry-type/message + honeypot field. No source/UTM field. Emails `grant@bbtx.ai`.
- **Newsletter** (`app/api/newsletter/route.ts`): email + a hardcoded `source` string set per call site (`"modal"`, `"footer"`, `"newsletter-page"`) — the only lightweight origin-tracking anywhere in the codebase, not a real UTM parameter.
- **Digital Twin Snapshot** (`app/api/digital-twin-snapshot/route.ts`): no email/name captured at submission; captured later via `app/api/digital-twin-email/route.ts` when the user requests the PDF. No UTM field.
- **Whitepaper downloads** (`app/api/whitepapers/download/route.ts`): email capture, no UTM field.
- **No UTM/gclid/fbclid/referrer capture exists anywhere** in the codebase.
- **Primary consultation CTA:** "Schedule a Consultation" → `https://www.calendly.com/granttate` (Grant's personal Calendly), used at 7 call sites. The exact phrase "Talk with Grant" (the report's recommended CTA label) does not appear anywhere in the code.

## Client proof

- `app/sections/Testimonials.tsx` contains named, quoted testimonials from General Atomics, Accenture, Lincoln Surveying, and InBio (plus 3 others) — reused across the homepage and 4 service pages. No dedicated case-studies page/route exists.

## Conflicts, risks, and unknowns

1. **Conflict:** the report's whitepaper finding ("no papers live yet") is stale — resolved by the post-report blog-CMS commit. The traceability matrix and backlog mark this task as already-done rather than open.
2. **Conflict:** the report evaluated Grant's bio broadly; in the repo, the thin bio is specifically on `/team/grant`, while richer content already exists on `/about`. This is a cross-linking/consolidation gap, not a from-scratch content gap.
3. **Risk:** the "100+ organizations... AI-powered initiatives" claim ships live today, unverified, exactly as the report warns (H-005, OPEN-001).
4. **Risk:** zero analytics means there is no first-party baseline to segment branded/non-branded or qualified/unqualified traffic before any target-setting, as the report requires (report p. 31).
5. **Unknown:** live status of the Chamber, LinkedIn company, and Google Business Profile listings could not be verified from inside the repo — these are external accounts (OPEN-005).
6. **Unknown:** whether the current `Calendly` link (Grant's personal account) is the intended long-term booking asset (OPEN-006).
7. **Minor/informational:** an orphaned `app/api/assessment/route.ts` has no page referencing it; not a report-driven task (OPEN-007).
