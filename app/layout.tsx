import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/data/site.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${site.siteName} | ${site.tagline}`,
    template: `%s | ${site.siteName}`,
  },
  description: site.tagline,
  metadataBase: new URL("https://theaiguides.co"),
  openGraph: {
    title: site.siteName,
    description: site.tagline,
    url: "https://theaiguides.co",
    siteName: site.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.siteName,
    description: site.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}> 
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
