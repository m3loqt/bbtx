"use client";

import { useRef } from "react";
import Image from "next/image";

type Testimonial = {
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

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Grant has a rare ability to help leaders see the underlying dynamics shaping their organizations and decisions. Our conversations consistently helped me think more clearly about strategy, leadership, and how emerging technologies like AI will reshape the way we work. He is an exceptional coach and thought partner.",
    author: "Jamie Conklin",
    role: "Senior Director, General Atomics Intelligence",
    image: "/testimonials/Jamie.jpeg",
  },
  {
    quote:
      "I have worked with Grant since 2017, and his guidance has shaped many of the most important decisions of my life. His gift is helping people step back, see the bigger picture, and lead themselves through change.",
    author: "Golara Haghtalab",
    role: "Accenture",
    image: "/testimonials/golara.jpeg",
  },
  {
    quote:
      "I have been working with Grant for over a year learning his approach to artificial intelligence education. He is a quiet, gentle professional with incredible knowledge and the ability to share it.",
    author: "Terry Barnhart",
    role: "Executive Coach, San Antonio Executive Coaching",
    image: "/terry.jpeg",
  },
  {
    quote:
      "In 2007 I hired Grant Tate to help me gain a competitive edge. What I received went beyond my expectations. Grant's program for building leadership skills and strategic planning positioned my firm to weather the economic storm that hit us in 2009. Hiring Grant is one of the best investments I have made.",
    author: "Chris Kean",
    role: "President, Lincoln Surveying",
    image: "/testimonials/chris.jpeg",
  },
  {
    quote:
      "He brings his tremendous management, leadership, and coaching expertise to bear in ways that are very empowering and invigorating. Grant consistently impresses me with his focus on delivering value to his clients. I am better at what I do because of Grant.",
    author: "Heather Higgins",
    role: "2x Founding Chief of Staff",
    image: "/testimonials/heather.jpeg",
  },
  {
    quote:
      "Grant Tate has played a pivotal role in developing executive leadership skills at Indoor Biotechnologies. His work with senior scientists has been analytical, goal oriented, and has substantially developed these individuals as leaders.",
    author: "Martin Chapman",
    role: "President and CEO, InBio",
    image: "/testimonials/martin.jpeg",
  },
  {
    quote:
      "Perhaps more than any of my colleagues, I trust Grant to have a clear knowledge of how things are working now, how they could be working better, and how to make that happen.",
    author: "Jerry Hogan",
    role: "",
    image: "/testimonials/Jerry.jpeg",
  },
];

export function Testimonials() {
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (dir: "left" | "right") => {
    const el = testimonialsScrollRef.current;
    if (!el) return;

    const amount = Math.min(el.clientWidth * 0.9, el.scrollWidth - el.scrollLeft);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="relative z-[1] w-full bg-[#f7f7f7]">
      <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* Header row */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end md:gap-16">
          <h2 className="max-w-3xl text-3xl font-medium leading-[1.05] tracking-tighter text-[#222222] sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
            What{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              leaders say
            </span>{" "}
            after working with us
          </h2>
          <p className="max-w-2xl text-base leading-relaxed tracking-tight text-[#555555] sm:text-2xl md:pb-1">
          Results from real engagements with leaders and organizations who trusted BBTX to help them think clearly, move decisively, and navigate AI with confidence.
          </p>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <div className="mb-3 flex flex-row flex-wrap items-center justify-between gap-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
              CLIENT RESULTS
            </p>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollTestimonials("left")}
                className="flex h-10 w-10 items-center justify-center rounded border border-[#e5e7eb] bg-white text-[#374151] transition-colors hover:bg-[#f9fafb]"
                aria-label="Previous testimonial"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollTestimonials("right")}
                className="flex h-10 w-10 items-center justify-center rounded border border-[#e5e7eb] bg-white text-[#374151] transition-colors hover:bg-[#f9fafb]"
                aria-label="Next testimonial"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Full-bleed row: cancel section px so track aligns with label; single pl/pr matches section gutter */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <div
              ref={testimonialsScrollRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-4 pt-1 [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden pl-4 pr-4 scroll-pl-4 scroll-pr-4 sm:pl-6 sm:pr-6 sm:scroll-pl-6 sm:scroll-pr-6 lg:pl-8 lg:pr-8 lg:scroll-pl-8 lg:scroll-pr-8"
            >
              {TESTIMONIALS.map((t) => (
                <article
                  key={t.author}
                  className="flex min-w-[100%] max-w-[520px] flex-shrink-0 snap-start flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-4 sm:min-w-[84%] sm:p-6 md:min-w-[64%] lg:min-w-[48%] lg:p-8"
                >
                  <p className="mt-0 mb-4 text-lg font-semibold leading-snug text-[#111827] sm:text-xl lg:text-2xl">
                    <span
                      className="mr-1 inline-block translate-y-px text-[1.2em] font-normal leading-none text-[#ca3726] sm:mr-1.5"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    {t.quote}
                    <span
                      className="ml-1 inline-block translate-y-px text-[1.2em] font-normal leading-none text-[#ca3726] sm:ml-1.5"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      aria-hidden
                    >
                      &rdquo;
                    </span>
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f4f6] sm:h-12 sm:w-12">
                      {t.image ? (
                        <Image src={t.image} alt="" fill sizes="48px" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm font-semibold tracking-tight text-[#6b7280]" aria-hidden>
                          {initialsFromName(t.author)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">{t.author}</p>
                      {t.role ? (
                        <p className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">{t.role}</p>
                      ) : null}
                    </div>
                  </footer>
                </article>
              ))}
              {/* Extra scroll width so the last card can clear the viewport edge */}
              <div className="w-12 shrink-0 sm:w-16 lg:w-20" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
