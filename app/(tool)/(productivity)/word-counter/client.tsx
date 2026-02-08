"use client";

import { useState, useMemo } from "react";
import { LuCopy, LuTrash2, LuAlignLeft, LuClock3, LuType, LuHash } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function WordCounterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    // Word count: split by whitespace, filter out empty strings
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    // Sentence count: rough approximation by splitting by ., !, ?
    // Filter out empty strings result from trailing punctuation
    const sentences =
      text.trim() === ""
        ? 0
        : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

    // Paragraph count: split by double newlines or just newlines depending on preference
    // Here we count non-empty lines as potential paragraphs logic or just blocks separated by newlines
    const paragraphs =
      text.trim() === ""
        ? 0
        : text.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time: Avg 200 wpm
    const readingTimeMinutes = words / 200;
    const readingTimeSeconds = Math.ceil(readingTimeMinutes * 60);
    const readingTimeDisplay =
      readingTimeSeconds < 60
        ? `${readingTimeSeconds} sec`
        : `${Math.ceil(readingTimeMinutes)} min`;

    return {
      chars,
      words,
      sentences,
      paragraphs,
      readingTimeDisplay,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const handleClear = () => {
    setText("");
    toast.info("Cleared");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Word & Character Counter
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time analysis of your text for words, characters, and reading
              time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Clear Text"
            >
              <LuTrash2 className="w-4 h-4" />
            </Button>
            <Button onClick={handleCopy} className="gap-2">
              <LuCopy className="w-4 h-4" /> Copy Text
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Input Area */}
          <div className="lg:col-span-2 h-[calc(100vh-250px)] min-h-[500px]">
            <Card className="h-full border-muted-foreground/20 shadow-sm flex flex-col">
              <CardContent className="p-0 flex-1 relative">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here..."
                  className="w-full h-full resize-none border-0 focus-visible:ring-0 rounded-xl p-6 font-mono text-base bg-transparent leading-relaxed"
                  spellCheck={false}
                />
              </CardContent>
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            <Card className="border-muted-foreground/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuAlignLeft className="w-4 h-4" /> Counts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Words</span>
                  <span className="text-2xl font-bold font-mono">
                    {stats.words}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Characters (with spaces)
                  </span>
                  <span className="text-2xl font-bold font-mono">
                    {stats.chars}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Characters (no spaces)
                  </span>
                  <span className="text-lg font-mono text-muted-foreground">
                    {text.replace(/\s/g, "").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted-foreground/20 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuType className="w-4 h-4" /> Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Term Sentences</span>
                  <span className="font-mono font-medium">
                    {stats.sentences}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Paragraphs</span>
                  <span className="font-mono font-medium">
                    {stats.paragraphs}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-primary flex items-center gap-2">
                  <LuClock3 className="w-4 h-4" /> Reading Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {stats.readingTimeDisplay}
                  </span>
                  <span className="text-xs text-muted-foreground">approx</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on 200 words/min
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
