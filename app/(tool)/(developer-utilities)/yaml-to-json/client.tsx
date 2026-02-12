"use client";

import { useState } from "react";
import yaml from "js-yaml";
import { toast } from "sonner";
import {
  LuArrowRight,
  LuArrowLeft,
  LuArrowDown,
  LuArrowUp,
  LuCopy,
  LuTrash2,
  LuFileJson,
  LuFileCode,
} from "react-icons/lu";
import { HiMiniArrowsRightLeft } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function YamlToJsonClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [yamlContent, setYamlContent] = useState("");
  const [jsonContent, setJsonContent] = useState("");
  const [lastActive, setLastActive] = useState<"yaml" | "json">("yaml");

  const handleConvert = () => {
    if (lastActive === "yaml") {
      handleYamlToJson();
    } else {
      handleJsonToYaml();
    }
  };

  const handleYamlToJson = () => {
    if (!yamlContent.trim()) {
      toast.error("Please enter YAML content first");
      return;
    }
    try {
      const obj = yaml.load(yamlContent);
      const json = JSON.stringify(obj, null, 2);
      setJsonContent(json);
      toast.success("Converted to JSON successfully");
    } catch (error) {
      toast.error("Invalid YAML: " + (error as Error).message);
    }
  };

  const handleJsonToYaml = () => {
    if (!jsonContent.trim()) {
      toast.error("Please enter JSON content first");
      return;
    }
    try {
      const obj = JSON.parse(jsonContent);
      const yamlStr = yaml.dump(obj);
      setYamlContent(yamlStr);
      toast.success("Converted to YAML successfully");
    } catch (error) {
      toast.error("Invalid JSON: " + (error as Error).message);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const clearAll = () => {
    setYamlContent("");
    setJsonContent("");
    toast.info("Cleared all content");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              YAML & JSON Converter
            </h1>
            <p className="text-muted-foreground mt-1">
              Convert YAML configurations to JSON and vice versa instantly.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleConvert}
              className="gap-2"
              title={
                lastActive === "yaml"
                  ? "Convert YAML to JSON"
                  : "Convert JSON to YAML"
              }
            >
              <HiMiniArrowsRightLeft className="w-4 h-4" />
              {lastActive === "yaml" ? "Convert to JSON" : "Convert to YAML"}
            </Button>
            <Button
              variant="ghost"
              onClick={clearAll}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
            >
              <LuTrash2 className="w-4 h-4" /> Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center h-[calc(100vh-250px)] min-h-[500px]">
          {/* YAML Input */}
          <Card className="h-full flex flex-col shadow-sm border-muted-foreground/20">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <LuFileCode className="w-4 h-4" /> YAML
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(yamlContent, "YAML")}
                  title="Copy YAML"
                >
                  <LuCopy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setYamlContent("")}
                  title="Clear YAML"
                >
                  <LuTrash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <Textarea
                value={yamlContent}
                onChange={(e) => {
                  setYamlContent(e.target.value);
                  setLastActive("yaml");
                }}
                placeholder="Paste your YAML here..."
                className="w-full h-full resize-none border-0 focus-visible:ring-0 rounded-xl p-4 font-mono text-sm leading-relaxed bg-transparent"
                spellCheck={false}
              />
            </CardContent>
          </Card>



          {/* JSON Input */}
          <Card className="h-full flex flex-col shadow-sm border-muted-foreground/20">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <LuFileJson className="w-4 h-4" /> JSON
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => copyToClipboard(jsonContent, "JSON")}
                  title="Copy JSON"
                >
                  <LuCopy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setJsonContent("")}
                  title="Clear JSON"
                >
                  <LuTrash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <Textarea
                value={jsonContent}
                onChange={(e) => {
                  setJsonContent(e.target.value);
                  setLastActive("json");
                }}
                placeholder="JSON output will appear here..."
                className="w-full h-full resize-none border-0 focus-visible:ring-0 rounded-xl p-4 font-mono text-sm leading-relaxed bg-transparent"
                spellCheck={false}
              />
            </CardContent>
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
}
