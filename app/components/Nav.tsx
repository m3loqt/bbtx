"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
  PenLine,
  Radar,
  Route,
  ScanSearch,
  UserSearch,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { ArrowUpRight, ChevronDown } from "./ArrowIcon";
import { ContactModal } from "./ContactModal";
import { RemoteCoverImage } from "./RemoteCoverImage";
import { SiSubstack, SiLinkedin, SiGumroad } from "react-icons/si";
import { FaMediumM } from "react-icons/fa";
import { altFor } from "@/lib/seo/image-alt";

const NAV_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };
// Colour changes that come from opening or closing a menu are quick; the bar's
// slower scroll morph (width, position) keeps NAV_TRANSITION.
const PAINT = { duration: 0.22, ease: NAV_TRANSITION.ease };

// Layout effects run synchronously before paint, so the "over hero" state is
// corrected before the browser ever shows the floating-card default — avoids
// a flash of the wrong nav state on pages that open with a hero in view.
// (useLayoutEffect is a no-op during SSR, so we fall back to useEffect there.)
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Services and Resources are disclosure buttons (click / Enter / Space), not
// links — their parent pages are reachable from the "All …" link inside each
// panel. Coaching and About are plain links.
const navLinks: { label: string; hasDropdown: boolean; href?: string }[] = [
  { label: "Services", hasDropdown: true },
  { label: "Coaching", hasDropdown: false, href: "/coaching" },
  { label: "Resources", hasDropdown: true },
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

type DropdownItem = { title: string; description: string; href: string; Icon: LucideIcon };

const DROPDOWNS: Record<string, DropdownItem[]> = {
  Resources: [
    {
      title: "Courses",
      description: "Making Modern Managers and five AI courses, built from the same frameworks we use with clients.",
      href: "/courses",
      Icon: GraduationCap,
    },
    {
      title: "Digital Twin Snapshot",
      description: "See your organization the way the market already does: a strategic analysis from your public footprint.",
      href: "/digital-twin-snapshot",
      Icon: Radar,
    },
    {
      title: "Whitepapers",
      description: "What we're learning across 100+ engagements, written down as it's ready.",
      href: "/whitepapers",
      Icon: FileText,
    },
    {
      title: "AI Readiness Assessment Guide",
      description:
        "Twelve questions for leadership teams to answer before investing in AI, across leadership, governance, workflows, capability, and performance.",
      href: "/resources/ai-readiness-assessment",
      Icon: ClipboardCheck,
    },
    {
      title: "Chaotic Confluence",
      description: "Notes on AI strategy, leadership, and organizations, from the field.",
      href: "/chaotic-confluence",
      Icon: PenLine,
    },
  ],
  Services: [
    {
      title: "Organizational Assessment & Analysis",
      description: "Reveal organizational realities, identify risks, and uncover opportunities for improvement.",
      href: "/services/organizational-assessment",
      Icon: ScanSearch,
    },
    {
      title: "Strategy & Advisory Services",
      description: "Create strategic clarity, strengthen alignment, and improve decision-making discipline.",
      href: "/services/strategy-advisory",
      Icon: Compass,
    },
    {
      title: "Leadership & Team Development",
      description: "Develop stronger leaders, healthier teams, and more effective organizations.",
      href: "/services/leadership-development",
      Icon: UsersRound,
    },
    {
      title: "AI Integration & Innovation",
      description: "Apply AI responsibly, improve performance, and build organizational capability.",
      href: "/services/ai-integration",
      Icon: BrainCircuit,
    },
    {
      title: "Implementation & Change Support",
      description: "Turn strategic intentions into action, accountability, and lasting results.",
      href: "/services/implementation-support",
      Icon: Route,
    },
    {
      title: "Executive Recruitment Assessment",
      description: "A disciplined, independent way to evaluate finalists for your next executive search.",
      href: "/services/executive-recruitment",
      Icon: UserSearch,
    },
  ],
};

// The "Explore" card at the right of each mega menu. Real articles arrive from
// /api/nav-explore the first time a menu is opened; until then (or if that fails)
// the menu shows this built-in card, so it is never empty.
type ExploreCard = { title: string; excerpt: string; category: string | null; image: string | null; href: string };
type ExploreData = { services: ExploreCard | null; resources: ExploreCard | null };

const EXPLORE_FALLBACK: ExploreCard = {
  title: "Chaotic Confluence",
  excerpt: "Notes on AI strategy, leadership, and organizations, from the field.",
  category: null,
  image: null,
  href: "/chaotic-confluence",
};

const MENU_META: Record<
  string,
  { panelId: string; allLabel: string; allHref: string; exploreKey: keyof ExploreData; exploreCta: string }
> = {
  Services: {
    panelId: "nav-panel-services",
    allLabel: "All services",
    allHref: "/services",
    exploreKey: "services",
    exploreCta: "Read the article",
  },
  Resources: {
    panelId: "nav-panel-resources",
    allLabel: "All resources",
    allHref: "/resources",
    exploreKey: "resources",
    exploreCta: "Read the article",
  },
};

/** One service or resource: its icon beside the name, the description under it. */
function MenuItem({ item, onNavigate }: { item: DropdownItem; onNavigate: () => void }) {
  const { Icon } = item;
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className="group -mx-4 block rounded-xl px-4 py-4 transition-colors hover:bg-[#f6f6f6] focus-visible:bg-[#f6f6f6] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ca3726]"
    >
      <span className="flex items-start gap-3">
        <Icon className="mt-px h-5 w-5 shrink-0 text-[#ca3726]" strokeWidth={1.5} aria-hidden />
        <span className="text-[15px] font-medium leading-snug text-[#111111]">{item.title}</span>
      </span>
      <span className="mt-2 block text-[13.5px] leading-relaxed text-[#666666]">{item.description}</span>
    </a>
  );
}

function ExploreLink({ card, cta, onNavigate }: { card: ExploreCard; cta: string; onNavigate: () => void }) {
  return (
    <a
      href={card.href}
      onClick={onNavigate}
      className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ca3726]"
    >
      {/* The image only repeats the link's own text, so it is hidden from screen readers
          (it still carries alt text, like every image on the site). */}
      <div aria-hidden="true" className="relative aspect-video overflow-hidden rounded-lg bg-[#f3f3f3]">
        {card.image ? (
          <RemoteCoverImage
            src={card.image}
            alt={card.title}
            sizes="340px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/oglogo.webp" alt={altFor("/oglogo.webp")} aria-hidden width={56} height={56} className="h-14 w-14 object-contain opacity-25" />
          </div>
        )}
      </div>
      {card.category && (
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">{card.category}</p>
      )}
      <p className={`${card.category ? "mt-1.5" : "mt-4"} text-[15px] font-semibold leading-snug text-[#111111]`}>
        {card.title}
      </p>
      {card.excerpt && (
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-[#666666]">{card.excerpt}</p>
      )}
      <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#ca3726]">
        {cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden
        />
      </span>
    </a>
  );
}

// Every panel is always in the DOM so its links exist in the server-rendered
// HTML (crawlers don't click). When closed it is `invisible` + `inert`, which
// removes it from hit-testing, the tab order and the accessibility tree.
//
// The panel is the bar's lower half: same width, same white, same border, laid
// 1px over the bar's bottom edge so there is no seam and no gap. (The bar squares
// its bottom corners while a menu is open; see NavInner.)
function MegaPanel({
  label,
  open,
  explore,
  onNavigate,
  onKeyDown,
}: {
  label: string;
  open: boolean;
  explore: ExploreData | null;
  onNavigate: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  const items = DROPDOWNS[label];
  const meta = MENU_META[label];
  // Two columns of equal weight: 6 services -> 3 + 3, 4 resources -> 2 + 2.
  const split = Math.ceil(items.length / 2);
  const columns = [items.slice(0, split), items.slice(split)];
  const card = explore?.[meta.exploreKey] ?? EXPLORE_FALLBACK;

  return (
    <div
      id={meta.panelId}
      inert={!open}
      onKeyDown={onKeyDown}
      // `visibility` is only in the transition list when closing. A transitioning
      // visibility reads as `hidden` on the transition's first frame, which makes
      // a programmatic focus() right after opening silently fail — so opening
      // flips it to `visible` instantly, and closing delays `hidden` until the
      // fade-out finishes. Opacity only, no movement: sliding would open a gap
      // between the bar and the panel for a few frames.
      className={`absolute inset-x-0 top-[calc(100%-1px)] overflow-hidden rounded-b-lg border border-t-0 border-black/[0.06] bg-white shadow-[0_22px_44px_rgba(0,0,0,0.10)] duration-200 ease-out motion-reduce:transition-none ${
        open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"
      }`}
    >
      <div className="mx-5 border-t border-black/[0.07]" aria-hidden="true" />
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-9 px-9 pb-8 pt-5">
        {columns.map((col, i) => (
          <div key={i}>
            {col.map((item) => (
              <MenuItem key={item.title} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        ))}
        <div className="border-l border-black/[0.07] pl-9 pt-4">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#888888]">Explore</p>
          <ExploreLink card={card} cta={meta.exploreCta} onNavigate={onNavigate} />
        </div>
      </div>
      <div className="mx-5 border-t border-black/[0.07] px-4 py-3.5">
        <a
          href={meta.allHref}
          onClick={onNavigate}
          className="group inline-flex items-center gap-1.5 rounded-sm text-[13.5px] font-medium text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ca3726]"
        >
          {meta.allLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden
          />
        </a>
      </div>
    </div>
  );
}

type NavProps = { heroTheme?: "dark" | "light"; instantFloat?: boolean };

// reducedMotion="user" makes framer-motion skip transform/layout animations
// (the bar's morph on scroll) for visitors who ask the OS for less motion.
export function Nav(props: NavProps) {
  return (
    <MotionConfig reducedMotion="user">
      <NavInner {...props} />
    </MotionConfig>
  );
}

function NavInner({ heroTheme = "dark", instantFloat = false }: NavProps) {
  // Which desktop mega menu is open. Opened/closed by click, Enter or Space on
  // its trigger button (WAI-ARIA "disclosure navigation" pattern) — never by
  // hover, so keyboard, touch and pointer users all get the same behavior.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const focusPanelOnOpen = useRef(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactInquiry, setContactInquiry] = useState<string | undefined>(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [overHero, setOverHero] = useState(false);
  const [explore, setExplore] = useState<ExploreData | null>(null);
  const exploreRequested = useRef(false);

  // "dark" = render the transparent-over-hero state with light text (photo/dark hero behind it).
  // When heroTheme is "light" (e.g. a white hero), the transparent state keeps dark text instead —
  // only the floating card's background/shadow/width still animate in on scroll.
  // While the full-screen mobile menu is open, force this state regardless of
  // scroll position/heroTheme — otherwise the header's colors depend on
  // wherever the page happened to be scrolled to when the menu opened, which
  // could land on a solid-white background with white text (invisible).
  //
  // An open desktop menu always wants the white bar: the bar and the panel are
  // one white surface, so over a hero the bar turns white (and its text dark)
  // for as long as a menu is open.
  const menuOpen = openMenu !== null;
  const navTransparent = mobileOpen || (overHero && !menuOpen);
  const dark = mobileOpen || (overHero && heroTheme === "dark" && !menuOpen);

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

  const closeMenu = () => setOpenMenu(null);

  // The Explore cards are real articles, fetched once, the first time anyone
  // reaches for a menu (pointer over a trigger, keyboard focus, or a click).
  const loadExplore = () => {
    if (exploreRequested.current) return;
    exploreRequested.current = true;
    fetch("/api/nav-explore")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: ExploreData) => setExplore(data))
      .catch(() => {
        // Keep the built-in card; a later reach for a menu tries again.
        exploreRequested.current = false;
      });
  };

  const toggleMenu = (label: string, e: React.MouseEvent<HTMLButtonElement>) => {
    loadExplore();
    const willOpen = openMenu !== label;
    // click `detail` is 0 when a button is activated from the keyboard
    // (Enter/Space) rather than a pointer.
    focusPanelOnOpen.current = willOpen && e.detail === 0;
    setOpenMenu(willOpen ? label : null);
  };

  // The panels sit after the header in DOM order (they're positioned against
  // the whole bar, so they can't live inside each trigger's list item). To
  // keep keyboard order sensible, a keyboard-opened menu moves focus to its
  // first link, and Shift+Tab from that link returns to the trigger.
  const handlePanelKeyDown = (label: string, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !e.shiftKey) return;
    if (e.target === e.currentTarget.querySelector("a")) {
      e.preventDefault();
      triggerRefs.current[label]?.focus();
    }
  };

  // Focus leaving the nav entirely (Tab past the last card) closes the menu.
  // relatedTarget is null for clicks on non-focusable areas — those are
  // handled by the pointerdown listener below, so ignore them here.
  const handleNavBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget;
    if (openMenu && next instanceof Node && !e.currentTarget.contains(next)) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    if (!openMenu) return;
    const panel = document.getElementById(MENU_META[openMenu].panelId);

    let raf = 0;
    if (focusPanelOnOpen.current) {
      focusPanelOnOpen.current = false;
      raf = requestAnimationFrame(() => panel?.querySelector<HTMLElement>("a")?.focus());
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Only pull focus back to the trigger if it was inside the panel —
      // otherwise (e.g. a mouse user on Safari, where clicking a button
      // doesn't focus it) leave focus where it is.
      if (panel?.contains(document.activeElement)) triggerRefs.current[openMenu]?.focus();
      setOpenMenu(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  // The desktop menus only exist at lg and up. If the viewport shrinks below
  // that while one is open, close it so it doesn't reappear when widened.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (!mq.matches) setOpenMenu(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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

  // Static (non-animated) classes so Tailwind can see the full strings.
  const triggerFocusRing = dark ? "focus-visible:outline-white" : "focus-visible:outline-[#ca3726]";

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full px-3 pt-2.5 sm:px-6 sm:pt-[18px] lg:px-8">
      {/* A faint veil over the page while a desktop menu is open, so a white panel
          still separates from a white page. It ignores the pointer: a click anywhere
          outside the menu closes it through the pointerdown listener below. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 -z-10 hidden bg-black/[0.12] transition-opacity duration-200 motion-reduce:transition-none lg:block ${
          menuOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <motion.div
        ref={navRef}
        initial={false}
        animate={{ maxWidth: overHero ? 1280 : 1160 }}
        transition={NAV_TRANSITION}
        className="relative mx-auto"
        onBlur={handleNavBlur}
      >
        <div className="relative z-50">
          {/* Single nav bar — morphs between transparent-over-hero and floating card */}
          <motion.header
            layout
            initial={false}
            animate={{
              backgroundColor: navTransparent ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
              borderColor: navTransparent ? "rgba(255,255,255,0)" : "rgba(0,0,0,0.06)",
              // The panel carries the shadow while a menu is open.
              boxShadow: navTransparent || menuOpen ? "0 2px 16px rgba(0,0,0,0)" : "0 2px 16px rgba(0,0,0,0.04)",
              // Square off the bottom while a menu is open so the panel continues the bar.
              borderBottomLeftRadius: menuOpen ? 0 : 8,
              borderBottomRightRadius: menuOpen ? 0 : 8,
            }}
            transition={{
              ...NAV_TRANSITION,
              backgroundColor: PAINT,
              borderColor: PAINT,
              boxShadow: PAINT,
              borderBottomLeftRadius: PAINT,
              borderBottomRightRadius: PAINT,
            }}
            className={`flex items-center justify-between gap-3 rounded-lg border px-2.5 py-2 sm:gap-6 sm:px-4 sm:py-3.5 lg:gap-8 lg:px-5 ${contactOpen ? "relative z-[250]" : ""}`}
          >
            <a href="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Image
                src="/oglogo.webp"
                alt={altFor("/oglogo.webp")} aria-hidden
                width={48}
                height={48}
                className="h-9 w-9 object-contain sm:h-11 sm:w-11"
              />
              <motion.span
                layout
                initial={false}
                animate={{ color: dark ? "#ffffff" : "#222222" }}
                transition={{ ...NAV_TRANSITION, color: PAINT }}
                className="text-sm font-bold tracking-normal sm:text-base lg:text-lg"
              >
                BBTx Consulting
              </motion.span>
            </a>

            {/* Desktop nav links — one set, position + color morph via layout animation */}
            <motion.nav
              layout
              aria-label="Main"
              transition={NAV_TRANSITION}
              className={`hidden items-center gap-4 lg:flex lg:gap-5 ${
                overHero ? "absolute left-1/2 -translate-x-1/2 xl:gap-8" : ""
              }`}
            >
              {navLinks.map(({ label, hasDropdown, href }) => {
                const triggerClass = `relative flex items-center gap-1 rounded-sm text-[15px] font-normal focus-visible:outline-2 focus-visible:outline-offset-4 ${triggerFocusRing}`;
                const labelEl = (
                  <motion.span
                    layout
                    initial={false}
                    animate={{ color: openMenu === label ? "#ca3726" : dark ? "rgba(255,255,255,0.8)" : "#222222" }}
                    transition={{ ...NAV_TRANSITION, color: PAINT }}
                    className="transition-colors hover:!text-[#555]"
                  >
                    {label}
                  </motion.span>
                );

                if (!hasDropdown) {
                  return (
                    <a key={label} href={href} className={triggerClass}>
                      {labelEl}
                    </a>
                  );
                }

                const open = openMenu === label;
                return (
                  <button
                    key={label}
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[label] = el;
                    }}
                    onClick={(e) => toggleMenu(label, e)}
                    onPointerEnter={loadExplore}
                    onFocus={loadExplore}
                    aria-expanded={open}
                    aria-controls={MENU_META[label].panelId}
                    className={`${triggerClass} cursor-pointer`}
                  >
                    {labelEl}
                    <motion.span
                      initial={false}
                      animate={{ color: open ? "#ca3726" : dark ? "rgba(255,255,255,0.8)" : "#222222" }}
                      transition={PAINT}
                    >
                      <ChevronDown
                        className={`transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                      />
                    </motion.span>
                  </button>
                );
              })}
            </motion.nav>

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
                transition={{ ...NAV_TRANSITION, backgroundColor: PAINT, color: PAINT }}
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

          {/* Desktop mega menus — opened by click/Enter/Space on the trigger
              buttons above. Always rendered (see MegaPanel) so the links are
              in the HTML for crawlers; hidden + inert while closed. */}
          <div className="hidden lg:block">
            {Object.keys(MENU_META).map((label) => (
              <MegaPanel
                key={label}
                label={label}
                open={openMenu === label}
                explore={explore}
                onNavigate={closeMenu}
                onKeyDown={(e) => handlePanelKeyDown(label, e)}
              />
            ))}
          </div>

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
              <nav aria-label="Mobile" className="space-y-0.5">
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
              </nav>

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
