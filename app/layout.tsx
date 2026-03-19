import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Space_Mono,
  Fraunces,
  DM_Sans, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
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
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bbtx.ai"),
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
  authors: [{ name: "Grant Tate", url: "https://bbtx.ai/about" }],
  creator: "BBTx",
  publisher: "BBTx",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bbtx.ai",
    siteName: "BBTx",
    title: "BBTx | AI Business Consulting for Leaders and Organizations",
    description:
      "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence. AI consulting, organizational assessment, and implementation support.",
    images: [
      {
        url: "/bbtxlog.png",
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
    images: ["/bbtxlog.png"],
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
    inter.variable,
    playfair.variable,
    spaceMono.variable,
    fraunces.variable,
    dmSans.variable,
    "font-sans",
    geist.variable,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <html lang="en" className={htmlClassName} suppressHydrationWarning>
      <body className="antialiased relative z-[1]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
