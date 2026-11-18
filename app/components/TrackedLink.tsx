"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** GA4 event name. Use only for non-conversion events (e.g. a guide-to-service click). */
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

/** A next/link that reports a GA4 event when clicked. */
export function TrackedLink({ eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}
