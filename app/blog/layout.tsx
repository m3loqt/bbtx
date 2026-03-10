import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI strategy, implementation, and organizational change for leaders. Articles from the BBTx team on how to integrate AI with clarity and intent.",
  openGraph: {
    title: "BBTx Blog | AI Strategy, Implementation, and Leadership Insights",
    description:
      "Weekly writing on AI strategy, organizational change, and implementation. Honest, considered perspectives for leaders navigating AI.",
    url: "https://bbtx.ai/blog",
  },
  alternates: {
    canonical: "https://bbtx.ai/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
