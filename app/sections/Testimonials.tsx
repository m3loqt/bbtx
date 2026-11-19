"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { TestimonialSubmissionModal } from "@/app/components/TestimonialSubmissionModal";
import { personAlt } from "@/lib/seo/image-alt";

export type Testimonial = {
  /** Short pull-quote pulled verbatim/near-verbatim from `quote`, shown above it as a mini headline */
  headline: string;
  quote: string;
  author: string;
  role: string;
  /** Omit when no portrait asset; initials shown instead */
  image?: string;
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export const TESTIMONIALS: Testimonial[] = [
  {
    headline: "An exceptional coach and thought partner",
    quote:
      "Grant has a rare ability to help leaders see the underlying dynamics shaping their organizations and decisions. Our conversations consistently helped me think more clearly about strategy, leadership, and how emerging technologies like AI will reshape the way we work. He is an exceptional coach and thought partner.",
    author: "Jamie Conklin",
    role: "Senior Director, General Atomics Intelligence",
    image: "/testimonials/Jamie.jpeg",
  },
  {
    headline: "Shaped the most important decisions of my life",
    quote:
      "I have worked with Grant since 2017, and his guidance has shaped many of the most important decisions of my life. His gift is helping people step back, see the bigger picture, and lead themselves through change.",
    author: "Golara Haghtalab",
    role: "Accenture",
    image: "/testimonials/golara.jpeg",
  },
  {
    headline: "Incredible knowledge and the ability to share it",
    quote:
      "I have been working with Grant for over a year learning his approach to artificial intelligence education. He is a quiet, gentle professional with incredible knowledge and the ability to share it.",
    author: "Terry Barnhart",
    role: "Executive Coach, San Antonio Executive Coaching",
    image: "/terry.jpeg",
  },
  {
    headline: "I am better at what I do because of Grant",
    quote:
      "He brings his tremendous management, leadership, and coaching expertise to bear in ways that are very empowering and invigorating. Grant consistently impresses me with his focus on delivering value to his clients. I am better at what I do because of Grant.",
    author: "Heather Higgins",
    role: "2x Founding Chief of Staff",
    image: "/testimonials/heather.jpeg",
  },
  {
    headline: "A pivotal role in developing executive leadership",
    quote:
      "Grant Tate has played a pivotal role in developing executive leadership skills at Indoor Biotechnologies. His work with senior scientists has been analytical, goal oriented, and has substantially developed these individuals as leaders.",
    author: "Martin Chapman",
    role: "President and CEO, InBio",
    image: "/testimonials/martin.jpeg",
  },
  {
    headline: "One of the best investments I have made",
    quote:
      "In 2007 I hired Grant Tate to help me gain a competitive edge. What I received went beyond my expectations. Grant's program for building leadership skills and strategic planning positioned my firm to weather the economic storm that hit us in 2009. Hiring Grant is one of the best investments I have made.",
    author: "Chris Kean",
    role: "President, Lincoln Surveying",
    image: "/testimonials/chris.jpeg",
  },
  {
    headline: "From knowing it all to coaching and mentoring",
    quote:
      "The management training helped me shift my mindset from being the person who 'knows and does it all' to becoming a coach and mentor. Great management is about helping people develop the confidence, skills, and independence to find the answers themselves. I'm already putting the lessons into practice.",
    author: "Sayeh Agah",
    role: "Principal Scientist, InBio",
    image: "/testimonials/sayeh.jpeg",
  },
];

// Strongest outcome-oriented testimonial: names a concrete result (weathering
// the 2009 downturn) and frames the engagement as one of the client's best
// investments. Change this constant to feature a different testimonial later.
const FEATURED_TESTIMONIAL_AUTHOR = "Chris Kean";

// Side-panel copy for the featured card — distinct from the section subtitle
// above it, drawn from Grant's approved team-page bio rather than invented.
const FEATURED_PANEL_BLURB =
  "Grant is a coach, consultant, and author who has spent his career helping leaders navigate complexity with clarity.";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 1.5l1.98 4.16 4.52.58-3.32 3.2.85 4.56L8 11.9l-4.03 2.1.85-4.56-3.32-3.2 4.52-.58L8 1.5z" />
    </svg>
  );
}

function QuoteMarkIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 9.5c0-2.5 1.2-4.2 3.2-5M3 9.5c0 1.4.9 2.3 2 2.3s2-.9 2-2.1-.8-2-1.8-2M9.5 9.5c0-2.5 1.2-4.2 3.2-5M9.5 9.5c0 1.4.9 2.3 2 2.3s2-.9 2-2.1-.8-2-1.8-2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="rounded-2xl border border-black/[0.06] bg-white p-6 lg:p-8">
      <h3 className="text-lg font-semibold leading-snug text-[#111827] sm:text-xl">{t.headline}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4b5563]">{t.quote}</p>
      <footer className="mt-6 flex items-center gap-3">
        <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f4f6]">
          {t.image ? (
            <Image src={t.image} alt={personAlt(t)} aria-hidden fill sizes="44px" className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-semibold tracking-normal text-[#6b7280]" aria-hidden>
              {initialsFromName(t.author)}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-[#111827]">{t.author}</p>
          {t.role ? <p className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">{t.role}</p> : null}
        </div>
      </footer>
    </article>
  );
}

// Same card shell as TestimonialCard (border, radius, background) so it
// still reads as part of the same system, with a larger, editorial-style
// interior: a quote-mark accent and bigger type.
//
// On lg+ the card sits in the right half of the section header row and
// stretches to the height of the heading/description/button column beside
// it (h-full + the quote pinned top, author pinned bottom). The side blurb
// about Grant doesn't fit at half width without making the card taller than
// that column, so it only shows below lg, where the card is full width and
// the blurb stacks under the quote.
function FeaturedTestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
      <div className="flex flex-1 flex-col gap-10">
        <div className="flex flex-1 gap-4 sm:gap-6">
          <span
            className="flex-shrink-0 font-serif text-4xl leading-none text-[#ca3726] sm:text-5xl"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-8">
            <p className="text-lg font-medium leading-relaxed text-[#111827] sm:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
              {t.quote}
            </p>

            <footer className="flex items-center gap-4">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-[#f3f4f6] sm:h-16 sm:w-16">
                {t.image ? (
                  <Image src={t.image} alt={personAlt(t)} aria-hidden fill sizes="64px" className="h-full w-full object-cover" />
                ) : (
                  <span
                    className="flex h-full w-full items-center justify-center text-base font-semibold text-[#6b7280]"
                    aria-hidden
                  >
                    {initialsFromName(t.author)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-[#111827] sm:text-lg">{t.author}</p>
                {t.role ? (
                  <p className="text-xs font-medium uppercase tracking-wider text-[#6b7280] sm:text-sm">{t.role}</p>
                ) : null}
                <div className="mt-1.5 flex items-center gap-0.5" aria-label="5 out of 5" role="img">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5 text-[#f2b400]" />
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f7f7]">
            <QuoteMarkIcon className="h-4 w-4 text-[#6b7280]" />
          </div>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-[#4b5563]">{FEATURED_PANEL_BLURB}</p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const featured = TESTIMONIALS.find((t) => t.author === FEATURED_TESTIMONIAL_AUTHOR)!;
  const supporting = TESTIMONIALS.filter((t) => t.author !== FEATURED_TESTIMONIAL_AUTHOR);

  return (
    <section className="relative z-[1] w-full border-t border-black/[0.06] bg-[#f7f7f7]">
      <div className="px-4 pt-12 pb-12 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8 lg:pt-28 lg:pb-28 xl:px-16 2xl:px-24">
        {/* Header row. Below lg everything stacks: heading, description +
            button, then the featured card. From lg up it becomes two equal
            columns: heading/description/button on the left (heading pinned
            to the top, description + button pinned to the bottom) and the
            featured card on the right, stretched to the same height. */}
        <div className="flex flex-col gap-10 sm:gap-14 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="flex flex-col gap-8 lg:justify-between lg:gap-10">
            <h2 className="text-3xl font-medium leading-[1.05] tracking-tight text-[#222222] sm:text-5xl xl:text-6xl 2xl:text-[4.25rem]">
              What <span className="italic">leaders say</span> after working with us
            </h2>
            <div className="flex flex-col items-start gap-4">
              <p className="text-xl leading-relaxed tracking-normal text-[#555555] sm:text-2xl lg:text-xl xl:text-2xl">
                Results from real engagements with leaders who trusted BBTx to help them think clearly, decide well, and lead their organizations through change
              </p>
              <button
                type="button"
                onClick={() => setSubmissionOpen(true)}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#ca3726] px-4 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
              >
                Share Your Experience
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <FeaturedTestimonialCard t={featured} />
        </div>

        {/* Supporting grid: a plain responsive CSS grid (not the old
            ghost-column wall) so it stays elegant at any testimonial count:
            a trailing card in the final row just left-aligns under the grid
            instead of needing a centering hack, and align-items: stretch
            (grid's default) keeps every row's card heights matched. */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {supporting.map((t) => (
            <TestimonialCard key={t.author} t={t} />
          ))}
        </div>
      </div>

      <TestimonialSubmissionModal open={submissionOpen} onClose={() => setSubmissionOpen(false)} />
    </section>
  );
}
