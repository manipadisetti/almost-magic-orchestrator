import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thin Air - Zero-Spec Cognitive Foundry",
  description: "Create software out of Thin Air",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
