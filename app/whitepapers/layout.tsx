import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepapers",
  description:
    "What BBTx is learning across 100+ engagements, written down as it's ready. Sign up to get the first whitepaper as soon as it's published.",
  openGraph: {
    title: "Whitepapers | BBTx",
    description:
      "What BBTx is learning across 100+ engagements, written down as it's ready.",
    url: "https://bbtx.ai/whitepapers",
  },
  alternates: {
    canonical: "https://bbtx.ai/whitepapers",
  },
};

export default function WhitepapersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
