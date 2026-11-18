import { getPublishedBlogs } from "@/lib/admin/queries";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";
import { toDateOnly } from "@/lib/seo/dates";
import { ChaoticConfluenceExperience, type PublicBlogPost } from "./ChaoticConfluenceExperience";

export const dynamic = "force-dynamic";

const breadcrumbJsonLd = breadcrumbList([
  { name: "Chaotic Confluence", path: "/chaotic-confluence" },
]);

export default async function ChaoticConfluencePage() {
  const blogs = await getPublishedBlogs();
  // The editor requires a slug before a post can be saved, but filter defensively
  // in case older rows exist without one — there's nowhere for those to link to.
  const posts: PublicBlogPost[] = blogs
    .filter((b): b is typeof b & { slug: string } => Boolean(b.slug))
    .map((b) => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      category: b.category,
      cover_image_url: b.cover_image_url,
      slug: b.slug,
      // Normalised on the server so the client formats the same calendar day.
      published_date: toDateOnly(b.published_date),
    }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ChaoticConfluenceExperience posts={posts} />
    </>
  );
}
