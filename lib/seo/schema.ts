// Single source of truth for BBTx structured data (schema.org JSON-LD).
//
// - Organization / WebSite are emitted once, in the root layout. Every other
//   page refers to them by @id instead of declaring a second Organization.
// - Breadcrumbs are built by `breadcrumbList()` so every BreadcrumbList has a
//   name, ordered positions and absolute canonical URLs, and so a page can't
//   accidentally end up with two competing lists.

export const SITE_URL = "https://www.bbtx.ai";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const GRANT_PERSON_ID = `${SITE_URL}/team/grant#person`;
/** Canonical profile URL. Grant's Person node (declared on this page) uses it as its `url`. */
export const GRANT_PROFILE_URL = `${SITE_URL}/team/grant`;

/** Absolute canonical URL for a site path. "/" and "" return the bare origin. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path.replace(/\/+$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? SITE_URL : `${SITE_URL}${clean.replace(/\/+$/, "")}`;
}

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList for a page. Pass the trail *after* Home (Home is always the
 * first item), ending with the current page. Throws on a blank name so an
 * "Unnamed item" can't ship silently.
 */
export function breadcrumbList(trail: Crumb[]) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  const items = crumbs.map((crumb, index) => {
    const name = crumb.name.trim();
    if (!name) throw new Error(`breadcrumbList: item ${index + 1} has no name`);
    return {
      "@type": "ListItem" as const,
      position: index + 1,
      name,
      item: absoluteUrl(crumb.path),
    };
  });

  const current = items[items.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList" as const,
    // Naming the list itself is what clears Search Console's "Unnamed item"
    // label; the ListItems were already named.
    name: items.length > 1 ? `${current.name} breadcrumb` : "Home breadcrumb",
    itemListElement: items,
  };
}

/**
 * The one Organization entity for the site. Facts here come from the
 * repository's approved decisions (docs/seo-aeo/OPEN_DECISIONS.md): the trading
 * name is "BBTx Consulting"; "BBTx" is the short form.
 */
export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "BBTx Consulting",
    alternateName: "BBTx",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/oglogo.webp`,
    },
    description:
      "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charlottesville",
      addressRegion: "VA",
      addressCountry: "US",
    },
    founder: { "@id": GRANT_PERSON_ID },
    sameAs: [
      "https://linkedin.com/in/granttate",
      "https://chaoticconfluence.substack.com",
      "https://rgranttate.medium.com/",
    ],
  };
}

/**
 * Reference to Grant's Person entity, which is declared in full once, on
 * /team/grant. Anything that credits him (Article author, etc.) uses this so it
 * resolves to that one node by @id instead of declaring a second, differing
 * Person. `name` matches the node's name; his "Dr." is its honorificPrefix.
 */
export function grantPersonReference() {
  return {
    "@type": "Person" as const,
    "@id": GRANT_PERSON_ID,
    name: "Grant Tate",
    url: GRANT_PROFILE_URL,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "BBTx Consulting",
    alternateName: "BBTx",
    description:
      "AI business consulting for leaders and organizations. Strategy, assessment, and implementation.",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Site-wide graph rendered by the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteNode(), organizationNode()],
  };
}

export type ArticleSchemaInput = {
  url: string;
  headline: string;
  description?: string | null;
  image?: string | null;
  /** YYYY-MM-DD or full ISO. Omitted from output when missing. */
  datePublished?: string | null;
  dateModified?: string | null;
  /** Use the Grant Person entity only once he has approved the attribution. */
  author: "organization" | "grant";
};

/**
 * Article JSON-LD. Undefined/blank fields are dropped rather than invented.
 * author/publisher are minimal typed references (@id + name) to the entities
 * declared in full elsewhere, so they merge with those nodes instead of
 * creating a second, differing Organization or Person.
 */
export function articleSchema(input: ArticleSchemaInput) {
  const author =
    input.author === "grant"
      ? grantPersonReference()
      : { "@type": "Organization", "@id": ORGANIZATION_ID, name: "BBTx Consulting" };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description || undefined,
    image: input.image || undefined,
    datePublished: input.datePublished || undefined,
    dateModified: input.dateModified || undefined,
    author,
    publisher: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "BBTx Consulting" },
    mainEntityOfPage: input.url,
  };
}

/**
 * Serialise JSON-LD for a <script> tag. Escapes "<" so editor-supplied text
 * (e.g. a blog title) can never close the script element.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
