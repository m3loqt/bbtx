import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Team Development | BBTx Consulting",
  description:
    "Leadership development fails when individuals improve but the system around them does not. BBTx helps leaders and leadership teams build the capability required to navigate complexity, strengthen trust, and improve organizational performance.",
  openGraph: {
    title: "Leadership & Team Development | BBTx Consulting",
    description:
      "Develop stronger leaders, healthier teams, and more effective organizations.",
    url: "https://bbtx.ai/services/leadership-development",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/leadership-development",
  },
};

export default function LeadershipDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
