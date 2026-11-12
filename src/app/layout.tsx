import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "NutriMind AI - Personal Health & Nutrition Companion",
  description: "AI-powered personalized nutrition, meal planning, and health guidance.",
  openGraph: {
    title: "NutriMind AI - Personal Health & Nutrition Companion",
    description: "AI-powered personalized nutrition, meal planning, and health guidance.",
    type: "website",
    siteName: "NutriMind AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriMind AI",
    description: "AI-powered personalized nutrition, meal planning, and health guidance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
