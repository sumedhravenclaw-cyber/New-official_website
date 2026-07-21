import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteBackground } from "@/components/site/site-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Garet is the body/display face. It used to be a plain @font-face in
// globals.css, which the browser could only discover after parsing the CSS — so
// in production it started downloading ~500ms in, landed ~1.3s in, and every
// line of text reflowed when it swapped, because Garet runs ~13% wider than the
// Geist that was painted in the meantime. (Locally the file comes off disk
// instantly, which is why the swap was invisible there.)
//
// Routing it through next/font/local fixes both halves of that: the woff2 is
// preloaded in <head> alongside Geist, and `adjustFontFallback` synthesises a
// metric-matched fallback (via size-adjust) so text occupies Garet's dimensions
// even in the instant before Garet itself arrives. Nothing resizes on swap.
const garet = localFont({
  src: [
    { path: "../../public/fonts/Garet-Book.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Garet-Heavy.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-garet",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["sans-serif"],
});

// Absolute base for OG/Twitter image URLs. Without this Next falls back to
// http://localhost:3000, which every social scraper then fails to fetch — so
// shared links render with no preview image at all.
//
// NEXT_PUBLIC_SITE_URL is the intended source; the Vercel-provided production
// URL is a safety net so a forgotten env var degrades to a working domain
// rather than to localhost. The localhost fallback only applies to local dev.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Digital Ravenclaw — Digital Agency for Web, Design, Branding & AI",
  description:
    "RavenClaw is a digital agency crafting websites, UI/UX design, branding, social media, performance marketing, and AI solutions that help businesses grow with wisdom, creativity, and purpose.",
  keywords: [
    "RavenClaw",
    "digital agency",
    "web development",
    "UI/UX design",
    "branding",
    "social media",
    "performance marketing",
    "AI solutions",
  ],
  authors: [{ name: "RavenClaw" }],
  // Browser-tab favicon (the same phoenix mark shown in the navbar). Served as
  // small pre-scaled PNGs rather than the 1.5MB source so the tab icon isn't a
  // full-resolution download. apple-touch-icon covers iOS home-screen bookmarks.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "RavenClaw — Digital Agency",
    description:
      "Websites, design, branding, marketing, and AI solutions crafted with wisdom and creativity.",
    siteName: "RavenClaw",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RavenClaw — Digital Agency",
    description:
      "Websites, design, branding, marketing, and AI solutions crafted with wisdom and creativity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline script runs before hydration to set the theme class from
  // localStorage, preventing both a flash of the wrong theme and the
  // server/client class mismatch that triggers a hydration warning.
  const themeScript = `(function(){try{var t=localStorage.getItem('ravenclaw-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.setAttribute('data-theme',t);r.style.colorScheme=t;}catch(e){}})();`;

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${garet.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Fixed layer: above the body's surface colour, beneath all content.
              The shell and its sections are transparent, so the dots drift
              behind every page. */}
          <SiteBackground />
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
