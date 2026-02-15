import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toolbits.vercel.app"),
  title: {
    default: "ToolBits - Tools Collection",
    template: "%s | ToolBits",
  },
  description: "A collection of essential tools",
  keywords: [
    "developer tools",
    "online json formatter",
    "base64 encoder decoder",
    "jwt debugger",
    "uuid generator v4",
    "unix timestamp converter",
    "url encode decode",
    "web development utilities",
    "privacy-first tools",
  ],
  authors: [{ name: "ToolBits Team" }],
  creator: "ToolBits",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolbits.vercel.app",
    title: "ToolBits - Tools Collection",
    description: "A collection of essential tools",
    siteName: "ToolBits",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolBits - Tools Collection",
    description: "Essential tools for your daily workflow.",
    creator: "@toolbits",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-id",
    yandex: "yandex-verification-id",
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}>
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-MP6V4HLLGW"
        />
        <Script id="google-analytics-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MP6V4HLLGW');
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
