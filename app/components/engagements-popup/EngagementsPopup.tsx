"use client";

// The engagements popup: four finished banner graphics in a carousel, beside a fixed intro panel on
// desktop and as a bottom sheet on phones. The graphics carry their own text, price and button, so
// nothing is laid over them; the whole slide is the link.
//
// Words, alt text and destinations live in lib/promo/engagements.ts. Timing and behaviour rules live in
// lib/promo/popup-logic.ts. When to show it is decided by EngagementsPopupTrigger, which mounts this
// only at that moment, so none of this loads for visitors who never see it.

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { altFor } from "@/lib/seo/image-alt";
import { PANEL, SLIDES, type Destination, type PromoSlide } from "@/lib/promo/engagements";
import { AUTOPLAY_MS, CROSSFADE_MS, wrapIndex } from "@/lib/promo/popup-logic";

// The intro headline is set in a serif. It loads with this popup only, not with every page.
const serif = Fraunces({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

/**
 * The four banner files in /public/promo are already compressed (WebP, quality 92: about 90% smaller
 * than the PNGs they came from, visually identical). They go to the browser as they are. Running them
 * through the image optimizer again would recompress them at its default quality and soften the
 * small text on the graphics, so this loader hands the file back unchanged.
 */
const asIs = ({ src }: { src: string }) => src;

/** The popup's brand red. Only black, white and grays are used besides it. */
const RED = "#C8102E";

export type PopupSource = "timer" | "scroll" | "exit" | "preview";
type CloseMethod = "close_button" | "escape" | "backdrop" | "cta";

const COUNT = SLIDES.length;
const pad = (n: number) => String(n).padStart(2, "0");
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", notify);
      return () => m.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function useTabVisible(): boolean {
  return useSyncExternalStore(
    (notify) => {
      document.addEventListener("visibilitychange", notify);
      return () => document.removeEventListener("visibilitychange", notify);
    },
    () => document.visibilityState === "visible",
    () => true,
  );
}

type Props = {
  /** 0-based slide to open on. */
  startSlide?: number;
  source: PopupSource;
  onClose: () => void;
};

export default function EngagementsPopup({ startSlide = 0, source, onClose }: Props) {
  const preview = source === "preview";
  const [index, setIndex] = useState(startSlide);
  const [hovered, setHovered] = useState(false);
  const [keyboardInside, setKeyboardInside] = useState(false);
  const [announce, setAnnounce] = useState("");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const tabVisible = useTabVisible();

  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const restoreFocus = useRef(true);
  const closed = useRef(false);
  const opened = useRef(false);
  const viewedSlides = useRef<Set<number>>(new Set());
  const current = useRef(startSlide);

  const track = useCallback(
    (event: string, params?: Record<string, string | number | boolean | undefined>) => {
      // A reviewer opening ?promo=open must not add to the real numbers.
      if (!preview) trackEvent(event, params);
    },
    [preview],
  );

  const viewSlide = useCallback(
    (i: number) => {
      if (viewedSlides.current.has(i)) return;
      viewedSlides.current.add(i);
      track("mini_engagement_slide_view", slideParams(i));
    },
    [track],
  );

  // Opening: analytics, focus in, page frozen behind. One effect so the cleanup mirrors it.
  useEffect(() => {
    if (!opened.current) {
      opened.current = true;
      track("mini_engagement_popup_view", { ...slideParams(startSlide), trigger: source });
      viewSlide(startSlide);
    }

    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panelRef.current?.focus({ preventScroll: true });

    // Freeze the page without the layout jump: keep the scrollbar's space reserved.
    const body = document.body;
    const root = document.documentElement;
    const before = { overflow: body.style.overflow, gutter: root.style.scrollbarGutter };
    root.style.scrollbarGutter = "stable";
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = before.overflow;
      root.style.scrollbarGutter = before.gutter;
      const target = previousFocus.current;
      if (restoreFocus.current && target && document.contains(target)) target.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(
    (method: CloseMethod) => {
      if (closed.current) return;
      closed.current = true;
      restoreFocus.current = method !== "cta";
      track("mini_engagement_popup_close", {
        close_method: method,
        slides_viewed: viewedSlides.current.size,
        last_slide_number: current.current + 1,
        last_offering_id: SLIDES[current.current].id,
      });
      // The 7-day cooldown was recorded when it appeared (EngagementsPopupTrigger).
      onClose();
    },
    [onClose, track],
  );

  const go = useCallback(
    (next: number, how: "auto" | "manual") => {
      current.current = next;
      setIndex(next);
      viewSlide(next);
      // Slides changing by themselves are not announced; the visitor's own moves are.
      if (how === "manual") setAnnounce(`${next + 1} of ${COUNT}: ${SLIDES[next].name}`);
    },
    [viewSlide],
  );

  const step = useCallback(
    (delta: 1 | -1, how: "auto" | "manual" = "manual") => go(wrapIndex(current.current, delta, COUNT), how),
    [go],
  );

  // Auto-advance every 6 seconds. Paused while the mouse is over the carousel, while keyboard focus is
  // inside it, while the tab is hidden, and never with reduced motion. Every slide change restarts it.
  const playing = !reducedMotion && !hovered && !keyboardInside && tabVisible;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => step(1, "auto"), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, step]);

  // Escape closes; Tab stays inside the dialog; focus that strays is pulled back.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (e.key === "Escape" && !e.defaultPrevented) {
        e.preventDefault();
        close("escape");
        return;
      }
      if (e.key !== "Tab") return;
      // Only what can actually take focus: the other breakpoint's copy of a control is display:none.
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.closest("[inert]") && el.getClientRects().length > 0,
      );
      if (items.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = (e: FocusEvent) => {
      const panel = panelRef.current;
      if (panel && e.target instanceof Node && !panel.contains(e.target)) panel.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [close]);

  // Left/Right while focus is inside the dialog. A swipe does the same on touch screens.
  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Mostly sideways and long enough, so scrolling never changes the slide.
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const follow = (destination: Destination, what: { offering_id: string; offering_name?: string; slide_number?: number }) => {
    track("mini_engagement_cta_click", {
      ...what,
      cta_type:
        what.offering_id === "compare_all" ? "compare_link" : destination.kind === "contact" ? "contact_form" : "offer_page",
      inquiry_type: destination.kind === "contact" ? destination.inquiry : undefined,
    });
    // Close first so the contact form opens over the page, not over this popup.
    close("cta");
    if (destination.kind === "contact") {
      window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry: destination.inquiry } }));
    }
  };

  // Keyboard focus inside the carousel pauses it; a mouse click focusing a button does not.
  const keepFocusVisibleState = {
    onFocus: (e: React.FocusEvent) => {
      if (e.target instanceof HTMLElement && e.target.matches(":focus-visible")) setKeyboardInside(true);
    },
    onBlur: (e: React.FocusEvent) => {
      if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) setKeyboardInside(false);
    },
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center md:items-center md:p-6">
      <div className="promo-backdrop absolute inset-0 bg-black/70" aria-hidden="true" onClick={() => close("backdrop")} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Focused engagements with Dr. Grant Tate"
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
        className="promo-panel @container relative max-h-[94dvh] w-full overflow-y-auto overscroll-contain rounded-t-xl bg-[#111111] text-white outline-none md:max-w-[640px] md:rounded-xl lg:grid lg:aspect-[1200/680] lg:max-h-none lg:max-w-none lg:grid-cols-[1fr_2fr] lg:overflow-hidden lg:w-[min(1200px,calc(100vw-3rem),calc((100dvh-3rem)*1.7647))]"
      >
        {/* Desktop: the fixed intro panel. */}
        <div className="hidden min-h-0 flex-col p-[clamp(24px,3.33cqw,40px)] lg:flex">
          <Brand />

          <div className="mt-[clamp(20px,4.5cqw,48px)]">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 shrink-0" style={{ backgroundColor: RED }} aria-hidden="true" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#b3b3b3]">{PANEL.eyebrow}</p>
            </div>
            <h2
              className={`${serif.className} mt-4 text-balance text-[clamp(26px,3.33cqw,40px)] font-medium leading-[1.1] tracking-[-0.01em] text-white`}
            >
              {PANEL.headline}
            </h2>
            <p className="mt-4 text-[clamp(13px,1.25cqw,15px)] leading-relaxed text-[#b3b3b3]">{PANEL.subline}</p>
          </div>

          <div className="mt-[clamp(16px,2.5cqw,28px)] flex items-center gap-3">
            <Image
              src="/promo/grant-headshot.webp"
              alt="Dr. Grant Tate"
              aria-hidden="true"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight text-white">{PANEL.trust.name}</p>
              <p className="mt-0.5 text-xs leading-snug text-[#9e9e9e]">{PANEL.trust.role}</p>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-[clamp(12px,1.9cqw,20px)] pt-4">
            <CompareLink onClick={() => follow(PANEL.compare.destination, { offering_id: "compare_all" })} />
            <Pager index={index} onGo={(i) => go(i, "manual")} />
          </div>
        </div>

        {/* Phones and tablets: logo and headline above the carousel. */}
        <div className="px-5 pb-4 pt-5 md:px-8 md:pt-7 lg:hidden">
          <Brand />
          <h2
            className={`${serif.className} mt-4 text-balance text-[26px] font-medium leading-[1.12] tracking-[-0.01em] text-white md:text-[30px]`}
          >
            {PANEL.headline}
          </h2>
        </div>

        {/* The carousel. A swipe or the arrow keys move it; the graphics are shown whole on phones. */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Focused engagements"
          className="relative aspect-[678/567] w-full overflow-hidden bg-black lg:aspect-auto lg:h-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          {...keepFocusVisibleState}
        >
          {SLIDES.map((slide, i) => {
            const on = i === index;
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${COUNT}`}
                aria-hidden={!on}
                inert={!on}
                className={`absolute inset-0 transition-opacity ease-in-out motion-reduce:transition-none ${
                  on ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
              >
                <SlideTarget slide={slide} onActivate={() => follow(slide.destination, slideParams(i))}>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    loader={asIs}
                    sizes="(min-width: 1024px) 800px, (min-width: 768px) 640px, 100vw"
                    loading="eager"
                    fetchPriority={i === startSlide ? "high" : "auto"}
                    className="object-cover object-left"
                  />
                </SlideTarget>
              </div>
            );
          })}

          {/* White arrows sit above the graphics' own text, which starts lower down. */}
          <ArrowButton side="prev" onClick={() => step(-1)} />
          <ArrowButton side="next" onClick={() => step(1)} />

          <button
            type="button"
            onClick={() => close("close_button")}
            aria-label="Close"
            className="absolute right-2 top-2 z-30 flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/55">
              <X className="h-[18px] w-[18px] text-white" strokeWidth={2} aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Phones and tablets: the counter sits under the carousel. */}
        <div className="px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:px-8 lg:hidden">
          <Pager index={index} onGo={(i) => go(i, "manual")} />
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {announce}
        </p>
      </div>
    </div>,
    document.body,
  );
}

function slideParams(i: number) {
  return { offering_id: SLIDES[i].id, offering_name: SLIDES[i].name, slide_number: i + 1 };
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/oglogo.webp"
        alt={altFor("/oglogo.webp")}
        aria-hidden="true"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
      <span className="text-[15px] font-semibold tracking-normal text-white">BBTx Consulting</span>
    </div>
  );
}

function CompareLink({ onClick }: { onClick: () => void }) {
  return (
    <Link
      href={PANEL.compare.destination.href}
      onClick={onClick}
      className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {PANEL.compare.label}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </Link>
  );
}

/** "01 / 04" with one dash per slide; the active dash is red. */
function Pager({ index, onGo }: { index: number; onGo: (i: number) => void }) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-[13px] tabular-nums text-[#9e9e9e]" aria-hidden="true">
        <span className="font-medium text-white">{pad(index + 1)}</span> / {pad(COUNT)}
      </p>
      <div role="group" aria-label="Choose a slide" className="flex items-center">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => i !== index && onGo(i)}
            aria-label={`Show slide ${i + 1}: ${slide.name}`}
            aria-current={i === index ? "true" : undefined}
            className="group flex h-11 w-8 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
          >
            <span
              className={`block h-[2px] w-6 transition-colors motion-reduce:transition-none ${
                i === index ? "" : "bg-[#6e6e6e] group-hover:bg-[#a3a3a3]"
              }`}
              style={i === index ? { backgroundColor: RED } : undefined}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ArrowButton({ side, onClick }: { side: "prev" | "next"; onClick: () => void }) {
  const Icon = side === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "prev" ? "Previous slide" : "Next slide"}
      className={`absolute top-[28%] z-20 flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white ${
        side === "prev" ? "left-1" : "right-1"
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 motion-reduce:transition-none">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </span>
    </button>
  );
}

/** The whole slide is the target: a link when it goes to an approved page, a button when it opens the contact form. */
function SlideTarget({
  slide,
  onActivate,
  children,
}: {
  slide: PromoSlide;
  onActivate: () => void;
  children: React.ReactNode;
}) {
  const className =
    "relative block h-full w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white";
  const d = slide.destination;
  if (d.kind === "link") {
    return (
      <a
        href={d.href}
        target={d.external ? "_blank" : undefined}
        rel={d.external ? "noopener noreferrer" : undefined}
        onClick={onActivate}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onActivate} className={className}>
      {children}
    </button>
  );
}
