# Homepage engagements popup

**Branch:** `feature/engagements-popup` (from `main` at `4f45ab0`) · **Status:** built and tested locally, **not pushed, not merged, not deployed.**
**Content status:** all copy, prices and inclusions are the baseline from the promotional brief and still need Grant's approval.

The popup **is** the carousel: four slides, Previous/Next, no autoplay. There is no banner, teaser or second popup.

> The brief describes a Webflow site. bbtx.ai is a Next.js app (App Router, Tailwind v4) on Vercel, so the popup is built as part of this repository. Nothing was done in Webflow.

## Review it without waiting

On any running copy of this branch, open the homepage with `?promo=open`:

- `/?promo=open` shows it at once, on slide 1.
- `/?promo=open&slide=3` opens on the third engagement (1 to 4).

Review mode ignores the delay and any earlier dismissal, remembers nothing, and sends **no analytics**, so reviewing never changes the real numbers. Without the parameter the popup follows the rules below.

## Files

| File | Job |
|---|---|
| `lib/promo/engagements.ts` | **The one place for copy, prices, inclusions and CTA destinations.** Edit here to change what the popup says. |
| `lib/promo/popup-logic.ts` | Behaviour rules: delay, scroll threshold, 7-day dismissal, what counts as an interruption, wrapping. Pure, unit-tested. |
| `lib/promo/inquiry-labels.ts` | The five inquiry types the CTAs hand to the contact form. |
| `app/components/engagements-popup/EngagementsPopupTrigger.tsx` | Decides **when** to show. Renders nothing; loads the popup code only at that moment. |
| `app/components/engagements-popup/EngagementsPopup.tsx` | The dialog and the four slides. |
| `app/components/engagements-popup/TwinMap.tsx` | The Digital Twin slide's drawn picture. |
| `app/globals.css` | One block of `.promo-*` rules (grid areas, entrance and slide motion). Nothing else in the file changed. |
| `app/page.tsx` | One line: mounts the trigger. It is on the homepage only. |
| `app/components/ContactModal.tsx` | Adds the five engagement names to the "What can we help you with?" list (see below). |
| `tests/promo/engagements-popup.test.mjs` | 20 tests: rules, data, copy guards, scoping, one analytics path. |

## Behaviour

| Rule | How it works |
|---|---|
| When it appears | 10 seconds after load, **or** once 30% of the page is scrolled, whichever is first. The scroll route waits at least 3 seconds, so a browser restoring the scroll position on reload cannot trigger it at first paint. |
| Never interrupts | It waits and retries every 1.5 s while another dialog is open (contact or subscribe form), the mobile menu is open, a field has focus (typing), or the tab is hidden. |
| Once per visit | Remembered in memory and `sessionStorage`, so returning to the homepage later in the visit, or blocked storage, does not bring it back. |
| After closing | Close button, Escape, backdrop click or a CTA all count as dismissed: `localStorage` records it and it stays away for 7 days. Blocked storage is handled (it still shows once per visit, no errors). |
| Navigation | Previous / Next (both wrap), clickable pagination ticks, Left/Right arrow keys while focus is inside the dialog, and a horizontal swipe on touch screens. No autoplay. |
| Accessibility | `role="dialog"` `aria-modal`, carousel and slide roles with "1 of 4: name" labels, polite live announcement on change, focus moves in and is trapped, focus returns to where it was on close (except after a CTA, when the contact form takes over), page scroll locked without a layout jump, visible focus rings, buttons at least 44 px, reduced motion switches the entrance and slide motion off. |
| Layout | Under 768 px a bottom sheet (up to 92% of the screen height, scrolls inside, the CTA stays in view). 768 to 1023 px a centred 680 px modal. From 1024 px a 1040 px modal with a fixed height: argument on the left, picture, name, price and action on the right. Slide 4 has its own composition with two balanced price columns. |

## Where each CTA goes

All five CTAs open the site's **existing contact form** with the engagement pre-selected in "What can we help you with?", so Grant sees which engagement was asked about. It is an inquiry, not a booking or payment. Nothing was invented: no URL, no registration page, no checkout.

| Slide | CTA | Destination now | Needs a decision? |
|---|---|---|---|
| 1 Digital Twin Assessment | Get a Clearer View of Your Business | Contact form, "Digital Twin Assessment" | Grant: is the contact form the right first step, or should this book a call (Calendly) instead? |
| 2 Personal Assessment & Coaching | Discover Your Strengths | Contact form, "Personal Assessment & Coaching" | Same |
| 3 AI Workflow Design & Coaching | Expand Your Capabilities with AI | Contact form, "AI Workflow Design & Coaching" | Same |
| 4A Public Workshop | Explore the Workshop | Contact form, "Staying Relevant: Public Workshop" | **Yes.** No registration page or date exists. Grant to say how interest is captured (contact form as now, newsletter, or a waitlist). |
| 4B Individual Relevance Analysis | Explore Individual Relevance Analysis | Contact form, "Staying Relevant: Individual Relevance Analysis" | Same as 1 to 3 |

To send a CTA somewhere else, change its entry in `lib/promo/engagements.ts` from `kind: "contact"` to `kind: "link"` with an approved `href`. No other file needs to change.

## One change outside the popup: the contact form

`ContactModal.tsx` now lists the five engagement names between the existing options and "General Inquiry". The original six options are untouched and the form, API and database are unchanged (`inquiry_type` already accepts any text). When this ships, those five names also appear in the dropdown for people who open the form from anywhere on the site.

## Analytics

Sent through the site's existing `trackEvent` wrapper (GA4 is already installed); no second tool, no personal data. GA4 attaches the page location to every event itself.

| Event | When | Parameters |
|---|---|---|
| `mini_engagement_popup_view` | Popup appears | `offering_id`, `offering_name`, `slide_number`, `trigger` (`timer` or `scroll`) |
| `mini_engagement_slide_view` | A slide is shown, **once per slide per popup** (slide 1 on open) | `offering_id`, `offering_name`, `slide_number` |
| `mini_engagement_cta_click` | A CTA is clicked | the three above, `cta_type` (`contact_form`), `inquiry_type`, and `offering_option` (`public_workshop` or `individual_analysis`, slide 4 only) |
| `mini_engagement_popup_close` | Popup closes, once | `close_method` (`close_button`, `escape`, `backdrop`, `cta`), `slides_viewed`, `last_slide_number`, `last_offering_id` |

A CTA click logs `cta_click` and then one `popup_close` with method `cta`. Parameters such as `offering_id` only show up in GA4 reports once registered as custom dimensions in GA4 Admin (an account setting, not done here).

## Content notes for Grant

- **Typo fixed:** the brief's "relationshi, challenges" is "relationships, challenges".
- **Italic phrase** in each headline (for example "different perspective") echoes the homepage hero. Wording is unchanged.
- **"Date to be announced."** sits under the workshop inclusions because the date is not final. It promises nothing (no seats, no registration). Delete the `note` line in `lib/promo/engagements.ts` if Grant would rather not mention it.
- **Not shown anywhere:** the proposed 50% discount for earlier attendees. A test fails if discount wording or a registration or seats claim is added.
- **Pictures:** slide 1 is a drawn relationship map (a red dashed node is the "blind spot"; no labels, so it claims nothing). Slides 2 and 3 use `serv1.png` and `serv5.png`, photos already on the site, with the site's existing alt text. Slide 4 is typography only. Nothing is loaded when the popup opens; a photo is requested only when its slide is first shown.

## QA done

Real rendering, headless Chrome with a throwaway profile, against a local dev server (all four slides at 1440, 1280, 768 and 390 px, slides 1 and 4 also at 1920 and 375 px): no horizontal overflow, no console errors, every slide readable. Scripted behaviour checks (44) cover the 10-second and 30% triggers, no show at 2 s, waiting while the contact form is open or a field is focused, wrap in both directions by button and arrow key, pagination, focus trap with Tab and Shift+Tab, Escape, backdrop and inside-click, scroll lock and release, 7-day dismissal across reload, blocked storage, reduced motion, CTA-to-contact-form pre-selection for slides 1 and 4, no popup on `/services`, and one of each analytics event with no duplicates. `npm test` 122 of 122, `tsc` clean, ESLint clean on every file added or changed, and `next build` succeeds.

**Not checked:** a real phone (touch swipe and the sheet against a real browser toolbar are checked only in emulation), Safari and Firefox, a screen reader, and the Next.js dev badge (the round "N" bottom-left in dev screenshots is a development-only indicator and does not ship).
