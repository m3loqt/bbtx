"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight } from "@/app/components/ArrowIcon";

const ACCENT_RED = "#ca3726";

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const STEPS = [
  "About your organization",
  "Your AI situation",
  "Your biggest challenges",
  "What you're looking for",
  "Book your call",
];

const INDUSTRIES = [
  "Professional services",
  "Healthcare",
  "Financial services",
  "Technology",
  "Manufacturing",
  "Retail",
  "Nonprofit",
  "Government",
  "Education",
  "Other",
];

const ORG_SIZES = ["1-10", "11-50", "51-200", "200+"];

const AI_AREAS = ["Operations", "Marketing", "HR", "Finance", "Customer Service", "Other"];

const STRATEGY_OPTIONS = [
  "We have a clear one",
  "We're figuring it out",
  "We don't have one yet",
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
  "I'm not sure yet — I need guidance",
];

const TIMELINE_OPTIONS = ["Immediately", "Within 3 months", "Just exploring"];

type FormData = {
  name: string;
  role: string;
  orgName: string;
  industry: string;
  orgSize: string;
  usingAi: string;
  aiAreas: string[];
  strategy: string;
  challenges: string[];
  challengeOther: string;
  need: string;
  timeline: string;
};

function AssessmentForm({
  step,
  setStep,
  formData,
  setFormData,
}: {
  step: number;
  setStep: (n: number) => void;
  formData: FormData;
  setFormData: (d: FormData | ((prev: FormData) => FormData)) => void;
}) {
  const update = (key: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const toggleArray = (key: "aiAreas" | "challenges", value: string) => {
    setFormData((prev) => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  return (
    <section className="relative z-[1] min-h-screen w-full pt-8">
      <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
        {/* Left: progress sidebar */}
        <aside className="relative border-b border-black/[0.06] lg:w-72 lg:border-b-0 lg:py-10 lg:pr-8">
          <nav className="relative flex flex-row gap-2 overflow-x-auto px-4 py-6 lg:flex-col lg:gap-5 lg:overflow-visible lg:px-0 lg:py-0" aria-label="Progress">
            {STEPS.map((label, i) => {
              const isCompleted = step > i + 1;
              const isCurrent = step === i + 1;
              return (
                <div key={label} className="relative flex items-start gap-3 lg:gap-4 lg:py-0.5">
                  {/* Opaque circle wrapper masks the line so it doesn’t show through */}
                  <div
                    className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 lg:h-7 lg:w-7"
                    style={{
                      backgroundColor: isCompleted ? ACCENT_RED : "white",
                      borderColor: isCompleted ? "transparent" : isCurrent ? ACCENT_RED : "rgba(0,0,0,0.2)",
                      boxShadow: isCompleted ? "0 0 0 2px white" : "none",
                    }}
                  >
                    {isCompleted && (
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`pt-0.5 text-sm lg:pt-1 ${isCurrent || isCompleted ? "text-[#222222]" : "text-[#555555]/80"}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Right: form content */}
        <div className="flex-1 px-4 py-8 sm:px-6 lg:px-12 lg:py-10">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                About your organization
              </h2>
              <p className="mt-1 text-sm text-[#555555]">Understand who we're talking to.</p>
              <div className="mt-8 space-y-6">
                <div>
                  <label htmlFor="assessment-name" className="block text-sm font-medium text-[#222222]">Your name</label>
                  <input
                    id="assessment-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-black/[0.1] bg-white px-4 py-3 text-[#222222] placeholder:text-[#888] transition-colors focus:border-[#ca3726] focus:outline-none focus:ring-1 focus:ring-[#ca3726]"
                    placeholder="e.g. Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="assessment-role" className="block text-sm font-medium text-[#222222]">Your role / title</label>
                  <input
                    id="assessment-role"
                    type="text"
                    value={formData.role}
                    onChange={(e) => update("role", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-black/[0.1] bg-white px-4 py-3 text-[#222222] placeholder:text-[#888] transition-colors focus:border-[#ca3726] focus:outline-none focus:ring-1 focus:ring-[#ca3726]"
                    placeholder="e.g. Chief Operations Officer"
                  />
                </div>
                <div>
                  <label htmlFor="assessment-org" className="block text-sm font-medium text-[#222222]">Organization name</label>
                  <input
                    id="assessment-org"
                    type="text"
                    value={formData.orgName}
                    onChange={(e) => update("orgName", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-black/[0.1] bg-white px-4 py-3 text-[#222222] placeholder:text-[#888] transition-colors focus:border-[#ca3726] focus:outline-none focus:ring-1 focus:ring-[#ca3726]"
                    placeholder="e.g. Acme Inc."
                  />
                </div>
                <div>
                  <label htmlFor="assessment-industry" className="block text-sm font-medium text-[#222222]">Industry</label>
                  <select
                    id="assessment-industry"
                    value={formData.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-black/[0.1] bg-white px-4 py-3 text-[#222222] transition-colors focus:border-[#ca3726] focus:outline-none focus:ring-1 focus:ring-[#ca3726]"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#222222]">Organization size</label>
                  <p className="mt-0.5 text-xs text-[#555555]">Select one.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ORG_SIZES.map((size) => {
                      const selected = formData.orgSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => update("orgSize", size)}
                          className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors min-w-[4.5rem] ${
                            selected
                              ? "border-[#ca3726] bg-[#ca3726]/10 text-[#222222]"
                              : "border-black/[0.1] bg-[#f7f7f7] text-[#222222] hover:border-black/20 hover:bg-[#efefef]"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                Your AI situation
              </h2>
              <p className="mt-1 text-sm text-[#555555]">Understand where you are with AI today.</p>
              <div className="mt-8 space-y-6">
                <fieldset>
                  <legend className="block text-sm font-medium text-[#222222]">Is your organization currently using AI tools?</legend>
                  <div className="mt-3 space-y-2">
                    {["Yes", "No", "Exploring"].map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 pr-3 hover:bg-[#f7f7f7]/50 -m-1 p-1">
                        <input
                          type="radio"
                          name="usingAi"
                          checked={formData.usingAi === opt}
                          onChange={() => update("usingAi", opt)}
                          className="h-4 w-4 shrink-0 border-gray-300 text-[#ca3726] focus:ring-2 focus:ring-[#ca3726] focus:ring-offset-0"
                          style={{ accentColor: ACCENT_RED }}
                        />
                        <span className="text-[#222222]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {formData.usingAi === "Yes" && (
                  <div>
                    <label className="block text-sm font-medium text-[#222222]">If yes, which areas?</label>
                    <p className="mt-0.5 text-xs text-[#555555]">Select all that apply.</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {AI_AREAS.map((area) => (
                        <label key={area} className="flex cursor-pointer items-center gap-2.5 rounded-lg py-2 pr-2 hover:bg-[#f7f7f7]/50 -m-1 p-1">
                          <input
                            type="checkbox"
                            checked={formData.aiAreas.includes(area)}
                            onChange={() => toggleArray("aiAreas", area)}
                            className="h-4 w-4 shrink-0 rounded border-gray-300 text-[#ca3726] focus:ring-2 focus:ring-[#ca3726] focus:ring-offset-0"
                            style={{ accentColor: ACCENT_RED }}
                          />
                          <span className="text-sm text-[#222222]">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <fieldset>
                  <legend className="block text-sm font-medium text-[#222222]">How would you describe your current AI strategy?</legend>
                  <div className="mt-3 space-y-2">
                    {STRATEGY_OPTIONS.map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 pr-3 hover:bg-[#f7f7f7]/50 -m-1 p-1">
                        <input
                          type="radio"
                          name="strategy"
                          checked={formData.strategy === opt}
                          onChange={() => update("strategy", opt)}
                          className="h-4 w-4 shrink-0 border-gray-300 text-[#ca3726] focus:ring-2 focus:ring-[#ca3726] focus:ring-offset-0"
                          style={{ accentColor: ACCENT_RED }}
                        />
                        <span className="text-[#222222]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                Your biggest challenges
              </h2>
              <p className="mt-1 text-sm text-[#555555]">Surface the pain so we can speak to it directly.</p>
              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#222222]">What is your biggest challenge with AI right now?</label>
                  <p className="mt-0.5 text-xs text-[#555555]">Select all that apply.</p>
                  <div className="mt-3 space-y-2">
                    {CHALLENGE_OPTIONS.map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-start gap-3 rounded-lg py-2.5 pr-3 hover:bg-[#f7f7f7]/50 -m-1 p-1">
                        <input
                          type="checkbox"
                          checked={formData.challenges.includes(opt)}
                          onChange={() => toggleArray("challenges", opt)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[#ca3726] focus:ring-2 focus:ring-[#ca3726] focus:ring-offset-0"
                          style={{ accentColor: ACCENT_RED }}
                        />
                        <span className="text-[#222222]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="assessment-challenge-other" className="block text-sm font-medium text-[#222222]">Other (optional)</label>
                  <textarea
                    id="assessment-challenge-other"
                    value={formData.challengeOther}
                    onChange={(e) => update("challengeOther", e.target.value)}
                    rows={3}
                    className="mt-1.5 min-h-[80px] w-full resize-y rounded-lg border border-black/[0.1] bg-white px-4 py-3 text-[#222222] placeholder:text-[#888] transition-colors focus:border-[#ca3726] focus:outline-none focus:ring-1 focus:ring-[#ca3726]"
                    placeholder="Describe your challenge in a few words..."
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                What you're looking for
              </h2>
              <p className="mt-1 text-sm text-[#555555]">Pre-qualify which service fits.</p>
              <div className="mt-8 space-y-6">
                <fieldset>
                  <legend className="block text-sm font-medium text-[#222222]">Which best describes what you need right now?</legend>
                  <div className="mt-3 space-y-2">
                    {NEED_OPTIONS.map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 pr-3 hover:bg-[#f7f7f7]/50 -m-1 p-1">
                        <input
                          type="radio"
                          name="need"
                          checked={formData.need === opt}
                          onChange={() => update("need", opt)}
                          className="h-4 w-4 shrink-0 border-gray-300 text-[#ca3726] focus:ring-2 focus:ring-[#ca3726] focus:ring-offset-0"
                          style={{ accentColor: ACCENT_RED }}
                        />
                        <span className="text-[#222222]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="block text-sm font-medium text-[#222222]">How soon are you looking to move forward?</legend>
                  <div className="mt-3 space-y-2">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 pr-3 hover:bg-[#f7f7f7]/50 -m-1 p-1">
                        <input
                          type="radio"
                          name="timeline"
                          checked={formData.timeline === opt}
                          onChange={() => update("timeline", opt)}
                          className="h-4 w-4 shrink-0 border-gray-300 text-[#ca3726] focus:ring-2 focus:ring-[#ca3726] focus:ring-offset-0"
                          style={{ accentColor: ACCENT_RED }}
                        />
                        <span className="text-[#222222]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">
                Book your call
              </h2>
              <p className="mt-1 text-sm text-[#555555]">Confirm and schedule your kickoff.</p>
              <div className="mt-8 rounded-xl border border-black/[0.08] bg-[#f7f7f7] p-6">
                <h3 className="text-sm font-semibold text-[#222222]">Summary of your answers</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-[#555555]">
                  <li><strong className="text-[#222222]">Name:</strong> {formData.name || "—"}</li>
                  <li><strong className="text-[#222222]">Role:</strong> {formData.role || "—"}</li>
                  <li><strong className="text-[#222222]">Organization:</strong> {formData.orgName || "—"}</li>
                  <li><strong className="text-[#222222]">Industry:</strong> {formData.industry || "—"}</li>
                  <li><strong className="text-[#222222]">Size:</strong> {formData.orgSize || "—"}</li>
                  <li><strong className="text-[#222222]">Using AI:</strong> {formData.usingAi || "—"}</li>
                  <li><strong className="text-[#222222]">Strategy:</strong> {formData.strategy || "—"}</li>
                  <li><strong className="text-[#222222]">What you need:</strong> {formData.need || "—"}</li>
                  <li><strong className="text-[#222222]">Timeline:</strong> {formData.timeline || "—"}</li>
                </ul>
              </div>
              <p className="mt-6 text-sm text-[#555555]">
                Grant will review your answers before your call so your time together is focused from minute one.
              </p>
              <div className="mt-6 rounded-xl border border-black/[0.08] bg-[#f7f7f7] p-8 text-center">
                <p className="text-sm font-medium text-[#222222]">Calendar</p>
                <p className="mt-1 text-xs text-[#555555]">Calendar embed placeholder — integrate your scheduling link here.</p>
              </div>
            </>
          )}

          <div className="mt-10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`inline-flex items-center gap-2 text-sm font-medium text-[#555555] hover:text-[#222222] ${step === 1 ? "invisible" : ""}`}
            >
              <ArrowDownLeft className="h-4 w-4" />
              Back
            </button>
            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-95"
                style={{ backgroundColor: ACCENT_RED }}
              >
                Continue
                <ArrowUpRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-95"
                style={{ backgroundColor: ACCENT_RED }}
              >
                Confirm and book
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const initialFormData: FormData = {
  name: "",
  role: "",
  orgName: "",
  industry: "",
  orgSize: "",
  usingAi: "",
  aiAreas: [],
  strategy: "",
  challenges: [],
  challengeOther: "",
  need: "",
  timeline: "",
};

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  return (
    <div className="relative min-h-screen bg-[#f7f7f7]">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
      <div className="relative z-[1]">
        <div className="mx-auto max-w-6xl py-3 pl-0 pr-4 sm:pr-6 lg:pr-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#555555] hover:text-[#222222]"
          >
            <ArrowDownLeft className="h-4 w-4 shrink-0" />
            Back to home
          </Link>
        </div>
      </div>
      <AssessmentForm
        step={step}
        setStep={setStep}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
