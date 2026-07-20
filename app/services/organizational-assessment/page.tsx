"use client";

import { useState } from "react";
import Image from "next/image";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { TESTIMONIALS } from "@/app/sections/Testimonials";
import Link from "next/link";

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
    claim: "Leaders and employees often describe different organizations.",
    insight: "The gap between those perspectives is itself diagnostic.",
  },
  {
    claim: "Culture is usually experienced differently than it is described.",
    insight: "Leadership intent and employee experience are not always the same thing.",
  },
  {
    claim: "Performance problems rarely exist in isolation.",
    insight:
      "What appears to be a communication issue may actually be a leadership, structure, or accountability issue.",
  },
  {
    claim: "Assumptions become invisible when they go untested.",
    insight:
      "Assessment makes those assumptions visible before they become more expensive.",
  },
];

const SITUATIONS = [
  "Performance has plateaued despite capable people.",
  "Communication breakdowns are becoming more common.",
  "Trust between groups or teams is declining.",
  "Employee engagement concerns continue to surface.",
  "Leadership teams are struggling to align around priorities.",
  "Major change initiatives are producing inconsistent results.",
  "AI adoption is creating uncertainty about readiness and capability.",
  "A new executive needs an honest read before making significant decisions.",
];

const STEPS = [
  {
    number: "01",
    name: "Compare Perspectives",
    description:
      "What leaders believe is happening and what employees experience are often not the same thing. We examine those differences directly.",
    full: true,
  },
  {
    number: "02",
    name: "Find the Gaps",
    description:
      "The divergence between perspectives often reveals the organizational risks leaders cannot yet see.",
    full: false,
  },
  {
    number: "03",
    name: "Understand the Conditions",
    description:
      "Performance problems rarely exist in isolation. We identify the conditions creating them.",
    full: false,
  },
  {
    number: "04",
    name: "Decide What Matters Most",
    description:
      "Not everything needs fixing. We help leaders focus on the few issues most affecting performance.",
    full: true,
  },
];

const ENGAGEMENTS = [
  {
    name: "Organizational Health Assessment",
    description: "A broad review of culture, leadership, communication, trust, and performance.",
  },
  {
    name: "Leadership Team Assessment",
    description: "A focused look at alignment, decision-making, accountability, and collective effectiveness.",
  },
  {
    name: "Culture & Trust Assessment",
    description: "An examination of how culture supports or undermines performance.",
  },
  {
    name: "AI Readiness Assessment",
    description: "A practical review of leadership capability, workforce readiness, governance, and preparedness for AI adoption.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is this just a survey?",
    answer:
      "No. Surveys may be part of the process, but the value is in the interpretation. We look across interviews, survey data, documents, conversations, and organizational patterns to understand what is actually happening.",
  },
  {
    question: "Will employees remain confidential?",
    answer:
      "Yes. Individual responses are protected. Findings are reported in aggregate so people can participate honestly.",
  },
  {
    question: "What happens after the assessment?",
    answer:
      "Some organizations implement the recommendations internally. Others continue with support through strategy, leadership development, AI integration, or change initiatives. The assessment is designed to produce clarity either way.",
  },
  {
    question: "Can assessments focus on a specific issue?",
    answer:
      "Yes. Some assessments examine the whole organization. Others focus on leadership, culture, communication, trust, change readiness, or AI readiness.",
  },
  {
    question: "What does this cost?",
    answer:
      "Every engagement is scoped to your organization's size and needs — there's no generic package price. We'll give you clear, specific numbers before anything begins.",
  },
];

const testimonial = TESTIMONIALS.find((t) => t.author === "Jerry Hogan")!;

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

function openContact(inquiry: string) {
  window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry } }));
}

export default function OrganizationalAssessmentPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const INQUIRY = "Organizational Assessment & Analysis";

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero + image, one section */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-10">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Organizational Assessment & Analysis
          </p>

          <h1 className="text-[2.5rem] font-medium leading-[1.06] tracking-tight text-[#222222] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            Most organizations are operating on assumptions{" "}
            <span className="italic">that haven't been tested in years.</span>
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-relaxed tracking-normal text-[#555555] sm:mt-6 sm:text-xl">
            We help leaders see what is actually happening beneath performance metrics,
            assumptions, and anecdotes — so they can make decisions based on reality.
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
              Learn How Assessments Work
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
        </div>

        <div className="relative z-[1] px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-10">
          <div className="relative h-[50vh] w-full overflow-hidden rounded-2xl sm:h-[60vh]">
            <Image src="/serv1.png" alt="" fill sizes="100vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* 2. The Reality We See — signature device */}
      <section className="relative z-[1] w-full bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              The Reality We See
            </p>

            <h2 className="mt-6 max-w-4xl text-[2rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[3rem] lg:text-[4rem]">
              What leaders see are <span className="text-[#ca3726]">symptoms</span>. What matters are the conditions creating them.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/50 sm:text-xl">
              Most performance problems aren't caused by a lack of effort or intelligence — they're caused by leaders making decisions from incomplete pictures of reality.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:mt-14">
              {OBSERVATIONS.map((obs) => (
                <div key={obs.claim} className="bg-[#222222] p-6 sm:p-8 lg:p-10">
                  <p className="text-xl font-medium leading-snug tracking-normal text-white sm:text-2xl">
                    {obs.claim}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-white/45 sm:text-lg">
                    {obs.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Who This Is For */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Who This Is For
          </p>

          <div>
            <h2 className="max-w-4xl text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:text-4xl lg:text-[2.8rem]">
              This work is most valuable when leaders know something isn't working{" "}
              <span className="italic">but don't yet have a clear picture of why.</span>
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

      {/* 4. How We Work */}
      <section id="how-we-work" className="relative z-[1] w-full bg-white">
        <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              How We Work
            </p>

            <div className="pr-0 lg:pr-[10%]">
              <h2 className="max-w-4xl text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:text-4xl lg:text-[2.8rem]">
                Not a framework applied to your situation.{" "}
                <span className="italic">Your situation examined without a predetermined answer.</span>
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:gap-1.5">
                {STEPS.map((step) => (
                  <div
                    key={step.number}
                    className={`rounded-2xl border border-black/[0.06] bg-[#f7f7f7] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-9 lg:p-10 ${
                      step.full ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span className="text-[3rem] font-bold leading-none tracking-tight text-[#222222]/10 sm:text-[4.5rem]">
                      {step.number}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold tracking-normal text-[#222222] sm:text-2xl">
                      {step.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-lg">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Proof & Engagements, combined */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                Why Leaders Trust This
              </p>
              <blockquote className="mt-5 text-xl font-medium leading-snug tracking-normal text-[#222222] sm:text-2xl">
                <span
                  className="mr-1 text-[#ca3726]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                {testimonial.quote}
                <span
                  className="ml-1 text-[#ca3726]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  aria-hidden
                >
                  &rdquo;
                </span>
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                {testimonial.image && (
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={testimonial.image} alt="" fill sizes="44px" className="object-cover" />
                  </div>
                )}
                <p className="font-semibold text-[#222222]">{testimonial.author}</p>
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
                    <p className="mt-1 text-sm leading-relaxed text-[#555555] sm:text-[15px]">
                      {eng.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
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
                  <article className="overflow-hidden rounded-xl border border-black/[0.06] bg-[#f7f7f7] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
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

      {/* 7. CTA */}
      <section className="relative z-[1] bg-[#f7f7f7]">
        <div className="relative z-[1] w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.25)] sm:rounded-2xl">
            <Image src="/cta.png" alt="" fill sizes="100vw" className="object-cover" aria-hidden />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40" aria-hidden />

            <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
              <h2 className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-[2.75rem] md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Better decisions start with{" "}
                <span className="italic">a clearer picture of reality.</span>
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-normal text-white/95 sm:text-2xl lg:mt-10">
                The most expensive organizational problems are often the ones leaders cannot yet see.
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
                  Try the Free Digital Twin Snapshot
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
