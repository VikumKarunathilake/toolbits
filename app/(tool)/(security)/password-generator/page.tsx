import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PasswordGeneratorClient = dynamic(() => import("./client"));
import Script from "next/script";

export const metadata: Metadata = {
  title: "Strong Password Generator - Secure & Random",
  description:
    "Generate strong, secure, and random passwords instantly. Customize options for length, symbols, numbers, and uppercase letters.",
  keywords: [
    "password generator",
    "strong password",
    "random password",
    "secure password",
    "password maker",
    "password creator",
    "online password generator",
    "password strength",
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
    url: "https://toolbits.vercel.app/password-generator",
    title: "Strong Password Generator",
    description:
      "Create secure, random passwords instantly. Client-side generation for maximum security.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong Password Generator",
    description: "Generate secure, random passwords instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/password-generator",
  },
};

export default function PasswordGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Strong Password Generator",
    url: "https://toolbits.vercel.app/password-generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description:
      "Generate strong, secure, and random passwords with customizable rules.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList:
      "Custom Length, Uppercase, Lowercase, Numbers, Symbols, Strength Meter",
  };

  return (
    <>
      <Script
        id="json-ld-password"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PasswordGeneratorClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Why use a Strong Password Generator?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Using strong, unique passwords for every account is the most
              effective way to protect your online identity. Weak passwords like
              "123456" or "password" are easily cracked by hackers using
              brute-force attacks. A good password generator ensures high{" "}
              <strong>entropy</strong> (randomness), making it mathematically
              difficult for attackers to guess.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What makes a password strong?
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Length:</strong> The longer, the better. We recommend at
                least 12-16 characters.
              </li>
              <li>
                <strong>Complexity:</strong> Mix uppercase letters, lowercase
                letters, numbers, and symbols.
              </li>
              <li>
                <strong>Unpredictability:</strong> Avoid common words, phrases,
                or personal dates (like birthdays).
              </li>
              <li>
                <strong>Uniqueness:</strong> Never reuse the same password
                across multiple sites.
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Security Note
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This tool runs entirely in your browser (client-side). The
              passwords generated here are{" "}
              <strong>never sent to any server</strong> or stored remotely. They
              are generated locally on your device, ensuring maximum privacy and
              security.
            </p>
          </section>
        </div>
      </PasswordGeneratorClient>
    </>
  );
}
