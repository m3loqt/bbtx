import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import nextConfig from "../../next.config.ts";
import { CONTENT_SECURITY_POLICY, securityHeaders } from "../../lib/security-headers.ts";
import { composeMetaDescription, ensureImageAlt, htmlToText } from "../../lib/seo/post-content.ts";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// These tests come from a Screaming Frog crawl of the live site (issues overview report,
// 2026-11-19). Each group names the issue it keeps fixed.

// --- "Canonicals / Page Titles / Meta Description / Directives: Outside <head>" -------------
test("head metadata is never streamed into <body>, for any crawler", () => {
  const bots = nextConfig.htmlLimitedBots;
  assert.ok(bots instanceof RegExp, "next.config.ts must set htmlLimitedBots");
  for (const ua of [
    "Screaming Frog SEO Spider/21.0",
    "GPTBot/1.2",
    "ClaudeBot/1.0",
    "PerplexityBot/1.0",
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36",
  ]) {
    assert.ok(bots.test(ua), `${ua} must be treated as needing head metadata`);
  }
});

// --- "Security: Missing Content-Security-Policy / X-Frame-Options / Referrer-Policy / X-Content-Type-Options"
test("every route gets the four security headers in production", async () => {
  const names = (h) => h.map((x) => x.key);
  assert.deepEqual(names(securityHeaders({ production: true })), [
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Content-Security-Policy",
  ]);
  const byKey = Object.fromEntries(securityHeaders({ production: true }).map((h) => [h.key, h.value]));
  assert.equal(byKey["X-Content-Type-Options"], "nosniff");
  assert.equal(byKey["X-Frame-Options"], "SAMEORIGIN");
  assert.equal(byKey["Referrer-Policy"], "strict-origin-when-cross-origin");
  // `next dev` needs eval for hot reload; the CSP is production-only.
  assert.ok(!names(securityHeaders({ production: false })).includes("Content-Security-Policy"));

  const rules = await nextConfig.headers();
  const all = rules.find((r) => r.source === "/:path*");
  assert.ok(all, "headers must apply to every path");
  assert.ok(names(all.headers).includes("X-Frame-Options"));
});

test("the CSP is tight where it can be and allows exactly what the site uses", () => {
  const directives = Object.fromEntries(
    CONTENT_SECURITY_POLICY.split(";").map((d) => d.trim()).filter(Boolean).map((d) => {
      const [name, ...values] = d.split(/\s+/);
      return [name, values];
    }),
  );
  assert.deepEqual(directives["default-src"], ["'self'"]);
  assert.deepEqual(directives["object-src"], ["'none'"]);
  assert.deepEqual(directives["frame-ancestors"], ["'self'"]);
  assert.deepEqual(directives["base-uri"], ["'self'"]);
  assert.deepEqual(directives["form-action"], ["'self'"]);
  // The only third-party script is Google Tag Manager, and nothing may use eval.
  assert.deepEqual(directives["script-src"], ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"]);
  assert.ok(!CONTENT_SECURITY_POLICY.includes("unsafe-eval"));
  assert.ok(!directives["script-src"].some((v) => v === "*" || v === "https:"));
  // Analytics must still be able to report, and images must still load from Substack/Blob/S3.
  assert.ok(directives["connect-src"].includes("https://www.google-analytics.com"));
  assert.ok(directives["connect-src"].includes("https://*.analytics.google.com"));
  assert.ok(directives["img-src"].includes("https:") && directives["img-src"].includes("data:"));
  assert.ok(directives["font-src"].includes("'self'"));
});

// --- "Meta Description: Below 70 / Over 155 characters", "Page Titles: Over 60 characters" -----
const DESCRIPTION_FILES = [
  "app/page.tsx",
  "app/services/layout.tsx",
  "app/services/strategy-advisory/layout.tsx",
  "app/services/implementation-support/layout.tsx",
  "app/services/executive-recruitment/layout.tsx",
  "app/courses/layout.tsx",
  "app/digital-twin-snapshot/layout.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/cookies/page.tsx",
  "app/links/page.tsx",
];

test("every meta description we rewrote is 70 to 155 characters", () => {
  for (const file of DESCRIPTION_FILES) {
    const src = read(file);
    const m = src.slice(src.indexOf("export const metadata")).match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
    assert.ok(m, `${file}: no description found`);
    assert.ok(m[1].length >= 70 && m[1].length <= 155, `${file}: description is ${m[1].length} characters`);
  }
});

test("the courses title fits in a search result with the site suffix", () => {
  const m = read("app/courses/layout.tsx").match(/title:\s*"([^"]+)"/);
  assert.ok(m);
  assert.ok(m[1].length + " | BBTx".length <= 60, `courses title is ${m[1].length + 7} characters with the suffix`);
  assert.match(m[1], /Making Modern Managers/);
});

test("the homepage still carries the claim exactly as before (not changed here)", () => {
  // "100+ organizations" is unverified under the SEO addendum and awaits Grant; shortening the
  // description must not silently drop or alter it.
  assert.match(read("app/page.tsx"), /100\+ organizations served across 40\+ years of consulting/);
});

// --- blog posts: short excerpts and images without alt --------------------------------------
test("a long enough excerpt is used as is", () => {
  const excerpt = "Inside the New Clark City AI hub deal, and what it means for Philippine water, power, and land";
  assert.equal(composeMetaDescription(excerpt, "<p>Body text that should not appear.</p>"), excerpt);
});

test("a short subtitle is extended with the opening of the post, within 70 to 155 characters", () => {
  const body = "<p>Yesterday morning began with the familiar rhythm: back-to-back meetings with a friend in another time zone and a long list of things to do before lunch.</p>";
  const d = composeMetaDescription("Grief, gratitude, and the work", body);
  assert.ok(d.startsWith("Grief, gratitude, and the work. Yesterday morning began"));
  assert.ok(d.length >= 70 && d.length <= 155, `${d.length} characters`);
  assert.ok(d.endsWith("…"), "a cut description ends with an ellipsis");
});

test("a subtitle repeated at the start of the body is not said twice, and headings are skipped", () => {
  const body = "<h2>Section title that is not the opening</h2><p>Pattern Recognition: The Distinguishing Skill in the World of AI. In the complex architecture of modern organizational leadership, one skill stands out among all the others for what it allows a leader to do.</p>";
  const d = composeMetaDescription("Pattern Recognition", body);
  assert.doesNotMatch(d, /Pattern Recognition\. Pattern Recognition/);
  assert.doesNotMatch(d, /Section title/);
  assert.ok(d.startsWith("Pattern Recognition. The Distinguishing Skill"));
});

test("entities are decoded, tags and captions are dropped, and nothing is invented", () => {
  assert.equal(htmlToText("<p>Tom &amp; Jerry&rsquo;s <b>big</b> day&nbsp;out</p><figcaption>A caption</figcaption>"), "Tom & Jerry’s big day out");
  assert.equal(composeMetaDescription("", "<p></p>"), undefined);
  assert.equal(composeMetaDescription("Only a short lead", ""), "Only a short lead");
  assert.equal(composeMetaDescription(null, "<p>Just the body, no excerpt at all, so the description is simply its opening words.</p>"), "Just the body, no excerpt at all, so the description is simply its opening words.");
});

test("every image in a post gets non-empty alt text, and good alt text is left alone", () => {
  const out = ensureImageAlt(
    '<img src="/a.png" alt=""><img alt="A chart of results" src="/b.png"><img src="/c.png"><img src="/d.png" title="From the title attribute" />',
    "My Post",
  );
  const alts = [...out.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0].match(/\balt="([^"]*)"/)?.[1]);
  assert.deepEqual(alts, ["Image from “My Post”", "A chart of results", "Image from “My Post”", "From the title attribute"]);
  assert.match(out, /<img src="\/d\.png" title="From the title attribute" alt="From the title attribute" \/>/, "self-closing is preserved");
  assert.ok(!/alt=""/.test(out));
});

test("an image takes the caption that follows it, but never one belonging to a later image", () => {
  const caption = ensureImageAlt('<figure><img src="/a.png" alt=""><figcaption>Grant at the whiteboard</figcaption></figure>', "T");
  assert.match(caption, /alt="Grant at the whiteboard"/);
  const two = ensureImageAlt('<img src="/a.png" alt=""><img src="/b.png" alt=""><figcaption>Second only</figcaption>', "T");
  const alts = [...two.matchAll(/alt="([^"]*)"/g)].map((m) => m[1]);
  assert.equal(alts[0], "Image from “T”", "the first image must not steal the second image's caption");
  assert.equal(alts[1], "Second only");
});

test("alt text is escaped so a post title with quotes cannot break the markup", () => {
  const out = ensureImageAlt('<img src="/a.png">', 'Say "hello" & <wave>');
  assert.match(out, /alt="Image from “Say &quot;hello&quot; &amp; &lt;wave>”"/);
  assert.equal(ensureImageAlt(null, "T"), "");
  assert.equal(ensureImageAlt("<p>no images here</p>", "T"), "<p>no images here</p>");
});

test("the blog post page uses both helpers", () => {
  const page = read("app/chaotic-confluence/[slug]/page.tsx");
  assert.match(page, /composeMetaDescription\(post\.excerpt, post\.content\)/);
  assert.match(page, /__html: ensureImageAlt\(post\.content, post\.title\)/);
});

// --- "H2: Non-Sequential / Missing" -----------------------------------------------------------
test("pages that jumped from <h1> to <h3> now use <h2>", () => {
  assert.doesNotMatch(read("app/chaotic-confluence/ChaoticConfluenceExperience.tsx"), /<h3\b/, "blog index post titles are h2");
  assert.match(read("app/chaotic-confluence/ChaoticConfluenceExperience.tsx"), /<h2 className="mt-2\.5[^"]*">\s*\{post\.title\}\s*<\/h2>/);
  assert.match(read("app/courses/page.tsx"), /<h2 className="text-lg[^"]*">\{plan\.title\}<\/h2>/, "the three tiers are h2, the course titles under 'AI Courses' stay h3");
  assert.match(read("app/courses/page.tsx"), /<h3 className="text-lg[^"]*">\{course\.title\}<\/h3>/);
  assert.match(read("app/resources/page.tsx"), /<h2 className="text-lg[^"]*">\s*\{item\.title\}\s*<\/h2>/);
});
