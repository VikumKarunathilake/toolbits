import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
const UnixTimestampConverterClient = dynamic(() => import('./client'));
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Unix Timestamp Converter",
  description: "Convert between Unix Timestamps and Human Readable Dates. Supports seconds, milliseconds, and ISO formats.",
};

export default function UnixTimestampConverter() {
   const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Unix Timestamp Converter',
    url: 'https://toolbits.vercel.app/unix-timestamp-converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Convert Unix epochs to human readable dates instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: 'Bi-directional conversion, ISO 8601 support, Timezone handling',
  };

  return (
    <>
        <Script
            id="json-ld-unix"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <UnixTimestampConverterClient>
             <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
                <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-4">What is Unix Time?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                    <strong>Unix time</strong> (also known as Epoch time) is a system for describing a point in time. 
                    It is the number of seconds that have elapsed since the <strong>Unix Epoch</strong>, minus leap seconds. 
                    The Unix Epoch is 00:00:00 UTC on 1 January 1970.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Why is it useful?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                    Computers prefer simple integers over complex date strings. Unix timestamps make it easy to calculate time differences (just subtract one number from another) regardless of time zones.
                    </p>
                </section>
             </div>
        </UnixTimestampConverterClient>
    </>
  );
}
