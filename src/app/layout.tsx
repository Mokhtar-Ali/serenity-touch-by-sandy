import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { site } from "@/data/site";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const cormorant = localFont({
  variable: "--font-cormorant",
  src: [
    {
      path: "./fonts/cormorant-garamond-latin.woff2",
      weight: "500 700",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-italic-latin.woff2",
      weight: "500 700",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Serenity Touch by Sandy | Mobile Massage in Florence, KY",
    template: "%s | Serenity Touch by Sandy",
  },
  description:
    "Serenity Touch by Sandy provides personalized at-home massage in Florence, Kentucky, including relaxation, Swedish, deep tissue, neck and shoulder massage, foot reflexology, and add-ons.",
  alternates: {
    canonical: "/",
  },
  category: "Health and wellness",
  openGraph: {
    title: "Serenity Touch by Sandy | Mobile Massage in Florence, KY",
    description:
      "Spa experience in the comfort of your home with personalized massage care by Sandy in Florence, Kentucky.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: site.images.hero,
        width: 2048,
        height: 1536,
        alt: "Massage table prepared with stones, towels, and massage oil for a mobile massage session.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serenity Touch by Sandy | Mobile Massage in Florence, KY",
    description:
      "Personalized at-home massage care for relaxation, tension relief, and restorative wellness in Florence, Kentucky.",
    images: [site.images.hero],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5f1e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
