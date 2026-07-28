# Manual Actions and Gates

Claude Code must stop or mark a task blocked when any of these gates is unresolved.

| Gate | Required human action | Why Claude cannot substitute for it | Unlocks |
|---|---|---|---|
| H-001 | Grant and Mel approve the primary positioning statement | This is a business choice, not a code inference | Homepage, profiles, services, founder page |
| H-002 | Confirm legal/public entity details, address eligibility, service area, phone, and hours | Incorrect local data can create policy and trust problems | GBP, LocalBusiness schema, citations |
| H-003 | Grant authorized access to GA4, GSC, GBP, booking/form data, CRM, DNS, and deployment | External systems require ownership, OAuth, or administrator permission | Baselines, instrumentation, profile changes, deployment |
| H-004 | Define a qualified lead and accepted source/conversion taxonomy | The system cannot decide commercial fit on its own | Measurement plan and dashboard |
| H-005 | Confirm precise wording and evidence for organization counts and AI-related claims | Public claims must be documentable | Homepage and proof sections |
| H-006 | Grant supplies and approves career stories, roles, dates, clients, frameworks, works, local roles, and affiliations | Founder authority must be first-hand and accurate | Grant authority page and expert content |
| H-007 | Client approves publication/anonymization and verifies outcomes/quote | Claude cannot manufacture third-party proof | Case studies and testimonials |
| H-008 | Account owner makes or authorizes Chamber, LinkedIn, Medium/Substack, speaker, and legacy listing edits | Login/ownership and final live verification are external | Entity consistency |
| H-009 | Business owner approves GBP category/address/service decisions and any API authorization | GBP eligibility and categories are live-account decisions | Local profile optimization |
| H-010 | Real clients receive ethical review requests and choose their own words | Reviews must be authentic and non-incentivized | Local prominence and buyer proof |
| H-011 | Grant/Mel contact partners, media, institutions, and event hosts | Local authority is relationship-driven | Third-party mentions, links, events |
| H-012 | Choose and fund any local geo-grid/rank tool | Claude has no default local rank dataset | Local Pack share-of-voice baseline |
| H-013 | Approve production deployment, environment variables, redirects, and rollback window | Site/account risk requires owner approval | Live release |
| H-014 | Review monthly lead quality, proposals, clients, and revenue | Rankings cannot determine business value alone | Strategy adjustment |

## Access register template

Never store secret values in this file.

| System | Property/account identifier | Owner | Access status | Claude/API path | Blocker/next action |
|---|---|---|---|---|---|
| Repository | | | | Local files/Git | |
| Deployment | | | | CLI/API if configured | |
| DNS/Cloudflare | | | | API only if explicitly authorized | |
| GA4 | | | | UI, Admin API, Data API | |
| Search Console | | | | UI, Search Console API, Site Verification API | |
| Google Business Profile | | | | UI or approved GBP API/OAuth | |
| Calendly/booking | | | | Webhook/API if plan permits | |
| Contact form | | | | Repository/backend | |
| CRM/lead tracker | | | | API/export if available | |
| Chamber | | | | Usually manual authenticated edit | |
| LinkedIn company | | | | Usually manual authenticated edit | |
| Grant LinkedIn | | | | Grant/manual | |
| Rank tracker | | | | Vendor UI/API | |
