"use client";

import { useState } from "react";
import { TestimonialGrid } from "@/app/components/TestimonialGrid";

const TESTIMONIALS = [
  {
    quote:
      "We saw a 200% increase in Sales Qualified Leads after integrating their AI strategy.",
    name: "Reza Schott",
    title: "Head of Marketing",
    company: "OPP",
    initials: "RS",
  },
  {
    quote:
      "This is the first consulting partner we've worked with where I see measurable results.",
    name: "Machiel Kunst",
    title: "Director",
    company: "Bluebird",
    initials: "MK",
  },
  {
    quote:
      "BBTx helped us scale our AI initiatives with clear roadmaps and hands-on support.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "Nexora",
    initials: "SC",
  },
  {
    quote:
      "From strategy to implementation, the team delivered measurable impact in under six months.",
    name: "James Walsh",
    title: "CTO",
    company: "Ventura",
    initials: "JW",
  },
  {
    quote:
      "Their approach to AI integration is pragmatic and results-driven. Highly recommend.",
    name: "Elena Rodriguez",
    title: "Head of Product",
    company: "Axiom",
    initials: "ER",
  },
];

const CARDS_PER_PAGE = 3;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Testimonials() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(TESTIMONIALS.length / CARDS_PER_PAGE);
  const goPrev = () => setPage((p) => (p <= 0 ? totalPages - 1 : p - 1));
  const goNext = () => setPage((p) => (p >= totalPages - 1 ? 0 : p + 1));

  return (
    <section className="relative z-[1] bg-[#f7f7f7]">
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
      <div className="relative z-[1] flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="w-full">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Testimonials
          </p>
          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            Don&apos;t take{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              our word
            </span>{" "}
            for it.
          </h2>
          {/* Description + buttons on same row */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="max-w-2xl text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
              Here&apos;s what leaders say after working with BBTx.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.12] bg-white text-[#222222] transition-colors hover:bg-[#f0f0f0]"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.12] bg-white text-[#222222] transition-colors hover:bg-[#f0f0f0]"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-10 lg:mt-14">
            <TestimonialGrid testimonials={TESTIMONIALS} page={page} />
          </div>
        </div>
      </div>
    </section>
  );
}
