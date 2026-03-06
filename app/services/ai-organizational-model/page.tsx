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

const MODEL_FAQ_ITEMS = [
  {
    question: "What exactly is the organizational model?",
    answer:
      "A dynamic digital representation of your organization — structure, workflows, decision flows, and how they connect. Leadership can explore it, interrogate it, and use it to see how the whole system behaves before making decisions.",
  },
  {
    question: "How is the model built?",
    answer:
      "We start with discovery: mapping your organization as it actually exists. We then analyze structure, workflows, and collaboration patterns, and build the model so it reflects reality. Finally we walk your leadership through it so they can use it.",
  },
  {
    question: "How long does it take?",
    answer:
      "It depends on the size and complexity of your organization. We'll give you a clear timeline during the initial discovery phase before any build work begins.",
  },
  {
    question: "Do we need the assessment or strategy first?",
    answer:
      "Not necessarily. The model can stand alone as a visibility tool, or it can follow an assessment or strategy engagement when you want leadership to explore and act on what you've already uncovered.",
  },
  {
    question: "Who from our team needs to be involved?",
    answer:
      "Leadership and key stakeholders who own structure, operations, or strategic decisions. We need candid input on how work and decisions actually flow, not just the formal org chart.",
  },
  {
    question: "How do we use the model after it's built?",
    answer:
      "Your leadership team can reference it whenever they're making structural, operational, or strategic decisions. Use it to test how changes propagate, surface friction, and ground decisions in how the organization actually operates.",
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

export default function AIOrganizationalModelPage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col bg-[#f7f7f7] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            AI Organizational Model
          </p>
          <h1 className="max-w-[88%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            A living model of your organization. So every decision your leadership makes is{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              grounded in reality.
            </span>
          </h1>
          <p className="mt-6 max-w-5xl text-xl leading-relaxed tracking-tight text-[#555555] sm:text-2xl">
            A dynamic digital model of your organization built in days, maintained over time, and designed to make every leadership decision more informed.
          </p>
        </div>
        <div className="relative z-[1] h-[32vh] w-full overflow-hidden sm:h-[38vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. What the Model Represents — centered editorial, 3 numbered blocks in a row */}
      <section className="relative z-[1] w-full bg-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-36">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What the Model Represents
          </p>
          <h2 className="mt-5 max-w-6xl text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
            A structured representation of how your organization actually operates.
          </h2>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed tracking-tight text-[#555555] sm:text-2xl">
            An AI organizational model creates a structured view of the organization so leadership can examine how it
            truly operates.
          </p>

          <div className="mt-20 w-full max-w-[90rem]">
            <div className="rounded-2xl bg-[#f7f7f7] p-8 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-10 text-left sm:grid-cols-3 sm:gap-12">
                {[
                  { num: "01", title: "Organizational Structure", body: "Who sits where, who reports to whom, and how your teams are actually organized beyond what the org chart shows. A clear map of the human architecture of your organization." },
                  { num: "02", title: "Workflow Movement", body: "How work moves across your organization. Where it flows efficiently, where it gets stuck, and where handoffs between teams and functions create friction or delay." },
                  { num: "03", title: "Decision Flow & Collaboration", body: "How decisions get made throughout your organization, where collaboration is working, and where misalignment is quietly costing you time and performance." },
                ].map((block) => (
                  <div key={block.num} className="flex flex-col gap-5 pr-2">
                    <span
                      className="text-[3.5rem] font-bold leading-none tracking-tighter text-[#222222]/[0.06] sm:text-[4.5rem]"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                    >
                      {block.num}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                      {block.title}
                    </h3>
                    <p className="text-base leading-relaxed text-[#555555] sm:text-lg">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What the Model Represents — left eyebrow, right headline + cards */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              What the Model Represents
            </p>
            <div className="pr-0 lg:pr-[10%]">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                A structured representation of how your organization actually operates.
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:gap-1.5">
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:col-span-2 sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">01</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl lg:text-3xl">
                    Organizational Structure
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#555555] sm:text-lg">
                    A clear map of who sits where, who reports to whom, and how your teams are really wired beyond the formal org chart. The human architecture of your organization in one place so leadership can see how structure shapes day-to-day work and where gaps create friction.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">02</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                    Workflow Movement
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#555555] sm:text-lg">
                    How work moves across your organization. Where it flows efficiently, where it gets stuck, and where handoffs between teams and functions create friction or delay.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">03</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                    Decision Flow & Collaboration
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#555555] sm:text-lg">
                    How decisions get made throughout your organization, where collaboration is working, and where misalignment is quietly costing you time and performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How We Build It — dark theme, frosted cards, arrow line */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#222222]">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={gridBg}
          aria-hidden
        />
        <div className="relative z-[1] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
            How We Build It
          </p>
          <h2 className="w-full text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            Building the{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              organizational model.
            </span>
          </h2>

          <div className="relative mt-14 lg:mt-20">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 items-center lg:flex">
              <div className="mx-10 flex flex-1 items-center">
                <div className="h-px flex-1 bg-white/25" />
                <svg
                  className="h-3 w-3 shrink-0 text-white/25"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M1 6h9M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="relative z-[1] grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {[
                {
                  num: "01",
                  title: "Organizational Discovery",
                  body: "We start by mapping your organization as it actually exists today — structure, teams, reporting lines, and current workflows across departments and functions.",
                },
                {
                  num: "02",
                  title: "Structural Mapping",
                  body: "We analyze how your processes, workflows, and organizational structure interact, identifying connections, gaps, and areas where friction is concentrated.",
                },
                {
                  num: "03",
                  title: "Model Construction",
                  body: "We build your dynamic digital model — a living representation of your organization that your leadership team can reference, interrogate, and act on.",
                },
                {
                  num: "04",
                  title: "Leadership Exploration",
                  body: "We walk your leadership team through the model, highlighting strategic opportunities, organizational risks, and decisions that become clearer when you can see the whole system at once.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-6 sm:p-8"
                >
                  <span
                    className="block text-[5rem] font-bold leading-none tracking-tighter sm:text-[6rem]"
                    style={{
                      background: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {step.num}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-[17px]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Before and After Visibility — full-screen split */}
      <section className="relative z-[1] min-h-screen w-full">
        <div className="flex min-h-screen flex-col lg:flex-row">
          {/* Before */}
          <div className="relative flex flex-col justify-center bg-[#f0f0f0] px-6 py-20 sm:px-10 lg:basis-[32%] lg:min-h-screen lg:px-12 lg:py-32">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-50" style={gridBg} aria-hidden />
            <div className="relative z-[1]">
              <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">Before</p>
              <h3 className="text-[1.8rem] font-medium leading-tight tracking-tighter text-[#222222]/35 sm:text-[2.2rem]">
                Fragmented views.
              </h3>
              <div className="mt-10 space-y-6">
                {[
                  { label: "Departments seen individually", desc: "Leadership views each unit in isolation, with no map of how they connect." },
                  { label: "Interactions between teams unclear", desc: "Workflow dependencies and handoffs remain invisible to leadership." },
                  { label: "Strategic planning on partial information", desc: "Decisions rely on reports that show outputs, not system behavior." },
                  { label: "Complexity limits clarity", desc: "As the organization grows, understanding how it operates becomes harder." },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-[#222222]/15 pl-4">
                    <p className="text-sm font-semibold text-[#222222]/40">{item.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#555555]/55">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* After */}
          <div className="flex flex-col justify-center bg-white px-6 py-20 sm:px-10 lg:basis-[68%] lg:min-h-screen lg:px-20 lg:py-32 xl:px-28">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#ca3726]">After</p>
            <h3 className="text-[2.2rem] font-medium leading-tight tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.2rem]">
              Systemic{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                understanding.
              </span>
            </h3>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed tracking-tight text-[#555555] sm:text-2xl">
              The organizational model gives leadership a connected, explorable view of how the entire system behaves.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-16">
              {[
                { label: "A connected system view", desc: "Leadership sees the organization as a whole, with teams, workflows, and decisions mapped together." },
                { label: "Workflow relationships visible", desc: "How work moves across departments becomes explicit and explorable." },
                { label: "More structured strategic exploration", desc: "Leaders can model how changes may propagate before committing to direction." },
                { label: "Collaboration patterns and gaps identified", desc: "Where coordination works well and where friction appears becomes clear." },
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

      {/* 7. Testimonial — centered block, red background */}
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
            The organizational model gave us a view of our company we&apos;d never had before. We could finally see how teams, workflows, and decisions connected — and where the real friction was hiding.
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-8 bg-white/25" />
            <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
              COO &nbsp;·&nbsp; Enterprise Technology Company
            </p>
            <div className="h-px w-8 bg-white/25" />
          </div>
        </div>
      </section>

      {/* 8. FAQ — collapsible with Plus icon */}
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
            {MODEL_FAQ_ITEMS.map((item, index) => {
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
