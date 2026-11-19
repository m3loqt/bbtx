import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBlogBySlug, getVisibleCommentsForBlog } from "@/lib/admin/queries";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowLeft } from "@/app/components/ArrowIcon";
import { JsonLd } from "@/app/components/JsonLd";
import { RemoteCoverImage } from "@/app/components/RemoteCoverImage";
import { articleSchema, breadcrumbList } from "@/lib/seo/schema";
import { formatDisplayDate, toDateOnly, toIsoTimestamp } from "@/lib/seo/dates";
import { composeMetaDescription, ensureImageAlt } from "@/lib/seo/post-content";
import { BlogEngagement } from "./BlogEngagement";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) return {};

  const url = `https://www.bbtx.ai/chaotic-confluence/${slug}`;
  // Some posts only have a one-line subtitle as their excerpt; build a real description from it
  // plus the opening of the post (see lib/seo/post-content.ts) so every post has 70 to 155 characters.
  const description = composeMetaDescription(post.excerpt, post.content);
  // published_date is a Postgres `date` and arrives as a JS Date at runtime;
  // normalise it so the meta tag is "2026-02-26", not "[object Object]".
  const publishedTime = toDateOnly(post.published_date);
  const modifiedTime = toIsoTimestamp(post.updated_at);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(post.cover_image_url ? { images: [{ url: post.cover_image_url }] } : {}),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) notFound();

  const date = formatDisplayDate(post.published_date, "long");
  const url = `https://www.bbtx.ai/chaotic-confluence/${slug}`;
  const comments = await getVisibleCommentsForBlog(post.id);

  const jsonLd = articleSchema({
    url,
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url,
    datePublished: toDateOnly(post.published_date),
    dateModified: toIsoTimestamp(post.updated_at),
    // Chaotic Confluence posts have no per-post author field yet, so they are
    // attributed to the organisation rather than guessing an individual.
    author: "organization",
  });

  const breadcrumbJsonLd = breadcrumbList([
    { name: "Chaotic Confluence", path: "/chaotic-confluence" },
    { name: post.title || "Article", path: `/chaotic-confluence/${slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Nav heroTheme="light" instantFloat />

      <div style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <article className="w-full bg-white">
          {/* id="hero" scopes the transparent-nav window to just the intro block,
              not the whole (potentially long) article body below it. */}
          <div id="hero" className="px-5 pb-10 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pt-44">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/chaotic-confluence"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#555555] transition-colors hover:text-[#111111]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Chaotic Confluence
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 text-[13px] text-[#374151]">
                {post.category && <span>{post.category}</span>}
                {date && <span className="text-[#9ca3af]">{date}</span>}
                {post.read_time_minutes && (
                  <span className="text-[#9ca3af]">{post.read_time_minutes} min read</span>
                )}
              </div>

              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-4 text-lg leading-relaxed text-[#555555]">{post.excerpt}</p>
              )}

              {post.cover_image_url && (
                <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden">
                  <RemoteCoverImage
                    src={post.cover_image_url}
                    alt={post.title}
                    sizes="(min-width: 768px) 768px, 100vw"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          <div className="px-5 pb-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: ensureImageAlt(post.content, post.title) }}
              />
            </div>
          </div>

          <BlogEngagement
            blogId={post.id}
            slug={slug}
            postUrl={url}
            initialHeartCount={post.heart_count}
            initialComments={comments}
          />
        </article>
      </div>

      <CTA />

      <Footer />
    </div>
  );
}
