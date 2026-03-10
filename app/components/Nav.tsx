"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "./ArrowIcon";
import { ContactModal } from "./ContactModal";

const navLinks = [
  { label: "Services", hasDropdown: true, href: "#" },
  { label: "Resources", hasDropdown: true, href: "#" },
  { label: "About", hasDropdown: false, href: "/about" },
  { label: "Community", hasDropdown: false, href: "/community" },
];

const MOBILE_NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
];

const DROPDOWNS: Record<
  string,
  { title: string; description: string; href?: string }[]
> = {
  Services: [
    {
      title: "Transformational Strategy & Implementation Plan",
      description:
        "Turn AI ambition into a clear strategy your leadership can execute. Focused priorities, ownership, and a practical path forward.",
      href: "/services/strategy-roadmap",
    },
    {
      title: "Organizational AI Assessment",
      description:
        "Understand where AI can actually create value in your organization. Identify gaps, risks, and the opportunities worth pursuing.",
      href: "/services/organizational-ai-assessment",
    },
    {
      title: "AI Organizational Model",
      description:
        "Design how AI fits into your organization and decision making. Create alignment between teams, initiatives, and strategy.",
      href: "/services/ai-organizational-model",
    },
  ],
  Resources: [
    {
      title: "Blogs",
      description:
        "Insights on AI strategy, implementation, and leadership decisions. Lessons drawn from real work with organizations.",
      href: "/blog",
    },
    {
      title: "Newsletter",
      description:
        "A short weekly briefing from our work in the field. Ideas and observations for leaders navigating AI.",
      href: "/newsletter",
    },
  ],
};

export function Nav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string, hasDropdown: boolean) => {
    if (!hasDropdown) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
    setPanelVisible(false);
  };

  const handleLeave = () => {
    setPanelVisible(false);
    setActiveDropdown(null);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!activeDropdown) return;
    const id = requestAnimationFrame(() => setPanelVisible(true));
    return () => cancelAnimationFrame(id);
  }, [activeDropdown]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const openContact = () => {
      setMobileOpen(false);
      setContactOpen(true);
    };
    window.addEventListener("openContact", openContact);
    return () => window.removeEventListener("openContact", openContact);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  const dropdownItems = activeDropdown ? DROPDOWNS[activeDropdown] : null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full px-3 pt-2.5 sm:px-6 sm:pt-[18px] lg:px-8">
      <div
        className={`relative mx-auto max-w-[960px] ${dropdownItems ? "pb-[420px]" : ""} ${mobileOpen ? "pb-[520px] lg:pb-0" : ""}`}
        onMouseLeave={handleLeave}
      >
        <div className="relative">
          <header
            className={`flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white px-2.5 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:gap-6 sm:px-4 sm:py-3.5 lg:gap-8 lg:px-5 ${contactOpen ? "relative z-[250]" : ""}`}
          >
          <a href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Image
              src="/node.png"
              alt=""
              width={40}
              height={40}
              className="h-7 w-7 object-contain sm:h-9 sm:w-9"
            />
            <span className="text-sm font-bold tracking-tight text-[#222222] sm:text-base lg:text-lg">
              BBTx Consulting
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-4 lg:flex lg:gap-5">
            {navLinks.map(({ label, hasDropdown, href }) =>
              hasDropdown ? (
                <button
                  key={label}
                  type="button"
                  onMouseEnter={() => handleEnter(label, hasDropdown)}
                  className={`relative flex items-center gap-1 text-[15px] font-normal transition-colors ${
                    activeDropdown === label
                      ? "text-[#222222]"
                      : "text-[#222222] hover:text-[#555]"
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-[#222222]">
                    <ChevronDown />
                  </span>
                </button>
              ) : (
                <a
                  key={label}
                  href={href ?? "#"}
                  className="relative flex items-center gap-1 text-[15px] font-normal text-[#222222] transition-colors hover:text-[#555]"
                >
                  {label}
                </a>
              )
            )}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="text-[15px] font-normal text-[#222222] transition-colors hover:text-[#555]"
            >
              Contact
            </button>
          </div>

          {/* Right side: hamburger (mobile) + CTA */}
          <div className="flex items-center gap-2">
            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-black/[0.08] bg-white text-[#222222] transition-colors hover:bg-[#f7f7f7] sm:h-9 sm:w-9 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>

            {/* CTA button — hidden on mobile (menu has its own full-width CTA) */}
            <a
              href="/assessment"
              className="hidden shrink-0 items-center gap-2 rounded-lg bg-[#ca3726] px-4 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95 sm:flex"
            >
              Start assessment
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </a>
          </div>
        </header>

        {/* Desktop dropdown */}
        {dropdownItems && (
          <div className="pointer-events-auto hidden lg:block">
            <div
              className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-lg border border-black/[0.06] bg-[#f7f7f7] shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out ${
                panelVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[-8px] opacity-0"
              }`}
            >
              <div
                className={`grid gap-2 p-3 sm:gap-3 sm:p-4 ${dropdownItems?.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
              >
                {dropdownItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href ?? "#"}
                    className="group flex min-h-[150px] flex-col justify-between rounded-lg border border-black/[0.06] bg-white px-4 py-4 text-left transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)] sm:min-h-[170px] sm:px-5 sm:py-5"
                  >
                    <div>
                      <p className="text-sm font-semibold tracking-tight text-[#222222] sm:text-[15px]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#555555] sm:text-[13px]">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ca3726] text-white transition-colors group-hover:bg-[#b02f21]">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        <div
          className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out lg:hidden ${
            mobileOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="p-4">
            {/* Services group */}
            <div>
              <p className="px-2 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#999999]">
                Services
              </p>
              <div className="space-y-0.5">
                {DROPDOWNS.Services.map((item) => (
                  <a
                    key={item.title}
                    href={item.href ?? "#"}
                    onClick={closeMobileMenu}
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Resources group */}
            <div className="mt-4">
              <p className="px-2 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#999999]">
                Resources
              </p>
              <div className="space-y-0.5">
                {DROPDOWNS.Resources.map((item) => (
                  <a
                    key={item.title}
                    href={item.href ?? "#"}
                    onClick={closeMobileMenu}
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Other pages + Contact */}
            <div className="mt-4 space-y-0.5 border-t border-black/[0.06] pt-4">
              {MOBILE_NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMobileMenu}
                  className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => { closeMobileMenu(); setContactOpen(true); }}
                className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
              >
                Contact
              </button>
            </div>

            {/* Full-width CTA */}
            <div className="mt-4 border-t border-black/[0.06] pt-4">
              <a
                href="/assessment"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ca3726] px-4 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
              >
                Start assessment
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

