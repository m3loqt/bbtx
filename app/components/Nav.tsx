"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "./ArrowIcon";
import { ContactModal } from "./ContactModal";

const NAV_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

// Layout effects run synchronously before paint, so the "over hero" state is
// corrected before the browser ever shows the floating-card default — avoids
// a flash of the wrong nav state on pages that open with a hero in view.
// (useLayoutEffect is a no-op during SSR, so we fall back to useEffect there.)
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const navLinks = [
  { label: "Services", hasDropdown: true, href: "/services" },
  { label: "Coaching", hasDropdown: false, href: "/coaching" },
  { label: "Resources", hasDropdown: true, href: "#" },
  { label: "About", hasDropdown: false, href: "/about" },
];

const MOBILE_NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Coaching", href: "/coaching" },
  { label: "About", href: "/about" },
];

const DROPDOWNS: Record<
  string,
  { title: string; description: string; href?: string }[]
> = {
  Resources: [
    {
      title: "Digital Twin Snapshot",
      description: "See your organization the way the market already does — a strategic analysis from your public footprint.",
      href: "/digital-twin-snapshot",
    },
    {
      title: "Whitepapers",
      description: "What we're learning across 100+ engagements, written down as it's ready.",
      href: "/whitepapers",
    },
  ],
  Services: [
    {
      title: "Organizational Assessment & Analysis",
      description: "Reveal organizational realities, identify risks, and uncover opportunities for improvement.",
      href: "/services/organizational-assessment",
    },
    {
      title: "Strategy & Advisory Services",
      description: "Create strategic clarity, strengthen alignment, and improve decision-making discipline.",
      href: "/services/strategy-advisory",
    },
    {
      title: "Leadership & Team Development",
      description: "Develop stronger leaders, healthier teams, and more effective organizations.",
      href: "/services/leadership-development",
    },
    {
      title: "AI Integration & Innovation",
      description: "Apply AI responsibly, improve performance, and build organizational capability.",
      href: "/services/ai-integration",
    },
    {
      title: "Implementation & Change Support",
      description: "Turn strategic intentions into action, accountability, and lasting results.",
      href: "/services/implementation-support",
    },
  ],
};

export function Nav({ heroTheme = "dark" }: { heroTheme?: "dark" | "light" } = {}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactInquiry, setContactInquiry] = useState<string | undefined>(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // "dark" = render the transparent-over-hero state with light text (photo/dark hero behind it).
  // When heroTheme is "light" (e.g. a white hero), the transparent state keeps dark text instead —
  // only the floating card's background/shadow/width still animate in on scroll.
  const dark = overHero && heroTheme === "dark";

  useIsomorphicLayoutEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const handleScroll = () => {
      const rect = heroEl.getBoundingClientRect();
      setOverHero(rect.bottom > 96);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    const openContact = (e: Event) => {
      setMobileOpen(false);
      setContactInquiry((e as CustomEvent<{ inquiry?: string }>).detail?.inquiry);
      setContactOpen(true);
    };
    window.addEventListener("openContact", openContact);
    return () => window.removeEventListener("openContact", openContact);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  const dropdownItems = activeDropdown ? DROPDOWNS[activeDropdown] : null;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full px-3 pt-2.5 sm:px-6 sm:pt-[18px] lg:px-8">
      <motion.div
        initial={false}
        animate={{ maxWidth: overHero ? 1280 : 1160 }}
        transition={NAV_TRANSITION}
        className={`relative mx-auto ${dropdownItems ? "pb-[500px]" : ""} ${mobileOpen ? "pb-[520px] lg:pb-0" : ""}`}
        onMouseLeave={handleLeave}
      >
        <div className="relative">
          {/* Single nav bar — morphs between transparent-over-hero and floating card */}
          <motion.header
            layout
            initial={false}
            animate={{
              backgroundColor: overHero ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
              borderColor: overHero ? "rgba(255,255,255,0)" : "rgba(0,0,0,0.06)",
              boxShadow: overHero ? "0 2px 16px rgba(0,0,0,0)" : "0 2px 16px rgba(0,0,0,0.04)",
            }}
            transition={NAV_TRANSITION}
            className={`flex items-center justify-between gap-3 rounded-lg border px-2.5 py-2 sm:gap-6 sm:px-4 sm:py-3.5 lg:gap-8 lg:px-5 ${contactOpen ? "relative z-[250]" : ""}`}
          >
            <a href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Image
                src="/oglogo.webp"
                alt=""
                width={48}
                height={48}
                className="h-9 w-9 object-contain sm:h-11 sm:w-11"
              />
              <motion.span
                layout
                initial={false}
                animate={{ color: dark ? "#ffffff" : "#222222" }}
                transition={NAV_TRANSITION}
                className="text-sm font-bold tracking-normal sm:text-base lg:text-lg"
              >
                BBTx Consulting
              </motion.span>
            </a>

            {/* Desktop nav links — one set, position + color morph via layout animation */}
            <motion.div
              layout
              transition={NAV_TRANSITION}
              className={`hidden items-center gap-4 lg:flex lg:gap-5 ${
                overHero ? "absolute left-1/2 -translate-x-1/2 xl:gap-8" : ""
              }`}
            >
              {navLinks.map(({ label, hasDropdown, href }) => (
                <a
                  key={label}
                  href={href ?? "#"}
                  onMouseEnter={() => handleEnter(label, hasDropdown)}
                  className="relative flex items-center gap-1 text-[15px] font-normal"
                >
                  <motion.span
                    layout
                    initial={false}
                    animate={{ color: dark ? "rgba(255,255,255,0.8)" : "#222222" }}
                    transition={NAV_TRANSITION}
                    className="transition-colors hover:!text-[#555]"
                  >
                    {label}
                  </motion.span>
                  <AnimatePresence initial={false}>
                    {hasDropdown && (
                      <motion.span
                        key="chevron"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          color: dark ? "rgba(255,255,255,0.8)" : "#222222",
                        }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              ))}
            </motion.div>

            {/* Right side: hamburger (mobile) + CTA */}
            <div className="flex items-center gap-2">
              {/* Hamburger — mobile only */}
              <motion.button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                initial={false}
                animate={{
                  backgroundColor: overHero ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
                  borderColor: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.08)",
                  color: dark ? "#ffffff" : "#222222",
                }}
                transition={NAV_TRANSITION}
                className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors sm:h-9 sm:w-9 lg:hidden"
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
              </motion.button>

              {/* CTA button — hidden on mobile (menu has its own full-width CTA) */}
              <motion.a
                href="https://www.calendly.com/granttate"
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={false}
                animate={{
                  backgroundColor: dark ? "#ffffff" : "#ca3726",
                  color: dark ? "#222222" : "#ffffff",
                  borderRadius: 8,
                }}
                transition={NAV_TRANSITION}
                className="hidden shrink-0 items-center gap-2 px-4 py-2.5 text-[15px] font-medium hover:opacity-95 sm:flex"
              >
                Schedule a Consultation
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </motion.a>
            </div>
          </motion.header>

          {/* Desktop dropdown */}
          {dropdownItems && (
            <div className="pointer-events-auto hidden lg:block">
              <div
                className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-lg border transition-all duration-200 ease-out ${
                  dark
                    ? "border-white/10 bg-black/70 shadow-[0_12px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                    : "border-black/[0.06] bg-[#f7f7f7] shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                } ${panelVisible ? "translate-y-0 opacity-100" : "translate-y-[-8px] opacity-0"}`}
              >
                <div className="space-y-2 p-3 sm:space-y-3 sm:p-4">
                  {/* Row 1: 2 or 3 columns depending on item count */}
                  <div className={`grid gap-2 sm:gap-3 ${dropdownItems.slice(0, 3).length < 3 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {dropdownItems.slice(0, 3).map((item) => (
                      <a
                        key={item.title}
                        href={item.href ?? "#"}
                        className={`group flex min-h-[150px] flex-col justify-between rounded-lg border px-4 py-4 text-left transition-colors sm:min-h-[170px] sm:px-5 sm:py-5 ${
                          dark
                            ? "border-white/10 bg-white/5 hover:bg-white/10"
                            : "border-black/[0.06] bg-white transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-semibold tracking-normal sm:text-[15px] ${dark ? "text-white" : "text-[#222222]"}`}>
                            {item.title}
                          </p>
                          <p className={`mt-2 text-xs leading-relaxed sm:text-[13px] ${dark ? "text-white/60" : "text-[#555555]"}`}>
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
                  {/* Row 2: 2 columns spanning full width */}
                  {dropdownItems.length > 3 && (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {dropdownItems.slice(3).map((item) => (
                        <a
                          key={item.title}
                          href={item.href ?? "#"}
                          className={`group flex min-h-[130px] flex-col justify-between rounded-lg border px-4 py-4 text-left transition-colors sm:min-h-[150px] sm:px-5 sm:py-5 ${
                            dark
                              ? "border-white/10 bg-white/5 hover:bg-white/10"
                              : "border-black/[0.06] bg-white transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                          }`}
                        >
                          <div>
                            <p className={`text-sm font-semibold tracking-normal sm:text-[15px] ${dark ? "text-white" : "text-[#222222]"}`}>
                              {item.title}
                            </p>
                            <p className={`mt-2 text-xs leading-relaxed sm:text-[13px] ${dark ? "text-white/60" : "text-[#555555]"}`}>
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
                  )}
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
              {/* Nav links */}
              <div className="space-y-0.5">
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
                {/* Resources group */}
                <div className="pt-1">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">
                    Resources
                  </p>
                  <a
                    href="/digital-twin-snapshot"
                    onClick={closeMobileMenu}
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
                  >
                    Digital Twin Snapshot
                  </a>
                  <a
                    href="/whitepapers"
                    onClick={closeMobileMenu}
                    className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f7f7f7]"
                  >
                    Whitepapers
                  </a>
                </div>
              </div>

              {/* Full-width CTA */}
              <div className="mt-4 border-t border-black/[0.06] pt-4">
                <a
                  href="https://www.calendly.com/granttate"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ca3726] px-4 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
                >
                  Schedule a Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => { closeMobileMenu(); setContactOpen(true); }}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-[#555555] transition-colors hover:text-[#222222]"
                >
                  Send us a message
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultInquiry={contactInquiry}
      />
    </div>
  );
}
