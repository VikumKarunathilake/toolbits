import type { Metadata } from "next";
import dynamic from "next/dynamic";
const QrCodeGeneratorClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "QR Code Generator - Free Online QR Creator",
  description:
    "Create free, customizable QR codes for URLs, text, Wi-Fi, and more. Download high-quality PNG images instantly.",
  keywords: [
    "qr code generator",
    "free qr code",
    "make qr code",
    "qr code creator",
    "qr code maker",
    "url to qr",
    "wifi qr code",
    "text qr code",
    "custom qr code",
  ],
  authors: [{ name: "Toolbits", url: "https://toolbits.vercel.app" }],
  creator: "Toolbits",
  publisher: "Toolbits",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolbits.vercel.app/qr-code",
    title: "Free QR Code Generator",
    description:
      "Generate custom QR codes for links, text, and Wi-Fi. Fast, free, and no sign-up required.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator",
    description: "Create and download custom QR codes instantly for free.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/qr-code",
  },
};

export default function QrCodeGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QR Code Generator",
    url: "https://toolbits.vercel.app/qr-code-generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description: "Generate customizable QR codes instantly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "URL to QR, Text to QR, Custom Colors, Valid PNG Download",
  };

  return (
    <>
      <Script
        id="json-ld-qr-code"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QrCodeGeneratorClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What is a QR Code?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>QR Code</strong> (Quick Response Code) is a
              two-dimensional barcode capable of storing various types of data.
              Originally designed for the automotive industry in Japan, they are
              now widely used for sharing links, contact information, and Wi-Fi
              passwords.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              How to use this generator?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Simply enter your <strong>URL</strong> or <strong>text</strong> in
              the input field. The QR code will generate instantly in the
              preview area. You can customize the foreground and background
              colors to match your brand. Once satisfied, click{" "}
              <strong>Download</strong> to save the high-quality PNG image.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Best Practices
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground">
              <li>
                Ensure there is high contrast between the foreground and
                background colors (dark on light is best).
              </li>
              <li>
                Test your QR code with multiple scanning apps before printing.
              </li>
              <li>
                Avoid making the QR code too small or too complex if it needs to
                be scanned from a distance.
              </li>
            </ul>
          </section>
        </div>
      </QrCodeGeneratorClient>
    </>
  );
}
