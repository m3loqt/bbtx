import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// These come from the OpenSEO site audit run after Batch 4 went live (2026-11-20, 35 pages).

// --- "Orphan page: /newsletter" ---------------------------------------------------------------
test("the newsletter page is linked from the footer, which is on every public page", () => {
  const footer = read("app/components/Footer.tsx");
  assert.match(footer, /\{ label: "Newsletter", href: "\/newsletter" \}/);
  // The page must keep existing for that link to be worth anything.
  assert.ok(read("app/newsletter/page.tsx").includes("export default function NewsletterPage"));
  assert.match(read("app/sitemap.ts"), /\/newsletter/);
});

// --- "Heading levels skip: /digital-twin-snapshot" -------------------------------------------
test("footer headings are h2, so a page with only an h1 above the footer never skips a level", () => {
  const footer = read("app/components/Footer.tsx");
  assert.doesNotMatch(footer, /<h3\b/, "a footer h3 right after an h1 skips a level");
  assert.equal((footer.match(/<h2\b/g) ?? []).length, 2, "the link-group heading and the subscribe heading");
  assert.equal((footer.match(/<\/h2>/g) ?? []).length, 2);
});

// --- "Thin content: /links" --------------------------------------------------------------------
test("the link-in-bio page is noindex (links still followed) and not in the sitemap", () => {
  const page = read("app/links/page.tsx");
  assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/);
  const sitemap = read("app/sitemap.ts");
  assert.doesNotMatch(sitemap, /\$\{BASE_URL\}\/links`/, "a noindex page must not be in the sitemap");
  // Everything else we rely on stays listed.
  for (const path of ["/newsletter", "/privacy", "/cookies"]) {
    assert.ok(sitemap.includes("${BASE_URL}" + path + "`"), `${path} must stay in the sitemap`);
  }
});
