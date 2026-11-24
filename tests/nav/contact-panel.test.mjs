import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const FORM = "app/components/ContactModal.tsx";
const NAV = "app/components/Nav.tsx";
const CALENDAR = "https://www.calendly.com/granttate";

test("the form offers a way to schedule a conversation: Grant's calendar, in a new tab, with a safe rel", () => {
  const form = read(FORM);
  assert.ok(form.includes(`const SCHEDULE_URL = "${CALENDAR}"`));
  assert.match(form, /href=\{SCHEDULE_URL\}\s+target="_blank"\s+rel="noopener noreferrer"/);
  assert.match(form, /schedule a conversation with us/);
  assert.match(form, /opens in a new tab/, "the new-tab behaviour is announced to screen readers");
  // the same calendar the bar's own button uses
  assert.ok(read(NAV).includes(`href="${CALENDAR}"`));
});

test("the form hangs from the bar: the nav hosts it under the bar, and it is no longer a free-floating overlay", () => {
  const nav = read(NAV);
  assert.equal((nav.match(/<ContactModal\b/g) ?? []).length, 1);
  assert.doesNotMatch(nav, /z-\[250\]/, "the bar no longer needs lifting above a separate overlay");
  // hosted inside the wrapper the mega menus live in, before it closes
  assert.ok(nav.indexOf("<ContactModal") < nav.indexOf("</motion.div>"), "rendered inside the nav's wrapper");
  assert.ok(nav.indexOf("<ContactModal") > nav.indexOf("<MegaPanel"), "after the menus, in the same wrapper");
  const form = read(FORM);
  assert.match(form, /absolute inset-x-0 top-\[calc\(100%-1px\)\]/, "laid 1px over the bar's edge, like the menus");
  assert.doesNotMatch(form, /fixed inset-0/, "no separate full-screen overlay inside the form itself");
  // the bar treats the open form like an open menu
  assert.match(nav, /const panelOpen = menuOpen \|\| contactOpen/);
  assert.match(nav, /borderBottomLeftRadius: panelOpen \? 0 : 8/);
});

test("only one panel is open at a time", () => {
  const nav = read(NAV);
  assert.match(nav, /const openContact = [\s\S]{0,200}setOpenMenu\(null\)/, "opening the form closes a menu");
  assert.match(nav, /loadExplore\(\);[\s\S]{0,200}setContactOpen\(false\)/, "opening a menu closes the form");
  assert.match(nav, /setContactOpen\(false\); setMobileOpen/, "opening the phone menu closes the form");
});

test("keyboard and focus: Escape closes, focus moves in and comes back, Tab stays inside, a dropdown keeps its own Escape", () => {
  const form = read(FORM);
  assert.match(form, /e\.key !== "Escape"/);
  assert.match(form, /\[role="combobox"\]\[aria-expanded="true"\]/, "asks the trigger, not the list element that stays in the page");
  assert.match(form, /input\[name="full_name"\][\s\S]{0,80}\.focus\(/);
  assert.match(form, /returnFocus\.current\?\.focus/);
  assert.match(form, /e\.key !== "Tab"/);
  assert.match(form, /role="dialog"\s+aria-modal="true"\s+aria-labelledby="contact-modal-title"/);
});

test("every field has a label tied to it", () => {
  const form = read(FORM);
  for (const id of ["contact-name", "contact-inquiry", "contact-email", "contact-message"]) {
    assert.ok(form.includes(`htmlFor="${id}"`), `label for ${id}`);
    assert.ok(form.includes(`id="${id}"`), `field ${id}`);
  }
});

test("what the form does with a message is unchanged: same endpoint, honeypot, and no personal data in analytics", () => {
  const form = read(FORM);
  assert.match(form, /fetch\("\/api\/contact"/);
  assert.match(form, /name="website"[\s\S]{0,200}tabIndex=\{-1\}/);
  const call = form.match(/trackEvent\("generate_lead", \{([\s\S]*?)\}\)/);
  assert.ok(call, "lead event is still sent");
  assert.deepEqual([...call[1].matchAll(/(\w+):/g)].map((m) => m[1]).sort(), ["inquiry_type", "lead_source"]);
  assert.ok(form.indexOf("setIsSuccess(true)") < form.indexOf('trackEvent("generate_lead"'), "only after the server accepted it");
});

test("small text in the bar's panels is dark enough to read (no #888 labels)", () => {
  assert.doesNotMatch(read(NAV), /text-\[#888888?\]/);
  assert.doesNotMatch(read(FORM), /text-\[#888888?\]/);
});
