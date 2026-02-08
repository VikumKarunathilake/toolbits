import type { Metadata } from "next";
import dynamic from "next/dynamic";
const XmlFormatterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "XML Formatter & Beautifier",
  description:
    "Format, indent, and prettify XML data online. Improve readability of XML files and strings instantly.",
  keywords: [
    "xml formatter",
    "xml beautifier",
    "pretty print xml",
    "format xml online",
    "xml indentation",
    "xml parser",
    "xml validator",
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
    url: "https://toolbits.vercel.app/xml-formatter",
    title: "XML Formatter & Beautifier",
    description:
      "Format and beautify your XML data instantly.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "XML Formatter",
    description: "Format and beautify your XML data instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/xml-formatter",
  },
};

export default function XmlFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "XML Formatter",
    url: "https://toolbits.vercel.app/xml-formatter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Format and beautify XML strings for better readability.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "XML Formatting, Syntax Highlighting, Indentation Control, Minification",
  };

  return (
    <>
      <Script
        id="json-ld-xml-formatter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <XmlFormatterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What is XML Formatting?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Extensible Markup Language (XML) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable. However, raw XML is often minified or poorly formatted, making it hard to read. An XML formatter adds proper indentation and line breaks to make the structure clear.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Features
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Pretty Print:</strong> Adds indentation and newlines to make XML readable.
              </li>
              <li>
                <strong>Minify:</strong> Use the "Collapse Content" option or set indentation to 0 to remove extra whitespace (coming soon).
              </li>
              <li>
                <strong>Custom Indentation:</strong> Choose between 2 spaces, 4 spaces, or tabs.
              </li>
            </ul>
          </section>
        </div>
      </XmlFormatterClient>
    </>
  );
}
