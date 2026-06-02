import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HS Code Finder — Instant Harmonized System Classification",
  description:
    "Find the correct Harmonized System (HS) tariff code for any product in seconds. AI-powered classification for exporters, importers, and customs professionals.",
  keywords: [
    "HS code finder",
    "harmonized system code",
    "tariff code lookup",
    "customs classification",
    "HTS code",
    "export classification",
    "import tariff code",
    "HS code search",
  ],
  openGraph: {
    title: "HS Code Finder",
    description: "Instant AI-powered Harmonized System code classification",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "HS Code Finder",
    description: "Instant AI-powered Harmonized System code classification",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
