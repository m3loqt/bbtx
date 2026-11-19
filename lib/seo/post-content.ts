/**
 * Helpers for blog posts, whose bodies are HTML stored in the database and typed or
 * imported (from Substack) by hand, so they cannot be trusted to be SEO-complete.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, body: string) => {
    if (body[0] === "#") {
      const code = body[1].toLowerCase() === "x" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : whole;
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
  });
}

/** Visible text of an HTML fragment: no tags, entities decoded, whitespace collapsed. */
export function htmlToText(html: string | null | undefined): string {
  if (!html) return "";
  const withoutBlocks = html
    .replace(/<(script|style|figcaption)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(h[1-6])\b[\s\S]*?<\/\1>/gi, " ") // a heading is not the opening of the argument
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(withoutBlocks).replace(/\s+/g, " ").trim();
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—–-]+$/, "");
  return `${base}…`;
}

/**
 * A meta description of 70 to 155 characters. A post's own excerpt wins when it is long
 * enough; when it is only a short subtitle ("Pattern Recognition"), it is kept as the
 * lead and followed by the opening of the post, so search results get a real sentence.
 * Nothing is invented: every word comes from the excerpt or the body.
 */
export function composeMetaDescription(
  excerpt: string | null | undefined,
  bodyHtml: string | null | undefined,
  { min = 70, max = 155 }: { min?: number; max?: number } = {},
): string | undefined {
  const lead = decodeEntities((excerpt ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  if (lead.length >= min) return truncateAtWord(lead, max);

  let body = htmlToText(bodyHtml);
  if (!body) return lead || undefined;
  // Some posts open by repeating their own subtitle; do not say it twice.
  const leadStem = lead.replace(/[\s.:;,—–-]+$/, "");
  if (leadStem && body.toLowerCase().startsWith(leadStem.toLowerCase())) {
    body = body.slice(leadStem.length).replace(/^[\s.:;,—–-]+/, "");
  }
  const joined = leadStem ? `${leadStem}. ${body}` : body;
  return truncateAtWord(joined, max);
}

/**
 * Every <img> in a post body gets non-empty alt text. Posts imported from Substack often
 * carry alt="" or none. An existing alt is kept; otherwise the image's title attribute,
 * then the text of the <figcaption> right after it, then a plain label naming the post.
 */
export function ensureImageAlt(html: string | null | undefined, postTitle: string): string {
  if (!html) return "";
  const fallback = `Image from “${postTitle}”`;
  const escapeAttr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  return html.replace(/<img\b([^>]*?)(\/?)>/gi, (whole, attrs: string, selfClose: string, offset: number) => {
    const alt = attrs.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    const existing = (alt?.[1] ?? alt?.[2] ?? "").trim();
    if (existing) return whole;

    const title = attrs.match(/\btitle\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    let text = (title?.[1] ?? title?.[2] ?? "").trim();
    if (!text) {
      const after = html.slice(offset + whole.length, offset + whole.length + 600);
      const caption = after.match(/^[\s\S]*?<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      // Only trust a caption that belongs to this image (no other <img> in between).
      if (caption && !/<img\b/i.test(caption[0])) text = htmlToText(caption[1]);
    }
    const value = escapeAttr(text || fallback);
    const withoutAlt = attrs.replace(/\salt\s*(?:=\s*(?:"[^"]*"|'[^']*'))?/i, "").replace(/\s+$/, "");
    return `<img${withoutAlt} alt="${value}"${selfClose ? " /" : ""}>`;
  });
}
