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

const GOVERNANCE_GRID = [
  { label: "Access controls", detail: "Who can use which models, in which context, for which decisions." },
  { label: "Approval flows", detail: "What needs a human sign-off before it ships, and who gives it." },
  { label: "Audit trail", detail: "What gets logged, where it lives, and who can review it." },
  { label: "Ownership map", detail: "Every AI-assisted process has a named owner. No orphaned systems." },
  { label: "Escalation paths", detail: "When something breaks or behaves unexpectedly, who gets called." },
  { label: "Training & docs", detail: "Runbooks, playbooks, and onboarding so your team can operate without us." },
];

export default function ImplementationIntegrationPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — light top with headline + grid, full-width image bottom half */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col bg-[#f7f7f7] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <h1 className="max-w-[60%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            From strategy deck to{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              running system
            </span>
          </h1>
        </div>
        <div className="relative z-[1] h-[45vh] w-full overflow-hidden sm:h-[50vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. The gap — one massive statement, then the reality check */}
      <section className="relative z-[1] min-h-screen w-full border-t border-black/[0.06] bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <h2 className="text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.8rem] xl:text-[4.5rem]">
              Most AI initiatives die between the{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                last slide
              </span>{" "}
              and the{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                first workflow.
              </span>
            </h2>
            <div className="mt-16 grid gap-6 sm:grid-cols-3 lg:mt-20">
              {["IT has questions nobody anticipated", "Legal has concerns that stall everything", "The team doesn't know where to start"].map((item) => (
                <div key={item} className="border-t-2 border-[#ca3726] pt-4">
                  <p className="text-base leading-relaxed text-[#555555] sm:text-lg">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 max-w-xl text-sm font-medium uppercase tracking-wider text-[#555555]">
              Six months later, nothing has shipped.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The stack — four horizontal bands building up, like architectural layers */}
      <section className="relative z-[1] w-full">
        <div className="flex flex-col">
          {/* Layer 1 — deepest: Scope */}
          <div className="border-t border-black/[0.06] bg-[#222222] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-16">
              <div className="shrink-0 lg:w-48">
                <span className="text-[3.5rem] font-bold leading-none tracking-tighter text-white/10 sm:text-[4.5rem]">01</span>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">Scope</p>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                Define what's in and out. Who owns what. What "done" looks like. Success criteria, timelines, handoff points. Everyone agrees before we build.
              </p>
            </div>
          </div>
          {/* Layer 2 */}
          <div className="bg-[#2e2e2e] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-16">
              <div className="shrink-0 lg:w-48">
                <span className="text-[3.5rem] font-bold leading-none tracking-tighter text-white/10 sm:text-[4.5rem]">02</span>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">Design</p>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                Workflows, tooling, and guardrails designed together. AI fits how you actually operate, not the other way around. Governance is baked in, not bolted on.
              </p>
            </div>
          </div>
          {/* Layer 3 */}
          <div className="bg-[#3a3a3a] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-16">
              <div className="shrink-0 lg:w-48">
                <span className="text-[3.5rem] font-bold leading-none tracking-tighter text-white/10 sm:text-[4.5rem]">03</span>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">Deploy</p>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                Rollout with clear success criteria. We don't walk away at go-live. We monitor adoption, fix friction, and adjust workflows based on how people actually use the system.
              </p>
            </div>
          </div>
          {/* Layer 4 — surface: Handoff */}
          <div className="bg-[#464646] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-16">
              <div className="shrink-0 lg:w-48">
                <span className="text-[3.5rem] font-bold leading-none tracking-tighter text-white/10 sm:text-[4.5rem]">04</span>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">Handoff</p>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                Your team runs it. We document, train, and leave you with a path to scale or adapt. Runbooks, escalation paths, and a clear view of what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Governance in practice — tight 2x3 grid of specific, concrete practices */}
      <section className="relative z-[1] min-h-screen w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="w-full">
            <h2 className="text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
              Governance isn't a{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                checklist.
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#555555] sm:text-lg">
              It's a set of specific, concrete practices we build into every deployment.
            </p>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.06] sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {GOVERNANCE_GRID.map((g) => (
                <div key={g.label} className="bg-white p-6 sm:p-7">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#ca3726]">{g.label}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#555555]">{g.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing — centered statement */}
      <section className="relative z-[1] min-h-[70vh] w-full bg-[#222222]">
        <div className="relative z-[1] flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <p
            className="max-w-4xl text-[1.8rem] font-normal leading-snug tracking-tighter text-white/90 sm:text-[2.4rem] lg:text-[3rem]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}
          >
            "Our job is to make ourselves unnecessary, so you can keep moving without us."
          </p>
          <Link
            href="#"
            className="mt-14 inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-6 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
          >
            Talk to us about implementation
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
