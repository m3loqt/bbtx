import { z } from "zod";

// Mirrors the SnapshotResult interface in app/digital-twin-snapshot/page.tsx
// field-for-field. This schema enforces shape at generation time (via
// output_config.format on the synthesis call) — it does not change what the
// prompt asks for or how the report renders.

export const ScoredItemSchema = z.object({
  label: z.string().min(1),
  score: z.number().int().min(1).max(5),
});

export const StrategicTensionSchema = z.object({
  label: z.string().min(1),
  observation: z.string().min(1),
  implication: z.string().min(1),
  score: z.number().int().min(1).max(5),
});

export const LeveragePointSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
  score: z.number().int().min(1).max(5),
});

export const LeadershipQuestionSchema = z.object({
  question: z.string().min(1),
  category: z.enum(["Strategy", "Operations", "AI", "Culture", "Market"]),
});

export const InvestigateItemSchema = z.object({
  area: z.string().min(1),
  reason: z.string().min(1),
});

export const ThroughTheLensSchema = z.object({
  question: z.string().min(1),
  relevantEvidence: z.array(z.string().min(1)).min(1),
  embeddedAssumptions: z.array(z.string().min(1)),
  whatPublicDataSuggests: z.string().min(1),
  whatRequiresInternalAccess: z.string().min(1),
});

export const IfWeHadToBetSchema = z.object({
  hypothesis: z.string().min(1),
  evidence: z.array(z.string().min(1)).min(1),
  whatWouldProveUsWrong: z.string().min(1),
});

export const SnapshotSchema = z.object({
  snapshotTitle: z.string().min(1),
  publicPositioning: z.object({
    summary: z.string().min(1),
    visibleSignals: z.array(ScoredItemSchema).min(4),
  }),
  marketAndCompetitiveSignals: z.object({
    summary: z.string().min(1),
    signals: z.array(ScoredItemSchema).min(3),
  }),
  strategicTensions: z.array(StrategicTensionSchema).min(3),
  leveragePoints: z.array(LeveragePointSchema).min(4),
  leadershipQuestions: z.array(LeadershipQuestionSchema).min(5),
  investigateFurther: z.array(InvestigateItemSchema).min(4),
  throughTheLensOfYourQuestion: ThroughTheLensSchema.optional(),
  ifWeHadToBet: IfWeHadToBetSchema.optional(),
  whatWeCannotKnow: z.array(z.string().min(1)).min(4),
  recommendedNextStep: z.string().min(1),
  disclaimer: z.string().min(1),
  sourcesUsed: z.array(z.string()).optional(),
});
export type Snapshot = z.infer<typeof SnapshotSchema>;

// Output shape for the post-synthesis critic/quality-gate pass — reviews
// just the two sections most prone to generic filler.
export const CritiqueResultSchema = z.object({
  strategicTensions: z.array(StrategicTensionSchema).min(3),
  leadershipQuestions: z.array(LeadershipQuestionSchema).min(5),
  revisionCount: z.number().int().min(0),
});
