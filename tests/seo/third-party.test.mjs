import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;

function sourceFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) sourceFiles(path, out);
    else if (/\.(tsx?|css|mjs)$/.test(name)) out.push(path);
  }
  return out;
}

// The Voxwins chat subscription was cancelled on 2026-11-19 and the widget removed.
// While it was installed it caused almost all of the site's layout shift (about 1.0 CLS
// from its full-screen wrapper, plus about 0.4 to 0.6 more from its greeting bubble on a
// visitor's first view) and about 240 KiB of unused JavaScript on every page.
// If a chat tool is ever added back, lazy-load it behind a click and delete this test.
test("the Voxwins chat widget is gone from the app", () => {
  const offenders = [];
  for (const dir of ["app", "lib", "components"]) {
    for (const file of sourceFiles(join(ROOT, dir))) {
      if (/voxwins|vox-embed/i.test(readFileSync(file, "utf8"))) offenders.push(file.slice(ROOT.length));
    }
  }
  assert.deepEqual(offenders, []);
});

test("the root layout loads Google Analytics and nothing else third-party", () => {
  const layout = readFileSync(join(ROOT, "app/layout.tsx"), "utf8");
  assert.match(layout, /<GoogleAnalytics \/>/);
  assert.doesNotMatch(layout, /<Script\b|document\.createElement\("script"\)/, "no ad-hoc script tags in the root layout");
});
