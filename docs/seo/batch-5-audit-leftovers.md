# SEO/AEO Batch 5: what the OpenSEO audit still reported after Batch 4

**Branch:** `seo/batch-5-audit-leftovers` (from `main` at `71896f3`, which is live) · **Date:** 2026-11-20
**Status:** Merged to `main` and **deployed to production 2026-11-20** (approved by Mel, including the `/links` noindex).
**Source:** OpenSEO site audit `28d2a7be-2c1a-40ca-a7bd-52d184ab520b`, started 2026-11-20 03:01, run on the live site after Batch 4: 35 pages, 5 issues (2 warnings, 3 info), average response 64 ms.

| Issue | Page | Fixed here? | What was done, or why not |
|---|---|---|---|
| Orphan page (warning) | `/newsletter` | **Yes** | The page was in the sitemap but nothing linked to it (every "subscribe" on the site opens a modal). Added a "Newsletter" link to the footer's Resources column, so it is linked from every public page. The existing "Subscribe" modal entry is unchanged |
| Heading levels skip (info) | `/digital-twin-snapshot` | **Yes** | The tool page opens with one `<h1>` and no `<h2>`, so the footer's `<h3>` headings followed it directly. The footer headings are now `<h2>` (same classes, no visual change). They can only follow an `<h1>`, `<h2>` or deeper heading, so this cannot introduce a skip on any other page |
| Thin content (warning) | `/links` | **Yes** (approved) | 33 words: a link-in-bio page that is not meant to rank. Now `robots: { index: false, follow: true }` and removed from the sitemap. The footer's "All links" link stays, and the links on the page are still followed |
| Heading levels skip (info) | `/chaotic-confluence/strategic-confluence-a-beginners` | No, editorial | The stored post body uses only `<h3>` for its seven section headings (1 to 6 plus "Closing"), straight after the title `<h1>`. Change them to Heading 2 in the admin editor. Note `.article-prose h2` is 1.5 rem and `h3` 1.25 rem, so the sections will look slightly larger |
| Title too long (info) | same post | No, editorial | The title is 61 characters, 1 over; it is stored in the database. Google truncates by pixel width, not characters. Dropping "A" ("Strategic Confluence: Beginner's Guide to AI Implementation", 59) is the lightest edit |

## GA4: `generate_lead` is not marked as a key event

Checked through OpenSEO (property `properties/547434432`, "bbtx consulting"): the key events on the property are `purchase`, `qualify_lead` and `close_convert_lead` (all created with the property on 2026-07-28). `generate_lead`, which the contact form sends after the server accepts a submission (`app/components/ContactModal.tsx`), is not one of them, so GA4 reports **0 key events for 2026-10-22 to 2026-11-18**. Marking it in GA4 (Admin, Data display, Events or Key events) is an account setting and is not part of this branch.

The only two events the site sends are `generate_lead` (contact form) and `readiness_guide_assessment_click` (a click, not a conversion). Newsletter signups and digital twin completions are not tracked as events at all.
