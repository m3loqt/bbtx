import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");

// The service pages: the name each is called in its breadcrumb (and so in the H1), the phrase its
// title is meant to carry, and the slogan that moved from the H1 to the line under it.
const PAGES = {
  "organizational-assessment": { name: "Organizational Assessment & Analysis", title: "Organizational Assessment & Analysis", slogan: "that haven't been tested in years" },
  "strategy-advisory": { name: "Strategy & Advisory Services", title: "Strategic Planning & Advisory Consulting", slogan: "decision-making" },
  "leadership-development": { name: "Leadership & Team Development", title: "Leadership Development Consulting", slogan: "but the system around them does not" },
  "ai-integration": { name: "AI Integration & Innovation", title: "AI Strategy & Adoption Consulting", slogan: "organizational capability problem AI happens to expose" },
  "implementation-support": { name: "Implementation & Change Support", title: "Change Management & Implementation Support", slogan: "It fails in the realities of daily work" },
  "executive-recruitment": { name: "Executive Recruitment Assessment Services", title: "Executive Recruitment Assessment Services", slogan: "executive hiring decisions" },
};
const page = (slug) => read(`app/services/${slug}/page.tsx`);
const layout = (slug) => read(`app/services/${slug}/layout.tsx`);
const titleOf = (src) => src.match(/title:\s*(?:\{\s*absolute:\s*)?"([^"]+)"/)[1];
const descOf = (src) => src.match(/description:\s*"([^"]+)"/)[1];

test("each service page's H1 is the service's own name, and the old slogan stays on the page right under it", () => {
  for (const [slug, p] of Object.entries(PAGES)) {
    const src = page(slug);
    assert.equal((src.match(/<h1\b/g) ?? []).length, 1, `${slug}: one h1`);
    assert.match(src, new RegExp(`<h1 className="[^"]*">${p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h1>`), `${slug}: H1 is "${p.name}"`);
    // the same name the breadcrumb and structured data use
    assert.ok(layout(slug).includes(`name: "${p.name}"`), `${slug}: breadcrumb/schema name matches`);
    // the slogan is a paragraph straight after the H1, not a heading
    const after = src.slice(src.indexOf("</h1>"), src.indexOf("</h1>") + 900);
    assert.match(after, /^<\/h1>\s*<p className="[^"]*text-\[#222222\]|^<\/h1>\s*<p className="[^"]*">/, `${slug}: slogan is a <p> after the h1`);
    assert.ok(after.includes(p.slogan), `${slug}: slogan kept`);
  }
  // the hub
  const hub = read("app/services/page.tsx");
  assert.match(hub, /<h1 className="[^"]*">Organizational Consulting Services<\/h1>/);
  assert.ok(hub.slice(hub.indexOf("</h1>"), hub.indexOf("</h1>") + 700).includes("on their"), "hub slogan kept under the H1");
});

test("titles: within 60 characters, unique, each carrying the phrase it is meant to rank for", () => {
  const titles = Object.entries(PAGES).map(([slug, p]) => [slug, titleOf(layout(slug)), p.title]);
  titles.push(["services (hub)", titleOf(read("app/services/layout.tsx")), "Organizational Consulting Services"]);
  for (const [slug, t, phrase] of titles) {
    assert.ok(t.length <= 60, `${slug}: "${t}" is ${t.length}`);
    assert.ok(t.includes(phrase), `${slug}: "${t}" carries "${phrase}"`);
    assert.match(t, /\| BBTx( Consulting)?$/, `${slug}: ends with the brand`);
  }
  assert.equal(new Set(titles.map((x) => x[1])).size, titles.length, "all titles are different");
});

test("decision 1A: strategic planning is an explicit part of the Strategy service, without promising a written plan", () => {
  const src = page("strategy-advisory");
  assert.equal(titleOf(layout("strategy-advisory")), "Strategic Planning & Advisory Consulting | BBTx Consulting");
  assert.match(src, /That includes\s+strategic planning, shaped around the decisions leaders actually face rather than a\s+document for its own sake/);
  assert.match(src, /Strategic planning that clarifies direction, priorities, tradeoffs/, "named in the engagement itself");
  assert.match(src, /Strategic planning is part of this work, but a written plan is not the goal of every engagement/);
  assert.doesNotMatch(src, /(you will receive|we deliver|every engagement (includes|produces|ends with))[^.]{0,40}(written )?(strategic )?plan/i, "no promise of a plan document");
  // the positioning around decisions and execution is still there
  assert.match(src, /Strategy only matters when it changes decisions/);
  assert.ok(descOf(layout("strategy-advisory")).includes("decisions, alignment, and discipline"));
});

test("decision 2A: the AI service keeps its name everywhere, and the page is clear it is not software integration", () => {
  for (const f of ["app/components/Nav.tsx", "app/components/Footer.tsx", "app/components/ContactModal.tsx", "app/services/page.tsx", "app/services/ai-integration/layout.tsx"]) {
    assert.ok(read(f).includes("AI Integration & Innovation"), `${f} still uses the existing name`);
  }
  assert.equal(titleOf(layout("ai-integration")), "AI Strategy & Adoption Consulting | BBTx Consulting");
  const src = page("ai-integration");
  assert.match(src, /organizational readiness, governance, adoption, and performance, rather\s+than technical software integration/);
  assert.match(src, /No\. The primary focus is organizational capability, adoption, governance, and performance/, "FAQ unchanged");
  assert.match(descOf(layout("ai-integration")), /not technical software integration/);
});

test("decision 3A: 'organizational development' appears naturally on the hub, Organizational Assessment and Leadership pages, and never in a title or H1", () => {
  assert.match(read("app/services/page.tsx"), /Our organizational\s+development practice spans assessment, strategy, leadership development, AI\s+adoption, and change/);
  assert.match(page("organizational-assessment"), /Others continue with organizational development support through/);
  assert.match(page("leadership-development"), /As part of our organizational development work, we focus on individuals/);
  const titlesAndH1s = [
    ...Object.keys(PAGES).flatMap((s) => [titleOf(layout(s)), page(s).match(/<h1[^>]*>([^<]*)<\/h1>/)[1]]),
    titleOf(read("app/services/layout.tsx")),
  ];
  for (const t of titlesAndH1s) assert.doesNotMatch(t, /organizational development/i, `not in "${t}"`);
  // used once on each of those pages, not repeated
  for (const f of ["app/services/page.tsx", "app/services/organizational-assessment/page.tsx", "app/services/leadership-development/page.tsx"]) {
    const n = (read(f).replace(/\s+/g, " ").match(/organizational development/gi) ?? []).length;
    assert.ok(n >= 1 && n <= 2, `${f}: ${n} uses`);
  }
});

// Two different questions, kept apart on purpose:
//  - Terms for work BBTx does NOT do (a search firm, software or technical implementation) must not
//    appear where a page advertises itself: its title, H1 or description.
//  - Terms for work BBTx DOES do, or for a field it works in, are accurate and may be used freely in
//    the copy. They are only kept out of a service page's title and H1 when another page owns them
//    (executive coaching -> /coaching) or they are too broad to describe one service. That is about
//    which page targets a term, not about which words the site may use.
const surfaces = (withDescriptions) => [
  ...Object.keys(PAGES).flatMap((s) => [
    titleOf(layout(s)),
    page(s).match(/<h1[^>]*>([^<]*)<\/h1>/)[1],
    ...(withDescriptions ? [descOf(layout(s))] : []),
  ]),
  titleOf(read("app/services/layout.tsx")),
  ...(withDescriptions ? [descOf(read("app/services/layout.tsx"))] : []),
].join("\n").toLowerCase();

test("no title, H1 or description advertises work BBTx does not do", () => {
  const text = surfaces(true);
  for (const notOffered of [
    "executive search",         // BBTx assesses finalists; it is not a search firm
    "digital transformation",
    "implementation consulting", // reads as software/ERP implementation
    "ai implementation",         // reads as technical deployment
    "ai integration consulting",
  ]) assert.ok(!text.includes(notOffered), `"${notOffered}" must not be advertised`);
});

test("accurate terms owned by another page, or too broad for one service, are not a service page's title or H1 target", () => {
  const text = surfaces(false);
  for (const elsewhere of [
    "executive coaching",           // a real service, owned by /coaching: a service page should not compete for it
    "leadership development programs", // course-catalog intent
    "management consulting",        // too broad to name one service
  ]) assert.ok(!text.includes(elsewhere), `"${elsewhere}" is not a title/H1 target on a service page`);
});

test("executive coaching stays a first-class, accurately described service: still named on the Leadership page, with its own page", () => {
  const lead = page("leadership-development");
  assert.match(lead, /name: "Executive Coaching"/, "listed as an engagement");
  assert.match(lead, /question: "Is this executive coaching"/, "answered in the FAQ");
  assert.match(read("app/coaching/layout.tsx"), /title:\s*"1:1 Executive Coaching with Grant Tate/, "/coaching owns the term in its title");
  // using the words in descriptions or body copy is not restricted by any test here
});
