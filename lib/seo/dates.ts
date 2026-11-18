// Shared date helpers for anything that renders or emits a calendar date.
//
// Why this exists: Postgres `date` columns (blogs.published_date, etc.) come
// back from the Neon driver as JS `Date` objects at local midnight, even though
// lib/admin/types.ts types them as `string`. Passing that Date straight into
// Next metadata produced `article:published_time content="[object Object]"`,
// and formatting it with the viewer's local time zone can shift the day by one
// between server render and client hydration. Everything date-like should go
// through these helpers so the value is normalised once, on the server.

export type DateLike = Date | string | null | undefined;

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/;

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** True when y/m/d describe a real calendar day (rejects 2026-02-31). */
function isRealCalendarDay(y: number, m: number, d: number): boolean {
  const probe = new Date(Date.UTC(y, m - 1, d));
  return (
    probe.getUTCFullYear() === y &&
    probe.getUTCMonth() === m - 1 &&
    probe.getUTCDate() === d
  );
}

/**
 * Normalise a date-only value (Postgres `date`) to "YYYY-MM-DD", or null when
 * missing/invalid. Never substitutes today's date for a missing value.
 *
 * - Strings that already start with YYYY-MM-DD keep that calendar day as-is.
 * - JS Dates use their local components, because the Neon driver builds a
 *   `date` as local midnight (identical to UTC on Vercel's servers).
 */
export function toDateOnly(value: DateLike): string | null {
  if (value == null || value === "") return null;

  if (typeof value === "string") {
    const match = DATE_ONLY.exec(value.trim());
    if (match) {
      const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
      return isRealCalendarDay(y, m, d) ? `${match[1]}-${match[2]}-${match[3]}` : null;
    }
    const parsed = new Date(value);
    return isValidDate(parsed) ? toDateOnly(parsed) : null;
  }

  if (isValidDate(value)) {
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
  }

  return null;
}

/** Full ISO 8601 timestamp for real instants (timestamptz columns), or null. */
export function toIsoTimestamp(value: DateLike): string | null {
  if (value == null || value === "") return null;
  const date = typeof value === "string" ? new Date(value) : value;
  return isValidDate(date) ? date.toISOString() : null;
}

export type DisplayStyle = "long" | "medium" | "monthYear";

const DISPLAY_OPTIONS: Record<DisplayStyle, Intl.DateTimeFormatOptions> = {
  long: { month: "long", day: "numeric", year: "numeric" },
  medium: { month: "short", day: "numeric", year: "numeric" },
  monthYear: { month: "short", year: "numeric" },
};

/**
 * Human-readable date for a date-only value. Always formats the calendar day in
 * UTC so the server render and the browser agree regardless of time zone.
 * Returns null (so callers can hide the element) when the value is unusable.
 */
export function formatDisplayDate(value: DateLike, style: DisplayStyle = "long"): string | null {
  const dateOnly = toDateOnly(value);
  if (!dateOnly) return null;
  const [y, m, d] = dateOnly.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    ...DISPLAY_OPTIONS[style],
    timeZone: "UTC",
  });
}
