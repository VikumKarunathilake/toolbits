import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const JsonFormatterClient = dynamic(() => import('./client'));
import Script from 'next/script';

export const metadata: Metadata = {
  title: "JSON Formatter & Validator",
  description: "Free online JSON Formatter to beautify, minify, and validate JSON data. Fix syntax errors and debug APIs instantly.",
};

export default function JsonFormatter() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JSON Formatter & Validator',
    url: 'https://toolbits.vercel.app/json-formatter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Format, minity, and validate JSON data instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: 'Syntax highlighting, Error detection, Minification',
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
                    <h2 className="text-2xl font-bold tracking-tight mb-4">What is JSON?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                    <strong>JSON (JavaScript Object Notation)</strong> is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Why use a JSON Formatter?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                    APIs and logs often output JSON as a single minified line to save space. This tool helps you:
                    </p>
                    <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                    <li><strong>Prettify:</strong> Indent and space the JSON so it is readable.</li>
                    <li><strong>Validate:</strong> Quickly find syntax errors like missing commas or quotes.</li>
                    <li><strong>Minify:</strong> Remove whitespace for use in production environments.</li>
                    </ul>
                </section>
             </div>
        </JsonFormatterClient>
      </>
  );
}
