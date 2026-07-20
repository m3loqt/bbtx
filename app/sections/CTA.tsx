"use client";

import { ArrowUpRight } from "@/app/components/ArrowIcon";
import Image from "next/image";

export function CTA() {
  return (
    <section className="relative z-[1] flex min-h-[640px] w-full items-center overflow-hidden sm:min-h-[720px] lg:min-h-[820px]">
      {/* Full-bleed background */}
      <Image src="/newcta.png" alt="" fill sizes="100vw" className="object-cover" aria-hidden />

      <div className="relative z-[1] w-full px-4 py-20 sm:w-4/5 sm:px-10 sm:py-24 lg:w-1/2 lg:px-16 lg:py-28">
        <h2 className="text-5xl font-medium leading-tight tracking-tight text-white sm:text-[3.75rem] md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[5.5rem]">
          Ready to thrive in a <span className="italic">complex world</span><span className="ml-2">?</span>
        </h2>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed tracking-normal text-white/95 sm:text-2xl lg:mt-10">
          Talk to us about your goals. We&apos;ll help you assess readiness, choose the right path, and deliver measurable results.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-3 lg:mt-14">
          <a
            href="https://www.calendly.com/granttate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95"
          >
            Schedule a Consultation
            <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("openContact"))}
            className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
          >
            Send us a Message
          </button>
        </div>
      </div>
    </section>
  );
}
