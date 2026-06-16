"use client";

import { useState, useRef, useEffect } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { Sparkles, ChevronDown, ChevronUp, Check, Globe, Search, Cpu, Info } from "lucide-react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

// ── Types ──────────────────────────────────────────────────

interface ScoredItem {
  label: string;
  score: number;
}

interface StrategicTension {
  label: string;
  observation: string;
  implication: string;
  score: number;
}

interface LeveragePoint {
  label: string;
  description: string;
  score: number;
}

interface LeadershipQuestion {
  question: string;
  category: "Strategy" | "Operations" | "AI" | "Culture" | "Market";
}

interface InvestigateItem {
  area: string;
  reason: string;
}

interface ThroughTheLensSection {
  question: string;
  relevantEvidence: string[];
  embeddedAssumptions: string[];
  whatPublicDataSuggests: string;
  whatRequiresInternalAccess: string;
}

interface IfWeHadToBet {
  hypothesis: string;
  evidence: string[];
  whatWouldProveUsWrong: string;
}

interface SnapshotResult {
  snapshotTitle: string;
  publicPositioning: {
    summary: string;
    visibleSignals: ScoredItem[];
  };
  marketAndCompetitiveSignals: {
    summary: string;
    signals: ScoredItem[];
  };
  strategicTensions: StrategicTension[];
  leveragePoints: LeveragePoint[];
  leadershipQuestions: LeadershipQuestion[];
  investigateFurther: InvestigateItem[];
  throughTheLensOfYourQuestion?: ThroughTheLensSection;
  ifWeHadToBet?: IfWeHadToBet;
  whatWeCannotKnow: string[];
  recommendedNextStep: string;
  disclaimer: string;
  sourcesUsed?: string[];
}

interface ProgressStep {
  step: string;
  phase: "research" | "search" | "analysis";
}

type PageState = "idle" | "loading" | "results" | "error";

// ── Constants ──────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, string> = {
  Strategy:   "bg-[#111] text-white",
  Operations: "bg-[#f4f4f4] text-[#444]",
  AI:         "bg-[#fef0ec] text-[#ca3726]",
  Culture:    "bg-[#f0faf4] text-[#166534]",
  Market:     "bg-[#fdfaf0] text-[#78350f]",
};

const PHASE_ICON = {
  research: Globe,
  search:   Search,
  analysis: Cpu,
};

function getPhraseForStep(step: string, phase: string): string {
  const s = step.toLowerCase();
  if (s.includes("reading"))                               return "Interrogating the homepage...";
  if (s.includes("locating"))                              return "Spelunking for subpages...";
  if (s.includes("explored"))                              return "Absorbing the content...";
  if (s.includes("news"))                                  return "Chasing the news cycle...";
  if (s.includes("leadership"))                            return "Reading between the lines...";
  if (s.includes("competitive") || s.includes("landscape")) return "Mapping the competition...";
  if (s.includes("market") || s.includes("industry"))     return "Listening for market signals...";
  if (s.includes("reviewing") || s.includes("collected")) return "Connecting the dots...";
  if (s.includes("generating"))                            return "Stress-testing hypotheses...";
  if (s.includes("preparing"))                             return "Almost there...";
  if (phase === "research")  return "Combing through the evidence...";
  if (phase === "search")    return "Following the thread...";
  if (phase === "analysis")  return "Synthesizing the intelligence...";
  return "Working on it...";
}

// ── Score bar ──────────────────────────────────────────────

function ScoreBar({ score, color = "#ca3726" }: { score: number; color?: string }) {
  return (
    <div className="mt-2.5 h-[3px] w-full rounded-full bg-black/[0.06]">
      <div
        className="h-full rounded-full"
        style={{ width: `${(score / 5) * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ── Score dots ─────────────────────────────────────────────

function ScoreDots({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: i < score ? "#ca3726" : "#e5e5e5" }}
        />
      ))}
    </div>
  );
}

// ── Horizontal bar chart (CSS, no truncation) ─────────────

function HorizontalBarChart({
  items,
  color = "#ca3726",
  trackColor = "#f0f0f0",
}: {
  items: { label: string; score: number }[];
  color?: string;
  trackColor?: string;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i}>
          <div className="mb-1.5 flex items-start justify-between gap-3">
            <p className="text-sm leading-snug text-[#444]">{item.label}</p>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-[#aaa]">
              {item.score}/5
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: trackColor }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${(item.score / 5) * 100}%`, backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Evidence quality ───────────────────────────────────────

interface EvidenceQualityResult {
  level: "High" | "Moderate" | "Limited";
  totalSources: number;
  websitePages: number;
  externalSources: number;
  websitePageLabels: string[];
  externalSourceLabels: string[];
}

function calculateEvidenceQuality(
  sourcesUsed: string[] | undefined,
  fetchSucceeded: boolean
): EvidenceQualityResult {
  const empty: EvidenceQualityResult = {
    level: "Limited",
    totalSources: 0,
    websitePages: 0,
    externalSources: 0,
    websitePageLabels: [],
    externalSourceLabels: [],
  };
  if (!sourcesUsed || sourcesUsed.length === 0) return empty;

  const websitePageLabels = sourcesUsed.filter(
    (s) => s.startsWith("Homepage") || /^\/[a-z]/i.test(s)
  );
  const externalSourceLabels = sourcesUsed.filter(
    (s) => !websitePageLabels.includes(s)
  );
  const websiteCount = websitePageLabels.length;
  const externalCount = externalSourceLabels.length;

  let level: "High" | "Moderate" | "Limited";
  if (websiteCount >= 4 && externalCount >= 2) {
    level = "High";
  } else if ((fetchSucceeded || websiteCount >= 1) && externalCount >= 1) {
    level = "Moderate";
  } else {
    level = "Limited";
  }

  return {
    level,
    totalSources: sourcesUsed.length,
    websitePages: websiteCount,
    externalSources: externalCount,
    websitePageLabels,
    externalSourceLabels,
  };
}

function formatSourceLabel(label: string): string {
  const clean = label.replace(/\s*\([^)]+\)\s*$/, "").trim();
  if (clean.startsWith("/")) {
    return (
      clean.slice(1).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Page"
    );
  }
  return clean;
}

// ── Main page ──────────────────────────────────────────────

export default function DigitalTwinSnapshotPage() {
  const [pageState, setPageState]         = useState<PageState>("idle");
  const [url, setUrl]                     = useState("");
  const [orgName, setOrgName]             = useState("");
  const [industry, setIndustry]           = useState("");
  const [competitors, setCompetitors]     = useState("");
  const [strategicQuestion, setStrategicQuestion] = useState("");
  const [contextExpanded, setContextExpanded]     = useState(false);
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([]);
  const [snapshot, setSnapshot]           = useState<SnapshotResult | null>(null);
  const [fetchSucceeded, setFetchSucceeded] = useState(true);
  const [errorMessage, setErrorMessage]   = useState<string | null>(null);
  const [emailValue, setEmailValue]       = useState("");
  const [emailName, setEmailName]         = useState("");
  const [emailSent, setEmailSent]         = useState(false);
  const [displayedPhrase, setDisplayedPhrase] = useState("Starting the analysis...");
  const [phraseVisible, setPhraseVisible]     = useState(true);
  const resultsRef                        = useRef<HTMLDivElement>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();

    let normalized = url.trim();
    if (!normalized) return;
    if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
      normalized = "https://" + normalized;
    }

    setPageState("loading");
    setProgressSteps([]);
    setSnapshot(null);
    setErrorMessage(null);
    setEmailSent(false);
    setDisplayedPhrase("Starting the analysis...");
    setPhraseVisible(true);

    try {
      const res = await fetch("/api/digital-twin-snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteUrl:        normalized,
          organizationName:  orgName || undefined,
          industry:          industry || undefined,
          competitors:       competitors || undefined,
          strategicQuestion: strategicQuestion || undefined,
        }),
      });

      const reader  = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No stream");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6)) as {
              type: string;
              step?: string;
              phase?: string;
              snapshot?: SnapshotResult;
              fetchSucceeded?: boolean;
              message?: string;
            };

            if (event.type === "progress" && event.step) {
              setProgressSteps((prev) => [
                ...prev,
                { step: event.step!, phase: (event.phase ?? "research") as ProgressStep["phase"] },
              ]);
            } else if (event.type === "result" && event.snapshot) {
              setSnapshot(event.snapshot as SnapshotResult);
              setFetchSucceeded(event.fetchSucceeded ?? true);
              setPageState("results");
              setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 120);
            } else if (event.type === "error") {
              setErrorMessage(event.message ?? "Something went wrong. Please try again.");
              setPageState("error");
            }
          } catch { /* malformed SSE line */ }
        }
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to generate snapshot. Please try again.");
      setPageState("error");
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValue) return;
    try {
      await fetch("/api/digital-twin-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:      emailValue,
          name:       emailName || undefined,
          websiteUrl: url,
          timestamp:  new Date().toISOString(),
          snapshot,
        }),
      });
    } catch { /* intentional */ }
    setEmailSent(true);
  }

  function handleReset() {
    setPageState("idle");
    setSnapshot(null);
    setProgressSteps([]);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    if (pageState !== "loading" || progressSteps.length === 0) return;
    const latest = progressSteps[progressSteps.length - 1];
    setPhraseVisible(false);
    const t = setTimeout(() => {
      setDisplayedPhrase(getPhraseForStep(latest.step, latest.phase));
      setPhraseVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, [progressSteps.length, pageState]);

  return (
    <div className="min-h-screen bg-white">

      {/* Nav hidden during loading */}
      {pageState !== "loading" && <Nav />}

      {/* ── Hero + Form ─────────────────────────────────── */}
      {(pageState === "idle" || pageState === "error") && (
        <section className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <InteractiveGridPattern
              width={56}
              height={56}
              squares={[40, 28]}
              className="h-full w-full min-h-full min-w-full"
              squaresClassName="stroke-black/[0.014]"
            />
          </div>

          <div className="relative z-[1] mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-28 text-center sm:px-6 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-4 py-1.5 text-xs font-medium text-[#555] shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-[#ca3726]" aria-hidden />
              BBTx Strategic Analysis
            </div>

            <h1 className="text-[2.2rem] font-semibold leading-[1.06] tracking-tighter text-[#111] sm:text-[3.2rem] lg:text-[4rem]">
              See your organization
              <br className="hidden sm:block" />
              {" "}the way the market{" "}
              <span
                className="font-normal italic text-[#ca3726]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                already does
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#555] sm:text-lg">
              A reading of your public positioning, potential blind spots, and the strategic questions your leadership should be asking.
            </p>

            <form onSubmit={handleGenerate} className="mx-auto mt-8 w-full max-w-2xl">
              <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_4px_32px_rgba(0,0,0,0.10)] ring-1 ring-black/[0.06]">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourorganization.com"
                  required
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-[#222] placeholder-[#aaa] outline-none"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-[#ca3726] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Analyze My Organization
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 overflow-hidden rounded-xl border border-black/[0.07] bg-white/80 text-left backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setContextExpanded(!contextExpanded)}
                  className="flex w-full items-center justify-between px-5 py-3.5 transition-colors hover:bg-black/[0.015]"
                >
                  <span className="text-xs font-medium text-[#777]">
                    Optional: add context to sharpen the analysis
                  </span>
                  {contextExpanded
                    ? <ChevronUp className="h-4 w-4 text-[#aaa]" />
                    : <ChevronDown className="h-4 w-4 text-[#aaa]" />}
                </button>

                {contextExpanded && (
                  <div className="grid gap-3 border-t border-black/[0.06] px-5 pb-5 pt-4 sm:grid-cols-2">
                    {[
                      { id: "org-name",     label: "Organization name",               value: orgName,            setter: setOrgName,            placeholder: "ACME Foundation" },
                      { id: "industry",     label: "Industry or sector",               value: industry,           setter: setIndustry,           placeholder: "Healthcare, nonprofit..." },
                      { id: "competitors",  label: "Known competitors",                value: competitors,        setter: setCompetitors,        placeholder: "Organization A, Organization B..." },
                      { id: "strategic-q",  label: "A question you are working through", value: strategicQuestion, setter: setStrategicQuestion, placeholder: "What are we trying to figure out right now?" },
                    ].map(({ id, label, value, setter, placeholder }) => (
                      <div key={id}>
                        <label htmlFor={id} className="mb-1 block text-xs text-[#888]">{label}</label>
                        <input
                          id={id}
                          type="text"
                          value={value}
                          onChange={(e) => setter(e.target.value)}
                          placeholder={placeholder}
                          className="w-full rounded-lg border border-black/[0.07] bg-[#f8fafc] px-3 py-2 text-sm text-[#222] placeholder-[#bbb] outline-none transition-colors focus:border-[#ca3726]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {pageState === "error" && errorMessage && (
                <p className="mt-3 text-sm text-[#ca3726]">{errorMessage}</p>
              )}

              <p className="mt-3 text-center text-xs text-[#aaa]">
                Based entirely on publicly available information
              </p>
            </form>
          </div>
        </section>
      )}

      {/* ── Loader (full screen, no nav) ────────────────── */}
      {pageState === "loading" && (
        <>
          {/* Progress bar — fixed at top */}
          <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-black/[0.05]">
            <div
              className="h-full bg-[#ca3726] transition-all duration-700 ease-out"
              style={{ width: `${Math.min((progressSteps.length / 10) * 100, 95)}%` }}
            />
          </div>

          <section className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm">
              <div className="mb-8 flex items-center gap-3">
                <div className="relative h-8 w-8 shrink-0">
                  <div className="absolute inset-0 animate-ping rounded-full bg-[#ca3726]/20" />
                  <div className="absolute inset-1.5 animate-pulse rounded-full bg-[#ca3726]/40" />
                  <div className="absolute inset-2.5 rounded-full bg-[#ca3726]" />
                </div>
                <p
                  className="text-sm font-medium text-[#111] transition-opacity duration-300"
                  style={{ opacity: phraseVisible ? 1 : 0 }}
                >
                  {displayedPhrase}
                </p>
              </div>

              <div className="space-y-3.5">
                {progressSteps.map((s, i) => {
                  const Icon  = PHASE_ICON[s.phase];
                  const isLast = i === progressSteps.length - 1;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 transition-all duration-300"
                      style={{ opacity: isLast ? 1 : 0.4 }}
                    >
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isLast ? "bg-[#ca3726]/10" : "bg-[#f4f4f4]"}`}>
                        {isLast
                          ? <Icon className="h-3 w-3 text-[#ca3726]" />
                          : <Check className="h-3 w-3 text-[#ccc]" />}
                      </div>
                      <p className={`text-sm ${isLast ? "font-medium text-[#111]" : "text-[#ccc] line-through"}`}>
                        {s.step}
                      </p>
                    </div>
                  );
                })}

                {progressSteps.length === 0 && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-[#f4f4f4]" />
                      <div className="h-3 w-36 animate-pulse rounded bg-[#f4f4f4]" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-[#f4f4f4]" />
                      <div className="h-3 w-28 animate-pulse rounded bg-[#f4f4f4]" />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 rounded-xl border border-black/[0.07] bg-white px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ccc]" />
                  <p className="text-xs leading-relaxed text-[#aaa]">
                    Reviewing public signals, market context, and strategic patterns. Most analyses are ready in about a minute.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Results ─────────────────────────────────────── */}
      {pageState === "results" && snapshot && (
        <div ref={resultsRef}>

          {/* Header */}
          <section className="border-b border-black/[0.05] bg-[#f8fafc] px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: identity */}
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1 text-xs font-medium text-[#777] shadow-sm">
                    <Sparkles className="h-3 w-3 text-[#ca3726]" />
                    Strategic Snapshot
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tighter text-[#111] sm:text-3xl lg:text-[2.4rem]">
                    {snapshot.snapshotTitle.replace(/^Strategic Snapshot:\s*/i, "") || snapshot.snapshotTitle}
                  </h2>
                  <p className="mt-2 text-sm text-[#aaa]">Analysis based on publicly available information</p>
                  {!fetchSucceeded && (
                    <div className="mt-5 rounded-xl border border-[#ca3726]/15 bg-[#ca3726]/[0.04] px-5 py-4">
                      <p className="text-sm leading-relaxed text-[#ca3726]/80">
                        Direct website access was limited. This analysis is based on web research and any context provided.
                      </p>
                    </div>
                  )}
                </div>
                {/* Right: Evidence Quality card */}
                <EvidenceQualityCard sources={snapshot.sourcesUsed} fetchSucceeded={fetchSucceeded} />
              </div>
            </div>
          </section>

          {/* 01 — Public Positioning */}
          <ReportSection number="01" title="Public Positioning" bg="white">
            <p className="text-lg leading-relaxed text-[#555] sm:text-xl">
              {snapshot.publicPositioning.summary}
            </p>
            {(snapshot.publicPositioning.visibleSignals ?? []).length > 0 && (
              <div className="mt-7">
                <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#bbb]">
                  Visible Signals
                </p>
                <div className="space-y-3">
                  {(snapshot.publicPositioning.visibleSignals ?? []).map((s, i) => (
                    <div key={i} className="rounded-xl border border-black/[0.05] bg-[#f8fafc] px-5 py-4">
                      <p className="text-sm leading-relaxed text-[#444]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ReportSection>

          {/* Through the Lens of Your Question */}
          {snapshot.throughTheLensOfYourQuestion && (
            <section className="border-l-4 border-[#ca3726] bg-[#fdf8f7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#ca3726]/50">
                  Through the Lens of Your Question
                </p>
                <h3 className="text-2xl font-semibold leading-tight tracking-tighter text-[#111] sm:text-3xl">
                  &ldquo;{snapshot.throughTheLensOfYourQuestion.question}&rdquo;
                </h3>

                <div className="mt-8 space-y-7">
                  {(snapshot.throughTheLensOfYourQuestion.relevantEvidence ?? []).length > 0 && (
                    <div>
                      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#bbb]">
                        Relevant Signals
                      </p>
                      <ul className="space-y-2.5">
                        {(snapshot.throughTheLensOfYourQuestion.relevantEvidence ?? []).map((e, i) => (
                          <li key={i} className="flex items-start gap-3 rounded-xl border border-[#ca3726]/10 bg-white px-5 py-3.5">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ca3726]/50" />
                            <p className="text-sm leading-relaxed text-[#555]">{e}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(snapshot.throughTheLensOfYourQuestion.embeddedAssumptions ?? []).length > 0 && (
                    <div>
                      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#bbb]">
                        Potential Assumptions
                      </p>
                      <ul className="space-y-2.5">
                        {(snapshot.throughTheLensOfYourQuestion.embeddedAssumptions ?? []).map((a, i) => (
                          <li key={i} className="flex items-start gap-3 rounded-xl border border-black/[0.05] bg-white px-5 py-3.5">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#aaa]" />
                            <p className="text-sm leading-relaxed text-[#555]">{a}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#bbb]">
                      What the Evidence Suggests
                    </p>
                    <p className="text-base leading-relaxed text-[#444] sm:text-lg">
                      {snapshot.throughTheLensOfYourQuestion.whatPublicDataSuggests}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#ca3726]/15 bg-[#ca3726]/[0.04] px-5 py-4">
                    <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]/60">
                      What Cannot Be Determined
                    </p>
                    <p className="text-sm leading-relaxed text-[#555]">
                      {snapshot.throughTheLensOfYourQuestion.whatRequiresInternalAccess}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 02 — Market & Competitive Signals */}
          <ReportSection number="02" title="Market and Competitive Signals" bg="gray">
            <p className="text-lg leading-relaxed text-[#555] sm:text-xl">
              {snapshot.marketAndCompetitiveSignals.summary}
            </p>
            {(snapshot.marketAndCompetitiveSignals.signals ?? []).length > 0 && (
              <div className="mt-7 space-y-3">
                {(snapshot.marketAndCompetitiveSignals.signals ?? []).map((s, i) => (
                  <div key={i} className="rounded-xl border border-black/[0.05] bg-white px-5 py-4">
                    <p className="text-sm leading-relaxed text-[#444]">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </ReportSection>

          {/* 03 — Strategic Tensions */}
          <ReportSection number="03" title="Strategic Tensions" bg="white">
            <p className="mb-6 text-sm leading-relaxed text-[#aaa]">
              These are not weaknesses. They are places where two legitimate strategic commitments may pull in different directions.
            </p>

            {/* Score overview chart */}
            {(snapshot.strategicTensions ?? []).length > 0 && (
              <div className="mb-8 rounded-2xl border border-black/[0.05] bg-[#f8fafc] px-6 py-5">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#bbb]">
                  Tension significance
                </p>
                <HorizontalBarChart
                  items={(snapshot.strategicTensions ?? []).map((t) => ({
                    label: t.label,
                    score: t.score,
                  }))}
                  color="#ca3726"
                  trackColor="#ece9e9"
                />
              </div>
            )}

            <div className="space-y-5">
              {(snapshot.strategicTensions ?? []).map((t, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-black/[0.06]"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-black/[0.05] bg-[#f8fafc] px-5 py-3.5">
                    <p className="text-sm font-semibold text-[#111]">{t.label}</p>
                    <ScoreDots score={t.score} />
                  </div>
                  <div className="bg-white px-5 py-4 space-y-3">
                    <div>
                      <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#bbb]">
                        Observable
                      </p>
                      <p className="text-sm leading-relaxed text-[#555]">{t.observation}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#ca3726]/60">
                        Strategic implication
                      </p>
                      <p className="text-sm leading-relaxed text-[#444]">{t.implication}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ReportSection>

          {/* 04 — Potential Leverage Points */}
          <ReportSection number="04" title="Potential Leverage Points" bg="gray">
            <p className="mb-6 text-sm leading-relaxed text-[#aaa]">
              Where changing one thing could create disproportionate downstream impact.
            </p>

            {/* Score overview chart */}
            {(snapshot.leveragePoints ?? []).length > 0 && (
              <div className="mb-8 rounded-2xl border border-black/[0.05] bg-white px-6 py-5">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#bbb]">
                  Priority ranking
                </p>
                <HorizontalBarChart
                  items={(snapshot.leveragePoints ?? [])
                    .slice()
                    .sort((a, b) => b.score - a.score)
                    .map((lp) => ({ label: lp.label, score: lp.score }))}
                  color="#222222"
                  trackColor="#f0f0f0"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {(snapshot.leveragePoints ?? []).map((lp, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold leading-snug text-[#111]">{lp.label}</p>
                    <span className="shrink-0 text-[0.65rem] font-bold text-[#ca3726]">
                      {lp.score}/5
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-[#777]">{lp.description}</p>
                  <ScoreBar score={lp.score} />
                </div>
              ))}
            </div>
          </ReportSection>

          {/* 05 — Questions Worth Asking */}
          <ReportSection number="05" title="Questions Worth Asking" bg="white">
            <ol className="space-y-3.5">
              {(snapshot.leadershipQuestions ?? []).map((q, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl border border-black/[0.05] bg-[#f8fafc] px-5 py-4"
                >
                  <span className="shrink-0 pt-0.5 text-[0.6rem] font-bold text-[#ccc]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed text-[#333] sm:text-lg">{q.question}</p>
                    <span
                      className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${CATEGORY_STYLES[q.category] ?? "bg-[#f4f4f4] text-[#666]"}`}
                    >
                      {q.category}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </ReportSection>

          {/* 06 — What We Would Want to Investigate Further */}
          <ReportSection number="06" title="What We Would Want to Investigate Further" bg="gray">
            <p className="mb-6 text-sm leading-relaxed text-[#aaa]">
              These are the gaps between what is visible and what actually drives performance. No serious recommendation can be made without understanding them.
            </p>
            <div className="space-y-3">
              {(snapshot.investigateFurther ?? []).map((item, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white"
                >
                  <div className="border-b border-black/[0.05] bg-[#f8fafc] px-5 py-3">
                    <p className="text-sm font-semibold text-[#111]">{item.area}</p>
                  </div>
                  <div className="px-5 py-3.5">
                    <p className="text-sm leading-relaxed text-[#666]">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </ReportSection>

          {/* 07 — If We Had To Bet */}
          {snapshot.ifWeHadToBet && (
            <section className="bg-[#111] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
              <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/30">
                  Section 07
                </p>
                <h3 className="text-2xl font-semibold leading-tight tracking-tighter text-white sm:text-3xl">
                  If We Had To Bet
                </h3>
                <p className="mt-2 text-sm text-white/35">
                  A hypothesis based solely on publicly available evidence. Not a verdict.
                </p>

                <blockquote className="mt-8 border-l-2 border-[#ca3726] pl-6">
                  <p className="text-xl leading-relaxed text-white sm:text-2xl">
                    {snapshot.ifWeHadToBet.hypothesis}
                  </p>
                </blockquote>

                {(snapshot.ifWeHadToBet.evidence ?? []).length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/30">
                      What points us there
                    </p>
                    <ul className="space-y-2.5">
                      {(snapshot.ifWeHadToBet.evidence ?? []).map((e, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ca3726]/60" />
                          <p className="text-sm leading-relaxed text-white/60">{e}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4">
                  <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/25">
                    What would prove us wrong
                  </p>
                  <p className="text-sm leading-relaxed text-white/50">
                    {snapshot.ifWeHadToBet.whatWouldProveUsWrong}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 08 — What This Analysis Cannot See */}
          <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#bbb]">
                Section 08
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tighter text-[#111] sm:text-3xl">
                What This Analysis Cannot See
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#aaa]">
                Public signals have limits. What happens inside an organization rarely shows up on its website.
              </p>
              <ul className="mt-7 space-y-2.5">
                {(snapshot.whatWeCannotKnow ?? []).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-black/[0.05] bg-[#f8fafc] px-5 py-4"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ca3726]/40" />
                    <p className="text-sm leading-relaxed text-[#555]">{item}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-[#ca3726]/12 bg-[#ca3726]/[0.03] p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-[#555] sm:text-base">
                  A full Digital Twin Strategy process goes considerably deeper. It combines public analysis with leadership interviews, internal documents, and structured strategic planning.
                </p>
              </div>
            </div>
          </section>

          {/* 09 — Recommended Next Step */}
          <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#bbb]">
                Section 09
              </p>
              <h3 className="text-2xl font-semibold leading-tight tracking-tighter text-[#111] sm:text-3xl">
                A Suggested Next Step
              </h3>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-[#444] sm:text-2xl">
                {snapshot.recommendedNextStep}
              </p>
              <p className="mt-6 max-w-2xl text-xs leading-relaxed text-[#bbb]">
                {snapshot.disclaimer}
              </p>
            </div>
          </section>

          {/* 09 — CTA */}
          <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-5xl">
              {(snapshot.investigateFurther ?? []).length > 0 && (
                <div className="mb-8 rounded-2xl border border-black/[0.07] bg-[#f8fafc] px-6 py-6">
                  <p className="mb-5 text-base font-semibold leading-snug text-[#111]">
                    To validate these hypotheses, we would want to understand:
                  </p>
                  <ul className="space-y-4">
                    {(snapshot.investigateFurther ?? []).slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ca3726]/50" />
                        <div>
                          <p className="text-sm font-medium text-[#333]">{item.area}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[#888]">{item.reason}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-[#666]">
                    These questions cannot be answered through public information alone.
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#999]">
                    They require internal interviews, operational review, leadership conversations, and organizational context.
                  </p>
                </div>
              )}

              <div className="grid gap-5 lg:grid-cols-2">
                {/* Email */}
                <div className="flex flex-col rounded-2xl border border-black/[0.07] bg-[#f8fafc] p-6 sm:p-8">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]">
                    Email Me a Copy
                  </p>
                  {!emailSent ? (
                    <>
                      <p className="mt-3 text-lg font-semibold leading-snug tracking-tight text-[#111]">
                        Get a copy of this analysis sent to your inbox
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#777]">
                        We will not add you to a list without your permission.
                      </p>
                      <form onSubmit={handleEmailSubmit} className="mt-5 flex flex-col gap-3">
                        <input
                          type="text"
                          value={emailName}
                          onChange={(e) => setEmailName(e.target.value)}
                          placeholder="Your name (optional)"
                          className="w-full rounded-lg border border-black/[0.07] bg-white px-3.5 py-2.5 text-sm text-[#222] placeholder-[#bbb] outline-none transition-colors focus:border-[#ca3726]"
                        />
                        <input
                          type="email"
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
                          placeholder="Work email"
                          required
                          className="w-full rounded-lg border border-black/[0.07] bg-white px-3.5 py-2.5 text-sm text-[#222] placeholder-[#bbb] outline-none transition-colors focus:border-[#ca3726]"
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-[#111] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
                        >
                          Send Me a Copy
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="mt-4 flex flex-1 flex-col justify-center">
                      <p className="text-base font-semibold text-[#111]">Noted</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#777]">
                        We will follow up shortly. If you would like to discuss what this analysis surfaced, you can reach us through the contact form.
                      </p>
                    </div>
                  )}
                </div>

                {/* Talk to BBTx */}
                <div className="flex flex-col rounded-2xl bg-[#222] p-6 sm:p-8">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Full Digital Twin Strategy
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">
                    This analysis surfaces what is visible from the outside
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                    The full Digital Twin Strategy process goes considerably deeper. It combines public analysis with leadership interviews, internal documents, and structured strategic planning.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("openContact"))}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                  >
                    Talk to BBTx About the Full Process
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-[#bbb] underline underline-offset-4 transition-colors hover:text-[#777]"
                >
                  Run another analysis
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {pageState !== "loading" && <Footer />}
    </div>
  );
}

// ── Report section wrapper ─────────────────────────────────

function ReportSection({
  number,
  title,
  bg,
  children,
}: {
  number: string;
  title: string;
  bg: "white" | "gray";
  children: React.ReactNode;
}) {
  return (
    <section className={`px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${bg === "gray" ? "bg-[#f8fafc]" : "bg-white"}`}>
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#bbb]">
          Section {number}
        </p>
        <h3 className="text-2xl font-semibold leading-tight tracking-tighter text-[#111] sm:text-3xl">
          {title}
        </h3>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

// ── Evidence Quality card ──────────────────────────────────

function EvidenceQualityCard({
  sources,
  fetchSucceeded,
}: {
  sources: string[] | undefined;
  fetchSucceeded: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const quality = calculateEvidenceQuality(sources, fetchSucceeded);

  return (
    <div className="shrink-0 rounded-xl border border-black/[0.08] bg-white px-5 py-4 sm:w-52">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#aaa]">
        Evidence Quality
      </p>
      <p className="mt-1.5 text-base font-semibold text-[#111]">{quality.level}</p>
      <div className="mt-3 space-y-1 border-t border-black/[0.05] pt-3">
        <p className="text-xs text-[#888]">{quality.totalSources} Sources</p>
        <p className="text-xs text-[#888]">{quality.websitePages} Website Pages</p>
        <p className="text-xs text-[#888]">{quality.externalSources} External Sources</p>
      </div>
      {sources && sources.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-[0.65rem] font-medium text-[#aaa] transition-colors hover:text-[#777]"
          >
            {expanded ? "Hide Sources" : "View Sources"}
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
          {expanded && (
            <div className="mt-3 space-y-3 border-t border-black/[0.05] pt-3">
              {quality.websitePageLabels.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[#bbb]">
                    Website Pages
                  </p>
                  <ul className="space-y-1">
                    {quality.websitePageLabels.map((label, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ddd]" />
                        <span className="text-[0.7rem] leading-snug text-[#888]">
                          {formatSourceLabel(label)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {quality.externalSourceLabels.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[#bbb]">
                    External Research
                  </p>
                  <ul className="space-y-1">
                    {quality.externalSourceLabels.map((label, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ddd]" />
                        <span className="text-[0.7rem] leading-snug text-[#888]">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
