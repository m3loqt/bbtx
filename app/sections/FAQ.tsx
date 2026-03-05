"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const FAQ_ITEMS = [
  {
    question: "Who is BBTx best suited for?",
    answer:
      "We work with small to mid-size organizations, C-suite leaders, and management teams who are serious about integrating AI into how they operate. If you're looking for a quick tool recommendation, we're probably not the right fit. If you're looking to build a real strategy and implement it with confidence, we are.",
  },
  {
    question: "Where do we start if we don't know what we need?",
    answer:
      "That's exactly what the Organizational AI Assessment is for. It gives us a clear picture of where your organization stands today and what the right next steps are. Most engagements begin there.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "It depends on the scope. An assessment can be completed in a matter of weeks. A full strategy and implementation engagement typically runs three to six months. We'll give you a clear timeline before anything begins.",
  },
  {
    question: "Do you work with organizations that have already started AI initiatives?",
    answer:
      "Yes. We work with organizations at all stages — those just getting started and those who have already made investments but aren't seeing the results they expected.",
  },
  {
    question: "What does working with BBTx actually look like?",
    answer:
      "Hands-on and senior-led. You work directly with Grant and Mel throughout the engagement. No junior consultants, no handoffs. Every engagement is built around your specific context, not a generic framework.",
  },
  {
    question: "How do we get started?",
    answer:
      "Start with the assessment. It takes less than five minutes and gives us the context we need to make your first conversation as focused and useful as possible.",
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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-[1] bg-white">
      <div className="w-full px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="w-full">
          <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What Leaders Ask Us
          </p>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-12">
            <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
              Frequently asked{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                questions
              </span>
            </h2>
            <p className="text-lg leading-relaxed text-[#555555] sm:text-xl">
              Quick answers to questions you may have. If you still need clarity, you can always reach out directly.
            </p>
          </div>

          {/* FAQ layout: list on the left, \"more questions\" card on the right */}
          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,0.85fr)] lg:gap-12">
            {/* Left: stacked FAQ entries */}
            <ul className="space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={item.question}>
                    <article className="rounded-xl border border-black/[0.08] bg-white px-5 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:px-6 sm:py-4">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full items-center gap-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <h3 className="flex-1 text-[15px] font-semibold tracking-tight text-[#222222] sm:text-lg">
                          {item.question}
                        </h3>
                        {isOpen ? <FaqMinusIcon /> : <FaqPlusIcon />}
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-[15px]">
                          {item.answer}
                        </p>
                      )}
                    </article>
                  </li>
                );
              })}
            </ul>

            {/* Right: More questions card */}
            <aside className="flex h-[260px] flex-col justify-between rounded-2xl border border-black/[0.12] bg-[#222222] px-6 py-6 shadow-[0_4px_18px_rgba(0,0,0,0.3)] sm:h-[280px] sm:px-7 sm:py-7 lg:h-[300px] lg:px-8 lg:py-8">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Do you have more questions?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  Can&apos;t find the answer you&apos;re looking for? Our team can help you think through your specific
                  situation and what to do next.
                </p>
              </div>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-[14px] font-medium text-[#222222] transition-opacity hover:opacity-95 sm:px-5 sm:py-3"
              >
                Talk to our team
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </button>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
