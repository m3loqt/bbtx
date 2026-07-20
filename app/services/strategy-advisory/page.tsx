"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { TESTIMONIALS } from "@/app/sections/Testimonials";

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
    description: "We examine the beliefs, constraints, risks, and operating realities shaping current decisions",
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
    description: "Clarifying direction, priorities, tradeoffs, capabilities, and measures of progress",
  },
  {
    name: "Executive Strategic Advisory",
    description: "Ongoing support for leaders facing complex decisions, growth challenges, or major change",
  },
  {
    name: "Leadership Retreats & Strategic Conversations",
    description: "Facilitated sessions that help leaders step back, align around priorities, and make collective decisions",
  },
  {
    name: "AI-Enabled Strategic Planning",
    description: "Using AI to support research, scenario development, and option generation while preserving human judgment",
  },
];

const FAQ_ITEMS = [
  {
    question: "How is this different from traditional strategic planning",
    answer: "Traditional planning often produces a document. This work focuses on the decisions, alignment, and discipline required to make strategy actionable",
  },
  {
    question: "Do you use AI in the strategy process",
    answer: "When useful, yes. AI can support research, scenario planning, assumption testing, and option generation. It does not replace leadership judgment",
  },
  {
    question: "What if we already have a strategic plan",
    answer: "That can be a useful starting point. We often help leaders determine whether the stated strategy is actually guiding decisions and execution",
  },
  {
    question: "Can this become ongoing advisory support",
    answer: "Yes. Some clients begin with a defined planning engagement and continue with strategic advisory support over time",
  },
  {
    question: "What does this cost",
    answer: "Every engagement is scoped to your organization's size and needs — there's no generic package price. We'll give you clear, specific numbers before anything begins.",
  },
];

const testimonial = TESTIMONIALS.find((t) => t.author === "Chris Kean")!;

function FaqMinusIcon({ className }: { className?: string }) {
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#222222] text-white sm:h-9 sm:w-9 ${className ?? ""}`} aria-hidden>
      <span className="block h-[2px] w-2.5 rounded-full bg-white" />
    </span>
  );
}

function FaqPlusIcon({ className }: { className?: string }) {
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#ca3726] text-white sm:h-9 sm:w-9 ${className ?? ""}`} aria-hidden>
      <span className="relative block h-[2px] w-2.5 rounded-full bg-white before:absolute before:left-1/2 before:top-1/2 before:h-2.5 before:w-[2px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white" />
    </span>
  );
}

function openContact(inquiry: string) {
  window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry } }));
}

export default function StrategyAdvisoryPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const INQUIRY = "Strategy & Advisory Services";

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero + image */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-10">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Strategy & Advisory Services
          </p>
          <h1 className="max-w-[96%] text-[2.5rem] font-medium leading-[1.06] tracking-tight text-[#222222] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            Most organizations don't have a strategy problem.{" "}
            <span className="italic">They have a decision-making problem</span>
          </h1>
          <p className="mt-5 max-w-5xl text-base leading-relaxed tracking-normal text-[#555555] sm:mt-6 sm:text-xl">
            Strategy only matters when it changes decisions. We help leaders create the clarity,
            alignment, and discipline required to turn priorities into action
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => openContact(INQUIRY)}
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
        <div className="relative z-[1] px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-10">
          <div className="relative h-[50vh] w-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_2px_18px_rgba(0,0,0,0.04)] sm:h-[60vh]">
            <Image src="/serv2.png" alt="" fill sizes="100vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* 2. Strategic Questions — signature device */}
      <section className="relative z-[1] w-full bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              Strategic Questions
            </p>
            <h2 className="mt-6 max-w-5xl text-[2rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[3rem] lg:text-[4rem]">
              Strategy becomes useful when it changes the questions leaders are willing to answer
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/50 sm:text-xl">
              The stated strategy and the operating strategy are often two different things. A better plan is not always the answer — the harder work is deciding what matters most.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:mt-14">
              {STRATEGIC_QUESTIONS.map((question, index) => (
                <div
                  key={question}
                  className={`bg-[#222222] p-6 sm:p-8 lg:p-10 ${index === 0 || index === 7 ? "sm:col-span-2" : ""}`}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]/70">
                    Question {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-xl font-medium leading-snug tracking-normal text-white sm:text-2xl lg:text-3xl">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Who This Is For */}
      <section className="relative z-[1] w-full bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Who This Is For
          </p>
          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              This work is most valuable when leaders need clearer direction{" "}
              <span className="italic">and stronger alignment</span>
            </h2>
            <div className="mt-8 space-y-0 border-l-2 border-black/[0.08] pl-6">
              {SITUATIONS.map((item) => (
                <p key={item} className="border-b border-black/[0.06] py-4 text-[15px] leading-relaxed text-[#555555] last:border-b-0 sm:text-base lg:text-[17px]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Work */}
      <section id="how-we-work" className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              How We Work
            </p>
            <div>
              <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:text-4xl lg:text-[3.2rem]">
                Not planning for the sake of planning.{" "}
                <span className="italic">Decision work that changes what leaders do next</span>
              </h2>
              <div className="mt-10 space-y-3 lg:mt-14">
                {STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="grid gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:grid-cols-[90px_1fr] sm:gap-8 sm:p-8 lg:p-10"
                  >
                    <span className="text-[2.75rem] font-bold leading-none tracking-tight text-[#222222]/10 sm:text-[4rem]">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-normal text-[#222222] sm:text-2xl">
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

      {/* 5. Proof & Engagements, combined */}
      <section className="relative z-[1] w-full bg-white">
        <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                Why Leaders Trust This
              </p>
              <blockquote className="mt-5 text-xl font-medium leading-snug tracking-normal text-[#222222] sm:text-2xl">
                <span className="mr-1 text-[#ca3726]" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }} aria-hidden>
                  &ldquo;
                </span>
                {testimonial.quote}
                <span className="ml-1 text-[#ca3726]" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }} aria-hidden>
                  &rdquo;
                </span>
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                {testimonial.image && (
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={testimonial.image} alt="" fill sizes="44px" className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[#222222]">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                Typical Engagements
              </p>
              <div className="mt-5 divide-y divide-black/[0.08] border-t border-black/[0.08]">
                {ENGAGEMENTS.map((eng) => (
                  <div key={eng.name} className="py-4">
                    <p className="text-base font-semibold text-[#222222] sm:text-lg">{eng.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#555555] sm:text-[15px]">{eng.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What Leaders Ask Us
          </p>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:mt-5 sm:text-4xl lg:text-[2.8rem]">
            Frequently Asked <span className="italic">Questions</span>
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
                      <h3 className="flex-1 text-lg font-semibold tracking-normal text-[#222222] sm:text-xl">
                        {item.question}
                      </h3>
                      {isOpen ? <FaqMinusIcon /> : <FaqPlusIcon />}
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
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

      {/* 7. CTA */}
      <section className="relative z-[1] bg-[#f7f7f7]">
        <div className="relative z-[1] w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.25)] sm:rounded-2xl">
            <Image src="/service.png" alt="" fill sizes="100vw" className="object-cover" aria-hidden />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40" aria-hidden />
            <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
              <h2 className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-[2.75rem] md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Better strategy starts with <span className="italic">better decisions</span>
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-normal text-white/95 sm:text-2xl lg:mt-10">
                If your plan is clear but execution keeps drifting, the issue may not be the strategy. It may be the decisions and discipline underneath it.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3 lg:mt-14">
                <button
                  type="button"
                  onClick={() => openContact(INQUIRY)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95"
                >
                  Start a Conversation
                  <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </button>
                <Link
                  href="/digital-twin-snapshot"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  Not Sure Yet? Try the Digital Twin Snapshot
                  <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
