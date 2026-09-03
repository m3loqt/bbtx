# AEO Baseline — 2026-09-04

First pass at **AEO-002** (standardized prompt-monitoring set). Ten buying-intent / discovery prompts from the report's Appendix A were run against live web search (a reasonable proxy for what AI assistants retrieve over). This is the directional "before" reading — repeat monthly.

Method note: run via `WebSearch` + `WebFetch`, not by querying ChatGPT/Gemini/Perplexity directly. Search results are what those systems' retrieval layers surface, so the substance holds; exact AI-answer wording will vary.

## Result: BBTx has effectively no AEO presence

| # | Prompt | BBTx / Grant named? | What surfaced instead |
|---|---|---|---|
| 1 | best consulting firms in Charlottesville VA | **No** | Directories (Indeed, Yelp, Glassdoor, GoodFirms). Firms: Trident Shield, Elder Research, Susan Andrews & Associates, Eure Consulting, Millennium Group International, Sight Casting |
| 2 | strategic planning consultant Charlottesville | **Barely** — listed last, from a stale legacy record ("184 Brookwood Dr", "coaching, business planning, organization changes, and turnarounds") | Davenport Strategic Innovation & Design, Conscious Consults (Kate Zuckerman), Sight Casting, Cozart Consulting |
| 3 | organizational development consultant Charlottesville VA | **No** | Job postings (jobs.virginia.gov, Indeed, ZipRecruiter), UVA HR; CIMA Consulting, Danielle Sheehan |
| 4 | leadership development consultant Central Virginia | **No** | DauvCo (Richmond), Voltage (Roanoke), Loeb, Royal Executives (Norfolk) — all outside Charlottesville |
| 5 | who can facilitate a strategic plan in Central VA (nonprofit) | **No** | Center for Nonprofit Excellence, Nonprofit Solutions |
| 6 | executive coach Charlottesville VA | **No** | Noomii, FocalPoint, Sight Casting, Cozart, Denise Stewart, Change Leaders |
| 7 | change management consultant Virginia | **No** | Job postings (Deloitte, AT&T, Meta); The Spark Mill |
| 8 | management consulting Charlottesville VA | **No** | Directories (Manta lists 54 firms); Conscious Consults, Sight Casting, SL Companies |
| 9 | Grant Tate consultant Charlottesville BBTx (branded) | **Yes, but fragmented** — see below | — |
| 10 | consultant to help leadership team align around strategy execution | **No** | National only: ScottMadden, Umbrex, Navalent, Centric, Lotis Blue |

**0 clean mentions across 8 non-branded discovery prompts.** One stale/buried mention (#2). The branded query surfaces a fractured entity.

## The core problem: entity fragmentation

Grant and the practice appear under **six different names** across the public web, none consistently linked to `bbtx.ai`:

| Source | Name it uses | Website it points to | How it frames the work |
|---|---|---|---|
| `bbtx.ai` | BBTx | bbtx.ai | title tag still "AI Business Consulting" |
| **Charlottesville Chamber profile** | BBTx Consulting | **`chaotic-confluence.circle.so`** (not bbtx.ai) | "transforming organizations through visionary leadership and AI applications" — plus an **AI Explorers membership checkout** link in the header (`ai_explorers.circle.so/checkout/...`) |
| Cvillepedia | "The Bridge, Ltd" — "**co-founder** and CEO" | — | "Charlottesville-based consulting firm"; notes CATEC strategic planning (2013) |
| paradigmassociates.us (a **competitor's** site) | "Bridge Business Transformations (BBx)" and "**Bridgewater Research Group (BRG)**" | — | "transforming complex organizations and developing growth-oriented executives in high-tech companies"; **no mention of BBTx, no link to bbtx.ai** |
| Daily Progress (2008) | "The Bridge" | — | 2008 Small Business Person of the Year |
| chamberofcommerce.com / datanyze / changestrategists | BBTx Consulting | — | "business management consultant", phone (434) 466-4655 |

The AI synthesis for the branded query stated plainly: *"BBTx is an AI business consulting firm."* The wrong category is now what the machines "know."

## What consistently beats BBTx

Sight Casting Consulting (4 prompts), Cozart Consulting (3), Conscious Consults / Kate Zuckerman (3), Davenport Strategic Innovation & Design, Danielle Sheehan — all in the report's local competitor set (L01–L09). They surface because they have: a consistent Chamber profile pointing at their real site, an owned site with clear service pages, and directory coverage. None of this is exotic.

## Implications (all already in the report's sequencing)

1. **Entity consistency (ENT-001..004) is the lever — not content, not schema.** New pages and structured data do nothing while the web describes BBTx as an "AI applications" shop whose website is a Circle.so community.
2. **The Chamber correction is still not done — 14 months after the report flagged it (B09).** It's currently broadcasting the wrong URL, an unfocused 8-category list, AI-first copy, and a live checkout for an obsolete membership product. Highest-impact, lowest-effort fix on the board.
3. **The paradigmassociates.us profile needs a decision** — update it to reflect BBTx and link to bbtx.ai, or formally treat it as a legacy artifact. As-is it splits Grant's entity onto a competitor's domain.
4. **The homepage title tag ("AI Business Consulting") feeds the machines the wrong category** — loops back to the parked POS-002 / positioning decision for Grant.
5. **`/team/grant` being unindexed until this week** (see `GSC_HEALTH_2026-09-04.md`) meant Google had no canonical "who is Grant Tate" page to anchor the entity. Now fixed in code; needs to get indexed.

## Prompt set for recurring runs

Prompts 1–10 above, plus (add next run): "nonprofit strategic planning consultant Virginia", "board strategic planning facilitator Virginia", "leadership team keeps reopening decisions", "why does our strategic plan never get implemented", "how to assess an organization before restructuring". Run monthly, log named/not-named + top 5 competitors surfaced.

## Next actions

- **Claude (now, unblocked):** draft the corrected Chamber profile (description, focused category list, correct URL, no checkout link), LinkedIn company About, and GBP category/services/description — all aligned to one positioning — so they're a paste-in job the moment access exists.
- **Grant / Mel (gated):** Chamber login (ENT-002, OPEN-005), GBP manager access (GBP-001), decision on the paradigmassociates.us profile, and the homepage positioning call.
