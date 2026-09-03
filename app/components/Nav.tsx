"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "./ArrowIcon";
import { ContactModal } from "./ContactModal";
import { SiSubstack, SiLinkedin, SiGumroad } from "react-icons/si";
import { FaMediumM } from "react-icons/fa";

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
  { label: "Home", href: "/" },
  { label: "Services", hasDropdown: true },
  { label: "Coaching", href: "/coaching" },
  { label: "About", href: "/about" },
  { label: "Resources", hasDropdown: true },
];

const MOBILE_SOCIAL_LINKS = [
  { label: "Substack", href: "https://chaoticconfluence.substack.com", Icon: SiSubstack },
  { label: "Medium", href: "https://rgranttate.medium.com/", Icon: FaMediumM },
  { label: "LinkedIn", href: "https://linkedin.com/in/granttate", Icon: SiLinkedin },
  { label: "Gumroad", href: "https://chaoticconfluence.gumroad.com/", Icon: SiGumroad },
];

const DROPDOWNS: Record<
  string,
  { title: string; description: string; href?: string }[]
> = {
  Resources: [
    {
      title: "Courses",
      description: "Making Modern Managers and five AI courses, built from the same frameworks we use with clients.",
      href: "/courses",
    },
    {
      title: "Digital Twin Snapshot",
      description: "See your organization the way the market already does: a strategic analysis from your public footprint.",
      href: "/digital-twin-snapshot",
    },
    {
      title: "Whitepapers",
      description: "What we're learning across 100+ engagements, written down as it's ready.",
      href: "/whitepapers",
    },
    {
      title: "Chaotic Confluence",
      description: "Notes on AI strategy, leadership, and organizations, from the field.",
      href: "/chaotic-confluence",
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
    {
      title: "Executive Recruitment Assessment",
      description: "A disciplined, independent way to evaluate finalists for your next executive search.",
      href: "/services/executive-recruitment",
    },
  ],
};

export function Nav({
  heroTheme = "dark",
  instantFloat = false,
}: { heroTheme?: "dark" | "light"; instantFloat?: boolean } = {}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactInquiry, setContactInquiry] = useState<string | undefined>(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [overHero, setOverHero] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // "dark" = render the transparent-over-hero state with light text (photo/dark hero behind it).
  // When heroTheme is "light" (e.g. a white hero), the transparent state keeps dark text instead —
  // only the floating card's background/shadow/width still animate in on scroll.
  // While the full-screen mobile menu is open, force this state regardless of
  // scroll position/heroTheme — otherwise the header's colors depend on
  // wherever the page happened to be scrolled to when the menu opened, which
  // could land on a solid-white background with white text (invisible).
  const navTransparent = mobileOpen || overHero;
  const dark = mobileOpen || (overHero && heroTheme === "dark");

  useIsomorphicLayoutEffect(() => {
    // Short-hero pages (e.g. blog posts) don't have enough room for the
    // usual "stay transparent until you scroll past the hero" behavior —
    // it reads as the nav lingering awkwardly close to the content below.
    // instantFloat skips the hero-height check entirely: transparent only
    // at the very top, solid the moment any scrolling happens.
    if (instantFloat) {
      const handleScroll = () => setOverHero(window.scrollY <= 0);
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const handleScroll = () => {
      const rect = heroEl.getBoundingClientRect();
      setOverHero(rect.bottom > 96);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [instantFloat]);

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

  // Lock background scroll while the full-screen mobile menu is open, using
  // the "freeze body in place" technique rather than `overflow: hidden`.
  // Toggling overflow removes the scrollbar and changes the document's
  // width, and since the header uses `layout` for its own animations, that
  // width change gets animated too — reading as an unintended slide every
  // time the menu opens/closes. Fixing body position never changes the
  // document width, so there's nothing for `layout` to misfire on.
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    const openContact = (e: Event) => {
      setMobileOpen(false);
      setContactInquiry((e as CustomEvent<{ inquiry?: string }>).detail?.inquiry);
      setContactOpen(true);
    };
    window.addEventListener("openContact", openContact);
    return () => window.removeEventListener("openContact", openContact);
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const dropdownItems = activeDropdown ? DROPDOWNS[activeDropdown] : null;
  const itemCount = dropdownItems?.length ?? 0;
  // Up to 4 items sit in a single row; 5-6 split into two rows of 3.
  const firstRowCount = itemCount <= 4 ? itemCount : Math.min(3, itemCount);
  const dropdownColsClass =
    firstRowCount >= 4
      ? "grid-cols-4"
      : firstRowCount === 3
        ? "grid-cols-3"
        : firstRowCount === 2
          ? "grid-cols-2"
          : "grid-cols-1";

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full px-3 pt-2.5 sm:px-6 sm:pt-[18px] lg:px-8">
      <motion.div
        initial={false}
        animate={{ maxWidth: overHero ? 1280 : 1160 }}
        transition={NAV_TRANSITION}
        className={`relative mx-auto ${dropdownItems ? "pb-[500px]" : ""}`}
        onMouseLeave={handleLeave}
      >
        <div className="relative z-50">
          {/* Single nav bar — morphs between transparent-over-hero and floating card */}
          <motion.header
            layout
            initial={false}
            animate={{
              backgroundColor: navTransparent ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
              borderColor: navTransparent ? "rgba(255,255,255,0)" : "rgba(0,0,0,0.06)",
              boxShadow: navTransparent ? "0 2px 16px rgba(0,0,0,0)" : "0 2px 16px rgba(0,0,0,0.04)",
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

            {/* Right side: CTA + hamburger — CTA sits left of the toggle, so
                the open/close control is always the farthest-right element. */}
            <div className="flex items-center gap-2">
              {/* CTA button — desktop only now; the mobile menu has its own
                  Schedule a Consultation button, so showing this one too on
                  mobile was redundant. */}
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
                className="hidden shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2.5 text-[15px] font-medium hover:opacity-95 lg:flex"
              >
                Schedule a Consultation
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </motion.a>

              {/* Hamburger / close toggle — mobile only, farthest right */}
              <motion.button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                initial={false}
                animate={{
                  backgroundColor: navTransparent ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
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
                  {/* Row 1: one column per item up to 4, else 3 (with a second row) */}
                  <div className={`grid gap-2 sm:gap-3 ${dropdownColsClass}`}>
                    {dropdownItems.slice(0, firstRowCount).map((item) => (
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
                  {/* Row 2: mirrors row 1's column count so 6 items form a clean 3x2 grid
                      instead of wrapping the last item onto a lonely third row. */}
                  {dropdownItems.length > firstRowCount && (
                    <div className={`grid gap-2 sm:gap-3 ${dropdownColsClass}`}>
                      {dropdownItems.slice(firstRowCount).map((item) => (
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

        </div>
      </motion.div>

      {/* Mobile menu — full-screen dark takeover, separate from the nav bar
          above (which stays visible, unchanged, at z-50) so the hamburger/X
          toggle in the header remains the single open/close control. */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#161616] lg:hidden">
          <div className="flex-1 overflow-y-auto px-4 pb-6 pt-24 sm:px-6 sm:pt-28">
            {/* relative + min-h reserves room for the tallest possible expanded
                state, so the absolutely-positioned Location/Contacts block
                below never shifts when a dropdown opens. */}
            <div className="relative min-h-[640px]">
              <div className="space-y-0.5">
                {MOBILE_NAV_LINKS.map((link) => {
                  if (link.hasDropdown) {
                    const items = DROPDOWNS[link.label] ?? [];
                    const isExpanded = mobileExpanded === link.label;
                    return (
                      <div key={link.label}>
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                          aria-expanded={isExpanded}
                          className="flex w-full items-center justify-between py-1 text-left text-4xl font-normal tracking-tight text-white"
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-6 w-6 shrink-0 text-white/50 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="mb-2 pl-1">
                              {items.map((item) => (
                                <a
                                  key={item.title}
                                  href={item.href ?? "#"}
                                  onClick={closeMobileMenu}
                                  className="flex items-center justify-between gap-2 py-1 leading-tight text-lg font-normal text-white/70 transition-colors hover:text-white"
                                >
                                  {item.title}
                                  <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block py-1 text-4xl font-normal tracking-tight text-white"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Location + Contacts share one row now instead of stacking,
                  freeing up the vertical space above for the dropdowns. */}
              <div className="absolute inset-x-0 top-[500px] flex items-start gap-16">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Location
                  </p>
                  <p className="mt-1 text-base text-white/80">Charlottesville, VA, USA</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Contacts
                  </p>
                  <a
                    href="mailto:grant@bbtx.ai"
                    onClick={closeMobileMenu}
                    className="mt-1 block text-base text-white/80 transition-colors hover:text-white"
                  >
                    grant@bbtx.ai
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: fixed, always-visible — social icons sit directly above
              the primary + secondary CTA, never scrolled out of view. */}
          <div className="px-4 pb-6 sm:px-6">
            <div className="mb-4 flex items-center gap-3">
              {MOBILE_SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111111] transition-opacity hover:opacity-80"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="rounded-lg bg-white p-4">
              <p className="text-[15px] font-semibold text-[#111111]">Let&apos;s talk</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#6b6b6b]">
                Schedule time with us, or send a quick message — we&apos;ll get back to you shortly.
              </p>
              <div className="mt-3.5 flex gap-2">
                <a
                  href="https://www.calendly.com/granttate"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#ca3726] px-2 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-95"
                >
                  Schedule a Consultation
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={() => { closeMobileMenu(); setContactOpen(true); }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-black/10 px-2 py-2.5 text-[13px] font-medium text-[#222222] transition-colors hover:bg-black/5"
                >
                  Send us a Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultInquiry={contactInquiry}
      />
    </div>
  );
}
