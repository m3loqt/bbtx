"use client";

import Link from "next/link";
import Image from "next/image";
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

export default function OrganizationalAIAssessmentPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — light top with headline + grid, full-width image bottom half */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col bg-[#f7f7f7] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <h1 className="max-w-[85%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            Know where AI stands inside your organization{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              before you scale it.
            </span>
          </h1>
        </div>
        <div className="relative z-[1] h-[45vh] w-full overflow-hidden sm:h-[50vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. The reality — dark, centered */}
      <section className="relative z-[1] min-h-screen w-full bg-[#222222]">
        <div className="relative z-[1] flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">The reality</p>
            <h2 className="mt-6 text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-white sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
              AI is being used.
              <br />
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                The question is whether you can see it.
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-white/80 sm:max-w-5xl sm:text-lg">
              Across most organizations, AI tools are influencing decisions, workflows, and data movement, both formally and informally. Without
              visibility, growth and risk expand at the same time.
            </p>
            <div className="mx-auto mt-16 grid max-w-5xl gap-5 text-left sm:grid-cols-3 lg:mt-20">
              {[
                {
                  title: "Shadow adoption",
                  body: "Teams experimenting with AI tools outside formal governance.",
                },
                {
                  title: "Fragmented direction",
                  body: "Initiatives launched without shared priorities or accountability.",
                },
                {
                  title: "Undefined risk exposure",
                  body: "Data handling, compliance, and oversight left unclear.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 text-left sm:p-6"
                >
                  <h3 className="text-sm font-semibold tracking-tight text-white/90 sm:text-base">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-[15px]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. What we evaluate — left eyebrow, right content blocks */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            {/* Left eyebrow */}
            <p className="flex items-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
              <Image src="/node.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
              What we evaluate
            </p>

            {/* Right: headline + intro + cards */}
            <div className="pr-0 lg:pr-[10%]">
              <h2 className="text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
                A structured view of{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  your AI landscape
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#555555] sm:text-lg">
                We assess how AI is actually being used and how prepared your organization is to manage it responsibly and strategically.
              </p>

              {/* Cards on the right: 3 rows of 2 */}
              <div className="mt-10 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-2 lg:gap-2">
                {[
                  {
                    title: "Leadership alignment",
                    body: "Clarity on strategic intent, ownership, and decision rights.",
                  },
                  {
                    title: "Workflow integration",
                    body: "Where AI intersects with operational processes.",
                  },
                  {
                    title: "Governance and controls",
                    body: "Approval flows, oversight mechanisms, and accountability structures.",
                  },
                  {
                    title: "Data exposure",
                    body: "Potential vulnerabilities in how information is processed.",
                  },
                  {
                    title: "Adoption behavior",
                    body: "How teams are actually using AI tools day to day.",
                  },
                  {
                    title: "Strategic opportunity",
                    body: "Where structured implementation could create measurable value.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex min-h-[190px] flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:min-h-[200px] sm:p-6"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-[#222222] sm:text-lg">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-[15px]">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How the assessment works — 4-step flow */}
      <section className="relative z-[1] w-full bg-white">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555555]">How it works</p>
            <h2 className="mt-5 text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
              Disciplined. Methodical.{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Executive focused.
              </span>
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {[
                {
                  step: "01",
                  title: "Executive discovery",
                  body: "Conversations with leadership to clarify intent, risk tolerance, and organizational context.",
                },
                {
                  step: "02",
                  title: "Workflow mapping",
                  body: "Review of operational processes and AI touchpoints across departments.",
                },
                {
                  step: "03",
                  title: "Governance review",
                  body: "Evaluation of access controls, oversight structures, and usage policies.",
                },
                {
                  step: "04",
                  title: "Strategic findings brief",
                  body: "Structured report outlining risk exposure, opportunity zones, and prioritized next steps.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex min-h-[260px] flex-col rounded-2xl border border-black/[0.06] bg.white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:min-h-[280px] sm:p-7"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ca3726]" style={{ fontFamily: "var(--font-mono), monospace" }}>
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-[15px]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. What you receive — full-page deliverables */}
      <section className="relative z-[1] min-h-screen w-full bg-[#222222]">
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Deliverables</p>
            <h2 className="mt-5 text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-white sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
              What you walk away with.{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Every time.
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              Not a deck of recommendations. A structured set of outputs your leadership team can act on the day it lands.
            </p>
            <div className="mt-14 grid gap-2 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-2.5">
              {[
                {
                  label: "01",
                  title: "Executive summary briefing",
                  body: "A concise leadership-facing document summarizing findings, risk exposure, and prioritized direction.",
                },
                {
                  label: "02",
                  title: "Organizational AI usage map",
                  body: "A structured view of where AI is actively used, by whom, and how it connects to core business processes.",
                },
                {
                  label: "03",
                  title: "Risk exposure overview",
                  body: "Identified vulnerabilities in data handling, governance, and compliance across current AI activity.",
                },
                {
                  label: "04",
                  title: "Governance gap analysis",
                  body: "A clear picture of what oversight structures are missing or insufficient relative to your current AI footprint.",
                },
                {
                  label: "05",
                  title: "Opportunity prioritization matrix",
                  body: "Ranked opportunities where structured AI investment would generate the highest measurable business value.",
                },
                {
                  label: "06",
                  title: "Recommended next actions",
                  body: "Concrete, sequenced steps for leadership tied to owners and outcomes, not vague suggestions.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[220px] flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:min-h-[240px] sm:p-7"
                >
                  <p
                    className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]"
                    style={{ fontFamily: "var(--font-mono), monospace" }}
                  >
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-base font-semibold tracking-tight text-white sm:text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Before and after clarity — full-page split */}
      <section className="relative z-[1] min-h-screen w-full">
        <div className="flex min-h-screen flex-col lg:flex-row">
          {/* Before */}
          <div className="relative flex flex-1 flex-col justify-center bg-[#f0f0f0] px-6 py-20 sm:px-10 lg:min-h-screen lg:px-16 lg:py-32">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
            <div className="relative z-[1]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">Before the assessment</p>
              <h3 className="mt-4 text-[2rem] font-medium leading-tight tracking-tighter text-[#222222]/40 sm:text-[2.4rem] lg:text-[2.8rem]">
                Operating in the dark.
              </h3>
              <div className="mt-10 space-y-6">
                {[
                  { label: "Shadow adoption", desc: "AI tools in use that leadership cannot see, track, or govern." },
                  { label: "Reactive oversight", desc: "Governance applied after problems surface, not before they form." },
                  { label: "Unclear ownership", desc: "No defined accountability for AI decisions, data, or outcomes." },
                  { label: "Scattered experimentation", desc: "Initiatives running in parallel without shared priorities or sequencing." },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-[#222222]/20 pl-4">
                    <p className="text-sm font-semibold text-[#222222]/50">{item.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#555555]/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* After */}
          <div className="flex flex-1 flex-col justify-center bg-[#222222] px-6 py-20 sm:px-10 lg:min-h-screen lg:px-16 lg:py-32">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#ca3726]">After the assessment</p>
            <h3 className="mt-4 text-[2rem] font-medium leading-tight tracking-tighter text-white sm:text-[2.4rem] lg:text-[2.8rem]">
              Leadership with full visibility.
            </h3>
            <div className="mt-10 space-y-6">
              {[
                { label: "Complete AI usage map", desc: "A structured view of what is in use, where, and by whom across the organization." },
                { label: "Defined accountability", desc: "Ownership assigned to every AI-related process, decision, and data flow." },
                { label: "Known risk exposure", desc: "Identified gaps in governance, data handling, and oversight clearly documented." },
                { label: "Prioritized opportunity roadmap", desc: "Specific direction on where to invest next, ranked by readiness and value." },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#ca3726]/50 pl-4">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}

