import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, globSync } from "node:fs";
import {
  SITE_URL,
  ORGANIZATION_ID,
  GRANT_PERSON_ID,
  GRANT_PROFILE_URL,
  grantPersonReference,
  absoluteUrl,
  breadcrumbList,
  organizationNode,
  siteGraph,
  articleSchema,
  serializeJsonLd,
} from "../../lib/seo/schema.ts";

test("absoluteUrl uses the www canonical host and drops trailing slashes", () => {
  assert.equal(SITE_URL, "https://www.bbtx.ai");
  assert.equal(absoluteUrl("/"), "https://www.bbtx.ai");
  assert.equal(absoluteUrl("/services/"), "https://www.bbtx.ai/services");
  assert.equal(absoluteUrl("services/ai-integration"), "https://www.bbtx.ai/services/ai-integration");
});

test("breadcrumbList: Home first, 1-based positions, every item named with an absolute URL", () => {
  const list = breadcrumbList([
    { name: "Services", path: "/services" },
    { name: "AI Integration & Innovation", path: "/services/ai-integration" },
  ]);
  assert.equal(list["@type"], "BreadcrumbList");
  assert.ok(list.name && list.name.length > 0, "the list itself must be named");
  assert.deepEqual(
    list.itemListElement.map((i) => [i.position, i.name, i.item]),
    [
      [1, "Home", "https://www.bbtx.ai"],
      [2, "Services", "https://www.bbtx.ai/services"],
      [3, "AI Integration & Innovation", "https://www.bbtx.ai/services/ai-integration"],
    ],
  );
  for (const item of list.itemListElement) assert.equal(item["@type"], "ListItem");
});

test("breadcrumbList refuses to emit an unnamed item", () => {
  assert.throws(() => breadcrumbList([{ name: "  ", path: "/x" }]), /no name/);
});

test("exactly one Organization, with the stable @id, in the site graph", () => {
  const graph = siteGraph()["@graph"];
  const orgs = graph.filter((n) => n["@type"] === "Organization");
  assert.equal(orgs.length, 1);
  assert.equal(orgs[0]["@id"], ORGANIZATION_ID);
  assert.equal(orgs[0].name, "BBTx Consulting");
  assert.deepEqual(orgs[0].founder, { "@id": GRANT_PERSON_ID });
  const site = graph.find((n) => n["@type"] === "WebSite");
  assert.deepEqual(site.publisher, { "@id": ORGANIZATION_ID });
});

test("organizationNode only uses https URLs and does not invent profiles", () => {
  const { sameAs, url, logo } = organizationNode();
  assert.equal(url, SITE_URL);
  assert.ok(logo.url.startsWith(`${SITE_URL}/`));
  for (const link of sameAs) assert.match(link, /^https:\/\//);
});

test("articleSchema: drops missing fields instead of inventing them", () => {
  const a = articleSchema({ url: "https://www.bbtx.ai/x", headline: "H", author: "organization" });
  const json = JSON.parse(JSON.stringify(a));
  assert.equal("datePublished" in json, false);
  assert.equal("dateModified" in json, false);
  assert.equal("image" in json, false);
});

test("articleSchema: author is the Organization until Grant approves, then his Person @id", () => {
  const org = articleSchema({ url: "u", headline: "H", author: "organization" });
  assert.equal(org.author["@id"], ORGANIZATION_ID);
  assert.equal(org.author["@type"], "Organization");
  const grant = articleSchema({ url: "u", headline: "H", author: "grant" });
  assert.equal(grant.author["@id"], GRANT_PERSON_ID);
  assert.equal(grant.author["@type"], "Person");
  assert.equal(grant.publisher["@id"], ORGANIZATION_ID);
});

test("serializeJsonLd: output is valid JSON and cannot close the script tag", () => {
  const evil = articleSchema({ url: "u", headline: "</script><script>alert(1)</script>", author: "organization" });
  const out = serializeJsonLd(evil);
  assert.equal(out.includes("</script>"), false);
  assert.equal(JSON.parse(out).headline, "</script><script>alert(1)</script>");
});

test("Grant's Person @id and canonical URL are the same everywhere (one node, many references)", () => {
  assert.equal(GRANT_PERSON_ID, "https://www.bbtx.ai/team/grant#person");
  assert.equal(GRANT_PROFILE_URL, "https://www.bbtx.ai/team/grant");

  // The reference every other page uses.
  const ref = grantPersonReference();
  assert.deepEqual(ref, { "@type": "Person", "@id": GRANT_PERSON_ID, name: "Grant Tate", url: GRANT_PROFILE_URL });

  // The article credits exactly that reference and keeps BBTx Consulting as publisher.
  const article = articleSchema({ url: "https://www.bbtx.ai/x", headline: "H", author: "grant" });
  assert.deepEqual(article.author, ref);
  assert.deepEqual(article.publisher, { "@type": "Organization", "@id": ORGANIZATION_ID, name: "BBTx Consulting" });

  // The full Person node is declared once, on /team/grant, from these constants.
  const layout = readFileSync("app/team/grant/layout.tsx", "utf8");
  assert.match(layout, /"@id": GRANT_PERSON_ID/);
  assert.match(layout, /url: GRANT_PROFILE_URL/);
  assert.equal((layout.match(/"@type": "Person"/g) ?? []).length, 1);
});

test("no file other than schema.ts hard-codes Grant's Person @id or declares another Person node", () => {
  const files = [...globSync("app/**/*.{ts,tsx}"), ...globSync("lib/**/*.ts")].filter((f) => !f.startsWith("app/admin"));
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    if (file !== "lib/seo/schema.ts") {
      assert.equal(src.includes("team/grant#person"), false, `${file} hard-codes the Person @id`);
    }
    // Person nodes with a real body (not an @id reference) live only on the team layouts.
    if (/"@type":\s*"Person"/.test(src) && !file.startsWith("app/team/") && file !== "lib/seo/schema.ts") {
      assert.fail(`${file} declares a Person node; reference grantPersonReference() instead`);
    }
  }
});
