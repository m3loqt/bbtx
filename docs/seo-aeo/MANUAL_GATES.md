# Manual Gates

Adapted from `MANUAL_ACTIONS_AND_GATES.md` to this repo's actual stack and confirmed unknowns. Claude Code must stop or mark a task blocked when any of these is unresolved. No secrets are stored here.

| Gate | Required human action | Why Claude cannot substitute | Unlocks | Status |
|---|---|---|---|---|
| H-001 | Approve the primary positioning statement | Business choice, not a code inference | Homepage, profiles, services, founder page copy | **RESOLVED** — see `OPEN_DECISIONS.md` DEC-001 |
| H-002 | Confirm legal/public entity details: exact business name, address eligibility, service area, phone, hours | Incorrect local data creates trust/policy problems | `LocalBusiness` schema, GBP, citations | OPEN |
| H-003 | Authorize GA4, GSC, GBP, booking/form data, CRM, DNS access | External systems require ownership/OAuth/admin permission | Baselines, instrumentation, profile changes, deployment | OPEN — confirmed **no GA4/GTM property exists yet at all** (repo has zero analytics code); this is greenfield account creation, not just access-granting |
| H-004 | Define a qualified lead + accepted source/conversion taxonomy | Commercial fit is a business decision | Measurement plan, dashboard | OPEN |
| H-005 | Confirm precise wording/evidence for "100+ organizations" and AI-engagement claims | Public claims must be documentable | Homepage, proof sections | OPEN — see `OPEN_DECISIONS.md` OPEN-001 |
| H-006 | Grant supplies/approves career stories, roles, dates, clients, frameworks, affiliations | Founder authority must be first-hand and accurate | Grant authority page, expert content | OPEN — `/about`'s existing timeline is a starting draft, not a substitute for the interview (AUT-001) |
| H-007 | Client approves publication/anonymization, verifies outcome/quote | Claude cannot manufacture third-party proof | Case studies, testimonials | OPEN — no cases exist yet; candidates already named in `Testimonials.tsx` (Lincoln Surveying, InBio) |
| H-008 | Account owner edits/authorizes Chamber, LinkedIn, Medium/Substack, speaker, legacy listings | Login/ownership + live verification are external | Entity consistency | OPEN — **login/ownership status for Chamber and LinkedIn company page not confirmed in this session** (see `OPEN_DECISIONS.md` OPEN-005) |
| H-009 | Business owner approves GBP category/address decisions + any API authorization | GBP eligibility/categories are live-account decisions | Local profile optimization | OPEN — GBP ownership/status not confirmed in this session |
| H-010 | Real clients receive ethical review requests, choose their own words | Reviews must be authentic, non-incentivized | Local prominence, buyer proof | OPEN |
| H-011 | Grant/Mel contact partners, media, institutions, event hosts | Local authority is relationship-driven | Third-party mentions, links, events | OPEN |
| H-012 | Choose/fund a local geo-grid/rank tool | No default local rank dataset exists | Local Pack share-of-voice baseline | OPEN |
| H-013 | Approve production deployment, env vars, redirects, rollback window | Site/account risk requires owner approval | Live release | OPEN — applies to any future deploy of SEO/AEO work, including this session's technical fixes |
| H-014 | Review monthly lead quality, proposals, clients, revenue | Rankings alone can't determine business value | Strategy adjustment | OPEN — not due until baselines exist |

## Access register

Never store secret values here — identifiers/status only.

| System | Property/account identifier | Owner | Access status | Claude/API path | Blocker/next action |
|---|---|---|---|---|---|
| Repository | BBTX (this repo) | Mel | Full (Claude Code has local repo access) | Local files/Git | — |
| Deployment | Vercel (`.vercel/` present) | Mel | Unknown to Claude | CLI/API if configured | Confirm deploy credentials before any H-013 release |
| DNS/Cloudflare | Unknown | Mel | Unknown | API only if explicitly authorized | Not yet needed for this session's scope |
| GA4 | **Does not exist yet** | — | Not created | UI, Admin API, Data API | H-003 — needs a Google account to create the property first |
| Search Console | Unknown | Mel | Unknown | UI, Search Console API, Site Verification API | H-003 |
| Google Business Profile | Unknown | Mel/Grant | Unknown | UI or approved GBP API/OAuth | H-003, H-009 |
| Calendly | `calendly.com/granttate` (Grant's personal link, confirmed live in code at 7 call sites) | Grant | Live, in use | Webhook/API if plan permits | OPEN-006 — confirm this is the intended long-term booking asset |
| Contact form | `contact_submissions` table (Neon Postgres), emails via Resend to `grant@bbtx.ai` | Mel | Live, working | Repository/backend | No UTM field — see CON-002 |
| CRM/lead tracker | None found in repo | — | N/A | — | Not yet established |
| Chamber | Charlottesville Regional Chamber member profile | Unknown | Unknown | Usually manual authenticated edit | H-008 |
| LinkedIn company | Unknown | Unknown | Unknown | Usually manual authenticated edit | H-008 |
| Grant LinkedIn | Unknown | Grant | Unknown | Grant/manual | H-008 |
| Rank tracker | None in use | — | N/A | Vendor UI/API | H-012 |
