import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DotBackground } from "@/components/ui/gridAndDot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaditya Bajgain",
  description: "My portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
          min-h-screen antialiased
          bg-gradient-to-b from-[var(--background)] to-gray-50
          dark:from-[var(--background)] dark:to-gray-900`}
      >
        {children}
        <div className="fixed inset-0 z-[-1] opacity-50">
          <DotBackground />
        </div>
      </body>
    </html>
  );
}
