// One-off import tool: pulls a published Substack post into the `blogs` table
// as an unpublished draft, so it can be reviewed/edited at
// /admin/content/blog/<id> before going live on bbtx.ai.
//
// Usage:
//   node scripts/import-substack-post.mts <substack-post-url> [<url> ...]
//
// Reads DATABASE_URL from .env.local (same DB the app itself uses). Run from
// the repo root. Idempotent — re-running with the same URL skips it if a
// post with that slug already exists.

import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import * as cheerio from "cheerio";

function loadEnvLocal() {
  try {
    const text = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env.local missing is fine if DATABASE_URL is already set some other way
  }
}

function apiUrlFor(postUrl: string): { apiUrl: string; slug: string } {
  const parsed = new URL(postUrl);
  const match = parsed.pathname.match(/\/p\/([^/?#]+)/);
  if (!match) throw new Error(`Couldn't find a /p/<slug> segment in ${postUrl}`);
  const slug = match[1];
  return { apiUrl: `${parsed.origin}/api/v1/posts/${slug}`, slug };
}

type SubstackPost = {
  title: string;
  subtitle: string | null;
  cover_image: string | null;
  post_date: string;
  body_html: string;
};

// Substack wraps images in <picture><source>...<img></picture> and adds a lot
// of its own chrome (subscribe prompts, share buttons, captioned-image divs).
// Reduce all of that down to the same clean semantic HTML our TipTap editor
// produces, so imported posts render identically to hand-written ones.
function cleanBodyHtml($: cheerio.CheerioAPI, root: ReturnType<cheerio.CheerioAPI>, coverImage: string | null): string {
  root
    .find(
      [
        ".subscription-widget-wrap-editor",
        ".subscribe-widget",
        ".button-wrapper",
        ".digest-post-embed",
        ".poll-embed",
        ".tweet",
        ".share-dialog",
        ".instagram-embed",
        "[class*='paywall']",
      ].join(", ")
    )
    .remove();

  root.find("picture").each((_, el) => {
    const img = $(el).find("img").first();
    if (img.length) $(el).replaceWith($.html(img));
  });

  root.find(".captioned-image-container, .image2-inset, figure").each((_, el) => {
    const $el = $(el);
    const img = $el.find("img").first();
    const caption = $el.find("figcaption").first().text().trim();
    const replacement = img.length ? $.html(img) : "";
    $el.replaceWith(caption ? `${replacement}<p><em>${caption}</em></p>` : replacement);
  });

  const KEEP_ATTRS: Record<string, string[]> = {
    a: ["href"],
    img: ["src", "alt"],
  };
  root.find("*").each((_, el) => {
    if (el.type !== "tag") return;
    const allowed = KEEP_ATTRS[el.tagName] ?? [];
    for (const attr of Object.keys(el.attribs)) {
      if (!allowed.includes(attr)) $(el).removeAttr(attr);
    }
  });

  root.find("p").each((_, el) => {
    if (!$(el).text().trim() && $(el).find("img").length === 0) $(el).remove();
  });

  dropLeadingDuplicateCover(root, coverImage);

  return root.html() ?? "";
}

// Substack CDN URLs wrap the same underlying S3 asset behind different resize
// params (e.g. cover image vs. inline body image), so comparing full URLs
// misses the duplicate. Pull out the stable "images/<uuid>_<dims>" segment
// instead and compare that.
function substackImageId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = decodeURIComponent(url).match(/\/images\/([a-f0-9-]+)/);
  return match ? match[1] : null;
}

// The post's lead image is almost always re-embedded as the first element of
// the body too — drop it there since it's already shown as the cover image.
// Runs after the figure/picture normalization above, so by now the first
// element is a bare <img> (not a wrapper div) if it's an image at all.
function dropLeadingDuplicateCover(root: ReturnType<cheerio.CheerioAPI>, coverImage: string | null): void {
  const coverId = substackImageId(coverImage);
  if (!coverId) return;
  const first = root.children().first();
  if (first.is("img") && substackImageId(first.attr("src")) === coverId) {
    first.remove();
  }
}

async function importPost(url: string) {
  const { apiUrl, slug } = apiUrlFor(url);
  const sql = neon(process.env.DATABASE_URL!);

  const [existing] = await sql`SELECT id FROM blogs WHERE slug = ${slug}`;
  if (existing) {
    console.log(`⏭  Skipping ${slug} — already imported (id ${existing.id})`);
    return;
  }

  // The rendered post page only ships a client-hydrated skeleton (no real text
  // in the static HTML) — Substack's own public JSON API is what actually has
  // the full body, and it works for any post regardless of age, unlike the
  // RSS feed which only carries the ~20 most recent items.
  const res = await fetch(apiUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; BBTx-import/1.0)" },
  });
  if (!res.ok) throw new Error(`API fetch failed: HTTP ${res.status}`);
  const post = (await res.json()) as SubstackPost;

  const $ = cheerio.load(`<div id="root">${post.body_html}</div>`);
  const root = $("#root");
  const content = cleanBodyHtml($, root, post.cover_image);

  const wordCount = root.text().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.round(wordCount / 200));
  const publishedDate = post.post_date ? post.post_date.slice(0, 10) : null;

  const [row] = await sql`
    INSERT INTO blogs
      (title, slug, content, excerpt, cover_image_url, substack_url, published_date, read_time_minutes, is_featured, is_published, sort_order)
    VALUES
      (${post.title}, ${slug}, ${content}, ${post.subtitle}, ${post.cover_image}, ${url},
       ${publishedDate}, ${readTimeMinutes}, false, false, 0)
    RETURNING id
  `;

  console.log(`✅ Imported "${post.title}" as a draft — review at /admin/content/blog/${row.id}`);
}

async function main() {
  loadEnvLocal();
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set (checked .env.local and the environment).");
    process.exit(1);
  }

  const urls = process.argv.slice(2);
  if (urls.length === 0) {
    console.error("Usage: node scripts/import-substack-post.mts <substack-post-url> [<url> ...]");
    process.exit(1);
  }

  for (const url of urls) {
    try {
      await importPost(url);
    } catch (err) {
      console.error(`❌ Failed on ${url}:`, err instanceof Error ? err.message : err);
    }
  }
}

main();
