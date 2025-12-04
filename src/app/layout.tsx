import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { ResourcePreloader, PerformanceMonitor } from "@/components/seo/Performance";
import { Analytics } from "@/components/analytics/Analytics";
import { FontLoader } from "@/components/FontLoader";
import { generateSEOMetadata, personStructuredData, websiteStructuredData } from "@/lib/seo";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ],
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Om Thakur - Full Stack Developer & Tech Content Creator",
  description: "Full Stack Developer and Tech Content Creator specializing in modern web development, photography, and technical writing. Explore my portfolio, blog, and creative work.",
  keywords: [
    "Full Stack Developer",
    "Web Developer", 
    "Software Engineer",
    "Tech Content Creator",
    "Photography",
    "Blog",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "DevOps",
    "Cloud Computing",
    "AWS"
  ]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData data={personStructuredData} />
        <StructuredData data={websiteStructuredData} />
        <link rel="canonical" href="https://omthakur.tech" />
        <link rel="alternate" type="application/rss+xml" title="Om Thakur Blog RSS Feed" href="/feed.xml" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="theme-color" content="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <FontLoader />
        <ResourcePreloader />
        <PerformanceMonitor />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
