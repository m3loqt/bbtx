// What the Services mega menu says about the four focused engagements: the feature card on
// its right and the row of links under it. Kept tiny and apart from offerings.ts (all the page
// copy) because the nav loads on every page and must not carry the offering pages with it.
// tests/offerings/offerings.test.mjs checks every line here against offerings.ts, so a rename
// or a changed hero image over there fails a test instead of drifting.

export const MENU_FEATURE = {
  label: "Upcoming workshop",
  title: "Staying Relevant in an AI-Driven World",
  // The first part of the page's own description, without the prices.
  excerpt: "A 90-minute workshop for experienced professionals weighing how AI affects their work.",
  href: "/offerings/staying-relevant",
  // The text-free hero of that page, shown as a wide crop. `position` keeps the hiker in frame.
  image: "/offerings/staying-relevant.webp",
  position: "70% 60%",
  cta: "View the workshop",
} as const;

export const MENU_ENGAGEMENTS_LABEL = "Focused engagements";

export const MENU_ENGAGEMENT_LINKS = [
  { label: "Digital Twin Assessment", href: "/offerings/digital-twin-assessment" },
  { label: "Personal Assessment & Coaching", href: "/offerings/personal-assessment-coaching" },
  { label: "AI Workflow Design & Coaching", href: "/offerings/ai-workflow-design-coaching" },
  { label: "Staying Relevant", href: "/offerings/staying-relevant" },
] as const;
