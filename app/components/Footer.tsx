"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const FOOTER_NAV = [
  {
    heading: "MAIN PAGES",
    links: [
      { label: "Strategy & Roadmap", href: "#" },
      { label: "Implementation & Integration", href: "#" },
      { label: "Data & Measurement", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Cases", href: "#" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "Resources", href: "#" },
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "CONTACT & OTHER",
    links: [
      { label: "Talk to us", href: "#" },
      { label: "All Services", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#222222] text-[#e8e8e8]">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Top: logo + newsletter (left 60%), nav columns (right 40%) */}
        <div className="grid gap-10 lg:grid-cols-[6fr_4fr] lg:gap-16">
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/node.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain opacity-90"
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                BBTx Consulting
              </span>
            </a>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#e8e8e8]">
                Subscribe for our newsletter
              </h3>
              <form
                className="mt-3 flex w-full max-w-[408px] items-center gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="min-w-0 flex-1 rounded-lg border border-[#444] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder:text-[#888] focus:outline-none focus:ring-0"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-[#222222] transition-opacity hover:opacity-90 sm:h-12 sm:w-12"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </form>
              <p className="mt-2 text-xs text-[#999]">
                Your information is never disclosed to third parties.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 text-right sm:grid-cols-3">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading} className="text-right">
                <h3 className="text-xs font-normal uppercase tracking-wider text-[#e8e8e8]">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-[#b8b8b8] transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: copyright left, social links right; then legal; then design credit */}
        <div className="mt-12 border-t border-[#333] pt-8 lg:mt-16 lg:pt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-[#888]">
              © BBTx Consulting {new Date().getFullYear()}, All Rights Reserved
            </span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#555] text-[#b8b8b8] transition-colors hover:border-[#e8e8e8] hover:text-white"
                aria-label="Facebook"
              >
                <span className="text-sm font-semibold">f</span>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#555] text-[#b8b8b8] transition-colors hover:border-[#e8e8e8] hover:text-white"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-[#333] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#888]">
              We help organizations assess AI readiness, build strategy, and scale implementation for long-term value.
            </p>
            <p className="text-sm text-[#888]">Designed by BBTx</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
