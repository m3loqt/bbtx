"use client";

import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";

const VALUES = [
  {
    num: "01",
    title: "Leadership before technology",
    description:
      "The right tools mean nothing without the right leadership. We start with your people, your structure, and your goals before we ever talk about AI.",
  },
  {
    num: "02",
    title: "Clarity over complexity",
    description:
      "AI is complicated enough. Our job is to cut through the noise and give you a clear, honest picture of where you stand and exactly what to do next.",
  },
  {
    num: "03",
    title: "Honesty over comfort",
    description:
      "We tell you what your organization needs to hear, not what sounds good in a meeting. That directness is not a risk to the engagement. It is the value of it.",
  },
  {
    num: "04",
    title: "Capacity over dependency",
    description:
      "We are not here to make ourselves indispensable. We are here to build your organization's ability to lead with AI long after our engagement ends.",
  },
];

const STORY_ENTRIES = [
  {
    year: "1981",
    title: "The Personal Computer Changes Everything",
    description:
      "Grant managed the IBM PC's introduction into Europe and Canada, his first front-row seat to a world-changing technology. The lesson that stayed with him: transformative technology only matters when leaders know how to bring their organizations with them.",
    side: "right",
  },
  {
    year: "1993",
    title: "Building Across Borders",
    description:
      "After IBM, Grant co-founded Bridgewater Innovation Group in the Netherlands, securing European Commission contracts and helping organizations navigate technology-driven change across the continent. The consulting practice that would become BBTx began to take shape here.",
    side: "left",
  },
  {
    year: "2000",
    title: "A Practice Built on Real Organizations",
    description:
      "Back in the U.S., Grant founded his consulting practice focused on organizational development, strategy, and growth. Over two decades he worked with construction firms, high-tech companies, and government contractors across Virginia. People, strategy, and real organizational change.",
    side: "right",
  },
  {
    year: "2022",
    title: "A New Technology, A Familiar Pattern",
    description:
      "When ChatGPT launched, Grant recognized the moment immediately. He had seen it before. He began helping leaders understand AI and co-founded Chaotic Confluence to bring practical AI thinking to professionals navigating the shift.",
    side: "left",
  },
  {
    year: "2024",
    title: "BBTx.AI Is Born",
    description:
      "Grant launched BBTx.AI to help organizations navigate AI with strategy, clarity, and confidence. Not as a technology project. As a leadership imperative.",
    side: "right",
  },
];

const PEOPLE = [
  {
    name: "Grant Tate",
    image: "/grant.png",
    email: "grant@bbtx.com",
    linkedin: "https://linkedin.com/in/granttate",
    description: [
      "Grant Tate is the CEO of Bridge Business Transformations, a coach, consultant, and author who helps leaders thrive in complex environments.",
      "He explores how AI is shaping people, organizations, and society, and how leaders can respond with clarity.",
      "He wrote Hand on the Shoulder, sharing lessons from his life and career on leadership and personal growth.",
    ],
  },
  {
    name: "Kaye Monroe",
    image: "/kaye.png",
    email: "kaye@bbtx.com",
    linkedin: "https://linkedin.com/in/kayemonroe",
    description: [
      "Kaye Monroe leads KDM Coaching and Associates, supporting leaders and individuals as they define goals and follow through.",
      "She is a founder and key force behind the Minority Business Council, building community and opportunity for minority entrepreneurs.",
      "She's known in the Charlottesville region for her vision, diplomacy, and steady leadership.",
    ],
  },
  {
    name: "Mel Angelo Cortes",
    image: "/mel.png",
    email: "mel@bbtx.com",
    linkedin: "https://linkedin.com/in/melangelocortes",
    description: [
      "Mel Angelo Cortes supports BBTx AI across operations, systems, and execution, helping turn ideas into clear deliverables.",
      "He builds the workflows, content, and digital assets that support BBTx AI's programs and community.",
      "He focuses on making AI practical for leaders through structured implementation and simple, usable guidance.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      {/* Purpose: big pull quote style */}
      <section className="relative z-[1] w-full overflow-hidden pt-14 sm:pt-20">
        {/* Background image */}
        <img
          src="/grant.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          aria-hidden
        />
        {/* Black overlay fading from bottom to top */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.25) 100%)",
          }}
          aria-hidden
        />
        {/* Grain texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative z-[3] flex h-[calc(100vh-3.5rem)] flex-col justify-end px-4 pb-0 pt-16 sm:h-[calc(100vh-5rem)] sm:px-6 lg:px-8">
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 sm:mb-8">Purpose</p>
          <h2 className="max-w-[95%] text-[1.7rem] font-medium leading-[1.1] tracking-tighter text-white sm:max-w-[88%] sm:text-[2.6rem] md:text-[3.1rem] lg:text-[3.8rem] xl:text-[4.4rem]">
            We exist to help leaders and organizations use AI with{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              clarity and intent
            </span>
            , turning complex decisions into confident ones.
          </h2>
          {/* Marquee at bottom */}
          <div className="mt-8 overflow-hidden border-t border-b border-white/10 py-4 sm:mt-16 sm:py-5">
            <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="mx-8 text-sm font-semibold uppercase tracking-[0.3em] text-white/20"
                >
                  Strategy &nbsp;·&nbsp; Implementation &nbsp;·&nbsp; Measurement
                  &nbsp;·&nbsp; Scale
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our story: timeline */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="relative z-[1] px-4 py-12 sm:px-6 sm:py-20 lg:px-12 lg:py-28 xl:px-16">
          <h2 className="mb-10 text-center text-3xl font-medium tracking-tighter text-[#222222] sm:mb-16 sm:text-5xl lg:mb-20 lg:text-6xl xl:text-7xl">
            Our{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              story
            </span>
          </h2>

          <div className="relative mx-auto max-w-7xl xl:max-w-[110rem]">
            {/* Vertical line */}
            <div
              className="absolute left-1/2 top-0 hidden min-h-full w-px -translate-x-1/2 bg-black/[0.08] lg:block"
              style={{ height: "calc(100% + 2rem)" }}
              aria-hidden
            />
            <div className="flex flex-col gap-10 sm:gap-16 lg:gap-20">
              {STORY_ENTRIES.map((entry, index) => (
                <div
                  key={entry.year}
                  className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12"
                >
                  {/* Left column */}
                  <div className={entry.side === "left" ? "order-2 pl-6 lg:order-1 lg:pl-0 lg:pr-12" : "order-2 lg:order-1"}>
                    {entry.side === "left" && (
                      <>
                        <p className="text-xl font-semibold tracking-tight text-[#222222] sm:text-3xl lg:text-4xl">
                          {entry.year} — {entry.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#555555] sm:mt-3 sm:text-lg lg:text-xl">
                          {entry.description}
                        </p>
                        {index === 1 ? (
                          <img
                            src="/history2.png"
                            alt=""
                            className="mt-3 aspect-[16/10] w-full max-w-2xl border border-black/[0.06] object-cover lg:ml-auto xl:max-w-[64rem]"
                          />
                        ) : index === 3 ? (
                          <img
                            src="/history4.png"
                            alt=""
                            className="mt-3 aspect-[16/10] w-full max-w-2xl border border-black/[0.06] object-cover lg:ml-auto xl:max-w-[64rem]"
                          />
                        ) : (
                          <div className="mt-3 aspect-[16/10] w-full max-w-2xl border border-black/[0.06] bg-black/[0.04] lg:ml-auto xl:max-w-[64rem]" aria-hidden />
                        )}
                      </>
                    )}
                  </div>
                  {/* Center: dot */}
                  <div className="absolute left-0 top-6 flex justify-center lg:relative lg:left-0 lg:top-1 lg:col-start-2">
                    <div className="h-3 w-3 shrink-0 rounded-full bg-[#222222]/25" aria-hidden />
                  </div>
                  {/* Right column */}
                  <div className={entry.side === "right" ? "order-2 pl-6 lg:order-3 lg:pl-12 lg:text-left" : "order-2 lg:order-3"}>
                    {entry.side === "right" && (
                      <>
                        <p className="text-xl font-semibold tracking-tight text-[#222222] sm:text-3xl lg:text-4xl">
                          {entry.year} — {entry.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#555555] sm:mt-3 sm:text-lg lg:text-xl">
                          {entry.description}
                        </p>
                        {index === 0 ? (
                          <img
                            src="/history1.png"
                            alt=""
                            className="mt-3 aspect-[16/10] w-full max-w-2xl border border-black/[0.06] object-cover xl:max-w-[64rem]"
                          />
                        ) : index === 2 ? (
                          <img
                            src="/history3.png"
                            alt=""
                            className="mt-3 aspect-[16/10] w-full max-w-2xl border border-black/[0.06] object-cover xl:max-w-[64rem]"
                          />
                        ) : index === 4 ? (
                          <img
                            src="/history5.png"
                            alt=""
                            className="mt-3 aspect-[16/10] w-full max-w-2xl border border-black/[0.06] object-cover xl:max-w-[64rem]"
                          />
                        ) : (
                          <div className="mt-3 aspect-[16/10] w-full max-w-2xl border border-black/[0.06] bg-black/[0.04] xl:max-w-[64rem]" aria-hidden />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* By the numbers: four metric cards (half-page) */}
      <section className="relative z-[1] w-full bg-white">
        <div className="relative z-[1] flex min-h-[50vh] flex-col justify-center px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="w-full">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              By the numbers
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-6xl 2xl:text-[4rem]">
              What{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                our work
              </span>{" "}
              looks like in numbers.
            </h2>
          </div>
          <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
            {[
              {
                stat: "100+",
                label: "Organizations served",
                context:
                  "Across industries, from high-growth startups to enterprises navigating complex change.",
              },
              {
                stat: "50+",
                label: "Leaders coached",
                context:
                  "Through some of the most consequential decisions and transformations of their careers.",
              },
              {
                stat: "200%",
                label: "Average productivity impact",
                context:
                  "Reported by organizations that committed fully to the strategy and implementation process.",
              },
              {
                stat: "12 weeks",
                label: "Average time to results",
                context:
                  "From kickoff to measurable organizational change in how your team operates and performs.",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="flex flex-col rounded-2xl border border-black/[0.06] bg-[#fafafa] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:min-h-[230px] sm:p-6 lg:p-7"
              >
                <p className="text-2xl font-semibold tracking-tight text-[#222222] sm:text-4xl lg:text-5xl xl:text-6xl">
                  {item.stat}
                </p>
                <div className="mt-3 sm:mt-auto sm:pt-4">
                  <p className="text-xs font-medium text-[#222222] sm:text-base">
                    {item.label}
                  </p>
                  <p className="mt-1 hidden text-sm leading-relaxed text-[#555555] sm:block sm:text-[15px]">
                    {item.context}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values: oversized numbered list */}
      <section className="relative z-[1] w-full bg-[#222222]">
        <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mb-10 flex items-end justify-between sm:mb-16 lg:mb-20">
            <div>
              <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">Values</p>
              <h2 className="text-3xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
                What{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  drives
                </span>{" "}
                us
              </h2>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-white/10">
            {VALUES.map((v) => (
              <div
                key={v.num}
                className="grid gap-2 py-6 sm:gap-4 sm:py-12 lg:grid-cols-[260px_0.9fr_1.3fr] lg:items-center lg:gap-10"
              >
                <span
                  className="block text-[3.5rem] font-bold leading-none tracking-tighter sm:text-[5rem] lg:text-[6rem]"
                  style={{
                    background: "linear-gradient(to bottom, #ca3726 0%, rgba(202,55,38,0.35) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {v.num}
                </span>
                <h3 className="pl-0 text-lg font-semibold tracking-tight text-white sm:text-3xl lg:pl-8 lg:text-4xl">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60 sm:text-lg lg:text-xl">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimony: full-bleed red */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#ca3726]">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-[50vh] flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[70vh] sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <svg
            className="mb-6 h-10 w-10 text-white/30 sm:mb-8 sm:h-16 sm:w-16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.2 11 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.2 21 15c0 1.82-1.343 3.317-3.182 3.317-1.08 0-2.169-.48-3.235-1.996z" />
          </svg>
          <blockquote className="max-w-4xl text-xl font-medium leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem] lg:leading-snug">
            BBTx helped us move from experimentation to measurable results in a
            matter of months. They didn&apos;t just advise, they
            built alongside us and stayed accountable for outcomes.
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-8 bg-white/40" />
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Reza Schott &nbsp;·&nbsp; Head of Marketing, OPP
            </p>
            <div className="h-px w-8 bg-white/40" />
          </div>
        </div>
      </section>

      {/* ━━━ People ━━━ */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="relative z-[1] px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mb-10 text-center sm:mb-16 lg:mb-20">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">People</p>
            <h2 className="text-3xl font-medium tracking-tighter text-[#222222] sm:text-5xl lg:text-6xl">
              The team behind{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                BBTx
              </span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PEOPLE.map((p) => (
              <div
                key={p.name}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Dark overlay on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-hidden
                />
                {/* Content at bottom, always visible on mobile, hover on desktop */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 opacity-100 transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {p.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={`mailto:${p.email}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
                      aria-label={`Email ${p.name}`}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <path d="m22 6-10 7L2 6" />
                      </svg>
                    </a>
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
                      aria-label={`${p.name} on LinkedIn`}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                  <div className="mt-3 space-y-1">
                    {p.description.map((line, i) => (
                      <p key={i} className="text-sm leading-snug text-white/90 sm:text-base">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: reuse homepage CTA for consistent background and layout */}
      <CTA />

      <Footer />
    </div>
  );
}
