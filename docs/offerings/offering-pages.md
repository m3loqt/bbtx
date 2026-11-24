# Offering pages (`/offerings/<slug>`)

**Branch:** `feature/engagements-popup` · **Status:** built and tested locally, **not pushed, not merged, not deployed.**

Four short pages, one per focused engagement, in the white theme with the existing site nav and footer and a full-bleed image across the top.

| Address | Page | Price(s) |
|---|---|---|
| `/offerings/digital-twin-assessment` | Digital Twin Assessment | $599 |
| `/offerings/personal-assessment-coaching` | Personal Assessment & Coaching | $599 |
| `/offerings/ai-workflow-design-coaching` | AI Workflow Design & Coaching | $799 |
| `/offerings/staying-relevant` | Staying Relevant in an AI-Driven World | $99 workshop, $599 private analysis |

Any other address under `/offerings` is a 404. There is no `/offerings` index page and nothing in the nav or footer links to these pages yet; the popup's slides are the way in for now.

## Three facts to confirm with Grant before publishing

These came with the copy and are not decided by the code:

1. Which personal assessments BBTx will include on Personal Assessment & Coaching.
2. Whether the Digital Twin engagement includes a particular model, or only written findings.
3. Whether the private Personal Relevance Analysis is available immediately alongside the workshop.

Also: the popup graphics for Staying Relevant and Personal Assessment still print **$799**, which disagrees with these pages ($99 and $599, and $599). See `docs/promo/engagements-popup.md`.

## What a page contains

- **Full-bleed hero** (51% of the window height, 384 to 560 px; 54% and 432 to 576 px on phones, so the headline has room). The site nav sits over it, transparent with white text, and turns solid once you scroll past (the same behaviour as the homepage; the hero carries `id="hero"` for that).
- **The headline sits on the hero**, bottom left, in white: a red rule and small line ("BBTx CONSULTING / FOCUSED ENGAGEMENT"), the name in a large serif, and the one-line promise. It has the same left edge and 720 px width as the text column below, so the two line up. A dark gradient rises from the bottom of the image behind it. I measured the real pixels behind each line on all four images at four screen sizes: the smallest text (the red-rule line) never drops below 5.3:1 contrast (4.5:1 is the standard), the headline never below 8.8:1, the promise never below 12:1.
- **A single left-aligned column**, 720 px wide, below: the opening paragraphs, **What's Included** (hairline rows with a red dot), **How It Works**, then the price large beside its button under a solid rule.
- **Five FAQs** (the supplied copy, per offering) near the bottom, using the **homepage FAQ component** (grey rounded cards, +/- tiles, first question open). The eyebrow is the offering's name and the heading is the homepage's "Frequently Asked *Questions*" at a smaller size, since the page already has a large headline. They are the **last section, directly above the footer**, after the price and button, so they never interrupt the text above them. On the Staying Relevant page they follow the private option, so the last question (workshop versus private analysis) has its context.
- **Staying Relevant** has two parts: the workshop (what it is, what we'll cover, **$99 per person**, "Ask About the Next Workshop") and, on a light band below, **Prefer to Work Through It Privately?**, the Personal Relevance Analysis (what's included, **$599**, "Ask About a Personal Relevance Analysis"). Nothing promises a date, seats or registration.
- **Buttons** open the existing contact form with the offering pre-selected (so Grant sees which one was asked about). An inquiry, not a booking or a payment. The workshop button is solid red; the private-analysis button is outlined, as the second choice.
- Existing site **footer** at the bottom.

Red is `#C8102E` (as in the popup), deliberately not the site's brick red; text is black and grays on white.

## Copy

Supplied copy, used as written, with two typos fixed ("at wk or" is "at work or"; "ratherxplore" is "rather explore"). The notes that came with it (why the writing is the way it is, the three facts above, the length recommendation) are not page copy and are not published. All words, prices and image choices live in `lib/offerings/offerings.ts`.

## Images

The four source PNGs (1774 x 887 px, about 2 MB each, 8.1 MB together) are saved as WebP at quality 84 in `public/offerings/`: **79 to 121 KB each, about 410 KB together (about 95% smaller)**, PSNR 40.9 to 42.8 dB against the originals. They go through the site's image optimizer, so each visitor also gets an AVIF or WebP at the size their screen needs. Each page also has a 1200 x 630 JPEG share image in `public/offerings/og/` (80 to 109 KB) for link previews.

The sources are 1774 px wide, so on a screen wider than that the hero is enlarged a little; on Retina screens it is about 1:1 at 887 CSS px. For a crisper hero on very large screens, export the artwork at 2560 px wide.

## FAQs

All 20 questions and answers live in `lib/offerings/offerings.ts` (`faqs`) and are as supplied; the note that came with them (conversational tone, based on proposed scopes) is not published. **Grant still needs to approve the scopes the answers describe.** Prices named in an answer are checked by a test against the prices on the same page.

The shared component `app/sections/FAQ.tsx` gained two optional settings, `accent` (the colour of the + tile, here `#C8102E`) and `compact` (smaller heading and spacing). Their defaults are the old look, so the homepage, courses and coaching pages are unchanged (a test checks this).

**Structured data:** each page also emits `FAQPage` markup built from the very same questions and answers that are shown, so the two cannot disagree. The SEO project rules say not to add FAQ markup solely for rich results; these are useful visible FAQs, and the homepage already does the same. Delete the `<JsonLd data={faqJsonLd(...)} />` line in the page template if you would rather not.

## Search and sharing

Each page has its own title ("<name> | BBTx"), a 126 to 142 character description written from the page's own copy, a canonical address, share-image tags, and an entry in the sitemap (priority 0.85, like the service pages). Apart from the FAQ markup described above, no structured data was added; Service or Offer markup should wait until the three facts above are settled.

## Analytics

One event through the site's existing wrapper, with fixed values only (never anything typed): `offering_cta_click` with `offering_id`, `offering_option` (`workshop` or `private_analysis`, on Staying Relevant only) and `inquiry_type`. The popup's `mini_engagement_cta_click` still fires when a slide is clicked.

## Files

| File | Job |
|---|---|
| `lib/offerings/offerings.ts` | All page copy (including the FAQs), prices, image and meta choices. |
| `app/sections/FAQ.tsx` | The homepage FAQ, reused; two optional settings added. |
| `app/offerings/[slug]/page.tsx` | The page template (server component): hero with the headline on it, body, FAQ, closing price and button, metadata, static params. |
| `app/offerings/[slug]/OfferingCta.tsx` | The button: opens the contact form with the offering selected and reports the click. |
| `app/offerings/fonts.ts` | The serif used for headings (loads on these pages only). |
| `lib/promo/inquiry-labels.ts` | The five inquiry types (also listed in the contact form's dropdown). |
| `lib/seo/image-alt.ts` | Alt text for the four hero images. |
| `app/sitemap.ts` | The four new entries. |
| `public/offerings/` | The four compressed heroes and the share images. |
| `tests/offerings/offerings.test.mjs` | 15 tests: addresses, prices, copy fixes and no leaked notes, buttons, image sizes, meta, nav and footer, brand colours, sitemap, popup wiring. |

## QA

Rendered in headless Chrome against a local dev server with Google Analytics blocked, at 1440 x 900 and 390 x 844. Scripted checks on all four pages: loads with 200, title, description, canonical and share image, one h1 matching the name, full-width hero that is loaded and has alt text, nav and footer present, prices shown, no skipped heading level, no horizontal overflow, no popup on the page, the headline inside the hero, five FAQs with the first open and toggling, FAQ structured data matching the visible text exactly, the FAQ as the last section directly above the footer, each button opening the contact form with its offering selected and sending one analytics event, phone layout (headline inside the margins, buttons at least 56 px tall, 19 px body text), no console errors, an unknown address returning 404, and all four pages in the sitemap. `npm test`, `tsc`, ESLint on every file added or changed, and `next build` pass.

**Not checked:** a real phone, Safari or Firefox, a screen reader, and how the pages look next to the live site's nav once the footer or nav gain links to them.
