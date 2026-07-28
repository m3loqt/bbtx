# Repository Implementation Backlog

Repository-specific version of `MASTER_IMPLEMENTATION_BACKLOG.md`, reconciled against actual repo state (see `CURRENT_STATE_AUDIT.md` and `REPORT_TRACEABILITY_MATRIX.md`). Preserves the report's sequencing rule: measurement → category/entity → proof, before publishing volume. Status values match `IMPLEMENTATION_STATUS.md`'s definitions.

## Phase 0 — Controls and baseline

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| GOV-001 | Import SEO/AEO rules into root `CLAUDE.md` | A | Claude | None | **DONE** | `CLAUDE.md` created, imports `docs/seo-aeo/CLAUDE_SEO_AEO_ADDENDUM.md` |
| GOV-002 | Current-state audit + report traceability matrix | A | Claude + Mel | GOV-001 | **DONE** | This session's output |
| DEC-001 | Approve primary positioning statement | C | Grant + Mel | None | **DONE** | See `OPEN_DECISIONS.md` |
| DAT-001 | Inventory GSC, GA4, GBP, Calendly/form, CRM, deployment, DNS access | B | Mel | None | NOT STARTED | No analytics property exists yet — this is account creation, not just an inventory (OPEN-004) |
| DAT-002 | Define qualified lead, source taxonomy, UTM convention, conversion events | B/C | Grant + Mel | DAT-001 | NOT STARTED | Blocks CON-002 |
| DAT-003 | Export/segment 12 months of GSC/GA4 baseline data | B | Mel + Claude | DAT-001 | BLOCKED | No property exists yet to export from |
| DAT-004 | Audit current analytics code and consent behavior | A | Claude | Repo access | **DONE** | Confirmed zero analytics/consent implementation exists — see `CURRENT_STATE_AUDIT.md` |
| TECH-001 | Technical SEO quick wins: missing canonical/OG, sitemap gaps, `Service`/`Person`/`BreadcrumbList`/`FAQPage` schema | A | Claude | None | **IN PROGRESS** (this session) | Zero judgment calls — markup mirrors existing visible content only; see acceptance criteria below |

**TECH-001 acceptance criteria:** `/privacy`, `/terms`, `/cookies`, `/resources`, `/links` have canonical + OpenGraph; `/resources` and `/links` appear in `app/sitemap.ts`; each of the 5 service pages has valid `Service` JSON-LD matching its own visible copy; each of the 3 team pages has valid `Person` JSON-LD matching its own visible bio; `BreadcrumbList` present on services/team/whitepapers/blog pages; `FAQPage` JSON-LD generated from the same array that renders `app/sections/FAQ.tsx`. `npm run build` and `npm run lint` pass. No copy, claims, or `Organization.sameAs`/`LocalBusiness` schema touched (those need ENT-001/H-002 first).
**Rollback:** revert the single commit; no data migrations, no external state changed.

## Phase 1 — Category and entity correction

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| POS-001 | Audit AI-first/conflicting category language | A | Claude | DEC-001 | **DONE** | See `CURRENT_STATE_AUDIT.md` — homepage/hero/FAQ/JSON-LD still AI-first; services already reframed |
| POS-002 | Correct homepage title, H1, hero, FAQ, CTA, service hierarchy | A/B | Claude + Mel | POS-001, DEC-001, CLM-001 | NOT STARTED | Next session — needs wording review, not just a mechanical swap |
| CLM-001 | Verify "100+ organizations" / AI-initiative claims | C | Grant + Mel | None | BLOCKED — HUMAN GATE | See OPEN-001 |
| ENT-001 | Canonical entity record (name, URL, phone, address/service area, founding entity, descriptions, profile links) | B/C | Mel + Grant | DEC-001 | NOT STARTED | Needed before `Organization.sameAs` or `LocalBusiness` schema can be added |
| ENT-002 | Update Chamber profile + obsolete URL | B | Mel | ENT-001 | NOT STARTED | Blocked on Chamber login access (OPEN-005) |
| ENT-003 | Update LinkedIn company + Grant profile | B/C | Mel + Grant | ENT-001 | NOT STARTED | Blocked on LinkedIn access (OPEN-005) |
| ENT-004 | Correct legacy records/author profiles/speaker bios | B | Mel | ENT-001 | NOT STARTED | — |

## Phase 2 — Founder authority and commercial pages

| ID | Task | Class | Owner | Dependencies | Status | Notes |
|---|---|---:|---|---|---|---|
| AUT-001 | Interview Grant using career-evidence guide | C/B | Grant + Mel | DEC-001 | NOT STARTED | `/about` timeline is a useful starting draft, not a substitute for the interview |
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
| GBP-001 | Audit live Google Business Profile | B/C | Mel | DAT-001, ENT-001 | NOT STARTED | Not visible from repo |
| GBP-002 | Correct GBP categories/services/description/links/media/tracking | B/C | Mel + Grant | GBP-001 | NOT STARTED | — |
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
| AEO-002 | Standardized AI/recommendation prompt-monitoring set | A/B | Claude + Mel | None | NOT STARTED | Query/prompt universe already defined in report Appendix A |
| AEO-003 | Check GSC generative/AI reporting availability | B | Mel + Claude | GSC access | BLOCKED | No GSC property exists yet (OPEN-004) |

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
- **DAT-004 is DONE**, not just audited — this session's `CURRENT_STATE_AUDIT.md` constitutes the analytics audit the master backlog called for, and the finding (zero existing analytics) is itself the deliverable.
