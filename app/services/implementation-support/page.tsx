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

const FAILURE_PATH = [
  {
    step: "Decision made",
    description: "Leadership agrees on the direction",
  },
  {
    step: "Message sent",
    description: "The organization hears the announcement",
  },
  {
    step: "Meaning varies",
    description: "Managers interpret the change differently",
  },
  {
    step: "Behavior drifts",
    description: "Old habits return when pressure increases",
  },
  {
    step: "Momentum fades",
    description: "The initiative becomes something people remember starting",
  },
];

const HOLDS = [
  {
    name: "Leadership attention",
    description: "The change stays visible after the launch moment passes",
  },
  {
    name: "Manager translation",
    description: "Managers can explain what the change means for daily work",
  },
  {
    name: "Communication rhythm",
    description: "People hear consistent messages often enough for them to stick",
  },
  {
    name: "Accountability",
    description: "Ownership is clear and follow-through is expected",
  },
  {
    name: "Feedback loops",
    description: "Leaders can see where adoption is working and where it is not",
  },
  {
    name: "Adaptation",
    description: "The organization can adjust without abandoning the direction",
  },
];

const SITUATIONS = [
  "Strategic initiatives are losing momentum",
  "Leaders are struggling to sustain change after launch",
  "Employees are receiving mixed messages about priorities",
  "Accountability for implementation is unclear",
  "Major organizational transformation is underway",
  "AI adoption requires new behaviors and workflows",
  "Multiple initiatives are competing for attention",
  "Leaders want stronger follow-through and execution",
];

const RHYTHM = [
  {
    number: "01",
    name: "Clarify",
    description:
      "Define what must actually change, including the decisions, behaviors, expectations, and operating habits required for success",
  },
  {
    number: "02",
    name: "Translate",
    description:
      "Help leaders and managers connect the change to the daily work of the people responsible for carrying it out",
  },
  {
    number: "03",
    name: "Reinforce",
    description:
      "Build the communication, accountability, coaching, and feedback mechanisms that keep the change alive after launch",
  },
  {
    number: "04",
    name: "Adjust",
    description:
      "Respond to resistance, confusion, competing priorities, and emerging conditions without losing the direction",
  },
];

const ENGAGEMENTS = [
  {
    name: "Strategic Initiative Support",
    description:
      "Helping organizations sustain momentum after planning and decision-making efforts",
  },
  {
    name: "Organizational Change Management",
    description:
      "Supporting communication, alignment, adoption, and leadership effectiveness during major transitions",
  },
  {
    name: "AI Adoption & Change Support",
    description:
      "Helping leaders and teams integrate AI-enabled ways of working into daily behavior",
  },
  {
    name: "Leadership Reinforcement",
    description:
      "Supporting managers and leaders as they guide teams through change",
  },
  {
    name: "Transformation Program Support",
    description:
      "Ongoing advisory and facilitation support for complex organizational initiatives",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is this project management",
    answer:
      "No. Project management focuses on tasks and timelines. This work focuses on the organizational conditions required for adoption and execution, including leadership, communication, accountability, and reinforcement",
  },
  {
    question: "Do you work alongside internal teams",
    answer:
      "Yes. Most engagements are designed to strengthen and support existing leadership, HR, PMO, and operational teams, not replace them",
  },
  {
    question: "Can this support AI implementation",
    answer:
      "Yes. AI adoption often requires significant leadership, communication, and behavior change. The technology is rarely the hardest part of making it stick",
  },
  {
    question: "How long does implementation support last",
    answer:
      "It depends on the scope and complexity of the initiative. Some engagements are short-term and focused. Others continue through major transformation efforts where sustained support makes the difference",
  },
  {
    question: "What if our initiative has already stalled",
    answer:
      "That is often when this work becomes most valuable. We help leaders identify what is blocking progress, restore momentum, and build the conditions for more durable execution",
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

export default function ImplementationSupportPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero */}
      <section className="relative z-[1] flex min-h-[calc(100vh-3.5rem)] w-full flex-col bg-[#f7f7f7] pt-14 sm:min-h-screen sm:pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />

        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 pt-6 sm:px-6 sm:pt-0 lg:px-8 lg:pb-12">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Implementation & Change Support
          </p>

          <h1 className="max-w-[96%] text-[2.5rem] font-medium leading-[1.06] tracking-tighter text-[#222222] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            Change doesn&apos;t fail in the boardroom.{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              It fails in the realities of daily work
            </span>
          </h1>

          <p className="mt-5 max-w-5xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-6 sm:text-xl">
            Most organizations know what they need to do. The challenge is turning decisions into
            sustained behavior, consistent execution, and change that survives the pressure of
            daily work
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
              See How Change Support Works
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Wide Image */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
        <div className="h-[34vh] w-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_2px_18px_rgba(0,0,0,0.04)] sm:h-[44vh]">
          <img
            src="/serv5.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* 3. The Failure Path */}
      <section className="relative z-[1] w-full bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />

        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              The Failure Path
            </p>

            <h2 className="mt-8 max-w-5xl text-[2rem] font-medium leading-[1.08] tracking-tighter text-white sm:text-[3rem] lg:text-[4rem]">
              Most change initiatives don&apos;t collapse at once.{" "}
              <span className="text-[#ca3726]">They drift</span>
            </h2>

            <div className="mt-12 border-t border-white/[0.12] lg:mt-16">
              {FAILURE_PATH.map((item, index) => (
                <div
                  key={item.step}
                  className="grid gap-4 border-b border-white/[0.12] py-8 sm:grid-cols-[120px_1fr] sm:gap-8 lg:grid-cols-[140px_0.8fr_1.2fr] lg:items-start lg:py-9"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]/80">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {item.step}
                  </h3>

                  <p className="max-w-2xl text-base leading-relaxed text-white/45 sm:text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Implementation Gap */}
      <section className="relative z-[1] w-full bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            The Implementation Gap
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              Most organizations manage the launch.{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Fewer manage the months after the launch
              </span>
            </h2>

            <div className="mt-8 max-w-4xl space-y-6 text-lg leading-relaxed text-[#555555] sm:text-xl">
              <p>
                Good decisions create potential. Implementation creates results
              </p>

              <p>
                The work begins when a decision meets operational reality, when managers have to
                translate the message, when teams have to change behavior, and when competing
                priorities start pulling attention away
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What Has to Hold */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What Has to Hold
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
            For change to last, the organization has to reinforce{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              what the plan requires
            </span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-px bg-black/[0.06] text-left sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {HOLDS.map((item) => (
              <div key={item.name} className="bg-[#f7f7f7] p-6 sm:p-8 lg:p-9">
                <h3 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#555555]">
                  {item.description}
                </p>
              </div>
            ))}
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
              This work is most valuable when leaders need change{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                to become operational reality
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
      <section id="how-we-work" className="relative z-[1] w-full bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            How We Work
          </p>

          <div>
            <h2 className="max-w-5xl text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[3.2rem]">
              Not project management.{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                An operating rhythm that keeps change alive
              </span>
            </h2>

            <div className="mt-10 border-t border-black/[0.08] lg:mt-14">
              {RHYTHM.map((step) => (
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

      {/* 8. Typical Engagements */}
      <section className="relative z-[1] overflow-hidden bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0" style={darkGridBg} aria-hidden />

        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              Typical Engagements
            </p>

            <h2 className="mx-auto mt-8 max-w-4xl text-3xl font-medium leading-tight tracking-tighter text-white sm:text-4xl lg:text-[3.2rem]">
              Implementation support looks different depending on the initiative
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl">
              Sometimes it follows strategic planning. Sometimes leadership development. Sometimes
              AI transformation. The common challenge is turning intention into execution
            </p>

            <div className="mt-12 border-t border-white/[0.12] text-left lg:mt-16">
              {ENGAGEMENTS.map((eng) => (
                <div
                  key={eng.name}
                  className="grid gap-4 border-b border-white/[0.12] py-8 sm:grid-cols-[0.8fr_1.2fr] sm:gap-10 lg:py-10"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {eng.name}
                  </h3>

                  <p className="text-base leading-relaxed text-white/45 sm:text-lg">
                    {eng.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("openContact"))}
              className="mt-12 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
            >
              Talk to Us About Your Situation
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>
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
              src="/cta.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />

            <div className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40" aria-hidden />

            <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                The hardest part of change is not deciding what to do.{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  It is making the change last
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-tight text-white/95 sm:text-2xl lg:mt-10">
                Plans create possibility. Implementation determines whether the organization
                experiences the benefits
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