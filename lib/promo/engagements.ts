// Everything the engagements popup shows, in one place. The four banner graphics carry their own
// text, price and "View details" button; this file adds the words around them, the alt text, and
// where each slide goes. Edit here, nowhere else.
//
// STATUS: staged for review, not published. One thing below is still open (see PENDING).

import type { EngagementInquiry } from "./inquiry-labels.ts";

/**
 * Where a slide goes. Each of the four goes to its offering page (see lib/offerings/offerings.ts).
 * A "contact" destination (the contact form with an offer pre-selected) remains available.
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

// PENDING:
// Prices. The graphics for "Staying Relevant" and "Personal Assessment & Coaching" both print $799. The
// offering pages (the latest copy) say the Staying Relevant workshop is $99 and the private analysis
// $599, and Personal Assessment & Coaching is $599. The graphics are shown as supplied and the alt text
// matches what each graphic prints; if a graphic is wrong it needs re-exporting, then update `price` and
// `alt` to match.

export const SLIDES: readonly [PromoSlide, PromoSlide, PromoSlide, PromoSlide] = [
  {
    id: "staying-relevant",
    name: "Staying Relevant",
    price: "$799",
    image: "/promo/engagement-01-staying-relevant.webp",
    alt: "Staying Relevant, $799: Stay relevant in a changing business landscape. Strategy, AI, and leadership guidance. A hiker stands on a rocky peak above mountain clouds. View details.",
    destination: { kind: "link", href: "/offerings/staying-relevant" },
  },
  {
    id: "digital-twin-assessment",
    name: "Digital Twin Assessment",
    price: "$599",
    image: "/promo/engagement-02-digital-twin-assessment.webp",
    alt: "Digital Twin Assessment, $599: See your organization more clearly. A glass office tower seen from below against a cloudy sky. View details.",
    destination: { kind: "link", href: "/offerings/digital-twin-assessment" },
  },
  {
    id: "personal-assessment-coaching",
    name: "Personal Assessment & Coaching",
    price: "$799",
    image: "/promo/engagement-03-personal-assessment-coaching.webp",
    alt: "Personal Assessment & Coaching, $799: A clearer sense of your strengths, focus, and next steps. A notebook and pen on a small table beside an armchair. View details.",
    destination: { kind: "link", href: "/offerings/personal-assessment-coaching" },
  },
  {
    id: "ai-workflow-design-coaching",
    name: "AI Workflow Design & Coaching",
    price: "$799",
    image: "/promo/engagement-04-ai-workflow-design-coaching.webp",
    alt: "AI Workflow Design & Coaching, $799: Put AI to work without losing your judgment. A hand draws a flowchart on paper next to a laptop. View details.",
    destination: { kind: "link", href: "/offerings/ai-workflow-design-coaching" },
  },
] as const;

/** The words beside the carousel on desktop, and above it (eyebrow and headline only) on phones. */
export const PANEL = {
  eyebrow: "NEW FROM BBTx CONSULTING",
  headline: "You don\u2019t need a big project to get started",
  body: "Some questions are worth exploring before committing to a larger consulting engagement. We\u2019ve put together four focused ways to work with you on your business, professional growth, and making AI useful in your work.",
} as const;
