"use client";

import { useState } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const ASSESSMENT_FAQ_ITEMS = [
  {
    question: "What exactly does the assessment evaluate?",
    answer:
      "We evaluate your senior leadership's AI awareness, how AI is currently being used across your organization, gaps in governance and data handling, workforce readiness, and where your highest-value AI opportunities lie. The goal is a complete and honest picture of where you stand today.",
  },
  {
    question: "How is the assessment conducted?",
    answer:
      "Entirely remote. We conduct structured interviews with your leadership team and key stakeholders, review relevant documentation, and synthesize everything into a clear findings brief. No on-site visits required.",
  },
  {
    question: "How long does it take?",
    answer:
      "It depends on the size and complexity of your organization. We'll give you a clear timeline during your kickoff call before anything begins.",
  },
  {
    question: "Do we need to have AI initiatives already in place?",
    answer:
      "No. The assessment is designed to meet you where you are. Whether AI is already in use across your organization or you're just getting started, the process works either way.",
  },
  {
    question: "Who from our team needs to be involved?",
    answer:
      "Primarily your senior leadership. We need the people who own decisions, not just the technical team. The more candid access we have to leadership, the more valuable the findings.",
  },
  {
    question: "What happens after the assessment?",
    answer:
      "The assessment feeds directly into your Transformational Strategy engagement. You walk away with a clear baseline, a prioritized set of next actions, and a foundation your leadership team can build a real strategy on.",
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

export default function OrganizationalAIAssessmentPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — light top with headline + grid, full-width image bottom half */}
      <section className="relative z-[1] flex min-h-[calc(100vh-3.5rem)] w-full flex-col bg-[#f7f7f7] pt-14 sm:min-h-screen sm:pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 pt-6 sm:pt-0 sm:px-6 lg:px-8 lg:pb-14">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Organizational AI Assessment
          </p>
          <h1 className="max-w-[80%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            Before you scale AI, you need to know{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              where you actually stand.
            </span>
          </h1>
          <p className="mt-4 max-w-7xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-6 sm:text-2xl">
            Across most small and mid-size organizations, AI is being used across departments, functions, and teams, informally, inconsistently, and without oversight. Before you build a strategy, you need a clear picture of what's already in motion.
          </p>
        </div>
        <div className="relative z-[1] h-[32vh] w-full overflow-hidden sm:h-[38vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. The reality — dark, centered */}
      <section className="relative z-[1] w-full bg-white">
        <div className="relative z-[1] flex flex-col items-center justify-center px-4 py-16 text-center sm:min-h-screen sm:px-6 sm:py-24 lg:px-8">
          <div className="w-full">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">The reality</p>
            <h2 className="mx-auto mt-5 max-w-[92%] text-[1.7rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:max-w-[86%] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
              AI is already happening inside your organization. The question is{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                whether anyone is leading it.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed tracking-tight text-[#555555]/80 sm:mt-8 sm:max-w-5xl sm:text-2xl">
              Across most small and mid-size organizations, AI is being used across departments, functions, and teams informally, inconsistently, and without oversight. Before you build a strategy, you need a clear picture of what's already in motion.
            </p>
            <div className="mx-auto mt-10 grid w-full max-w-6xl gap-4 text-left sm:mt-16 sm:grid-cols-3 lg:mt-20 lg:max-w-7xl lg:gap-4">
              {[
                {
                  title: "Discover what's real",
                  body: "Surface how AI is actually being used across your organization today, not how leadership assumes it is.",
                  image: "/left.png",
                },
                {
                  title: "Expose what's at risk",
                  body: "Identify gaps in governance, data handling, and decision-making before they become problems at scale.",
                  image: "/mid.png",
                },
                {
                  title: "Establish the baseline",
                  body: "Give your leadership team a shared, honest starting point for every strategic decision that follows.",
                  image: "/right.png",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.02)]"
                >
                  <div
                    className="relative h-44 w-full bg-[#f9fafb] sm:h-60 lg:h-64"
                    aria-hidden
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6 sm:p-8">
                    <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-[#4b5563] sm:text-lg">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. What we evaluate — left eyebrow, right content blocks */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="relative z-[1] px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            {/* Left eyebrow */}
            <p className="text-base font-normal text-[#555555] sm:text-lg">
              What we evaluate
            </p>

            {/* Right: headline + intro + cards */}
            <div className="pr-0 lg:pr-[10%]">
              <h2 className="text-[1.7rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
                A structured view of{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  your AI landscape
                </span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-6 sm:text-2xl">
                We assess how AI is actually being used and how prepared your organization is to manage it responsibly and strategically.
              </p>

              {/* Cards on the right: 3 rows of 2 */}
              <div className="mt-10 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-2 lg:gap-2">
                {[
                  {
                    title: "Leadership Alignment",
                    body: "Are your senior leaders aligned on AI strategy, priorities, and direction, or is everyone moving at their own pace?",
                  },
                  {
                    title: "Workforce Integration",
                    body: "Where is AI touching your people, processes, and day-to-day operations, and is it happening with intention or by default?",
                  },
                  {
                    title: "Governance and Controls",
                    body: "Does your organization have clear policies that govern how AI is used, by whom, and with what level of oversight?",
                  },
                  {
                    title: "Data Exposure",
                    body: "What data is being fed into AI tools across your organization and how is it being managed, protected, and controlled?",
                  },
                  {
                    title: "Adoption Readiness",
                    body: "How ready is your workforce to adopt, sustain, and build on AI-driven change without losing productivity or confidence?",
                  },
                  {
                    title: "Strategic Opportunity",
                    body: "Where does AI represent the highest-value opportunity specific to your industry, your model, and your organization right now?",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:min-h-[200px] sm:p-6"
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">{item.title}</h3>
                    <p className="mt-auto pt-4 text-base leading-relaxed text-[#555555] sm:text-lg">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How the assessment works — 4-step flow */}
      <section className="relative z-[1] w-full bg-white">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="w-full">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">How It Works</p>
            <h2 className="mt-4 text-[1.7rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:mt-5 sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
              Disciplined. Methodical.{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Executive focused.
              </span>
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {[
                {
                  step: "01",
                  title: "Executive Discovery",
                  body: "We begin with remote interviews with your senior leadership team. We map current AI awareness, existing initiatives, leadership alignment, and organizational context.",
                },
                {
                  step: "02",
                  title: "Workflow Mapping",
                  body: "We identify where AI is already touching your operations, formally or informally, and assess the impact, risk, and opportunity in each area.",
                },
                {
                  step: "03",
                  title: "Governance Review",
                  body: "We examine your current policies, oversight structures, and data practices to identify gaps and vulnerabilities before they surface as problems.",
                },
                {
                  step: "04",
                  title: "Strategic Findings Brief",
                  body: "We deliver a clear, senior-ready findings document that gives your leadership team a complete and honest picture of where you stand and what to do next.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col rounded-2xl border border-black/[0.06] bg-[#f7f7f7] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:min-h-[220px] sm:p-7"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ca3726]" style={{ fontFamily: "var(--font-mono), monospace" }}>
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">{item.title}</h3>
                  <p className="mt-auto pt-4 text-sm leading-relaxed text-[#555555] sm:text-[15px]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-black/[0.06]" aria-hidden />

      {/* 5. What you receive — full-page deliverables */}
      <section className="relative z-[1] w-full bg-white">
        <div className="relative z-[1] flex flex-col justify-center px-4 py-12 sm:min-h-screen sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="w-full text-center">
            <p className="mx-auto text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              Your Deliverables
            </p>
            <h2 className="mt-4 mx-auto max-w-4xl text-[1.7rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:mt-5 sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
              What you walk away with{" "}
            
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-xl leading-relaxed tracking-tight text-[#555555]/80 sm:text-2xl">
              Not a list of recommendations. A complete picture of reality your leadership team can act on.
            </p>
            <div className="mt-10 w-full overflow-hidden sm:mt-14 lg:mt-16">
              <img
                src="/deliverable.png"
                alt=""
                className="mt-[-2.5rem] h-[420px] w-full object-contain sm:mt-[-3rem] sm:h-[520px] lg:mt-[-4rem] lg:h-[680px] xl:mt-[-4.5rem] xl:h-[740px]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-black/[0.06]" aria-hidden />

      {/* 6. Before and after clarity — full-page split (matches AI Organizational Model layout) */}
      <section className="relative z-[1] w-full">
        <div className="flex flex-col lg:flex-row lg:min-h-screen">
          {/* Before */}
          <div className="relative flex flex-col justify-center bg-[#f0f0f0] px-6 py-12 sm:px-10 sm:py-20 lg:basis-[32%] lg:min-h-screen lg:px-12 lg:py-32">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-50" style={gridBg} aria-hidden />
            <div className="relative z-[1]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                Before the assessment
              </p>
              <h3 className="mt-4 text-[2rem] font-medium leading-tight tracking-tighter text-[#222222]/40 sm:text-[2.4rem] lg:text-[2.8rem]">
                Operating in the dark.
              </h3>
              <div className="mt-10 space-y-6">
                {[
                  { label: "Shadow adoption", desc: "AI tools in use that leadership cannot see, track, or govern." },
                  { label: "Reactive oversight", desc: "Governance applied after problems surface, not before they form." },
                  { label: "Unclear ownership", desc: "No defined accountability for AI decisions, data, or outcomes." },
                  { label: "Scattered experimentation", desc: "Initiatives running in parallel without shared priorities or sequencing." },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-[#222222]/20 pl-4">
                    <p className="text-sm font-semibold text-[#222222]/50">{item.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#555555]/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* After */}
          <div className="flex flex-col justify-center bg-white px-6 py-12 sm:px-10 sm:py-20 lg:basis-[68%] lg:min-h-screen lg:px-20 lg:py-32 xl:px-28">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#ca3726]">
              After the assessment
            </p>
            <h3 className="mt-4 text-[2.2rem] font-medium leading-tight tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.2rem]">
              Leadership with full visibility.
            </h3>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-16">
              {[
                { label: "Complete AI usage map", desc: "A structured view of what is in use, where, and by whom across the organization." },
                { label: "Defined accountability", desc: "Ownership assigned to every AI-related process, decision, and data flow." },
                { label: "Known risk exposure", desc: "Identified gaps in governance, data handling, and oversight clearly documented." },
                { label: "Prioritized opportunity roadmap", desc: "Specific direction on where to invest next, ranked by readiness and value." },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#ca3726]/50 pl-5">
                  <p className="text-base font-semibold text-[#222222] sm:text-lg">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#555555] sm:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial — centered block, red background */}
      <section className="relative z-[1] w-full bg-[#ca3726]">
        <div className="flex flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[60vh] sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <svg
            className="mb-6 h-10 w-10 text-white/25 sm:mb-8 sm:h-16 sm:w-16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.2 11 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.2 21 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996z" />
          </svg>
          <blockquote className="max-w-4xl text-lg font-medium leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem] lg:leading-snug">
            We had no idea how much AI was already in use across the organization. The assessment gave us a complete picture: where it was, who was using it, and where we were exposed. We had alignment in three weeks.
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-8 bg-white/25" />
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              COO &nbsp;·&nbsp; mid-size professional services firm
            </p>
            <div className="h-px w-8 bg-white/25" />
          </div>
        </div>
      </section>

      {/* FAQ — collapsible with Plus icon */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-[#f7f7f7] px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What Leaders Ask Us
          </p>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:mt-5 sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            Frequently Asked{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Questions
            </span>
          </h2>
          <ul className="mt-8 flex flex-col gap-3 text-left sm:mt-16 sm:gap-4">
            {ASSESSMENT_FAQ_ITEMS.map((item, index) => {
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

      <CTA />
      <Footer />
    </div>
  );
}

