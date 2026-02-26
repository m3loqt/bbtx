"use client";

import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const INSIDE_CARDS = [
  {
    title: "Executive Roundtables",
    description: "Confidential leadership conversations around real AI decisions.",
  },
  {
    title: "Implementation Dialogues",
    description: "Working sessions translating strategy into execution.",
  },
  {
    title: "Case Dissections",
    description: "Structured breakdowns of organizational AI initiatives.",
  },
  {
    title: "Advisory Access",
    description: "Direct engagement with experienced practitioners.",
  },
];

const PATHWAY_STEPS = [
  { num: "01", title: "Clarify Strategic Intent", description: "Define why AI matters inside your organization." },
  { num: "02", title: "Identify Priority Use Cases", description: "Separate experimentation from business value." },
  { num: "03", title: "Design Responsible Implementation", description: "Establish governance and operational guardrails." },
  { num: "04", title: "Execute with Accountability", description: "Move from roadmap to measurable action." },
];

const GRADUATES = [
  { name: "Jane Carter", title: "COO, Regional Consulting Firm", program: "AI Implementation for Business Value", outcome: "Launched internal AI workflow within 90 days of completion." },
  { name: "Marcus Lee", title: "Director of Operations", program: "Executive Strategy Session", outcome: "Established AI governance framework for enterprise rollout." },
  { name: "Sarah Chen", title: "VP of Strategy", program: "AI Implementation for Business Value", outcome: "Defined 12-month AI roadmap with clear ownership and metrics." },
];

const CASE_SNAPSHOTS = [
  { headline: "From Experimentation to Strategy", body: "A consulting firm moved from scattered AI pilots to a defined 12-month implementation roadmap." },
  { headline: "From Curiosity to Governance", body: "A healthcare organization established AI usage policies and internal oversight." },
  { headline: "From Theory to Workflow Automation", body: "An operations team deployed its first measurable AI-assisted process improvement." },
];

const ETHOS_LEFT = [
  { num: "01", text: "Clarity over noise" },
  { num: "02", text: "Impact over theatre" },
  { num: "03", text: "Partnership over posturing" },
  { num: "04", text: "Responsible by design" },
];

const ETHOS_RIGHT = [
  "Not a tool tutorial group",
  "Not AI hype",
  "Not passive content consumption",
  "Not surface-level networking",
];

const ECOSYSTEM_CARDS = [
  { title: "Executive AI Strategy Sessions" },
  { title: "AI Implementation Cohorts" },
  { title: "Organizational Workshops" },
];

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — full page */}
      <section className="relative min-h-screen w-full overflow-hidden pt-20">
        <img src="/grant.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-[calc(100vh-5rem)] flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <h1 className="max-w-3xl text-[2.5rem] font-medium leading-tight tracking-tighter text-white sm:text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]">
            A Private Community for Leaders{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Integrating AI
            </span>{" "}
            with Intent
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Where executives and operators move from AI curiosity to confident implementation.
            No noise. No theatre. Just structured progress.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
            >
              Request Access
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#" className="text-sm font-medium text-white/80 underline-offset-2 hover:text-white hover:underline">
              View Upcoming Cohort
            </a>
          </div>
        </div>
      </section>

      {/* 2. The Shift — full page, light + grid */}
      <section className="relative z-[1] min-h-screen w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
                AI changed the landscape.
                <br />
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Leadership
                </span>{" "}
                must change the response.
              </h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-[#555555] sm:text-lg">
                <p>AI has flooded organizations with tools. But tools don&apos;t create clarity.</p>
                <p>Executives are being asked to decide, quickly, without structure.</p>
                <p className="font-medium text-[#222222]">
                  This community exists to create disciplined dialogue around real decisions.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <svg viewBox="0 0 280 200" className="w-full max-w-[280px] text-[#222222]/20" aria-hidden>
                <path d="M40 40h200v120H40V40z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M80 80h120M80 100h100M80 120h80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <circle cx="200" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M60 160l40-40 40 20 60-60" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Happens Inside — full page, 2x2 grid */}
      <section className="relative z-[1] min-h-screen w-full border-t border-black/[0.06] bg-white">
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#555555]">Inside the Community</p>
          <h2 className="mb-12 text-4xl font-medium tracking-tighter text-[#222222] sm:text-5xl lg:mb-16 lg:text-6xl">
            What happens{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              inside
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {INSIDE_CARDS.map((card) => (
              <div
                key={card.title}
                className="group relative rounded-xl border border-black/[0.08] bg-[#fafafa] p-6 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8"
              >
                <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
                  <svg className="h-6 w-6 text-[#222222]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="h-px w-0 bg-[#ca3726] transition-all duration-300 group-hover:w-12" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">{card.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#555555] sm:text-lg">{card.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm font-medium uppercase tracking-wider text-[#555555] lg:mt-16">
            Short. Sharp. Controlled.
          </p>
        </div>
      </section>

      {/* 4. The Pathway — light gray, horizontal 01–04 */}
      <section className="relative z-[1] min-h-screen w-full bg-[#f0f0f0]">
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <h2 className="mb-16 text-center text-4xl font-medium tracking-tighter text-[#222222] sm:text-5xl lg:mb-20 lg:text-6xl">
            From Dialogue to{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Deployment
            </span>
          </h2>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-black/[0.12] lg:block" style={{ top: "2.25rem" }} aria-hidden />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {PATHWAY_STEPS.map((step) => (
                <div key={step.num} className="relative text-center lg:text-left">
                  <span className="text-4xl font-bold tracking-tighter text-[#ca3726] sm:text-5xl">{step.num}</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555555] sm:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Graduate Spotlight — white, 3-col */}
      <section className="relative z-[1] min-h-screen w-full border-t border-black/[0.06] bg-white">
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#555555]">Graduate Spotlight</p>
          <h2 className="mb-16 text-4xl font-medium tracking-tighter text-[#222222] sm:text-5xl lg:mb-20 lg:text-6xl">
            Outcome-driven.
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {GRADUATES.map((g) => (
              <div key={g.name} className="rounded-xl border border-black/[0.06] bg-[#fafafa] p-6 sm:p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#222222] text-xl font-semibold text-white">
                  {g.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">{g.name}</h3>
                <p className="mt-1 text-sm text-[#555555]">{g.title}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#555555]">{g.program}</p>
                <p className="mt-4 text-base leading-relaxed text-[#222222]">{g.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Real Case Snapshots — alternating left/right */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <h2 className="mb-16 text-center text-4xl font-medium tracking-tighter text-[#222222] sm:text-5xl lg:mb-20">
            Real Case Snapshots
          </h2>
          <div className="mx-auto max-w-4xl space-y-20">
            {CASE_SNAPSHOTS.map((c, i) => (
              <div key={c.headline} className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-3xl">{c.headline}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#555555] sm:text-lg">{c.body}</p>
                </div>
                <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <svg viewBox="0 0 200 120" className="w-full max-w-[200px] text-[#222222]/15" aria-hidden>
                    <rect x="20" y="20" width="160" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M40 50h120M40 65h80M40 80h100" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Community Ethos — dark */}
      <section className="relative z-[1] min-h-screen w-full bg-[#222222]">
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <h2 className="mb-16 text-center text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:mb-20 lg:text-6xl">
            The Discipline in Our{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Approach
            </span>
          </h2>
          <div className="mx-auto grid w-full max-w-4xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              {ETHOS_LEFT.map((item) => (
                <div key={item.num} className="flex gap-4">
                  <span className="text-2xl font-bold tracking-tight text-[#ca3726] sm:text-3xl">{item.num}</span>
                  <p className="text-lg leading-relaxed text-white/90 sm:text-xl">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4 border-l border-white/15 pl-8">
              {ETHOS_RIGHT.map((line) => (
                <p key={line} className="text-base text-white/70 sm:text-lg">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ecosystem Integration — light gray */}
      <section className="relative z-[1] min-h-screen w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <h2 className="mb-6 text-center text-4xl font-medium tracking-tighter text-[#222222] sm:text-5xl lg:text-6xl">
            Part of a Larger Advisory{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Ecosystem
            </span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-[#555555] lg:mb-20">
            Community engagement often leads into:
          </p>
          <div className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-3 sm:gap-6">
            {ECOSYSTEM_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-8"
              >
                <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">{card.title}</h3>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-xl text-center text-base leading-relaxed text-[#555555] sm:text-lg">
            The community is where dialogue begins. Execution follows through structured programs.
          </p>
        </div>
      </section>

      {/* 9. Testimonial — red, centered quote */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#ca3726]">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <svg className="mb-8 h-12 w-12 text-white/30 sm:h-16 sm:w-16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.2 11 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.2 21 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996z" />
          </svg>
          <blockquote className="max-w-3xl text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem]">
            BBTx helped us move from experimentation to measurable results in months. They didn&apos;t just advise. They built alongside us.
          </blockquote>
        </div>
      </section>

      {/* 10. Final Invitation — red block, single CTA */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.2)]">
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-90"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 80% at 80% 60%, rgba(255,255,255,0.06) 0%, transparent 45%)
                `,
              }}
              aria-hidden
            />
            <div className="relative z-[1] px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-28">
              <h2 className="text-3xl font-medium tracking-tighter text-white sm:text-4xl lg:text-5xl">
                Engage with leaders{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  integrating AI
                </span>{" "}
                responsibly.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
                Access to the community is reviewed to ensure alignment and depth of conversation.
              </p>
              <a
                href="#"
                className="mt-10 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95"
              >
                Request Access
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
