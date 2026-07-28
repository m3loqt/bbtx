import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBlogBySlug, getVisibleCommentsForBlog } from "@/lib/admin/queries";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowLeft } from "@/app/components/ArrowIcon";
import { BlogEngagement } from "./BlogEngagement";

export const dynamic = "force-dynamic";

function formatDate(value: string | null): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);
  if (!post) return {};

  const url = `https://bbtx.ai/chaotic-confluence/${slug}`;
  const description = post.excerpt ?? undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      ...(post.published_date ? { publishedTime: post.published_date } : {}),
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

  const date = formatDate(post.published_date);
  const url = `https://bbtx.ai/chaotic-confluence/${slug}`;
  const comments = await getVisibleCommentsForBlog(post.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_date ?? undefined,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "BBTx" },
    publisher: { "@type": "Organization", name: "BBTx" },
    mainEntityOfPage: url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bbtx.ai" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Chaotic Confluence",
        item: "https://bbtx.ai/chaotic-confluence",
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image_url}
                  alt=""
                  className="mt-8 aspect-[16/9] w-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="px-5 pb-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
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
