import type { Metadata } from "next";
import dynamic from "next/dynamic";
const JsonFormatterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description:
    "Beautify, validate, and minify your JSON data instantly. Ideally suited for developers debugging APIs and logs.",
  keywords: [
    "json formatter",
    "json prettify",
    "json validator",
    "json minifier",
    "json editor",
    "online json tool",
    "developer tools",
    "debug json",
    "format json",
    "json syntax check",
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
    url: "https://toolbits.vercel.app/json-formatter",
    title: "JSON Formatter & Validator | Free Online Tool",
    description:
      "Beautify, validate, and minify your JSON data instantly. The best free online JSON tool for developers.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator",
    description: "Beautify, validate, and minify your JSON data instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/json-formatter",
  },
};

export default function JsonFormatter() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Formatter & Validator",
    url: "https://toolbits.vercel.app/json-formatter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description: "Format, minity, and validate JSON data instantly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Syntax highlighting, Error detection, Minification",
  };

  return (
    <>
      <Script
        id="json-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonFormatterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What is JSON?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>JSON (JavaScript Object Notation)</strong> is a
              lightweight data-interchange format. It is easy for humans to read
              and write and easy for machines to parse and generate.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Why use a JSON Formatter?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              APIs and logs often output JSON as a single minified line to save
              space. This tool helps you:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Prettify:</strong> Indent and space the JSON so it is
                readable.
              </li>
              <li>
                <strong>Validate:</strong> Quickly find syntax errors like
                missing commas or quotes.
              </li>
              <li>
                <strong>Minify:</strong> Remove whitespace for use in production
                environments.
              </li>
            </ul>
          </section>
        </div>
      </JsonFormatterClient>
    </>
  );
}
