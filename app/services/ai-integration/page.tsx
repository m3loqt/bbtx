"use client";

import { useState } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const darkGridBg = {
  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)`,
  backgroundSize: "48px 48px",
};

const EXECUTIVE_REALITIES = [
  {
    name: "Teams are experimenting without direction",
    description:
      "Activity is increasing, but leaders cannot always tell what is useful, safe, scalable, or worth continuing",
  },
  {
    name: "Leaders cannot separate signal from hype",
    description:
      "Every tool promises transformation, but few conversations begin with the organization’s actual work",
  },
  {
    name: "Governance appears after risk emerges",
    description:
      "Policies arrive late because experimentation moved faster than leadership alignment",
  },
  {
    name: "Technology moves faster than organizational capability",
    description:
      "The tool improves before the organization has built the judgment, habits, and confidence to use it well",
  },
];

const STALL_POINTS = [
  {
    name: "Leadership",
    description: "No clear ownership for decisions, investment, risk, or adoption",
  },
  {
    name: "Governance",
    description: "No practical guardrails for experimentation, accountability, and responsible use",
  },
  {
    name: "Workflows",
    description: "No clear connection between AI tools and the way work actually gets done",
  },
  {
    name: "Workforce",
    description: "No shared confidence, capability, or standards for using AI well",
  },
];

const PERFORMANCE_MODEL = [
  {
    name: "Leadership",
    description: "Can leaders make sound decisions about AI adoption, risk, investment, and change",
  },
  {
    name: "Governance",
    description: "Are there clear guardrails for experimentation, accountability, and responsible use",
  },
  {
    name: "Workflows",
    description: "Where does AI improve quality, speed, decision-making, or service delivery",
  },
  {
    name: "Capability",
    description: "Do teams have the confidence and skills needed to use AI effectively",
  },
  {
    name: "Performance",
    description: "Is AI improving outcomes that matter to the organization",
  },
];

const SUCCESS_OUTCOMES = [
  "Leadership teams make better decisions about AI",
  "AI initiatives align with strategic priorities",
  "Governance supports innovation without creating paralysis",
  "Teams know where AI adds value",
  "Work gets faster without sacrificing quality",
  "Capability compounds beyond individual champions",
];

const STEPS = [
  {
    number: "01",
    name: "Assess Readiness",
    description:
      "Understand leadership, governance, workflows, culture, and workforce capability before major decisions are made",
  },
  {
    number: "02",
    name: "Identify Opportunities",
    description:
      "Find where AI can improve decisions, quality, speed, service, or strategic execution",
  },
  {
    number: "03",
    name: "Design Governance",
    description:
      "Create practical guardrails that support responsible experimentation and reduce avoidable risk",
  },
  {
    number: "04",
    name: "Enable Adoption",
    description:
      "Build the leadership, workflow, and workforce conditions required for AI to be used well",
  },
  {
    number: "05",
    name: "Measure Progress",
    description:
      "Track whether AI is improving performance, not just increasing activity",
  },
];

const ENGAGEMENTS = [
  {
    name: "Organizational AI Assessment",
    description:
      "Understand readiness, risks, opportunities, governance maturity, and workforce capability",
  },
  {
    name: "AI Organizational Model",
    description:
      "Design how AI fits into decision-making, roles, workflows, and operating principles",
  },
  {
    name: "Transformational Strategy & Implementation Plan",
    description:
      "Prioritize AI-enabled initiatives and create a practical roadmap with clear ownership",
  },
  {
    name: "AI Governance & Policy Development",
    description:
      "Create guardrails that support useful experimentation while managing risk",
  },
  {
    name: "Leadership & Workforce Enablement",
    description:
      "Build the confidence and capability leaders and teams need to work effectively with AI",
  },
];

const SITUATIONS = [
  "AI experimentation is increasing across teams",
  "Leadership wants clarity before major investment",
  "Governance concerns are emerging",
  "Teams need direction and shared standards",
  "Strategic planning needs to account for AI",
  "Current AI activity is not producing measurable value",
];

const FAQ_ITEMS = [
  {
    question: "Do we need an AI strategy before adopting AI",
    answer:
      "Not always. But organizations benefit from knowing where AI supports strategic priorities before investing heavily. Without that clarity, adoption often creates activity without outcomes",
  },
  {
    question: "Is this focused on technology implementation",
    answer:
      "No. The primary focus is organizational capability, adoption, governance, and performance. Technology decisions follow from organizational clarity, not the other way around",
  },
  {
    question: "Do you help evaluate AI readiness",
    answer:
      "Yes. Assessment is often the best starting point because it shows whether the organization is prepared to use AI well",
  },
  {
    question: "What if our teams are already experimenting with AI",
    answer:
      "That is common. Many engagements focus on bringing structure, governance, and alignment to efforts already in motion",
  },
  {
    question: "How does this connect to strategic planning",
    answer:
      "AI should support organizational objectives. It is most effective when connected to strategy, operations, leadership, and execution",
  },
];

function FaqMinusIcon({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#222222] text-white sm:h-9 sm:w-9 ${className ?? ""}`}
      aria-hidden
    >
      <span className="block h-[2px] w-2.5 rounded-full bg-white" />
    </span>
  );
}

function FaqPlusIcon({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#ca3726] text-white sm:h-9 sm:w-9 ${className ?? ""}`}
      aria-hidden
    >
      <span className="relative block h-[2px] w-2.5 rounded-full bg-white before:absolute before:left-1/2 before:top-1/2 before:h-2.5 before:w-[2px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white" />
    </span>
  );
}

export default function AiIntegrationPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero */}
      <section className="relative z-[1] flex min-h-[calc(100vh-3.5rem)] w-full flex-col bg-[#f7f7f7] pt-14 sm:min-h-screen sm:pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />

        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 pt-6 sm:px-6 sm:pt-0 lg:px-8 lg:pb-12">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            AI Integration & Innovation
          </p>

          <h1 className="max-w-[96%] text-[2.5rem] font-medium leading-[1.06] tracking-tighter text-[#222222] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            Most organizations don&apos;t have an AI problem.{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              They have an organizational capability problem AI happens to expose
            </span>
          </h1>

          <p className="mt-5 max-w-5xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-6 sm:text-xl">
            AI adoption succeeds when leadership, governance, workflows, and workforce capability
            evolve together. We help organizations move beyond experimentation and build the
            conditions required for sustainable AI-enabled performance
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("openContact"))}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#222222] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
            >
              Start an Assessment
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("openContact"))}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-black/[0.1] px-5 py-3 text-[15px] font-medium text-[#555555] transition-colors hover:border-black/[0.2] hover:text-[#222222]"
            >
              Talk to Us
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Wide Image */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
        <div className="h-[34vh] w-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_2px_18px_rgba(0,0,0,0.04)] sm:h-[44vh]">
          <img src="/serv4.png" alt="" className="h-full w-full object-cover object-top" />
        </div>
      </section>

      {/* 3. Executive Reality */}
      <section className="relative z-[1] w-full bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />

        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              The Executive Reality
            </p>

            <h2 className="mt-8 max-w-5xl text-[2rem] font-medium leading-[1.08] tracking-tighter text-white sm:text-[3rem] lg:text-[4rem]">
              Most leadership teams are asking{" "}
              <span className="text-[#ca3726]">the wrong AI question</span>
            </h2>

            <div className="mt-12 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-6 sm:p-10 lg:mt-16 lg:p-12">
              <p className="text-xl font-medium leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem]">
                Instead of asking where should we use AI, leaders should be asking where are we
                making decisions poorly, moving too slowly, or carrying unnecessary cost
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:mt-14">
              {EXECUTIVE_REALITIES.map((item) => (
                <div key={item.name} className="bg-[#222222] p-6 sm:p-8 lg:p-10">
                  <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {item.name}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-white/45">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why AI Initiatives Stall */}
      <section className="relative z-[1] w-full bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Why AI Initiatives Stall
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              The technology usually works.{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                The organization often isn&apos;t prepared to use it well
              </span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-px bg-black/[0.06] sm:grid-cols-2 lg:mt-14">
              {STALL_POINTS.map((point) => (
                <div key={point.name} className="bg-white p-6 sm:p-8 lg:p-10">
                  <p className="text-2xl font-semibold tracking-tight text-[#222222]">
                    {point.name}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BBTx Difference */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            The BBTx Difference
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              Most AI consulting starts with tools.{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                We start with organizational performance
              </span>
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[#555555] sm:text-xl">
              AI creates value only when leadership, governance, workflows, capability, and
              performance work together
            </p>

            <div className="mt-10 border-t border-black/[0.08] lg:mt-14">
              {PERFORMANCE_MODEL.map((item, index) => (
                <div
                  key={item.name}
                  className="grid gap-4 border-b border-black/[0.08] py-7 sm:grid-cols-[120px_1fr] sm:gap-8 lg:grid-cols-[140px_0.8fr_1.2fr] lg:items-start lg:py-9"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]/70">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-2xl font-semibold tracking-tight text-[#222222]">
                    {item.name}
                  </h3>

                  <p className="max-w-2xl text-base leading-relaxed text-[#555555] sm:text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. What Success Looks Like */}
      <section className="relative z-[1] w-full bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What Success Looks Like
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
            The goal is not more AI.{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              The goal is better organizational performance
            </span>
          </h2>

          <div className="mt-12 border-t border-black/[0.08] text-left lg:mt-16">
            {SUCCESS_OUTCOMES.map((item) => (
              <div key={item} className="border-b border-black/[0.08] py-6 sm:py-8">
                <p className="text-xl font-medium leading-snug tracking-tight text-[#222222] sm:text-2xl lg:text-3xl">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How We Work */}
      <section id="how-we-work" className="relative z-[1] w-full bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            How We Work
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              Not AI implementation for its own sake.{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Organizational capability supported by technology
              </span>
            </h2>

            <div className="mt-10 border-t border-black/[0.08] lg:mt-14">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="grid gap-4 border-b border-black/[0.08] py-8 sm:grid-cols-[90px_1fr] sm:gap-8 lg:grid-cols-[120px_1fr] lg:py-10"
                >
                  <span className="text-[2.75rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[4rem]">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                      {step.name}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#555555] sm:text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Engagement Options */}
      <section className="relative z-[1] overflow-hidden bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />

        <div className="relative z-[1] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              Engagement Options
            </p>

            <div>
              <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-white sm:text-4xl lg:text-[3.2rem]">
                Organizations enter AI adoption from very different starting points
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/50 sm:text-xl">
                Some need clarity. Some need structure. Some need support bringing order to
                efforts already in motion
              </p>

              <div className="mt-10 grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:mt-14">
                {ENGAGEMENTS.map((eng, index) => (
                  <div
                    key={eng.name}
                    className={`bg-[#222222] p-6 sm:p-8 lg:p-10 ${
                      index === 2 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <p className="text-xl font-semibold tracking-tight text-white/85 sm:text-2xl">
                      {eng.name}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-white/45">
                      {eng.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("openContact"))}
                className="mt-10 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
              >
                Talk to Us About Your Situation
                <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Who This Is For */}
      <section className="relative z-[1] w-full bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Who This Is For
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              This work is often valuable when the organization needs direction{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                before AI activity spreads further
              </span>
            </h2>

            <div className="mt-8 space-y-0 border-l-2 border-black/[0.08] pl-6">
              {SITUATIONS.map((item) => (
                <p
                  key={item}
                  className="border-b border-black/[0.06] py-4 text-[15px] leading-relaxed text-[#555555] last:border-b-0 sm:text-base lg:text-[17px]"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What Leaders Ask Us
          </p>

          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:mt-5 sm:text-4xl lg:text-[2.8rem]">
            Frequently Asked{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Questions
            </span>
          </h2>

          <ul className="mt-8 flex flex-col gap-3 text-left sm:mt-16 sm:gap-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = faqOpenIndex === index;

              return (
                <li key={item.question}>
                  <article className="overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <button
                      type="button"
                      onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
                      aria-expanded={isOpen}
                    >
                      <h3 className="flex-1 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                        {item.question}
                      </h3>

                      {isOpen ? <FaqMinusIcon /> : <FaqPlusIcon />}
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-black/[0.06] px-6 pb-5 pt-4 text-base leading-relaxed text-[#555555] sm:px-8 sm:pb-6 sm:pt-4 sm:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 11. CTA */}
      <section className="relative z-[1] bg-[#f7f7f7]">
        <div className="relative z-[1] w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.25)] sm:rounded-2xl">
            <img
              src="/cta.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />

            <div className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40" aria-hidden />

            <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                AI will not transform your organization by itself.{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  The organizations that benefit most are prepared to use it well
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-tight text-white/95 sm:text-2xl lg:mt-10">
                Start by understanding where you are today and what should happen next
              </p>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("openContact"))}
                className="mt-12 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95 lg:mt-14"
              >
                Start an Assessment
                <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}