import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  DISMISS_DAYS,
  MIN_DWELL_MS,
  TRIGGER_DELAY_MS,
  TRIGGER_SCROLL_FRACTION,
  DISMISS_KEY,
  interruptionReason,
  isDismissed,
  parsePreview,
  readDismissed,
  scrollFraction,
  wrapIndex,
  writeDismissed,
} from "../../lib/promo/popup-logic.ts";
import { ENGAGEMENTS } from "../../lib/promo/engagements.ts";
import { ENGAGEMENT_INQUIRY, ENGAGEMENT_INQUIRY_OPTIONS } from "../../lib/promo/inquiry-labels.ts";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const DAY = 24 * 60 * 60 * 1000;
/** Source without its comments, so a comment that says "no autoplay" is not mistaken for autoplay. */
const code = (p) => read(p).replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

// --- Carousel navigation ----------------------------------------------------------------------
test("Previous and Next wrap around the four slides", () => {
  assert.equal(wrapIndex(0, 1, 4), 1);
  assert.equal(wrapIndex(3, 1, 4), 0, "Next from the fourth slide goes to the first");
  assert.equal(wrapIndex(0, -1, 4), 3, "Previous from the first slide goes to the fourth");
  assert.equal(wrapIndex(2, -1, 4), 1);
  assert.equal(wrapIndex(0, 1, 0), 0, "an empty carousel never produces NaN");
});

// --- When it shows ------------------------------------------------------------------------------
test("trigger: 10 seconds or 30% scrolled, never straight away on a restored scroll position", () => {
  assert.equal(TRIGGER_DELAY_MS, 10_000);
  assert.equal(TRIGGER_SCROLL_FRACTION, 0.3);
  assert.ok(MIN_DWELL_MS >= 2_000, "the scroll route waits a few seconds so a reload does not trigger it at first paint");
  assert.ok(MIN_DWELL_MS < TRIGGER_DELAY_MS);
});

test("scrollFraction is the share of the scrollable height, clamped, and 0 when nothing scrolls", () => {
  assert.equal(scrollFraction(0, 3000, 1000), 0);
  assert.equal(scrollFraction(600, 3000, 1000), 0.3);
  assert.equal(scrollFraction(5000, 3000, 1000), 1);
  assert.equal(scrollFraction(-20, 3000, 1000), 0);
  assert.equal(scrollFraction(0, 800, 1000), 0, "a page that fits the window has no scroll to measure");
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
  assert.equal(interruptionReason(doc({ body: { style: { position: "fixed" } } })), "page-locked", "the mobile menu fixes the body");
  assert.equal(interruptionReason(doc({ body: { style: { overflow: "hidden" } } })), "page-locked");
  for (const tag of ["INPUT", "TEXTAREA", "SELECT"]) {
    assert.equal(interruptionReason(doc({ activeElement: { tagName: tag } })), "typing");
  }
  assert.equal(interruptionReason(doc({ activeElement: { tagName: "DIV", isContentEditable: true } })), "typing");
});

// --- Dismissal ----------------------------------------------------------------------------------
test("a closed popup stays away for seven days, and not a moment longer", () => {
  assert.equal(DISMISS_DAYS, 7);
  const now = 1_800_000_000_000;
  assert.equal(isDismissed(String(now - 1 * DAY), now), true);
  assert.equal(isDismissed(String(now - (7 * DAY - 1000)), now), true);
  assert.equal(isDismissed(String(now - 7 * DAY), now), false);
  assert.equal(isDismissed(String(now - 30 * DAY), now), false);
});

test("a missing, garbled or future dismissal is ignored rather than trusted", () => {
  const now = 1_800_000_000_000;
  for (const raw of [null, undefined, "", "abc", "0", "-5", "NaN", String(now + DAY)]) {
    assert.equal(isDismissed(raw, now), false, `raw=${raw}`);
  }
});

test("storage that is blocked, missing or throwing never breaks reading or writing", () => {
  const now = 1_800_000_000_000;
  const throwing = {
    getItem() { throw new Error("SecurityError"); },
    setItem() { throw new Error("QuotaExceededError"); },
  };
  assert.equal(readDismissed(throwing, now), false);
  assert.doesNotThrow(() => writeDismissed(throwing, now));
  assert.equal(readDismissed(null, now), false);
  assert.doesNotThrow(() => writeDismissed(null, now));
});

test("a dismissal written is a dismissal read back", () => {
  const bag = new Map();
  const storage = { getItem: (k) => bag.get(k) ?? null, setItem: (k, v) => bag.set(k, v) };
  const now = 1_800_000_000_000;
  assert.equal(readDismissed(storage, now), false);
  writeDismissed(storage, now);
  assert.equal(bag.has(DISMISS_KEY), true);
  assert.equal(readDismissed(storage, now + 3 * DAY), true);
  assert.equal(readDismissed(storage, now + 8 * DAY), false);
});

test("?promo=open is the review switch; anything else is ignored", () => {
  assert.deepEqual(parsePreview("?promo=open"), { slide: 0 });
  assert.deepEqual(parsePreview("?promo=open&slide=3"), { slide: 2 });
  assert.deepEqual(parsePreview("?promo=open&slide=9"), { slide: 0 });
  assert.deepEqual(parsePreview("?promo=open&slide=abc"), { slide: 0 });
  assert.equal(parsePreview(""), null);
  assert.equal(parsePreview("?promo=1"), null);
  assert.equal(parsePreview("?slide=2"), null);
});

// --- The four engagements -----------------------------------------------------------------------
test("the popup holds the four engagements, in order, at the briefed prices", () => {
  assert.equal(ENGAGEMENTS.length, 4);
  assert.deepEqual(
    ENGAGEMENTS.map((e) => e.name),
    [
      "Digital Twin Assessment",
      "Personal Assessment & Coaching",
      "AI Workflow Design & Coaching",
      "Staying Relevant in an AI-Driven World",
    ],
  );
  assert.deepEqual(ENGAGEMENTS.slice(0, 3).map((e) => e.price), ["$599", "$599", "$799"]);
  const fourth = ENGAGEMENTS[3];
  assert.equal(fourth.layout, "dual");
  assert.deepEqual(fourth.options.map((o) => [o.name, o.price]), [
    ["Public Workshop", "$99"],
    ["Individual Relevance Analysis", "$599"],
  ]);
  for (const e of ENGAGEMENTS.slice(0, 3)) assert.equal(e.included.length, 4, e.name);
  for (const o of fourth.options) assert.equal(o.included.length, 4, o.name);
});

test("the briefed headlines and call-to-action wording are used as written", () => {
  assert.deepEqual(
    ENGAGEMENTS.map((e) => e.headline),
    [
      "See your business from a different perspective.",
      "Understand your strengths. Make your next move with confidence.",
      "Make AI work for you, without losing what makes your work valuable.",
      "Your experience matters. Make sure its value is recognized.",
    ],
  );
  assert.deepEqual(
    [...ENGAGEMENTS.slice(0, 3).map((e) => e.cta.label), ...ENGAGEMENTS[3].options.map((o) => o.cta.label)],
    [
      "Get a Clearer View of Your Business",
      "Discover Your Strengths",
      "Expand Your Capabilities with AI",
      "Explore the Workshop",
      "Explore Individual Relevance Analysis",
    ],
  );
  for (const e of ENGAGEMENTS) assert.ok(e.headline.includes(e.emphasis), `${e.id}: the italic phrase must be part of the headline`);
});

test("slide four keeps the workshop and the individual analysis as separate destinations", () => {
  const [workshop, individual] = ENGAGEMENTS[3].options;
  assert.equal(workshop.cta.kind, "contact");
  assert.equal(individual.cta.kind, "contact");
  assert.notEqual(workshop.cta.inquiry, individual.cta.inquiry);
  assert.equal(workshop.id, "public_workshop");
  assert.equal(individual.id, "individual_analysis");
});

test("nothing is promised that the brief does not approve", () => {
  // Copy only: image crop positions such as "50% 20%" are not claims.
  const everything = JSON.stringify(ENGAGEMENTS, (key, value) => (key === "visual" ? undefined : value)).toLowerCase();
  for (const word of ["discount", "50%", "% off", "previous attend", "past attend", "alumni", "register", "registration", "seats", "sold out", "limited", "hurry", "checkout", "buy now"]) {
    assert.ok(!everything.includes(word), `the popup copy must not contain "${word}"`);
  }
  // No dates, and no link of any kind is invented.
  assert.ok(!/\b(20\d\d)\b/.test(everything), "no date or year appears in the copy");
  assert.ok(!everything.includes("http"), "no URL is hard-coded in the copy");
  assert.ok(!/[—–]/.test(everything), "no dashes used as punctuation in the copy");
});

test("each engagement hands the contact form its own inquiry type", () => {
  const inquiries = [
    ...ENGAGEMENTS.slice(0, 3).map((e) => e.cta.inquiry),
    ...ENGAGEMENTS[3].options.map((o) => o.cta.inquiry),
  ];
  assert.equal(new Set(inquiries).size, 5, "five different inquiry types");
  assert.deepEqual([...inquiries].sort(), [...ENGAGEMENT_INQUIRY_OPTIONS].sort());
  assert.deepEqual(Object.values(ENGAGEMENT_INQUIRY).sort(), [...ENGAGEMENT_INQUIRY_OPTIONS].sort());
});

test("the contact form lists those inquiry types and keeps the original six", () => {
  const form = read("app/components/ContactModal.tsx");
  assert.match(form, /\.\.\.ENGAGEMENT_INQUIRY_OPTIONS/);
  for (const original of [
    "Organizational Assessment & Analysis",
    "Strategy & Advisory Services",
    "Leadership, Management & Team Development",
    "AI Integration & Innovation",
    "Implementation & Change Support",
    "General Inquiry",
  ]) {
    assert.ok(form.includes(`"${original}"`), `${original} must remain`);
  }
});

// --- Where it lives and how it behaves ------------------------------------------------------------
function sourceFiles(dir) {
  const out = [];
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = `${dir}/${name}`;
    const st = statSync(join(ROOT, rel));
    if (st.isDirectory()) out.push(...sourceFiles(rel));
    else if (/\.(tsx?|mjs)$/.test(name)) out.push(rel);
  }
  return out;
}

test("the popup is mounted on the homepage and nowhere else, and it is the only promo component", () => {
  const users = sourceFiles("app").filter((f) => read(f).includes("EngagementsPopupTrigger") && !f.includes("engagements-popup/"));
  assert.deepEqual(users, ["app/page.tsx"]);
  const home = read("app/page.tsx");
  assert.equal((home.match(/<EngagementsPopupTrigger\s*\/>/g) ?? []).length, 1);
  assert.deepEqual(readdirSync(join(ROOT, "app/components/engagements-popup")).sort(), [
    "EngagementsPopup.tsx",
    "EngagementsPopupTrigger.tsx",
    "TwinMap.tsx",
  ]);
});

test("the dialog has modal semantics, keyboard support, and no autoplay", () => {
  const src = read("app/components/engagements-popup/EngagementsPopup.tsx");
  assert.match(src, /role="dialog"/);
  assert.match(src, /aria-modal="true"/);
  assert.match(src, /aria-roledescription="carousel"/);
  assert.match(src, /aria-roledescription="slide"/);
  assert.match(src, /e\.key === "Escape"/);
  assert.match(src, /e\.key === "ArrowLeft"/);
  assert.match(src, /e\.key === "ArrowRight"/);
  assert.match(src, /e\.key !== "Tab"/, "focus is trapped");
  assert.match(src, /aria-label="Close"/);
  assert.match(src, /scrollbarGutter/, "page scroll is locked without a layout jump");
  assert.match(src, /previousFocus/, "focus returns to where it was");
  assert.doesNotMatch(code("app/components/engagements-popup/EngagementsPopup.tsx"), /setInterval|autoplay|autoPlay|requestAnimationFrame/, "slides never advance on their own");
  assert.match(src, /altFor\(visual\.src\)/, "photos take their alt text from the site's alt-text list");
});

test("the four analytics events are sent through the site's existing gtag wrapper", () => {
  const src = read("app/components/engagements-popup/EngagementsPopup.tsx");
  for (const name of [
    "mini_engagement_popup_view",
    "mini_engagement_popup_close",
    "mini_engagement_slide_view",
    "mini_engagement_cta_click",
  ]) {
    assert.ok(src.includes(`"${name}"`), name);
  }
  assert.match(src, /import \{ trackEvent \} from "@\/lib\/analytics"/);
  assert.doesNotMatch(code("app/components/engagements-popup/EngagementsPopup.tsx"), /window\.gtag|dataLayer|fbq|posthog|mixpanel|segment/i, "no second analytics path");
  assert.match(src, /if \(!preview\) trackEvent/, "preview mode sends nothing");
});

test("the trigger loads the popup lazily and keeps to the stated rules", () => {
  const src = read("app/components/engagements-popup/EngagementsPopupTrigger.tsx");
  assert.match(src, /dynamic\(\(\) => import\("\.\/EngagementsPopup"\)/);
  assert.match(src, /interruptionReason\(document\)/);
  assert.match(src, /visit\.shown/);
  assert.match(src, /removeEventListener\("scroll"/);
});

test("the popup's CSS is scoped to .promo-* and respects reduced motion", () => {
  const css = read("app/globals.css");
  const start = css.indexOf("Homepage engagements popup");
  assert.ok(start > 0);
  const block = css.slice(start, css.indexOf("/* Blog article body", start));
  const selectors = [...block.matchAll(/^\s*(\.[a-z][\w-]*)[\s{,:]/gm)].map((m) => m[1]);
  assert.ok(selectors.length > 5);
  for (const sel of selectors) assert.match(sel, /^\.promo-/, `${sel} must be scoped to the popup`);
  assert.match(block, /prefers-reduced-motion: reduce/);
});
