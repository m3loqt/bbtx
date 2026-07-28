# SEO/AEO Implementation Status

Update this file after every approved implementation session.

## Current strategic decision

- Primary position: **APPROVED (DEC-001, 2026-07-28)** — "BBTx Consulting helps leaders and organizations make better decisions, align their people, and turn strategy into sustained execution — guided directly by Dr. Grant Tate's decades of executive leadership, organizational transformation, and coaching experience. AI is an enabling capability, not the category." (see `OPEN_DECISIONS.md`)
- AI role: Enabling capability, not primary category
- Measurement baseline date: Pending — no GA4/GSC property exists yet (see `MANUAL_GATES.md` H-003)
- Current implementation phase: Phase 0 (baseline/controls), moving into Phase 1 next session

## Status definitions

- `NOT STARTED`
- `PLANNING`
- `BLOCKED - HUMAN GATE`
- `IN PROGRESS`
- `READY FOR REVIEW`
- `DEPLOYED - VERIFYING`
- `DONE`
- `DEFERRED`

## Active work

| Task ID | Status | Branch/PR | Owner | Manual gate | Last update | Next action |
|---|---|---|---|---|---|---|
| GOV-001 | DONE | (uncommitted) | Claude | | 2026-07-28 | Root `CLAUDE.md` created, imports the addendum |
| GOV-002 | DONE | (uncommitted) | Claude + Mel | | 2026-07-28 | Audit/traceability/backlog/decisions/gates files produced this session |
| DEC-001 | DONE | | Grant + Mel | | 2026-07-28 | Positioning statement approved; wording drafts for POS-002/AUT-002/SER-00x still need their own review before publishing |
| DAT-004 | DONE | (uncommitted) | Claude | | 2026-07-28 | Confirmed zero existing analytics/consent implementation — nothing to conflict with |
| TECH-001 | IN PROGRESS | (uncommitted) | Claude | | 2026-07-28 | Technical schema/metadata/sitemap fixes — see `REPO_IMPLEMENTATION_BACKLOG.md` Phase 0 |
| DAT-001 | IN PROGRESS | (uncommitted) | Mel | H-003 (partial) | 2026-07-28 | GA4 property created, measurement ID `G-WX6WWDEBB6` wired into `app/components/GoogleAnalytics.tsx` via root layout. GSC still not set up; no events/conversions instrumented yet (DAT-002/CON-002) |
| POS-002 | NOT STARTED | | Claude + Mel | H-005 (OPEN-001) | | Draft homepage copy rewrite for wording review |
| AUT-001/AUT-002 | NOT STARTED | | Grant + Mel + Claude | H-006 | | Schedule Grant interview; decide `/team/grant` vs new route (OPEN-002) |
| CAS-001/002 | NOT STARTED | | Grant + Mel + Claude | H-007 | | Candidates already named in code: Lincoln Surveying, InBio |
| ENT-001..004 | NOT STARTED | | Mel + Grant | H-008, H-009 | | Confirm Chamber/LinkedIn/GBP ownership access first (OPEN-005) |

## Decisions

| Date | Decision | Evidence | Approver | Revisit condition |
|---|---|---|---|---|
| 2026-07-28 | Approved primary positioning statement (DEC-001) | Report pp. 2, 20, 33; this session's audit confirming homepage still AI-first | Grant + Mel | Reassess no earlier than ~2027-01-28 (6 months of query/lead/client evidence), per report p. 29 |
| 2026-07-28 | Keep existing service-page URL slugs (`/services/strategy-advisory` etc.) rather than migrating to the report's suggested slugs (URL-001) | Slugs are live, indexed, and already carry the recommended content framing | Mel (technical call) | Revisit only if Search Console data shows the current slugs are underperforming |

## Completed changes

| Date | Task ID | Files/routes changed | Validation performed | Deployment result | Follow-up |
|---|---|---|---|---|---|
| 2026-07-28 | GOV-001 | `CLAUDE.md` (new), `docs/seo-aeo/**` (new) | N/A (docs only) | Not deployed — pending commit | None |
| 2026-07-28 | GOV-002/DAT-004 | `docs/seo-aeo/CURRENT_STATE_AUDIT.md`, `REPORT_TRACEABILITY_MATRIX.md`, `REPO_IMPLEMENTATION_BACKLOG.md`, `OPEN_DECISIONS.md`, `MANUAL_GATES.md` (new) | N/A (docs only) | Not deployed — pending commit | Mel/Grant review before Phase 1 work begins |
| 2026-07-28 | TECH-001 | `app/{privacy,terms,cookies,resources,links}/page.tsx` (canonical+OG), `app/sitemap.ts` (+`/resources`,+`/links`), `app/services/*/layout.tsx` (`Service`+`BreadcrumbList`), `app/team/*/layout.tsx` (`Person`+`BreadcrumbList`, sourced from `team-data.ts`), `app/whitepapers/layout.tsx`, `app/chaotic-confluence/{layout,page,[slug]/page}.tsx` (`BreadcrumbList`, deduplicated so hub and post pages each emit exactly one), `app/coaching/{layout,page}.tsx` (`BreadcrumbList`+`FAQPage`), `app/sections/{FAQ,faq-data}.tsx` + `app/page.tsx` (`FAQPage` sourced from the same array FAQ.tsx renders), `app/page.tsx` (removed non-functional `SearchAction`/`SiteLinksSearchBox` — no site search feature exists) | `npm run build` (pass), `npx eslint` on all touched files (pass — 1 pre-existing unrelated error in `links/page.tsx` confirmed via `git diff`), manual `curl` spot-checks of sitemap entries and JSON-LD on homepage/services/team/coaching/whitepapers/chaotic-confluence (hub + post) | Not deployed — pending commit/review | None blocking; `Organization.sameAs`/`LocalBusiness` remain open pending ENT-001/H-002 |

## Open risks

| Risk | Impact | Control | Owner | Status |
|---|---|---|---|---|
| Category inconsistency | Search and buyer confusion | Position approved (DEC-001); hold for ≥6 months unless evidence demands change | Grant + Mel | Mitigated — position set, homepage copy still pending (POS-002) |
| Unsupported claims ("100+ organizations") | Credibility/legal risk | H-005 evidence gate (OPEN-001) | Grant + Mel | Open |
| Analytics overwrite | Data loss | N/A — confirmed no existing analytics to overwrite; all GA4/GTM work is greenfield | Mel | Resolved (no risk exists) |
| URL migration errors | Traffic/indexation loss | Decided: no URL migration planned (URL-001) | Mel | Resolved |
| Schema/claims drift | New JSON-LD accidentally asserting unverified facts | TECH-001 scoped to only mirror existing visible copy; `sameAs`/`LocalBusiness` explicitly excluded pending ENT-001/H-002 | Claude | Controlled |
