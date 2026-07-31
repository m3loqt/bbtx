import type { Metadata } from "next";
import {
  Familjen_Grotesk,
  Space_Mono,
  Fraunces,
} from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/app/components/GoogleAnalytics";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bbtx.ai"),
  title: {
    default: "BBTx | AI Business Consulting for Leaders and Organizations",
    template: "%s | BBTx",
  },
  description:
    "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence. AI consulting, organizational assessment, and implementation support.",
  keywords: [
    "BBTX",
    "BBTx AI",
    "AI business consulting",
    "AI organizational consulting",
    "AI strategy consulting",
    "AI implementation",
    "organizational AI assessment",
    "AI leadership consulting",
    "Bridge Business Transformations",
  ],
  authors: [{ name: "Grant Tate", url: "https://www.bbtx.ai/about" }],
  creator: "BBTx",
  publisher: "BBTx",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bbtx.ai",
    siteName: "BBTx",
    title: "BBTx | AI Business Consulting for Leaders and Organizations",
    description:
      "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence. AI consulting, organizational assessment, and implementation support.",
    images: [
      {
        url: "/oglogo.webp",
        width: 1200,
        height: 630,
        alt: "BBTx AI Business Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BBTx | AI Business Consulting",
    description:
      "Helping leaders and organizations integrate AI with strategy, clarity, and confidence.",
    images: ["/oglogo.webp"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const htmlClassName = [
    familjenGrotesk.variable,
    spaceMono.variable,
    fraunces.variable,
    "font-sans",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <html lang="en" className={htmlClassName} suppressHydrationWarning>
      <body className="antialiased relative z-[1]" suppressHydrationWarning>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
