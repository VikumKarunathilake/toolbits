"use client";

import { useState, useEffect } from "react";
import { format as formatSql, type SqlLanguage } from "sql-formatter";
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

const dialects: { value: SqlLanguage; label: string }[] = [
  { value: "sql", label: "Standard SQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "tsql", label: "T-SQL (SQL Server)" },
  { value: "plsql", label: "PL/SQL (Oracle)" },
  { value: "bigquery", label: "BigQuery" },
  { value: "redshift", label: "Redshift" },
  { value: "spark", label: "Spark SQL" },
  { value: "snowflake", label: "Snowflake" },
];

export default function SqlFormatterClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<SqlLanguage>("sql");
  const [indentWidth, setIndentWidth] = useState("2");
  const [keywordCase, setKeywordCase] = useState<"preserve" | "upper" | "lower">("upper");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      const formatted = formatSql(input, {
        language: dialect,
        tabWidth: parseInt(indentWidth),
        keywordCase: keywordCase,
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      // Don't clear output immediately on error if typing, maybe just show error?
      // Or maybe just don't update output?
      // For a formatter, usually we want to see the error.
      setError(err.message);
    }
  }, [input, dialect, indentWidth, keywordCase]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Formatted SQL copied to clipboard");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    toast.info("Cleared");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SQL Formatter</h1>
            <p className="text-muted-foreground mt-1">
              Beautify and standardize SQL queries for better readability.
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
            
            <div className="flex flex-col gap-1.5 min-w-[180px]">
              <Label htmlFor="dialect" className="text-xs text-muted-foreground uppercase font-semibold">Dialect</Label>
              <Select value={dialect} onValueChange={(v) => setDialect(v as SqlLanguage)}>
                <SelectTrigger id="dialect" className="h-9">
                  <SelectValue placeholder="Select dialect" />
                </SelectTrigger>
                <SelectContent>
                  {dialects.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5 min-w-[140px]">
              <Label htmlFor="indent" className="text-xs text-muted-foreground uppercase font-semibold">Indent Size</Label>
              <Select value={indentWidth} onValueChange={setIndentWidth}>
                <SelectTrigger id="indent" className="h-9">
                  <SelectValue placeholder="Indent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Spaces</SelectItem>
                  <SelectItem value="4">4 Spaces</SelectItem>
                  <SelectItem value="8">8 Spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>

             <div className="flex flex-col gap-1.5 min-w-[140px]">
              <Label htmlFor="case" className="text-xs text-muted-foreground uppercase font-semibold">Keyword Case</Label>
              <Select value={keywordCase} onValueChange={(v: "preserve" | "upper" | "lower") => setKeywordCase(v)}>
                <SelectTrigger id="case" className="h-9">
                  <SelectValue placeholder="Case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preserve">Preserve</SelectItem>
                  <SelectItem value="upper">UPPERCASE</SelectItem>
                  <SelectItem value="lower">lowercase</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          
          {/* Input */}
          <Card className="border-muted-foreground/20 shadow-sm flex flex-col h-full">
            <CardHeader className="pb-3 px-4 pt-4 border-b">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Raw SQL
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your SQL query here..."
                className="w-full h-full resize-none border-0 focus-visible:ring-0 rounded-b-xl p-4 font-mono text-sm bg-transparent leading-relaxed"
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card className={`border-muted-foreground/20 shadow-sm flex flex-col h-full ${error ? "border-destructive/50" : ""}`}>
            <CardHeader className="pb-3 px-4 pt-4 border-b flex flex-row justify-between items-center h-[53px]">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <LuCode className="w-4 h-4" /> Formatted SQL
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative bg-muted/30">
              {error ? (
                <div className="p-6 text-destructive flex flex-col gap-2">
                   <div className="flex items-center gap-2 font-semibold">
                     <LuCircleAlert className="w-5 h-5" /> Error Parsing SQL
                   </div>
                   <p className="font-mono text-sm whitespace-pre-wrap breakdown-all">{error}</p>
                </div>
              ) : (
                <Textarea
                  readOnly
                  value={output}
                  placeholder="Formatted result will appear here..."
                  className="w-full h-full resize-none border-0 focus-visible:ring-0 rounded-b-xl p-4 font-mono text-sm bg-transparent leading-relaxed text-primary"
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
