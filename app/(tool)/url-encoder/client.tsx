"use client";

import { useState } from "react";
import {
  Copy,
  Trash2,
  Check,
  Link2,
  ArrowRightLeft,
  FileText,
  ArrowDownUp,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UrlEncoderClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      if (!input.trim()) return;
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      toast.success("URL Encoded successfully");
    } catch (error) {
      toast.error("Failed to encode URL");
    }
  };

  const handleDecode = () => {
    try {
      if (!input.trim()) return;
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast.success("URL Decoded successfully");
    } catch (error) {
      toast.error("Failed to decode URL");
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
    toast.info("Cleared all fields");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              URL Encoder / Decoder
            </h1>
            <p className="text-muted-foreground mt-1">
              Encode text to URL-safe format or decode URLs back to text.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleEncode} className="gap-2">
              <Link2 className="w-4 h-4" /> Encode
            </Button>
            <Button variant="outline" onClick={handleDecode} className="gap-2">
              <ArrowDownUp className="w-4 h-4" /> Decode
            </Button>
            <Separator orientation="vertical" className="h-8 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
          {/* Input Pane */}
          <Card className="flex flex-col h-full border-muted-foreground/20 shadow-sm">
            <CardHeader className="pb-3 px-6 pt-6">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" /> Input
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative group">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste text or URL here (e.g. https://example.com/search?q=hello world)..."
                className="w-full h-full min-h-[400px] resize-none border-0 focus-visible:ring-0 rounded-none p-6 font-mono text-sm bg-transparent"
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Output Pane */}
          <Card className="flex flex-col h-full border-muted-foreground/20 shadow-sm bg-muted/30">
            <CardHeader className="pb-3 px-6 pt-6 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Check className="w-4 h-4" /> Output
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={handleCopy}
                disabled={!output}
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </Button>
            </CardHeader>

            <Separator />

            <CardContent className="flex-1 p-0 overflow-hidden relative">
              <Textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-full min-h-[400px] resize-none border-0 focus-visible:ring-0 rounded-none p-6 font-mono text-sm bg-transparent text-muted-foreground"
              />
            </CardContent>
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
}
