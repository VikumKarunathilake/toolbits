import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

const PomodoroTimerClient = dynamic(() => import("./client"));

export const metadata: Metadata = {
  title: "Pomodoro Timer - Boost Productivity",
  description:
    "A customizable Pomodoro timer with 25/5 minute work/break intervals and browser notifications to help you stay focused.",
  keywords: [
    "pomodoro timer",
    "pomodoro technique",
    "tomato timer",
    "work timer",
    "study timer",
    "focus timer",
    "productivity timer",
    "time management tool",
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
    url: "https://toolbits.vercel.app/pomodoro-timer",
    title: "Pomodoro Timer | Boost Focus & Productivity",
    description:
      "Stay focused with our customizable Pomodoro timer. Set work/break intervals perfect for study or work.",
    siteName: "Toolbits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro Timer",
    description: "Boost your productivity with the Pomodoro technique.",
    creator: "@toolbits",
  },
  alternates: {
    canonical: "https://toolbits.vercel.app/pomodoro-timer",
  },
};

export default function PomodoroTimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pomodoro Timer",
    url: "https://toolbits.vercel.app/pomodoro-timer",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Any",
    description:
      "A simple and effective Pomodoro timer with customizable intervals and notifications.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Work Timer, Break Timer, Notifications, Custom Settings",
  };

  return (
    <>
      <Script
        id="json-ld-pomodoro"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PomodoroTimerClient>
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              How to use the Pomodoro Timer?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Pomodoro Technique is a time management method developed by
              Francesco Cirillo in the late 1980s. It uses a timer to break down
              work into intervals, traditionally 25 minutes in length, separated
              by short breaks.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              The Process
            </h2>
            <ol className="list-decimal list-inside mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Choose a task:</strong> Pick something you want to get
                done.
              </li>
              <li>
                <strong>Set the timer:</strong> Start the 25-minute work timer.
              </li>
              <li>
                <strong>Work:</strong> Focus on the task until the timer rings.
              </li>
              <li>
                <strong>Take a short break:</strong> When the timer ends, take a
                5-minute break.
              </li>
              <li>
                <strong>Repeat:</strong> Every 4 "pomodoros" (work intervals),
                take a longer break (15-30 minutes).
              </li>
            </ol>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Benefits
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Manage distractions and control your time.</li>
              <li>Increase accountability.</li>
              <li>Improve weekly and quarterly planning.</li>
              <li>Decrease back pain and mental fatigue.</li>
              <li>Maintain motivation.</li>
            </ul>
          </section>
        </div>
      </PomodoroTimerClient>
    </>
  );
}
