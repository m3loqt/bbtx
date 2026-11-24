import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/admin/queries";

// The "Explore" card at the right of each desktop mega menu. Both cards are real
// published Chaotic Confluence articles, picked here so the nav never carries a
// link to a post that was unpublished: the slug below is only a preference, and
// if that post is not published the newest one stands in.
//
// Fetched by the nav the first time a menu is opened (not on page load) and cached
// at the edge, so it costs the database one read an hour.

export const dynamic = "force-dynamic";

/** The article each menu would like to show. `null` means "the newest published post". */
const PREFERRED_SLUG: Record<"services" | "resources", string | null> = {
  services: "strategic-confluence-a-beginners",
  resources: null,
};

type Card = {
  title: string;
  excerpt: string;
  category: string | null;
  image: string | null;
  href: string;
};

const OK_CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";
const FAIL_CACHE = "public, s-maxage=60";

export async function GET() {
  try {
    const posts = (await getPublishedBlogs()).filter((b) => Boolean(b.slug));
    const toCard = (b: (typeof posts)[number]): Card => ({
      title: b.title,
      excerpt: b.excerpt ?? "",
      category: b.category ?? null,
      image: b.cover_image_url ?? null,
      href: `/chaotic-confluence/${b.slug}`,
    });

    const services = posts.find((b) => b.slug === PREFERRED_SLUG.services) ?? posts[0];
    // Never show the same article in both menus.
    const resources =
      posts.find((b) => b.slug === PREFERRED_SLUG.resources && b !== services) ??
      posts.find((b) => b !== services);

    return NextResponse.json(
      { services: services ? toCard(services) : null, resources: resources ? toCard(resources) : null },
      { headers: { "Cache-Control": OK_CACHE } },
    );
  } catch {
    // The nav keeps its built-in card; try again in a minute.
    return NextResponse.json({ services: null, resources: null }, { headers: { "Cache-Control": FAIL_CACHE } });
  }
}
