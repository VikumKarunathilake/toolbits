import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

const ColorConverterClient = dynamic(() => import("./client"));

export const metadata: Metadata = {
  title: "Color Converter - HEX, RGB, HSL, CMYK",
  description:
    "Convert colors instantly between HEX, RGB, HSL, and CMYK formats. Includes color names, contrast checking, and accessibility tools.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hsl converter",
    "cmyk converter",
    "color picker",
    "web colors",
    "color contrast checker",
    "accessibility tools",
    "css color codes",
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
    url: "https://toolbits.vercel.app/color-converter",
    title: "Color Converter | HEX, RGB, HSL, CMYK",
    description:
      "Free online color converter. Transform HEX, RGB, HSL, and CMYK codes instantly.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Converter - All Formats",
    description: "Convert and analyze colors in HEX, RGB, HSL, and CMYK formats.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/color-converter",
  },
};

export default function ColorConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Converter",
    url: "https://toolbits.vercel.app/color-converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description: "Convert colors between HEX, RGB, HSL, and CMYK formats.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "HEX to RGB, RGB to HSL, CMYK Conversion, Accessibility Check",
  };

  return (
    <>
      <Script
        id="json-ld-color-converter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorConverterClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              About Color Formats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  HEX (Hexadecimal)
                </h3>
                <p className="text-muted-foreground">
                  A 6-digit code used in HTML, CSS, and SVG. It represents red,
                  green, and blue components (e.g., #FFFFFF for white).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  RGB (Red, Green, Blue)
                </h3>
                <p className="text-muted-foreground">
                  An additive color model used for digital screens. Each value
                  ranges from 0 to 255.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  HSL (Hue, Saturation, Lightness)
                </h3>
                <p className="text-muted-foreground">
                  More intuitive for humans. Hue is the color angle (0-360°),
                  while saturation and lightness are percentages.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  CMYK (Cyan, Magenta, Yellow, Key)
                </h3>
                <p className="text-muted-foreground">
                  A subtractive color model used in printing. Key refers to
                  black.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Accessibility
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When designing for the web, it's crucial to ensure sufficient
              contrast between text and background colors. This tool
              automatically checks contrast ratios against WCAG 2.0 standards
              (AA and AAA) to help you build accessible designs.
            </p>
          </section>
        </div>
      </ColorConverterClient>
    </>
  );
}
