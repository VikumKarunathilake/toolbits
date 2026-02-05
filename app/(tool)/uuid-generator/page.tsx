import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const UuidGeneratorClient = dynamic(() => import('./client'));
import Script from 'next/script';

export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate random UUIDs (v4) online. Free bulk UUID generator tool for developers to create unique identifiers.",
};

export default function UuidGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UUID Generator',
    url: 'https://toolbits.vercel.app/uuid-generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Generate bulk random unique identifiers (UUID v4) instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: 'Bulk generation, Uppercase/Lowercase, Hyphen toggle',
  };

  return (
    <>
      <Script
        id="json-ld-uuid"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UuidGeneratorClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">What is a UUID?</h2>
            <p className="text-muted-foreground leading-relaxed">
              A <strong>Universally Unique Identifier (UUID)</strong> is a 128-bit label used for information in computer systems. 
              The term <strong>GUID (Globally Unique Identifier)</strong> is also used, typically in Microsoft software. 
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">How does this generator work?</h2>
            <p className="text-muted-foreground leading-relaxed">
              This tool generates <strong>Version 4 UUIDs</strong>, which are completely random. 
              It uses the browser's cryptographic API (<code>crypto.randomUUID()</code> or fallback) to ensure specific uniqueness and security suitable for most development needs.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li><strong>Version 1:</strong> Date-time and MAC address (not generated here)</li>
              <li><strong>Version 4:</strong> Random (generated here)</li>
              <li><strong>Version 5:</strong> SHA-1 hash of namespace and name</li>
            </ul>
          </section>

          <section className="mt-8">
             <h2 className="text-2xl font-bold tracking-tight mb-4">When to use UUIDs?</h2>
             <p className="text-muted-foreground leading-relaxed">
                UUIDs are perfect for database primary keys, session IDs, and transaction IDs where you need to generate identifiers without a central authority ensuring uniqueness. 
                They are particularly useful in distributed systems and microservices.
             </p>
          </section>
        </div>
      </UuidGeneratorClient>
    </>
  );
}
