Read the SEO/AEO source-of-truth files and current status first:
- `docs/seo-aeo/CLAUDE_SEO_AEO_ADDENDUM.md`
- `docs/seo-aeo/REPO_IMPLEMENTATION_BACKLOG.md`
- `docs/seo-aeo/REPORT_TRACEABILITY_MATRIX.md`
- `docs/seo-aeo/OPEN_DECISIONS.md`
- `docs/seo-aeo/MANUAL_GATES.md`
- `docs/seo-aeo/IMPLEMENTATION_STATUS.md`

Select the highest-priority unblocked task that can be completed as one reviewable change. Do not silently cross a human gate. If no task is unblocked, stop and state the exact gate and the smallest information/action needed.

Before editing:
1. State the task ID and report recommendation it implements.
2. Explain the business outcome, not only the technical change.
3. List exact files/routes expected to change.
4. State risks, especially claims, analytics, URLs, schema, and deployment.
5. Give acceptance criteria and validation commands.

Then implement only that task.

After editing:
1. Run the applicable build, typecheck, lint, tests, and page/schema checks.
2. Inspect the diff for accidental AI-first positioning, unsupported claims, keyword stuffing, broken links, and URL/indexation problems.
3. Summarize every changed file and why.
4. List external/manual follow-through separately; do not claim it was completed.
5. Update `IMPLEMENTATION_STATUS.md` and any affected traceability/backlog entry.
6. Do not deploy or commit unless explicitly instructed.
