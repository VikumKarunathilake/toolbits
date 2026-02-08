import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

const KeyCodeClient = dynamic(() => import("./client"));

export const metadata: Metadata = {
  title: "JavaScript Key Code Event Tester",
  description:
    "Instantly find the JavaScript event key code, key value, code, and location for any key on your keyboard. Perfect for developers.",
  keywords: [
    "key code checker",
    "javascript key codes",
    "keyboard event viewer",
    "keycode tester",
    "event.key",
    "event.code",
    "event.which",
    "keyboard test",
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
    url: "https://toolbits.vercel.app/key-code",
    title: "JavaScript Key Code Tester",
    description:
      "Press any key to get the JavaScript event key code, code, and value info.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Key Code Tester",
    description: "Find JavaScript key codes and event data instantly.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/key-code",
  },
};

export default function KeyCodePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Key Code Tester",
    url: "https://toolbits.vercel.app/key-code",
    applicationCategory: "DeveloperTool",
    operatingSystem: "Any",
    description:
      "A developer tool to inspect keyboard events and get JavaScript key codes.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Key Code, Key Value, Event.which, Event.code, Modifier Keys",
  };

  return (
    <>
      <Script
        id="json-ld-keycode"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KeyCodeClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              What are JavaScript Key Codes?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you press a key in a web browser, a <code>KeyboardEvent</code>{" "}
              is fired. This event contains several properties describing which
              key was pressed.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>event.key:</strong> The printed representation of the
                key (e.g., "a", "Enter").
              </li>
              <li>
                <strong>event.code:</strong> The physical key on the keyboard
                (e.g., "KeyA", "Enter"). This ignores layout (QWERTY vs AZERTY).
              </li>
              <li>
                <strong>event.which / event.keyCode:</strong> The deprecated numeric
                code (e.g., 65 for "a", 13 for "Enter"). Still widely used in legacy
                code.
              </li>
            </ul>
          </section>
        </div>
      </KeyCodeClient>
    </>
  );
}
