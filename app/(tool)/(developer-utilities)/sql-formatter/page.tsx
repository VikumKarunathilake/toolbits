import type { Metadata } from "next";
import dynamic from "next/dynamic";
const SqlFormatterClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "SQL Formatter & Beautifier",
  description:
    "Format and beautify standard SQL, PostgreSQL, MySQL, and other SQL dialects online. Improve code readability instantly.",
  keywords: [
    "sql formatter",
    "sql beautifier",
    "pretty print sql",
    "format sql online",
    "sql indent",
    "pl/sql formatter",
    "tsql formatter",
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
    url: "https://toolbits.vercel.app/sql-formatter",
    title: "SQL Formatter & Beautifier",
    description:
      "Format and beautify your SQL queries instantly.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Formatter",
    description: "Format and beautify your SQL queries instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/sql-formatter",
  },
};

export default function SqlFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SQL Formatter",
    url: "https://toolbits.vercel.app/sql-formatter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Format and beautify complex SQL queries for better readability.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "SQL Formatting, Syntax Highlighting, Dialect Support (MySQL, PostgreSQL, etc.)",
  };

  return (
    <>
      <Script
        id="json-ld-sql-formatter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SqlFormatterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Why Format SQL?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Structured Query Language (SQL) can become difficult to read as queries grow in complexity. Proper formatting with indentation and line breaks helps developers understand the structure of the query, spot errors, and maintain the code more easily.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Supported Formatting Features
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Indentation:</strong> Automatically indents clauses and nested queries.
              </li>
              <li>
                <strong>Keyword Case:</strong> Standardizes keywords to UPPERCASE or lowercase.
              </li>
              <li>
                <strong>Dialect Support:</strong> Handles specific syntax for various databases like PostgreSQL, MySQL, SQLite, standard SQL, and more.
              </li>
            </ul>
          </section>
        </div>
      </SqlFormatterClient>
    </>
  );
}
