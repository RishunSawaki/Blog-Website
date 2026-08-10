import type { Metadata } from "next";
import { Noto_Sans_JP, Space_Grotesk } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const bodyFont = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body"
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Solo Notes",
    template: "%s | Solo Notes"
  },
  description:
    "A multilingual personal blog built with Next.js, TypeScript, Tailwind CSS, MDX, shiki, and Vercel-ready conventions."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} bg-background text-foreground antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}