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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Juan David Gil — Software Developer",
  description:
    "Portfolio de Juan David Gil Diaz, desarrollador Full-Stack con Java, Spring Boot, Next.js y TypeScript.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Juan David Gil — Software Developer",
    description:
      "Desarrollador Full-Stack especializado en Java, Spring Boot y Next.js. Construyo aplicaciones robustas con foco en rendimiento y experiencia de usuario.",
    siteName: "Juan David Gil — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan David Gil — Software Developer",
    description:
      "Desarrollador Full-Stack especializado en Java, Spring Boot y Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
