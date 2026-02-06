"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, AlertCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const SyntaxHighlight = dynamic(
  () =>
    import("@/components/syntax-highlight").then((mod) => mod.SyntaxHighlight),
  {
    loading: () => <div className="h-full w-full bg-muted/10 animate-pulse" />,
  },
);

export default function JwtDecoderClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<string | null>(null);
  const [payload, setPayload] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token.trim()) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error(
          "Invalid JWT format. Expected 3 parts separated by dots.",
        );
      }

      const decodePart = (part: string) => {
        try {
          // Fix base64url to base64
          const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
          // Decode
          const json = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join(""),
          );
          return JSON.stringify(JSON.parse(json), null, 2);
        } catch (e) {
          throw new Error("Failed to decode Base64 content.");
        }
      };

      setHeader(decodePart(parts[0]));
      setPayload(decodePart(parts[1]));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setHeader(null);
      setPayload(null);
    }
  }, [token]);

  const handleCopy = (text: string | null, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard`);
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">JWT Decoder</h1>
            <p className="text-muted-foreground mt-1">
              Decode and inspect JSON Web Tokens securely in your browser.
            </p>
          </div>
        </div>

        {/* Input Pane */}
        <Card className="border-muted-foreground/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Lock className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              JWT Token
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token here (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
              className="font-mono text-sm min-h-[120px] resize-y bg-background/50 backdrop-blur-sm"
            />
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Decoding Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Header */}
          <Card className="border-muted-foreground/20 shadow-sm flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                Header
                <Badge variant="outline" className="text-[10px] font-normal">
                  ALGORITHM & TOKEN TYPE
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCopy(header, "Header")}
                disabled={!header}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="bg-muted/30 rounded-lg border p-4 h-full min-h-[200px] overflow-auto">
                {header ? (
                  <SyntaxHighlight code={header} />
                ) : (
                  <div className="text-muted-foreground/40 text-sm flex items-center justify-center h-full">
                    Waiting for input...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payload */}
          <Card className="border-muted-foreground/20 shadow-sm flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                Payload
                <Badge variant="outline" className="text-[10px] font-normal">
                  DATA
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCopy(payload, "Payload")}
                disabled={!payload}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="bg-muted/30 rounded-lg border p-4 h-full min-h-[200px] overflow-auto">
                {payload ? (
                  <SyntaxHighlight code={payload} />
                ) : (
                  <div className="text-muted-foreground/40 text-sm flex items-center justify-center h-full">
                    Waiting for input...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {children}
      </div>
    </div>
  );
}
