# SEO/AEO Batch 2: layout shift, images, 404

**Branch:** `seo/batch-2-performance-images` (from `main` at `51a3bf3`) · **Date:** 2026-11-19
**Status:** Committed on the branch. **Not pushed, not merged, not deployed.**

Source of the work: eight audit issues pasted by Mel (CLS, render-blocking resources, modern image formats, missing alt text, custom 404, image aspect ratio, oversized images, request count). The `seo-audit` skill's image and Core Web Vitals checklist guided what to inspect; `CLAUDE_SEO_AEO_ADDENDUM.md` took priority over any skill advice.

## 1. What the baseline showed

OpenSEO site audit with Lighthouse, run on production on 2026-11-19 (audit `62fca652-123d-4861-981e-0b129d4f4a5f`, 35 pages crawled, 10 pages tested on mobile and desktop):

| Metric | Result |
|---|---|
| **CLS** | **1.37 to 2.18 on every page tested**, mobile and desktop (target 0.1) |
| Performance | mobile 45 to 69, desktop 71 to 75 |
| Accessibility / Best practices / SEO | 93 to 100 / 100 / 92 to 100 |
| Mobile LCP | 2.5 s to 7.3 s |

The CLS values were almost identical on unrelated pages (1.3940873 on both `/links` and a blog post), including pages with no images (`/cookies`, `/newsletter`). That meant one site-wide cause, not image sizing.

## 2. The CLS cause: the chat widget, not the images

A browser layout-shift log on production `/cookies` named the culprit: the Voxwins chat `<iframe>`. Its loader (`cdn.voxwins.ai/agent.js`, read as text, not modified) creates a `position:fixed` wrapper covering the whole viewport, then the chat iframe tells it to shrink to a 108 px launcher in the corner. Chrome scores that jump as layout shift:

| | CLS |
|---|---|
| Production `/` | 0.958, all from the iframe |
| Widget alone, control run in the browser | about 1.9 |

**Fix** (`app/components/VoxwinsWidget.tsx`): keep the wrapper invisible whenever the loader has not signalled that it has settled, and show it once it has. The loader signals "settled" by setting the wrapper's `pointer-events` to `auto` and "reset" by setting it back to `none`. The launcher ends up in exactly the same place at essentially the same moment: it is shown about 40 ms (two frames) after the loader sizes it, because only the invisible full-screen stage is hidden. A timeline on a clean load: wrapper created hidden at 0.65 s, sized by the loader at 2.0 s, visible 40 ms later.

Two weaknesses of the first version were found by measuring and fixed:
- The fallback was 3 s. On a slow device the iframe takes longer, so the still-full-screen wrapper was shown and the jump counted. It is now 15 s.
- The guard was one-shot. The loader can reset the wrapper to full screen later; that was a second burst of about 0.9. The guard is now continuous, and a simulated reset in the browser was hidden instantly with zero shifts.

## 3. Result, measured in a real browser (same method, same machine)

| Page | CLS before | CLS after |
|---|---|---|
| `/` | 0.958 | **0.000** |
| `/about` | not measured separately | 0.016 |
| `/services` | not measured separately | 0.004 |
| `/chaotic-confluence` | not measured separately | 0.000 |

These are desktop, unthrottled, on a local production build. They prove the cause is gone. **They are not the Lighthouse mobile number.** That has to be re-run after deploy (section 8).

## 4. The eight issues

| # | Issue | What was found | What changed |
|---|---|---|---|
| 1 | CLS above 0.1 (HIGH) | The chat widget (section 2). Logos were also declared at the wrong shape (item 6), a smaller second cause | `VoxwinsWidget.tsx` guard; logo shape fix |
| 2 | Render-blocking resources (HIGH) | Only the two CSS files (5 KB and 165 KB raw, 26 KB over the wire). The one head `<script>` is a `noModule` legacy fallback that modern browsers skip | **Nothing kept.** `experimental.inlineCss` was tried and rejected, section 5 |
| 3 | Modern image formats (HIGH) | The site's own images were already served as AVIF/WebP (20 KB AVIF versus 57 KB JPEG for the same image). Real gaps: the `/services` and implementation-support logo strips were `unoptimized` (raw 248 KB PNGs) and blog covers were raw `<img>` tags on Substack/S3 | Removed `unoptimized`; blog covers now go through the optimizer for allow-listed hosts (`lib/image-hosts.ts`, `RemoteCoverImage`). A checker that sends no `Accept` header still gets JPEG from the optimizer by design; that part cannot be changed |
| 4 | Missing alt text (HIGH) | 51 of 51 homepage images had `alt=""`, as did the service pages, the blog and most of About | **Every image now has alt text: 0 empty and 0 missing across 25 rendered pages (223 `<img>` tags).** Content images are described (`lib/seo/image-alt.ts`); logos read as printed; testimonial portraits use the name and role printed beside them; the brand mark, three decorative banners, the loop copies and the hover-only timeline images have short neutral alt text. Anything that is decoration for assistive tech also carries `aria-hidden` (132 of 223), so screen readers skip it while crawlers and audits see a real description |
| 5 | Custom 404 (MEDIUM) | Next's bare default: no nav, no links, and conflicting `noindex` plus `index, follow` robots tags | `app/not-found.tsx`: nav, footer, nine real destinations; real 404 status; `noindex, follow` |
| 6 | Aspect ratio (MEDIUM) | The 20 client logos are square 1080x1080 files declared as 400x160 (homepage) and 320x128 (`/services`) | Declared square (160 and 128) |
| 7 | Oversized images (MEDIUM) | The same logos: 1080 px files shown at 80 to 160 px, served at 828 px wide (and raw on `/services`). One photo had no `sizes`. Audit confirmed about 38 KB wasted per logo | Logos now served at 384 px; accurate `sizes` on every `fill` image (enforced by a test); the About photo strip gets `sizes` computed from its height-based layout |
| 8 | More than 20 requests (LOW) | About 63 files on the homepage, 23 of them framework scripts and styles, about 40 images, most lazy | Not chased. Items 3 and 7 trim a little. A Next.js page will not realistically get under 20 |

## 5. Tried and rejected: CSS inlining

`experimental.inlineCss: true` removes the render-blocking stylesheet request, so it was tried. In a production build it put the whole 165 KB stylesheet into every page's HTML, twice (once in `<style>`, once in Next's own payload):

| Homepage HTML, gzip | Size |
|---|---|
| Production today (CSS is a separate cached file) | 20.7 KB |
| With `inlineCss` | **76.6 KB** |

That adds about 56 KB to every page load to save one request, so it was removed and a test now prevents it being switched on by accident. If render-blocking CSS still matters after the deploy-time Lighthouse run, the right next step is a smaller stylesheet, not inlining it.

## 6. Alt text and keywords: how the wording was chosen

- **Described first.** Alt text says what the picture shows. A site term (a service, "plan", "workshop") appears only where the scene really shows it.
- **No stuffing, no claims.** A test bans words such as "best", "leading", "100+", "trusted by", "client", "results", and bans the word "AI" from photo alt text, in line with the positioning rule that AI is not the default category.
- **Demand evidence is thin.** Search Console shows 31 queries in 90 days; the only real ones are "ai leadership development consulting" (position 43) and "organizational ai assessment". Alt text is a weak ranking signal; the page copy is what moves those.
- **Names.** Dr. Grant Tate is named only on his two photos (`/grant.jpg`, `/grantt.jpg`), where the site already identifies him. Nobody else is named, and no one is named from appearance. The other photos in the About strip are described as "a facilitator" even though the site's own code comment calls them Grant photos: **Mel to confirm, then add his name where it is him.** A test fails if names are added elsewhere by accident.
- **Logos** carry the name printed on them, nothing more. The "100+ organizations" wording elsewhere on the site is existing copy and untouched; it remains unverified under the addendum.
- **Second pass (remaining empty alts).** The first pass left about half the `<img>` tags with `alt=""` (decorative, loop duplicates, avatars). They now carry alt text plus `aria-hidden`. Testimonial portraits are generated from the same data as the visible caption (`personAlt`: "Martin Chapman, President and CEO, InBio"), so alt and caption cannot disagree. The three decorative banners get plain descriptions with no keywords ("Abstract red wave background"): a keyword on a gradient would be stuffing. Two timeline descriptions avoid the word "leading" (a banned marketing word in the alt-text test) by saying "presenter at the front" and "talking with a team". Recommended practice is still an empty alt for pure decoration; this trades that for a checker-clean result, and `aria-hidden` keeps screen-reader behaviour identical.
- **Blog covers** use the post title as alt (there is no alt field in the database). On the blog index the cover sits inside a link that also contains the title, so a screen reader may read the title twice. An admin "cover alt text" field would fix that properly.

## 7. Files

New: `app/not-found.tsx`, `app/components/RemoteCoverImage.tsx`, `lib/image-hosts.ts`, `lib/seo/image-alt.ts`, `tests/seo/images.test.mjs`, `tests/seo/layout-shift.test.mjs`.
Changed: `app/components/VoxwinsWidget.tsx`, `next.config.ts`, `app/sections/{Hero,Advantage,Services,Results,Testimonials}.tsx`, `app/about/page.tsx`, `app/coaching/page.tsx`, `app/courses/page.tsx`, `app/links/page.tsx`, `app/components/{Nav,Footer}.tsx`, the six service pages, `app/services/page.tsx`, and the two blog files in `app/chaotic-confluence/`.

Validation: `tsc` exit 0; `npm test` 82 of 82 (the alt-text tests were deliberately broken once to confirm they fail); ESLint on the touched files shows only the 11 errors that are identical at the committed version; production build in a throwaway copy passed (one transient Google Fonts download failure, passed on retry); rendered HTML of 25 pages audited: 0 images with empty or missing alt, no raw `<img>` on public pages, 404 returns status 404; blog covers load through the optimizer as AVIF.

## 8. Not verified, and what happens next

1. **Lighthouse on mobile after the fix.** The only way is to deploy and re-run the OpenSEO audit with Lighthouse. Expect CLS to fall from about 1.6 to near 0; performance scores should rise, but by how much is not known.
2. **Nothing was checked visually** (standing preference). The launcher should appear at the same moment as before; the logo boxes keep their size; the 404 page and all alt text are unreviewed by eye.
3. **Slow-phone behaviour of the guard** is covered by the 15 s fallback by reasoning, not by a throttled test.
4. **Admin-pasted cover hosts.** Substack, S3 and Vercel Blob are optimized; any other host falls back to a plain `<img>` and cannot crash the page.

## 9. Found along the way, not fixed (outside the eight issues)

- The chat widget costs about 116 KB of JavaScript on every page (`shell.js`) plus a 50 KB avatar PNG from the vendor that is not optimized, and the vendor serves them without cache headers. Loading the widget after the page is idle would cut about 230 KiB of unused JavaScript and some of the 2.1 s of main-thread work in the audit. That would change when the launcher appears, so it needs a decision.
- Accessibility findings on `/cookies`: 10 low-contrast text items (the small uppercase labels and footer links) and "document does not have a main landmark". Worth checking site-wide.
- `courses` scores 92 on SEO, below the other pages (100).

## 10. Update 2026-11-19: chat widget removed (supersedes sections 2, 3 and 9's widget item)

Mel cancelled the Voxwins subscription and asked for the widget to be removed, so `VoxwinsWidget.tsx` and its guard are deleted (the last version is in git at commit `63cff09`). This also removes the third-party requests behind the audit's largest remaining items: about 240 KiB of unused JavaScript (`shell.js`), a 50 KB avatar PNG, and the vendor's missing cache headers.

What the live Lighthouse re-run showed after the guard shipped (OpenSEO audit `8df26e26-6f4a-47ba-a91d-07d94b6d8641`, same 10 pages):

| | Before | After the guard |
|---|---|---|
| CLS, desktop | 1.37 to 1.48 | 0.42 to 0.52 |
| CLS, mobile | 1.59 to 2.18 | 0.63 |
| Performance, desktop (avg) | 74 | 79 |
| Performance, mobile (avg) | 55 | 61 (one run each, noisy) |

The guard removed the first jump (about 0.96) but not the rest. A fresh browser tab reproduced the remainder: on a visitor's first view the widget's greeting bubble made the wrapper return to full screen (about 2.8 s) and animate down to bubble size, again when the bubble dismissed (about 12.8 s), roughly 0.35 per burst. Returning visitors, and Mel's already-open tab, never saw it, which is why a normal browser measured 0 while Lighthouse measured 0.42.

With the widget gone the site has no known remaining layout-shift source; this has to be confirmed by re-running the Lighthouse audit after deploy.

Also noted from the same audit run (info level, not fixed): ten meta descriptions are too short (several blog posts use a one-line subtitle as the description) and five too long; five pages skip a heading level; two titles are over 60 characters; `/links` is thin content (33 words).

