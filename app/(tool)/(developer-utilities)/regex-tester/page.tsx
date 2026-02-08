import type { Metadata } from "next";
import dynamic from "next/dynamic";
const RegexTesterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Regex Tester & Debugger",
  description:
    "Test and debug regular expressions (regex) online with real-time highlighting and explanation. Support for JavaScript regex flavor.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex debugger",
    "regex online",
    "javascript regex",
    "regex cheat sheet",
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
    url: "https://toolbits.vercel.app/regex-tester",
    title: "Regex Tester & Debugger",
    description:
      "Test and debug regular expressions with real-time highlighting.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Tester",
    description: "Test and debug regular expressions online.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/regex-tester",
  },
};

export default function RegexTesterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Regex Tester & Debugger",
    url: "https://toolbits.vercel.app/regex-tester",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Test and debug regular expressions (regex) online with real-time highlighting and explanation.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Real-time regex testing, Syntax highlighting, Match explanation, Cheat sheet",
  };

  return (
    <>
      <Script
        id="json-ld-regex-tester"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegexTesterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What is Regular Expression (Regex)?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A <strong>regular expression</strong> (shortened as regex or
              regexp) is a sequence of characters that specifies a search
              pattern in text. Usually such patterns are used by string-searching
              algorithms for "find" or "find and replace" operations on
              strings, or for input validation.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Common Regex Patterns
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Email:</strong> <code>^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}$</code>
              </li>
              <li>
                <strong>Phone Number:</strong> <code>^\d{3}-\d{3}-\d{4}$</code>
              </li>
              <li>
                <strong>URL:</strong> <code>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{"{1,256}"}\.[a-zA-Z0-9()]{"{1,6}"}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)</code>
              </li>
              <li>
                <strong>Date (YYYY-MM-DD):</strong> <code>^\d{4}-\d{2}-\d{2}$</code>
              </li>
            </ul>
          </section>
        </div>
      </RegexTesterClient>
    </>
  );
}
