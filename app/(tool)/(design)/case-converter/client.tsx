"use client";

import { useState } from "react";
import {
  LuCopy,
  LuTrash2,
  LuArrowRightLeft,
  LuCaseUpper,
  LuCaseLower,
  LuType,
} from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CaseConverterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Result copied to clipboard");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    toast.info("Cleared all fields");
  };

  // --- Transformation Logic ---

  const toWords = (text: string) => {
    // Split by non-alphanumeric chars, or by transition from lower to upper (camelCase)
    // This regex looks for:
    // 1. Sequences of uppercase followed by lowercase (e.g., "Hello" in "HelloWorld")
    // 2. Sequences of uppercase (e.g., "XML" in "XMLHttp")
    // 3. Normal words
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2") // split camelCase
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // split abbreviations
      .replace(/[^a-zA-Z0-9]+/g, " ") // replace non-alphanumeric with space
      .trim()
      .split(/\s+/);
  };

  const convertUpper = () => setOutput(input.toUpperCase());

  const convertLower = () => setOutput(input.toLowerCase());

  const convertSentence = () => {
    // Simple sentence case: Lowercase everything, then capitalize first letter of sentences
    const res = input
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setOutput(res);
  };

  const convertTitle = () => {
    // Capitalize first letter of every word, keep punctuation
    // We assume "words" are separated by whitespace
    const res = input.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    setOutput(res);
  };

  const convertCamel = () => {
    const words = toWords(input);
    if (words.length === 0) return setOutput("");
    const res = words
      .map((w, i) =>
        i === 0
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
      )
      .join("");
    setOutput(res);
  };

  const convertPascal = () => {
    const words = toWords(input);
    const res = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");
    setOutput(res);
  };

  const convertSnake = () => {
    const words = toWords(input);
    setOutput(words.join("_").toLowerCase());
  };

  const convertKebab = () => {
    const words = toWords(input);
    setOutput(words.join("-").toLowerCase());
  };

  const convertAlternating = () => {
    const chars = input.split("");
    const res = chars
      .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
      .join("");
    setOutput(res);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Case Converter
            </h1>
            <p className="text-muted-foreground mt-1">
              Easily switch between Uppercase, lowercase, CamelCase, and more.
            </p>
          </div>

          <div className="flex items-center gap-2">
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

        <div className="grid grid-cols-1 gap-6">
          {/* Main Interface */}
          <Card className="border-muted-foreground/20 shadow-sm overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b bg-muted/20">
              <Tabs defaultValue="text" className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <TabsList>
                    <TabsTrigger value="text">Text Modes</TabsTrigger>
                    <TabsTrigger value="code">Code Modes</TabsTrigger>
                    <TabsTrigger value="fun">Others</TabsTrigger>
                  </TabsList>
                </div>

                <div className="mt-4">
                  <TabsContent
                    value="text"
                    className="mt-0 flex flex-wrap gap-2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={convertUpper}
                      className="font-bold"
                    >
                      UPPERCASE
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={convertLower}
                      className="lowercase"
                    >
                      lowercase
                    </Button>
                    <Button variant="outline" size="sm" onClick={convertTitle}>
                      Title Case
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={convertSentence}
                    >
                      Sentence case
                    </Button>
                  </TabsContent>

                  <TabsContent
                    value="code"
                    className="mt-0 flex flex-wrap gap-2"
                  >
                    <Button variant="outline" size="sm" onClick={convertCamel}>
                      camelCase
                    </Button>
                    <Button variant="outline" size="sm" onClick={convertPascal}>
                      PascalCase
                    </Button>
                    <Button variant="outline" size="sm" onClick={convertSnake}>
                      snake_case
                    </Button>
                    <Button variant="outline" size="sm" onClick={convertKebab}>
                      kebab-case
                    </Button>
                  </TabsContent>

                  <TabsContent
                    value="fun"
                    className="mt-0 flex flex-wrap gap-2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={convertAlternating}
                    >
                      aLtErNaTiNg
                    </Button>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 h-[600px] divide-y md:divide-y-0 md:divide-x">
              {/* Input */}
              <div className="flex flex-col h-full">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/10 border-b flex justify-between items-center">
                  Input
                </div>
                <Textarea
                  value={input}
                  onChange={handleInput}
                  placeholder="Type or paste your content here..."
                  className="flex-1 w-full resize-none border-0 focus-visible:ring-0 rounded-none p-6 font-mono text-sm bg-transparent leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Output */}
              <div className="flex flex-col h-full bg-muted/5">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/10 border-b flex justify-between items-center">
                  <span>Result</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 gap-1.5 text-xs hover:bg-background"
                    onClick={handleCopy}
                    disabled={!output}
                  >
                    <LuCopy className="w-3 h-3" /> Copy
                  </Button>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Converted text will appear here..."
                  className="flex-1 w-full resize-none border-0 focus-visible:ring-0 rounded-none p-6 font-mono text-sm bg-transparent leading-relaxed text-muted-foreground"
                />
              </div>
            </div>
          </Card>
        </div>

        {children}
      </div>
    </div>
  );
}
