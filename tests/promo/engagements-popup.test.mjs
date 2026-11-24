import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  AUTOPLAY_MS,
  COOLDOWN_MINUTES,
  COOLDOWN_MS,
  CROSSFADE_MS,
  EXCLUDED_PATHS,
  EXIT_INTENT_ARM_MS,
  FREQUENCY_CAP_ENABLED,
  MIN_DWELL_MS,
  SHOWN_KEY,
  TRIGGER_DELAY_MS,
  TRIGGER_SCROLL_FRACTION,
  frequencyCapBlocks,
  interruptionReason,
  isExcludedPath,
  isExitIntent,
  parsePreview,
  readShownRecently,
  scrollFraction,
  shownRecently,
  wrapIndex,
  writeShown,
} from "../../lib/promo/popup-logic.ts";
import { PANEL, SLIDES } from "../../lib/promo/engagements.ts";
import { ENGAGEMENT_INQUIRY, ENGAGEMENT_INQUIRY_OPTIONS } from "../../lib/promo/inquiry-labels.ts";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const MIN = 60 * 1000;
/** Source without its comments, so a comment that mentions a word is not mistaken for code that uses it. */
const code = (p) => read(p).replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
const POPUP = "app/components/engagements-popup/EngagementsPopup.tsx";
const TRIGGER = "app/components/engagements-popup/EngagementsPopupTrigger.tsx";

// --- Carousel ----------------------------------------------------------------------------------
test("Previous and Next wrap around the four slides", () => {
  assert.equal(wrapIndex(0, 1, 4), 1);
  assert.equal(wrapIndex(3, 1, 4), 0, "Next from the fourth slide goes to the first");
  assert.equal(wrapIndex(0, -1, 4), 3, "Previous from the first slide goes to the fourth");
  assert.equal(wrapIndex(0, 1, 0), 0, "an empty carousel never produces NaN");
});

test("auto-advance is every 6 seconds with a 400 ms crossfade", () => {
  assert.equal(AUTOPLAY_MS, 6000);
  assert.equal(CROSSFADE_MS, 400);
});

// --- When it shows -------------------------------------------------------------------------------
test("triggers: exit intent, or 5 seconds, or 50% scrolled; never straight away", () => {
  assert.equal(TRIGGER_DELAY_MS, 5_000);
  assert.equal(TRIGGER_SCROLL_FRACTION, 0.5);
  assert.ok(MIN_DWELL_MS >= 2_000 && MIN_DWELL_MS < TRIGGER_DELAY_MS, "a restored scroll position cannot trigger it at first paint");
  assert.ok(EXIT_INTENT_ARM_MS >= 3_000, "a quick bounce is not pitched at");
  assert.equal(isExitIntent({ clientY: -1 }), true);
  assert.equal(isExitIntent({ clientY: 0 }), true);
  assert.equal(isExitIntent({ clientY: 300 }), false, "leaving through the side or bottom is not exit intent");
});

test("scrollFraction is the share of the scrollable height, clamped, and 0 when nothing scrolls", () => {
  assert.equal(scrollFraction(0, 3000, 1000), 0);
  assert.equal(scrollFraction(1000, 3000, 1000), 0.5);
  assert.equal(scrollFraction(5000, 3000, 1000), 1);
  assert.equal(scrollFraction(-20, 3000, 1000), 0);
  assert.equal(scrollFraction(0, 800, 1000), 0);
});

test("never on offer or booking pages, nor on pages that are not for browsing", () => {
  for (const path of [
    "/offerings/digital-twin-assessment",
    "/offerings/staying-relevant",
    "/services",
    "/services/strategy-advisory",
    "/services/ai-integration/",
    "/coaching",
    "/courses",
    "/digital-twin-snapshot",
    "/assessment",
    "/resources/ai-readiness-assessment",
    "/book",
    "/booking/confirm",
    "/schedule",
    "/admin",
    "/admin/contacts",
    "/links",
    "/privacy",
    "/terms",
    "/cookies",
  ]) {
    assert.equal(isExcludedPath(path), true, path);
  }
  for (const path of ["/", "/about", "/team/grant", "/chaotic-confluence", "/chaotic-confluence/some-post", "/newsletter", "/whitepapers", "/resources"]) {
    assert.equal(isExcludedPath(path), false, path);
  }
  assert.equal(isExcludedPath(null), false, "no pathname is treated as the homepage");
  assert.equal(isExcludedPath("/services?x=1"), true, "a query string does not escape the rule");
  assert.equal(isExcludedPath("/servicesx"), false, "a prefix only matches whole path segments");
  assert.ok(EXCLUDED_PATHS.includes("/services") && EXCLUDED_PATHS.includes("/coaching") && EXCLUDED_PATHS.includes("/courses"));
});

test("every excluded offer page really is an offer page, and the pages it shows on exist", () => {
  // The exclusion list must point at real routes (or deliberate future ones), never typos of them.
  for (const dir of ["offerings", "services", "coaching", "courses", "digital-twin-snapshot", "links", "privacy", "terms", "cookies"]) {
    assert.ok(existsSync(join(ROOT, "app", dir)), `app/${dir} should exist`);
  }
});

test("it never interrupts another dialog, the open menu, typing, or a hidden tab", () => {
  const doc = (over = {}) => ({
    visibilityState: "visible",
    activeElement: { tagName: "BODY" },
    querySelector: () => null,
    body: { style: { position: "", overflow: "" } },
    ...over,
  });
  assert.equal(interruptionReason(doc()), null);
  assert.equal(interruptionReason(doc({ visibilityState: "hidden" })), "tab-hidden");
  assert.equal(interruptionReason(doc({ querySelector: (sel) => (sel.includes("aria-modal") ? {} : null) })), "dialog-open");
  assert.equal(interruptionReason(doc({ body: { style: { position: "fixed" } } })), "page-locked");
  assert.equal(interruptionReason(doc({ body: { style: { overflow: "hidden" } } })), "page-locked");
  for (const tag of ["INPUT", "TEXTAREA", "SELECT"]) assert.equal(interruptionReason(doc({ activeElement: { tagName: tag } })), "typing");
  assert.equal(interruptionReason(doc({ activeElement: { tagName: "DIV", isContentEditable: true } })), "typing");
});

// --- Frequency cap (30 minutes; currently switched off for testing) -------------------------------------
test("the cap is 30 minutes, not a moment longer", () => {
  assert.equal(COOLDOWN_MINUTES, 30);
  assert.equal(COOLDOWN_MS, 30 * MIN);
  const now = 1_800_000_000_000;
  assert.equal(shownRecently(String(now - 1 * MIN), now), true);
  assert.equal(shownRecently(String(now - (30 * MIN - 1000)), now), true);
  assert.equal(shownRecently(String(now - 30 * MIN), now), false);
  assert.equal(shownRecently(String(now - 3 * 60 * MIN), now), false);
});

test("with the cap on it blocks a repeat in this visit or inside 30 minutes; with it off it never blocks", () => {
  const now = 1_800_000_000_000;
  const base = { visitShown: false, seenThisSession: false, lastShown: null, now };
  assert.equal(frequencyCapBlocks({ ...base, enabled: true }), false, "first time: allowed");
  assert.equal(frequencyCapBlocks({ ...base, enabled: true, visitShown: true }), true);
  assert.equal(frequencyCapBlocks({ ...base, enabled: true, seenThisSession: true }), true);
  assert.equal(frequencyCapBlocks({ ...base, enabled: true, lastShown: String(now - 10 * MIN) }), true);
  assert.equal(frequencyCapBlocks({ ...base, enabled: true, lastShown: String(now - 31 * MIN) }), false);
  // Off: nothing blocks, whatever the memory says.
  assert.equal(frequencyCapBlocks({ visitShown: true, seenThisSession: true, lastShown: String(now - 1 * MIN), now, enabled: false }), false);
});

test("the cap is switched OFF for now; this test marks the place to flip it back on", () => {
  // Testing needs the popup on every load. Before publishing, set FREQUENCY_CAP_ENABLED to true in
  // lib/promo/popup-logic.ts and change this expectation to true.
  assert.equal(FREQUENCY_CAP_ENABLED, false);
  assert.equal(frequencyCapBlocks({ visitShown: true, seenThisSession: true, lastShown: String(Date.now()), now: Date.now() }), false);
});

test("a missing, garbled or future timestamp is ignored rather than trusted", () => {
  const now = 1_800_000_000_000;
  for (const raw of [null, undefined, "", "abc", "0", "-5", "NaN", String(now + 60 * MIN)]) assert.equal(shownRecently(raw, now), false, `raw=${raw}`);
});

test("storage that is blocked, missing or throwing never breaks reading or writing", () => {
  const now = 1_800_000_000_000;
  const throwing = { getItem() { throw new Error("SecurityError"); }, setItem() { throw new Error("QuotaExceededError"); } };
  assert.equal(readShownRecently(throwing, now), false);
  assert.doesNotThrow(() => writeShown(throwing, now));
  assert.equal(readShownRecently(null, now), false);
  assert.doesNotThrow(() => writeShown(null, now));
});

test("a recorded show time is read back, then expires after 30 minutes", () => {
  const bag = new Map();
  const storage = { getItem: (k) => bag.get(k) ?? null, setItem: (k, v) => bag.set(k, v) };
  const now = 1_800_000_000_000;
  assert.equal(readShownRecently(storage, now), false);
  writeShown(storage, now);
  assert.equal(bag.has(SHOWN_KEY), true);
  assert.equal(readShownRecently(storage, now + 10 * MIN), true);
  assert.equal(readShownRecently(storage, now + 31 * MIN), false);
});

test("?promo=open is the review switch; anything else is ignored", () => {
  assert.deepEqual(parsePreview("?promo=open"), { slide: 0 });
  assert.deepEqual(parsePreview("?promo=open&slide=3"), { slide: 2 });
  assert.deepEqual(parsePreview("?promo=open&slide=9"), { slide: 0 });
  assert.equal(parsePreview(""), null);
  assert.equal(parsePreview("?promo=1"), null);
});

// --- The four graphics ---------------------------------------------------------------------------------
test("four slides, in the briefed order, each with its compressed graphic", () => {
  assert.deepEqual(
    SLIDES.map((s) => s.name),
    ["Staying Relevant", "Digital Twin Assessment", "Personal Assessment & Coaching", "AI Workflow Design & Coaching"],
  );
  for (const s of SLIDES) {
    assert.match(s.image, /^\/promo\/engagement-0[1-4]-[a-z-]+\.webp$/);
    const file = join(ROOT, "public", s.image);
    assert.ok(existsSync(file), `${s.image} is missing`);
    const kb = statSync(file).size / 1024;
    assert.ok(kb < 100, `${s.image} is ${kb.toFixed(0)} KB; the PNGs it came from were about 500 KB`);
  }
});

test("each graphic also ships at 2x for high-density screens, and the loader picks by width", () => {
  for (const s of SLIDES) {
    const file = join(ROOT, "public", s.image.replace(/\.webp$/, "@2x.webp"));
    assert.ok(existsSync(file), `${s.image}: the @2x file is missing`);
    const kb = statSync(file).size / 1024;
    assert.ok(kb < 200, `${s.image} @2x is ${kb.toFixed(0)} KB`);
  }
  const src = code(POPUP);
  assert.match(src, /width > 750 \? src\.replace\(\/\\\.webp\$\/, "@2x\.webp"\) : src/);
  assert.match(read(POPUP), /sizes="\(min-width: 1024px\) 587px/, "the size hint matches the real slot, so a normal screen is not sent the 2x file");
});

test("each slide's alt text names the offer and the price printed on its graphic, and is a description", () => {
  const printed = { "Staying Relevant": "$799", "Digital Twin Assessment": "$599", "Personal Assessment & Coaching": "$799", "AI Workflow Design & Coaching": "$799" };
  for (const s of SLIDES) {
    assert.equal(s.price, printed[s.name], `${s.name}: price must equal the one printed on the graphic`);
    assert.ok(s.alt.includes(s.name), `${s.id}: alt names the offer`);
    assert.ok(s.alt.includes(s.price), `${s.id}: alt carries the price`);
    assert.ok(s.alt.length >= 60 && s.alt.length <= 240, `${s.id}: alt is ${s.alt.length} chars`);
    assert.doesNotMatch(s.alt, /^(an? )?(image|picture|photo|graphic|banner) of/i);
  }
});

test("the intro panel is exactly the supplied copy and nothing else", () => {
  assert.deepEqual(Object.keys(PANEL).sort(), ["body", "eyebrow", "headline"]);
  assert.equal(PANEL.eyebrow, "NEW FROM BBTx CONSULTING");
  assert.equal(PANEL.headline, "You don\u2019t need a big project to get started");
  assert.equal(
    PANEL.body,
    "Some questions are worth exploring before committing to a larger consulting engagement. We\u2019ve put together four focused ways to work with you on your business, professional growth, and making AI useful in your work.",
  );
  // No logo, no portrait or name row, no extra links: the popup has the copy, the carousel and the counter.
  const c = code(POPUP);
  assert.doesNotMatch(c, /oglogo|grant-avatar|grant-headshot|Compare all four|CompareLink|next\/link/);
  assert.ok(!existsSync(join(ROOT, "public/promo/grant-headshot.webp")), "the unused portrait crop is gone");
});

test("nothing is promised that the briefs do not approve", () => {
  const everything = JSON.stringify([SLIDES.map(({ image, ...rest }) => rest), PANEL]).toLowerCase();
  for (const word of ["discount", "% off", "previous attend", "alumni", "register", "registration", "seats", "sold out", "limited", "hurry", "checkout", "buy now"]) {
    assert.ok(!everything.includes(word), `must not contain "${word}"`);
  }
  assert.ok(!/\b(20\d\d)\b/.test(everything), "no date or year");
  assert.ok(!/https?:\/\//.test(everything), "no URL is hard-coded");
});

test("each slide links to its own offering page, and the contact form still lists the offers", () => {
  const hrefs = SLIDES.map((s) => (s.destination.kind === "link" ? s.destination.href : null));
  assert.deepEqual(hrefs, [
    "/offerings/staying-relevant",
    "/offerings/digital-twin-assessment",
    "/offerings/personal-assessment-coaching",
    "/offerings/ai-workflow-design-coaching",
  ]);
  for (const href of hrefs) assert.ok(existsSync(join(ROOT, "app", "offerings", "[slug]", "page.tsx")), href);
  assert.deepEqual(Object.values(ENGAGEMENT_INQUIRY).sort(), [...ENGAGEMENT_INQUIRY_OPTIONS].sort());
  const form = read("app/components/ContactModal.tsx");
  assert.match(form, /\.\.\.ENGAGEMENT_INQUIRY_OPTIONS/);
  for (const original of [
    "Organizational Assessment & Analysis",
    "Strategy & Advisory Services",
    "Leadership, Management & Team Development",
    "AI Integration & Innovation",
    "Implementation & Change Support",
    "General Inquiry",
  ]) assert.ok(form.includes(`"${original}"`), `${original} must remain`);
});

// --- Where it lives and how it behaves -----------------------------------------------------------------
function sourceFiles(dir) {
  const out = [];
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = `${dir}/${name}`;
    if (statSync(join(ROOT, rel)).isDirectory()) out.push(...sourceFiles(rel));
    else if (/\.(tsx?|mjs)$/.test(name)) out.push(rel);
  }
  return out;
}

test("the popup is mounted once, in the root layout, and is the only promo component", () => {
  const users = sourceFiles("app").filter((f) => read(f).includes("EngagementsPopupTrigger") && !f.includes("engagements-popup/"));
  assert.deepEqual(users, ["app/layout.tsx"]);
  assert.equal((read("app/layout.tsx").match(/<EngagementsPopupTrigger\s*\/>/g) ?? []).length, 1);
  assert.deepEqual(readdirSync(join(ROOT, "app/components/engagements-popup")).sort(), ["EngagementsPopup.tsx", "EngagementsPopupTrigger.tsx"]);
  assert.doesNotMatch(read("app/page.tsx"), /EngagementsPopup/, "the homepage does not mount a second copy");
});

test("the trigger applies the path rule, loads the popup lazily, and watches exit intent only for a mouse", () => {
  const src = code(TRIGGER);
  assert.match(src, /isExcludedPath\(pathname\)/);
  assert.match(src, /dynamic\(\(\) => import\("\.\/EngagementsPopup"\)/);
  assert.match(src, /hover: hover\) and \(pointer: fine/);
  assert.match(src, /"mouseleave"/);
  assert.match(src, /interruptionReason\(document\)/);
  assert.match(src, /frequencyCapBlocks\(/);
  assert.match(src, /if \(FREQUENCY_CAP_ENABLED\)[\s\S]*writeShown\(/, "the cap clock starts when it appears, and only while the cap is on");
});

test("the dialog has modal semantics, keyboard and touch support, and the right pauses", () => {
  const src = read(POPUP);
  assert.match(src, /role="dialog"/);
  assert.match(src, /aria-modal="true"/);
  assert.match(src, /aria-roledescription="carousel"/);
  assert.match(src, /aria-roledescription="slide"/);
  assert.match(src, /e\.key === "Escape"/);
  assert.match(src, /e\.key === "ArrowLeft"/);
  assert.match(src, /e\.key === "ArrowRight"/);
  assert.match(src, /e\.key !== "Tab"/, "focus is trapped");
  assert.match(src, /aria-label="Close"/);
  assert.match(src, /backdrop-blur/, "the page behind is blurred");
  assert.match(src, /onTouchStart/);
  assert.match(src, /previousFocus/, "focus returns to where it was");
  assert.match(src, /scrollbarGutter/, "page scroll is locked without a layout jump");
  const c = code(POPUP);
  assert.match(c, /!reducedMotion && !hovered && !keyboardInside && tabVisible/, "paused on hover, focus, hidden tab and reduced motion");
  assert.match(c, /AUTOPLAY_MS/);
  assert.match(c, /onMouseEnter/);
});

test("the graphics are shown as they are: cover, left-anchored, nothing laid over them", () => {
  const src = read(POPUP);
  assert.match(src, /object-cover object-left/);
  assert.match(src, /loader=\{bySize\}/, "the pre-compressed files are served unchanged");
  // Arrows and the X sit on the image edges; there is no text element positioned over a slide.
  assert.doesNotMatch(code(POPUP), /<(p|h1|h2|h3|span)[^>]*\babsolute\b[^>]*>\s*\{(slide|s)\./, "no caption laid over a graphic");
  assert.match(src, /aspect-\[678\/567\]/, "on phones the box has the files' own shape, so nothing is cropped");
  assert.match(src, /rounded-\[10px\]/, "the graphic is inset with rounded corners");
  assert.match(src, /absolute bottom-2 right-2[^"]*flex/, "Previous and Next sit side by side at the bottom right of the graphic");
});

test("brand: the popup uses #C8102E and no other colour, and not the site's brick red", () => {
  const src = read(POPUP);
  assert.match(src, /const RED = "#C8102E"/);
  assert.doesNotMatch(src, /ca3726/i);
  const colours = [...code(POPUP).matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0].toLowerCase());
  for (const c of colours) {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
    const gray = Math.abs(r - g) < 3 && Math.abs(g - b) < 3;
    assert.ok(gray || c === "#c8102e", `${c} is neither a gray nor the brand red`);
  }
});

test("the four analytics events go through the site's gtag wrapper, and nothing else", () => {
  const src = read(POPUP);
  for (const name of ["mini_engagement_popup_view", "mini_engagement_popup_close", "mini_engagement_slide_view", "mini_engagement_cta_click"]) {
    assert.ok(src.includes(`"${name}"`), name);
  }
  assert.match(src, /import \{ trackEvent \} from "@\/lib\/analytics"/);
  assert.doesNotMatch(code(POPUP), /window\.gtag|dataLayer|fbq|posthog|mixpanel|segment/i);
  assert.match(src, /if \(!preview\) trackEvent/, "preview mode sends nothing");
});

test("the popup's CSS is scoped to .promo-* and respects reduced motion", () => {
  const css = read("app/globals.css");
  const start = css.indexOf("Engagements popup (app/components/engagements-popup)");
  assert.ok(start > 0);
  const block = css.slice(start, css.indexOf("/* Blog article body", start));
  const selectors = [...block.matchAll(/^\s*(\.[a-z][\w-]*)[\s{,:]/gm)].map((m) => m[1]);
  assert.ok(selectors.length >= 2);
  for (const sel of selectors) assert.match(sel, /^\.promo-/, `${sel} must be scoped to the popup`);
  assert.match(block, /prefers-reduced-motion: reduce/);
});
