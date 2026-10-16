import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

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
    <html lang="es" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Marca que hay JavaScript: solo entonces se ocultan las secciones antes de aparecer. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
