"use client";

import { useState } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const QUESTIONS = [
  "Where do we even start with AI?",
  "How do we get leadership aligned?",
  "What can we realistically do in 90 days?",
  "Which initiatives actually move the needle?",
  "Are we already falling behind?",
  "How do we build a plan our team can actually execute?",
  "What does success even look like?",
];

// Varied font sizes (rem) so the cloud doesn't read as ascending
const QUESTION_SIZES = [1.5, 0.95, 1.25, 1.6, 1.05, 1.4, 1.1, 1.35];
const QUESTION_OPACITIES = [0.35, 0.28, 0.42, 0.25, 0.38, 0.32, 0.45, 0.3];

const STRATEGY_FAQ_ITEMS = [
  {
    question: "What exactly does this engagement produce?",
    answer:
      "You walk away with four concrete deliverables: a written transformation strategy document, a prioritized AI initiative roadmap, a 90-day action plan, and a phased implementation timeline. Everything your leadership team needs to move forward with confidence.",
  },
  {
    question: "How is this different from a generic AI audit?",
    answer:
      "This is not a checklist or a maturity assessment. It is a strategic engagement focused on your specific organization, your specific goals, and the specific decisions your leadership team needs to make right now.",
  },
  {
    question: "Do we need to already be using AI?",
    answer:
      "No. This engagement is designed to meet you where you are. Whether you're starting from scratch or trying to bring order to initiatives already in motion, the process works either way.",
  },
  {
    question: "Who needs to be involved from our side?",
    answer:
      "Executive leadership. This engagement is designed for the people who own the decisions, not the technical team. We need the right people in the room to build a strategy that will actually be executed.",
  },
  {
    question: "How long does the engagement take?",
    answer:
      "Most engagements are completed within three to six weeks depending on the size and complexity of your organization. We'll give you a clear timeline before anything begins.",
  },
  {
    question: "What if we're not ready to implement right away?",
    answer:
      "The strategy document and roadmap are yours to keep and act on at your own pace. Many clients use the engagement to build internal alignment first and begin implementation when the timing is right.",
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

export default function StrategyRoadmapPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — light top with headline + grid, full-width image bottom half */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col bg-[#f7f7f7] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Transformational Strategy & Implementation Plan
          </p>
          <h1 className="max-w-[88%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            A focused AI transformation strategy{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              your leadership can execute with confidence
            </span>
          </h1>
          <p className="mt-6 max-w-5xl text-xl leading-relaxed tracking-tight text-[#555555] sm:text-2xl">
            We help you find the one question that matters most, then build a strategy with prioritized initiatives, clear ownership, and a 90-day plan your team can execute.
          </p>
        </div>
        <div className="relative z-[1] h-[32vh] w-full overflow-hidden sm:h-[38vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. The noise — scattered questions that leaders face, then clarity cuts through */}
      <section className="relative z-[1] min-h-screen w-full bg-[#222222]">
        <div className="relative z-[1] flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="w-full">
            <p className="mb-16 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 lg:mb-20">
              Sound familiar?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 lg:gap-x-12 lg:gap-y-6">
              {QUESTIONS.map((q, i) => (
                <span
                  key={q}
                  className="block whitespace-nowrap"
                  style={{
                    fontSize: `${QUESTION_SIZES[i % QUESTION_SIZES.length]}rem`,
                    opacity: QUESTION_OPACITIES[i % QUESTION_OPACITIES.length],
                    color: "white",
                  }}
                >
                  {q}
                </span>
              ))}
            </div>
            <div className="my-16 h-px w-full bg-white/20 lg:my-20" />
            <p className="mx-auto max-w-7xl text-[2rem] font-medium leading-[1.08] tracking-tighter text-white sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem]">
              We don't answer all of them at once. We help you find the{" "}
              <span className="text-[#ca3726]">one question</span>{" "}
              that matters most right now and build a strategy from there.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Who this is for — half page, three qualifiers */}
      <section className="relative z-[1] flex min-h-[50vh] w-full flex-col justify-center border-t border-black/[0.06] bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="w-full">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Is This Right For You
          </p>
          <h2 className="mt-5 max-w-6xl text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl">
            This engagement is built for leaders who are{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              serious about moving forward.
            </span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 lg:mt-16 lg:gap-12">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                You know AI matters but don't know where to start
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                Your organization has discussed AI. Maybe you've run a few pilots. But there's no clear strategy, no unified direction, and no one who owns the outcome.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                You've started but lost momentum
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                Initiatives are running in silos. Different teams are doing different things. The energy is there but the alignment isn't and results are hard to point to.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                You're under pressure to show results
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                Your board, your clients, or your competitors are pushing the conversation. You need a credible, executable plan and you need it to hold up in the room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How we work — same structure as Services: left = eyebrow, right = headline + cards */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              How we work
            </p>
            <div className="pr-0 lg:pr-[10%]">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Prioritized initiatives, defined ownership,{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  sequenced rollout.
                </span>
              </h2>
              {/* Cards on the right: 1 full-width, then 2 side by side */}
              <div className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:gap-1.5">
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:col-span-2 sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">01</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl lg:text-3xl">The context</h3>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                    <p>What decision are you trying to make? Who needs to be in the room? We map constraints: budget, timeline, talent, and risk appetite so the transformation strategy is grounded in your reality. We start with what's true, then build a plan your leadership can own.</p>
                    
                  </div>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">02</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">Prioritized initiatives & ownership</h3>
                  <p className="mt-6 text-base leading-relaxed text-[#555555] sm:text-lg">
                    We tie every initiative to revenue, cost, or risk and assign clear ownership. What's worth doing now? What can wait? Your plan has names and accountability, not vague "use cases."
                  </p>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">03</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">Sequence & 90-day plan</h3>
                  <p className="mt-6 text-base leading-relaxed text-[#555555] sm:text-lg">
                    A sequenced rollout with a concrete 90-day action plan and clear success metrics. First this, then that, with dates. Practical direction your teams can execute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Your Deliverables — 1x4 grid, red section with frosted cards */}
      <section className="relative z-[1] w-full bg-[#b03020] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="w-full">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/60">
            Your Deliverables
          </p>
          <h2 className="mt-5 max-w-6xl text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl">
            Everything your leadership team needs to{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              move with confidence.
            </span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            <div className="rounded-2xl border border-white/15 bg-white/[0.12] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
              <span className="text-6xl font-bold leading-none tracking-tighter text-white/30 sm:text-7xl lg:text-8xl">1</span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                Written Transformation Strategy Document
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
                A clear, senior-ready document capturing your AI vision, strategic priorities, organizational readiness, and the rationale behind every recommendation.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.12] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
              <span className="text-6xl font-bold leading-none tracking-tighter text-white/30 sm:text-7xl lg:text-8xl">2</span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                Prioritized AI Initiative Roadmap
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
                A ranked list of AI initiatives tied to business outcomes, with effort, impact, and ownership mapped for each one. No ambiguity about where to start.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.12] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
              <span className="text-6xl font-bold leading-none tracking-tighter text-white/30 sm:text-7xl lg:text-8xl">3</span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                90-Day Action Plan
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
                A concrete, time-bound plan your team can execute immediately. Milestones, owners, and success metrics built in from day one.
              </p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.12] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
              <span className="text-6xl font-bold leading-none tracking-tighter text-white/30 sm:text-7xl lg:text-8xl">4</span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                Implementation Timeline
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-lg">
                A phased rollout timeline that sequences your initiatives in the order that makes the most sense for your organization's capacity, budget, and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonial — centered block, red background */}
      <section className="relative z-[1] w-full bg-[#ca3726]">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <svg
            className="mb-8 h-12 w-12 text-white/25 sm:h-16 sm:w-16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.2 11 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.2 21 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996z" />
          </svg>
          <blockquote className="max-w-4xl text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem] lg:leading-snug">
            We had a dozen AI ideas and no way to prioritize them. We left with a focused transformation strategy, defined ownership, and a 90-day plan our leadership could execute with confidence.
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-8 bg-white/25" />
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              VP of Strategy &nbsp;·&nbsp; global B2B services company
            </p>
            <div className="h-px w-8 bg-white/25" />
          </div>
        </div>
      </section>

      {/* 7. FAQ — collapsible with Plus icon */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col items-center justify-center border-t border-black/[0.06] bg-[#f7f7f7] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What Leaders Ask Us
          </p>
          <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            Frequently Asked{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Questions
            </span>
          </h2>
          <ul className="mt-16 flex flex-col gap-3 text-left sm:mt-20 sm:gap-4">
            {STRATEGY_FAQ_ITEMS.map((item, index) => {
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
