import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ROOT = new URL("../../", import.meta.url).pathname;
const widget = readFileSync(`${ROOT}app/components/VoxwinsWidget.tsx`, "utf8");

// Why this exists: the chat vendor's loader mounts a full-viewport fixed wrapper and then
// shrinks it to the launcher. Measured on the live site, that alone was ~1.9 CLS (target 0.1)
// on every page, and the whole layout-shift score of the site. These checks keep the guard
// that hides the wrapper until it has settled. The real proof is a browser measurement
// (docs/seo/batch-2-performance-images.md); these stop it being removed by accident.

test("chat widget wrapper is hidden unless the loader says it has settled, and re-hidden on reset", () => {
  assert.match(widget, /const WRAPPER_Z_INDEX = "2147483647"/, "must match the vendor wrapper's z-index");
  assert.match(widget, /setProperty\("visibility", "hidden", "important"\)/);
  assert.match(widget, /removeProperty\("visibility"\)/);
  // The vendor loader flips pointer-events to "auto" on its size message and back to "none" on a reset.
  assert.match(widget, /style\.pointerEvents === "auto"/);
  // Continuous, not one-shot: the style observer is never disconnected after the first reveal,
  // only when giving up. (A one-shot guard missed the loader's reset, a second ~0.9 CLS burst.)
  const disconnects = widget.match(/styleObserver\.disconnect\(\)/g) ?? [];
  assert.equal(disconnects.length, 1, "style observer should only be disconnected in the give-up path");
  assert.match(widget, /else hide\(\);/, "a non-settled wrapper must be hidden again");
});

test("chat widget can never stay hidden, but the fallback is long enough for slow phones", () => {
  const m = widget.match(/const GIVE_UP_MS = (\d+);/);
  assert.ok(m, "give-up constant is missing");
  // 3s was tried first and failed: on a slow device the iframe takes longer, the still
  // full-screen wrapper was shown, and the jump counted (~0.96 CLS).
  assert.ok(Number(m[1]) >= 10000 && Number(m[1]) <= 30000, `give-up ${m[1]}ms should be 10-30s`);
  assert.match(widget, /window\.setTimeout\(\(\) => \{/);
  assert.match(widget, /gaveUp = true;/);
});

test("the guard is installed before the vendor script is added and survives re-renders", () => {
  const install = widget.indexOf("installShiftGuard();");
  const append = widget.indexOf("document.body.appendChild(script)");
  assert.ok(install > -1 && append > -1);
  assert.ok(install < append, "guard must be listening before the script can create the wrapper");
  assert.match(widget, /let shiftGuardInstalled = false;/);
  assert.match(widget, /if \(shiftGuardInstalled\) return;/);
});

test("chat widget is still skipped in the admin and still loads the same vendor script and id", () => {
  assert.match(widget, /if \(isAdmin\) return;/);
  assert.match(widget, /const SRC = "https:\/\/cdn\.voxwins\.ai\/agent\.js"/);
  assert.match(widget, /script\.dataset\.id = AGENT_ID/);
});
