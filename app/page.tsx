import Link from "next/link";
import { FileJson, Calculator, Binary } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      <main className="max-w-7xl mx-auto px-6 py-24">
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
        </div>
      </main>
    </div>
  );
}
