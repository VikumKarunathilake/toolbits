"use client";

import { useState } from "react";
import {
  LuCopy,
  LuTrash2,
  LuCheck,
  LuRefreshCw,
  LuFingerprint,
  LuSettings2,
} from "react-icons/lu";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function UuidGeneratorClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [count, setCount] = useState(10);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [output, setOutput] = useState("");

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  const handleGenerate = () => {
    try {
      const uuids = [];
      for (let i = 0; i < count; i++) {
        let uuid = generateUUID();
        if (!hyphens) {
          uuid = uuid.replace(/-/g, "");
        }
        if (uppercase) {
          uuid = uuid.toUpperCase();
        }
        uuids.push(uuid);
      }
      setOutput(uuids.join("\n"));
      toast.success(`Generated ${count} UUIDs`);
    } catch (error) {
      toast.error("Failed to generate UUIDs");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const handleClear = () => {
    setOutput("");
    toast.info("Cleared output");
  };

  return (
    <div className="flex-1 bg-muted/40 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              UUID/GUID Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate bulk random unique identifiers (v4).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleGenerate} className="gap-2">
              <LuRefreshCw className="w-4 h-4" /> Generate
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[500px]">
          {/* Configuration Pane */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-muted-foreground/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuSettings2 className="w-4 h-4" /> Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="count-slider">
                        Quantity:{" "}
                        <span className="font-mono text-primary font-bold">
                          {count}
                        </span>
                      </Label>
                    </div>
                    <Slider
                      id="count-slider"
                      value={[count]}
                      max={100}
                      min={1}
                      step={1}
                      onValueChange={(vals: number[]) => setCount(vals[0])}
                      className="py-4"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="hyphens-switch"
                      className="flex flex-col gap-1"
                    >
                      <span>Hyphens</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Include dashes (standard)
                      </span>
                    </Label>
                    <Switch
                      id="hyphens-switch"
                      checked={hyphens}
                      onCheckedChange={setHyphens}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="uppercase-switch"
                      className="flex flex-col gap-1"
                    >
                      <span>Uppercase</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        A-Z instead of a-z
                      </span>
                    </Label>
                    <Switch
                      id="uppercase-switch"
                      checked={uppercase}
                      onCheckedChange={setUppercase}
                    />
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="w-full mt-4"
                  onClick={handleGenerate}
                >
                  Generate UUIDs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Pane */}
          <div className="lg:col-span-2 h-full">
            <Card className="flex flex-col h-full min-h-[500px] border-muted-foreground/20 shadow-sm bg-muted/30">
              <CardHeader className="pb-3 px-6 pt-6 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <LuFingerprint className="w-4 h-4" /> Generated UUIDs
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  <LuCopy className="w-3.5 h-3.5" /> Copy Result
                </Button>
              </CardHeader>

              <Separator />

              <CardContent className="flex-1 p-0 overflow-hidden relative h-full min-h-0">
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Generated UUIDs will appear here..."
                  className="absolute inset-0 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none p-6 font-mono text-sm bg-transparent text-muted-foreground leading-relaxed"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
