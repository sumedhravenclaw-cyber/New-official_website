import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RavenClaw — Digital Agency for Web, Design, Branding & AI",
  description:
    "RavenClaw is a digital agency crafting websites, UI/UX design, branding, digital marketing, and AI solutions that help businesses grow with wisdom, creativity, and purpose.",
  keywords: [
    "RavenClaw",
    "digital agency",
    "web development",
    "UI/UX design",
    "branding",
    "digital marketing",
    "AI solutions",
  ],
  authors: [{ name: "RavenClaw" }],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
