# SEO/AEO Batch 4: Screaming Frog issues

**Branch:** `seo/batch-4-crawler-issues` (from `main` at `55f81dd`, which is live) · **Date:** 2026-11-19
**Status:** Committed on the branch. **Not pushed, not merged, not deployed.**
**Source:** Screaming Frog "issues overview report" (34 URLs, no per-URL lists). Each issue was reproduced on the live site with a Screaming Frog user agent to find the real URLs and decide whether it is a defect.

## 0. Where the site stands now (live Lighthouse, after Batches 2 and 3 shipped)

OpenSEO audit `e9c5733a-392f-49c2-974e-33b6e25d28cb`, same 10 pages, run after the chat widget removal and the 1920 px cap went live.

| | Before (2026-11-19 morning) | Now |
|---|---|---|
| CLS, mobile | 1.59 to 2.18 | **0 on all 10 pages** |
| CLS, desktop | 1.37 to 1.48 | 0 to 0.006 |
| Performance, desktop (avg) | 74 | **99** (96 to 100) |
| Performance, mobile (avg) | 55 | **84** (75 to 92) |
| Mobile LCP | 2.5 to 7.3 s | 2.8 to 3.9 s |

Accessibility 93 to 100 and best practices 100 everywhere; `/courses` SEO is 92, all other pages 100.

## 1. The report, issue by issue

| Screaming Frog issue | URLs | Real? | What was done |
|---|---|---|---|
| Canonicals / Page Titles / Meta Description / Directives: **Outside `<head>`** (4 issues, High) | 1 each | **Yes, intermittent.** One blog post (`what-pax-silica-actually-costs-the`), found on the live site with the crawler's user agent | `htmlLimitedBots: /.*/` in `next.config.ts` |
| Canonicals: Missing | 1 | Same page and cause | Same fix |
| **Security** headers missing: X-Frame-Options, Referrer-Policy, X-Content-Type-Options (145 URLs), Content-Security-Policy (94) | all | **Yes** | New `lib/security-headers.ts`, wired through `next.config.ts` (section 3) |
| Meta Description **below 70 chars** / below 400 px | 10 | Yes | 4 pages rewritten; 6 blog posts get a composed description (section 2) |
| Meta Description **over 155 chars** / over 985 px | 7 | Yes | 7 pages shortened, wording kept from the originals |
| Page Titles over 60 chars / 561 px | 2 | Yes, 1 fixable | `/courses` title shortened to 58 characters with the suffix. The other is a blog post title stored in the database |
| **H2: Non-sequential**, **Missing** | 3 | Partly | The blog index, `/courses` and `/resources` now go h1 then h2 |
| Images: **Missing Alt Text** | 82 | **Already fixed** (this crawl predates today's alt-text release); 3 images remained inside blog post bodies | Every image in a post body now gets non-empty alt text at render time |
| Images: **Missing Size Attributes** | 41 | **No.** These are `next/image` `fill` images: the parent box reserves the space, which is why live CLS is 0 | None |
| Images: **Over 100 kB** | 36 | **Mostly a crawler artifact** (section 4) | None |
| Response Codes: External Client Error 4xx | 2 | **No.** LinkedIn answers bots with 999 and Facebook's share URL with 400 when fetched by a script; both work in a browser | None |
| Response Codes: Internal Redirection 3xx | 1 | **No.** All 34 internal links return 200 now; it was most likely the non-www start URL | None |
| Links: high external outlinks | 1 | No. The `/links` page exists to link out | None |
| Content: Low Content Pages | 1 | Marginal. `/links` has 33 words | Left: a link-in-bio page. Needs a copy decision if wanted |
| H2: Duplicate (16 pages) | 16 | No. Shared sections: "Ready to thrive in a complex world?" on 20 pages, "Comments" on 11 posts, "Frequently Asked Questions" on 6 | None |
| H1 / H2 over 70 characters | 8 / 8 | No. The service headlines are deliberately long statements | None |
| Page Titles below 30 chars / 200 px, **Same as H1** | 15 / 5 / 11 | No. Short brand titles ("About | BBTx") and blog posts titled after their H1 are normal | None |
| Content: Readability Difficult / Very Difficult | 11 / 4 | No. Legal pages and long-form consulting copy | None |

## 2. What changed

- **`next.config.ts`:** `htmlLimitedBots: /.*/`. Next streams `<title>`, the description, the canonical and the robots tag into `<body>` for any user agent that is not on its short built-in list, which leaves out Screaming Frog and the AI crawlers (GPTBot, ClaudeBot, PerplexityBot). A pattern matching every agent turns streaming off, so they sit in `<head>` for everyone. The setting is in the built server config.
- **Descriptions** (all 70 to 155 characters, enforced by a test): homepage, `/services`, strategy, implementation, executive recruitment, `/courses`, digital twin snapshot, privacy, terms, cookies and `/links`. The homepage still says "100+ organizations served across 40+ years of consulting", which stays unverified under the SEO addendum; a test fails if it is altered by accident.
- **`lib/seo/post-content.ts`:** `composeMetaDescription` keeps a post's excerpt when it is 70 or more characters, and otherwise follows a short subtitle with the opening of the post (nothing invented; a subtitle repeated at the start of the body is not said twice). Six posts were under 70 characters, for example "Pattern Recognition" (19). `ensureImageAlt` gives every post-body image alt text: its own if present, then its `title`, then the `<figcaption>` that follows it, then "Image from “Post title”".
- **Headings:** blog index post titles, the three `/courses` tiers and the `/resources` cards moved to `<h2>`.

## 3. Security headers

`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin` on every route, and a production-only Content-Security-Policy (`next dev` needs eval for hot reload).

The policy is `default-src 'self'`, scripts from `'self'` and `https://www.googletagmanager.com` only, no `unsafe-eval`, `object-src 'none'`, `frame-ancestors 'self'`, `base-uri 'self'`, `form-action 'self'`, analytics connections allowed to Google, and images from any `https:` source (blog covers and a pasted admin URL can come from anywhere). It is tight because the third-party footprint is small and known: Google Analytics is the only third-party script, the code has no iframes, embeds, off-site form posts or client calls to other origins, and the 11 published post bodies contain none either (checked against the database).

**`'unsafe-inline'` is deliberate** for scripts and styles: Next.js inlines its bootstrap data and the Analytics snippet, and React sets inline styles. Removing it needs a per-request nonce from middleware. The policy still blocks every other script origin.

**How it was tested.** A production build was served locally with a fake Analytics ID (so no test traffic reached the real property) and a reporting address added to the policy in the throwaway copy only. A deliberate violation (a script from `example.com`) was reported, proving the method. Then the homepage with the contact modal, a blog post with Substack images, the newsletter, the digital twin tool, the admin login and several service pages produced **zero violations on the public site**. Analytics loaded and sent its beacon, all images and fonts loaded, and the pages hydrated.

One report appeared, on `/admin/login` only: `script-src` blocked `eval`. It is zod's built-in check for whether eval is allowed (`allowsEval`, zod 4.3.6), wrapped so that it falls back to its normal path when blocked. Nothing breaks; it logs one line in the browser's developer tools on admin pages. It can be silenced with `z.config({ jitless: true })` if it ever matters.

**If something stops working after a deploy,** open the browser console and look for "Refused to ..." lines: they name the exact directive to widen in `lib/security-headers.ts`.

## 4. Why "Images over 100 kB" is mostly not a defect

A crawler fetches each image's `src` exactly as written and does not say it accepts AVIF or WebP. Next's image optimizer picks the format from that request, so the crawler gets the original PNG at the largest size label (`w=3840`).

| Same 84 image URLs, fetched two ways | Over 100 kB |
|---|---|
| As a crawler does (`Accept: */*`) | **29** (PNGs up to 642 kB) |
| As a browser does (AVIF/WebP accepted) | 9 (the same largest size label; browsers pick smaller srcset sizes) |

Real visitors get AVIF at about 20 to 65 kB. The only way to satisfy this filter is to recompress the source PNGs in `public/` (many are 1 to 2 MB) to smaller JPEG/WebP files. That would also cut repo size, but it changes image files and needs a visual check. Not done.

## 5. Verification (local production build, throwaway copy)

- Security headers present on `/`, a blog post, an API route and `/privacy`.
- Head metadata: **0 of 15** fetches per post with the crawler user agent had anything outside `<head>`, on four posts. **Caveat:** the live site with the old setting also showed 0 of 20 on the same four posts, so this problem is intermittent and rare and could not be reproduced on demand. The fix follows from the cause and from Next's documented behaviour, not from a before-and-after measurement.
- The six short-excerpt posts now have descriptions of 146 to 154 characters; the two posts with image alt problems have 0 empty or missing alt.
- Heading order: `/courses`, `/resources` and the blog index start h1, h2.
- `tsc` exit 0; `npm test` 99 of 99; ESLint unchanged from `main` per file.

## 6. Not done, and decisions that are yours

- **`/digital-twin-snapshot` and `/links` have no `<h2>`** (a tool page and a link-in-bio page). Left as is.
- **The post "Strategic Confluence: A Beginner's Guide…"** still jumps from `<h1>` to `<h3>` inside its stored body, and its title is 61 characters. Both are editorial (admin editor), not code.
- **Alt text for the three post images** is now a generic "Image from “title”". Real descriptions in the admin editor would be better.
- **Recompressing the source PNGs** to answer "Images over 100 kB" (section 4).
- **Self-hosting the fonts** to remove the occasional build failure from Google Fonts. Needs a decision.
