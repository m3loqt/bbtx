# GSC Query-Gap & Cannibalization Analysis — 2026-09-05

Source: Search Console MCP (same access as `GSC_HEALTH_2026-09-04.md`), `sc-domain:bbtx.ai`, 2026-06-01–2026-09-03 (90 days). Prompted by a Reddit case-study post Mel shared claiming this kind of analysis drove another site's AI-citation growth (see chat 2026-09-04/05) — assessed on this site's own data, not the post's claims, per the addendum's source-hierarchy rule (a Reddit post isn't evidence on its own).

## Method

Pulled all queries with any impressions (`dimensions=query`, 90 days) and the same broken out by page (`dimensions=query,page`), checking for (a) queries ranking position 1–3 with zero clicks — the Reddit post's "AI Overview is stealing the click" pattern — and (b) query cannibalization (one query, multiple competing BBTx pages).

## Finding: total organic demand is still too small for either pattern to exist

31 distinct queries with any impressions across 90 days; all but 2 (`bbtx`, `ai leadership development consulting`) have single-digit impressions. This isn't a "ranking well but not getting clicked" problem — it's a "not ranking yet" problem, consistent with the entity-fragmentation root cause `AEO_BASELINE_2026-09-04.md` already identified.

### Position 1–3, zero clicks (candidates for "AI Overview theft")

| Query | Position | Impressions |
|---|---|---|
| ai consulting near me | 1 | 1 |
| business consultant near me | 1 | 1 |
| business counseling services | 1 | 2 |
| business formation services | 1 | 5 |
| local business near me | 1 | 1 |
| boxinesses (typo) | 1 | 1 |

None clear single digits except "business formation services" (5) — and that query doesn't match what BBTx does (it's LLC/entity-formation intent, not consulting), so it's a false-positive keyword match, not a real opportunity. **No real AI-Overview-theft pattern exists yet** — samples are too small to mean anything, and the one page-1 query with any volume is off-topic.

### Cannibalization

The only repeated query→multiple-page pattern is the branded query `bbtx` itself, spread across 9 URL variants (`bbtx.ai/`, `www.bbtx.ai/`, `http://www.bbtx.ai/`, plus `/about`, `/services`, `/privacy`, `/terms`, `/cookies`, `/links`). This is Google's normal sitelink attribution for a branded query, not competing content — and includes stale apex/http duplicates that should consolidate now that the 307→308 fix (2026-09-04) is live. **No genuine content-vs-content cannibalization found.**

### One real, if modest, opportunity

`ai leadership development consulting` — 67 impressions (the 2nd-highest on the whole site after the branded query), ranking position 43.1 on `/services/leadership-development`. Real topical match, real demand, just not ranking well enough yet. Normal on-page/authority work, not an AI-Overview or cannibalization fix.

### Confirms an existing fix

`organizational ai assessment` (3 impressions, position 48.3) is still attributed to the old `bbtx.ai/services/organizational-ai-assessment` URL — the exact page TECH-005's 301 redirect targets. Expected to clear on next crawl.

## What this means

The Reddit post's diagnostic doesn't apply here — BBTx doesn't have enough ranking volume yet for AI-Overview theft or cannibalization to exist as problems. This is more evidence for the same conclusion the AEO baseline already reached: entity correction (ENT-001..004, GBP, Chamber) is the current bottleneck, not technical/content optimization of pages that are already ranking.

## Limitation

Keyword-gap-vs-competitor analysis (also part of the Reddit post's playbook) isn't feasible from GSC data alone — it requires a competitor keyword-research tool (SEMrush/Ahrefs/etc.) not available in this environment. Not attempted; flagging rather than guessing.
