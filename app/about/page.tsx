"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";

const PHOTO_STRIP = [
  { src: "/about/one.jpg", width: 1376, height: 977 },
  { src: "/about/two.png", width: 1448, height: 1086 },
  { src: "/about/three.png", width: 1537, height: 1023 },
  { src: "/about/four.jpg", width: 1370, height: 2048 },
  { src: "/about/five.png", width: 1537, height: 1023 },
  { src: "/about/six.jpg", width: 1684, height: 2048 },
];

const TIMELINE_ENTRIES = [
  {
    year: "1981",
    image: "/history1.png",
    title: "The Personal Computer Changes Everything",
    description:
      "Grant managed the IBM PC's introduction into Europe and Canada, his first front-row seat to a world-changing technology. The lesson that stayed with him: transformative technology only matters when leaders know how to bring their organizations with them.",
  },
  {
    year: "1993",
    image: "/history2.png",
    title: "Building Across Borders",
    description:
      "Co-founded a consulting practice in the Netherlands, helping organizations navigate change across Europe.",
  },
  {
    year: "2000",
    image: "/history3.png",
    title: "A Practice Built on Real Organizations",
    description:
      "Built a U.S. practice around organizational development and strategy for two decades.",
  },
  {
    year: "2022",
    image: "/history4.png",
    title: "A Familiar Pattern, A New Technology",
    description:
      "When ChatGPT launched, Grant recognized the shape of it immediately. He'd watched leaders navigate this kind of disruption before, in the '80s and in the '90s. He began helping leaders think clearly about AI, not chase it.",
  },
  {
    year: "2024",
    image: "/history5.png",
    title: "BBTx.AI: The Next Chapter",
    description:
      "Grant launched BBTx.AI to bring 40+ years of leadership judgment to how organizations navigate AI. Not a pivot into a new industry, the same work, applied to whatever technology leaders are wrestling with next.",
  },
];

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
      "I've sat in enough meetings where the smartest person in the room made things more complicated, not less. My job is to cut through that, tell you plainly where you stand and what to do next.",
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
      "I've watched too many consultants build a business on being needed forever. I'd rather work myself out of a job, your team should be able to lead without me in the room.",
  },
];

const VALUE_ROWS = [VALUES.slice(0, 2), VALUES.slice(2, 4)];

const PEOPLE = [
  {
    name: "Grant Tate",
    image: "/grantt.jpg",
    email: "grant@bbtx.com",
    linkedin: "https://linkedin.com/in/granttate",
    href: "/team/grant",
    description: [
      "Grant Tate is the CEO of Bridge Business Transformations, a coach, consultant, and author who helps leaders thrive in complex environments.",
      "He explores how AI is shaping people, organizations, and society, and how leaders can respond with clarity.",
      "He wrote Hand on the Shoulder, sharing lessons from his life and career on leadership and personal growth.",
    ],
  },
  {
    name: "Kaye Monroe",
    image: "/about/kaye.jpeg",
    email: "kaye@bbtx.com",
    linkedin: "https://linkedin.com/in/kayemonroe",
    href: "/team/kaye",
    description: [
      "Kaye Monroe leads KDM Coaching and Associates, supporting leaders and individuals as they define goals and follow through.",
      "She is a founder and key force behind the Minority Business Council, building community and opportunity for minority entrepreneurs.",
      "She's known in the Charlottesville region for her vision, diplomacy, and steady leadership.",
    ],
  },
  {
    name: "Mel Angelo Cortes",
    image: "/about/MEL.png",
    email: "mel@bbtx.com",
    linkedin: "https://linkedin.com/in/melangelocortes",
    href: "/team/mel",
    description: [
      "Mel Angelo Cortes supports BBTx AI across operations, systems, and execution, helping turn ideas into clear deliverables.",
      "He builds the workflows, content, and digital assets that support BBTx AI's programs and community.",
      "He focuses on making AI practical for leaders through structured implementation and simple, usable guidance.",
    ],
  },
];

export default function AboutPage() {
  const [canHover, setCanHover] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.6 });
  // Offset the floating panel above-right of the cursor (panel is h-64 w-80) so it never sits under the pointer.
  const panelX = useTransform(springX, (v) => v + 28);
  const panelY = useTransform(springY, (v) => v - 284);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const hoveredEntry = TIMELINE_ENTRIES.find((entry) => entry.year === hoveredYear) ?? null;

  return (
    <div className="min-h-screen">
      <Nav heroTheme="light" />

      {/* Header: title + one-line subhead in Grant's voice */}
      <section id="hero" className="relative z-[1] flex min-h-[38vh] w-full flex-col justify-end overflow-hidden bg-white pb-10 pt-20 sm:min-h-[42vh] sm:pb-12 lg:min-h-[46vh] lg:pb-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div className="relative px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-medium tracking-tight text-[#222222] sm:text-6xl lg:text-7xl">
            Our story
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#555555] sm:text-xl">
            Four decades of watching technology change how leaders lead, and learning what
            actually helps them adapt.
          </p>
        </div>
      </section>

      {/* Photo strip: full-bleed looping carousel of real Grant photos.
          Height complements the hero's min-h above it so the two sections
          together fill exactly one viewport on load. */}
      <section className="relative z-[1] h-[62vh] w-full overflow-hidden bg-white sm:h-[58vh] lg:h-[54vh]">
        <div className="relative left-1/2 h-full w-screen max-w-[100vw] -translate-x-1/2">
          <div
            className="flex h-full w-max gap-3 sm:gap-4"
            style={{
              animation: "logo-scroll 80s linear infinite",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {[...PHOTO_STRIP, ...PHOTO_STRIP].map((photo, i) => (
              <Image
                key={`${photo.src}-${i}`}
                src={photo.src}
                alt=""
                width={photo.width}
                height={photo.height}
                className="h-full w-auto shrink-0 object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline: numbered horizontal rows, strict chronological order */}
      <section className="relative z-[1] w-full bg-white">
        <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Our timeline
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-medium tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
            Four decades, <span className="italic">one thread</span>
          </h2>

          <div
            className="mt-12 divide-y divide-black/[0.08] border-y border-black/[0.08] sm:mt-16"
            onMouseMove={(e) => {
              if (!canHover) return;
              mouseX.set(e.clientX);
              mouseY.set(e.clientY);
            }}
          >
            {TIMELINE_ENTRIES.map((entry) => (
              <div
                key={entry.year}
                onMouseEnter={() => canHover && setHoveredYear(entry.year)}
                onMouseLeave={() => canHover && setHoveredYear(null)}
                className="grid grid-cols-1 gap-2 py-5 sm:gap-3 sm:py-6 lg:grid-cols-[280px_0.85fr_1.15fr] lg:items-baseline lg:gap-x-20 lg:gap-y-0 lg:py-8"
              >
                <p className="text-4xl font-semibold tracking-normal text-[#ca3726] sm:text-5xl lg:text-6xl">
                  {entry.year}
                </p>
                <h3 className="text-xl font-semibold tracking-normal text-[#222222] sm:text-2xl">
                  {entry.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#555555] sm:text-base lg:max-w-2xl lg:pl-10">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end sm:mt-12">
            <Link
              href="/team/grant"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#ca3726] transition-colors hover:text-[#222222] sm:text-base"
            >
              Read Grant Tate&apos;s full background
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          {/* Cursor-follow image — desktop hover only, never affects layout */}
          {canHover && (
            <motion.div
              className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-64 w-80 overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] lg:block"
              style={{ x: panelX, y: panelY }}
              animate={{ opacity: hoveredEntry ? 1 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <AnimatePresence mode="sync">
                {hoveredEntry && (
                  <motion.div
                    key={hoveredEntry.year}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={hoveredEntry.image}
                      alt=""
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* What drives us: photo left, numbered 2x2 grid right */}
      <section className="relative z-[1] w-full overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What drives us
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-medium tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
            The judgment behind{" "}
            <span className="italic">the work</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Left: photo — stretches to match the grid's height at lg */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[16/11] lg:aspect-auto lg:h-full">
              <Image
                src="/grant.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "70% 20%" }}
              />
            </div>

            {/* Right: numbered 2x2 grid with dividers */}
            <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {VALUE_ROWS.map((row, ri) => (
                <div key={ri} className="grid gap-x-10 gap-y-8 py-8 sm:grid-cols-2 sm:py-10">
                  {row.map((v) => (
                    <div key={v.num}>
                      <p className="text-xs font-semibold tracking-wide text-[#ca3726]">{v.num}</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-normal text-[#222222] sm:text-2xl">
                        {v.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="relative z-[1] px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mb-10 text-center sm:mb-16 lg:mb-20">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">People</p>
            <h2 className="text-3xl font-medium tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
              The team behind{" "}
              <span className="italic">BBTx</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PEOPLE.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Dark overlay, behind the glass panel */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
                  aria-hidden
                />
                {/* Glass panel — inset from the card edges, always visible, holds name/socials/description */}
                <div className="absolute inset-x-3 bottom-3 flex flex-col rounded-lg border border-white/10 bg-black/25 p-4 backdrop-blur-sm transition-all duration-300 sm:inset-x-4 sm:bottom-4 sm:p-5">
                  <h3 className="text-lg font-semibold tracking-normal text-white sm:text-xl">
                    {p.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `mailto:${p.email}`;
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
                      aria-label={`Email ${p.name}`}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <path d="m22 6-10 7L2 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(p.linkedin, "_blank", "noopener,noreferrer");
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
                      aria-label={`${p.name} on LinkedIn`}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {p.description.map((line, i) => (
                      <p key={i} className="text-sm leading-snug text-white/90 sm:text-base">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Link>
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
