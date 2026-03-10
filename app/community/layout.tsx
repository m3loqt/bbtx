import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the BBTx community of leaders, operators, and advisors working through AI together. Access resources, courses, and peer conversations.",
  openGraph: {
    title: "BBTx Community | Leaders Working Through AI Together",
    description:
      "A community for executive leaders, operators, and advisors navigating AI. Articles, podcast, courses, certifications, and peer conversations.",
    url: "https://bbtx.ai/community",
  },
  alternates: {
    canonical: "https://bbtx.ai/community",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
