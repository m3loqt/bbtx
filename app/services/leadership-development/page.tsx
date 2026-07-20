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

const SYSTEM_ELEMENTS = [
  "Individual judgment",
  "Team dynamics",
  "Management expectations",
  "Organizational trust",
  "Conditions for execution",
];

const SITUATIONS = [
  "Newly promoted leaders are struggling to adapt",
  "Leadership teams are experiencing conflict or misalignment",
  "Managers need stronger coaching, communication, and decision-making skills",
  "High performers are being prepared for larger responsibilities",
  "Trust between leaders, teams, or departments is weakening",
  "Organizational growth has outpaced leadership capability",
  "AI and organizational change are increasing leadership complexity",
];

const STEPS = [
  {
    number: "01",
    name: "Understand the Context",
    description: "Leadership challenges rarely exist in isolation. We begin by understanding the pressures, structures, and team dynamics shaping how leadership actually works here",
  },
  {
    number: "02",
    name: "Assess Capability and Dynamics",
    description: "We identify strengths, development opportunities, team patterns, and organizational conditions influencing leadership performance",
  },
  {
    number: "03",
    name: "Develop Leaders and Teams",
    description: "Through coaching, assessment feedback, facilitation, and applied development support, we build capability around the real challenges leaders face",
  },
  {
    number: "04",
    name: "Reinforce the Leadership System",
    description: "The goal isn't individual improvement alone. The goal is a stronger leadership system that develops capability over time",
  },
];

const ENGAGEMENTS = [
  {
    name: "Executive Coaching",
    description: "Supporting leaders navigating growth, complexity, transition, or organizational change",
  },
  {
    name: "Leadership Team Development",
    description: "Improving alignment, trust, accountability, communication, and collective performance",
  },
  {
    name: "Management Development",
    description: "Building leadership capability among supervisors, managers, and emerging leaders",
  },
  {
    name: "Leadership for the AI Era",
    description: "Preparing leaders to guide experimentation, manage risk, and lead effectively in AI-enabled organizations",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is this executive coaching",
    answer: "Sometimes. Executive coaching is one tool within a broader leadership development approach. Many engagements combine individual coaching with team development and organizational work",
  },
  {
    question: "Do you work with leadership teams or individual leaders",
    answer: "Both. Many engagements involve a combination of individual coaching and team development, depending on where the leadership challenge actually lives",
  },
  {
    question: "How is this different from traditional leadership training",
    answer: "Traditional training often focuses on individuals in isolation. We focus on individuals, teams, and the organizational conditions affecting leadership performance",
  },
  {
    question: "Do you address AI leadership challenges",
    answer: "Yes. Many organizations need leaders who can navigate both human and technological change at the same time",
  },
  {
    question: "What does this cost",
    answer: "Every engagement is scoped to your organization's size and needs — there's no generic package price. We'll give you clear, specific numbers before anything begins.",
  },
];

const testimonial = TESTIMONIALS.find((t) => t.author === "Martin Chapman")!;

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

export default function LeadershipDevelopmentPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const INQUIRY = "Leadership, Management & Team Development";

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero + image */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-10">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Leadership & Team Development
          </p>
          <h1 className="max-w-[96%] text-[2.5rem] font-medium leading-[1.06] tracking-tight text-[#222222] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            Leadership development fails when individuals improve{" "}
            <span className="italic">but the system around them does not</span>
          </h1>
          <p className="mt-5 max-w-5xl text-base leading-relaxed tracking-normal text-[#555555] sm:mt-6 sm:text-xl">
            Most organizations develop leaders one person at a time. But leadership performance is
            shaped by teams, expectations, trust, culture, and the conditions leaders operate inside
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
              See How Leadership Development Works
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
        </div>
        <div className="relative z-[1] px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-10">
          <div className="h-[50vh] w-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_2px_18px_rgba(0,0,0,0.04)] sm:h-[60vh]">
            <img src="/serv3.png" alt="" className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </section>

      {/* 2. The Leadership System — signature device */}
      <section className="relative z-[1] w-full bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              The Leadership System
            </p>
            <h2 className="mt-6 max-w-5xl text-[2rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[3rem] lg:text-[4rem]">
              Most leadership problems are not <span className="text-[#ca3726]">talent problems</span>
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/50 sm:text-xl">
              Better leaders alone rarely produce organizational change. Development creates lasting
              impact when it improves both individual capability and the conditions leaders operate within.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-px bg-white/[0.08] sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
              {SYSTEM_ELEMENTS.map((element) => (
                <div key={element} className="bg-[#222222] p-6 sm:p-7">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]/70">
                    Element
                  </p>
                  <p className="mt-4 text-xl font-medium leading-snug tracking-normal text-white lg:text-2xl">
                    {element}
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
              This work is most valuable when leadership capability{" "}
              <span className="italic">has become a limiting factor</span>
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
                Not leadership training for its own sake.{" "}
                <span className="italic">Capability development connected to real challenges</span>
              </h2>
              <div className="mt-10 border-t border-black/[0.08] lg:mt-14">
                {STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="grid gap-4 border-b border-black/[0.08] py-8 sm:grid-cols-[90px_1fr] sm:gap-8 lg:grid-cols-[120px_1fr] lg:py-10"
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
      <section className="relative z-[1] bg-white">
        <div className="relative z-[1] w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.25)] sm:rounded-2xl">
            <img src="/cta.png" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40" aria-hidden />
            <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
              <h2 className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-[2.75rem] md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Stronger organizations require <span className="italic">stronger leadership systems</span>
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-normal text-white/95 sm:text-2xl lg:mt-10">
                The most important leadership challenge is rarely a single individual. It is whether the organization is developing the capability needed for what comes next.
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
                  href="/coaching"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  Explore 1:1 Coaching With Grant
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
