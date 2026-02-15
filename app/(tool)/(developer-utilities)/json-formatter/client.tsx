"use client";

import { useState } from "react";
import {
  LuCopy,
  LuTrash2,
  LuCheck,
  LuCircleAlert,
  LuFileJson,
  LuMinimize2,
  LuWand,
} from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const SyntaxHighlight = dynamic(
  () =>
    import("@/components/syntax-highlight").then((mod) => mod.SyntaxHighlight),
  {
    loading: () => <div className="h-full w-full bg-muted/10 animate-pulse" />,
  },
);

export default function JsonFormatterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
      toast.success("JSON formatted successfully");
    } catch (e: any) {
      setError(e.message);
      toast.error("Invalid JSON input");
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
      toast.success("JSON minified successfully");
    } catch (e: any) {
      setError(e.message);
      toast.error("Invalid JSON input");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    toast.info("Cleared all fields");
  };

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">JSON Toolify</h1>
            <p className="text-muted-foreground mt-1">
              Format, validate, and try to make sense of your messy JSON.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleFormat} className="gap-2">
              <LuWand className="w-4 h-4" /> Format
            </Button>
            <Button variant="outline" onClick={handleMinify} className="gap-2">
              <LuMinimize2 className="w-4 h-4" /> Minify
            </Button>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LuTrash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[clamp(500px,calc(100vh-200px),800px)]">
          {/* Input Pane */}
          <Card className="flex flex-col h-full border-muted-foreground/20 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 px-6 pt-6 shrink-0">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <LuFileJson className="w-4 h-4" /> Input
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative group overflow-hidden min-h-0">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="absolute inset-0 w-full h-full resize-none border-0 focus:ring-0 outline-none rounded-none p-6 font-mono text-sm bg-transparent placeholder:text-muted-foreground"
                spellCheck={false}
              />
            </CardContent>
            {error && (
              <div className="p-4 border-t bg-destructive/5 shrink-0">
                <Alert
                  variant="destructive"
                  className="border-0 bg-transparent p-0 [&>svg]:top-0 [&>svg]:text-destructive"
                >
                  <LuCircleAlert className="h-4 w-4" />
                  <AlertTitle className="ml-2">Syntax Error</AlertTitle>
                  <AlertDescription className="ml-2 font-mono text-xs mt-1">
                    {error}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </Card>

          {/* Output Pane */}
          <Card className="flex flex-col h-full border-muted-foreground/20 shadow-sm bg-muted/30 overflow-hidden">
            <CardHeader className="pb-3 px-6 pt-6 flex flex-row items-center justify-between space-y-0 shrink-0">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <LuCheck className="w-4 h-4" /> Output
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
                disabled={!output}
              >
                <LuCopy className="w-3.5 h-3.5" /> Copy
              </Button>
            </CardHeader>

            <Separator />

            <CardContent className="flex-1 p-0 overflow-hidden relative min-h-0">
              {output ? (
                <ScrollArea className="h-full w-full">
                  <div className="p-6">
                    <SyntaxHighlight code={output} />
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40">
                  <LuFileJson className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-sm font-medium">
                    Processed output will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
}
