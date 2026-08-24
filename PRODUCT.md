# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: leaders and organizations (executives, senior managers, operations leads) seeking strategic planning, organizational assessment, leadership/organizational development, and change implementation guidance, guided directly by Dr. Grant Tate.

Course-specific audience (distinct from the org-leader buyer above): senior leaders/executives making AI adoption decisions, operations managers/team leads implementing AI day-to-day, and independent coaches/consultants building AI into their own practice. Course buyers self-select into a lower-commitment, fixed-price, self-paced or small-group product instead of (or ahead of) a full 1:1 consulting engagement.

## Product Purpose

BBTx sells Dr. Grant Tate's judgment, consulting experience, methods, and direct senior-led guidance — helping leaders make better decisions, align their people, and turn strategy into sustained execution. AI is an enabling capability, not the category (approved positioning, `docs/seo-aeo/OPEN_DECISIONS.md` DEC-001). The courses page packages parts of that same expertise into fixed-price, self-serve or small-group products that today are sold only on Gumroad with no home on bbtx.ai.

## Positioning

Eight real products, currently Gumroad-only:
- **Making Modern Managers** — one 17-chapter management-development curriculum, three access tiers: Self-Paced ($499), Group Cohort ($999, currently no live checkout), Individual Coaching ($3,500, includes six 1:1 sessions with Grant).
- **Five standalone AI courses** ($99–$599) with real, already-written Gumroad sales copy (curriculum, outcomes, positioning).
- The $599 "Building the Organizational Digital Twin" course is the paid, deeper counterpart to the site's existing free `/digital-twin-snapshot` lead-magnet tool — a credible, already-implied upsell path.

No neighboring competitor page can truthfully copy this: the courses are Grant's own 40-year consulting methodology packaged into products, not generic AI training content.

## Operating Context

- All purchasing happens on Gumroad (`chaoticconfluence.gumroad.com`); `/courses` links out to Gumroad checkout for the 7 already-purchasable products.
- The Group Cohort ($999) has no live Gumroad checkout (Gumroad itself reports "This product is not currently for sale") — treated everywhere as a waitlist/coming-soon state, never a purchase CTA.
- **Decided 2026-08-08 (Mel):** `/courses` becomes the single source of truth for all three Making Modern Managers tiers. `/coaching`'s existing "Work Directly with Grant" pricing section (Individual Coaching + Group Cohort cards, `app/coaching/page.tsx` `PLANS`) is being trimmed/redirected to point to `/courses` instead of duplicating it. `/coaching` keeps its hero/why/testimonial/FAQ content as the deeper 1:1-coaching persuasion page.
- `/coaching`'s live Group Cohort CTA currently points to a dead Gumroad URl reporting "not currently for sale" — a real, currently-live broken checkout, being fixed as part of this same work (swapped to the same waitlist treatment as `/courses`).
- Reusable existing sections/components: card grid (`app/sections/Services.tsx`), tiered pricing cards (`app/coaching/page.tsx` `PLANS` pattern), accordion FAQ (`app/sections/FAQ.tsx`, data-driven via `items`/`eyebrow`/`heading`/`closingNote` props), masonry testimonial wall (`app/sections/Testimonials.tsx`), full-bleed closing CTA band (`app/sections/CTA.tsx`).
- Working capture backend exists (Neon Postgres + Resend, pattern in `app/components/SubscribeModal.tsx` → `/api/newsletter`). **Decided 2026-08-08 (Mel):** the Group Cohort waitlist reuses this exact pattern with a distinguishing `source` value, no new infrastructure.
- **Decided 2026-08-08 (Mel):** "Courses" is added to site nav under the existing "Resources" dropdown (`app/components/Nav.tsx` `DROPDOWNS.Resources`), not as a new top-level nav item.

## Capabilities and Constraints

- Next.js 16 (App Router) + React 19, Tailwind v4 tokens in `app/globals.css`, shadcn/base-ui components, Neon serverless Postgres, Resend email.
- An existing but empty (0 rows) generic admin CRUD system at `/admin/courses` + a `courses` Postgres table already exists (built 2026-07-20), but its schema (single title/description/price/gumroad_url) doesn't support the tiered-ladder, multi-price-point layout this page needs. The public page is bespoke/static like `/coaching`, not wired to that table. Flagged to Mel; table left untouched, not deleted.
- Two real content-accuracy bugs exist on the live Gumroad listings themselves (outside this repo's control, not reproduced on bbtx.ai): (1) the Self-Paced $499 and Group Cohort $999 product pages both carry body copy duplicated verbatim from the Individual Coaching $3,500 page, wrongly describing six 1:1 coaching sessions; (2) three AI-course pages cross-sell two course names ("Introduction to Generative AI $99", "Mastering Prompt Patterns $99") that don't match any of the 5 real course titles — likely stale copy from an earlier naming pass. Both flagged for Grant to fix on Gumroad directly; Claude Code is not authorized to edit the live Gumroad listings.
- "100+ organizations served" / "Thirty years of consulting" phrasing appears in Grant's own real Gumroad course copy for 2 of the 5 AI courses. This is the same claim already tracked as unverified sitewide (`docs/seo-aeo/OPEN_DECISIONS.md` OPEN-001, gate H-005) — the courses page must not add new precision to it, only stay consistent with how the rest of the site currently handles it.

## Brand Commitments

- Voice: Grant Tate, 40+ years executive coaching/consulting. First person where Grant is genuinely speaking (course descriptions, FAQ answers); third person for structural/navigational text. Direct, restrained, no hype words ("transform," "unlock," "game-changing"), no exclamation points, no fake urgency. Contrast constructions ("not X, but Y") used sparingly, not as a repeated formula. Reference lines: "We don't simply gather data. We interpret results in the context of your goals, history, and operating realities." / "If you're looking for a quick tool recommendation, we're probably not the right fit."
- Visual system must read as built by the same designer as the rest of bbtx.ai — reuse existing tokens/components rather than inventing new ones unless content genuinely requires it.

## Evidence on Hand

- Real, usable Gumroad sales copy pulled live 2026-08-08 for 5 AI courses (Building the Organizational Digital Twin; AI for Leadership and Organizational Transformation; AI Implementation for Business Value; AI-Empowered Coaching & Consulting; Generative AI for Coaches and Consultants) and for the Individual Coaching Making Modern Managers tier — full curricula, outcomes, positioning, format/length/prerequisites. Available to adapt into site voice; not to be copied verbatim (copyright/voice-consistency).
- 6 existing testimonials in `app/sections/Testimonials.tsx` (Jamie Conklin, Golara Haghtalab, Terry Barnhart, Heather Higgins, Martin Chapman, Chris Kean) — all about Grant's coaching/consulting broadly. **None reference a specific course.** Do not attribute any of them to a course experience; use general credibility framing near pricing instead.
- Explicit absences future work must not fabricate: no real outcome-level description exists yet for the Self-Paced ($499) tier specifically (its Gumroad page copy is the coaching-tier bug noted above) — needs fresh, accurate copy describing the self-paced-only experience (full 17-chapter program, no coaching sessions, lifetime reference access). No waitlist copy beyond "coming soon" messaging exists yet.

## Product Principles

1. AI is an enabling capability BBTx offers, not the category BBTx competes in — courses stay clearly downstream of Grant's consulting practice, never read as a pivot to an "AI courses" business.
2. Never invent outcomes, counts, or specifics beyond what's confirmed; flag gaps instead of filling them.
3. Making Modern Managers is one program at three price points, never presented as three competing products.
4. Genuine constraints only: the Group Cohort's real unpublished status is legitimate "coming soon" language; no urgency is manufactured anywhere else on the page.
5. `/courses` is the single, non-duplicated source of truth for Making Modern Managers pricing; other pages (`/coaching`) link to it rather than re-hosting it.
