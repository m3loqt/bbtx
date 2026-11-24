import type { Metadata } from "next";

export const metadata: Metadata = {
  // `absolute` stops the root "%s | BBTx" template from adding a second suffix.
  title: { absolute: "Organizational Consulting Services | BBTx Consulting" },
  description:
    "Organizational consulting spanning organizational development, leadership, strategy, and AI, helping teams understand why performance problems persist.",
  openGraph: {
    title: "Organizational Consulting Services | BBTx Consulting",
    description:
      "Twenty years of organizational work. The same core approach: see clearly, decide well, lead at the level the work requires, use AI well, and make it last.",
    url: "https://www.bbtx.ai/services",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services",
  },
};

// The /services index owns its own breadcrumb (rendered in app/services/page.tsx).
// It must not live here: this layout wraps every /services/* page, so a list
// declared here would sit next to each child page's own breadcrumb and give
// Google two competing BreadcrumbLists.

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
