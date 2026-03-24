"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownLeft, ArrowUpRight } from "@/app/components/ArrowIcon";

const ACCENT = "#ca3726";

const STEP_LABELS = [
  "About Your Organization",
  "Your AI Usage",
  "Your AI Strategy",
  "Your Biggest Challenges",
  "What You're Looking For",
  "Book Your Call",
];

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Government",
  "Consulting",
  "Non-profit",
  "Other",
];

const ORG_SIZES = ["1-10", "11-50", "51-200", "200+"];

const AI_USAGE_OPTIONS = ["Yes", "No", "Exploring"];

const AI_VISIBILITY_OPTIONS = [
  "Yes, we have full visibility",
  "Somewhat, but not completely",
  "No, we don't have visibility",
];

const AI_GUIDELINES_OPTIONS = [
  "Yes, we have clear guidelines",
  "We have some but they're not widely known",
  "We don't have guidelines yet",
];

const LEADERSHIP_TRAINING_OPTIONS = [
  "Yes, fully trained",
  "Some leaders have, others haven't",
  "No, not yet",
];

const STRATEGY_OWNER_OPTIONS = [
  "A dedicated person or team",
  "It's shared across leadership",
  "No one owns it yet",
];

const STRATEGY_STATUS_OPTIONS = [
  "We have a clear one",
  "We're figuring it out",
  "We don't have one yet",
];

const STRATEGIC_PLAN_OPTIONS = [
  "Yes",
  "We have one but it's not actively used",
  "No",
];

const CHALLENGE_OPTIONS = [
  "We don't know where to start",
  "We have initiatives but no clear direction",
  "Leadership isn't aligned",
  "We're not seeing results from what we've tried",
  "We're worried about falling behind",
  "Other",
];

const NEED_OPTIONS = [
  "A clear AI strategy and implementation plan",
  "An honest assessment of where we stand with AI",
  "A model of how our organization actually operates",
  "I'm not sure yet, I need guidance",
];

const TIMELINE_OPTIONS = ["Immediately", "Within 3 months", "Just exploring"];

// ─── Shared card primitives ────────────────────────────────────────────────────

function RadioCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="w-full text-left transition-colors"
      style={{
        border: `1px solid ${checked ? ACCENT : "#e8e8e8"}`,
        borderRadius: "8px",
        padding: "12px 16px",
        background: checked ? "#fff5f5" : "#ffffff",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!checked)
          (e.currentTarget as HTMLElement).style.borderColor = "#cccccc";
      }}
      onMouseLeave={(e) => {
        if (!checked)
          (e.currentTarget as HTMLElement).style.borderColor = "#e8e8e8";
      }}
    >
      <span className="text-sm font-medium text-[#222222]">{label}</span>
    </button>
  );
}

function CheckCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="w-full text-left transition-colors"
      style={{
        border: `1px solid ${checked ? ACCENT : "#e8e8e8"}`,
        borderRadius: "8px",
        padding: "12px 16px",
        background: checked ? "#fff5f5" : "#ffffff",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!checked)
          (e.currentTarget as HTMLElement).style.borderColor = "#cccccc";
      }}
      onMouseLeave={(e) => {
        if (!checked)
          (e.currentTarget as HTMLElement).style.borderColor = "#e8e8e8";
      }}
    >
      <span className="text-sm font-medium text-[#222222]">{label}</span>
    </button>
  );
}

// ─── Initial state ─────────────────────────────────────────────────────────────

const initialFormData = {
  full_name: "",
  email: "",
  role: "",
  organization_name: "",
  industry: "",
  organization_size: "",
  currently_using_ai: "",
  ai_usage_visibility: "",
  ai_guidelines_status: "",
  leadership_ai_training: "",
  ai_strategy_owner: "",
  ai_strategy_status: "",
  has_strategic_plan: "",
  biggest_challenges: [] as string[],
  other_challenge: "",
  primary_need: "",
  timeline: "",
  wants_orientation_workshop: false,
};

type FormData = typeof initialFormData;

// ─── Page component ────────────────────────────────────────────────────────────

// workshopChoice: 0 = "Yes", 1 = "Maybe later", 2 = "No thanks", -1 = unselected
type WorkshopChoice = -1 | 0 | 1 | 2;

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [workshopChoice, setWorkshopChoice] = useState<WorkshopChoice>(-1);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Guard step 6 — only accessible after successful submission
  useEffect(() => {
    if (currentStep === 6 && !isSubmitted) {
      setCurrentStep(1);
    }
  }, [currentStep, isSubmitted]);

  // Listen for Calendly ready via postMessage as a fallback
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (
        typeof e.data === "object" &&
        (e.data?.event === "calendly.event_type_viewed" ||
          e.data?.event === "calendly.profile_page_viewed")
      ) {
        setCalendlyLoaded(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function updateFormData(patch: Partial<FormData>) {
    setFormData((prev) => ({ ...prev, ...patch }));
  }

  function toggleChallenge(value: string) {
    setFormData((prev) => {
      const arr = prev.biggest_challenges;
      return {
        ...prev,
        biggest_challenges: arr.includes(value)
          ? arr.filter((x) => x !== value)
          : [...arr, value],
      };
    });
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: "" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSubmitted(true);
      setCurrentStep(6);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const step1Valid = formData.full_name.trim() !== "" && formData.email.trim() !== "";

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="relative min-h-screen bg-[#f7f7f7]">
      {/* Back link */}
      <div className="relative z-[1]">
        <div className="mx-auto max-w-6xl py-3 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-[#222222]"
          >
            <ArrowDownLeft className="h-4 w-4 shrink-0" />
            Back to home
          </Link>
        </div>
      </div>

      {/* Main layout */}
      <section className="relative z-[1] w-full pb-16 pt-4">
        <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6 lg:flex-row lg:px-8">

          {/* ── Sidebar ── */}
          <aside className="border-b border-black/[0.06] lg:w-64 lg:shrink-0 lg:border-b-0 lg:py-10 lg:pr-8">
            <nav
              className="flex flex-row gap-2 overflow-x-auto py-4 lg:flex-col lg:gap-5 lg:overflow-visible lg:py-0"
              aria-label="Assessment steps"
            >
              {STEP_LABELS.map((label, i) => {
                const stepNum = i + 1;
                const isCompleted = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;
                return (
                  <div key={label} className="relative flex shrink-0 items-start gap-3 lg:gap-4 lg:py-0.5">
                    <div
                      className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 lg:h-7 lg:w-7"
                      style={{
                        backgroundColor: isCompleted ? ACCENT : "white",
                        borderColor: isCompleted
                          ? "transparent"
                          : isCurrent
                          ? ACCENT
                          : "rgba(0,0,0,0.18)",
                        boxShadow: isCompleted ? `0 0 0 2px white` : "none",
                      }}
                    >
                      {isCompleted && (
                        <svg
                          className="h-3.5 w-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`hidden pt-0.5 text-sm lg:block lg:pt-1 ${
                        isCurrent || isCompleted ? "font-medium text-[#222222]" : "text-[#555555]/70"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* ── Form content ── */}
          <div className="flex-1 lg:py-10 lg:pl-12">

            {/* Hidden honeypot */}
            <input
              type="text"
              name="website"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              value=""
              onChange={() => {}}
            />

            {/* ── STEP 1 ── */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                  About Your Organization
                </h2>
                <p className="mt-1 text-sm text-[#555555]">Tell us who we're talking to.</p>

                <div className="mt-8 space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="full_name" className="text-sm font-medium text-[#222222]">
                      Your Name <span className="text-[#ca3726]">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={formData.full_name}
                      onChange={(e) => updateFormData({ full_name: e.target.value })}
                      className="h-11 border-black/10 bg-white focus-visible:ring-[#ca3726]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-[#222222]">
                      Email Address <span className="text-[#ca3726]">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => updateFormData({ email: e.target.value })}
                      className="h-11 border-black/10 bg-white focus-visible:ring-[#ca3726]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-sm font-medium text-[#222222]">
                      Your Role / Title
                    </Label>
                    <Input
                      id="role"
                      type="text"
                      placeholder="CEO, Director of Operations..."
                      value={formData.role}
                      onChange={(e) => updateFormData({ role: e.target.value })}
                      className="h-11 border-black/10 bg-white focus-visible:ring-[#ca3726]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="organization_name" className="text-sm font-medium text-[#222222]">
                      Organization Name
                    </Label>
                    <Input
                      id="organization_name"
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.organization_name}
                      onChange={(e) => updateFormData({ organization_name: e.target.value })}
                      className="h-11 border-black/10 bg-white focus-visible:ring-[#ca3726]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-[#222222]">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(val) => updateFormData({ industry: val ?? "" })}
                    >
                      <SelectTrigger className="h-11 border-black/10 bg-white focus:ring-[#ca3726]">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#222222]">Organization Size</Label>
                    <div className="flex flex-wrap gap-2">
                      {ORG_SIZES.map((size) => {
                        const selected = formData.organization_size === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => updateFormData({ organization_size: size })}
                            className="min-w-[4.5rem] transition-colors"
                            style={{
                              border: `1px solid ${selected ? ACCENT : "#e8e8e8"}`,
                              borderRadius: "8px",
                              padding: "12px 16px",
                              background: selected ? "#fff5f5" : "#ffffff",
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#222222",
                              cursor: "pointer",
                            }}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!step1Valid}
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Continue
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                  Your AI Usage
                </h2>
                <p className="mt-1 text-sm text-[#555555]">Understand where you are with AI today.</p>

                <div className="mt-8 space-y-8">
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Is your organization currently using AI tools?
                    </legend>
                    <div className="space-y-2">
                      {AI_USAGE_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.currently_using_ai === opt}
                          onChange={() => updateFormData({ currently_using_ai: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Do you know how your employees are using AI?
                    </legend>
                    <div className="space-y-2">
                      {AI_VISIBILITY_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.ai_usage_visibility === opt}
                          onChange={() => updateFormData({ ai_usage_visibility: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Do all employees know your AI usage guidelines?
                    </legend>
                    <div className="space-y-2">
                      {AI_GUIDELINES_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.ai_guidelines_status === opt}
                          onChange={() => updateFormData({ ai_guidelines_status: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Has your leadership team been trained in the basics of AI?
                    </legend>
                    <div className="space-y-2">
                      {LEADERSHIP_TRAINING_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.leadership_ai_training === opt}
                          onChange={() => updateFormData({ leadership_ai_training: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>
                </div>

                <StepNav
                  onBack={() => setCurrentStep(1)}
                  onNext={() => setCurrentStep(3)}
                />
              </div>
            )}

            {/* ── STEP 3 ── */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                  Your AI Strategy
                </h2>
                <p className="mt-1 text-sm text-[#555555]">Understand where strategy ownership sits.</p>

                <div className="mt-8 space-y-8">
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Who is responsible for your AI integration strategy?
                    </legend>
                    <div className="space-y-2">
                      {STRATEGY_OWNER_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.ai_strategy_owner === opt}
                          onChange={() => updateFormData({ ai_strategy_owner: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      How would you describe your current AI strategy?
                    </legend>
                    <div className="space-y-2">
                      {STRATEGY_STATUS_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.ai_strategy_status === opt}
                          onChange={() => updateFormData({ ai_strategy_status: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Are you following a current organizational strategic plan?
                    </legend>
                    <div className="space-y-2">
                      {STRATEGIC_PLAN_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.has_strategic_plan === opt}
                          onChange={() => updateFormData({ has_strategic_plan: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>
                </div>

                <StepNav
                  onBack={() => setCurrentStep(2)}
                  onNext={() => setCurrentStep(4)}
                />
              </div>
            )}

            {/* ── STEP 4 ── */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                  Your Biggest Challenges
                </h2>
                <p className="mt-1 text-sm text-[#555555]">
                  What is your biggest challenge right now? Select all that apply.
                </p>

                <div className="mt-8 space-y-2">
                  {CHALLENGE_OPTIONS.map((opt) => (
                    <CheckCard
                      key={opt}
                      label={opt}
                      checked={formData.biggest_challenges.includes(opt)}
                      onChange={() => toggleChallenge(opt)}
                    />
                  ))}

                  {formData.biggest_challenges.includes("Other") && (
                    <Input
                      placeholder="Tell us more..."
                      value={formData.other_challenge}
                      onChange={(e) => updateFormData({ other_challenge: e.target.value })}
                      className="mt-3 h-11 border-black/10 bg-white focus-visible:ring-[#ca3726]"
                    />
                  )}
                </div>

                <StepNav
                  onBack={() => setCurrentStep(3)}
                  onNext={() => setCurrentStep(5)}
                />
              </div>
            )}

            {/* ── STEP 5 ── */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                  What You&apos;re Looking For
                </h2>
                <p className="mt-1 text-sm text-[#555555]">Help us understand how we can best serve you.</p>

                <div className="mt-8 space-y-8">
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Which best describes what you need right now?
                    </legend>
                    <div className="space-y-2">
                      {NEED_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.primary_need === opt}
                          onChange={() => updateFormData({ primary_need: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      How soon are you looking to move forward?
                    </legend>
                    <div className="space-y-2">
                      {TIMELINE_OPTIONS.map((opt) => (
                        <RadioCard
                          key={opt}
                          label={opt}
                          checked={formData.timeline === opt}
                          onChange={() => updateFormData({ timeline: opt })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-[#222222]">
                      Would you like to attend a free online orientation workshop?
                    </legend>
                    <div className="space-y-3">
                      {(
                        [
                          {
                            label: "Yes, sign me up",
                            description: "We'll send you details about the next available session.",
                          },
                          {
                            label: "Maybe later",
                            description: "You can always sign up after your kickoff call.",
                          },
                          {
                            label: "No thanks",
                            description: "No problem, we'll focus on your assessment.",
                          },
                        ] as const
                      ).map(({ label, description }, idx) => (
                        <WorkshopCard
                          key={label}
                          label={label}
                          description={description}
                          checked={workshopChoice === idx}
                          onChange={() => {
                            setWorkshopChoice(idx as WorkshopChoice);
                            updateFormData({ wants_orientation_workshop: idx === 0 });
                          }}
                        />
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-10 flex flex-col items-end gap-3">
                  {submitError && (
                    <p className="w-full text-sm text-red-500">{submitError}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#555555] hover:text-[#222222] disabled:opacity-50"
                    >
                      <ArrowDownLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit &amp; Book Your Call
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 6 ── */}
            {currentStep === 6 && isSubmitted && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 shrink-0" style={{ color: ACCENT }} />
                  <p className="text-sm text-[#666666]">Your assessment has been submitted.</p>
                </div>

                <h2
                  className="tracking-tight"
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginBottom: "8px",
                  }}
                >
                  You&apos;re all set. Book your kickoff call.
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#666666",
                    marginBottom: "32px",
                  }}
                >
                  Grant will review your answers before your call so your time together is focused from minute one.
                </p>

                <div className="assessment-calendly-host w-full" style={{ position: "relative", minHeight: "700px" }}>
                  {!calendlyLoaded && (
                    <div
                      className="animate-pulse"
                      style={{
                        height: "700px",
                        width: "100%",
                        background: "#f4f4f4",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  {calendlyUrl && (
                    <>
                      <div
                        className="calendly-inline-widget w-full max-w-full"
                        data-url={`${calendlyUrl}?name=${encodeURIComponent(formData.full_name)}&email=${encodeURIComponent(formData.email)}`}
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          minWidth: 0,
                          height: "700px",
                          display: calendlyLoaded ? "block" : "none",
                        }}
                      />
                      <Script
                        src="https://assets.calendly.com/assets/external/widget.js"
                        strategy="lazyOnload"
                        onLoad={() => setCalendlyLoaded(true)}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Workshop card ─────────────────────────────────────────────────────────────

function WorkshopCard({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="w-full text-left transition-colors"
      style={{
        border: `1px solid ${checked ? ACCENT : "#e8e8e8"}`,
        borderRadius: "8px",
        padding: "20px 24px",
        background: checked ? "#fff5f5" : "#ffffff",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (!checked)
          (e.currentTarget as HTMLElement).style.borderColor = "#cccccc";
      }}
      onMouseLeave={(e) => {
        if (!checked)
          (e.currentTarget as HTMLElement).style.borderColor = "#e8e8e8";
      }}
    >
      <p className="text-sm font-semibold text-[#222222]">{label}</p>
      <p className="mt-1 text-sm text-[#666666]">{description}</p>
    </button>
  );
}

// ─── Step navigation ───────────────────────────────────────────────────────────

function StepNav({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#555555] hover:text-[#222222]"
      >
        <ArrowDownLeft className="h-4 w-4" />
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-95"
        style={{ backgroundColor: ACCENT }}
      >
        Continue
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
