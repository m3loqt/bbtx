import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Digital Twin Snapshot | BBTx Consulting",
  description:
    "Enter your website to get a surface-level Strategic Digital Twin Snapshot: public positioning, visible strengths, possible blind spots, and key questions.",
  openGraph: {
    title: "Strategic Digital Twin Snapshot | BBTx Consulting",
    description:
      "See what your public presence reveals about your strategy, positioning, and AI opportunity.",
    url: "https://www.bbtx.ai/digital-twin-snapshot",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/digital-twin-snapshot",
  },
};

export default function DigitalTwinSnapshotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
