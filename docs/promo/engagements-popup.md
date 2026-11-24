# Engagements popup ("Focused engagements")

**Branch:** `feature/engagements-popup` · **Status:** built and tested locally, **not pushed, not merged, not deployed.**
Replaces the first version (a detail-page style popup) entirely.

Four finished banner graphics in a carousel, beside a fixed intro panel on desktop, as a bottom sheet on phones. The graphics carry their own text, price and "View details" button; nothing is laid over them, and the whole slide is the link.

> bbtx.ai is a Next.js app, so this is built in the repository. Nothing was done in Webflow.

## Three things still open (all flagged in `lib/promo/engagements.ts`)

1. **Prices on two graphics disagree with the briefs.** The graphic for **Staying Relevant** prints **$799** (the brief lists the workshop at $99). The graphic for **Personal Assessment & Coaching** prints **$799** (the earlier brief said $599). The graphics are shown as supplied and the alt text matches what each graphic prints, so a screen reader hears the same price a sighted visitor sees. If a graphic is wrong, re-export it, then change `price` and `alt` for that slide. **Do not publish until this is settled.**
2. **Where each slide goes.** No page exists for any of the four offers, so every slide opens the existing contact form with its offer pre-selected (an inquiry, not a booking). To link a slide to its page, change its `destination` to `{ kind: "link", href: "<approved page>" }`.
3. **"Compare all four".** The offerings page is not named. The link points to `/services` (a real page) as a stand-in. Change `PANEL.compare.destination`.

Smaller: the trust row shows Grant's **role** from the site's team page ("CEO & Founder, BBTx Consulting"), because no degree or credential is stated anywhere on the site and none was invented. The headshot is a crop of `grant-avatar.jpg`, the site's own photo of him (a profile shot); swap `public/promo/grant-headshot.webp` for a posed portrait if one exists.

## Review it

On any running copy of this branch, open any page with `?promo=open` (add `&slide=1` to `4`), for example `http://localhost:3000/?promo=open&slide=2`. Review mode ignores the triggers, the page list and the 7-day rule, remembers nothing and sends **no analytics**.

## What it does

| | |
|---|---|
| **Layout, desktop (1024 px and up)** | 1200 x 680 frame (scales down in proportion on smaller windows), `#111` background, 12 px corners, dimmed backdrop. Left panel one third wide, fixed across slides: logo, red rule and eyebrow, serif headline, one line of supporting text, Grant's photo with name and role, "Compare all four", then the `01 / 04` counter with a red active dash. Right two thirds: the carousel. |
| **Carousel** | Auto-advances every 6 s, paused while the mouse is over it, while keyboard focus is inside it, while the tab is hidden, and never with reduced motion. 400 ms crossfade. White round Previous/Next arrows on the edges, small white X top right on the image, swipe on touch, Left/Right arrow keys. Graphics use `object-fit: cover` anchored left, so the text (which sits at the left) is never cropped; on phones the box has the files' own shape, so nothing is cropped at all. |
| **Phones (under 768 px)** | Bottom sheet, full width: logo and headline, then the carousel, then the counter. Tablets (768 to 1023 px) get the same stack in a centred 640 px modal. |
| **When it appears** | Desktop: when the cursor leaves through the top of the window, once the visitor has been on the page 5 s. Everyone: **5 s after the page loads**, or at 50% scroll (never sooner than 3 s after load, so a restored scroll position cannot trigger it). Waits and retries while another dialog or the mobile menu is open, a field has focus, or the tab is hidden. |
| **Where** | Every page **except** offer and booking pages and pages not meant for browsing: `/services` and below, `/coaching`, `/courses`, `/digital-twin-snapshot`, `/assessment`, `/resources/ai-readiness-assessment`, `/book`, `/booking`, `/schedule`, `/admin`, `/api`, `/links`, `/privacy`, `/terms`, `/cookies`. The list is `EXCLUDED_PATHS` in `lib/promo/popup-logic.ts`. To restrict it to the homepage instead, change that one function. |
| **Once per 7 days** | Recorded in `localStorage` **when it appears**, not only when it is closed, plus a per-visit memory so it never returns on the next page, even with storage blocked. |
| **Closing** | X, Escape, or a click on the backdrop. A click inside never closes it. Focus returns to where it was (except after a click on a slide, when the contact form takes over). |
| **Accessibility** | `role="dialog"` with `aria-modal`, focus moved in and trapped, carousel and slide roles, slide changes by the visitor announced (automatic ones are not), every image has alt text naming the offer and price, 44 px touch targets, visible focus rings, page scroll locked without a layout jump. |
| **Brand** | `#C8102E` for the rule and the active dash. Everything else is black, white or gray. This is local to the popup; the rest of the site keeps its own red. A check in the test suite fails if any other colour appears. |

## Images

The four PNGs (about 500 KB each, 678 to 679 px wide, 2.1 MB together) are saved as **WebP at quality 92 in `public/promo/`, 51 to 70 KB each (about 90% smaller, 237 KB together)**. Measured against the originals: PSNR 39.8 to 41.8 dB and SSIM 0.987 to 0.989; at 2x zoom the text edges and the "View details" buttons are indistinguishable from the PNGs. The unused alpha channel was dropped (it was fully opaque). They are served as they are. Next's image optimizer was tested and left out for these four: it rejects quality 90, and at its default of 75 it re-encodes them to AVIF at 37.6 dB, visibly softer small text.

**The source files are only 678 px wide.** The right panel is 800 px wide, so the browser enlarges them by about 18% (about 2.4x on a Retina screen). They look acceptable but not razor sharp. Exporting the graphics at 1600 px wide would fix that; the same compression settings apply.

## Files

| File | Job |
|---|---|
| `lib/promo/engagements.ts` | **The one place for the intro text, the four slides, alt text and destinations.** |
| `lib/promo/popup-logic.ts` | Timings, page list, 7-day rule, interruption rules. Pure and unit-tested. |
| `lib/promo/inquiry-labels.ts` | The four inquiry types handed to the contact form. |
| `app/components/engagements-popup/EngagementsPopupTrigger.tsx` | Decides **when**. Renders nothing; loads the popup code only at that moment. |
| `app/components/engagements-popup/EngagementsPopup.tsx` | The dialog and carousel. |
| `app/layout.tsx` | One line mounts the trigger for every page. |
| `app/components/ContactModal.tsx` | Lists the four offer names in "What can we help you with?" (the original six options are untouched). |
| `app/globals.css` | One block of `.promo-*` rules (entrance motion only). |
| `public/promo/` | The four compressed graphics and the 160 px headshot crop. |
| `tests/promo/engagements-popup.test.mjs` | 24 tests for rules, copy guards, page list, brand colours and the one analytics path. |

## Analytics

Through the site's existing `trackEvent` wrapper (GA4 is installed); no second tool, no personal data. GA4 attaches the page location itself.

| Event | When | Parameters |
|---|---|---|
| `mini_engagement_popup_view` | Popup appears | `offering_id`, `offering_name`, `slide_number`, `trigger` (`timer`, `scroll` or `exit`) |
| `mini_engagement_slide_view` | A slide is shown, once per slide per popup (including automatic changes) | `offering_id`, `offering_name`, `slide_number` |
| `mini_engagement_cta_click` | A slide or "Compare all four" is clicked | the same, plus `cta_type` (`contact_form`, `offer_page` or `compare_link`) and `inquiry_type` |
| `mini_engagement_popup_close` | Closes, once | `close_method` (`close_button`, `escape`, `backdrop`, `cta`), `slides_viewed`, `last_slide_number`, `last_offering_id` |

Custom parameters appear in GA4 reports only after they are registered as custom dimensions (an account setting, not done here).

## QA

Rendered in headless Chrome with a throwaway profile against a local dev server, with Google Analytics requests blocked. Desktop 1440 x 900 (panel exactly 1200 x 680), phone 390 x 844. Scripted checks cover the exit-intent, 5 s and 50% scroll triggers, nothing before the arm time, no exit intent on touch, no popup on the offer pages, popup on a non-offer page, waiting while the contact form is open or a field has focus, once-per-7-days across reload, 6 s auto-advance, hover and focus pause, 400 ms crossfade, wrap in both directions, keys, swipe, focus trap, scroll lock, X, Escape and backdrop, focus return, slide click opening the contact form with the offer pre-selected, one of each analytics event, brand-colour audit of the rendered popup, no cropping on a phone, blocked storage, and reduced motion. `npm test`, `tsc`, ESLint (on every file added or changed) and `next build` pass.

**Not checked:** a real phone, Safari or Firefox, a screen reader. The round "N" bottom-left in dev screenshots is Next's development-only badge and does not ship.
