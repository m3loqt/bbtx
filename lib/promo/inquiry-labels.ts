// The inquiry types the engagements popup hands to the contact form. Kept in its own tiny
// file so the contact form (loaded on every page) can list them without pulling in the
// popup's copy. Each value is exactly what lands in `contact_submissions.inquiry_type`.

export const ENGAGEMENT_INQUIRY = {
  digitalTwin: "Digital Twin Assessment",
  personal: "Personal Assessment & Coaching",
  aiWorkflow: "AI Workflow Design & Coaching",
  relevanceWorkshop: "Staying Relevant: Public Workshop",
  relevanceIndividual: "Staying Relevant: Individual Relevance Analysis",
} as const;

export type EngagementInquiry = (typeof ENGAGEMENT_INQUIRY)[keyof typeof ENGAGEMENT_INQUIRY];

export const ENGAGEMENT_INQUIRY_OPTIONS = [
  ENGAGEMENT_INQUIRY.digitalTwin,
  ENGAGEMENT_INQUIRY.personal,
  ENGAGEMENT_INQUIRY.aiWorkflow,
  ENGAGEMENT_INQUIRY.relevanceWorkshop,
  ENGAGEMENT_INQUIRY.relevanceIndividual,
] as const;
