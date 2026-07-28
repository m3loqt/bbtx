import { getPublishedBlogs } from "@/lib/admin/queries";
import { ChaoticConfluenceExperience, type PublicBlogPost } from "./ChaoticConfluenceExperience";

export const dynamic = "force-dynamic";

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
      published_date: b.published_date,
    }));

  return <ChaoticConfluenceExperience posts={posts} />;
}
