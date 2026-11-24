import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { OFFERINGS, getOffering, offeringUrl } from "../../lib/offerings/offerings.ts";
import { ENGAGEMENT_INQUIRY_OPTIONS } from "../../lib/promo/inquiry-labels.ts";
import { SLIDES } from "../../lib/promo/engagements.ts";
import { EXCLUDED_PATHS, isExcludedPath } from "../../lib/promo/popup-logic.ts";
import { IMAGE_ALT } from "../../lib/seo/image-alt.ts";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const PAGE = "app/offerings/[slug]/page.tsx";

/** Every string in an offering, flattened, for copy checks. */
function allText(o) {
  const out = [];
  (function walk(v) {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  })(o);
  return out.join("\n");
}

test("four offerings, at the briefed addresses and in the briefed order", () => {
  assert.deepEqual(
    OFFERINGS.map((o) => o.slug),
    ["digital-twin-assessment", "personal-assessment-coaching", "ai-workflow-design-coaching", "staying-relevant"],
  );
  assert.deepEqual(
    OFFERINGS.map((o) => o.name),
    ["Digital Twin Assessment", "Personal Assessment & Coaching", "AI Workflow Design & Coaching", "Staying Relevant in an AI-Driven World"],
  );
  assert.equal(getOffering("nope"), undefined);
  assert.equal(offeringUrl("staying-relevant"), "https://www.bbtx.ai/offerings/staying-relevant");
});

test("prices are the ones in the copy", () => {
  const [dt, personal, ai, relevant] = OFFERINGS;
  assert.equal(dt.fee.amount, "$599");
  assert.equal(personal.fee.amount, "$599");
  assert.equal(ai.fee.amount, "$799");
  assert.deepEqual(relevant.workshop.fee, { label: "Workshop Fee", amount: "$99", note: "per person" });
  assert.deepEqual(relevant.private.fee, { label: "Private Engagement", amount: "$599" });
  assert.equal(relevant.layout, "workshop");
});

test("the supplied copy is used, typos are fixed, and internal editorial notes are not published", () => {
  const everything = OFFERINGS.map(allText).join("\n");
  // Typos in the supplied copy.
  assert.ok(!/at wk or/.test(everything) && !/ratherxplore/.test(everything), "typos must be corrected");
  assert.ok(everything.includes("at work or in your professional life"));
  assert.ok(everything.includes("If you’d rather explore them in greater depth"));
  // Notes written about the copy, not for visitors.
  for (const note of ["I particularly like", "I deliberately", "I’d keep", "I’d present", "I’d verify", "My recommendation", "editorial decisions", "verify with Grant", "should feel personal", "without sounding like therapy"]) {
    assert.ok(!everything.includes(note), `must not publish the note "${note}"`);
  }
  assert.ok(!everything.includes("→") && !everything.includes("->"), "arrows are drawn, not typed");
});

test("the staying-relevant page offers the workshop first, then the private analysis, with a CTA each", () => {
  const r = OFFERINGS[3];
  assert.equal(r.workshop.cta.label, "Ask About the Next Workshop");
  assert.equal(r.private.cta.label, "Ask About a Personal Relevance Analysis");
  assert.notEqual(r.workshop.cta.inquiry, r.private.cta.inquiry);
  assert.equal(r.private.kicker, "Prefer to Work Through It Privately?");
  assert.equal(r.eyebrow, "BBTx CONSULTING / WORKSHOP & PERSONAL ADVISORY");
  // No date, seat or registration is promised: the next workshop date is not set.
  assert.ok(!/register|registration|seats?\b|sold out|limited/i.test(allText(r)));
});

test("every button opens the contact form with a real inquiry type, and the form lists it", () => {
  const form = read("app/components/ContactModal.tsx");
  assert.match(form, /\.\.\.ENGAGEMENT_INQUIRY_OPTIONS/);
  const ctas = OFFERINGS.flatMap((o) => (o.layout === "standard" ? [o.cta] : [o.workshop.cta, o.private.cta]));
  assert.equal(ctas.length, 5);
  for (const c of ctas) assert.ok(ENGAGEMENT_INQUIRY_OPTIONS.includes(c.inquiry), `${c.label}: ${c.inquiry}`);
  assert.equal(new Set(ctas.map((c) => c.inquiry)).size, 5);
  assert.match(read("app/offerings/[slug]/OfferingCta.tsx"), /new CustomEvent\("openContact", \{ detail: \{ inquiry \} \}\)/);
});

test("each page has a compressed full-bleed hero, a share image, and alt text in the site's list", () => {
  for (const o of OFFERINGS) {
    const hero = join(ROOT, "public", o.hero.image);
    const og = join(ROOT, "public", o.hero.og);
    assert.ok(existsSync(hero), o.hero.image);
    assert.ok(existsSync(og), o.hero.og);
    const heroKb = statSync(hero).size / 1024;
    const ogKb = statSync(og).size / 1024;
    assert.ok(heroKb < 200, `${o.hero.image} is ${heroKb.toFixed(0)} KB; the PNG it came from was about 2,000 KB`);
    assert.ok(ogKb < 150, `${o.hero.og} is ${ogKb.toFixed(0)} KB`);
    assert.ok(o.hero.image in IMAGE_ALT, `${o.hero.image} needs alt text in lib/seo/image-alt.ts`);
  }
});

test("search and sharing text: unique, sized for results, and the canonical points at the page", () => {
  const descriptions = new Set();
  for (const o of OFFERINGS) {
    assert.ok(o.metaDescription.length >= 70 && o.metaDescription.length <= 155, `${o.slug}: description is ${o.metaDescription.length} characters`);
    assert.ok(!descriptions.has(o.metaDescription), "descriptions must be unique");
    descriptions.add(o.metaDescription);
    assert.ok((o.name + " | BBTx").length <= 60, `${o.slug}: title too long`);
  }
  const page = read(PAGE);
  assert.match(page, /alternates: \{ canonical: url \}/);
  assert.match(page, /summary_large_image/);
  assert.match(page, /dynamicParams = false/, "anything else under /offerings is a 404");
  assert.match(page, /generateStaticParams/);
  assert.match(page, /notFound\(\)/);
});

test("the page uses the existing nav and footer, one h1, and a hero the nav can sit over", () => {
  const page = read(PAGE);
  assert.match(page, /import \{ Nav \} from "@\/app\/components\/Nav"/);
  assert.match(page, /import \{ Footer \} from "@\/app\/components\/Footer"/);
  assert.match(page, /<Nav \/>/);
  assert.match(page, /<Footer \/>/);
  assert.match(page, /<section[^>]*\bid="hero"/);
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1);
  assert.doesNotMatch(page, /<h4\b/);
  assert.match(page, /priority/, "the hero image is loaded first");
});

test("the headline block sits on the hero, in white, on the same 720 px column as the text below", () => {
  const page = read(PAGE);
  const heroStart = page.search(/<section[^>]*\bid="hero"/);
  const heroEnd = page.indexOf("</section>", heroStart);
  assert.ok(heroStart > 0 && heroEnd > heroStart);
  // The hero is 20% shorter than the first version (64svh / 68svh), at every size.
  assert.match(page, /h-\[54\.4svh\] max-h-\[576px\] min-h-\[432px\]/);
  assert.match(page, /md:h-\[51\.2svh\] md:min-h-\[384px\] md:max-h-\[560px\]/);
  const hero = page.slice(heroStart, heroEnd);
  assert.match(hero, /<Header /, "the name, eyebrow and tagline are inside the hero");
  assert.match(hero, /mx-auto w-full max-w-\[720px\] px-6/, "same column width and gutter as the article");
  assert.match(page.slice(page.indexOf("<article")), /max-w-\[720px\] px-6/);
  assert.doesNotMatch(page.slice(heroEnd), /<Header /, "the header is not repeated below");
  // White type, and a gradient behind it so it stays readable on every image.
  const header = page.slice(page.indexOf("function Header"), page.indexOf("function NoBreakHyphens"));
  assert.match(header, /text-white/);
  assert.doesNotMatch(header, /text-\[#(111111|555555|666666)\]/, "no dark type on the dark hero");
  assert.match(hero, /linear-gradient\(to top, rgba\(0,0,0,\.9/);
});

test("brand: the pages use #C8102E and not the site's brick red, and every colour is red or neutral", () => {
  for (const f of [PAGE, "app/offerings/[slug]/OfferingCta.tsx"]) {
    const src = read(f);
    assert.doesNotMatch(src, /ca3726/i);
    for (const m of src.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
      const c = m[0].toLowerCase();
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
      const gray = Math.abs(r - g) < 3 && Math.abs(g - b) < 3;
      assert.ok(gray || c === "#c8102e" || c === "#a60d26", `${f}: ${c} is neither a neutral nor the brand red`);
    }
  }
});

test("the sitemap lists the four pages", () => {
  const sitemap = read("app/sitemap.ts");
  for (const o of OFFERINGS) assert.ok(sitemap.includes("${BASE_URL}/offerings/" + o.slug + "`"), o.slug);
});

test("the engagements popup links to these pages and stays off them", () => {
  // The carousel opens on Staying Relevant, so its order differs from the page list; each slide still maps to one page.
  const bySlug = (slug) => OFFERINGS.find((o) => o.slug === slug);
  const linked = SLIDES.map((s) => (s.destination.kind === "link" ? s.destination.href.replace("/offerings/", "") : ""));
  assert.deepEqual([...linked].sort(), OFFERINGS.map((o) => o.slug).sort());
  for (const slug of linked) assert.ok(bySlug(slug), slug);
  assert.ok(EXCLUDED_PATHS.includes("/offerings"));
  for (const o of OFFERINGS) assert.equal(isExcludedPath(`/offerings/${o.slug}`), true);
});

// --- FAQs -------------------------------------------------------------------------------------------
test("each offering has five FAQs, as supplied, with no notes about the copy in them", () => {
  for (const o of OFFERINGS) {
    assert.equal(o.faqs.length, 5, o.slug);
    assert.equal(new Set(o.faqs.map((f) => f.question)).size, 5, `${o.slug}: duplicate question`);
    for (const f of o.faqs) {
      assert.match(f.question, /\?$/, `${o.slug}: "${f.question}" should be a question`);
      assert.ok(f.answer.length >= 120 && f.answer.length <= 520, `${o.slug}: answer length ${f.answer.length}`);
      assert.ok(!f.question.includes("'") && !f.answer.includes("'"), "typographic apostrophes only");
    }
  }
  const all = OFFERINGS.flatMap((o) => o.faqs.map((f) => f.question + "\n" + f.answer)).join("\n");
  for (const note of ["I’d add", "I’ve kept", "conversational", "Grant still needs", "keyword", "AI assistant"]) {
    assert.ok(!all.includes(note), `must not publish the note "${note}"`);
  }
  assert.deepEqual(
    OFFERINGS.map((o) => o.faqs[0].question),
    [
      "What is an Organizational Digital Twin?",
      "Who is Personal Assessment & Coaching for?",
      "How can AI help improve the way I work?",
      "Who is the Staying Relevant workshop designed for?",
    ],
  );
});

test("a price named in an FAQ is one of the prices on that page", () => {
  for (const o of OFFERINGS) {
    const pagePrices = new Set(o.layout === "standard" ? [o.fee.amount] : [o.workshop.fee.amount, o.private.fee.amount]);
    const faqPrices = new Set(o.faqs.flatMap((f) => f.answer.match(/\$\d+/g) ?? []).concat(o.faqs.flatMap((f) => f.question.match(/\$\d+/g) ?? [])));
    for (const price of faqPrices) assert.ok(pagePrices.has(price), `${o.slug}: FAQ says ${price}, the page says ${[...pagePrices].join(" / ")}`);
  }
  // The scope the FAQs describe matches the page: two sessions, and the lengths on the copy.
  const [dt, personal, ai, relevant] = OFFERINGS;
  assert.match(dt.faqs[4].answer, /two private, 60-minute sessions/);
  assert.match(personal.faqs[3].answer, /two private, 60-minute sessions/);
  assert.match(ai.faqs[4].answer, /two private, 60-minute working sessions/);
  assert.match(relevant.faqs[4].answer, /two private, 90-minute sessions/);
});

test("the homepage FAQ component is reused and is the last section, directly above the footer, with matching structured data", () => {
  const page = read(PAGE);
  assert.match(page, /import \{ FAQ \} from "@\/app\/sections\/FAQ"/);
  assert.match(page, /<FAQ items=\{offering\.faqs\}/);
  const article = page.indexOf("</article>");
  const priv = page.indexOf("<PrivateSection");
  const faq = page.indexOf("<FAQ ");
  const mainEnd = page.indexOf("</main>");
  const footer = page.indexOf("<Footer />");
  assert.ok(article > 0 && faq > article, "the FAQ follows the body of the page");
  assert.ok(priv > 0 && faq > priv, "the FAQ follows the private option on the workshop page");
  // Nothing sits between the FAQ and the footer: it is the last thing inside <main>, and <Footer /> comes right after.
  assert.match(page.slice(faq, footer + "<Footer />".length), /^<FAQ [^>]*\/>\s*<\/main>\s*<Footer \/>$/, "the FAQ is the last element before the footer");
  assert.ok(faq < mainEnd && mainEnd < footer);
  // The prices and buttons stay with their text, above the FAQ.
  assert.doesNotMatch(page, /FinalCta/);
  // (The body components are defined below the page in the file; the browser checks confirm the rendered order.)
  const standardBody = page.slice(page.indexOf("function StandardBody"), page.indexOf("function WorkshopBody"));
  const privateSection = page.slice(page.indexOf("function PrivateSection"), page.indexOf("function faqJsonLd"));
  assert.match(standardBody, /<PriceBar fee=\{offering\.fee\}>/, "the standard price and button end the body, above the FAQ");
  assert.match(privateSection, /<PriceBar fee=\{p\.fee\}>/, "the private price and button end the private option, above the FAQ");
  // Structured data is built from the same array that is shown, so the two cannot disagree.
  assert.match(page, /faqJsonLd\(offering\.faqs\)/);
  assert.match(page, /"@type": "FAQPage"/);
  // The shared component's defaults are unchanged, so the homepage, courses and coaching look as they did.
  const faqSrc = read("app/sections/FAQ.tsx");
  assert.match(faqSrc, /accent = "#ca3726"/);
  assert.match(faqSrc, /compact = false/);
});
