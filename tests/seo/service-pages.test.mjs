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

test("decision 2A: the AI service keeps its name everywhere, and the page says what it is, in positive terms", () => {
  for (const f of ["app/components/Nav.tsx", "app/components/Footer.tsx", "app/components/ContactModal.tsx", "app/services/page.tsx", "app/services/ai-integration/layout.tsx"]) {
    assert.ok(read(f).includes("AI Integration & Innovation"), `${f} still uses the existing name`);
  }
  assert.equal(titleOf(layout("ai-integration")), "AI Strategy & Adoption Consulting | BBTx Consulting");
  const src = page("ai-integration");
  assert.match(src, /starts with the organization, not the software\.\s+We help leadership teams decide where AI can create value/);
  assert.match(src, /The\s+focus is organizational readiness, governance, adoption, and performance\.\s+Technology decisions follow from that organizational clarity\./);
  assert.match(src, /No\. The primary focus is organizational capability, adoption, governance, and performance/, "FAQ unchanged");
  // the description says what organizations achieve, not what BBTx does not do
  const d = descOf(layout("ai-integration"));
  assert.match(d, /AI strategy and adoption consulting that helps leadership teams decide where AI creates value, build readiness and governance, and improve performance/);
  assert.doesNotMatch(d, /\b(not|don't|doesn't|rather than|without|no)\b/i, "no negatives in the description");
});

test("decision 3A: 'organizational development' appears naturally on the hub, Organizational Assessment and Leadership pages, and never in a title or H1", () => {
  assert.match(read("app/services/page.tsx"), /keep happening\.\s+This is often where organizational\s+development begins\./);
  assert.match(page("organizational-assessment"), /produce clarity either way, and it gives any organizational development work that follows a clear starting point/);
  assert.match(page("leadership-development"), /because leadership development and organizational development are closely connected/);
  // each of Grant's original sentences is intact; the phrase is added to them, not swapped in
  assert.match(page("organizational-assessment"), /Others continue with support through strategy, leadership development, AI integration, or change initiatives\./);
  assert.match(page("leadership-development"), /We focus on individuals, teams, and the organizational conditions affecting leadership performance/);
  const titlesAndH1s = [
    ...Object.keys(PAGES).flatMap((s) => [titleOf(layout(s)), page(s).match(/<h1[^>]*>([^<]*)<\/h1>/)[1]]),
    titleOf(read("app/services/layout.tsx")),
  ];
  for (const t of titlesAndH1s) assert.doesNotMatch(t, /organizational development/i, `not in "${t}"`);
  for (const f of ["app/services/page.tsx", "app/services/organizational-assessment/page.tsx", "app/services/leadership-development/page.tsx"]) {
    const n = (read(f).replace(/\s+/g, " ").match(/organizational development/gi) ?? []).length;
    assert.ok(n >= 1 && n <= 2, `${f}: ${n} uses`);
  }
});

test("the Leadership description names executive coaching, because it is a real part of the service", () => {
  const d = descOf(layout("leadership-development"));
  assert.match(d, /executive coaching and team development/);
  assert.ok(d.length >= 70 && d.length <= 155, String(d.length));
});

// ---- the contact form opens with the right inquiry type from every service page ----
const formOptions = () => {
  const block = read("app/components/ContactModal.tsx").match(/const INQUIRY_OPTIONS = \[([\s\S]*?)\] as const/)[1];
  return [...block.matchAll(/^\s*"([^"]+)",/gm)].map((m) => m[1]);
};

test("every service page asks the contact form for a type it actually lists, from both of its buttons", () => {
  const options = formOptions();
  assert.ok(options.includes("General Inquiry"));
  for (const slug of Object.keys(PAGES)) {
    const src = page(slug);
    const inquiry = src.match(/const INQUIRY = "([^"]+)"/)[1];
    assert.ok(options.includes(inquiry), `${slug}: "${inquiry}" must be one of the form's options`);
    assert.equal((src.match(/onClick=\{\(\) => openContact\(INQUIRY\)\}/g) ?? []).length, 2, `${slug}: the top and bottom buttons both send it`);
  }
  // each service has its own, distinct type
  const sent = Object.keys(PAGES).map((s) => page(s).match(/const INQUIRY = "([^"]+)"/)[1]);
  assert.equal(new Set(sent).size, sent.length);
});

test("Executive Recruitment's inquiry type is a real option in the form (it used to fall back to the first service)", () => {
  assert.match(page("executive-recruitment"), /const INQUIRY = "Executive Recruitment Assessment Services"/);
  assert.ok(formOptions().includes("Executive Recruitment Assessment Services"));
  // the original options are all still there, in order, with the new one after the services
  const o = formOptions();
  assert.deepEqual(o.slice(0, 6), ["Organizational Assessment & Analysis", "Strategy & Advisory Services", "Leadership, Management & Team Development", "AI Integration & Innovation", "Implementation & Change Support", "Executive Recruitment Assessment Services"]);
  assert.equal(o.at(-1), "General Inquiry");
});

test("the Services hub is a general page: both its buttons send 'General Inquiry', not nothing", () => {
  const hub = read("app/services/page.tsx");
  assert.equal((hub.match(/new CustomEvent\("openContact", \{ detail: \{ inquiry: "General Inquiry" \} \}\)/g) ?? []).length, 2);
  assert.doesNotMatch(hub, /new Event\("openContact"\)/);
});

test("Organizational Assessment keeps its single hero button, unchanged", () => {
  const src = page("organizational-assessment");
  const hero = src.slice(src.indexOf("<h1"), src.indexOf("</section>", src.indexOf("<h1")));
  assert.equal((hero.match(/Start a Conversation/g) ?? []).length, 1);
  assert.doesNotMatch(hero, /See How/);
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

test("a button that names no service (footer, phone menu) opens the form on 'General Inquiry', not on the first service in the list", () => {
  const form = read("app/components/ContactModal.tsx");
  assert.match(form, /const DEFAULT_INQUIRY = "General Inquiry";/);
  assert.doesNotMatch(form, /INQUIRY_OPTIONS\[0\]/, "no fallback to the first service");
  assert.ok(formOptions().includes("General Inquiry"));
  assert.match(read("app/api/contact/route.ts"), /inquiryValue \?\? 'General Inquiry'/, "the API treats 'no inquiry' the same way");
});
