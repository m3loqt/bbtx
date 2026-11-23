"use client";

// The homepage engagements popup. The popup IS the carousel: four slides, Previous/Next, no
// autoplay, nothing else promotional on the page. Mounted only when the trigger decides it
// may show (see EngagementsPopupTrigger), so none of this runs for visitors who never see it.
//
// Copy, prices and destinations live in lib/promo/engagements.ts. Behaviour rules (wrapping,
// dismissal, what counts as an interruption) live in lib/promo/popup-logic.ts.

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { trackEvent } from "@/lib/analytics";
import { altFor } from "@/lib/seo/image-alt";
import {
  ENGAGEMENTS,
  type DualEngagement,
  type EngagementOption,
  type PopupCta,
  type SingleEngagement,
} from "@/lib/promo/engagements";
import { safeStorage, wrapIndex, writeDismissed } from "@/lib/promo/popup-logic";
import { TwinMap } from "./TwinMap";

export type PopupSource = "timer" | "scroll" | "preview";
type CloseMethod = "close_button" | "escape" | "backdrop" | "cta";

const COUNT = ENGAGEMENTS.length;
const pad = (n: number) => String(n).padStart(2, "0");
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const PRICE_FONT = { fontFamily: "var(--font-fraunces), Georgia, serif" } as const;

type Props = {
  /** 0-based slide to open on. */
  startSlide?: number;
  source: PopupSource;
  onClose: () => void;
};

export default function EngagementsPopup({ startSlide = 0, source, onClose }: Props) {
  const preview = source === "preview";
  const [index, setIndex] = useState(startSlide);
  const [direction, setDirection] = useState<1 | -1 | 0>(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const slideParams = (i: number) => ({
    offering_id: ENGAGEMENTS[i].id,
    offering_name: ENGAGEMENTS[i].name,
    slide_number: i + 1,
  });

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
        last_offering_id: ENGAGEMENTS[current.current].id,
      });
      // Remember it for a week. In preview nothing is remembered, so the next reload shows it again.
      if (!preview) writeDismissed(safeStorage("localStorage"), Date.now());
      onClose();
    },
    [onClose, preview, track],
  );

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      current.current = next;
      setDirection(dir);
      setIndex(next);
      viewSlide(next);
      scrollRef.current?.scrollTo({ top: 0 });
    },
    [viewSlide],
  );

  const step = useCallback(
    (delta: 1 | -1) => goTo(wrapIndex(current.current, delta, COUNT), delta),
    [goTo],
  );

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
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.closest("[inert]"),
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

  // Left/Right while focus is inside the carousel. A swipe does the same on touch screens.
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
    // Mostly sideways and long enough, so scrolling the slide never changes it.
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6) step(dx < 0 ? 1 : -1);
  };

  const activate = (cta: PopupCta, option?: EngagementOption) => {
    track("mini_engagement_cta_click", {
      ...slideParams(current.current),
      cta_type: cta.kind === "contact" ? "contact_form" : "link",
      offering_option: option?.id,
      inquiry_type: cta.kind === "contact" ? cta.inquiry : undefined,
    });
    // Close first so the contact form opens over the page, not over this popup.
    close("cta");
    if (cta.kind === "contact") {
      window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry: cta.inquiry } }));
    }
  };

  const slideMotion = direction === 0 ? "" : direction === 1 ? "promo-slide-next" : "promo-slide-prev";
  const active = ENGAGEMENTS[index];

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center md:items-center md:p-6">
      <div className="promo-backdrop absolute inset-0 bg-black/40" aria-hidden="true" onClick={() => close("backdrop")} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Engagements with Dr. Grant Tate"
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="promo-panel relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-lg bg-white text-[#222222] outline-none md:max-h-[calc(100dvh-3rem)] md:max-w-[680px] md:rounded-lg lg:h-[min(768px,calc(100dvh-3rem))] lg:max-h-none lg:max-w-[1040px]"
      >
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Engagements"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div ref={scrollRef} className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            {/* Zero-height so it takes no room, sticky so Close stays in reach while the slide scrolls. */}
            <div className="pointer-events-none sticky top-0 z-30 flex h-0 justify-end">
              <button
                type="button"
                onClick={() => close("close_button")}
                aria-label="Close"
                className="pointer-events-auto mr-3 mt-3 flex h-11 items-center gap-2 rounded-md border border-black/15 bg-white px-3 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f2f2f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] md:mr-4 md:mt-4"
              >
                <span className="hidden md:inline">Close</span>
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* Only the slide on show is in the page, so a phone's sheet is never padded out to the
                longest slide, and a photo is fetched only when its slide is first shown. */}
            <section
              key={active.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${COUNT}: ${active.name}`}
              className={`flex flex-1 flex-col ${slideMotion}`}
            >
              {active.layout === "single" ? (
                <SingleSlide engagement={active} onActivate={activate} />
              ) : (
                <DualSlide engagement={active} onActivate={activate} />
              )}
            </section>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/10 bg-white px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] md:px-10 md:py-3 lg:py-2">
            <div className="flex items-center gap-3 md:gap-5">
              <p className="text-sm tabular-nums text-[#555555]" aria-hidden="true">
                <span className="font-semibold text-[#222222]">{pad(index + 1)}</span> / {pad(COUNT)}
              </p>
              <div role="group" aria-label="Choose an engagement" className="flex items-center">
                {ENGAGEMENTS.map((engagement, i) => (
                  <button
                    key={engagement.id}
                    type="button"
                    onClick={() => i !== index && goTo(i, i > index ? 1 : -1)}
                    aria-label={`Show engagement ${i + 1}: ${engagement.name}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group flex h-11 w-7 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#222222]"
                  >
                    <span
                      className={`block h-[2px] w-5 transition-colors ${
                        i === index ? "bg-[#222222]" : "bg-black/45 group-hover:bg-black/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous engagement"
                className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-black/15 px-3 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f2f2f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] md:px-4"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next engagement"
                className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-black/15 px-3 text-sm font-medium text-[#222222] transition-colors hover:bg-[#f2f2f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] md:px-4"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {`Engagement ${index + 1} of ${COUNT}: ${active.name}`}
        </p>
      </div>
    </div>,
    document.body,
  );
}

/** The headline with its emphasised phrase set in italics, as the homepage hero does. */
function Headline({ text, emphasis, className }: { text: string; emphasis: string; className: string }) {
  const at = text.indexOf(emphasis);
  return (
    <h2 className={className}>
      {at < 0 ? (
        text
      ) : (
        <>
          {text.slice(0, at)}
          <span className="italic tracking-normal">{emphasis}</span>
          {text.slice(at + emphasis.length)}
        </>
      )}
    </h2>
  );
}

function Included({ items, compact }: { items: readonly string[]; compact?: boolean }) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[#555555]">What&apos;s included</h3>
      <ul className="mt-3 border-t border-black/10">
        {items.map((item) => (
          <li
            key={item}
            className={`border-b border-black/10 py-3 text-[15px] leading-snug text-[#222222] ${compact ? "lg:py-[7px]" : "lg:py-3.5"}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Price({ value, className }: { value: string; className: string }) {
  return (
    <p className={`italic leading-none tracking-tight text-[#222222] ${className}`} style={PRICE_FONT}>
      {value}
    </p>
  );
}

function CtaButton({ cta, onClick }: { cta: PopupCta; onClick: () => void }) {
  const className =
    "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-center text-[15px] font-medium leading-snug text-white transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]";
  const content = (
    <>
      <span className="text-balance">{cta.label}</span>
      <ArrowUpRight className="h-[18px] w-[18px] shrink-0" />
    </>
  );
  if (cta.kind === "link") {
    return (
      <a
        href={cta.href}
        target={cta.external ? "_blank" : undefined}
        rel={cta.external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function SingleSlide({
  engagement,
  onActivate,
}: {
  engagement: SingleEngagement;
  onActivate: (cta: PopupCta, option?: EngagementOption) => void;
}) {
  const { visual } = engagement;
  return (
    <div className="promo-single flex-1">
      <div className="promo-area-visual relative h-[120px] overflow-hidden bg-[#f2f2f2] md:h-[190px] lg:h-auto lg:min-h-[230px] lg:border-l lg:border-black/10">
        {visual.kind === "map" ? (
          <TwinMap className="absolute inset-0 h-full w-full" />
        ) : (
          <Image
            src={visual.src}
            alt={altFor(visual.src)}
            fill
            sizes="(min-width: 1040px) 380px, (min-width: 768px) 680px, 100vw"
            className="object-cover"
            style={{ objectPosition: visual.position }}
          />
        )}
      </div>

      <div className="promo-area-product flex items-baseline justify-between gap-4 px-5 pt-5 md:px-10 md:pt-6 lg:flex-col lg:items-start lg:gap-3 lg:border-l lg:border-black/10 lg:bg-[#f7f7f7] lg:px-8 lg:pt-7">
        <p className="min-w-0 text-[17px] font-semibold leading-snug tracking-normal text-[#222222]">{engagement.name}</p>
        <Price value={engagement.price} className="shrink-0 text-[34px] lg:text-[52px]" />
      </div>

      <div className="promo-area-text flex flex-col px-5 pb-2 pt-4 md:px-10 lg:py-10 lg:pr-12">
        <Headline
          text={engagement.headline}
          emphasis={engagement.emphasis}
          className="text-balance text-[26px] font-medium leading-[1.12] tracking-tight text-[#222222] md:text-[34px] lg:text-[40px] lg:leading-[1.06]"
        />
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[#444444] md:mt-5 md:text-base lg:mt-6 lg:text-[17px] lg:leading-[1.65]">
          {engagement.description}
        </p>
        <div className="mt-6 lg:mt-auto lg:pt-8">
          <Included items={engagement.included} />
        </div>
      </div>

      {/* On a phone the action stays in view at the foot of the sheet while the slide scrolls. */}
      <div className="promo-area-cta max-lg:sticky max-lg:bottom-0 max-lg:z-10 max-lg:mt-3 max-lg:border-t max-lg:border-black/10 max-lg:bg-white px-5 pb-4 pt-3 md:px-10 lg:border-l lg:border-black/10 lg:bg-[#f7f7f7] lg:px-8 lg:pb-8 lg:pt-6">
        <CtaButton cta={engagement.cta} onClick={() => onActivate(engagement.cta)} />
      </div>
    </div>
  );
}

function DualSlide({
  engagement,
  onActivate,
}: {
  engagement: DualEngagement;
  onActivate: (cta: PopupCta, option?: EngagementOption) => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      {/* The top gap is where Close sits, so it never overlaps the headline or the description. */}
      <div className="px-5 pb-1 pt-16 md:px-10 md:pt-16 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-14 lg:pb-0 lg:pt-14">
        <Headline
          text={engagement.headline}
          emphasis={engagement.emphasis}
          className="text-balance text-[26px] font-medium leading-[1.12] tracking-tight text-[#222222] md:text-[34px] lg:text-[36px] lg:leading-[1.08]"
        />
        <p className="mt-4 text-[15px] leading-relaxed text-[#444444] md:text-base lg:mt-1.5">{engagement.description}</p>
      </div>

      <div className="mt-6 flex flex-1 flex-col border-t border-black/10 bg-[#f7f7f7] lg:mt-8">
        <p className="px-5 pt-5 text-[17px] font-semibold leading-snug text-[#222222] md:px-10">{engagement.name}</p>
        <div className="flex-1 lg:grid lg:grid-cols-2">
          {engagement.options.map((option, i) => (
            <div
              key={option.id}
              className={`flex flex-col px-5 pb-6 pt-5 md:px-10 lg:pb-6 lg:pt-4 ${
                i === 1 ? "border-t border-black/10 lg:border-l lg:border-t-0" : ""
              }`}
            >
              <h3 className="text-[17px] font-semibold leading-snug text-[#222222]">{option.name}</h3>
              <Price value={option.price} className="mt-3 text-[40px] lg:mt-2 lg:text-[42px]" />
              <div className="mt-6 lg:mt-5">
                <Included items={option.included} compact />
              </div>
              {option.note && <p className="mt-3 text-sm text-[#555555]">{option.note}</p>}
              <div className="mt-auto pt-5">
                <CtaButton cta={option.cta} onClick={() => onActivate(option.cta, option)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
