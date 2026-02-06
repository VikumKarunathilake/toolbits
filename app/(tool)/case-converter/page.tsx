import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CaseConverterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Case Converter - Uppercase, Lowercase, CamelCase & More",
  description:
    "Easily convert text between Upper Case, Lower Case, Title Case, Sentence Case, Camel Case, and more. Free online text transformation tool.",
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
