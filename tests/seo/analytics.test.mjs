import test from "node:test";
import assert from "node:assert/strict";
import { trackEvent } from "../../lib/analytics.ts";

test("trackEvent is a safe no-op when GA is not loaded (SSR, blocked, no measurement ID)", () => {
  delete globalThis.window;
  assert.doesNotThrow(() => trackEvent("generate_lead", { lead_source: "contact_form" }));
  globalThis.window = {};
  assert.doesNotThrow(() => trackEvent("generate_lead"));
  delete globalThis.window;
});

test("trackEvent forwards the event name and params to gtag", () => {
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  trackEvent("generate_lead", { lead_source: "contact_form", inquiry_type: "Strategy" });
  delete globalThis.window;
  assert.deepEqual(calls, [["event", "generate_lead", { lead_source: "contact_form", inquiry_type: "Strategy" }]]);
});

test("trackEvent swallows analytics errors so they can never break the page", () => {
  globalThis.window = { gtag: () => { throw new Error("blocked"); } };
  assert.doesNotThrow(() => trackEvent("x"));
  delete globalThis.window;
});
