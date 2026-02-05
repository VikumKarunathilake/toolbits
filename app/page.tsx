import Link from "next/link";
import { FileJson, Calculator, Binary } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "ToolBits - Free Online Developer Tools"
  },
  description: "Free online developer tools to format JSON, decode JWT, convert timestamps, generate UUIDs, and more.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 space-y-4">
             <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent pb-2">
                ToolBits
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Essential developer utilities. No ads, no tracking, just tools.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* JSON Formatter Card */}
          <Link href="/json-formatter" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer group-hover:-translate-y-1">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileJson className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  JSON Formatter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                   Validate, format, and minify your JSON data with intelligent error reporting and syntax highlighting.
                </CardDescription>
                <div className="mt-6 flex items-center text-primary font-medium text-sm">
                  Try it now 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* JWT Decoder Card */}
          <Link href="/jwt-decoder" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer group-hover:-translate-y-1">
              <CardHeader>
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  JWT Decoder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                   Decode and inspect JSON Web Tokens (JWT) including header, payload, and signature data.
                </CardDescription>
                <div className="mt-6 flex items-center text-primary font-medium text-sm">
                  Try it now 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Timestamp Converter Card */}
          <Link href="/unix-timestamp-converter" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer group-hover:-translate-y-1">
              <CardHeader>
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  Unix Timestamp Converter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                   Convert Unix timestamps to human-readable dates and back. View relative times and ISO formats.
                </CardDescription>
                <div className="mt-6 flex items-center text-primary font-medium text-sm">
                  Try it now 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Base64 Converter Card */}
          <Link href="/base64-converter" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer group-hover:-translate-y-1">
              <CardHeader>
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3.75h9m-9 3.75h9m-9 3.75h9m12-19.5v21h-1.5V6H3v16.5H1.5V3h1.5v1.5h16.5" />
                  </svg>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  Base64 Converter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                   Encode and decode text or files to Base64 format. Generate Data URIs instantly from images and files.
                </CardDescription>
                <div className="mt-6 flex items-center text-primary font-medium text-sm">
                  Try it now 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* URL Encoder/Decoder Card */}
          <Link href="/url-encoder" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer group-hover:-translate-y-1">
              <CardHeader>
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  URL Encoder/Decoder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                   Safely encode special characters for URLs or decode encoded URLs back to their original text.
                </CardDescription>
                <div className="mt-6 flex items-center text-primary font-medium text-sm">
                  Try it now 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* UUID Generator Card */}
          <Link href="/uuid-generator" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer group-hover:-translate-y-1">
              <CardHeader>
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M7 20.25h10" />
                  </svg>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  UUID Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                   Generate random UUIDs (v4) in bulk with customizable options for hyphens and casing.
                </CardDescription>
                <div className="mt-6 flex items-center text-primary font-medium text-sm">
                  Try it now 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
