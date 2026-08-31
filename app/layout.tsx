import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSettings } from "@/lib/data/settings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seo.defaultTitle,
      template: `%s | Smile Mart India`,
    },
    description: settings.seo.defaultDescription,
    openGraph: {
      title: settings.seo.defaultTitle,
      description: settings.seo.defaultDescription,
      siteName: "Smile Mart India",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo.defaultTitle,
      description: settings.seo.defaultDescription,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
