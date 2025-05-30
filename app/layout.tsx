import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Aaditya Bajgain | Portfolio",
  description: "Software Engineer & Student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <div className="fixed inset-0 -z-10 h-full w-full bg-[var(--background)] [background-image:radial-gradient(var(--muted)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </body>
    </html>
  );
}
