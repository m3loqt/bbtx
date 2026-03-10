"use client";

import { useState } from "react";

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
    <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
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
        <ul className="mt-10 flex flex-col gap-3 text-left sm:mt-12 sm:gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question}>
                <article className="overflow-hidden rounded-xl border border-black/[0.06] bg-[#f7f7f7] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
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
  );
}
