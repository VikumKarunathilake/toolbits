import type { Metadata } from "next";
import dynamic from "next/dynamic";
const MetaTagGeneratorClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Meta Tag Generator - SEO & Social Media Tags",
  description:
    "Generate SEO-optimized meta tags, Open Graph tags for Facebook, and Twitter Cards for your website instantly.",
};

export default function MetaTagGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Meta Tag Generator",
    url: "https://toolbits.vercel.app/meta-tag-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description: "Generate SEO and Social Media meta tags for your website.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList:
      "SEO Meta Tags, Open Graph Tags, Twitter Cards, Copy to Clipboard",
  };

  return (
    <>
      <Script
        id="json-ld-meta-tag"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MetaTagGeneratorClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Why are Meta Tags important?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Meta tags provide search engines with vital information about your
              website. The <strong>title</strong> and{" "}
              <strong>description</strong> tags determine how your site appears
              in search results, directly impacting your click-through rate
              (CTR).
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Social Media Optimization
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Open Graph (OG)</strong> tags and{" "}
              <strong>Twitter Cards</strong> control how your content looks when
              shared on platforms like Facebook, LinkedIn, Twitter, and Discord.
              Properly configured tags ensure your posts have engaging images,
              titles, and descriptions.
            </p>
          </section>
        </div>
      </MetaTagGeneratorClient>
    </>
  );
}
