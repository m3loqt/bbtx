# Master Implementation Backlog

This is the report-derived starting backlog. Claude Code must reconcile it with the actual repository and create `REPO_IMPLEMENTATION_BACKLOG.md` before implementation.

Automation classes:

- **A**: direct repository implementation
- **B**: hybrid; code/preparation plus human authorization or external action
- **C**: human truth, approval, or relationship work

## Phase 0 - Controls and baseline

| ID | Task | Class | Owner | Dependencies | Acceptance criteria |
|---|---|---:|---|---|---|
| GOV-001 | Import SEO/AEO rules into root CLAUDE.md | A | Mel | None | Addendum loads from root project memory |
| GOV-002 | Create repository current-state audit and report traceability matrix | A | Claude + Mel | GOV-001 | Every major report recommendation maps to current files, gaps, and a task |
| DEC-001 | Approve one primary positioning statement | C | Grant + Mel | None | Exact approved statement is recorded in decision log |
| DAT-001 | Inventory GSC, GA4, GBP, Calendly/form, CRM, deployment, and DNS access | B | Mel | None | Access register shows owner, status, IDs, and blockers without storing secrets |
| DAT-002 | Define qualified lead, source taxonomy, UTM convention, and conversion events | B/C | Grant + Mel | DAT-001 | Written measurement specification is approved |
| DAT-003 | Export and segment 12 months of GSC/GA4 baseline data | B | Mel + Claude | DAT-001 | Reproducible exports; branded/non-branded, local/non-local, page type, and conversion segments documented |
| DAT-004 | Audit current analytics code and consent behavior | A | Claude | Repo access | Existing tags/events and risks documented before edits |

## Phase 1 - Category and entity correction

| ID | Task | Class | Owner | Dependencies | Acceptance criteria |
|---|---|---:|---|---|---|
| POS-001 | Audit all AI-first and conflicting category language in the repository | A | Claude | DEC-001 | File/route inventory with recommended keep/change rationale |
| POS-002 | Correct homepage title, description, H1, hero, proof, FAQ, CTA, and service hierarchy | A/B | Claude + Mel | POS-001, DEC-001, CLM-001 | One coherent category; AI is supporting; build/tests pass |
| CLM-001 | Verify "100+ organizations" and AI initiative claims | C | Grant + Mel | None | Approved precise claims with evidence or replacement language |
| ENT-001 | Establish canonical entity record: name, URL, phone, address/service area, founding entity, short/long descriptions, profiles | B/C | Mel + Grant | DEC-001 | Approved source-of-truth record exists |
| ENT-002 | Update Chamber profile and obsolete URL | B | Mel | ENT-001 | Live profile verified after update |
| ENT-003 | Update LinkedIn company profile and Grant profile | B/C | Mel + Grant | ENT-001 | Live profile copy and links verified |
| ENT-004 | Audit and correct legacy records, author profiles, and speaker/association bios | B | Mel | ENT-001 | Priority profiles use the canonical entity record |

## Phase 2 - Founder authority and commercial pages

| ID | Task | Class | Owner | Dependencies | Acceptance criteria |
|---|---|---:|---|---|---|
| AUT-001 | Interview Grant using career-evidence guide | C/B | Grant + Mel | DEC-001 | Approved transcript/evidence notes exist |
| AUT-002 | Build dedicated Grant authority page | A/B | Claude + Mel | AUT-001, ENT-001 | Page includes verified evidence, works, affiliations, local proof, media/speaking, CTA, metadata, internal links, and valid Person/ProfilePage schema |
| SER-001 | Optimize strategic planning/advisory page | A/B | Claude + Mel | DEC-001, AUT-002 | Buyer problem, stakes, approach, proof, engagement shape, CTA, metadata, and links are complete |
| SER-002 | Optimize organizational assessment page | A/B | Claude + Mel | DEC-001, AUT-002 | Same definition of done as SER-001 |
| SER-003 | Optimize organizational and leadership development page | A/B | Claude + Mel | DEC-001, AUT-002 | Same definition of done as SER-001 |
| SER-004 | Optimize change implementation/support page | A/B | Claude + Mel | DEC-001, AUT-002 | Same definition of done as SER-001 |
| NAV-001 | Implement report-aligned internal-link graph | A | Claude | AUT-002, SER-001..004 | Homepage, services, Grant page, cases, and resources form a deliberate path without orphan pages |
| URL-001 | Produce redirect/canonical/sitemap migration plan for any URL changes | A/B | Claude + Mel | Route audit | No URL changes deploy without 301 and validation plan |

## Phase 3 - Proof and conversion

| ID | Task | Class | Owner | Dependencies | Acceptance criteria |
|---|---|---:|---|---|---|
| CAS-001 | Build case-study hub, template, and content model | A | Claude | Repo audit | Supports situation, stakes, role, method, decisions, implementation, outcome, and client voice |
| CAS-002 | Select two cases and obtain permission/outcome evidence | C | Grant + client champions | None | Permission and fact records exist; anonymization decision recorded |
| CAS-003 | Draft, approve, publish, and internally link first two cases | A/B/C | Claude + Mel + Grant | CAS-001, CAS-002 | Two truthful outcome-based cases live and validated |
| CON-001 | Implement "Talk with Grant" conversion architecture | A/B | Claude + Mel | DEC-001, DAT-002 | Consistent CTA, next-step explanation, proof nearby, source tracking, and accessible forms |
| CON-002 | Add lead-source and UTM capture to form/booking workflow | A/B | Claude + Mel | DAT-002 | Source persists to the selected system and is tested end-to-end |

## Phase 4 - Local prominence

| ID | Task | Class | Owner | Dependencies | Acceptance criteria |
|---|---|---:|---|---|---|
| GBP-001 | Audit live Google Business Profile | B/C | Mel | DAT-001, ENT-001 | Categories, services, description, URL/UTM, address, area, hours, reviews, media, and performance captured |
| GBP-002 | Correct GBP categories, services, description, links, media, and tracking | B/C | Mel + Grant | GBP-001 | Live changes verified; no keyword-stuffed business name |
| REV-001 | Launch ethical review workflow | B/C | Grant + Mel | GBP-001 | 10-15 eligible people identified, direct link ready, non-scripted request process active |
| LOC-001 | Establish local citation/mention inventory and priority outreach list | A/B | Claude + Mel | ENT-001 | Current/missing/incorrect records and 3-5 realistic opportunities documented |
| LOC-002 | Pursue Chamber, media, partner, civic, institutional, and event evidence | C/B | Grant + Mel | LOC-001 | Genuine activities/mentions tracked; no purchased or fabricated citations |
| RANK-001 | Configure monthly 8-12-query local geo-grid baseline | B | Mel + Claude | Tool access | Reproducible baseline with 1-3, 4-10, 11-20, and absent coverage |

## Phase 5 - Authority assets and AEO

| ID | Task | Class | Owner | Dependencies | Acceptance criteria |
|---|---|---:|---|---|---|
| RES-001 | Publish Strategic Confluence executive brief/page | A/B/C | Grant + Claude + Mel | Approved source | Original, useful, crawlable, internally linked asset live |
| RES-002 | Publish Role Map framework page/resource | A/B/C | Grant + Claude + Mel | Approved source | Original, useful, crawlable, internally linked asset live |
| AEO-001 | Validate entity/schema/indexation implementation | A | Claude | AUT/SER/RES tasks | Visible-content-matched schema validates; canonicals/indexation checked |
| AEO-002 | Establish standardized AI/recommendation prompt-monitoring set | A/B | Claude + Mel | None | Prompt set, date/model log, citation log, and limitations documented |
| AEO-003 | Check current Search Console generative/AI reporting availability and integrate only if accessible | B | Mel + Claude | GSC access | Availability verified; no invented metric or unsupported report assumption |

## Phase 6 - Ongoing growth and governance

| ID | Task | Class | Owner | Dependencies | Acceptance criteria |
|---|---|---:|---|---|---|
| CNT-001 | Publish one strong first-hand expert piece per month initially | B/C | Grant + Mel | Editorial pipeline | Each piece contains original judgment/evidence and links to one relevant commercial page |
| CAS-004 | Reach at least six strong case studies over 12 months | B/C | Grant + clients + Mel | Permissions | Six approved, distinct, useful cases live |
| EVT-001 | Run or co-host a useful local workshop/roundtable | C/B | Grant + Mel | Partner relationship | Real event page, partner evidence, follow-up resource, and lead/source tracking |
| KPI-001 | Run monthly operating review | B/C | Grant + Mel | Baselines | Visibility, behavior, lead quality, authority, editorial, and revenue decisions recorded |
| DEC-002 | Reassess category only after sufficient evidence, normally six months | C | Grant + Mel | KPI history | Decision based on query, lead, client, and revenue evidence, not isolated impressions |
