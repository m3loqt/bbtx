import { serializeJsonLd } from "@/lib/seo/schema";

/** Renders one JSON-LD <script>. Server-safe: no hooks, no client-only APIs. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
