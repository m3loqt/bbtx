# Automation Matrix

The word "promptable" has three different meanings here. A task may be technically automatable, but still require account authorization, human truth, or an external relationship. Use these classifications in every backlog item.

## A - Claude Code can implement directly in the repository

These tasks can normally be completed once Claude has inspected the codebase and the required wording is approved.

| Work | What Claude Code can do | Human checkpoint |
|---|---|---|
| Homepage category correction | Update title, description, H1, hero, FAQs, service hierarchy, CTAs, internal links, and related tests | Approve final position and factual claims |
| Grant authority page | Build route/template, structure biography, add proof modules, internal links, Person/ProfilePage schema, metadata, and responsive layout | Confirm facts, selected clients, affiliations, media, and wording |
| Priority service pages | Create or strengthen strategic planning, organizational assessment, organizational development/leadership, and change implementation pages | Approve service scope and proof |
| Case-study system | Build hub, template, content model, metadata, schema where appropriate, and internal links | Client permission and outcome verification |
| Conversion architecture | Update "Talk with Grant" CTAs, consultation explanation, source fields, thank-you behavior, and CTA tracking | Approve booking promise and lead handling |
| Technical SEO | Audit and fix canonicals, robots directives, sitemap generation, redirects, headings, metadata, image attributes, broken internal links, and indexability issues | Deployment approval for risky changes |
| Structured data | Generate and validate visible-content-matched Organization/LocalBusiness, Person/ProfilePage, Service, Article, and Breadcrumb JSON-LD | Confirm business data and claims |
| Resource pages | Build Strategic Confluence and Role Map pages/download flows, canonical structure, metadata, and internal links | Grant supplies/approves authoritative content |
| Analytics instrumentation in code | Add GA4/GTM tag integration, event calls, UTM persistence, source fields, consent handling, and debug logs | Measurement IDs, consent decisions, and account access |
| Reporting scripts | Write scripts that pull authorized GSC/GA4 data, transform exports, and generate dashboards/reports | OAuth/service-account setup and property access |

## B - Claude Code can prepare and assist, but a person must authorize or complete part of it

| Work | Claude Code contribution | Human or account requirement |
|---|---|---|
| GA4 setup | Audit existing tags; write setup script/API client; implement site tag and events; produce DebugView checklist | A Google account with Analytics access must create/authorize the property and stream, or authorize an Admin API workflow |
| Search Console | Add verification file/meta tag; write export scripts; submit sitemap via API when authorized | Owner must authorize Google access; DNS verification may require registrar/Cloudflare access |
| Google Business Profile | Draft categories, services, description, UTM URL, post copy, audit checklist, and optionally an API client | Profile ownership, OAuth consent, and Google API approval; address/category choices need human confirmation |
| Chamber and LinkedIn cleanup | Produce exact replacement copy, URL list, bios, and a QA checklist | An authenticated account owner usually makes and confirms the changes |
| Geo-grid rank tracking | Define query set, locations, import format, and analysis scripts | A third-party tool subscription/account or authorized API is normally required |
| Grant interview/content extraction | Generate interview questions, transcribe supplied recordings, extract evidence, and draft the page | Grant must supply first-hand answers and approve interpretation |
| Case studies | Create interview guide, draft, anonymize, format, and publish | Client permission and factual outcome confirmation |
| Review workflow | Create email templates, direct-link instructions, tracker, and response drafts | Real clients choose whether and what to review; reviews must not be fabricated or scripted |
| AEO monitoring | Build prompt suite, logging format, and analysis scripts | Models/search engines may require accounts or APIs; results remain variable and directional |
| Deployment | Prepare pull request, migration notes, environment variable list, and rollback plan | Repository/deployment owner approves and deploys unless Claude is explicitly authorized |

## C - Fundamentally human or relationship-driven

Claude Code can support these tasks, but prompting cannot produce the underlying evidence.

- Approving BBTx's primary market position and holding it consistently.
- Deciding the legally and operationally correct business name, address eligibility, service area, phone, and hours.
- Defining a qualified lead and deciding which services/organization sizes are commercially desirable.
- Grant supplying judgment, stories, point of view, client context, and permissioned career evidence.
- Clients approving cases, verifying outcomes, and writing honest reviews in their own words.
- Local relationship building with the Chamber, partners, institutions, media, podcasts, and event hosts.
- Conducting consultations, proposals, follow-up, and sales decisions.
- Verifying whether visibility created revenue and whether the strategic category should change.

## Practical conclusion

Most on-site implementation is promptable. Most off-site authority is not. Analytics and platform work sits in the middle: code is promptable, but credentials, consent, account ownership, and final verification remain human-controlled unless a properly authorized API/MCP integration is established.
