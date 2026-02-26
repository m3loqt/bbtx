"use client";

import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const SIGNALS = [
  { num: "01", term: "Outcome clarity", bar: "w-[85%]", def: "You know what \"success\" means for this initiative, and it's not just \"we used AI.\"" },
  { num: "02", term: "Behavior change", bar: "w-[65%]", def: "Adoption and usage are visible. You see where it's sticking and where it's not." },
  { num: "03", term: "Risk visibility", bar: "w-[75%]", def: "You can explain how AI is used, by whom, and what guardrails are in place." },
  { num: "04", term: "Iteration speed", bar: "w-[55%]", def: "You improve based on evidence, not gut, and know what to change next." },
];

const FLOW = [
  { label: "Identify", detail: "Choose the few metrics that tie to real decisions, not everything that can be counted." },
  { label: "Instrument", detail: "Wire those metrics into your workflows: what gets logged, where it lives, who reviews it." },
  { label: "Review", detail: "Establish a rhythm, weekly or monthly, where measurement informs action." },
  { label: "Iterate", detail: "Tune what's not working, scale what is, and adjust the metric set as you learn." },
];

export default function DataMeasurementPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — light top with headline + grid, full-width image bottom half */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col bg-[#f7f7f7] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <h1 className="max-w-[60%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            If you can't{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              measure it,
            </span>{" "}
            you can't improve it, or defend it
          </h1>
        </div>
        <div className="relative z-[1] h-[45vh] w-full overflow-hidden sm:h-[50vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. Before / After — split comparison showing what changes */}
      <section className="relative z-[1] w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Before */}
          <div className="flex flex-1 flex-col justify-center bg-[#f0f0f0] px-6 py-20 sm:px-10 lg:min-h-screen lg:px-16 lg:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555555]/50">Before</p>
            <div className="mt-10 space-y-6">
              {[
                ""Did the AI project work?"",
                ""I think people are using it?"",
                ""The vendor said the metrics look good."",
                ""We'll figure out measurement later."",
              ].map((q) => (
                <p key={q} className="text-lg leading-relaxed text-[#222222]/35 sm:text-xl">{q}</p>
              ))}
            </div>
            <p className="mt-12 text-sm font-medium uppercase tracking-wider text-[#222222]/25">Guessing.</p>
          </div>
          {/* After */}
          <div className="flex flex-1 flex-col justify-center bg-[#222222] px-6 py-20 sm:px-10 lg:min-h-screen lg:px-16 lg:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ca3726]">After</p>
            <div className="mt-10 space-y-6">
              {[
                "Adoption is at 74% across target teams.",
                "Average decision time down 35%.",
                "Three risk flags caught before escalation.",
                "Next review: Tuesday. Owner: VP Ops.",
              ].map((q) => (
                <p key={q} className="text-lg leading-relaxed text-white sm:text-xl">{q}</p>
              ))}
            </div>
            <p className="mt-12 text-sm font-medium uppercase tracking-wider text-white/50">Knowing.</p>
          </div>
        </div>
      </section>

      {/* 3. Four signals — tall vertical cards with visual meter bars */}
      <section className="relative z-[1] min-h-screen w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="w-full">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#555555]">What we measure</p>
            <h2 className="mb-14 text-4xl font-medium tracking-tighter text-[#222222] sm:text-5xl lg:mb-20 lg:text-6xl">
              Four signals.{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Not forty.
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {SIGNALS.map((s) => (
                <div key={s.num} className="flex min-h-[380px] flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:min-h-[420px] sm:p-7">
                  {/* Visual bar indicator */}
                  <div className="mb-6 h-1.5 w-full rounded-full bg-black/[0.06]">
                    <div className={`h-full rounded-full bg-[#ca3726] ${s.bar}`} />
                  </div>
                  <span
                    className="block text-[3rem] font-bold leading-none tracking-tighter sm:text-[3.5rem]"
                    style={{
                      background: "linear-gradient(to bottom, #222222 0%, rgba(34,34,34,0.15) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.num}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">{s.term}</h3>
                  <p className="mt-auto pt-4 text-sm leading-relaxed text-[#555555] sm:text-[15px]">{s.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The flow — horizontal pipeline: Identify → Instrument → Review → Iterate */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#ca3726]">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.10]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="w-full">
            <h2 className="mb-6 text-3xl font-medium tracking-tighter text-white sm:text-4xl lg:text-5xl">
              The{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                rhythm
              </span>
            </h2>
            <p className="mb-14 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:mb-16">
              We don't dump dashboards on you. We build a repeatable cycle that turns data into decisions.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {FLOW.map((step, i) => (
                <div key={step.label} className="relative flex flex-col rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:p-7 lg:rounded-none lg:border-l-0 lg:first:rounded-l-2xl lg:first:border-l lg:last:rounded-r-2xl">
                  <p className="text-sm font-semibold uppercase tracking-wider text-white/50" style={{ fontFamily: "var(--font-mono), monospace" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">{step.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing — centered, clean */}
      <section className="relative z-[1] min-h-[70vh] w-full bg-white">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <p
            className="max-w-4xl text-[1.8rem] font-normal leading-snug tracking-tighter text-[#222222] sm:text-[2.4rem] lg:text-[3rem]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}
          >
            "You stop guessing whether AI is working. You have evidence."
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#555555] sm:text-lg">
            Adoption, outcomes, risk. You can explain what you're measuring and why.
          </p>
          <Link
            href="#"
            className="mt-14 inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-6 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
          >
            Talk to us about measurement
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
