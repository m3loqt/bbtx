import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Helvetica",
  fonts: [],
});

const RED   = "#ca3726";
const DARK  = "#111111";
const GRAY  = "#555555";
const LIGHT = "#f7f7f7";
const RULE  = "#e8e8e8";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    paddingTop: 52,
    paddingBottom: 52,
    paddingHorizontal: 52,
    fontSize: 10,
    color: DARK,
  },

  // Cover
  coverAccent:    { height: 3, backgroundColor: RED, marginBottom: 36 },
  coverLabel:     { fontSize: 8, letterSpacing: 2, color: GRAY, textTransform: "uppercase", marginBottom: 12 },
  coverTitle:     { fontSize: 28, fontFamily: "Helvetica-Bold", color: DARK, lineHeight: 1.2, marginBottom: 6 },
  coverSubtitle:  { fontSize: 10, color: GRAY, marginBottom: 32 },
  coverDivider:   { height: 1, backgroundColor: RULE, marginBottom: 20 },
  coverMeta:      { fontSize: 9, color: "#aaaaaa", marginBottom: 4 },

  // Section header
  sectionLabel:   { fontSize: 7, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 6, marginTop: 28 },
  sectionTitle:   { fontSize: 16, fontFamily: "Helvetica-Bold", color: DARK, marginBottom: 12 },
  sectionDivider: { height: 1, backgroundColor: RULE, marginBottom: 14 },

  // Body text
  body:           { fontSize: 10, color: GRAY, lineHeight: 1.65, marginBottom: 10 },
  bodyDark:       { fontSize: 10, color: DARK, lineHeight: 1.65, marginBottom: 10 },

  // Items
  itemWrap:       { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: RULE },
  itemLabel:      { fontSize: 10, fontFamily: "Helvetica-Bold", color: DARK, marginBottom: 3 },
  itemMeta:       { fontSize: 8, color: RED, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  itemBody:       { fontSize: 9.5, color: GRAY, lineHeight: 1.6 },

  // Bullet
  bullet:         { flexDirection: "row", marginBottom: 6 },
  bulletDot:      { width: 12, fontSize: 10, color: RED, marginTop: 1 },
  bulletText:     { flex: 1, fontSize: 9.5, color: GRAY, lineHeight: 1.6 },

  // Numbered
  numbered:       { flexDirection: "row", marginBottom: 8 },
  numberedIdx:    { width: 22, fontSize: 9, color: "#aaaaaa", fontFamily: "Helvetica-Bold" },
  numberedText:   { flex: 1, fontSize: 9.5, color: DARK, lineHeight: 1.6 },

  // Dark block (If We Had To Bet)
  darkBlock:      { backgroundColor: DARK, padding: 20, marginTop: 8 },
  darkLabel:      { fontSize: 7, letterSpacing: 2, color: "#ffffff", opacity: 0.4, textTransform: "uppercase", marginBottom: 8 },
  darkHypothesis: { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#ffffff", lineHeight: 1.45, marginBottom: 12 },
  darkBody:       { fontSize: 9.5, color: "#ffffff", opacity: 0.55, lineHeight: 1.6, marginBottom: 6 },

  // Footer
  footer:         { position: "absolute", bottom: 28, left: 52, right: 52, flexDirection: "row", justifyContent: "space-between" },
  footerText:     { fontSize: 8, color: "#cccccc" },

  // Disclaimer
  disclaimer:     { marginTop: 20, paddingTop: 14, borderTopWidth: 1, borderTopColor: RULE },
  disclaimerText: { fontSize: 8.5, color: "#aaaaaa", lineHeight: 1.6 },

  // Light bg block
  lightBlock:     { backgroundColor: LIGHT, padding: 14, marginBottom: 10 },
  lightLabel:     { fontSize: 7.5, letterSpacing: 1.5, color: "#aaaaaa", textTransform: "uppercase", marginBottom: 5 },
});

function Bullet({ text }: { text: string }) {
  return (
    <View style={s.bullet}>
      <Text style={s.bulletDot}>·</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <View>
      <Text style={s.sectionLabel}>Section {num}</Text>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.sectionDivider} />
    </View>
  );
}

function PageFooter({ orgName }: { orgName: string }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>BBTx Strategic Snapshot — {orgName}</Text>
      <Text style={s.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

// ── Types (mirror page.tsx) ──────────────────────────────────

interface ScoredItem   { label: string; score: number }
interface StrategicTension { label: string; observation: string; implication: string; score: number }
interface LeveragePoint    { label: string; description: string; score: number }
interface LeadershipQuestion { question: string; category: string }
interface InvestigateItem  { area: string; reason: string }
interface IfWeHadToBet { hypothesis: string; evidence: string[]; whatWouldProveUsWrong: string }
interface ThroughTheLens {
  question: string;
  relevantEvidence: string[];
  embeddedAssumptions: string[];
  whatPublicDataSuggests: string;
  whatRequiresInternalAccess: string;
}

export interface SnapshotForPDF {
  snapshotTitle: string;
  publicPositioning: { summary: string; visibleSignals: ScoredItem[] };
  marketAndCompetitiveSignals: { summary: string; signals: ScoredItem[] };
  strategicTensions: StrategicTension[];
  leveragePoints: LeveragePoint[];
  leadershipQuestions: LeadershipQuestion[];
  investigateFurther: InvestigateItem[];
  throughTheLensOfYourQuestion?: ThroughTheLens;
  ifWeHadToBet?: IfWeHadToBet;
  whatWeCannotKnow: string[];
  recommendedNextStep: string;
  disclaimer: string;
  sourcesUsed?: string[];
}

// ── PDF Document ─────────────────────────────────────────────

export function SnapshotPDF({
  snapshot,
  websiteUrl,
  generatedAt,
}: {
  snapshot: SnapshotForPDF;
  websiteUrl: string;
  generatedAt: string;
}) {
  const orgName = snapshot.snapshotTitle.replace(/^Strategic Snapshot:\s*/i, "") || snapshot.snapshotTitle;
  const sourceCount = snapshot.sourcesUsed?.length ?? 0;

  return (
    <Document title={`Strategic Snapshot — ${orgName}`} author="BBTx Consulting">

      {/* ── Cover page ─────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.coverAccent} />
        <Text style={s.coverLabel}>BBTx Consulting · Strategic Snapshot</Text>
        <Text style={s.coverTitle}>{orgName}</Text>
        <Text style={s.coverSubtitle}>Analysis based on publicly available information</Text>

        <View style={s.coverDivider} />
        <Text style={s.coverMeta}>{websiteUrl}</Text>
        <Text style={s.coverMeta}>Generated {generatedAt}</Text>
        {sourceCount > 0 && (
          <Text style={[s.coverMeta, { marginTop: 8 }]}>{sourceCount} sources analyzed</Text>
        )}

        <PageFooter orgName={orgName} />
      </Page>

      {/* ── Report pages ───────────────────────────────── */}
      <Page size="A4" style={s.page}>

        {/* 01 — Public Positioning */}
        <SectionHeader num="01" title="Public Positioning" />
        <Text style={s.body}>{snapshot.publicPositioning.summary}</Text>
        {(snapshot.publicPositioning.visibleSignals ?? []).length > 0 && (
          <View style={{ marginTop: 4 }}>
            <Text style={s.lightLabel}>Visible Signals</Text>
            {snapshot.publicPositioning.visibleSignals.map((sig, i) => (
              <Bullet key={i} text={sig.label} />
            ))}
          </View>
        )}

        {/* 02 — Market & Competitive Signals */}
        <SectionHeader num="02" title="Market and Competitive Signals" />
        <Text style={s.body}>{snapshot.marketAndCompetitiveSignals.summary}</Text>
        {(snapshot.marketAndCompetitiveSignals.signals ?? []).length > 0 && (
          <View style={{ marginTop: 4 }}>
            {snapshot.marketAndCompetitiveSignals.signals.map((sig, i) => (
              <Bullet key={i} text={sig.label} />
            ))}
          </View>
        )}

        <PageFooter orgName={orgName} />
      </Page>

      {/* 03 — Strategic Tensions */}
      <Page size="A4" style={s.page}>
        <SectionHeader num="03" title="Strategic Tensions" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          These are not weaknesses. They are places where two legitimate strategic commitments may pull in different directions.
        </Text>
        {(snapshot.strategicTensions ?? []).map((t, i) => (
          <View key={i} style={s.itemWrap}>
            <Text style={s.itemLabel}>{t.label}</Text>
            <Text style={[s.itemMeta, { marginTop: 6 }]}>Observable</Text>
            <Text style={s.itemBody}>{t.observation}</Text>
            <Text style={[s.itemMeta, { marginTop: 6 }]}>Strategic Implication</Text>
            <Text style={s.itemBody}>{t.implication}</Text>
          </View>
        ))}

        <PageFooter orgName={orgName} />
      </Page>

      {/* 04 — Leverage Points + 05 — Questions */}
      <Page size="A4" style={s.page}>
        <SectionHeader num="04" title="Potential Leverage Points" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          Where changing one thing could create disproportionate downstream impact.
        </Text>
        {(snapshot.leveragePoints ?? []).map((lp, i) => (
          <View key={i} style={s.itemWrap}>
            <Text style={s.itemLabel}>{lp.label}</Text>
            <Text style={[s.itemBody, { marginTop: 3 }]}>{lp.description}</Text>
          </View>
        ))}

        <SectionHeader num="05" title="Questions Worth Asking" />
        {(snapshot.leadershipQuestions ?? []).map((q, i) => (
          <View key={i} style={s.numbered}>
            <Text style={s.numberedIdx}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={s.numberedText}>{q.question}</Text>
          </View>
        ))}

        <PageFooter orgName={orgName} />
      </Page>

      {/* 06 — Investigate Further */}
      <Page size="A4" style={s.page}>
        <SectionHeader num="06" title="What We Would Want to Investigate Further" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          These are the gaps between what is visible and what actually drives performance.
        </Text>
        {(snapshot.investigateFurther ?? []).map((item, i) => (
          <View key={i} style={s.itemWrap}>
            <Text style={s.itemLabel}>{item.area}</Text>
            <Text style={[s.itemBody, { marginTop: 3 }]}>{item.reason}</Text>
          </View>
        ))}

        {/* Through the Lens (optional) */}
        {snapshot.throughTheLensOfYourQuestion && (
          <View>
            <SectionHeader num="—" title={`Through the Lens: "${snapshot.throughTheLensOfYourQuestion.question}"`} />
            {snapshot.throughTheLensOfYourQuestion.relevantEvidence.map((e, i) => (
              <Bullet key={i} text={e} />
            ))}
            {snapshot.throughTheLensOfYourQuestion.embeddedAssumptions.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text style={s.lightLabel}>Assumptions Worth Examining</Text>
                {snapshot.throughTheLensOfYourQuestion.embeddedAssumptions.map((a, i) => (
                  <Bullet key={i} text={a} />
                ))}
              </View>
            )}
            <View style={[s.lightBlock, { marginTop: 10 }]}>
              <Text style={s.lightLabel}>What Cannot Be Determined</Text>
              <Text style={s.itemBody}>{snapshot.throughTheLensOfYourQuestion.whatRequiresInternalAccess}</Text>
            </View>
          </View>
        )}

        <PageFooter orgName={orgName} />
      </Page>

      {/* 07 — If We Had To Bet + 08 — Cannot See + Next Step */}
      <Page size="A4" style={s.page}>

        {snapshot.ifWeHadToBet && (
          <View>
            <SectionHeader num="07" title="If We Had To Bet" />
            <Text style={[s.body, { marginBottom: 10 }]}>
              A hypothesis based solely on publicly available evidence. Not a verdict.
            </Text>
            <View style={s.darkBlock}>
              <Text style={s.darkLabel}>Hypothesis</Text>
              <Text style={s.darkHypothesis}>{snapshot.ifWeHadToBet.hypothesis}</Text>
              {(snapshot.ifWeHadToBet.evidence ?? []).length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <Text style={[s.darkLabel, { marginBottom: 6 }]}>What Points Us There</Text>
                  {snapshot.ifWeHadToBet.evidence.map((e, i) => (
                    <View key={i} style={[s.bullet, { marginBottom: 5 }]}>
                      <Text style={[s.bulletDot, { color: RED }]}>·</Text>
                      <Text style={[s.darkBody, { marginBottom: 0 }]}>{e}</Text>
                    </View>
                  ))}
                </View>
              )}
              <View style={{ marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#333333" }}>
                <Text style={s.darkLabel}>What Would Prove Us Wrong</Text>
                <Text style={s.darkBody}>{snapshot.ifWeHadToBet.whatWouldProveUsWrong}</Text>
              </View>
            </View>
          </View>
        )}

        <SectionHeader num="08" title="What This Analysis Cannot See" />
        {(snapshot.whatWeCannotKnow ?? []).map((item, i) => (
          <Bullet key={i} text={item} />
        ))}

        <SectionHeader num="09" title="A Suggested Next Step" />
        <Text style={s.bodyDark}>{snapshot.recommendedNextStep}</Text>

        <View style={s.disclaimer}>
          <Text style={s.disclaimerText}>{snapshot.disclaimer}</Text>
          <Text style={[s.disclaimerText, { marginTop: 6 }]}>
            This analysis was generated by BBTx Consulting. For a full Digital Twin Strategy engagement — combining this public analysis with leadership interviews, internal documents, and structured strategic planning — contact BBTx at bbtx.ai.
          </Text>
        </View>

        <PageFooter orgName={orgName} />
      </Page>

    </Document>
  );
}
