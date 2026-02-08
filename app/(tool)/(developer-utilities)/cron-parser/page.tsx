import type { Metadata } from "next";
import dynamic from "next/dynamic";
const CronParserClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Cron Expression Parser & Schedule Generator",
  description:
    "Convert cron expressions into human-readable descriptions and view upcoming scheduled run times. Supports standard 5-field cron syntax.",
  keywords: [
    "cron parser",
    "cron expression generator",
    "cron schedule",
    "cron job tester",
    "cron next run",
    "cron syntax",
    "crontab help",
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
    url: "https://toolbits.vercel.app/cron-parser",
    title: "Cron Expression Parser & Schedule Generator",
    description:
      "Parse cron expressions into plain English and check upcoming run times.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cron Parser",
    description: "Parse cron expressions instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/cron-parser",
  },
};

export default function CronParserPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cron Expression Parser",
    url: "https://toolbits.vercel.app/cron-parser",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Convert cron expressions into human-readable descriptions and view upcoming scheduled run times.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Cron parsing, Human-readable description, Next run times, Schedule visualization",
  };

  return (
    <>
      <Script
        id="json-ld-cron-parser"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CronParserClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What is a Cron Expression?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A <strong>cron expression</strong> is a string comprising five or six fields separated by white space that represents a set of times, normally as a schedule to execute some routine. It is most commonly used in Unix-like operating systems for job scheduling.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Cron Syntax Format
            </h2>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre">
{`* * * * *
| | | | |
| | | | └── Day of Week (0-6) (Sunday=0 or 7)
| | | └──── Month (1-12)
| | └────── Day of Month (1-31)
| └──────── Hour (0-23)
└────────── Minute (0-59)`}
              </pre>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Common Examples
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Every minute:</strong> <code>* * * * *</code>
              </li>
              <li>
                <strong>Every day at midnight:</strong> <code>0 0 * * *</code>
              </li>
              <li>
                <strong>Every Monday at 3am:</strong> <code>0 3 * * 1</code>
              </li>
              <li>
                <strong>Every 15 minutes:</strong> <code>*/15 * * * *</code>
              </li>
              <li>
                <strong>At 8:00am on the 1st of every month:</strong> <code>0 8 1 * *</code>
              </li>
            </ul>
          </section>
        </div>
      </CronParserClient>
    </>
  );
}
