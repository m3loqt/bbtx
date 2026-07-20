"use client";

import { useState } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { SubscribeModal } from "@/app/components/SubscribeModal";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const IN_PROGRESS = [
  {
    title: "Why AI strategies stall between the boardroom and the floor",
    description:
      "Most plans fail in the handoff, not the vision. What we've seen go wrong, and what leaders do differently when it works.",
  },
  {
    title: "What actually changes when a leadership team gets AI-ready",
    description:
      "Readiness isn't a tool rollout. It's a shift in how decisions get made, and who's in the room when they do.",
  },
  {
    title: "The judgment calls no AI tool can make for you",
    description:
      "Where the technology stops and leadership has to start, drawn from real engagements, not theory.",
  },
];

export default function WhitepapersPage() {
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Header */}
      <section className="relative z-[1] w-full bg-white px-4 pb-16 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-48">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
          Resources
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
          The papers <span className="italic">aren&apos;t written yet</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed tracking-normal text-[#222222]/80 sm:text-2xl">
          We&apos;re turning what we&apos;ve learned across 100+ engagements into something worth
          your time. Nothing&apos;s live yet. Leave your email and we&apos;ll send the first one
          the day it&apos;s ready, not before.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setSubscribeOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-95"
          >
            Notify Me When It&apos;s Ready
            <ArrowUpRight className="h-[18px] w-[18px]" />
          </button>
        </div>
      </section>

      {/* What's in progress */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-[#f7f7f7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What we&apos;re working on
          </p>
          <div className="mt-10 divide-y divide-black/[0.08] border-t border-black/[0.08]">
            {IN_PROGRESS.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:gap-10 sm:py-7">
                <h3 className="text-lg font-semibold tracking-normal text-[#222222] sm:w-[45%] sm:shrink-0 sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#555555] sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm leading-relaxed text-[#555555]">
            Want to talk through one of these before it&apos;s written down?{" "}
            <a
              href="https://www.calendly.com/granttate"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#222222] underline underline-offset-2 transition-colors hover:text-[#ca3726]"
            >
              Book a conversation with Grant
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </div>
  );
}
