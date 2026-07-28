# BBTx SEO/AEO Claude Code Implementation Pack

This pack turns the research report into a controlled implementation workflow for the BBTx website repository.

## The operating principle

Do not ask Claude Code to "implement the report." That instruction is too broad. First make Claude prove that it understood the report, reconcile the report with the current repository, create a traceable backlog, identify manual gates, and only then implement one workstream at a time.

## Install this pack in the website repository

Copy the `docs/seo-aeo` folder into the root of the BBTx website repository.

Then add this one line to the repository's root `CLAUDE.md`:

```md
@docs/seo-aeo/CLAUDE_SEO_AEO_ADDENDUM.md
```

Claude Code automatically loads project memory from `CLAUDE.md`; the import keeps the SEO/AEO operating rules available across sessions.

## Recommended first session

From the repository root:

```bash
claude --permission-mode plan
```

Then paste the contents of:

```text
docs/seo-aeo/prompts/01_INGEST_AUDIT_AND_PLAN.md
```

Do not let the first session edit production code. Its job is to build a grounded implementation system.

## Review before implementation

Before approving any code change, review these Claude-generated files:

- `docs/seo-aeo/CURRENT_STATE_AUDIT.md`
- `docs/seo-aeo/REPO_IMPLEMENTATION_BACKLOG.md`
- `docs/seo-aeo/REPORT_TRACEABILITY_MATRIX.md`
- `docs/seo-aeo/OPEN_DECISIONS.md`
- `docs/seo-aeo/MANUAL_GATES.md`

The repository-specific backlog should refine, not silently replace, `MASTER_IMPLEMENTATION_BACKLOG.md`.

## Implementation sessions

Create a branch per workstream. Example:

```bash
git checkout -b seo-aeo/category-correction
claude
```

Paste `prompts/02_IMPLEMENT_NEXT_TASK.md`. Complete one backlog item or one tightly related group at a time. Require a build, tests, a diff summary, and an updated status log before moving on.

## Human checkpoints

The report contains work Claude Code cannot truthfully complete alone: Grant interviews, client permission, review requests, Google account authorization, profile ownership, local relationships, and factual outcome verification. Those are tracked in `MANUAL_ACTIONS_AND_GATES.md`.

## Files in this pack

- `research/REPORT_FULL_TEXT.md`: searchable report text for Claude Code
- `research/*.pdf`: layout-authoritative report
- `CLAUDE_SEO_AEO_ADDENDUM.md`: persistent project rules
- `MASTER_IMPLEMENTATION_BACKLOG.md`: report-derived starting backlog
- `AUTOMATION_MATRIX.md`: direct, hybrid, and human-only classification
- `MANUAL_ACTIONS_AND_GATES.md`: approvals, access, and relationship work
- `IMPLEMENTATION_STATUS.md`: durable status template
- `prompts/`: copy-paste prompts for ingestion, implementation, measurement, and verification

## What not to do

- Do not give Claude Code write access and ask it to execute all 90 days at once.
- Do not let it invent client outcomes, credentials, affiliations, quotes, review content, or local claims.
- Do not create a new URL architecture until it has produced a redirect and internal-link migration map.
- Do not let it overwrite an existing analytics implementation without auditing current tags and events.
- Do not publish AI-first language merely because older pages or documents contain it. The approved strategic rule is that Grant's judgment is the product and AI is an enabling tool.
