import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");

function publicTsx(dir = join(ROOT, "app"), out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name === "admin" || name === "api") continue;
      publicTsx(path, out);
    } else if (name.endsWith(".tsx")) out.push(path);
  }
  return out;
}
const FILES = publicTsx().map((path) => ({ rel: path.slice(ROOT.length), src: readFileSync(path, "utf8") }));

// Measured on the live site at a 2560px screen: the hero showed a 2048px-wide photo at 2545px
// (and cropped it to 1.97:1 from 1.47:1), the closing banner a 1652px file at 2545px (3.1:1
// from 1.74:1). Capping the page at 1920px fixes both without changing anything at or below
// 1920px. These tests keep the cap, and everything that has to follow it, in step.

test("the public site is capped at 1920px and centred, and the admin shell is excluded", () => {
  const css = read("app/globals.css");
  const rule = css.match(/body:not\(:has\(\[data-slot="sidebar-wrapper"\]\)\)\s*\{([^}]*)\}/);
  assert.ok(rule, "cap rule is missing from globals.css");
  assert.match(rule[1], /max-width:\s*1920px/);
  assert.match(rule[1], /margin-inline:\s*auto/);
  // The exclusion only works while the admin sidebar still carries that attribute.
  assert.match(read("components/ui/sidebar.tsx"), /data-slot="sidebar-wrapper"/);
  assert.match(read("app/admin/layout.tsx"), /SidebarProvider/);
});

test("full-bleed images say they are drawn at most 1920px wide", () => {
  let capped = 0;
  for (const { rel, src } of FILES) {
    assert.doesNotMatch(src, /sizes="100vw"/, `${rel}: use the capped sizes, the page is never wider than 1920px`);
    capped += (src.match(/sizes="\(min-width: 1920px\) 1920px, 100vw"/g) ?? []).length;
  }
  assert.ok(capped >= 16, `expected the hero and banner images to use the capped hint, found ${capped}`);
});

test("strips that span the viewport stop at the cap instead of poking out of it", () => {
  const escapes = FILES.filter(({ src }) => /\bw-screen\b/.test(src));
  assert.deepEqual(escapes.map((f) => f.rel).sort(), ["app/about/page.tsx", "app/sections/Results.tsx"]);
  for (const { rel, src } of escapes) {
    assert.match(src, /w-screen max-w-\[min\(100vw,1920px\)\]/, `${rel}: w-screen must be capped`);
    assert.doesNotMatch(src, /max-w-\[100vw\]/, `${rel}: still uncapped`);
  }
});

test("the 160px logos get exactly a 160px file at 1x and a 320px file at 2x", () => {
  const config = read("next.config.ts");
  const m = config.match(/imageSizes:\s*\[([^\]]+)\]/);
  assert.ok(m, "imageSizes is missing from next.config.ts");
  const sizes = m[1].split(",").map((n) => Number(n.trim()));
  assert.ok(sizes.includes(160) && sizes.includes(320));
  assert.ok(sizes.every((n) => n > 0 && n < 640), "imageSizes must stay below the smallest device size (640)");
  assert.deepEqual([...sizes].sort((a, b) => a - b), sizes, "keep the list sorted");
  const home = read("app/sections/Results.tsx");
  assert.match(home, /width=\{160\}\s+height=\{160\}/);
  for (const f of ["app/services/page.tsx", "app/services/implementation-support/page.tsx"]) {
    const w = read(f).match(/aria-hidden=\{i >= [^}]+\}\s+width=\{(\d+)\}/)?.[1];
    assert.ok(w && sizes.includes(Number(w)) && sizes.includes(Number(w) * 2), `${f}: ${w}px logos need ${w} and ${Number(w) * 2} in imageSizes`);
  }
  assert.ok(existsSync(join(ROOT, "public/companies-nobg/alz.png")));
});
