"use client";

// The button at the end of an offering. It opens the contact form with this offering pre-selected, so
// Grant sees which one was asked about. An inquiry, not a booking or a payment.

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { EngagementInquiry } from "@/lib/promo/inquiry-labels";

export function OfferingCta({
  label,
  inquiry,
  offeringId,
  option,
  variant = "primary",
}: {
  label: string;
  inquiry: EngagementInquiry;
  offeringId: string;
  /** Which of two choices on one page (the staying-relevant page has two). */
  option?: "workshop" | "private_analysis";
  variant?: "primary" | "secondary";
}) {
  const style =
    variant === "primary"
      ? "bg-[#C8102E] text-white hover:bg-[#A60D26]"
      : "border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white";
  return (
    <button
      type="button"
      onClick={() => {
        // Only fixed values are sent: never anything a visitor typed.
        trackEvent("offering_cta_click", { offering_id: offeringId, offering_option: option, inquiry_type: inquiry });
        window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry } }));
      }}
      className={`group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md px-8 py-3 text-center text-[1.0625rem] font-medium leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] sm:w-auto ${style}`}
    >
      <span className="text-balance">{label}</span>
      <ArrowRight
        className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </button>
  );
}
