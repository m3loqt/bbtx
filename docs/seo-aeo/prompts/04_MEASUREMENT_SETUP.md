Audit and design the BBTx measurement implementation. Do not create, delete, or modify any external Google property/account in this session, and do not overwrite existing site tags.

Read the SEO/AEO report, current-state audit, access register/manual gates, and repository analytics/form code.

Produce `docs/seo-aeo/MEASUREMENT_SPEC.md` containing:

1. Business definitions
- qualified inquiry
- consultation booked
- consultation held
- proposal
- client
- revenue attribution

Mark any definition requiring Grant/Mel approval.

2. Source taxonomy
- organic search
- Google Business Profile/Maps
- local directory/referral
- AI/recommendation discovery
- direct
- email/Substack
- partner/event
- paid, if later used

3. Event map
For each event, include exact trigger, parameters, destination, deduplication rule, consent requirement, validation method, and owner. At minimum evaluate consultation CTA click, Calendly start/completion where available, contact form start/submission, resource download, Digital Twin Snapshot start/completion, phone/email click, and qualified-lead status outside GA4.

4. Existing implementation audit
- tags and IDs found
- package/library/GTM usage
- consent behavior
- duplicate-tag risk
- forms/booking integrations
- environment variables
- gaps

5. External setup checklist
Separate exact manual actions for GA4 Admin, Search Console, GBP, Calendly, CRM, DNS, and any API/OAuth setup. Never include secret values.

6. Proposed repository changes
List exact files and code changes, but do not implement them until measurement IDs, account ownership, and event definitions are approved.

7. Validation
Include local debugging, GA4 DebugView/realtime checks, form/booking end-to-end tests, UTM tests, and a post-deployment data-quality checklist.

8. Data export/reporting plan
Specify whether to use manual exports, GA4 Data API, Search Console API, or a dashboard; list authorization prerequisites and data limitations.

End with a table separating:
- ready to implement in code
- blocked by account/ID access
- blocked by business definition
- not worth automating yet
