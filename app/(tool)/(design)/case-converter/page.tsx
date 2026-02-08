import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CaseConverterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Case Converter - Uppercase, Lowercase, CamelCase & More",
  description:
    "Easily convert text between Upper Case, Lower Case, Title Case, Sentence Case, Camel Case, and more. Free online text transformation tool.",
  keywords: [
    "case converter",
    "text converter",
    "uppercase",
    "lowercase",
    "title case",
    "camel case",
    "kebab case",
    "snake case",
    "sentence case",
    "text transformation",
    "online case changer",
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
    url: "https://toolbits.vercel.app/case-converter",
    title: "Case Converter | Free Online Text Tool",
    description:
      "Instantly convert text case: UPPERCASE, lowercase, CamelCase, and more. Simple and free.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Converter - Uppercase, Lowercase & More",
    description: "Easily convert text between different cases instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/case-converter",
  },
};

export default function CaseConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Case Converter",
    url: "https://toolbits.vercel.app/case-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description:
      "Convert text case instantly: UPPERCASE, lowercase, Title Case, camelCase, and more.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList:
      "Uppercase, Lowercase, Title Case, Sentence Case, CamelCase, Snake_Case, Kebab-Case",
  };

  return (
    <>
      <Script
        id="json-ld-case-converter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseConverterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Why use a Case Converter?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Manually changing the capitalization of text is tedious and prone
              to errors. Whether you need to scream in{" "}
              <strong>UPPERCASE</strong>, whisper in <strong>lowercase</strong>,
              or format code variables in <strong>camelCase</strong> or{" "}
              <strong>snake_case</strong>, this tool automates the process
              instantly.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Supported Formats
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground font-mono text-sm">
              <li>
                <strong>UPPERCASE:</strong> HELLO WORLD
              </li>
              <li>
                <strong>lowercase:</strong> hello world
              </li>
              <li>
                <strong>Sentence case:</strong> Hello world
              </li>
              <li>
                <strong>Title Case:</strong> Hello World
              </li>
              <li>
                <strong>camelCase:</strong> helloWorld
              </li>
              <li>
                <strong>PascalCase:</strong> HelloWorld
              </li>
              <li>
                <strong>snake_case:</strong> hello_world
              </li>
              <li>
                <strong>kebab-case:</strong> hello-world
              </li>
            </ul>
          </section>
        </div>
      </CaseConverterClient>
    </>
  );
}
