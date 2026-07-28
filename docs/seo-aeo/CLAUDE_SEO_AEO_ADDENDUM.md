# BBTx SEO/AEO Project Instructions

## Strategic objective

Make BBTx one of the most visible and credible Charlottesville-based founder-led consulting practices for strategic planning, organizational assessment, leadership and organizational development, and change implementation. Qualified consultations and clients are the outcome; rankings and traffic are leading indicators.

## Positioning rule

BBTx sells Dr. Grant Tate's judgment, consulting experience, methods, and direct senior-led guidance. AI is an enabling capability used when useful. It must not become the default category or dominate the homepage, service hierarchy, entity descriptions, or calls to action.

## Source hierarchy

Use evidence in this order:

1. Human-approved facts and decisions recorded in this repository.
2. First-party analytics and account exports supplied by the user.
3. The July 27, 2026 research report in `docs/seo-aeo/research/`.
4. The current repository and deployed website.
5. Current official platform documentation when implementation details can change.

When sources conflict, do not silently choose. Record the conflict in `docs/seo-aeo/OPEN_DECISIONS.md` and stop at the relevant gate.

## Non-negotiable content rules

- Never invent or inflate client outcomes, organization counts, AI engagement counts, credentials, affiliations, testimonials, dates, locations, or case details.
- Treat the phrase "100+ organizations" and any AI-volume claim as unverified until a human confirms the precise wording and evidence.
- Do not copy competitor language, page layouts, claims, or brand devices.
- Do not create thin city pages, one page per keyword variation, or generic AI/leadership filler.
- Prefer first-hand evidence: Grant's decisions, experiences, methods, cases, frameworks, talks, and verified results.
- Keep visible page copy natural. Do not stuff Charlottesville or service keywords into every heading.
- Do not claim that schema, llms.txt, or any single technical change guarantees rankings or AI citations.

## Technical rules

- Audit before editing. Identify the framework, routing, CMS/content model, metadata system, analytics implementation, deployment target, and existing SEO utilities.
- Preserve stable URLs whenever practical. Any changed URL requires a documented 301 redirect, canonical update, sitemap update, and internal-link migration.
- Structured data must match visible content. Use only accurate Organization/LocalBusiness, Person/ProfilePage, Service, Article, and Breadcrumb data.
- Do not add FAQ markup solely for rich results. FAQs must be useful visible content.
- Do not remove or replace existing analytics tags until current behavior is documented.
- Keep secrets, OAuth tokens, service-account keys, measurement IDs not intended for source control, and account exports out of Git.
- Run the repository's build, typecheck, lint, and relevant tests after changes. Report anything not run.
- Check rendered pages at desktop and mobile sizes when the environment supports it.

## Required implementation workflow

1. Read the full report text, this addendum, the master backlog, manual gates, and implementation status.
2. Inspect the repository before proposing changes.
3. Map each recommendation to current files, routes, components, data sources, and deployment behavior.
4. Create or update a task with: ID, report basis, business purpose, exact files, dependencies, owner, automation class, manual gate, acceptance criteria, validation, rollback, and status.
5. Implement only unblocked tasks. Stop when a human fact, account authorization, client permission, or strategic choice is required.
6. Show the planned file changes before editing unless the user explicitly asks for immediate execution.
7. After editing, run validation, summarize the diff, identify manual follow-through, and update `IMPLEMENTATION_STATUS.md`.
8. Make small, reviewable commits. Do not combine analytics, URL migrations, major copy changes, and schema changes in one opaque commit.

## Definition of done for a website task

A task is not complete merely because files changed. It is complete only when:

- The change directly supports a documented report recommendation.
- Copy is factual and aligned with the approved position.
- Build/tests pass or failures are disclosed.
- Metadata, schema, canonical URLs, redirects, sitemap, and internal links are checked where relevant.
- Mobile and desktop output are reviewed where possible.
- Tracking implications are documented.
- Manual deployment/account actions are clearly listed.
- The status and decision logs are updated.

## Manual-action boundary

Claude Code may prepare instructions, scripts, API clients, drafts, checklists, and verification steps. It must not claim completion of an external action unless it actually has authorized access and confirms the result. This includes GA4, Search Console, Google Business Profile, LinkedIn, Chamber listings, review requests, client permissions, interviews, partnerships, and local events.
