import test from "node:test";
import assert from "node:assert/strict";
import { toDateOnly, toIsoTimestamp, formatDisplayDate } from "../../lib/seo/dates.ts";

test("toDateOnly: a Postgres date arrives as a local-midnight Date and keeps its calendar day", () => {
  assert.equal(toDateOnly(new Date(2026, 1, 26)), "2026-02-26");
});

test("toDateOnly: strings keep their calendar day, with or without a time part", () => {
  assert.equal(toDateOnly("2026-04-28"), "2026-04-28");
  assert.equal(toDateOnly("2026-04-28T00:00:00.000Z"), "2026-04-28");
});

test("toDateOnly: missing or invalid values return null, never today's date", () => {
  for (const bad of [null, undefined, "", "not a date", new Date("nope"), "2026-02-31", "2026-13-01"]) {
    assert.equal(toDateOnly(bad), null, `expected null for ${String(bad)}`);
  }
});

test("toDateOnly never returns an object (regression: article:published_time was [object Object])", () => {
  const out = toDateOnly(new Date(2026, 2, 30));
  assert.equal(typeof out, "string");
  assert.doesNotMatch(String(out), /object/i);
});

test("toIsoTimestamp: real instants become ISO strings; junk becomes null", () => {
  assert.equal(toIsoTimestamp("2026-07-27T14:14:53.568Z"), "2026-07-27T14:14:53.568Z");
  assert.equal(toIsoTimestamp(new Date("2026-07-27T14:14:53.568Z")), "2026-07-27T14:14:53.568Z");
  assert.equal(toIsoTimestamp(null), null);
  assert.equal(toIsoTimestamp("garbage"), null);
});

test("formatDisplayDate: stable calendar day regardless of process time zone", () => {
  const original = process.env.TZ;
  try {
    for (const tz of ["UTC", "America/New_York", "Pacific/Auckland"]) {
      process.env.TZ = tz;
      assert.equal(formatDisplayDate("2026-02-26", "long"), "February 26, 2026");
      assert.equal(formatDisplayDate("2026-02-26", "medium"), "Feb 26, 2026");
      assert.equal(formatDisplayDate("2026-02-26", "monthYear"), "Feb 2026");
    }
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});

test("formatDisplayDate: unusable values return null so the caller can hide the element", () => {
  assert.equal(formatDisplayDate(null), null);
  assert.equal(formatDisplayDate("2026-02-31"), null);
});
