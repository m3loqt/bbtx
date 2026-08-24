"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { FAQ } from "@/app/sections/FAQ";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { WaitlistModal } from "@/app/components/WaitlistModal";
import { COURSES_FAQ_ITEMS } from "@/app/courses/courses-faq-data";
import { Check, BookOpen } from "lucide-react";

// ─── Making Modern Managers: one program, three tiers ───────────────────────
type Tier = {
  tag?: string;
  title: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  note?: string;
  cta: string;
  ctaHref?: string;
  onCtaClick?: "waitlist";
  ctaVariant: "solid" | "outline";
  glass?: boolean;
};

const TIERS: Tier[] = [
  {
    title: "Self-Paced Learning",
    price: "$499",
    priceNote: "one-time, lifetime access",
    description:
      "The complete Management Development Program on your own schedule — the same 17-chapter curriculum built from decades of consulting and organizational leadership experience.",
    features: [
      "The full 17-chapter Management Development Program",
      "Lifetime access, yours to revisit anytime",
      "Work through it entirely at your own pace",
      "The same curriculum used in Individual Coaching and the Group Cohort",
    ],
    cta: "Start Self-Paced",
    ctaHref: "https://chaoticconfluence.gumroad.com/l/gjwijk",
    ctaVariant: "outline",
  },
  {
    tag: "Coming Soon",
    title: "Group Cohort",
    price: "$999",
    priceNote: "per person, once scheduled",
    description:
      "A small, live cohort working through the same material together, with room for your specific questions.",
    features: [
      "A cohort capped at 10 participants",
      "Live sessions, not pre-recorded",
      "Structured curriculum plus your questions",
      "Peer discussion with fellow participants",
    ],
    note: "Not scheduled yet — join the waitlist and you'll be first to know when a cohort is confirmed.",
    cta: "Join the Waitlist",
    onCtaClick: "waitlist",
    ctaVariant: "outline",
    glass: true,
  },
  {
    tag: "Recommended",
    title: "Individual Coaching",
    price: "$3,500",
    priceNote: "one-time engagement",
    description:
      "The full management program plus six one-on-one coaching sessions with Grant, built around your specific situation rather than a generic curriculum.",
    features: [
      "A diagnostic session to map your path",
      "Six 1:1 coaching sessions, one hour each",
      "Direct access between sessions",
      "Lifetime access to the full program",
    ],
    note: "Grant takes a limited number of 1:1 clients at a time.",
    cta: "Book Individual Coaching",
    ctaHref: "https://chaoticconfluence.gumroad.com/l/management-development-program-individual-coaching",
    ctaVariant: "solid",
  },
];

// ─── The five standalone AI courses ──────────────────────────────────────────
// coverImage omitted for 2 courses pending real cover art from Mel (matching
// the style of the other three, already-branded Chaotic Confluence images).
type AICourse = {
  title: string;
  price: string;
  format: string;
  whoFor: string;
  description: string;
  href: string;
  coverImage?: string;
  freeToolHref?: string;
};

const AI_COURSES: AICourse[] = [
  {
    title: "Generative AI for Coaches and Consultants",
    price: "$99",
    format: "Self-paced · 10 lessons",
    whoFor: "Coaches and consultants at any level of AI experience. No technical background required.",
    description:
      "Ten lessons built around the work you actually do with clients, not generic AI examples. You'll learn to write prompts that produce reliable, professional output, personalize an AI assistant to your voice and methodology, and use it to prepare for engagements and sharpen your deliverables, without handing over the judgment that took you years to build.",
    href: "https://chaoticconfluence.gumroad.com/l/hcvcs",
  },
  {
    title: "AI for Leadership and Organizational Transformation",
    price: "$299",
    format: "Self-paced · 16 lessons",
    whoFor: "Senior leaders and executives guiding an organization through AI adoption. Assumes familiarity with AI basics.",
    description:
      "Sixteen lessons on what AI actually asks of the people at the top: how it reshapes decision-making, culture, and workforce planning, how to build governance that holds up, and how to bring your people through the change without losing them.",
    href: "https://chaoticconfluence.gumroad.com/l/vpeyt",
    coverImage: "/ai4leadership.png",
  },
  {
    title: "AI Implementation for Business Value",
    price: "$299",
    format: "Self-paced · 16 lessons",
    whoFor: "Leaders, operations managers, and team leads responsible for making AI work inside a real organization.",
    description:
      "Sixteen lessons and four hands-on activities that walk you through a fourteen-day implementation plan — your first measurable win, a real pilot, and a repeatable system your team can run without you standing over it.",
    href: "https://chaoticconfluence.gumroad.com/l/vggusf",
    coverImage: "/bizval.png",
  },
  {
    title: "AI-Empowered Coaching & Consulting",
    price: "$199",
    format: "Self-paced · 18 lessons",
    whoFor: "Independent coaches, consultants, and small to mid-size consulting firms.",
    description:
      "Eighteen lessons on using AI to work faster and serve more clients without burning out — prompting techniques built for consulting work, a full use-case catalog, and what it takes to build systems and team structures that actually scale.",
    href: "https://chaoticconfluence.gumroad.com/l/uykxq",
    coverImage: "/aiempcoach.png",
  },
  {
    title: "Building the Organizational Digital Twin",
    price: "$599",
    format: "Self-paced · 8 lessons + coaching session",
    whoFor: "Senior consultants and strategic advisors.",
    description:
      "Eight lessons that teach you to build a complete five-dimension intelligence model of a client's organization — competitive position, operational architecture, financial intelligence, leadership capability, and strategic scenarios — before you ever walk into the first session, plus a personal coaching session with Grant to apply it to your own practice.",
    href: "https://chaoticconfluence.gumroad.com/l/jkrsit",
    freeToolHref: "/digital-twin-snapshot",
  },
];

function CheckIcon({ className }: { className?: string }) {
  return <Check className={className} strokeWidth={2.5} />;
}

export default function CoursesPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Half-height banner for Making Modern Managers — same photo + bottom
          glass-panel language as the Homepage/Coaching heroes, scaled down.
          Pricing cards start immediately below: no gate, no extra copy. */}
      <section className="relative z-[1] flex min-h-[440px] w-full flex-col overflow-hidden sm:min-h-[500px] lg:min-h-[580px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about/five.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "60% 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/55" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
        </div>

        <div className="relative z-10 mt-auto w-full border-t border-white/10 bg-black/35 px-4 py-8 backdrop-blur-xl sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-[100rem]">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/60">
              Making Modern Managers
            </p>
            <h1 className="mt-3 max-w-2xl text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.2rem]">
              One program. Three ways to work through it
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Not three competing courses — the same management-development curriculum at increasing levels of
              direct access to Grant.
            </p>
          </div>
        </div>
      </section>

      {/* Making Modern Managers — 3-tier ladder, directly under the banner */}
      <section id="making-modern-managers" className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TIERS.map((plan) => (
              <div
                key={plan.title}
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border px-7 py-10 sm:px-8 sm:py-11 ${
                  plan.glass
                    ? "border-black/[0.08] bg-[#e4e4e4]/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
                    : "border-black/[0.06] bg-white"
                }`}
              >
                <div className="relative z-10 flex h-full flex-col">
                  {plan.tag ? (
                    <span className="mb-6 inline-flex w-fit items-center rounded-md bg-[#ca3726]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#ca3726]">
                      {plan.tag}
                    </span>
                  ) : null}

                  <h3 className="text-lg font-semibold tracking-normal text-[#111827] sm:text-xl">{plan.title}</h3>
                  <p className="mt-2 text-4xl font-semibold tracking-normal text-[#111827] sm:text-5xl">
                    {plan.price}{" "}
                    <span className="text-base font-normal text-[#555555] sm:text-lg">{plan.priceNote}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base">{plan.description}</p>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#222222] sm:text-base">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#ca3726]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col items-start gap-4 pt-8">
                    {plan.note ? <p className="text-sm leading-relaxed text-[#555555]">{plan.note}</p> : null}
                    {plan.onCtaClick === "waitlist" ? (
                      <button
                        type="button"
                        onClick={() => setWaitlistOpen(true)}
                        className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-lg border border-[#ca3726] px-7 py-3.5 text-sm font-medium text-[#ca3726] transition-colors hover:bg-[#ca3726]/5"
                      >
                        {plan.cta}
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <a
                        href={plan.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-medium transition-colors ${
                          plan.ctaVariant === "solid"
                            ? "bg-[#ca3726] text-white hover:opacity-90"
                            : "border border-[#ca3726] text-[#ca3726] hover:bg-[#ca3726]/5"
                        }`}
                      >
                        {plan.cta}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five standalone AI courses — rows, not a grid: five items reads
          cleaner as a scannable list than as a card grid, and rows give the
          descriptions room without cramming a narrow column. */}
      <section id="ai-courses" className="w-full bg-white px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[100rem]">
          <h2 className="text-xl font-semibold tracking-normal text-[#222222] sm:text-2xl">AI Courses</h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#555555] sm:text-base">
            Five focused courses, priced by how deep you want to go.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {AI_COURSES.map((course) => (
              <article
                key={course.title}
                className="flex flex-col gap-5 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:flex-row sm:items-start sm:gap-6 sm:p-5"
              >
                {course.coverImage ? (
                  // Cover images are native 1640x924 (~16:9) — aspect-video matches
                  // that ratio almost exactly so the baked-in title text never crops.
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl sm:w-64">
                    <Image src={course.coverImage} alt="" fill sizes="(min-width: 640px) 256px, 100vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f7f7f7] sm:w-64">
                    <BookOpen className="h-8 w-8 text-[#ca3726]/40" strokeWidth={1.5} />
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-normal text-[#111827] sm:text-xl">{course.title}</h3>
                    <span className="shrink-0 text-lg font-semibold text-[#111827]">{course.price}</span>
                  </div>

                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#6b7280]">{course.format}</p>

                  <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">{course.description}</p>

                  <p className="mt-3 text-xs leading-relaxed text-[#6b7280]">
                    <span className="font-semibold text-[#4b5563]">Who it&apos;s for: </span>
                    {course.whoFor}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={course.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#111827]/15 px-4 py-2 text-xs font-semibold text-[#111827] hover:bg-[#f3f4f6] sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                      Learn more
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    {course.freeToolHref ? (
                      <Link
                        href={course.freeToolHref}
                        className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#ca3726]/10 px-3 py-1.5 text-xs font-medium text-[#ca3726] hover:bg-[#ca3726]/15"
                      >
                        The deeper version of our free Digital Twin Snapshot
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — exact Homepage/Coaching accordion component, courses-specific content */}
      <FAQ
        items={COURSES_FAQ_ITEMS}
        eyebrow="Before You Enroll"
        heading={
          <>
            Questions <span className="italic">Before You Start</span>
          </>
        }
        closingNote={
          <a
            href="https://www.calendly.com/granttate"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#555555] underline underline-offset-2 transition-colors hover:text-[#ca3726]"
          >
            Still deciding? Book a free 20-minute call with Grant and ask him directly.
          </a>
        }
      />

      <Footer />

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
