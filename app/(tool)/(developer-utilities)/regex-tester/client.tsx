"use client";

import { useState, useMemo, useEffect } from "react";
import { LuCopy, LuTrash2, LuCircleAlert, LuRegex, LuZap, LuList } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Match {
  index: number;
  text: string;
  groups: string[];
}

export default function RegexTesterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false,
  });
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Parse flags object to string
  const flagsString = useMemo(() => {
    return Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key)
      .join("");
  }, [flags]);

  const { matches, highlightedText, executionTime } = useMemo(() => {
    if (!pattern) return { matches: [], highlightedText: null, executionTime: 0 };

    const startTime = performance.now();
    try {
      setError(null);
      const regex = new RegExp(pattern, flagsString);
      const outputMatches: Match[] = [];
      
      // If global flag is not set, we only get the first match
      if (!flags.g) {
        const match = regex.exec(text);
        if (match) {
          outputMatches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1),
          });
        }
      } else {
        // Global search
        let match;
        // Prevent infinite loops with zero-width matches
        let lastIndex = 0;
        
        // We use a clone to avoid side effects if we re-use the same regex object (though here we recreate it)
        // Actually, with 'g', exec maintains state.
        
        while ((match = regex.exec(text)) !== null) {
          outputMatches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1),
          });

          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          if (regex.lastIndex > text.length && match.index === regex.lastIndex - 1) break; // Safety break
        }
      }
      
      const endTime = performance.now();
      
      // Generate highlighted text
      // We need to handle overlapping or adjacent matches carefully, but JS regex matches are sequential.
      
      let lastCursor = 0;
      const nodes: React.ReactNode[] = [];
      
      outputMatches.forEach((m, i) => {
        // Text before match
        if (m.index > lastCursor) {
          nodes.push(text.slice(lastCursor, m.index));
        }
        
        // Match itself
        nodes.push(
          <span
            key={i}
            className={`bg-yellow-200 dark:bg-yellow-900/50 text-foreground rounded-sm font-medium border-b-2 border-yellow-500 dark:border-yellow-600`}
            title={`Match ${i + 1}: ${m.text}`}
          >
            {m.text}
          </span>
        );
        
        lastCursor = m.index + m.text.length;
      });
      
      // Remaining text
      if (lastCursor < text.length) {
        nodes.push(text.slice(lastCursor));
      }

      return { matches: outputMatches, highlightedText: nodes, executionTime: endTime - startTime };

    } catch (err: any) {
      setError(err.message);
      return { matches: [], highlightedText: null, executionTime: 0 };
    }
  }, [pattern, flagsString, flags.g, text]);

  const handleCopyPattern = () => {
    if (!pattern) return;
    navigator.clipboard.writeText(`/${pattern}/${flagsString}`);
    toast.success("Regex pattern copied to clipboard");
  };

  const handleClear = () => {
    setText("");
    setPattern("");
    toast.info("Cleared all inputs");
  };

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Regex Tester</h1>
            <p className="text-muted-foreground mt-1">
              Test regular expressions against strings with real-time feedback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Clear All"
            >
              <LuTrash2 className="w-4 h-4" />
            </Button>
            <Button onClick={handleCopyPattern} className="gap-2">
              <LuCopy className="w-4 h-4" /> Copy Pattern
            </Button>
          </div>
        </div>

        {/* Inputs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Regex Input Card */}
            <Card className="border-muted-foreground/20 shadow-sm overflow-visible">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuRegex className="w-4 h-4" /> Regular Expression
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono text-lg select-none">/</span>
                    <Input
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="Enter regex pattern..."
                      className={`font-mono text-lg h-12 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    <span className="text-muted-foreground font-mono text-lg select-none">/</span>
                    <Input
                      value={flagsString}
                      readOnly
                      placeholder="g"
                      className="w-16 font-mono text-lg h-12 bg-muted text-center pointer-events-none"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="py-2">
                    <LuCircleAlert className="h-4 w-4" />
                    <AlertTitle>Invalid Regex</AlertTitle>
                    <AlertDescription className="text-xs font-mono">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Flags Selection */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flag-g" checked={flags.g} onCheckedChange={(c) => setFlags(p => ({...p, g: !!c}))} />
                    <Label htmlFor="flag-g" className="font-mono text-xs cursor-pointer">global (g)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flag-i" checked={flags.i} onCheckedChange={(c) => setFlags(p => ({...p, i: !!c}))} />
                    <Label htmlFor="flag-i" className="font-mono text-xs cursor-pointer">case insensitive (i)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flag-m" checked={flags.m} onCheckedChange={(c) => setFlags(p => ({...p, m: !!c}))} />
                    <Label htmlFor="flag-m" className="font-mono text-xs cursor-pointer">multiline (m)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flag-s" checked={flags.s} onCheckedChange={(c) => setFlags(p => ({...p, s: !!c}))} />
                    <Label htmlFor="flag-s" className="font-mono text-xs cursor-pointer">single line (s)</Label>
                  </div>
                   <div className="flex items-center space-x-2">
                    <Checkbox id="flag-u" checked={flags.u} onCheckedChange={(c) => setFlags(p => ({...p, u: !!c}))} />
                    <Label htmlFor="flag-u" className="font-mono text-xs cursor-pointer">unicode (u)</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test String Input */}
            <Card className="border-muted-foreground/20 shadow-sm h-[400px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Test String
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0 relative overflow-hidden min-h-0">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your test string here..."
                  className="absolute inset-0 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-b-xl p-6 font-mono text-base bg-transparent leading-relaxed"
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* Match Results (Highlighted View) */}
            {pattern && text && !error && (
              <Card className="border-muted-foreground/20 shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                   <LuZap className="w-4 h-4 text-yellow-500" /> Match Highlights
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">
                    {matches.length} matches found ({executionTime.toFixed(2)}ms)
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/30 rounded-md font-mono text-base whitespace-pre-wrap break-all border border-border">
                    {highlightedText || <span className="text-muted-foreground opacity-50">No matches found</span>}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Match Info */}
            <Card className="border-muted-foreground/20 shadow-sm">
               <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Match Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Matches</span>
                  <span className="text-xl font-bold font-mono">{matches.length}</span>
                </div>
                {matches.length > 0 && (
                  <>
                  <Separator />
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground font-medium uppercase">First Match Groups</span>
                    {matches[0].groups.length > 0 ? (
                       <div className="grid grid-cols-[auto_1fr] gap-2 text-sm">
                         {matches[0].groups.map((g, i) => (
                           <div key={i} className="contents">
                             <span className="text-muted-foreground font-mono">#{i + 1}</span>
                             <span className="font-mono truncate bg-muted/50 px-1 rounded">{g || "undefined"}</span>
                           </div>
                         ))}
                       </div>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">No capture groups</div>
                    )}
                  </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card className="border-muted-foreground/20 shadow-sm">
               <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuList className="w-4 h-4" /> Cheatsheet
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="divide-y text-sm">
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">.</code>
                       <span className="text-muted-foreground">Any character</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">\w</code>
                       <span className="text-muted-foreground">Word char [a-zA-Z0-9_]</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">\d</code>
                       <span className="text-muted-foreground">Digit [0-9]</span>
                    </div>
                     <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">\s</code>
                       <span className="text-muted-foreground">Whitespace</span>
                    </div>
                     <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">[abc]</code>
                       <span className="text-muted-foreground">One of a, b, or c</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">[^abc]</code>
                       <span className="text-muted-foreground">Not a, b, or c</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">^</code>
                       <span className="text-muted-foreground">Start of line</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">$</code>
                       <span className="text-muted-foreground">End of line</span>
                    </div>
                     <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">*</code>
                       <span className="text-muted-foreground">0 or more times</span>
                    </div>
                     <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">+</code>
                       <span className="text-muted-foreground">1 or more times</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">?</code>
                       <span className="text-muted-foreground">0 or 1 time</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">{"{n}"}</code>
                       <span className="text-muted-foreground">Exactly n times</span>
                    </div>
                    <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">(...)</code>
                       <span className="text-muted-foreground">Capture group</span>
                    </div>
                     <div className="p-3 grid grid-cols-[1fr_2fr] gap-2">
                       <code className="text-primary font-bold">(?:...)</code>
                       <span className="text-muted-foreground">Non-capturing group</span>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
