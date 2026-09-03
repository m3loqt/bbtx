"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { ContactModal } from "@/app/components/ContactModal";

export function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="hero" className="relative z-[1] grid min-h-screen grid-rows-[1fr_auto] overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/grant.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% 20%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/45" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent sm:h-36 lg:h-44" />
      </div>

      {/* Top half — just the photo showing through */}
      <div className="relative z-10" />

      {/* Bottom half — glassmorphism panel */}
      <div className="relative z-10 flex flex-col justify-center border-t border-white/10 bg-black/35 px-4 py-8 backdrop-blur-xl sm:px-6 lg:px-8">
        <p className="mb-5 text-sm font-normal text-white/70 sm:mb-8 sm:text-base">
          40+ Years of Executive Coaching &amp; Business Consulting
        </p>

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-[11fr_9fr] md:items-start">
          {/* Left: headline */}
          <h1 className="min-w-0 text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.4rem] xl:text-[3.85rem]">
            Helping leaders and organizations transform their work with{" "}
            <span className="whitespace-nowrap italic tracking-normal">40+ years</span> of experience
          </h1>

          {/* Right: subhead + CTA */}
          <div className="flex min-w-0 max-w-[39rem] flex-col md:ml-8 lg:ml-20">
            <p className="text-lg leading-relaxed tracking-normal text-white/85 sm:text-xl">
              We&apos;ve helped 100+ organizations plan and implement strategy, leadership, and AI initiatives that
              improve operations, decision-making, and long-term value, with measurable results in as little
              as 12 weeks.
            </p>
            <div className="mt-6">
              <a
                href="https://www.calendly.com/granttate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-95"
              >
                Schedule a Consultation
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
