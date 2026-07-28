Perform a release-readiness audit for the current SEO/AEO branch. Do not add new strategy or expand scope unless needed to correct a defect.

Read the report traceability matrix, backlog, status, and Git diff. Then verify:

- The implemented task matches its report recommendation and acceptance criteria.
- BBTx is positioned around Grant's judgment and broader consulting expertise; AI is supporting.
- No unverified client, organization-count, AI-volume, credential, affiliation, location, or outcome claim was introduced.
- Title, description, canonical URL, Open Graph, headings, visible copy, and structured data agree.
- Structured data matches visible content and has no invisible claims.
- Existing URLs are preserved or every change has a valid 301, canonical, sitemap, and internal-link migration.
- Internal links create the intended path among homepage, Grant, service pages, cases, resources, and consultation.
- Forms and CTAs remain accessible and functional.
- Analytics events do not duplicate or overwrite existing tracking.
- Build, typecheck, lint, and relevant tests pass.
- Key pages are reviewed at desktop and mobile widths when tooling permits.

Create `docs/seo-aeo/RELEASE_REVIEW_<TASK-ID>.md` with:
- pass/fail per criterion
- evidence and file references
- defects fixed
- remaining manual checks
- deployment and rollback steps
- post-deployment verification checklist

Do not deploy. End with a clear GO, CONDITIONAL GO, or NO-GO recommendation.
