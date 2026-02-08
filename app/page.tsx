import Link from "next/link";
import { FileJson, Timer, Clock, Keyboard } from "lucide-react";
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
        icon: <FileJson className={iconClasses} />,
      },
      {
        title: "JWT Decoder",
        description: "Decode and inspect JSON Web Tokens (JWT) including header, payload, and signature data.",
        href: "/jwt-decoder",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        ),
      },
      {
        title: "Unix Timestamp Converter",
        description: "Convert Unix timestamps to human-readable dates and back. View relative times and ISO formats.",
        href: "/unix-timestamp-converter",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      {
        title: "Base64 Converter",
        description: "Encode and decode text or files to Base64 format. Generate Data URIs instantly from images and files.",
        href: "/base64-converter",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3.75h9m-9 3.75h9m-9 3.75h9m12-19.5v21h-1.5V6H3v16.5H1.5V3h1.5v1.5h16.5"
            />
          </svg>
        ),
      },
      {
        title: "URL Encoder/Decoder",
        description: "Safely encode special characters for URLs or decode encoded URLs back to their original text.",
        href: "/url-encoder",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        ),
      },
      {
        title: "UUID Generator",
        description: "Generate random UUIDs (v4) in bulk with customizable options for hyphens and casing.",
        href: "/uuid-generator",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M7 20.25h10"
            />
          </svg>
        ),
      },
      {
        title: "Meta Tag Generator",
        description: "Create SEO-optimized meta tags and social media cards (Open Graph, Twitter) for better visibility.",
        href: "/meta-tag-generator",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6z"
            />
          </svg>
        ),
      },
      {
        title: "Key Code Tester",
        description: "Press any key to identify its JavaScript event key code, physical code, and location.",
        href: "/key-code",
        icon: <Keyboard className={iconClasses} />,
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
        icon: <Timer className={iconClasses} />,
      },
      {
        title: "Stopwatch",
        description: "Accurate millisecond stopwatch with split times and lap tracking for sports or productivity.",
        href: "/stopwatch",
        icon: <Clock className={iconClasses} />,
      },
      {
        title: "Password Generator",
        description: "Create secure, random passwords instantly with customizable complexity rules to stay safe online.",
        href: "/password-generator",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        ),
      },
      {
        title: "Word Counter",
        description: "Real-time word, character, sentence, and paragraph counting with reading time estimation.",
        href: "/word-counter",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        ),
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
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
            />
          </svg>
        ),
      },
      {
        title: "QR Code Generator",
        description: "Turn text or links into downloadable QR codes with custom colors and high-quality PNG export.",
        href: "/qr-code",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75zM16.5 19.5h.75v.75h-.75v-.75z"
            />
          </svg>
        ),
      },
      {
        title: "Case Converter",
        description: "Convert text case instantly: Uppercase, Lowercase, Title Case, camelCase, snake_case, and more.",
        href: "/case-converter",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
        ),
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
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
 