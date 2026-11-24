// The four offering pages (/offerings/<slug>): all of their words, prices and image choices in one place.
// The copy is as supplied, with two typos corrected ("at wk" and "ratherxplore"). Internal editorial
// notes that came with it are not page copy and are not here.
//
// STATUS: staged for review, not published. Three facts still need Grant before this goes live:
// 1. Which personal assessments BBTx will include on "Personal Assessment & Coaching".
// 2. Whether the Digital Twin engagement includes a particular model, or only written findings.
// 3. Whether the private Personal Relevance Analysis is available immediately alongside the workshop.

import type { AltKey } from "../seo/image-alt.ts";
import { ENGAGEMENT_INQUIRY, type EngagementInquiry } from "../promo/inquiry-labels.ts";

export type HeroImage = Extract<AltKey, `/offerings/${string}`>;

export type OfferingCta = {
  /** Button text; the arrow is drawn, not typed. */
  label: string;
  /** Opens the contact form with this inquiry type pre-selected. An inquiry, not a booking or payment. */
  inquiry: EngagementInquiry;
};

export type Fee = { label?: string; amount: string; note?: string };

export type Faq = { question: string; answer: string };

type Common = {
  slug: string;
  /** Stable id used in analytics. Never shown. */
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  /** 70 to 155 characters, used for search results and link previews. */
  metaDescription: string;
  hero: { image: HeroImage; position: string; og: string };
  intro: readonly string[];
  /** Five questions shown near the bottom of the page, before the final button. Copy still needs Grant's approval. */
  faqs: readonly Faq[];
};

export type StandardOffering = Common & {
  layout: "standard";
  included: readonly string[];
  how: readonly string[];
  fee: Fee;
  cta: OfferingCta;
};

export type WorkshopOffering = Common & {
  layout: "workshop";
  workshop: {
    heading: string;
    paragraphs: readonly string[];
    coverHeading: string;
    cover: readonly string[];
    closing: string;
    fee: Fee;
    cta: OfferingCta;
  };
  private: {
    kicker: string;
    heading: string;
    paragraphs: readonly string[];
    included: readonly string[];
    closing: string;
    fee: Fee;
    cta: OfferingCta;
  };
};

export type Offering = StandardOffering | WorkshopOffering;

const EYEBROW = "BBTx CONSULTING / FOCUSED ENGAGEMENT";

export const OFFERINGS: readonly [StandardOffering, StandardOffering, StandardOffering, WorkshopOffering] = [
  {
    layout: "standard",
    slug: "digital-twin-assessment",
    id: "digital-twin-assessment",
    name: "Digital Twin Assessment",
    eyebrow: EYEBROW,
    tagline: "See your organization more clearly.",
    metaDescription:
      "Two private sessions and a written summary that show how the important parts of your organization fit together and where to look closer. $599.",
    hero: { image: "/offerings/digital-twin-assessment.webp", position: "50% 42%", og: "/offerings/og/digital-twin-assessment.jpg" },
    intro: [
      "When something isn’t working in a business, the cause isn’t always where the problem shows up. A customer issue may be connected to an internal process, or a recurring operational problem may have more to do with how decisions are made than with the people doing the work.",
      "We help you look at those connections. Using our Digital Twin approach, we’ll examine how the important parts of your organization fit together, where things may be getting in the way, and what deserves a closer look.",
      "We can focus on your own organization or one of your key customers, depending on the questions you’re trying to answer.",
    ],
    faqs: [
      { question: "What is an Organizational Digital Twin?", answer:
        "An Organizational Digital Twin is a way of examining how the different parts of a business work together. Rather than looking at departments, processes, and decisions in isolation, we use available information to understand how they\u2019re connected and where those connections may be affecting performance." },
      { question: "What can a Digital Twin Assessment help us understand?", answer:
        "It can help us investigate recurring problems, operational bottlenecks, unclear responsibilities, and decisions that seem to produce unexpected results. We\u2019ll look at the evidence available, identify patterns worth examining, and help you determine where further attention could make the most difference." },
      { question: "Can we assess a key customer instead of our own organization?", answer:
        "Yes. We can focus on your organization or a key customer relationship, depending on what you\u2019re trying to understand. For a customer assessment, we\u2019ll work with information you have permission to share and identify where additional knowledge would help complete the picture." },
      { question: "What information do we need to provide?", answer:
        "We\u2019ll start with a conversation about the questions you\u2019re trying to answer. Depending on the situation, we may ask for relevant business documents, process information, or other background materials. You don\u2019t need to have everything perfectly organized before we begin." },
      { question: "What do we receive from the $599 assessment?", answer:
        "The engagement includes two private, 60-minute sessions and a written summary of our findings and recommended priorities. This is an initial assessment designed to help you understand where to focus, rather than the development of a complete, continuously maintained Digital Twin system." },
    ],
    included: [
      "Two private, 60-minute working sessions",
      "A preliminary assessment using relevant business information and documents",
      "A written summary of our findings, including areas that need further investigation",
      "Recommended priorities and next steps",
    ],
    how: [
      "We’ll start with a conversation about your organization and what you’d most like to understand. From there, we’ll review the available information, look for important relationships and patterns, and discuss what they suggest.",
      "We’ll distinguish what the evidence tells us from what we still need to verify. By the end of our work together, you’ll have a better understanding of the situation and a practical sense of where to focus your attention.",
    ],
    fee: { amount: "$599" },
    cta: { label: "Get Started", inquiry: ENGAGEMENT_INQUIRY.digitalTwin },
  },
  {
    layout: "standard",
    slug: "personal-assessment-coaching",
    id: "personal-assessment-coaching",
    name: "Personal Assessment & Coaching",
    eyebrow: EYEBROW,
    tagline: "A clearer sense of your strengths, focus, and next steps.",
    metaDescription:
      "Selected personal assessments, two private coaching sessions and written recommendations to help you see your strengths and next steps. $599.",
    hero: { image: "/offerings/personal-assessment-coaching.webp", position: "55% 55%", og: "/offerings/og/personal-assessment-coaching.jpg" },
    intro: [
      "Most of us have a reasonable idea of what we’re good at. What’s harder to see is how our habits, preferences, and ways of thinking affect the decisions we make and the people we work with.",
      "Sometimes it helps to have an outside perspective.",
      "We use selected personal assessments to help you understand your strengths, recognize patterns you may not have noticed, and consider where you might want to grow. The assessments give us a starting point, but the real value comes from talking through what they mean in the context of your own experience.",
    ],
    faqs: [
      { question: "Who is Personal Assessment & Coaching for?", answer:
        "We work with professionals, managers, consultants, and leaders who want to better understand how they approach their work, make decisions, and interact with others. You don\u2019t need to be facing a particular problem. Sometimes there\u2019s value in understanding what\u2019s already working well and where you could be more effective." },
      { question: "How is this different from taking a personality test?", answer:
        "A personal assessment can provide useful information, but the results are only a starting point. We work through what they mean in the context of your experience, responsibilities, and goals, so you\u2019re not left trying to interpret a set of scores on your own." },
      { question: "What assessments will I take?", answer:
        "We\u2019ll select the assessments based on what you want to learn about yourself and what would be most useful for your development. We\u2019ll explain which assessments we\u2019re using and what they measure before you begin." },
      { question: "What happens during the coaching sessions?", answer:
        "Across two private, 60-minute sessions, we\u2019ll discuss your goals, review the assessment findings, and explore how they relate to situations you encounter in your professional life. We\u2019ll also talk about what you might want to change, develop, or approach differently." },
      { question: "What will I take away from the engagement?", answer:
        "You\u2019ll receive your assessment profile along with written development priorities and recommendations. Our intention is for you to leave with a better understanding of yourself and a few practical things you can begin working on. The engagement is $599." },
    ],
    included: [
      "Selected BBTx personal assessments and an individual profile",
      "Two private, 60-minute coaching sessions",
      "A review of your strengths, working preferences, and potential areas for development",
      "Written recommendations and personal development priorities",
    ],
    how: [
      "We’ll begin by understanding what you’re working toward and choosing the assessments that are most relevant to you.",
      "Once you’ve completed them, we’ll review the results together. We’ll talk about what seems accurate, what surprises you, and how those insights relate to the situations you’re dealing with at work or in your professional life.",
      "Our goal isn’t to tell you who you are based on a set of scores. It’s to help you understand yourself a little better and identify changes that are actually worth making.",
    ],
    fee: { amount: "$599" },
    cta: { label: "Get Started", inquiry: ENGAGEMENT_INQUIRY.personal },
  },
  {
    layout: "standard",
    slug: "ai-workflow-design-coaching",
    id: "ai-workflow-design-coaching",
    name: "AI Workflow Design & Coaching",
    eyebrow: EYEBROW,
    tagline: "Put AI to work without losing your judgment.",
    metaDescription:
      "Two private working sessions to design one AI-supported workflow around work you already do, with a written action plan. $799.",
    hero: { image: "/offerings/ai-workflow-design-coaching.webp", position: "60% 50%", og: "/offerings/og/ai-workflow-design-coaching.jpg" },
    intro: [
      "Maybe you’ve tried a few AI tools and can see the potential, but you’re still figuring out how to make them useful in your everyday work.",
      "That’s where we’d like to help.",
      "Rather than introducing more tools or asking you to change everything at once, we’ll look at work you’re already doing and find a sensible place to start. That might mean improving how you prepare reports, organize information, develop ideas, or handle a process that’s taking more time than it should.",
      "The aim is to make your work easier while keeping the knowledge, experience, and judgment that make it valuable.",
    ],
    faqs: [
      { question: "How can AI help improve the way I work?", answer:
        "AI can be useful for organizing information, preparing drafts, reviewing material, and supporting parts of work that take more time than they should. The important question is where it actually makes sense in your workflow. We\u2019ll examine the work you\u2019re already doing and find a practical place to begin." },
      { question: "Do I need experience using AI tools?", answer:
        "No. We can start with the tools you\u2019ve already tried, or help you understand which ones may be appropriate for your work. You don\u2019t need technical experience or a collection of AI subscriptions to benefit from the engagement." },
      { question: "What kinds of workflows can we work on?", answer:
        "We might look at how you prepare reports, conduct research, organize client information, develop proposals, or handle another recurring responsibility. We\u2019ll focus on one workflow where there\u2019s a reasonable opportunity to save time or improve how the work gets done." },
      { question: "Will AI replace the way I currently work?", answer:
        "That\u2019s not our intention. We want to help you use AI where it\u2019s genuinely useful while keeping you involved in decisions that require your experience and judgment. We\u2019ll also identify where AI-generated work needs to be checked rather than accepted at face value." },
      { question: "What is included in the $799 engagement?", answer:
        "You\u2019ll receive two private, 60-minute working sessions, a review of one existing workflow, and a proposed AI-supported approach. We\u2019ll also provide a written action plan explaining how to put it into practice, what to review, and where to make adjustments. This is a workflow design and coaching engagement, not a custom software development project." },
    ],
    included: [
      "Two private, 60-minute working sessions",
      "A review of one existing workflow or recurring task",
      "Design of an AI-supported approach suited to your work",
      "A written action plan with recommended tools, steps, and checkpoints",
    ],
    how: [
      "We’ll begin by walking through a process you currently handle, including the parts that take the most time or cause the most frustration.",
      "Together, we’ll identify where AI could be helpful and where you should remain directly involved. We’ll then work out a practical approach you can test, adjust, and incorporate into your routine.",
      "You won’t need to become an AI expert. We’ll focus on helping you use the technology confidently and appropriately for the work you actually do.",
    ],
    fee: { amount: "$799" },
    cta: { label: "Get Started", inquiry: ENGAGEMENT_INQUIRY.aiWorkflow },
  },
  {
    layout: "workshop",
    slug: "staying-relevant",
    id: "staying-relevant",
    name: "Staying Relevant in an AI-Driven World",
    eyebrow: "BBTx CONSULTING / WORKSHOP & PERSONAL ADVISORY",
    tagline: "Make your experience count in an AI-driven world.",
    metaDescription:
      "A 90-minute workshop for $99 and a private two-session analysis for $599, for experienced professionals weighing how AI affects their work.",
    hero: { image: "/offerings/staying-relevant.webp", position: "70% 55%", og: "/offerings/og/staying-relevant.jpg" },
    intro: [
      "If you’ve spent years developing your skills and becoming good at what you do, it’s reasonable to wonder what happens when AI starts doing work that once depended on your expertise.",
      "Some tasks will change. Others may disappear. But experience involves more than knowing how to complete a task, and understanding that distinction matters.",
      "We created this workshop to help you take a closer look at your own work, understand what is changing, and think through how you can continue contributing in ways that matter.",
    ],
    faqs: [
      { question: "Who is the Staying Relevant workshop designed for?", answer:
        "The workshop is for experienced professionals, consultants, managers, and business leaders who are thinking about how AI may change their work. It\u2019s particularly relevant if you\u2019ve spent years developing your expertise and want to understand how to keep that experience valuable as technology evolves." },
      { question: "Will the workshop help me understand whether AI could replace my job?", answer:
        "We\u2019ll help you examine which parts of your work may be affected by AI and which rely more heavily on human experience, relationships, context, and judgment. We won\u2019t pretend to predict the future of your profession, but we can help you make more informed decisions about how to prepare." },
      { question: "What will we cover during the 90-minute workshop?", answer:
        "We\u2019ll look at how AI is changing professional work, examine where your experience continues to matter, and help you identify areas that deserve your attention. You\u2019ll also begin developing a practical plan for adapting your work and strengthening the value you bring." },
      { question: "Do I need to understand AI before attending?", answer:
        "Not at all. The workshop isn\u2019t a technical course, and you won\u2019t need to know how to program or build AI systems. We\u2019ll focus on what the technology means for the work you do and how you can respond to those changes." },
      { question: "What\u2019s the difference between the $99 workshop and the $599 Personal Relevance Analysis?", answer:
        "The $99 workshop is a 90-minute group experience that introduces the approach and helps you begin examining your own work. The $599 Personal Relevance Analysis goes further, with two private, 90-minute sessions focused on your individual circumstances and a written professional positioning plan with recommended next steps." },
    ],
    workshop: {
      heading: "The Workshop",
      paragraphs: [
        "In this 90-minute group session, we’ll explore how AI is affecting professional work and what those changes might mean for you.",
        "We’ll look at the difference between tasks that technology can increasingly handle and the parts of your contribution that depend on experience, relationships, context, and judgment.",
        "You’ll have an opportunity to examine your own role and begin identifying where to focus your time and development.",
      ],
      coverHeading: "What We’ll Cover",
      cover: [
        "How AI is changing the work of experienced professionals",
        "Which parts of your current role may be affected",
        "Where your experience and judgment continue to make a difference",
        "Practical steps for adapting and making your value more visible",
      ],
      closing: "You’ll leave with a better sense of what deserves your attention and a starting plan for what to do next.",
      fee: { label: "Workshop Fee", amount: "$99", note: "per person" },
      // The next workshop date is not set, so this asks; it does not register anyone.
      cta: { label: "Ask About the Next Workshop", inquiry: ENGAGEMENT_INQUIRY.relevanceWorkshop },
    },
    private: {
      kicker: "Prefer to Work Through It Privately?",
      heading: "Personal Relevance Analysis",
      paragraphs: [
        "Sometimes the questions are more specific to your own career, business, or professional circumstances. If you’d rather explore them in greater depth, we also offer a private engagement.",
        "Across two 90-minute sessions, we’ll take a closer look at the work you do today, how AI may affect different parts of it, and where your experience gives you an advantage.",
        "We’ll help you identify opportunities to strengthen your position, develop useful capabilities, and communicate the value you bring.",
      ],
      included: [
        "Two private, 90-minute advisory sessions",
        "A review of your current role, responsibilities, and professional experience",
        "An assessment of how AI may affect your work",
        "A written professional positioning plan with recommended next steps",
      ],
      closing: "The purpose isn’t to predict exactly what the future will look like. It’s to help you make better decisions about how to prepare for it.",
      fee: { label: "Private Engagement", amount: "$599" },
      cta: { label: "Ask About a Personal Relevance Analysis", inquiry: ENGAGEMENT_INQUIRY.relevanceAnalysis },
    },
  },
] as const;

export function getOffering(slug: string): Offering | undefined {
  return OFFERINGS.find((o) => o.slug === slug);
}

export const BASE_URL = "https://www.bbtx.ai";
export const offeringUrl = (slug: string) => `${BASE_URL}/offerings/${slug}`;
