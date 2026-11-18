import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import nextConfig from "../../next.config.ts";

const redirects = await nextConfig.redirects();

test("legacy /services/organizational-ai-assessment permanently redirects to the current page", () => {
  const rule = redirects.find((r) => r.source === "/services/organizational-ai-assessment");
  assert.ok(rule, "redirect rule is missing");
  assert.equal(rule.permanent, true);
  assert.equal(rule.destination, "/services/organizational-assessment");
});

test("every redirect destination is a live page, not another redirect (no chains or loops)", () => {
  const sources = new Set(redirects.map((r) => r.source));
  for (const rule of redirects) {
    assert.notEqual(rule.source, rule.destination, `${rule.source} redirects to itself`);
    assert.equal(sources.has(rule.destination), false, `${rule.source} -> ${rule.destination} is a chain`);
    assert.ok(
      existsSync(`app${rule.destination}/page.tsx`),
      `${rule.destination} has no page.tsx`,
    );
  }
});

test("redirected sources no longer exist as real pages (otherwise the redirect would hide live content)", () => {
  for (const rule of redirects) {
    assert.equal(existsSync(`app${rule.source}/page.tsx`), false, `${rule.source} still has a page`);
  }
});
