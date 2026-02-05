import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const UrlEncoderClient = dynamic(() => import('./client'));
import Script from 'next/script';

export const metadata: Metadata = {
  title: "URL Encoder / Decoder",
  description: "Encode text to URL-safe format (percent-encoding) or decode URLs back to their original text.",
};

export default function UrlEncoderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'URL Encoder / Decoder',
    url: 'https://toolbits.vercel.app/url-encoder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Percent-encode or decode URLs instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: 'Percent-encoding, Decoding, Special character handling',
  };

  return (
    <>
       <Script
            id="json-ld-url"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <UrlEncoderClient>
             <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
                <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Why encode URLs?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                    URLs can only be sent over the Internet using the <strong>ASCII character-set</strong>. 
                    Since URLs often contain characters outside the ASCII set, the URL has to be converted into a valid ASCII format. 
                    URL encoding replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Common Encoded Characters</h2>
                     <ul className="list-disc list-inside mt-4 space-y-1 text-muted-foreground font-mono text-sm">
                        <li>Space &rarr; %20</li>
                        <li>! &rarr; %21</li>
                        <li># &rarr; %23</li>
                        <li>$ &rarr; %24</li>
                        <li>&amp; &rarr; %26</li>
                     </ul>
                </section>
             </div>
        </UrlEncoderClient>
    </>
  );
}
