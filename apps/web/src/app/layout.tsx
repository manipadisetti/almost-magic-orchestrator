import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thin Air - Create software out of Thin Air",
  description: "From napkin sketch to deployed application in minutes via a Zero-Spec pipeline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={inter.className}>
        <main className="min-h-screen bg-[#1a1a1a] text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
