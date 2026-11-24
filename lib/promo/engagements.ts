// Everything the engagements popup shows, in one place. The four banner graphics carry their own
// text, price and "View details" button; this file adds the words around them, the alt text, and
// where each slide goes. Edit here, nowhere else.
//
// STATUS: staged for review, not published. Two things below are still open (see PENDING).

import { ENGAGEMENT_INQUIRY, type EngagementInquiry } from "./inquiry-labels.ts";

/**
 * Where a slide goes.
 * - "contact": opens the site's existing contact form with this inquiry type pre-selected.
 *   An inquiry, not a booking or payment.
 * - "link": a plain link to an approved page.
 */
export type Destination =
  | { kind: "contact"; inquiry: EngagementInquiry }
  | { kind: "link"; href: string; external?: boolean };

export type PromoSlide = {
  /** Stable id used in analytics. Never shown. */
  id: string;
  /** The offer's name. */
  name: string;
  /** The price printed on the graphic. Used in alt text; keep it equal to the graphic. */
  price: string;
  /** Pre-compressed WebP in /public/promo (originals are 678 to 679 px wide). */
  image: string;
  /** What the graphic shows, including the offer name and price, for people who cannot see it. */
  alt: string;
  /** Where clicking the slide goes. */
  destination: Destination;
};

// PENDING, none of these is decided by the code:
// 1. Offer pages. No page exists for any of the four offers, so every slide opens the contact form
//    with its offer pre-selected. To link a slide to its page, replace its destination with
//    { kind: "link", href: "<approved page>" }.
// 2. Prices. The graphics for "Staying Relevant" and "Personal Assessment & Coaching" both print
//    $799. The brief lists the Staying Relevant workshop at $99 and the earlier brief listed
//    Personal Assessment at $599. The graphics are shown as supplied; if a graphic is wrong it
//    needs re-exporting, then update `price` and `alt` to match.

export const SLIDES: readonly [PromoSlide, PromoSlide, PromoSlide, PromoSlide] = [
  {
    id: "staying-relevant",
    name: "Staying Relevant",
    price: "$799",
    image: "/promo/engagement-01-staying-relevant.webp",
    alt: "Staying Relevant, $799: Stay relevant in a changing business landscape. Strategy, AI, and leadership guidance. A hiker stands on a rocky peak above mountain clouds. View details.",
    destination: { kind: "contact", inquiry: ENGAGEMENT_INQUIRY.stayingRelevant },
  },
  {
    id: "digital-twin-assessment",
    name: "Digital Twin Assessment",
    price: "$599",
    image: "/promo/engagement-02-digital-twin-assessment.webp",
    alt: "Digital Twin Assessment, $599: See your organization more clearly. A glass office tower seen from below against a cloudy sky. View details.",
    destination: { kind: "contact", inquiry: ENGAGEMENT_INQUIRY.digitalTwin },
  },
  {
    id: "personal-assessment-coaching",
    name: "Personal Assessment & Coaching",
    price: "$799",
    image: "/promo/engagement-03-personal-assessment-coaching.webp",
    alt: "Personal Assessment & Coaching, $799: A clearer sense of your strengths, focus, and next steps. A notebook and pen on a small table beside an armchair. View details.",
    destination: { kind: "contact", inquiry: ENGAGEMENT_INQUIRY.personal },
  },
  {
    id: "ai-workflow-design-coaching",
    name: "AI Workflow Design & Coaching",
    price: "$799",
    image: "/promo/engagement-04-ai-workflow-design-coaching.webp",
    alt: "AI Workflow Design & Coaching, $799: Put AI to work without losing your judgment. A hand draws a flowchart on paper next to a laptop. View details.",
    destination: { kind: "contact", inquiry: ENGAGEMENT_INQUIRY.aiWorkflow },
  },
] as const;

/** The words beside the carousel on desktop, and above it (eyebrow and headline only) on phones. */
export const PANEL = {
  eyebrow: "NEW FROM BBTx CONSULTING",
  headline: "Is there something you\u2019ve been meaning to figure out?",
  body: "Maybe it\u2019s a question about your business, where you\u2019re headed professionally, or how to make AI useful in your work. We\u2019ve put together four focused ways to work with Dr. Grant Tate, without committing to a larger consulting project.",
} as const;
