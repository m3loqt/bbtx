import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  DIMENSIONS,
  GUIDE_TITLE,
  GUIDE_SEO_TITLE,
  GUIDE_DESCRIPTION,
  GUIDE_AUTHOR_APPROVED_BY_GRANT,
  GUIDE_DATE_PUBLISHED,
  BYLINE_APPROVED,
} from "../../app/resources/ai-readiness-assessment/content.ts";

test("guide has the 12 questions in 5 dimensions, in order, each with body copy and an evidence line", () => {
  assert.deepEqual(DIMENSIONS.map((d) => d.name), ["Leadership", "Governance", "Workflows", "Capability", "Performance"]);
  assert.deepEqual(DIMENSIONS.map((d) => d.questions.length), [3, 2, 3, 2, 2]);
  const all = DIMENSIONS.flatMap((d) => d.questions);
  assert.deepEqual(all.map((q) => q.number), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  for (const q of all) {
    assert.ok(q.question.endsWith("?"), `Q${q.number} should be a question`);
    assert.ok(q.body.length > 80, `Q${q.number} needs body copy`);
    assert.ok(q.evidence.length > 40, `Q${q.number} needs an "Evidence looks like" line`);
  }
});

test("no editor notes or placeholder markers can reach the rendered page", () => {
  for (const file of [
    "app/resources/ai-readiness-assessment/content.ts",
    "app/resources/ai-readiness-assessment/page.tsx",
  ]) {
    const src = readFileSync(file, "utf8");
    // Strip comments so this checks content, not the explanatory header.
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
    assert.doesNotMatch(code, /\[EDITOR/i, `${file} contains an [EDITOR: ...] note`);
    assert.doesNotMatch(code, /\b(TODO|FIXME|TBD|lorem ipsum)\b/i, `${file} contains a placeholder`);
  }
});

test("the guide keeps its links to Organizational Assessment and AI Integration", () => {
  const page = readFileSync("app/resources/ai-readiness-assessment/page.tsx", "utf8");
  assert.ok(page.includes('href="/services/organizational-assessment"'));
  assert.ok(page.includes('href="/services/ai-integration"'));
});

test("guide metadata matches the approved copy and stays within search-result length", () => {
  assert.equal(GUIDE_SEO_TITLE, "AI Readiness Assessment: 12 Questions for Leaders | BBTx");
  assert.ok(GUIDE_SEO_TITLE.length <= 70);
  assert.ok(GUIDE_DESCRIPTION.length <= 165);
});

test("H1, SEO title and meta description are unchanged from Batch 1", () => {
  assert.equal(GUIDE_TITLE, "AI Readiness Assessment: 12 Questions Leaders Should Answer Before Investing in AI");
  assert.equal(
    GUIDE_DESCRIPTION,
    "Use these 12 AI readiness questions to uncover gaps in leadership, governance, workflows, capability, and performance before making major AI investments.",
  );
});

test("Grant has approved the guide: byline uses his established professional name", () => {
  assert.equal(GUIDE_AUTHOR_APPROVED_BY_GRANT, true);
  assert.equal(BYLINE_APPROVED.name, "Dr. Grant Tate");
  // "Dr. R. Grant Tate" was an unverified draft form; it must not reappear anywhere.
  for (const file of ["app/resources/ai-readiness-assessment/content.ts", "app/resources/ai-readiness-assessment/page.tsx"]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /R\.\s*Grant/, `${file} still contains "R. Grant"`);
  }
});

test("byline links to Grant's profile", () => {
  const page = readFileSync("app/resources/ai-readiness-assessment/page.tsx", "utf8");
  assert.match(page, /<Link href="\/team\/grant"[^>]*>\s*\{BYLINE_APPROVED\.name\}/);
});

test("first publication: a real date, no dateModified, no 'Updated' label", () => {
  assert.match(GUIDE_DATE_PUBLISHED, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(!Number.isNaN(Date.parse(GUIDE_DATE_PUBLISHED)));
  const page = readFileSync("app/resources/ai-readiness-assessment/page.tsx", "utf8");
  assert.doesNotMatch(page, /dateModified|modifiedTime/, "a never-modified page must not claim a modification date");
  assert.doesNotMatch(page, /\bUpdated\b/, "the page must not carry an 'Updated' label");
});

const read = (p) => readFileSync(p, "utf8");

// Source page -> destination, from the Batch 1 internal-link plan.
const LINK_PLAN = [
  ["app/services/leadership-development/page.tsx", "/services/ai-integration"],
  ["app/services/ai-integration/page.tsx", "/services/organizational-assessment"],
  ["app/services/organizational-assessment/page.tsx", "/resources/ai-readiness-assessment"],
  ["app/services/strategy-advisory/page.tsx", "/services/ai-integration"],
  ["app/services/implementation-support/page.tsx", "/services/ai-integration"],
  ["app/resources/ai-readiness-assessment/page.tsx", "/services/organizational-assessment"],
  ["app/resources/ai-readiness-assessment/page.tsx", "/services/ai-integration"],
  ["app/resources/page.tsx", "/resources/ai-readiness-assessment"],
  // Guide to Grant's profile (byline).
  ["app/resources/ai-readiness-assessment/page.tsx", "/team/grant"],
];

test("every planned contextual internal link is present in its source page", () => {
  for (const [file, href] of LINK_PLAN) {
    assert.ok(read(file).includes(`"${href}"`), `${file} is missing a link to ${href}`);
  }
});

test("every internal link in the touched pages resolves to a real route", () => {
  const files = [...new Set(LINK_PLAN.map(([f]) => f))];
  for (const file of files) {
    const hrefs = [...read(file).matchAll(/href[:=]\s*[{]?"(\/[a-z0-9\-\/]*)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      if (href === "/") continue;
      assert.ok(existsSync(`app${href}/page.tsx`), `${file} links to ${href}, which has no page`);
    }
  }
});

test("the sitemap lists the new guide on the www host", () => {
  const sitemap = read("app/sitemap.ts");
  assert.ok(sitemap.includes("${BASE_URL}/resources/ai-readiness-assessment"));
  assert.ok(sitemap.includes('BASE_URL = "https://www.bbtx.ai"'));
});

test("no page hand-writes a BreadcrumbList (all must use breadcrumbList())", async () => {
  const { globSync } = await import("node:fs");
  const files = globSync("app/**/*.tsx").filter((f) => !f.startsWith("app/admin"));
  for (const file of files) {
    const src = read(file);
    assert.equal(/"@type":\s*"BreadcrumbList"/.test(src), false, `${file} hand-writes a BreadcrumbList; use breadcrumbList()`);
  }
});
