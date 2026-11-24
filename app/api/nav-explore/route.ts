import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/admin/queries";

// The "Explore" card at the right of the Resources mega menu: the newest published
// Chaotic Confluence article. (The Services menu features a fixed workshop instead, see
// lib/offerings/menu-links.ts.) Read from the database here, so the nav never carries a
// link to a post that was unpublished.
//
// Fetched by the nav the first time a menu is opened (not on page load) and cached
// at the edge, so it costs the database one read an hour.

export const dynamic = "force-dynamic";

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

    const latest = posts[0];
    return NextResponse.json(
      { resources: latest ? toCard(latest) : null },
      { headers: { "Cache-Control": OK_CACHE } },
    );
  } catch {
    // The nav keeps its built-in card; try again in a minute.
    return NextResponse.json({ resources: null }, { headers: { "Cache-Control": FAIL_CACHE } });
  }
}
