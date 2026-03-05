"use client";

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

export default function AIOrganizationalModelPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero */}
      <section className="relative z-[1] flex min-h-screen w-full flex-col bg-[#f7f7f7] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
          <h1 className="max-w-[72%] text-[2.4rem] font-medium leading-[1.08] tracking-tighter text-[#222222] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem]">
            See your organization through{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              an AI model
            </span>{" "}
            of how it actually works.
          </h1>
        </div>
        <div className="relative z-[1] h-[45vh] w-full overflow-hidden sm:h-[50vh]">
          <img src="/service.png" alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 2. The Strategic Blind Spot — centered editorial, 3 numbered blocks in a row */}
      <section className="relative z-[1] w-full bg-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-36">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            The strategic blind spot
          </p>
          <h2 className="mt-5 max-w-5xl text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
            Most leaders run organizations they{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              cannot fully see.
            </span>
          </h2>

          <div className="mt-20 grid w-full max-w-7xl grid-cols-1 gap-10 text-left sm:grid-cols-3 sm:gap-12">
            {[
              { num: "01", text: "Teams interact in ways leadership rarely observes." },
              { num: "02", text: "Processes evolve across departments without a unified view." },
              { num: "03", text: "Strategic decisions are made without seeing how the system behaves as a whole." },
            ].map((block) => (
              <div key={block.num} className="flex flex-col gap-5 pr-2">
                <span
                  className="text-[3.5rem] font-bold leading-none tracking-tighter text-[#222222]/[0.06] sm:text-[4.5rem]"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {block.num}
                </span>
                <p className="text-lg leading-relaxed text-[#222222] sm:text-xl lg:text-[1.35rem]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-20 max-w-xl text-sm leading-relaxed text-[#555555]/70 sm:text-base">
            An AI organizational model creates a structured view of the organization so leadership can examine how it
            truly operates.
          </p>
        </div>
      </section>

      {/* 3. What the Model Represents — left eyebrow, right headline + cards */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-base font-normal text-[#555555] sm:text-lg">
              What the model represents
            </p>
            <div className="pr-0 lg:pr-[10%]">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                A structured representation of how your organization{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  operates.
                </span>
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:gap-1.5">
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:col-span-2 sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">01</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl lg:text-3xl">
                    Organizational Structure
                  </h3>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                    <p>Map teams, roles, and reporting relationships into a connected system. Understand how the formal hierarchy shapes day-to-day work and where structural gaps create friction.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">02</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                    Workflow Movement
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-[#555555] sm:text-lg">
                    See how work actually travels across departments, where handoffs slow down, and where bottlenecks form between teams.
                  </p>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-10 lg:p-12">
                  <span className="text-[4rem] font-bold leading-none tracking-tighter text-[#222222]/10 sm:text-[5rem]">03</span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                    Decision Flow & Collaboration
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-[#555555] sm:text-lg">
                    Understand how authority and decisions move through the organization, and identify where coordination succeeds or friction appears.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How the Model is Built — single row cards with image placeholders */}
      <section className="relative z-[1] min-h-screen w-full bg-white">
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            The process
          </p>
          <h2 className="mt-5 max-w-3xl text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
            Building the{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              organizational model
            </span>
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-3">
            {[
              {
                num: "01",
                title: "Organizational Discovery",
                body: "We interview leadership and review existing structures, workflows, and strategic priorities to understand how the organization functions today — not just how it's drawn on paper.",
              },
              {
                num: "02",
                title: "Structural Mapping",
                body: "Teams, roles, reporting lines, and operational processes are documented and connected into a unified map that reveals dependencies and relationships across the organization.",
              },
              {
                num: "03",
                title: "Model Construction",
                body: "A structured AI representation is built from the mapped data, encoding how teams, decisions, and workflows interact so the organization can be explored as a living system.",
              },
              {
                num: "04",
                title: "Leadership Exploration",
                body: "Leaders interact with the model to examine patterns, test assumptions about how change propagates, and identify the highest-leverage opportunities for improvement.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-[#f7f7f7]"
              >
                <div className="aspect-[16/10] w-full bg-black/[0.04]" aria-hidden />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p
                    className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ca3726]"
                    style={{ fontFamily: "var(--font-mono), monospace" }}
                  >
                    {step.num}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal line below cards */}
          <div className="mt-16 h-px w-full bg-[#ca3726]/25 lg:mt-20" aria-hidden />
        </div>
      </section>

      {/* 5. How Leaders Use the Model — full page, light grid background with capabilities */}
      <section className="relative z-[1] min-h-screen w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[5fr_6fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-32">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                Leadership utility
              </p>
              <h2 className="mt-5 max-w-xl text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.2rem]">
                A new tool for{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  leadership thinking
                </span>
              </h2>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-[#555555] sm:text-lg">
                Instead of relying only on reports and dashboards, leaders can explore a structured representation of
                the organization and understand how changes may affect the entire system.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Map operational relationships",
                  desc: "See how teams depend on each other and where invisible connections shape outcomes.",
                },
                {
                  title: "Model initiative impact",
                  desc: "Explore how a proposed initiative ripples across departments before committing resources.",
                },
                {
                  title: "Surface structural inefficiencies",
                  desc: "Identify redundancies, bottlenecks, and coordination gaps that slow the organization down.",
                },
                {
                  title: "Evaluate strategic adjustments",
                  desc: "Test how reorganizations, new roles, or process changes affect the broader system.",
                },
                {
                  title: "Clarify collaboration patterns",
                  desc: "Understand where teams collaborate well and where handoffs create friction or delay.",
                },
                {
                  title: "Ground decisions in system behavior",
                  desc: "Move beyond intuition to decisions informed by how the organization actually operates.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-colors hover:bg-white sm:p-7"
                >
                  <div className="mb-4 h-2 w-2 rounded-full bg-[#ca3726]" />
                  <h3 className="text-base font-semibold tracking-tight text-[#222222] sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555555] sm:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Before and After Visibility — full-screen split */}
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
          <div className="flex flex-col justify-center bg-[#222222] px-6 py-20 sm:px-10 lg:basis-[68%] lg:min-h-screen lg:px-20 lg:py-32 xl:px-28">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#ca3726]">After</p>
            <h3 className="text-[2.2rem] font-medium leading-tight tracking-tighter text-white sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.2rem]">
              Systemic{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                understanding.
              </span>
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
              The organizational model gives leadership a connected, explorable view of how the entire system behaves.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-16">
              {[
                { label: "A connected system view", desc: "Leadership sees the organization as a whole, with teams, workflows, and decisions mapped together." },
                { label: "Workflow relationships visible", desc: "How work moves across departments becomes explicit and explorable." },
                { label: "More structured strategic exploration", desc: "Leaders can model how changes may propagate before committing to direction." },
                { label: "Collaboration patterns and gaps identified", desc: "Where coordination works well and where friction appears becomes clear." },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#ca3726]/40 pl-5">
                  <p className="text-base font-semibold text-white sm:text-lg">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/50 sm:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonial — clean white panel */}
      <section className="relative z-[1] w-full bg-white">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <svg
            className="mb-8 h-12 w-12 text-[#ca3726]/25 sm:h-16 sm:w-16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.2 11 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.2 21 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996z" />
          </svg>
          <blockquote className="max-w-4xl text-2xl font-medium leading-snug tracking-tight text-[#222222] sm:text-3xl lg:text-[2.5rem] lg:leading-snug">
            The organizational model gave us a view of our company we&apos;d never had before. We could finally see how
            teams, workflows, and decisions connected — and where the real friction was hiding.
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-8 bg-[#222222]/15" />
            <p className="text-sm font-semibold uppercase tracking-wider text-[#555555]">
              COO &nbsp;·&nbsp; Enterprise Technology Company
            </p>
            <div className="h-px w-8 bg-[#222222]/15" />
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
