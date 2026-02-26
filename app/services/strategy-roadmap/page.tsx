"use client";

import Image from "next/image";
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
  "Where should we start with AI?",
  "Which use cases actually matter?",
  "How do we get the board on board?",
  "What can we realistically do in 6 months?",
  "Who owns this internally?",
  "Are we behind our competitors?",
  "How do we avoid a failed pilot?",
  "What's the ROI argument?",
];

// Varied font sizes (rem) so the cloud doesn't read as ascending
const QUESTION_SIZES = [1.5, 0.95, 1.25, 1.6, 1.05, 1.4, 1.1, 1.35];
const QUESTION_OPACITIES = [0.35, 0.28, 0.42, 0.25, 0.38, 0.32, 0.45, 0.3];

export default function StrategyRoadmapPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — light top with headline + grid, full-width image bottom half */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col bg-[#f7f7f7] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <h1 className="max-w-[70%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            We help you build an AI strategy{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              that actually gets executed
            </span>
          </h1>
        </div>
        <div className="relative z-[1] h-[45vh] w-full overflow-hidden sm:h-[50vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. The noise — scattered questions that leaders face, then clarity cuts through */}
      <section className="relative z-[1] min-h-screen w-full bg-[#222222]">
        <div className="relative z-[1] flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="w-full">
            <p className="mb-16 text-xs font-semibold uppercase tracking-[0.2em] text-white/30 lg:mb-20">
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
            <p className="mx-auto max-w-6xl text-[2rem] font-medium leading-[1.08] tracking-tighter text-white sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem]">
              We don't answer all of them at once. We help you find the{" "}
              <span className="text-[#ca3726]">one question</span>{" "}
              that matters most right now, and build from there.
            </p>
          </div>
        </div>
      </section>

      {/* 3. How we work — same structure as Services: left = eyebrow, right = headline + cards */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="flex items-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
              <Image src="/node.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
              How we work
            </p>
            <div className="pr-0 lg:pr-[10%]">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Three conversations.{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  One direction.
                </span>
              </h2>
              {/* Cards on the right: 1 full-width, then 2 side by side */}
              <div className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:gap-1.5">
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:col-span-2 sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">01</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl lg:text-3xl">The context</h3>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                    <p>What decision are you trying to make? Who needs to be in the room? What's already working, and what's blocking you? We map constraints: budget, timeline, talent, risk appetite.</p>
                    <p>A roadmap that ignores your reality is a fantasy. We start with what's true.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">02</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">The prioritization</h3>
                  <p className="mt-6 text-base leading-relaxed text-[#555555] sm:text-lg">
                    We tie every initiative to revenue, cost, or risk, not vague "use cases." What's worth doing now? What can wait? Who needs to own it?
                  </p>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">03</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">The sequence</h3>
                  <p className="mt-6 text-base leading-relaxed text-[#555555] sm:text-lg">
                    First this, then that. With names and dates. A living plan your leadership can own and your teams can execute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
