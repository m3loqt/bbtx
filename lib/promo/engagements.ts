// Single source of truth for the homepage engagements popup: copy, prices, inclusions and where
// each call to action goes. Edit this file to change what the popup says; nothing else holds copy.
//
// STATUS: baseline copy from the promotional brief. Every service detail here is still subject
// to Grant's final approval. Do not add commitments, dates, discounts or links that are not in
// the approved brief.

import type { AltKey } from "../seo/image-alt.ts";
import { ENGAGEMENT_INQUIRY, type EngagementInquiry } from "./inquiry-labels.ts";

/**
 * Where a call to action goes.
 * - "contact": opens the site's existing contact form with this inquiry type pre-selected, so
 *   Grant sees which engagement the visitor asked about. An inquiry, not a booking or payment.
 * - "link": a plain link, for a destination Grant approves later (a booking page, a
 *   registration page). None are used yet.
 */
export type PopupCta =
  | { kind: "contact"; label: string; inquiry: EngagementInquiry }
  | { kind: "link"; label: string; href: string; external?: boolean };

export type PopupVisual =
  | { kind: "map" }
  | { kind: "photo"; src: Extract<AltKey, "/serv1.png" | "/serv5.png">; position: string };

type Common = {
  /** Stable id used in analytics. Never shown. */
  id: string;
  name: string;
  headline: string;
  /** A phrase inside `headline` set in italics, as the homepage hero does. */
  emphasis: string;
  description: string;
};

export type SingleEngagement = Common & {
  layout: "single";
  price: string;
  included: readonly string[];
  cta: PopupCta;
  visual: PopupVisual;
};

export type EngagementOption = {
  /** Stable id used in analytics: which of the two formats was chosen. */
  id: "public_workshop" | "individual_analysis";
  name: string;
  price: string;
  included: readonly string[];
  /** A short factual line under the inclusions. Optional. */
  note?: string;
  cta: PopupCta;
};

export type DualEngagement = Common & {
  layout: "dual";
  options: readonly [EngagementOption, EngagementOption];
};

export type Engagement = SingleEngagement | DualEngagement;

export const ENGAGEMENTS: readonly [SingleEngagement, SingleEngagement, SingleEngagement, DualEngagement] = [
  {
    layout: "single",
    id: "digital-twin-assessment",
    name: "Digital Twin Assessment",
    price: "$599",
    headline: "See your business from a different perspective.",
    emphasis: "different perspective",
    description:
      "Even experienced leaders can miss important connections within their organization or their most valuable customer relationships. A focused Digital Twin assessment helps uncover potential blind spots, understand how different parts of the business interact, and identify where attention could make the greatest difference.",
    included: [
      "Initial Digital Twin analysis of your organization or a key customer",
      "Two private 60-minute sessions with Dr. Grant Tate",
      "Review of important relationships, challenges, and opportunities",
      "Written summary of findings and recommended priorities",
    ],
    cta: { kind: "contact", label: "Get a Clearer View of Your Business", inquiry: ENGAGEMENT_INQUIRY.digitalTwin },
    visual: { kind: "map" },
  },
  {
    layout: "single",
    id: "personal-assessment-coaching",
    name: "Personal Assessment & Coaching",
    price: "$599",
    headline: "Understand your strengths. Make your next move with confidence.",
    emphasis: "next move",
    description:
      "Your experience has shaped how you lead, work, and make decisions, but understanding your own patterns can open new opportunities for growth. Through BBTx's personal assessments and coaching with Dr. Grant Tate, you'll gain a clearer picture of your strengths and identify practical ways to build on them.",
    included: [
      "Selected BBTx personal assessments and individual profile",
      "Two private 60-minute coaching sessions with Dr. Grant Tate",
      "Personalized interpretation of strengths and development opportunities",
      "Written summary with practical development priorities",
    ],
    cta: { kind: "contact", label: "Discover Your Strengths", inquiry: ENGAGEMENT_INQUIRY.personal },
    visual: { kind: "photo", src: "/serv1.png", position: "50% 20%" },
  },
  {
    layout: "single",
    id: "ai-workflow-design-coaching",
    name: "AI Workflow Design & Coaching",
    price: "$799",
    headline: "Make AI work for you, without losing what makes your work valuable.",
    emphasis: "what makes your work valuable",
    description:
      "Your experience and judgment are valuable assets that AI can help you put to greater use. Work with Dr. Grant Tate to discover where AI can extend your capabilities, streamline your work, and support a more effective way of working that fits your expertise.",
    included: [
      "Review of current work activities and opportunities for AI support",
      "Two private 60-minute working sessions with Dr. Grant Tate",
      "Design of one personalized AI-supported workflow",
      "Practical guidance and a written implementation plan",
    ],
    cta: { kind: "contact", label: "Expand Your Capabilities with AI", inquiry: ENGAGEMENT_INQUIRY.aiWorkflow },
    visual: { kind: "photo", src: "/serv5.png", position: "50% 40%" },
  },
  {
    layout: "dual",
    id: "staying-relevant",
    name: "Staying Relevant in an AI-Driven World",
    headline: "Your experience matters. Make sure its value is recognized.",
    emphasis: "value is recognized",
    description:
      "AI is changing how expertise is used, recognized, and valued across professions and industries. Explore where your experience and judgment continue to make a difference, how your professional role can evolve, and what you can do to remain visible and relevant as work changes.",
    options: [
      {
        id: "public_workshop",
        name: "Public Workshop",
        price: "$99",
        included: [
          "90-minute interactive workshop with Dr. Grant Tate",
          "Explore how AI is changing professional expertise and identity",
          "Guided job-analysis exercise",
          "Personal relevance action plan",
        ],
        // The workshop date is not final. This says so plainly and promises nothing: no
        // registration, no seats. Remove the line if Grant prefers not to mention it.
        note: "Date to be announced.",
        cta: { kind: "contact", label: "Explore the Workshop", inquiry: ENGAGEMENT_INQUIRY.relevanceWorkshop },
      },
      {
        id: "individual_analysis",
        name: "Individual Relevance Analysis",
        price: "$599",
        included: [
          "Two private 90-minute sessions with Dr. Grant Tate",
          "Personalized analysis of professional expertise and evolving opportunities",
          "Identification of where experience and judgment create distinctive value",
          "Written professional relevance and action plan",
        ],
        cta: {
          kind: "contact",
          label: "Explore Individual Relevance Analysis",
          inquiry: ENGAGEMENT_INQUIRY.relevanceIndividual,
        },
      },
    ],
  },
] as const;
