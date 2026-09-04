# Repository Implementation Backlog

Repository-specific version of `MASTER_IMPLEMENTATION_BACKLOG.md`, reconciled against actual repo state (see `CURRENT_STATE_AUDIT.md` and `REPORT_TRACEABILITY_MATRIX.md`). Preserves the report's sequencing rule: measurement → category/entity → proof, before publishing volume. Status values match `IMPLEMENTATION_STATUS.md`'s definitions.

## Phase 0 — Controls and baseline

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| GOV-001 | Import SEO/AEO rules into root `CLAUDE.md` | A | Claude | None | **DONE** | `CLAUDE.md` created, imports `docs/seo-aeo/CLAUDE_SEO_AEO_ADDENDUM.md` |
| GOV-002 | Current-state audit + report traceability matrix | A | Claude + Mel | GOV-001 | **DONE** | This session's output |
| DEC-001 | Approve primary positioning statement | C | Grant + Mel | None | **DONE** | See `OPEN_DECISIONS.md` |
| DAT-001 | Inventory GSC, GA4, GBP, Calendly/form, CRM, deployment, DNS access | B | Mel | None | **IN PROGRESS** | GA4 property live (`G-WX6WWDEBB6`). GSC property confirmed live with index data back to 2026-04-30 — predates this project; origin unconfirmed, see OPEN-008 |
| DAT-002 | Define qualified lead, source taxonomy, UTM convention, conversion events | B/C | Grant + Mel | DAT-001 | NOT STARTED | Blocks CON-002 |
| DAT-003 | Export/segment 12 months of GSC/GA4 baseline data | B | Mel + Claude | DAT-001 | **IN PROGRESS** | Manual 3-month GSC export pulled and reviewed 2026-07-30 — see `BASELINE_2026-07-30.md`. Full 12-16 month range and recurring pulls pending DAT-005 (API access) |
| DAT-004 | Audit current analytics code and consent behavior | A | Claude | Repo access | **DONE** | Confirmed zero analytics/consent implementation exists — see `CURRENT_STATE_AUDIT.md` |
| DAT-005 | GSC verification meta tag + GA4 Data API/GSC API OAuth integration for internal reporting | A/B | Claude + Mel | GCP OAuth client setup (Mel) | **IN PROGRESS** | GSC half resolved 2026-09-03/04 via a Search Console MCP server (read-only, outside the blocked Workspace account) — see OPEN-004. GA4 Data API half untouched |
| DAT-006 (new) | GSC query-gap / AI-Overview-theft / cannibalization analysis | A | Claude | DAT-005 (GSC read access) | **DONE** | Prompted by a Reddit case-study post; checked against real data rather than assumed applicable. Result: **pattern doesn't apply yet** — total organic demand (31 queries, 90 days, almost all single-digit impressions) is too small for "ranking well but AI Overview stole the click" or cannibalization to exist as real problems. One modest ranking opportunity found (`ai leadership development consulting`, position 43). See `GSC_GAP_ANALYSIS_2026-09-05.md` — reinforces that entity correction, not content/technical optimization, remains the bottleneck |
| TECH-001 | Technical SEO quick wins: missing canonical/OG, sitemap gaps, `Service`/`Person`/`BreadcrumbList`/`FAQPage` schema | A | Claude | None | **IN PROGRESS** (this session) | Zero judgment calls — markup mirrors existing visible content only; see acceptance criteria below |
| TECH-002 | Fix canonical domain mismatch: code declares `bbtx.ai`, Vercel production/live redirects resolve to `www.bbtx.ai` | A | Claude | OPEN-009 (Mel decision) | **BLOCKED - HUMAN GATE** | Discovered via 2026-07-30 GSC baseline review; likely cause of the Coverage report's 6 canonical/redirect issues. See OPEN-009 |
| TECH-005 (new) | GSC-API technical health audit; fix `/team/grant` indexing gap + `/services/organizational-ai-assessment` legacy 404 | A | Claude | DAT-005 (GSC read access) | **DONE** | First API-based pull, `GSC_HEALTH_2026-09-04.md` — resolved OPEN-008, shipped 2 fixes (`a06f647`). See `IMPLEMENTATION_STATUS.md` |

**TECH-001 acceptance criteria:** `/privacy`, `/terms`, `/cookies`, `/resources`, `/links` have canonical + OpenGraph; `/resources` and `/links` appear in `app/sitemap.ts`; each of the 5 service pages has valid `Service` JSON-LD matching its own visible copy; each of the 3 team pages has valid `Person` JSON-LD matching its own visible bio; `BreadcrumbList` present on services/team/whitepapers/blog pages; `FAQPage` JSON-LD generated from the same array that renders `app/sections/FAQ.tsx`. `npm run build` and `npm run lint` pass. No copy, claims, or `Organization.sameAs`/`LocalBusiness` schema touched (those need ENT-001/H-002 first).
**Rollback:** revert the single commit; no data migrations, no external state changed.

## Phase 1 — Category and entity correction

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| POS-001 | Audit AI-first/conflicting category language | A | Claude | DEC-001 | **DONE** | See `CURRENT_STATE_AUDIT.md` — homepage/hero/FAQ/JSON-LD still AI-first; services already reframed |
| POS-002 | Correct homepage title, H1, hero, FAQ, CTA, service hierarchy | A/B | Claude + Mel | POS-001, DEC-001, CLM-001 | NOT STARTED | Next session — needs wording review, not just a mechanical swap |
| CLM-001 | Verify "100+ organizations" / AI-initiative claims | C | Grant + Mel | None | BLOCKED — HUMAN GATE | See OPEN-001 |
| ENT-001 | Canonical entity record (name, URL, phone, address/service area, founding entity, descriptions, profile links) | B/C | Mel + Grant | DEC-001 | **IN PROGRESS** | Canonical entity block drafted 2026-09-04 (`ENT_PROFILE_DRAFTS_2026-09-04.md` §0); several fields gated on Grant (OPEN-011). Still needed before `Organization.sameAs`/`LocalBusiness` schema can be finalized |
| ENT-002 | Update Chamber profile + obsolete URL | B | Mel | ENT-001 | NOT STARTED | Corrected copy fully drafted 2026-09-04, paste-ready — blocked only on Chamber login access (OPEN-005) |
| ENT-003 | Update LinkedIn company page | B | Mel | ENT-001 | **IN PROGRESS** | Company page found 2026-09-04 (`linkedin.com/company/bridgebusinesstransformations/`); admin-access request filed, still pending. "BBTx Consulting" added as current experience on both Grant's and Mel's personal profiles 2026-09-04 (speeds the admin claim). Company-page copy rewrite drafted, queued for access (OPEN-005). **Grant's personal-profile rewrite dropped from scope 2026-09-05** — his own call, not a project deliverable |
| ENT-004 | Correct legacy records/author profiles/speaker bios | B | Mel | ENT-001 | **IN PROGRESS** | Cvillepedia checked 2026-09-05, edit drafted (name/link swap only, "co-founder" left untouched pending AUT-001) — see `ENT_PROFILE_DRAFTS_2026-09-04.md` §4a. Not yet actioned |

## Phase 2 — Founder authority and commercial pages

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| AUT-001 | Confirm/correct researched career facts with Grant (replaces blind interview) | C/B | Grant + Mel | DEC-001 | **IN PROGRESS** | Public-footprint research done 2026-07-30 (`AUT-001_RESEARCH_BRIEF.md`, sourced) — CATEC engagement, Project Rebound, Chamber committee seat, two books, and Chaotic Confluence all confirmed public. 5 factual conflicts need Grant's direct answer (company name, founder/co-founder, Strategic vs. Chaotic Confluence, Role Map format, unverified education claim). Email updated and drafted to Grant; discovery guide (`AUT-001_INTERVIEW_GUIDE.md`) kept as fallback for remaining gaps |
| AUT-002 | Build/expand Grant authority page | A/B | Claude + Mel | AUT-001, ENT-001 | NOT STARTED | Recommend expanding `/team/grant` in place (OPEN-002) rather than a new `/grant-tate` route |
| SER-001 | Optimize strategic planning/advisory page | A/B | Claude + Mel | DEC-001, AUT-002 | PARTIAL | `/services/strategy-advisory` already reframed; needs a full definition-of-done review, not assumed complete |
| SER-002 | Optimize organizational assessment page | A/B | Claude + Mel | DEC-001, AUT-002 | PARTIAL | Same as above, at `/services/organizational-assessment` |
| SER-003 | Optimize leadership/OD page | A/B | Claude + Mel | DEC-001, AUT-002 | PARTIAL | Same as above, at `/services/leadership-development` |
| SER-004 | Optimize change/implementation page | A/B | Claude + Mel | DEC-001, AUT-002 | PARTIAL | Same as above, at `/services/implementation-support` |
| NAV-001 | Report-aligned internal-link graph | A | Claude | AUT-002, SER-001..004 | NOT STARTED | Depends on Grant page + case hub existing first |
| URL-001 | Redirect/canonical/sitemap migration plan for URL changes | A/B | Claude + Mel | Route audit | **DECIDED — NOT NEEDED YET** | Recommend keeping current live slugs (`/services/strategy-advisory` etc.); no migration planned unless a future decision changes this |

## Phase 3 — Proof and conversion

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| CAS-001 | Case-study hub, template, content model | A | Claude | Repo audit | NOT STARTED | No `/case-studies` route exists yet |
| CAS-002 | Select 2 cases, obtain permission/evidence | C | Grant + client champions | None | BLOCKED — HUMAN GATE | Candidates per report: Lincoln Surveying, InBio (already named in `Testimonials.tsx`) |
| CAS-003 | Draft/approve/publish/link first 2 cases | A/B/C | Claude + Mel + Grant | CAS-001, CAS-002 | BLOCKED | — |
| CON-001 | "Talk with Grant" conversion architecture | A/B | Claude + Mel | DEC-001, DAT-002 | NOT STARTED | Current CTA is "Schedule a Consultation" → Grant's personal Calendly (OPEN-006) |
| CON-002 | Lead-source/UTM capture on forms/booking | A/B | Claude + Mel | DAT-002 | NOT STARTED | Only newsletter signup has any origin field today, and it's not a real UTM |

## Phase 4 — Local prominence

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| GBP-001 | Audit live Google Business Profile | B/C | Mel | DAT-001, ENT-001 | **DONE** | Manager access confirmed working 2026-09-04 — Mel edited the live listing directly (OPEN-005 resolved) |
| GBP-002 | Correct GBP categories/services/description/links/media/tracking | B/C | Mel + Grant | GBP-001 | **IN PROGRESS** | Applied live 2026-09-04: description, primary/secondary category, LinkedIn social link. Still open: website protocol, old-entity social removal, service area, hours, veteran/women-owned confirmation (OPEN-011). Full spec in `ENT_PROFILE_DRAFTS_2026-09-04.md` §3 |
| REV-001 | Ethical review workflow | B/C | Grant + Mel | GBP-001 | NOT STARTED | No review-request tooling exists in repo |
| LOC-001 | Local citation/mention inventory | A/B | Claude + Mel | ENT-001 | NOT STARTED | — |
| LOC-002 | Chamber/media/partner/civic/event outreach | C/B | Grant + Mel | LOC-001 | NOT STARTED | Relationship-driven |
| RANK-001 | Monthly geo-grid baseline (8-12 queries) | B | Mel + Claude | Tool access | NOT STARTED | Query list already defined in report Appendix A |

## Phase 5 — Authority assets and AEO

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| RES-001 | Strategic Confluence executive brief page | A/B/C | Grant + Claude + Mel | Approved source | NOT STARTED | Source is internal methodology doc (report I02) |
| RES-002 | Role Map framework page | A/B/C | Grant + Claude + Mel | Approved source | NOT STARTED | Source is internal framework doc (report I03) |
| AEO-001 | Validate entity/schema/indexation | A | Claude | AUT/SER/RES tasks | **STARTING THIS SESSION (partial)** | `Service`/`Person`/`BreadcrumbList`/`FAQPage` shipped now for *current* content; `Organization.sameAs`/`LocalBusiness` remain blocked on ENT-001/H-002 |
| AEO-002 | Standardized AI/recommendation prompt-monitoring set | A/B | Claude + Mel | None | **DONE (first pass)** | 10-prompt baseline run 2026-09-04 via `WebSearch`/`WebFetch` as a retrieval-layer proxy — `AEO_BASELINE_2026-09-04.md`. 0/8 non-branded prompts named BBTx; entity fragmentation identified as root cause. Recurring monthly re-run pending |
| AEO-003 | Check GSC generative/AI reporting availability | B | Mel + Claude | GSC access | **DONE** | Checked 2026-09-04 via the Search Console API's `searchAppearance` dimension (not exposed as a documented dimension on the MCP tool used elsewhere in this project, but the underlying API accepted it). Query works — confirmed live data exists for the same date range under the `query` dimension — but `searchAppearance` returns **zero rows** for `sc-domain:bbtx.ai` over 2026-06-01–09-03: no query has earned any rich-result/AI-Overview categorization in Google's own reporting yet. Consistent with, not contradicted by, the AEO-002 baseline's 0/8 finding. Nothing to build — there's no generative-search reporting to surface because there's no generative-search presence yet; re-check once entity/schema work (ENT-*, AEO-001) has had time to land |
| AEO-004 (new) | Publish `llms.txt` site map for AI/LLM crawlers | A | Claude | None | **DONE** | `public/llms.txt` — DEC-001's approved positioning statement as summary, links to already-live/indexed pages only, reusing each page's existing approved meta description verbatim (no new copy, no repetition of the unverified "100+" figure, see OPEN-001). `robots.ts` already `allow: "/"` for all user agents so no bot-specific rule needed. Prompted by a Reddit/AI-marketing post claiming AEO wins from `llms.txt` + Quick-Answer content blocks; case-by-case relevance assessed against this project's existing backlog before acting — see chat 2026-09-03. Quick-Answer/question-phrased-H2 formatting from the same source was **not** implemented as a retrofit (would require rewriting published copy with no report basis); noted instead as a future editorial checklist item for CNT-001 |

## Phase 6 — Ongoing growth and governance

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| CNT-001 | One strong first-hand piece/month | B/C | Grant + Mel | Editorial pipeline | ONGOING (informal) | `/chaotic-confluence` already has some qualifying posts; no formal pipeline yet |
| CAS-004 | 6+ case studies over 12 months | B/C | Grant + clients + Mel | Permissions | NOT STARTED | Depends on CAS-001..003 first |
| EVT-001 | Local workshop/roundtable | C/B | Grant + Mel | Partner relationship | NOT STARTED | — |
| KPI-001 | Monthly operating review | B/C | Grant + Mel | Baselines | NOT STARTED | Depends on DAT-003 |
| DEC-002 | Reassess category (≥6 months of evidence) | C | Grant + Mel | KPI history | NOT DUE | Earliest sensible revisit: ~2027-01-28 |

## What changed from the master backlog

- **Whitepaper-related work is further along than the master backlog assumed** — the "empty shelf" problem the report flagged is already resolved.
- **Service pages (SER-001..004) are marked PARTIAL, not NOT STARTED** — they already lead with the right framing, but haven't had a full definition-of-done review against the report's checklist.
- **URL-001 is resolved as "keep current slugs"** rather than left open, since a migration isn't needed — the existing routes already match the report's intent well enough that a rename would only cost redirect risk for no positioning benefit.
- **TECH-001 is a new task**, not in the master backlog: purely technical schema/metadata/sitemap fixes that don't require any human gate, added because they were unblocked and low-risk.
- **TECH-002 is a new task**, not in the master backlog: a canonical-domain mismatch (code says `bbtx.ai`, Vercel's live production domain is `www.bbtx.ai`) surfaced by reviewing the 2026-07-30 GSC baseline export, not by the report. Blocked on a Mel decision (OPEN-009) since it affects which domain search engines consolidate onto.
- **DAT-005 is a new task**, not in the master backlog: GSC HTML verification + OAuth-based GA4 Data API/Search Console API access for internal reporting, requested by Mel 2026-07-30.
- **DAT-004 is DONE**, not just audited — this session's `CURRENT_STATE_AUDIT.md` constitutes the analytics audit the master backlog called for, and the finding (zero existing analytics) is itself the deliverable.
