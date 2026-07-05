import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "African Capitals | Explore and Learn",
  description: "Discover all the capital cities of Africa easily with a modern interface. Learn about countries and their capitals today.",
  keywords: ["africa", "capitals", "countries", "english", "education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sw" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
