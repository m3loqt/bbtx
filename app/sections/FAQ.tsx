"use client";

import { useState, type ReactNode } from "react";
import { FAQ_ITEMS } from "@/app/sections/faq-data";

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

type FaqItem = { question: string; answer: string };

export function FAQ({
  items = FAQ_ITEMS,
  eyebrow = "What Leaders Ask Us",
  heading = (
    <>
      Frequently Asked <span className="italic">Questions</span>
    </>
  ),
  closingNote,
}: {
  items?: FaqItem[];
  eyebrow?: string;
  heading?: ReactNode;
  closingNote?: ReactNode;
} = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-[1] w-full border-t border-black/[0.06] bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
          {eyebrow}
        </p>
        <h2 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-[#222222] sm:text-[2.75rem] md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
          {heading}
        </h2>
        <ul className="mt-10 flex flex-col gap-3 text-left sm:mt-12 sm:gap-4">
          {items.map((item, index) => {
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
        {closingNote ? <div className="mt-8 text-center sm:mt-10">{closingNote}</div> : null}
      </div>
    </section>
  );
}
