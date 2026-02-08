import type { Metadata } from "next";
import dynamic from "next/dynamic";
const WordCounterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Word Counter & Character Count Tool",
  description:
    "Free online word counter and character counter with reading time estimation. Perfect for writers, students, and SEO professionals.",
  keywords: [
    "word counter",
    "character counter",
    "letter count",
    "word count tool",
    "sentence counter",
    "paragraph counter",
    "reading time calculator",
    "text analyzer",
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
    url: "https://toolbits.vercel.app/word-counter",
    title: "Word Counter & Character Counter",
    description:
      "Count words, characters, and estimate reading time instantly for free.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter",
    description: "Instant word and character counting for your text.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/word-counter",
  },
};

export default function WordCounterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Word Counter & Character Counter",
    url: "https://toolbits.vercel.app/word-counter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description:
      "Calculate words, characters, sentences, and reading time instantly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Word Count, Character Count, Reading Time, Sentence Count",
  };

  return (
    <>
      <Script
        id="json-ld-word-counter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WordCounterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Why count words and characters?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Tracking word and character counts is essential for staying within
              limits for social media posts, essays, and articles.
              <strong>Twitter</strong> limits tweets to 280 characters, while{" "}
              <strong>SEO meta descriptions</strong> work best between 150-160
              characters.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              How is reading time calculated?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We estimate reading time by dividing the total word count by an
              average reading speed of{" "}
              <strong>200 words per minute (WPM)</strong>. This metric helps you
              gauge how long it will take an average reader to consume your
              content.
            </p>
          </section>
        </div>
      </WordCounterClient>
    </>
  );
}
