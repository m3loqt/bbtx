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
  assert.match(form, /absolute inset-x-0 top-\[calc\(100%-1px\)\]/, "laid 1px over the bar's edge, the bar's full width, like the menus");
  assert.doesNotMatch(form, /fixed inset-0/, "no separate full-screen overlay inside the form itself");
  // the bar treats the open form like an open menu
  assert.match(nav, /const panelOpen = menuOpen \|\| contactOpen/);
  assert.match(nav, /borderBottomLeftRadius: panelOpen \? 0 : 8/);
  assert.match(nav, /borderBottomRightRadius: panelOpen \? 0 : 8/);
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
  assert.match(form, /aria-describedby="contact-modal-intro"/);
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

test("layout: as wide as the bar, two columns on a desktop (introduction and contact left, form right), one column below", () => {
  const form = read(FORM);
  assert.doesNotMatch(form, /max-w-\[(640|920)px\]/, "not narrowed: the panel is the bar's width");
  assert.match(form, /lg:grid lg:grid-cols-\[minmax\(0,1fr\)_minmax\(0,2fr\)\]/, "two columns from desktop width");
  // left column: heading, a short introduction, then email and phone; right column: the form
  const order = ["Send us a message", 'id="contact-modal-intro"', "CONTACT_EMAIL}", "CONTACT_PHONE}", "<form"].map((s) => form.indexOf(s));
  assert.ok(order.every((n) => n > 0) && order.every((n, i) => i === 0 || n > order[i - 1]), `in order: ${order}`);
  assert.match(form, /Tell us a little about what you&apos;re working on, and Grant will be in touch shortly\./);
});

test("the form is arranged name + email, then the topic, then the message", () => {
  const form = read(FORM);
  assert.match(form, /<form onSubmit=\{onSubmit\} className="grid gap-4 sm:grid-cols-2">/);
  const at = ["contact-name", "contact-email", "contact-inquiry", "contact-message"].map((id) => form.indexOf(`htmlFor="${id}"`));
  assert.ok(at.every((n, i) => n > 0 && (i === 0 || n > at[i - 1])), `source order ${at}`);
  // the topic and the message take the full width; name and email share a row
  assert.equal((form.match(/space-y-1\.5 sm:col-span-2/g) ?? []).length, 2);
});

test("every control looks the same: 56px, one padding, radius and fill, dropdown included; message about 150px", () => {
  const form = read(FORM);
  const look = form.match(/const FIELD_LOOK =\s*"([^"]+)"/)[1];
  assert.match(look, /rounded-lg/);
  assert.match(look, /bg-\[#f6f6f6\]/);
  assert.match(look, /px-4/);
  assert.match(form, /const INPUT = `\$\{FIELD_LOOK\} h-14`/, "56px = h-14");
  // the dropdown's own data-[size=default]:h-8 beats a plain height class, so it is overridden at the same specificity
  assert.match(form, /const SELECT = `\$\{FIELD_LOOK\} h-14 w-full min-w-0 data-\[size=default\]:h-14`/);
  assert.match(read("components/ui/select.tsx"), /data-\[size=default\]:h-8/, "(this is what the override is for)");
  assert.equal((form.match(/className=\{INPUT\}/g) ?? []).length, 2, "name and email");
  assert.match(form, /className=\{SELECT\}/);
  assert.match(form, /const TEXTAREA = `\$\{FIELD_LOOK\} field-sizing-fixed h-\[150px\] min-h-\[150px\] resize-none/, "140–160px, fixed");
  assert.match(form, /text-base md:text-\[15px\]/, "16px on a phone so iOS does not zoom in");
});

test("Close is an X at the top right, not a text button", () => {
  const form = read(FORM);
  assert.match(form, /aria-label="Close contact form"/);
  assert.match(form, /absolute right-2 top-2/);
  assert.match(form, /<X className=/);
  assert.doesNotMatch(form, />\s*Close\s*</, "no text Close button");
});
