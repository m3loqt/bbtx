import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementation & Change Support | BBTx Consulting",
  description:
    "Change doesn't fail in the boardroom. It fails in the realities of daily work. BBTx helps leaders move from planning to implementation through accountability, communication, reinforcement, and practical execution support.",
  openGraph: {
    title: "Implementation & Change Support | BBTx Consulting",
    description:
      "Turn strategic intentions into action, accountability, and lasting results.",
    url: "https://bbtx.ai/services/implementation-support",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/implementation-support",
  },
};

export default function ImplementationSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
