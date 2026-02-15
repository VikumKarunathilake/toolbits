"use client";

import { useState, useEffect } from "react";
import xmlFormat from "xml-formatter";
import { LuCopy, LuTrash2, LuCode, LuCircleAlert } from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function XmlFormatterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentation, setIndentation] = useState("  "); // Default 2 spaces
  const [collapseContent, setCollapseContent] = useState(true);
  const [lineSeparator, setLineSeparator] = useState("\r\n");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const formatted = xmlFormat(input, {
        indentation: indentation,
        filter: (node) => node.type !== "Comment",
        collapseContent: collapseContent,
        lineSeparator: lineSeparator,
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid XML");
    }
  }, [input, indentation, collapseContent, lineSeparator]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Formatted XML copied to clipboard");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    toast.info("Cleared");
  };

  const handleIndentChange = (val: string) => {
    if (val === "tab") {
      setIndentation("\t");
    } else {
      setIndentation(" ".repeat(parseInt(val)));
    }
  };

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">XML Formatter</h1>
            <p className="text-muted-foreground mt-1">
              Beautify and standardize XML data for better readability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Clear Input"
            >
              <LuTrash2 className="w-4 h-4" />
            </Button>
            <Button onClick={handleCopy} className="gap-2">
              <LuCopy className="w-4 h-4" /> Copy Result
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card className="border-muted-foreground/20 shadow-sm">
          <CardContent className="p-4 flex flex-wrap gap-4 items-center">
            
            <div className="flex flex-col gap-1.5 min-w-[140px]">
              <Label htmlFor="indent" className="text-xs text-muted-foreground uppercase font-semibold">Indent Size</Label>
              <Select defaultValue="2" onValueChange={handleIndentChange}>
                <SelectTrigger id="indent" className="h-9">
                  <SelectValue placeholder="Indent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Spaces</SelectItem>
                  <SelectItem value="4">4 Spaces</SelectItem>
                  <SelectItem value="8">8 Spaces</SelectItem>
                  <SelectItem value="tab">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5 min-w-[140px]">
              <Label htmlFor="separator" className="text-xs text-muted-foreground uppercase font-semibold">Line Separator</Label>
              <Select value={lineSeparator} onValueChange={setLineSeparator}>
                <SelectTrigger id="separator" className="h-9">
                  <SelectValue placeholder="Separator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"\r\n"}>CRLF (Windows)</SelectItem>
                  <SelectItem value={"\n"}>LF (Unix)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 mt-auto h-9">
               <Switch 
                  id="collapse" 
                  checked={collapseContent} 
                  onCheckedChange={setCollapseContent} 
               />
               <Label htmlFor="collapse" className="text-sm font-medium cursor-pointer">Collapse Content</Label>
            </div>

          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          
          {/* Input */}
          <Card className="border-muted-foreground/20 shadow-sm flex flex-col h-full">
            <CardHeader className="pb-3 px-4 pt-4 border-b">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Raw XML
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative overflow-hidden min-h-0">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your XML data here..."
                className="absolute inset-0 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-b-xl p-4 font-mono text-sm bg-transparent leading-relaxed"
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card className={`border-muted-foreground/20 shadow-sm flex flex-col h-full ${error ? "border-destructive/50" : ""}`}>
            <CardHeader className="pb-3 px-4 pt-4 border-b flex flex-row justify-between items-center h-[53px]">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <LuCode className="w-4 h-4" /> Formatted XML
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative overflow-hidden min-h-0 bg-muted/30">
              {error ? (
                <div className="p-6 text-destructive flex flex-col gap-2">
                   <div className="flex items-center gap-2 font-semibold">
                     <LuCircleAlert className="w-5 h-5" /> Error Parsing XML
                   </div>
                   <p className="font-mono text-sm whitespace-pre-wrap breakdown-all">{error}</p>
                </div>
              ) : (
                <Textarea
                  readOnly
                  value={output}
                  placeholder="Formatted result will appear here..."
                  className="absolute inset-0 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-b-xl p-4 font-mono text-sm bg-transparent leading-relaxed text-primary"
                  spellCheck={false}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {children}
      </div>
    </div>
  );
}
