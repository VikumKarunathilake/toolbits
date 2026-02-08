import type { Metadata } from "next";
import dynamic from "next/dynamic";
const JwtDecoderClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "JWT Decoder & Debugger",
  description:
    "Decode JSON Web Tokens (JWT) to view headers and payloads. fast, free, and secure client-side debugging tool.",
  keywords: [
    "jwt decoder",
    "jwt debugger",
    "json web token",
    "decode jwt",
    "jwt viewer",
    "jwt inspector",
    "jwt checker",
    "token decoder",
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
    url: "https://toolbits.vercel.app/jwt-decoder",
    title: "JWT Decoder & Debugger",
    description:
      "Decode and inspect JSON Web Tokens (JWT) securely in your browser. No server-side processing.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/jwt-decoder",
  },
};

export default function JwtDecoder() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JWT Decoder",
    url: "https://toolbits.vercel.app/jwt-decoder",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description: "Decode and debug JSON Web Tokens (JWT) instantly.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Header parsing, Payload inspection, Expiration checking",
  };

  return (
    <>
      <Script
        id="json-ld-jwt"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JwtDecoderClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What is a JWT?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>JSON Web Token (JWT)</strong> is an open standard (RFC
              7519) that defines a compact and self-contained way for securely
              transmitting information between parties as a JSON object. This
              information can be verified and trusted because it is digitally
              signed.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              JWT Structure
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A JWT consists of three parts separated by dots (<code>.</code>):
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Header:</strong> Typically consists of the type of token
                (JWT) and the signing algorithm (HMAC SHA256 or RSA).
              </li>
              <li>
                <strong>Payload:</strong> Contains the claims (user data,
                expiration, etc.). This is what we decode above.
              </li>
              <li>
                <strong>Signature:</strong> Used to verify the message wasn't
                changed along the way.
              </li>
            </ul>
          </section>

          <section className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold tracking-tight mb-2 text-yellow-600 dark:text-yellow-400">
              Security Note
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This tool decodes the token entirely in your browser. Your tokens
              are <strong>never</strong> sent to our servers. However, always be
              cautious when pasting sensitive tokens (like production API keys)
              into any online tool.
            </p>
          </section>
        </div>
      </JwtDecoderClient>
    </>
  );
}
