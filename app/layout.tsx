import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ChatWidget } from "@/components/ui/ChatWidget";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Advance Group | Premier Strategic Consulting | New York",
  description:
    "Founded and led by Scott Levenson since 1990, The Advance Group is New York's premier strategic consulting firm. Lobbying, campaigns, communications, graphic design, fundraising, event management, and more. Together, We Make It Happen.",
  keywords: [
    "political consulting",
    "lobbying",
    "New York",
    "campaigns",
    "strategic consulting",
    "The Advance Group",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
