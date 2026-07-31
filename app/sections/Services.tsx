"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { Cpu, Search, TrendingUp, Users, Workflow } from "lucide-react";

const SERVICES = [
  {
    icon: Search,
    title: "Organizational Assessment and Analysis",
    description:
      "We don't simply gather data. We interpret results in the context of your goals, history, and operating realities, a clear picture of what's working and where focused action pays off.",
    href: "/services/organizational-assessment",
  },
  {
    icon: Users,
    title: "Leadership, Management, and Team Development",
    description:
      "Practical, confidential coaching grounded in the real challenges leaders face, not self-awareness for its own sake, but better judgment and stronger leadership impact.",
    href: "/services/leadership-development",
  },
  {
    icon: Cpu,
    title: "AI Integration and Innovation",
    description:
      "AI doesn't replace leadership judgment. We help you move beyond scattered experimentation toward AI that actually improves the decisions that matter.",
    href: "/services/ai-integration",
  },
  {
    icon: Workflow,
    title: "Implementation and Change Support",
    description:
      "Good ideas fail when implementation is poorly managed. We help you anticipate resistance, sequence the work, and adjust as reality unfolds.",
    href: "/services/implementation-support",
  },
];

const FEATURED = {
  icon: TrendingUp,
  title: "Strategy and Advisory Services",
  description:
    "We help you distinguish between broad aspirations and strategies that actually guide decisions, investment, and behavior. Ongoing, confidential, and grounded in your real operating realities, a thought partner for the decisions that matter most.",
  href: "/services/strategy-advisory",
};

const GRID_POSITION = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-2 lg:row-start-2",
];

export function Services() {
  return (
    <section className="relative z-[1] bg-[#f7f7f7]">
      <div className="relative z-[1] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 xl:px-16 2xl:px-24">
        {/* Header block, full width to match the Results/Hero sections above */}
        <div className="w-full text-center">
          <p className="mb-4 text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            WHAT WE DO
          </p>
          <h2 className="text-4xl font-medium leading-tight tracking-tight text-[#222222] sm:text-[2.75rem] md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            Practical guidance for a{" "}
            <span
              className="italic"
            >
              complex
            </span>{" "}
            world
          </h2>
          <p className="mx-auto mt-6 max-w-5xl text-xl leading-relaxed tracking-normal text-[#222222] sm:text-2xl">
            Five ways we help leaders and organizations move from insight to
            action: strategy, leadership, and responsible AI, all grounded in
            real evidence.
          </p>
        </div>

        {/* Cards: 4 service cards (2x2) + 1 featured card spanning both rows */}
        <div className="mt-12 w-full lg:mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.15fr] lg:grid-rows-2 lg:gap-5">
            {SERVICES.map((service, i) => (
              <Link
                key={service.title}
                href={service.href}
                className={`group flex flex-col rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)] sm:p-6 lg:p-7 ${GRID_POSITION[i]}`}
              >
                <service.icon className="h-7 w-7 text-[#ca3726]" strokeWidth={1.75} />
                <h3 className="mt-5 text-lg font-semibold tracking-normal text-[#222222] sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-[15px]">
                  {service.description}
                </p>
              </Link>
            ))}

            {/* Featured service card */}
            <Link
              href={FEATURED.href}
              className="group relative grid min-h-[320px] grid-rows-[1fr_auto] overflow-hidden rounded-xl border border-white/10 sm:col-span-2 sm:min-h-[380px] lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:col-span-1 lg:min-h-0"
            >
              {/* Background photo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/serv4.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/45" />
              </div>

              {/* Top half — just the photo showing through */}
              <div className="relative z-10" />

              {/* Bottom half — glass panel with text, inset so it doesn't sit flush against the card edges */}
              <div className="relative z-10 mx-3 mb-3 flex flex-col justify-center rounded-lg border border-white/10 bg-black/25 p-6 backdrop-blur-sm sm:mx-4 sm:mb-4 sm:p-7 lg:p-9">
                <h3 className="text-2xl font-medium tracking-normal text-white sm:text-3xl">
                  {FEATURED.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
                  {FEATURED.description}
                </p>
                <span className="mt-6 inline-flex w-fit items-center gap-1.5 self-end text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </div>

          {/* Bottom bar */}
          <div className="mt-4 flex flex-col items-start gap-4 rounded-xl border border-black/[0.06] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-[15px] font-semibold tracking-normal text-[#222222] sm:text-base">
                Not sure which is right for you?
              </p>
              <p className="mt-1 text-sm text-[#555555]">
                Get your free Digital Twin Snapshot, or talk to us about your situation.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Link
                href="/digital-twin-snapshot"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ca3726] px-4 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
              >
                Get Your Digital Twin Snapshot
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="https://www.calendly.com/granttate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/[0.1] bg-white px-4 py-2.5 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-80"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
