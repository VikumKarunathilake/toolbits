import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

const StopwatchClient = dynamic(() => import("./client"));

export const metadata: Metadata = {
  title: "Online Stopwatch & Lap Timer - Accurate & Simple",
  description:
    "A precise online stopwatch and lap timer. Track time splits, pause, resume, and record multiple laps for sports, cooking, or work.",
  keywords: [
    "online stopwatch",
    "stopwatch timer",
    "lap timer",
    "countdown timer",
    "chronometer",
    "split timer",
    "sports timer",
    "browser stopwatch",
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
    url: "https://toolbits.vercel.app/stopwatch",
    title: "Online Stopwatch & Lap Timer",
    description:
      "Simple, accurate, and free online stopwatch with lap recording.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Stopwatch",
    description: "Track time accurately with our free online stopwatch.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/stopwatch",
  },
};

export default function StopwatchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stopwatch & Lap Timer",
    url: "https://toolbits.vercel.app/stopwatch",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description:
      "A simple and accurate stopwatch with lap tracking functionality.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Count Up Timer, Lap Recording, Split Times, Millisecond Precision",
  };

  return (
    <>
      <Script
        id="json-ld-stopwatch"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StopwatchClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              About this Stopwatch
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This online stopwatch features accurate millisecond timing and easy
              lap recording. It's perfect for timing sports activities, cooking
              durations, study sessions, or any task where tracking elapsed time
              is important.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Precision Timing:</strong> Tracks time down to the
                millisecond.
              </li>
              <li>
                <strong>Lap Function:</strong> Record split times without stopping
                the main timer.
              </li>
              <li>
                <strong>Persistent display:</strong> Large, easy-to-read numbers.
              </li>
              <li>
                <strong>Browser-based:</strong> Works efficiently without
                downloads.
              </li>
            </ul>
          </section>
        </div>
      </StopwatchClient>
    </>
  );
}
