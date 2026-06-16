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

const OBSERVATIONS = [
  {
    number: "01",
    claim: "Leaders agree on words before they agree on tradeoffs",
    insight: "Alignment that avoids difficult choices usually breaks during execution",
  },
  {
    number: "02",
    claim: "Priorities multiply faster than capacity",
    insight: "When everything matters, the organization learns that nothing truly does",
  },
  {
    number: "03",
    claim: "Decisions get reopened after they were supposedly settled",
    insight: "This is where strategy loses credibility inside the organization",
  },
  {
    number: "04",
    claim: "Plans often describe ambition better than behavior",
    insight: "A strategy only matters when it changes decisions, investments, and accountability",
  },
];

const STRATEGIC_QUESTIONS = [
  "What should we prioritize now",
  "What should we stop doing",
  "Where are we overcommitted",
  "What assumptions are driving our decisions",
  "Are we solving the right problem",
  "What decisions keep getting reopened",
  "How should AI influence our strategy",
  "What must change for the plan to matter",
];

const SITUATIONS = [
  "The leadership team agrees broadly but struggles to make hard tradeoffs",
  "Strategic priorities are clear on paper but inconsistent in execution",
  "Growth has created complexity the current strategy no longer handles well",
  "A board, owner, or executive team needs an outside perspective",
  "Leaders are facing major decisions around AI, growth, restructuring, succession, or change",
  "The organization has too many initiatives competing for the same attention",
  "Previous planning efforts produced documents but not sustained action",
];

const STEPS = [
  {
    number: "01",
    name: "Clarify the Real Question",
    description:
      "We help leaders identify the strategic question that matters most now, not every issue competing for attention. The right question changes what gets examined and what gets decided",
    full: true,
  },
  {
    number: "02",
    name: "Test Assumptions",
    description:
      "We examine the beliefs, constraints, risks, and operating realities shaping current decisions",
    full: false,
  },
  {
    number: "03",
    name: "Align on Tradeoffs",
    description:
      "Strategy requires choices. We help leadership teams clarify what they will prioritize, what they will stop doing, and what they will protect",
    full: false,
  },
  {
    number: "04",
    name: "Turn Direction Into Discipline",
    description:
      "We translate strategic direction into decisions, ownership, accountability, and practical next steps that hold after the session ends",
    full: true,
  },
];

const ENGAGEMENTS = [
  {
    name: "Strategy Analysis & Development",
    description:
      "Clarifying direction, priorities, tradeoffs, capabilities, and measures of progress",
  },
  {
    name: "Executive Strategic Advisory",
    description:
      "Ongoing support for leaders facing complex decisions, growth challenges, organizational tensions, or major change",
  },
  {
    name: "Leadership Retreats & Strategic Conversations",
    description:
      "Facilitated sessions that help leaders step back, align around priorities, and make decisions requiring collective judgment",
  },
  {
    name: "AI-Enabled Strategic Planning",
    description:
      "Using AI to support research, scenario development, assumption testing, risk analysis, and strategic option generation while preserving human judgment",
  },
];

const FAQ_ITEMS = [
  {
    question: "How is this different from traditional strategic planning",
    answer:
      "Traditional planning often produces a document. This work focuses on the decisions, alignment, and discipline required to make strategy actionable",
  },
  {
    question: "Can this be done with our board or executive team",
    answer:
      "Yes. Many engagements involve boards, owners, executives, or senior leadership teams",
  },
  {
    question: "Do you use AI in the strategy process",
    answer:
      "When useful, yes. AI can support research, scenario planning, assumption testing, and option generation. It does not replace leadership judgment",
  },
  {
    question: "What if we already have a strategic plan",
    answer:
      "That can be a useful starting point. We often help leaders determine whether the stated strategy is actually guiding decisions and execution",
  },
  {
    question: "Can this become ongoing advisory support",
    answer:
      "Yes. Some clients begin with a defined planning engagement and continue with strategic advisory support over time",
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

export default function StrategyAdvisoryPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />

        <div className="relative z-[1] px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-12">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Strategy & Advisory Services
          </p>

          <h1 className="max-w-[96%] text-[2.5rem] font-medium leading-[1.06] tracking-tighter text-[#222222] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            Most organizations don't have a strategy problem.{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              They have a decision-making problem
            </span>
          </h1>

          <p className="mt-5 max-w-5xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-6 sm:text-xl">
            Strategy only matters when it changes decisions. We help leaders create the clarity,
            alignment, and discipline required to turn priorities into action
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("openContact"))}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#222222] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>

            <a
              href="#how-we-work"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-black/[0.1] px-5 py-3 text-[15px] font-medium text-[#555555] transition-colors hover:border-black/[0.2] hover:text-[#222222]"
            >
              See How Advisory Works
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Wide Image */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
        <div className="h-[58vh] w-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_2px_18px_rgba(0,0,0,0.04)] sm:h-[75vh]">
          <img src="/serv2.png" alt="" className="h-full w-full object-cover object-top" />
        </div>
      </section>

      {/* 3. Reality We See */}
      <section className="relative z-[1] w-full bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />

        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              The Reality We See
            </p>

            <h2 className="mt-8 max-w-5xl text-[2rem] font-medium leading-[1.08] tracking-tighter text-white sm:text-[3rem] lg:text-[4rem]">
              The stated strategy and the operating strategy are often{" "}
              <span className="text-[#ca3726]">two different things</span>
            </h2>

            <div className="mt-12 border-t border-white/[0.1] lg:mt-16">
              {OBSERVATIONS.map((obs) => (
                <div
                  key={obs.number}
                  className="grid gap-4 border-b border-white/[0.1] py-8 sm:grid-cols-[120px_1fr] sm:gap-8 lg:py-10"
                >
                  <p className="text-sm font-semibold tracking-[0.22em] text-white/30">
                    {obs.number}
                  </p>

                  <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
                    <p className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">
                      {obs.claim}
                    </p>
                    <p className="max-w-2xl text-base leading-relaxed text-white/45 sm:text-lg">
                      {obs.insight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. What We've Learned */}
      <section className="relative z-[1] w-full bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What We've Learned
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              A better plan is not always the answer
            </h2>

            <div className="mt-8 max-w-4xl space-y-6 text-lg leading-relaxed text-[#555555] sm:text-xl">
              <p>
                Many organizations already know much of what they need to do. The harder work is
                deciding what matters most, what must stop, and which decisions leaders are willing
                to make differently
              </p>

              <p>
                Strategy work becomes useful when it changes the way leaders choose, prioritize,
                allocate attention, and hold the organization to a direction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Strategic Questions */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Strategic Questions
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              Strategy becomes useful when it changes the questions leaders are willing to answer
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-px bg-black/[0.06] sm:grid-cols-2 lg:mt-14">
              {STRATEGIC_QUESTIONS.map((question, index) => (
                <div
                  key={question}
                  className={`bg-[#f7f7f7] p-6 sm:p-8 lg:p-10 ${
                    index === 0 || index === 7 ? "sm:col-span-2" : ""
                  }`}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]/70">
                    Question {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-[#222222] sm:text-2xl lg:text-3xl">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Who This Is For */}
      <section className="relative z-[1] w-full bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Who This Is For
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              This work is most valuable when leaders need clearer direction{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                and stronger alignment
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

      {/* 7. How We Work */}
      <section id="how-we-work" className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              How We Work
            </p>

            <div>
              <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
                Not planning for the sake of planning.{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Decision work that changes what leaders do next
                </span>
              </h2>

              <div className="mt-10 space-y-3 lg:mt-14">
                {STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="grid gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:grid-cols-[90px_1fr] sm:gap-8 sm:p-8 lg:p-10"
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
        </div>
      </section>

      {/* 8. Typical Engagements */}
      <section className="relative z-[1] overflow-hidden bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />

        <div className="relative z-[1] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              Typical Engagements
            </p>

            <div>
              <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-white sm:text-4xl lg:text-[3.2rem]">
                Strategic advisory work takes different shapes depending on the decision in front
                of the organization
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/50 sm:text-xl">
                Sometimes the work is a planning process. Sometimes it is a leadership retreat.
                Sometimes it is ongoing advisory support for an executive, owner, board, or senior
                team
              </p>

              <div className="mt-10 grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:mt-14">
                {ENGAGEMENTS.map((eng) => (
                  <div key={eng.name} className="bg-[#222222] p-6 sm:p-8 lg:p-10">
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

      {/* 9. FAQ */}
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

      {/* 10. CTA */}
      <section className="relative z-[1] bg-[#f7f7f7]">
        <div className="relative z-[1] w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.25)] sm:rounded-2xl">
            <img
              src="/servicce.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />

            <div className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40" aria-hidden />

            <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Better strategy starts with{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  better decisions
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-tight text-white/95 sm:text-2xl lg:mt-10">
                If your plan is clear but execution keeps drifting, the issue may not be the
                strategy itself. It may be the decisions, tradeoffs, and leadership discipline
                underneath it
              </p>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("openContact"))}
                className="mt-12 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95 lg:mt-14"
              >
                Start a Conversation
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