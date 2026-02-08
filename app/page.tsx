import Link from "next/link";
import {
  LuFileJson,
  LuTimer,
  LuClock,
  LuKeyboard,
  LuRegex,
  LuCalendarClock,
  LuDatabase,
  LuFileCode,
  LuLock,
  LuHistory,
  LuFileDigit,
  LuLink,
  LuFingerprint,
  LuTags,
  LuAlignLeft,
  LuPalette,
  LuQrCode,
  LuCaseUpper,
  LuArrowRight,

} from "react-icons/lu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "ToolBits - Free Online Tools",
  },
  description: "Free online tools",
};

type Tool = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type Category = {
  title: string;
  items: Tool[];
};

const iconClasses = "w-7 h-7 text-primary";

const categories: Category[] = [
  {
    title: "Developer Tools",
    items: [
      {
        title: "JSON Formatter",
        description: "Validate, format, and minify your JSON data with intelligent error reporting and syntax highlighting.",
        href: "/json-formatter",
        icon: <LuFileJson className={iconClasses} />,
      },
      {
        title: "JWT Decoder",
        description: "Decode and inspect JSON Web Tokens (JWT) including header, payload, and signature data.",
        href: "/jwt-decoder",
        icon: <LuLock className={iconClasses} />,
      },
      {
        title: "Unix Timestamp Converter",
        description: "Convert Unix timestamps to human-readable dates and back. View relative times and ISO formats.",
        href: "/unix-timestamp-converter",
        icon: <LuHistory className={iconClasses} />,
      },
      {
        title: "Base64 Converter",
        description: "Encode and decode text or files to Base64 format. Generate Data URIs instantly from images and files.",
        href: "/base64-converter",
        icon: <LuFileDigit className={iconClasses} />,
      },
      {
        title: "URL Encoder/Decoder",
        description: "Safely encode special characters for URLs or decode encoded URLs back to their original text.",
        href: "/url-encoder",
        icon: <LuLink className={iconClasses} />,
      },
      {
        title: "UUID Generator",
        description: "Generate random UUIDs (v4) in bulk with customizable options for hyphens and casing.",
        href: "/uuid-generator",
        icon: <LuFingerprint className={iconClasses} />,
      },
      {
        title: "Meta Tag Generator",
        description: "Create SEO-optimized meta tags and social media cards (Open Graph, Twitter) for better visibility.",
        href: "/meta-tag-generator",
        icon: <LuTags className={iconClasses} />,
      },
      {
        title: "Key Code Tester",
        description: "Press any key to identify its JavaScript event key code, physical code, and location.",
        href: "/key-code",
        icon: <LuKeyboard className={iconClasses} />,
      },
      {
        title: "Regex Tester",
        description: "Test and debug regular expressions with real-time highlighting and explanation.",
        href: "/regex-tester",
        icon: <LuRegex className={iconClasses} />,
      },
      {
        title: "Cron Parser",
        description: "Convert cron expressions into human-readable descriptions and view upcoming scheduled run times.",
        href: "/cron-parser",
        icon: <LuCalendarClock className={iconClasses} />,
      },
      {
        title: "SQL Formatter",
        description: "Beautify and format complex SQL queries with support for various dialects like PostgreSQL, MySQL, and generic SQL.",
        href: "/sql-formatter",
        icon: <LuDatabase className={iconClasses} />,
      },
      {
        title: "XML Formatter",
        description: "Format, indent, and prettify XML data online. Improve readability of XML files and strings instantly.",
        href: "/xml-formatter",
        icon: <LuFileCode className={iconClasses} />,
      },
    ],
  },
  {
    title: "Productivity & Security",
    items: [
      {
        title: "Pomodoro Timer",
        description: "Boost productivity with a customizable 25/5 minute work/break timer and browser notifications.",
        href: "/pomodoro-timer",
        icon: <LuTimer className={iconClasses} />,
      },
      {
        title: "Stopwatch",
        description: "Accurate millisecond stopwatch with split times and lap tracking for sports or productivity.",
        href: "/stopwatch",
        icon: <LuClock className={iconClasses} />,
      },
      {
        title: "Password Generator",
        description: "Create secure, random passwords instantly with customizable complexity rules to stay safe online.",
        href: "/password-generator",
        icon: <LuLock className={iconClasses} />,
      },
      {
        title: "Word Counter",
        description: "Real-time word, character, sentence, and paragraph counting with reading time estimation.",
        href: "/word-counter",
        icon: <LuAlignLeft className={iconClasses} />,
      },
    ],
  },
  {
    title: "Design & Multimedia",
    items: [
      {
        title: "Color Converter",
        description: "Convert color formats (HEX, RGB, HSL, CMYK) and check accessibility contrast ratios.",
        href: "/color-converter",
        icon: <LuPalette className={iconClasses} />,
      },
      {
        title: "QR Code Generator",
        description: "Turn text or links into downloadable QR codes with custom colors and high-quality PNG export.",
        href: "/qr-code",
        icon: <LuQrCode className={iconClasses} />,
      },
      {
        title: "Case Converter",
        description: "Convert text case instantly: Uppercase, Lowercase, Title Case, camelCase, snake_case, and more.",
        href: "/case-converter",
        icon: <LuCaseUpper className={iconClasses} />,
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent pb-2">
            ToolBits
          </h1>
        </div>

        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category.title}>
              <h2 className="text-2xl font-semibold mb-6 text-foreground/90 pl-1 border-l-4 border-primary/50">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((tool) => (
                  <Link href={tool.href} key={tool.href} className="group">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer group-hover:-translate-y-1">
                      <CardHeader>
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          {tool.icon}
                        </div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {tool.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {tool.description}
                        </CardDescription>
                        <div className="mt-6 flex items-center text-primary font-medium text-sm">
                          Try it now
                          <LuArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
 