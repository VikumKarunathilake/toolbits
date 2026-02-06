import type { Metadata } from "next";
import dynamic from "next/dynamic";
const Base64ConverterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder",
  description:
    "Convert text and files to Base64 (Data URI) format instantly. Decode Base64 strings securely without server-side processing.",
};

export default function Base64Converter() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Base64 Converter",
    url: "https://toolbits.vercel.app/base64-converter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description: "Encode/Decode Base64 strings and files instantly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Text encoding, File to Base64, URL-safe options",
  };

  return (
    <>
      <Script
        id="json-ld-base64"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Base64ConverterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What is Base64?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Base64</strong> is a group of binary-to-text encoding
              schemes that represent binary data in an ASCII string format. It
              is designed to carry data stored in binary formats across channels
              that only reliably support text content.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Common Use Cases
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Data URIs:</strong> Embedding small images or fonts
                directly into CSS or HTML files (e.g.,{" "}
                <code>data:image/png;base64,...</code>).
              </li>
              <li>
                <strong>Email Attachments:</strong> Sending binary files via
                SMTP.
              </li>
              <li>
                <strong>Basic Auth:</strong> Encoding username:password
                credentials in HTTP headers.
              </li>
            </ul>
          </section>
        </div>
      </Base64ConverterClient>
    </>
  );
}
