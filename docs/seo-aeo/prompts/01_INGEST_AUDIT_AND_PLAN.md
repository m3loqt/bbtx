You are in the BBTx website repository. This is an analysis and planning session only. Do not modify production code, content, routes, analytics, configuration, or external accounts.

Read these files in full:
- `CLAUDE.md`, including imported instructions
- `docs/seo-aeo/research/REPORT_FULL_TEXT.md`
- `docs/seo-aeo/MASTER_IMPLEMENTATION_BACKLOG.md`
- `docs/seo-aeo/AUTOMATION_MATRIX.md`
- `docs/seo-aeo/MANUAL_ACTIONS_AND_GATES.md`
- `docs/seo-aeo/IMPLEMENTATION_STATUS.md`

Then inspect the entire repository sufficiently to understand:
- framework and build/deploy model
- routes and URL structure
- page/content architecture and CMS, if any
- metadata, canonical, robots, sitemap, and redirect implementation
- structured-data implementation
- analytics, consent, forms, booking, and lead-source behavior
- existing service, founder/about, case-study, resource, and location content
- reusable components and testing commands

Do not assume the report exactly matches the current repository. Reconcile them.

Create these files:

1. `docs/seo-aeo/CURRENT_STATE_AUDIT.md`
   - factual repository architecture
   - current public positioning found in code
   - current routes and page purposes
   - analytics/SEO/schema implementation
   - conflicts, risks, and unknowns
   - exact file references

2. `docs/seo-aeo/REPORT_TRACEABILITY_MATRIX.md`
   For every material recommendation in report sections 7-11, include:
   - report section/page marker
   - recommendation
   - business reason
   - current repository state
   - exact files/routes affected
   - proposed task ID
   - automation class A/B/C
   - manual gate
   - acceptance criteria
   - confidence and unresolved evidence

3. `docs/seo-aeo/REPO_IMPLEMENTATION_BACKLOG.md`
   Convert the master backlog into a repository-specific backlog. Preserve the strategic sequence: measurement/category/entity/proof before publishing volume. Include dependencies, risk, rollback, validation, owner, and definition of done. Do not mark external actions complete.

4. `docs/seo-aeo/OPEN_DECISIONS.md`
   Include only decisions that materially block or alter implementation. Do not ask questions already answered by the report or repository. For each decision, state the recommended default, consequences, evidence, owner, and the tasks it blocks.

5. `docs/seo-aeo/MANUAL_GATES.md`
   Adapt the manual gates to the actual stack and accounts discovered. Never include secrets.

6. Update `docs/seo-aeo/IMPLEMENTATION_STATUS.md` only to reflect the completed audit/planning work.

Before finishing, provide a comprehension check:
- state the core commercial goal in one paragraph
- list the five most important strategic constraints
- explain why AI cannot lead the category
- identify the first three implementation tasks that are both high impact and currently unblocked
- identify every task that appears promptable but actually needs a human gate

Do not implement any recommendation in this session. End with a concise review package for Mel, including the files created and the decisions he must approve before coding begins.
