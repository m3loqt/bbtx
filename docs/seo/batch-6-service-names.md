# Batch 6: service pages named for what they are

**Status: READY FOR REVIEW. Not pushed, not deployed.** Prepared 2026-11-25 on `feature/engagements-popup`, in its own commit so it can ship without the popup and offering-page work.

## Why

The six service pages and the Services hub opened with blog-style slogans as their H1. Search engines and visitors both need the H1 to say what the page *is*. This batch makes the H1 the service name, keeps every slogan on the page one step down, and puts the phrases people actually search into the title tag and description, using only terms that match what Grant offers.

Decisions approved by Mel, 2026-11-25 (logged as DEC-002 in `OPEN_DECISIONS.md`):

1. **Strategy & Advisory (1A):** "Strategic Planning & Advisory Consulting" in the SEO title; strategic planning is an explicit part of the service; the page does not imply every engagement ends in a written plan.
2. **AI Integration & Innovation (2A):** the name stays everywhere (nav, footer, hub, contact form, schema). SEO title "AI Strategy & Adoption Consulting". The page is explicit that the focus is organizational readiness, governance, adoption and performance, not technical software integration.
3. **Organizational development (3A):** used naturally, once, on the Services hub, Organizational Assessment and Leadership pages. Never in a title or H1.

## What changed (before → after)

| Page | H1 | SEO title | Description |
|---|---|---|---|
| `/services` | "The problems on most leadership team agendas…" → **Organizational Consulting Services** | "Services \| BBTx Consulting" → **Organizational Consulting Services \| BBTx Consulting** | Now leads with "Organizational consulting spanning organizational development, leadership, strategy, and AI…" |
| `/services/organizational-assessment` | "Most organizations are operating on assumptions…" → **Organizational Assessment & Analysis** | "Organizational & AI Readiness Assessment \| BBTx" → **Organizational Assessment & Analysis \| BBTx Consulting** | AI readiness stays in the description |
| `/services/strategy-advisory` | "Most organizations don't have a strategy problem…" → **Strategy & Advisory Services** | "Strategy & Advisory Services \| BBTx Consulting" → **Strategic Planning & Advisory Consulting \| BBTx Consulting** | Decisions, alignment and discipline kept |
| `/services/leadership-development` | "Leadership development fails when…" → **Leadership & Team Development** | "Leadership Development & AI Leadership Consulting \| BBTx" → **Leadership Development Consulting \| BBTx Consulting** | "including leadership for the AI era" |
| `/services/ai-integration` | "Most organizations don't have an AI problem…" → **AI Integration & Innovation** (unchanged name) | "AI Strategy Consulting & Integration \| BBTx Consulting" → **AI Strategy & Adoption Consulting \| BBTx Consulting** | "…not technical software integration" |
| `/services/implementation-support` | "Change doesn't fail in the boardroom…" → **Implementation & Change Support** | "Implementation & Change Support \| BBTx Consulting" → **Change Management & Implementation Support \| BBTx** | Leads with change management |
| `/services/executive-recruitment` | "Make better executive hiring decisions" → **Executive Recruitment Assessment Services** | unchanged | unchanged |

Hero layout (all seven): the small label above the H1 now reads "Services" (hub: "BBTx Consulting") instead of repeating the name; the **H1 is the service name**; the original slogan is the large line directly under it with its italic accent unchanged; the lead paragraph and buttons are untouched. All titles are 60 characters or fewer, all descriptions 70–155.

## New sentences (need Grant's eye before publishing)

Nothing below states a fact that is not already on the site, but these are new wording:

1. **Strategy lead:** "That includes strategic planning, shaped around the decisions leaders actually face rather than a document for its own sake."
2. **Strategy engagement "Strategy Analysis & Development":** now "Strategic planning that clarifies direction, priorities, tradeoffs, capabilities, and measures of progress".
3. **Strategy FAQ 1:** adds "Strategic planning is part of this work, but a written plan is not the goal of every engagement."
4. **AI page paragraph:** "Our AI strategy and adoption consulting starts with the organization, not the software. We focus on organizational readiness, governance, adoption, and performance, rather than technical software integration." (the rest of the paragraph is unchanged)
5. **Organizational Assessment FAQ "What happens after the assessment?":** "…continue with organizational development support through strategy, leadership development, AI integration, or change initiatives."
6. **Leadership FAQ "How is this different…":** "As part of our organizational development work, we focus on individuals, teams, and the organizational conditions affecting leadership performance."
7. **Services hub lead:** "Our organizational development practice spans assessment, strategy, leadership development, AI adoption, and change."
8. **Implementation lead:** "Our change management support helps keep decisions moving into daily practice."

## Terms we do not target, and why

This is about which page *targets* a term, not about which words the site may use. Accurate terminology stays in the copy.

- **Work BBTx does not do** (must not appear in a title, H1 or description): "executive search" (BBTx assesses finalists; it is not a search firm), "digital transformation consulting", "implementation consulting" (reads as software), "AI implementation consulting", "AI integration consulting" (read as technical deployment). A test enforces this.
- **Accurate, but another page owns it or it is too broad for one service** (not a service page's title or H1 target): "executive coaching" is a real BBTx service and `/coaching` owns that term, so the Leadership page does not compete with it; "leadership development programs" (course-catalog intent); "management consulting" (too broad to name one service). A test enforces *only* the title and H1, and a second test confirms executive coaching is still named on the Leadership page as an engagement and answered in its FAQ. Nothing restricts using these words in descriptions or body copy where they are accurate.
- **Executive Recruitment** has almost no honest search demand ("executive assessment" is probably mostly the MBA-admissions exam), so its wording is not chased.

## Not changed

Navigation names, footer, contact-form options, URLs, structured data, images, buttons, and every page outside `/services`. No redirects are needed because no URL changed.

## Checked

`tsc` clean, ESLint adds no new errors (the existing apostrophe warnings in a few slogans are unchanged), 166 tests pass (8 new in `tests/seo/service-pages.test.mjs`), production build passes. Rendered in headless Chrome at 1440 and 390 px on all seven pages: one H1 each, slogan intact, served title and description as intended, no horizontal scroll. Not checked: Safari, Firefox, a real phone.

## After it ships (manual)

1. In Search Console, request indexing for the seven service URLs. Google last read most of them before 19 November, and has never seen `/services/executive-recruitment`.
2. Re-measure at 30, 60 and 90 days against the baseline below.

**Baseline (GSC, 28 days to 2026-11-21; GA4, 2026-10-27 to 11-23):** about 843 impressions and 6 clicks, of which about 570 impressions are the "bbtx" ticker query; 12 organic sessions; 0 key events. "ai leadership development consulting": 21 impressions at average position 48.5. Track non-brand impressions and clicks separately from "bbtx".

## Rollback

`git revert` the Batch 6 commit. No data, URL or schema changes are involved.
