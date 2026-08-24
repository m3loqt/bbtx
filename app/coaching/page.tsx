"use client";

import { useState } from "react";
import Image from "next/image";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { FAQ } from "@/app/sections/FAQ";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { WaitlistModal } from "@/app/components/WaitlistModal";
import { COACHING_FAQ_ITEMS } from "@/app/coaching/coaching-faq-data";

const WHY_CARDS = [
  {
    title: "Shaped by Your Situation",
    description:
      "Coaching starts with what's actually happening in your organization, so the guidance fits your real constraints, not a generic playbook.",
  },
  {
    title: "Available When It Matters",
    description:
      "You have direct access between sessions, so when a real decision comes up on a Tuesday afternoon, you're not waiting three weeks for the next scheduled call.",
  },
  {
    title: "Grant, Not a Proxy",
    description:
      "Every session is with Grant himself, drawing on forty years of actually leading through decisions like yours.",
  },
  {
    title: "Built Around How You Work",
    description:
      "Individual coaching or a small group cohort, whichever way you actually want to work through this.",
  },
];

// One shared shape for each tier — tag, title, price, description, features,
// a closing note, an optional fine-print row, then a CTA.
type Plan = {
  tag?: string;
  title: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  note?: string;
  cta: string;
  ctaHref: string;
  ctaVariant: "solid" | "outline";
  /** Renders as a frosted gray-glass panel over the section's texture instead
   * of a solid white card. */
  glass?: boolean;
};

const PLANS: Plan[] = [
  {
    tag: "Recommended",
    title: "Individual Coaching",
    price: "$3,500",
    priceNote: "one-time engagement",
    description:
      "One-on-one time with Grant, built around your specific situation rather than a generic curriculum.",
    features: [
      "A diagnostic session to map your path",
      "Ongoing 1:1 sessions with Grant",
      "Direct access between sessions",
      "40+ years of leadership experience",
    ],
    note: "Grant takes a limited number of 1:1 clients at a time.",
    cta: "Book Individual Coaching",
    ctaHref: "https://chaoticconfluence.gumroad.com/l/management-development-program-individual-coaching",
    ctaVariant: "solid",
  },
  {
    tag: "Coming Soon",
    title: "Group Cohort",
    price: "$999",
    priceNote: "per person",
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
    ctaHref: "",
    ctaVariant: "outline",
    glass: true,
  },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5 8l2.5 2.5L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CoachingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Section 1A — Hero: photo touches the top edge (nav overlays transparently, like other hero sections), inset on left/right/bottom only */}
      <section id="hero" className="relative z-[1] flex min-h-screen w-full flex-col bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
        <div className="relative grid w-full flex-1 grid-rows-[1fr_auto] overflow-hidden rounded-b-[28px]">
          {/* Background photo */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/about/two.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "55% 25%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/45" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent sm:h-36 lg:h-44" />
          </div>

          {/* Top half — just the photo showing through */}
          <div className="relative z-10" />

          {/* Bottom half — glassmorphism panel, matching the Homepage hero */}
          <div className="relative z-10 flex flex-col justify-end border-t border-white/10 bg-black/35 px-6 py-8 backdrop-blur-xl sm:px-10 sm:py-10 lg:px-14">
            <h1 className="max-w-3xl text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.4rem] xl:text-[3.85rem]">
              You don&apos;t have to make your hardest calls alone
            </h1>
          </div>

          {/* Testimonial — sits outside the glass panel's flow so it overlaps its height, bottom-aligned with the headline */}
          <article className="absolute bottom-8 right-6 z-20 hidden max-w-[calc(100%-3rem)] items-stretch gap-5 rounded-2xl border border-white/20 bg-white/10 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:bottom-10 sm:right-10 sm:flex sm:max-w-2xl sm:p-8 lg:right-14">
            <div className="relative w-32 shrink-0 overflow-hidden rounded-xl bg-white/10 sm:w-36">
              <Image src="/testimonials/golara.jpeg" alt="" fill sizes="144px" className="object-cover" />
            </div>
            <div>
              <p className="text-base leading-snug text-white sm:text-lg">
                <span
                  className="mr-1 inline-block translate-y-px text-[1.2em] font-normal leading-none text-white"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                I have worked with Grant since 2017, and his guidance has shaped many of the most
                important decisions of my life. His gift is helping people step back, see the
                bigger picture, and lead themselves through change
                <span
                  className="ml-1 inline-block translate-y-px text-[1.2em] font-normal leading-none text-white"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  aria-hidden
                >
                  &rdquo;
                </span>
              </p>
              <footer className="mt-3">
                <p className="text-sm font-semibold text-white">Golara Haghtalab</p>
                <p className="text-xs font-medium uppercase tracking-wider text-white/70">Accenture</p>
              </footer>
            </div>
          </article>
        </div>
      </section>

      {/* Section 1B — Why This Exists: header + image on the left, numbered list on the right */}
      <section className="relative z-[1] flex w-full flex-col justify-center bg-[#f7f7f7] px-3 py-14 sm:px-4 sm:py-16 lg:px-5 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[11fr_9fr] lg:items-start lg:gap-16">
          {/* Left: headline + photo */}
          <div>
            <h2 className="text-[1.615rem] font-medium leading-snug tracking-tight text-[#222222] sm:text-[2.065rem] lg:text-[2.215rem]">
              Most leaders make their hardest decisions <span className="italic">alone</span>,
              without anyone in the room who has actually led through one before. That&apos;s
              exactly the seat Grant takes
            </h2>
            <div className="mt-8 flex w-full items-stretch gap-3 sm:mt-10">
              <div className="relative aspect-[16/11] w-[62%] shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src="/about/one.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 28vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-2xl">
                <Image
                  src="/about/six.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 14vw, 28vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: numbered list */}
          <div className="max-w-2xl divide-y divide-black/[0.08] border-t border-black/[0.08] lg:ml-10">
            {WHY_CARDS.map((card, i) => (
              <div key={card.title} className="flex items-start gap-6 py-5 sm:gap-8 sm:py-6">
                <p className="mr-8 shrink-0 text-4xl font-bold leading-none tracking-tight text-[#ca3726] sm:mr-10 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-normal text-[#222222] sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555555] sm:text-base">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Pricing */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#f7f7f7] px-3 py-20 sm:px-4 sm:py-24 lg:px-5 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-5 h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 sm:h-20 sm:w-20">
            <Image
              src="/about/six.jpg"
              alt=""
              fill
              sizes="80px"
              className="object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
          </div>
          <h2 className="text-4xl font-medium leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
            Work Directly with Grant
          </h2>

          {/* Short pull-quote — fills the space the third card left behind and
              reinforces the offer instead of introducing a new product. */}
          <p className="mt-6 max-w-xl text-lg italic leading-relaxed text-[#555555] sm:text-xl">
            <span
              className="mr-1 inline-block translate-y-px text-[1.2em] font-normal not-italic leading-none text-[#ca3726]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              aria-hidden
            >
              &ldquo;
            </span>
            I am better at what I do because of Grant
            <span
              className="ml-1 inline-block translate-y-px text-[1.2em] font-normal not-italic leading-none text-[#ca3726]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              aria-hidden
            >
              &rdquo;
            </span>
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#555555]/70">
            Heather Higgins, 2x Founding Chief of Staff
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-12 grid max-w-[100rem] grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-[11fr_9fr] lg:gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.title}
              id={plan.title === "Group Cohort" ? "group-cohort" : undefined}
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border px-7 py-10 sm:px-9 sm:py-12 lg:px-12 lg:py-14 ${
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

                <h3 className="text-lg font-semibold tracking-normal text-[#111827] sm:text-xl">
                  {plan.title}
                </h3>
                <p className="mt-2 text-5xl font-semibold tracking-normal text-[#111827] sm:text-6xl">
                  {plan.price}{" "}
                  <span className="text-base font-normal text-[#555555] sm:text-lg">
                    {plan.priceNote}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base">
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#222222] sm:text-base">
                      <CheckIcon className="h-4 w-4 shrink-0 text-[#ca3726]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* mt-auto pins this row to the bottom of the card regardless of how much
                    copy sits above it, so both rows line up across the cards. */}
                <div className="mt-auto flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {plan.note ? (
                    <p className="text-sm leading-relaxed text-[#555555]">
                      {plan.note}
                    </p>
                  ) : (
                    <span />
                  )}
                  {plan.title === "Group Cohort" ? (
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
      </section>


      {/* Section 3 — FAQ: exact Homepage accordion component, coaching-specific content */}
      <FAQ
        items={COACHING_FAQ_ITEMS}
        eyebrow="Before You Start"
        heading={
          <>
            Quick <span className="italic">Questions</span>
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
