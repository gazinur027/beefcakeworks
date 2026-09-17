import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StickyCallButton from "@/components/StickyCallButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Production domain: beefcakeworks.com (confirmed by owner).
// STATUS 2026-09: domain is NOT yet registered (RDAP 404) — buy it and
// point DNS at Netlify before launch. Keep this URL in sync with Netlify.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.beefcakeworks.com"),
  title: "Same-Day Appliance Repair in Tampa Bay | Beefcake Works LLC",
  description:
    "Licensed & insured appliance repair in Tampa Bay, FL. Same-day service for refrigerators, dryers, dishwashers & more. Fair prices, 5-star rated local pros. Call now!",
  keywords: [
    "appliance repair Tampa Bay",
    "refrigerator repair Tampa",
    "dryer repair Tampa FL",
    "dishwasher repair Tampa Bay",
    "same day appliance repair Florida",
    "Beefcake Works LLC",
  ],
  openGraph: {
    title: "Same-Day Appliance Repair in Tampa Bay | Beefcake Works LLC",
    description:
      "Licensed & insured. Fast response. Fair prices. Same-day appliance repair across Tampa Bay, Florida.",
    url: "https://www.beefcakeworks.com",
    siteName: "Beefcake Works LLC",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17442b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        {/* Sticky mobile CTA — sits above everything, hidden on md+ screens */}
        <StickyCallButton />
      </body>
    </html>
  );
}
