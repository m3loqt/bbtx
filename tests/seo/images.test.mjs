import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  OPTIMIZED_IMAGE_HOSTS,
  OPTIMIZED_IMAGE_HOST_SUFFIXES,
  imageRemotePatterns,
  isOptimizableImageUrl,
} from "../../lib/image-hosts.ts";
import {
  COMPANY_LOGO_ALT,
  DECORATIVE_IMAGES,
  IMAGE_ALT,
  altFor,
  companyLogoAlt,
} from "../../lib/seo/image-alt.ts";

const ROOT = new URL("../../", import.meta.url).pathname;

/** Every public (non-admin, non-api) .tsx file under app/. */
function publicTsx(dir = join(ROOT, "app"), out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name === "admin" || name === "api") continue;
      publicTsx(path, out);
    } else if (name.endsWith(".tsx")) {
      out.push(path);
    }
  }
  return out;
}

const FILES = publicTsx().map((path) => ({ path, rel: path.slice(ROOT.length), src: readFileSync(path, "utf8") }));

/**
 * Every <Image ... /> element in a source string. Walks forward from "<Image",
 * tracking {} depth and quotes, so props such as aria-hidden={i >= n} or an
 * arrow function cannot end the tag early the way a "[^>]*" pattern would.
 */
function imageElements(src) {
  const out = [];
  let from = 0;
  for (;;) {
    const start = src.indexOf("<Image", from);
    if (start === -1) return out;
    if (!/[\s/>]/.test(src[start + 6] ?? "")) {
      from = start + 6; // e.g. <ImageIcon
      continue;
    }
    let depth = 0;
    let quote = null;
    let i = start + 6;
    for (; i < src.length; i++) {
      const c = src[i];
      if (quote) {
        if (c === quote && src[i - 1] !== "\\") quote = null;
      } else if (c === '"' || c === "'" || c === "`") quote = c;
      else if (c === "{") depth++;
      else if (c === "}") depth--;
      else if (depth === 0 && c === "/" && src[i + 1] === ">") {
        i += 2;
        break;
      } else if (depth === 0 && c === ">") break; // opening tag that is not self-closing
    }
    out.push(src.slice(start, i));
    from = i;
  }
}

/** All <Image ... /> elements in the public pages. */
const IMAGE_ELEMENTS = FILES.flatMap(({ rel, src }) => imageElements(src).map((el) => ({ rel, el })));

test("the <Image> scanner finds the elements it is meant to police", () => {
  // Cross-check against a plain count of "<Image" openings: if the scanner ever
  // loses an element, the tests below would silently stop policing it.
  const openings = FILES.reduce((n, { src }) => n + (src.match(/<Image(?=[\s/>])/g) ?? []).length, 0);
  assert.ok(openings > 0);
  assert.equal(IMAGE_ELEMENTS.length, openings, "scanner and plain count disagree");
  const tricky = imageElements('<Image src={s} alt={i < n ? a : ""} aria-hidden={i >= n || undefined} width={1} height={1} />');
  assert.equal(tricky.length, 1);
  assert.match(tricky[0], /height=\{1\} \/>$/);
  assert.equal(imageElements("<ImageIcon className='x' />").length, 0);
});

// ---------------------------------------------------------------- remote hosts

test("image host check accepts known Substack, S3 and Vercel Blob hosts and nothing else", () => {
  assert.ok(isOptimizableImageUrl("https://substackcdn.com/image/fetch/$s_!x!,f_auto/https%3A%2F%2Fa.b%2Fc.png"));
  assert.ok(isOptimizableImageUrl("https://substack-post-media.s3.amazonaws.com/public/images/abc.png"));
  assert.ok(isOptimizableImageUrl("https://abc123.public.blob.vercel-storage.com/blog/cover.jpg"));

  for (const bad of [
    "http://substackcdn.com/a.png", // not https
    "https://substackcdn.com.evil.example/a.png", // look-alike suffix
    "https://evilsubstackcdn.com/a.png", // look-alike prefix
    "https://public.blob.vercel-storage.com/a.png", // suffix needs a store name in front
    "https://images.unsplash.com/a.jpg", // unknown host: falls back to <img>
    "not a url",
    "",
    null,
    undefined,
  ]) {
    assert.equal(isOptimizableImageUrl(bad), false, `should reject ${bad}`);
  }
});

test("next.config.ts builds remotePatterns from the same host list", () => {
  assert.equal(imageRemotePatterns.length, OPTIMIZED_IMAGE_HOSTS.length + OPTIMIZED_IMAGE_HOST_SUFFIXES.length);
  assert.ok(imageRemotePatterns.every((p) => p.protocol === "https"));
  const config = readFileSync(join(ROOT, "next.config.ts"), "utf8");
  assert.match(config, /from "\.\/lib\/image-hosts\.ts"/);
  assert.match(config, /remotePatterns:\s*imageRemotePatterns/);
  assert.doesNotMatch(config, /unoptimized/);
  // inlineCss was measured and rejected (+56 KB gzipped on every page); see docs/seo/batch-2-performance-images.md.
  assert.doesNotMatch(config, /inlineCss:\s*true/);
  assert.match(config, /"image\/avif"/);
  assert.match(config, /"image\/webp"/);
});

// ------------------------------------------------------------------- alt text

test("every dictionary image exists in /public and has plain, short alt text", () => {
  for (const [src, alt] of Object.entries(IMAGE_ALT)) {
    assert.ok(existsSync(join(ROOT, "public", src)), `${src} is not in /public`);
    assert.ok(alt.trim().length >= 12, `${src}: alt is too short to describe anything`);
    assert.ok(alt.length <= 125, `${src}: alt is ${alt.length} chars (keep it to 125 or fewer)`);
    assert.doesNotMatch(alt, /^(an? )?(image|picture|photo|photograph) of/i, `${src}: start with the subject, not "image of"`);
  }
  assert.equal(altFor("/grant.jpg"), IMAGE_ALT["/grant.jpg"]);
});

test("alt text names Dr. Grant Tate only on his own two photos, and nobody else by name", () => {
  const named = Object.entries(IMAGE_ALT)
    .filter(([, alt]) => /Grant|Tate/.test(alt))
    .map(([src]) => src)
    .sort();
  assert.deepEqual(named, ["/grant.jpg", "/grantt.jpg"]);
});

test("alt text does not stuff keywords or make claims", () => {
  const all = [...Object.values(IMAGE_ALT), ...Object.values(COMPANY_LOGO_ALT)].join("\n").toLowerCase();
  for (const banned of ["best", "top-rated", "leading", "100+", "trusted by", "client", "results", "charlottesville consulting"]) {
    assert.ok(!all.includes(banned), `alt text should not contain "${banned}"`);
  }
  // The positioning rule: AI is not the default word in image descriptions.
  const withAi = Object.entries(IMAGE_ALT).filter(([, alt]) => /\bAI\b/.test(alt));
  assert.equal(withAi.length, 0, "no photo alt needs the word AI");
});

test("every company logo file has alt text and an unknown one fails loudly", () => {
  const files = readdirSync(join(ROOT, "public/companies-nobg")).filter((f) => f.endsWith(".png"));
  assert.ok(files.length >= 19);
  for (const f of files) assert.ok(COMPANY_LOGO_ALT[f], `${f} has no alt text`);
  for (const f of Object.keys(COMPANY_LOGO_ALT)) assert.ok(files.includes(f), `${f} is described but not in /public`);
  assert.equal(companyLogoAlt("/companies-nobg/alz.png"), "Alzheimer’s Association");
  assert.throws(() => companyLogoAlt("/companies-nobg/nope.png"), /No alt text/);
});

test("decorative images are real files and only those carry an empty alt", () => {
  for (const src of DECORATIVE_IMAGES) assert.ok(existsSync(join(ROOT, "public", src)), `${src} missing`);
  for (const { rel, el } of IMAGE_ELEMENTS) {
    assert.match(el, /\balt=/, `${rel}: an <Image> has no alt prop: ${el.slice(0, 80)}`);
    if (/\balt=""/.test(el)) {
      assert.match(el, /aria-hidden/, `${rel}: empty alt must also be aria-hidden: ${el.slice(0, 80)}`);
    }
  }
});

test("an image that has a dictionary entry never ships with an empty alt", () => {
  for (const { rel, el } of IMAGE_ELEMENTS) {
    const m = el.match(/src="(\/[^"]+)"/);
    if (m && m[1] in IMAGE_ALT) {
      assert.doesNotMatch(el, /\balt=""/, `${rel}: ${m[1]} has alt text in image-alt.ts but renders empty`);
    }
  }
});

// ----------------------------------------------------- size, shape, optimizer

test("no public page opts out of the image optimizer or uses a raw <img> for page content", () => {
  for (const { rel, src } of FILES) {
    assert.doesNotMatch(src, /\bunoptimized\b/, `${rel} uses unoptimized`);
  }
  const rawImg = FILES.filter(({ src }) => /<img\b/.test(src)).map(({ rel }) => rel).sort();
  // RemoteCoverImage is the deliberate fallback for unknown hosts; the modal shows a
  // local blob: preview of a photo the visitor just picked, which next/image cannot load.
  assert.deepEqual(rawImg, ["app/components/RemoteCoverImage.tsx", "app/components/TestimonialSubmissionModal.tsx"]);
});

test("every fill image says how wide it is drawn (sizes)", () => {
  for (const { rel, el } of IMAGE_ELEMENTS) {
    if (/\bfill\b/.test(el)) assert.match(el, /\bsizes=/, `${rel}: <Image fill> without sizes: ${el.slice(0, 90)}`);
  }
});

test("company logos are declared square, matching the 1080x1080 files", () => {
  const logoElements = IMAGE_ELEMENTS.filter(({ el }) => /companyLogoAlt\(/.test(el));
  assert.equal(logoElements.length, 3, "homepage strip, /services strip and implementation-support strip");
  for (const { rel, el } of logoElements) {
    const w = el.match(/width=\{(\d+)\}/)?.[1];
    const h = el.match(/height=\{(\d+)\}/)?.[1];
    assert.ok(w && h && w === h, `${rel}: logo declared ${w}x${h}, files are square`);
    assert.ok(Number(w) <= 160, `${rel}: logos are shown at most 160px, do not declare ${w}`);
  }
});

test("blog covers go through RemoteCoverImage and carry the post title as alt", () => {
  const index = readFileSync(join(ROOT, "app/chaotic-confluence/ChaoticConfluenceExperience.tsx"), "utf8");
  const post = readFileSync(join(ROOT, "app/chaotic-confluence/[slug]/page.tsx"), "utf8");
  for (const [name, src] of [["index", index], ["post", post]]) {
    assert.match(src, /<RemoteCoverImage/, `${name}: not using RemoteCoverImage`);
    assert.match(src, /alt=\{post\.title\}/, `${name}: cover alt should be the post title`);
    assert.match(src, /sizes="/, `${name}: cover needs sizes`);
  }
  // The cover sits in an aspect-ratio box so nothing moves while it loads.
  assert.match(index, /relative aspect-\[4\/3\]/);
  assert.match(post, /relative mt-8 aspect-\[16\/9\]/);
});

// ------------------------------------------------------------------ 404 page

test("custom 404 page exists, stays out of search, and links only to pages that exist", () => {
  const path = join(ROOT, "app/not-found.tsx");
  assert.ok(existsSync(path), "app/not-found.tsx is missing");
  const src = readFileSync(path, "utf8");
  assert.match(src, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/);
  assert.match(src, /<Nav\s*\/>/);
  assert.match(src, /<Footer\s*\/>/);

  const hrefs = [...src.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
  const internal = hrefs.filter((h) => h.startsWith("/"));
  assert.ok(internal.length >= 7, "should offer several real destinations");
  for (const h of internal) {
    assert.ok(existsSync(join(ROOT, "app", h, "page.tsx")), `404 links to ${h}, which has no page`);
  }
  for (const service of [
    "leadership-development",
    "ai-integration",
    "organizational-assessment",
    "strategy-advisory",
    "implementation-support",
  ]) {
    assert.ok(internal.includes(`/services/${service}`), `404 should link to ${service}`);
  }
  assert.ok(internal.includes("/resources/ai-readiness-assessment"));
  // Exactly one external link (scheduling), and it opens safely.
  const external = hrefs.filter((h) => !h.startsWith("/"));
  assert.deepEqual(external, ["https://www.calendly.com/granttate"]);
  assert.match(src, /rel="noopener noreferrer"/);
});
