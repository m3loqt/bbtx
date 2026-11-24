"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "./ArrowIcon";
import { Loader2, CheckCircle, AlertCircle, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { trackEvent } from "@/lib/analytics";
import { ENGAGEMENT_INQUIRY_OPTIONS } from "@/lib/promo/inquiry-labels";

const CONTACT_EMAIL = "grant@bbtx.ai";
const CONTACT_PHONE = "+1 (434) 466-4655";
const SCHEDULE_URL = "https://www.calendly.com/granttate";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  /** Pre-selects the inquiry type, e.g. when opened from a specific service page. */
  defaultInquiry?: string;
};

type ContactFormData = {
  full_name: string;
  email: string;
  inquiry_type: string;
  message: string;
  website: string;
};

const INQUIRY_OPTIONS = [
  "Organizational Assessment & Analysis",
  "Strategy & Advisory Services",
  "Leadership, Management & Team Development",
  "AI Integration & Innovation",
  "Implementation & Change Support",
  // The homepage engagements popup opens this form with one of these pre-selected.
  ...ENGAGEMENT_INQUIRY_OPTIONS,
  "General Inquiry",
] as const;

const FADE_MS = 200;

// Shared looks, so the form reads like the mega menus: one white surface, quiet hairlines,
// the site's red only for the things you can act on.
const LABEL = "text-xs font-medium uppercase tracking-[0.14em] text-[#666666]";
const FIELD =
  "h-11 rounded-lg border-black/[0.1] bg-[#f6f6f6] text-[15px] focus-visible:border-[#111111] focus-visible:ring-black/10";
const TEXT_LINK =
  "rounded-sm underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#ca3726] hover:decoration-[#ca3726] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ca3726]";
// Horizontal rhythm: content sits 20px (phone) / 36px (desktop) in; hairlines run 16px wider on
// each side, exactly as in the mega menus.
const PAD = "px-5 sm:px-9";

/**
 * The contact form, as a panel that hangs from the navigation bar: the same white surface, width
 * and shadow as the mega menus, no gap. It is rendered by <Nav> directly under the bar (it is
 * positioned against the bar's wrapper), which turns white and squares its bottom corners while
 * the form is open. Opened with the "openContact" window event.
 */
export function ContactModal({ open, onClose, defaultInquiry }: ContactModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inquiryType, setInquiryType] = useState<string>(defaultInquiry ?? INQUIRY_OPTIONS[0]);
  const [prevOpen, setPrevOpen] = useState(open);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  // Opening starts from a clean form with this open's inquiry type; closing keeps the
  // content on screen while the panel fades out (it is not unmounted until then).
  // (Adjusting state while rendering, as React recommends, rather than in an effect.)
  if (open !== prevOpen) {
    setPrevOpen(open);
    setClosing(!open);
    if (open) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(null);
      setInquiryType(
        defaultInquiry && (INQUIRY_OPTIONS as readonly string[]).includes(defaultInquiry)
          ? defaultInquiry
          : INQUIRY_OPTIONS[0]
      );
    }
  }

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!closing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setClosing(false), reduce ? 0 : FADE_MS);
    return () => window.clearTimeout(t);
  }, [closing]);

  // While open: lock page scroll (keeping the scrollbar's room so the bar doesn't shift),
  // move focus into the form, close on Escape, and hand focus back afterwards.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const html = document.documentElement;
    const previousGutter = html.style.scrollbarGutter;
    html.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";

    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const raf = requestAnimationFrame(() => {
      panel?.querySelector<HTMLElement>('input[name="full_name"]')?.focus({ preventScroll: true });
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // While the dropdown is open, Escape closes just that list. (Its list element stays in the
      // page after closing, so ask the trigger, not the list.)
      if (panel?.querySelector('[role="combobox"][aria-expanded="true"]')) return;
      onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      html.style.scrollbarGutter = previousGutter;
      // Give focus back to what opened the form, unless the visitor already moved it on
      // (for example by clicking a menu in the bar).
      const active = document.activeElement;
      if (!active || active === document.body || panel?.contains(active)) {
        returnFocus.current?.focus({ preventScroll: true });
      }
    };
  }, [open]);

  if (!open && !closing) return null;

  const handleSubmit = async (formData: ContactFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);

      // Conversion: fires only after the server accepted the submission. The
      // honeypot field is filled only by bots, so those are never counted.
      // Only the inquiry type (a fixed dropdown value) is sent, never the
      // person's name, email, or message.
      if (!formData.website) {
        trackEvent("generate_lead", {
          lead_source: "contact_form",
          inquiry_type: formData.inquiry_type,
        });
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: ContactFormData = {
      full_name: (data.get("full_name") as string | null)?.trim() ?? "",
      email: (data.get("email") as string | null)?.trim() ?? "",
      inquiry_type: inquiryType,
      message: (data.get("message") as string | null)?.trim() ?? "",
      website: ((data.get("website") as string | null) ?? "").trim(),
    };

    void handleSubmit(payload);
  };

  // Keep Tab inside the form while it is open (it is modal: the page behind is covered).
  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = [
      ...panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), [role="combobox"]:not([disabled])'
      ),
    ].filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onKeyDown={onPanelKeyDown}
      // Laid 1px over the bar's bottom edge, like the mega menus, so there is no seam.
      // Scrolls inside itself when the window is too short for the whole form.
      className={`absolute inset-x-0 top-[calc(100%-1px)] max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-b-lg border border-t-0 border-black/[0.06] bg-white shadow-[0_22px_44px_rgba(0,0,0,0.10)] transition-opacity ease-out motion-reduce:transition-none sm:max-h-[calc(100dvh-7rem)] ${
        closing ? "opacity-0" : "animate-in fade-in motion-reduce:animate-none"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms`, animationDuration: `${FADE_MS}ms` }}
    >
      <div className="mx-3 border-t border-black/[0.07] sm:mx-5" aria-hidden="true" />

      <div className={`${PAD} pb-1 pt-6 sm:pt-8`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <h2
            id="contact-modal-title"
            className="text-[1.75rem] font-normal leading-tight tracking-[-0.02em] text-[#111111] sm:text-[2rem]"
          >
            Send us a message
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[15px] font-medium text-[#111111]">
            <a href={`mailto:${CONTACT_EMAIL}`} className={`inline-flex items-center gap-2 ${TEXT_LINK}`}>
              <Mail className="h-4 w-4 text-[#ca3726]" strokeWidth={1.5} aria-hidden />
              {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className={`inline-flex items-center gap-2 ${TEXT_LINK}`}>
              <Phone className="h-4 w-4 text-[#ca3726]" strokeWidth={1.5} aria-hidden />
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className={`${PAD} flex flex-col items-center pb-10 pt-8 text-center`}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ca3726]/10">
            <CheckCircle className="h-7 w-7 text-[#ca3726]" />
          </div>
          <p className="text-[20px] font-semibold text-[#1a1a1a]">Message sent.</p>
          <p className="mt-2 text-[15px] text-[#666666]">Thank you. Grant will be in touch shortly.</p>
          <Button variant="ghost" className="mt-6" type="button" onClick={() => onCloseRef.current()}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          {/* Honeypot — hidden from real users, catches bots */}
          <input
            type="text"
            name="website"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            value=""
            onChange={() => {}}
          />

          <div className={`${PAD} grid gap-4 pt-6 sm:grid-cols-2 sm:gap-6`}>
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className={LABEL}>
                  Your Name
                </Label>
                <Input
                  id="contact-name"
                  name="full_name"
                  type="text"
                  required
                  disabled={isLoading}
                  autoComplete="name"
                  className={FIELD}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-inquiry" className={LABEL}>
                  What can we help you with?
                </Label>
                <Select
                  value={inquiryType}
                  onValueChange={(val) => setInquiryType(val ?? INQUIRY_OPTIONS[0])}
                  disabled={isLoading}
                >
                  <SelectTrigger id="contact-inquiry" className={`${FIELD} w-full min-w-0`}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {INQUIRY_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-email" className={LABEL}>
                  Email Address
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className={FIELD}
                />
              </div>
            </div>

            <div className="flex min-h-0 flex-col space-y-1.5 sm:h-full">
              <Label htmlFor="contact-message" className={LABEL}>
                Your Message
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                disabled={isLoading}
                className="min-h-[100px] flex-1 rounded-lg border-black/[0.1] bg-[#f6f6f6] text-[15px] focus-visible:border-[#111111] focus-visible:ring-black/10"
              />
            </div>
          </div>

          {error && (
            <div className={`${PAD} pt-4`}>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <div>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </div>
              </Alert>
            </div>
          )}

          {/* Bottom row, as in the menus: a hairline, then the actions. Send is the main one; the
              calendar is the alternative for someone who would rather talk. */}
          <div className="mx-3 mt-6 flex flex-col gap-4 border-t border-black/[0.07] px-2 py-4 sm:mx-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#ca3726] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-[14px] text-[#666666]">
                Or{" "}
                <a
                  href={SCHEDULE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-medium text-[#111111] ${TEXT_LINK}`}
                >
                  schedule a conversation with us
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
            <button
              type="button"
              onClick={() => onCloseRef.current()}
              className="self-start rounded-sm text-[13.5px] font-medium text-[#444444] underline-offset-4 transition-colors hover:text-[#111111] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ca3726] sm:self-auto"
            >
              Close
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
